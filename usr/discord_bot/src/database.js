const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '..', 'werewolf.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error connecting to the database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
        initDatabase();
    }
});

function initDatabase() {
    db.serialize(() => {
        // Players table: tracks user stats across games
        db.run(`
            CREATE TABLE IF NOT EXISTS players (
                user_id TEXT PRIMARY KEY,
                username TEXT,
                wins INTEGER DEFAULT 0,
                losses INTEGER DEFAULT 0,
                games_played INTEGER DEFAULT 0,
                villager_wins INTEGER DEFAULT 0,
                wolf_wins INTEGER DEFAULT 0,
                seer_wins INTEGER DEFAULT 0
            )
        `);

        // Matches table: tracks match history
        db.run(`
            CREATE TABLE IF NOT EXISTS matches (
                match_id INTEGER PRIMARY KEY AUTOINCREMENT,
                guild_id TEXT,
                start_time DATETIME DEFAULT CURRENT_TIMESTAMP,
                end_time DATETIME,
                winner_team TEXT,
                total_players INTEGER
            )
        `);

        // Match Players table: tracks which roles players had in which matches
        db.run(`
            CREATE TABLE IF NOT EXISTS match_players (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                match_id INTEGER,
                user_id TEXT,
                role TEXT,
                survived BOOLEAN,
                FOREIGN KEY (match_id) REFERENCES matches (match_id),
                FOREIGN KEY (user_id) REFERENCES players (user_id)
            )
        `);
    });
}

// Database helper functions
const getPlayerStats = (userId) => {
    return new Promise((resolve, reject) => {
        db.get('SELECT * FROM players WHERE user_id = ?', [userId], (err, row) => {
            if (err) reject(err);
            else resolve(row);
        });
    });
};

const registerPlayer = (userId, username) => {
    return new Promise((resolve, reject) => {
        db.run(
            'INSERT OR IGNORE INTO players (user_id, username) VALUES (?, ?)',
            [userId, username],
            function (err) {
                if (err) reject(err);
                else resolve(this.lastID);
            }
        );
    });
};

const recordMatchResult = (matchData, playersData) => {
    return new Promise((resolve, reject) => {
        db.run(
            'INSERT INTO matches (guild_id, winner_team, total_players, end_time) VALUES (?, ?, ?, CURRENT_TIMESTAMP)',
            [matchData.guildId, matchData.winner, matchData.totalPlayers],
            function (err) {
                if (err) return reject(err);
                const matchId = this.lastID;

                // Update player stats and record match_players
                playersData.forEach(p => {
                    const isWin = matchData.winner === p.team;
                    db.run(
                        'INSERT INTO match_players (match_id, user_id, role, survived) VALUES (?, ?, ?, ?)',
                        [matchId, p.userId, p.role, p.survived]
                    );

                    const winInc = isWin ? 1 : 0;
                    const lossInc = isWin ? 0 : 1;
                    
                    let roleWinCol = '';
                    if (isWin) {
                        if (p.role === 'Werewolf') roleWinCol = ', wolf_wins = wolf_wins + 1';
                        else if (p.role === 'Seer') roleWinCol = ', seer_wins = seer_wins + 1';
                        else if (p.role === 'Villager') roleWinCol = ', villager_wins = villager_wins + 1';
                    }

                    db.run(`
                        UPDATE players 
                        SET games_played = games_played + 1,
                            wins = wins + ?,
                            losses = losses + ?
                            ${roleWinCol}
                        WHERE user_id = ?
                    `, [winInc, lossInc, p.userId]);
                });
                resolve(matchId);
            }
        );
    });
};

const getLeaderboard = (limit = 10) => {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM players ORDER BY wins DESC LIMIT ?', [limit], (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
};

module.exports = {
    db,
    getPlayerStats,
    registerPlayer,
    recordMatchResult,
    getLeaderboard
};