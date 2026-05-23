const { Roles, Teams } = require('./roles');

class Game {
  constructor(guildId, channelId) {
    this.guildId = guildId;
    this.channelId = channelId;
    this.players = new Map(); // discordId -> { id, user, role, team, alive, votes, specialData }
    this.state = 'LOBBY'; // LOBBY, NIGHT, DAY, ENDED
    this.dayCount = 0;
    this.logs = [];
  }

  addPlayer(user) {
    if (this.state !== 'LOBBY') return false;
    if (this.players.has(user.id)) return false;
    if (this.players.size >= 15) return false;

    this.players.set(user.id, {
      id: user.id,
      user: user,
      role: null,
      team: null,
      alive: true,
      votes: 0,
      specialData: {}
    });
    return true;
  }

  removePlayer(userId) {
    if (this.state !== 'LOBBY') return false;
    return this.players.delete(userId);
  }

  start() {
    if (this.players.size < 8) return { success: false, message: 'Cần ít nhất 8 người chơi.' };
    
    this.assignRoles();
    this.state = 'NIGHT';
    this.dayCount = 1;
    
    return { success: true, message: 'Trò chơi bắt đầu!' };
  }

  assignRoles() {
    const playerCount = this.players.size;
    let rolePool = [];

    if (playerCount === 8) {
      rolePool = [Roles.WEREWOLF, Roles.WEREWOLF, Roles.SEER, Roles.BODYGUARD, Roles.VILLAGER, Roles.VILLAGER, Roles.VILLAGER, Roles.VILLAGER];
    } else if (playerCount >= 9 && playerCount <= 10) {
      rolePool = [Roles.WEREWOLF, Roles.WEREWOLF, Roles.WEREWOLF, Roles.SEER, Roles.BODYGUARD, Roles.WITCH];
      while(rolePool.length < playerCount) rolePool.push(Roles.VILLAGER);
    } else {
      rolePool = [Roles.ALPHA_WOLF, Roles.WEREWOLF, Roles.WEREWOLF, Roles.SEER, Roles.BODYGUARD, Roles.WITCH, Roles.HUNTER, Roles.JESTER];
      while(rolePool.length < playerCount) rolePool.push(Roles.VILLAGER);
    }

    // Shuffle pool
    rolePool = rolePool.sort(() => Math.random() - 0.5);

    let idx = 0;
    for (let player of this.players.values()) {
      player.role = rolePool[idx];
      player.team = rolePool[idx].team;
      idx++;
    }
  }

  getAlivePlayers() {
    return Array.from(this.players.values()).filter(p => p.alive);
  }

  checkWinCondition() {
    const alive = this.getAlivePlayers();
    const wolves = alive.filter(p => p.team === Teams.EVIL).length;
    const villagers = alive.length - wolves;

    if (wolves === 0) return Teams.GOOD;
    if (wolves >= villagers) return Teams.EVIL;
    
    const jester = alive.find(p => p.role.id === Roles.JESTER.id && p.specialData.executed);
    if (jester) return Teams.NEUTRAL;

    return null;
  }
}

module.exports = { Game };