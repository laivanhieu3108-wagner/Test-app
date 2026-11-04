// Mỗi từ: [từ tiếng Anh, phiên âm IPA, loại từ, nghĩa tiếng Việt, câu ví dụ]
const RAW = {
  family: {
    name: 'Gia đình',
    icon: '👨‍👩‍👧',
    words: [
      ['parent', '/ˈpeə.rənt/', 'n', 'bố hoặc mẹ', 'My parents live in Hanoi.'],
      ['sibling', '/ˈsɪb.lɪŋ/', 'n', 'anh chị em ruột', 'I have two siblings.'],
      ['grandmother', '/ˈɡræn.mʌð.ər/', 'n', 'bà', 'My grandmother tells great stories.'],
      ['uncle', '/ˈʌŋ.kəl/', 'n', 'chú, bác, cậu', 'My uncle is a doctor.'],
      ['aunt', '/ɑːnt/', 'n', 'cô, dì, bác gái', 'Her aunt bakes delicious cakes.'],
      ['cousin', '/ˈkʌz.ən/', 'n', 'anh chị em họ', 'My cousin is visiting this weekend.'],
      ['husband', '/ˈhʌz.bənd/', 'n', 'chồng', 'Her husband works in a bank.'],
      ['wife', '/waɪf/', 'n', 'vợ', 'His wife is a teacher.'],
      ['daughter', '/ˈdɔː.tər/', 'n', 'con gái', 'Their daughter is five years old.'],
      ['son', '/sʌn/', 'n', 'con trai', 'Their son loves football.'],
    ],
  },
  food: {
    name: 'Đồ ăn',
    icon: '🍜',
    words: [
      ['breakfast', '/ˈbrek.fəst/', 'n', 'bữa sáng', 'I usually have breakfast at seven.'],
      ['vegetable', '/ˈvedʒ.tə.bəl/', 'n', 'rau củ', 'Eat more vegetables every day.'],
      ['delicious', '/dɪˈlɪʃ.əs/', 'adj', 'ngon', 'This soup is delicious.'],
      ['spicy', '/ˈspaɪ.si/', 'adj', 'cay', 'I like spicy food.'],
      ['recipe', '/ˈres.ɪ.pi/', 'n', 'công thức nấu ăn', 'Can you share the recipe?'],
      ['bread', '/bred/', 'n', 'bánh mì', 'She bought some bread.'],
      ['rice', '/raɪs/', 'n', 'cơm, gạo', 'We eat rice every day.'],
      ['cook', '/kʊk/', 'v', 'nấu ăn', 'My father likes to cook.'],
      ['hungry', '/ˈhʌŋ.ɡri/', 'adj', 'đói', "I'm hungry. Let's eat."],
      ['dessert', '/dɪˈzɜːt/', 'n', 'món tráng miệng', 'Ice cream is my favorite dessert.'],
    ],
  },
  animals: {
    name: 'Động vật',
    icon: '🐘',
    words: [
      ['elephant', '/ˈel.ɪ.fənt/', 'n', 'con voi', 'An elephant has a long trunk.'],
      ['tiger', '/ˈtaɪ.ɡər/', 'n', 'con hổ', 'The tiger is sleeping.'],
      ['rabbit', '/ˈræb.ɪt/', 'n', 'con thỏ', 'The rabbit eats carrots.'],
      ['monkey', '/ˈmʌŋ.ki/', 'n', 'con khỉ', 'The monkey is climbing a tree.'],
      ['butterfly', '/ˈbʌt.ə.flaɪ/', 'n', 'con bướm', 'A butterfly landed on the flower.'],
      ['dolphin', '/ˈdɒl.fɪn/', 'n', 'cá heo', 'Dolphins are very smart.'],
      ['turtle', '/ˈtɜː.təl/', 'n', 'con rùa', 'The turtle moves slowly.'],
      ['chicken', '/ˈtʃɪk.ɪn/', 'n', 'con gà', 'The chicken laid an egg.'],
      ['horse', '/hɔːs/', 'n', 'con ngựa', 'He rides a horse.'],
      ['snake', '/sneɪk/', 'n', 'con rắn', 'Be careful, there is a snake!'],
    ],
  },
  work: {
    name: 'Công việc',
    icon: '💼',
    words: [
      ['colleague', '/ˈkɒl.iːɡ/', 'n', 'đồng nghiệp', 'My colleagues are very friendly.'],
      ['meeting', '/ˈmiː.tɪŋ/', 'n', 'cuộc họp', 'We have a meeting at 9 a.m.'],
      ['deadline', '/ˈded.laɪn/', 'n', 'hạn chót', 'The deadline is next Friday.'],
      ['salary', '/ˈsæl.ər.i/', 'n', 'tiền lương', 'She got a higher salary.'],
      ['manager', '/ˈmæn.ɪ.dʒər/', 'n', 'quản lý', 'Please talk to the manager.'],
      ['interview', '/ˈɪn.tə.vjuː/', 'n', 'buổi phỏng vấn', 'I have a job interview tomorrow.'],
      ['experience', '/ɪkˈspɪə.ri.əns/', 'n', 'kinh nghiệm', 'He has five years of experience.'],
      ['skill', '/skɪl/', 'n', 'kỹ năng', 'Communication is an important skill.'],
      ['hire', '/haɪər/', 'v', 'thuê, tuyển dụng', 'The company will hire ten people.'],
      ['resign', '/rɪˈzaɪn/', 'v', 'từ chức, nghỉ việc', 'She decided to resign.'],
    ],
  },
  travel: {
    name: 'Du lịch',
    icon: '✈️',
    words: [
      ['airport', '/ˈeə.pɔːt/', 'n', 'sân bay', 'We arrived at the airport early.'],
      ['passport', '/ˈpɑːs.pɔːt/', 'n', 'hộ chiếu', "Don't forget your passport."],
      ['luggage', '/ˈlʌɡ.ɪdʒ/', 'n', 'hành lý', 'My luggage is too heavy.'],
      ['ticket', '/ˈtɪk.ɪt/', 'n', 'vé', 'I bought a train ticket.'],
      ['hotel', '/həʊˈtel/', 'n', 'khách sạn', 'The hotel is near the beach.'],
      ['journey', '/ˈdʒɜː.ni/', 'n', 'chuyến đi, hành trình', 'Have a safe journey!'],
      ['destination', '/ˌdes.tɪˈneɪ.ʃən/', 'n', 'điểm đến', 'Da Nang is a popular destination.'],
      ['map', '/mæp/', 'n', 'bản đồ', 'Can you show me on the map?'],
      ['souvenir', '/ˌsuː.vənˈɪər/', 'n', 'quà lưu niệm', 'I bought a souvenir for my mom.'],
      ['reservation', '/ˌrez.əˈveɪ.ʃən/', 'n', 'sự đặt chỗ trước', 'I have a reservation for two.'],
    ],
  },
}

export const POS_LABEL = { n: 'danh từ', v: 'động từ', adj: 'tính từ' }

export const TOPICS = Object.entries(RAW).map(([id, t]) => ({
  id,
  name: t.name,
  icon: t.icon,
  words: t.words.map(([word, ipa, pos, meaning, example]) => ({
    id: `${id}:${word}`,
    word,
    ipa,
    pos,
    meaning,
    example,
  })),
}))
