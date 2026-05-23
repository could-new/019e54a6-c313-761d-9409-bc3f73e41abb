const Teams = {
  GOOD: 'PHE_THIEN',
  EVIL: 'PHE_SOI',
  NEUTRAL_EVIL: 'NEUTRAL_EVIL',
  NEUTRAL: 'PHE_TRUNG_LAP'
};

const Roles = {
  VILLAGER: {
    id: 'villager',
    name: 'Villager',
    emoji: '🧑',
    team: Teams.GOOD,
    description: 'Một người dân bình thường trong làng.',
    abilities: 'Không có khả năng đặc biệt.',
    winCondition: 'Chiến thắng khi tiêu diệt hết phe sói.'
  },
  SEER: {
    id: 'seer',
    name: 'Tiên Tri',
    emoji: '🔮',
    team: Teams.GOOD,
    description: 'Người có khả năng nhìn thấu danh tính thực sự.',
    abilities: 'Mỗi đêm, có thể soi 1 người để biết họ là Sói hay Dân.',
    winCondition: 'Chiến thắng khi tiêu diệt hết phe sói.'
  },
  BODYGUARD: {
    id: 'bodyguard',
    name: 'Bảo Vệ',
    emoji: '🛡️',
    team: Teams.GOOD,
    description: 'Người bảo vệ làng trong bóng tối.',
    abilities: 'Mỗi đêm, có thể chọn bảo vệ 1 người khỏi sự tấn công của sói. Không thể bảo vệ cùng 1 người trong 2 đêm liên tiếp.',
    winCondition: 'Chiến thắng khi tiêu diệt hết phe sói.'
  },
  WITCH: {
    id: 'witch',
    name: 'Phù Thủy',
    emoji: '💊',
    team: Teams.GOOD,
    description: 'Người nắm giữ bình thuốc cứu mạng và thuốc độc.',
    abilities: 'Có 1 bình thuốc cứu và 1 bình thuốc độc dùng một lần trong cả ván.',
    winCondition: 'Chiến thắng khi tiêu diệt hết phe sói.'
  },
  HUNTER: {
    id: 'hunter',
    name: 'Thợ Săn',
    emoji: '🔫',
    team: Teams.GOOD,
    description: 'Thợ săn thiện xạ của làng.',
    abilities: 'Khi bị giết (bởi sói hoặc treo cổ), có thể bắn chết 1 người khác.',
    winCondition: 'Chiến thắng khi tiêu diệt hết phe sói.'
  },
  ELDER: {
    id: 'elder',
    name: 'Già Làng',
    emoji: '👴',
    team: Teams.GOOD,
    description: 'Người có uy tín nhất trong làng.',
    abilities: 'Có hai mạng khi bị sói cắn. Nếu bị treo cổ, phù thủy độc hoặc thợ săn bắn thì vẫn chết bình thường.',
    winCondition: 'Chiến thắng khi tiêu diệt hết phe sói.'
  },
  WEREWOLF: {
    id: 'werewolf',
    name: 'Ma Sói',
    emoji: '🐺',
    team: Teams.EVIL,
    description: 'Kẻ khát máu ẩn mình trong đêm.',
    abilities: 'Mỗi đêm cùng bầy sói vote giết 1 người.',
    winCondition: 'Chiến thắng khi số sói bằng hoặc lớn hơn số dân.'
  },
  ALPHA_WOLF: {
    id: 'alpha_wolf',
    name: 'Sói Đầu Đàn',
    emoji: '🐺👑',
    team: Teams.EVIL,
    description: 'Kẻ đứng đầu bầy sói.',
    abilities: 'Quyết định cuối cùng trong trường hợp vote của bầy sói hòa.',
    winCondition: 'Chiến thắng khi số sói bằng hoặc lớn hơn số dân.'
  },
  WOLF_SEER: {
    id: 'wolf_seer',
    name: 'Sói Tiên Tri',
    emoji: '🐺👁️',
    team: Teams.EVIL,
    description: 'Sói có khả năng ngoại cảm.',
    abilities: 'Mỗi đêm soi 1 người để biết họ có phải là Tiên Tri hay không.',
    winCondition: 'Chiến thắng khi số sói bằng hoặc lớn hơn số dân.'
  },
  ARSONIST: {
    id: 'arsonist',
    name: 'Kẻ Phóng Hỏa',
    emoji: '🔥',
    team: Teams.NEUTRAL_EVIL,
    description: 'Kẻ cuồng dại với ngọn lửa.',
    abilities: 'Mỗi đêm có thể tẩm xăng 1 người hoặc châm lửa đốt cháy những người đã tẩm xăng.',
    winCondition: 'Chiến thắng khi là người sống sót cuối cùng.'
  },
  JESTER: {
    id: 'jester',
    name: 'Thằng Hề',
    emoji: '🃏',
    team: Teams.NEUTRAL,
    description: 'Kẻ điên muốn được treo cổ.',
    abilities: 'Làm mọi cách để bị làng treo cổ vào ban ngày.',
    winCondition: 'Chiến thắng nếu bị treo cổ vào ban ngày.'
  },
  GHOST: {
    id: 'ghost',
    name: 'Bóng Ma',
    emoji: '👻',
    team: Teams.NEUTRAL,
    description: 'Linh hồn chưa siêu thoát.',
    abilities: 'Không thể bị giết vào ban đêm.',
    winCondition: 'Tồn tại đến cuối trò chơi.'
  },
  CUPID: {
    id: 'cupid',
    name: 'Thần Tình Yêu',
    emoji: '💘',
    team: Teams.GOOD,
    description: 'Thần kết duyên.',
    abilities: 'Đêm đầu tiên chọn 2 người làm cặp đôi. Nếu 1 người chết, người kia cũng chết theo.',
    winCondition: 'Chiến thắng khi tiêu diệt hết phe sói, hoặc chiến thắng chung với cặp đôi nếu họ là người sống sót cuối cùng.'
  }
};

module.exports = { Roles, Teams };
