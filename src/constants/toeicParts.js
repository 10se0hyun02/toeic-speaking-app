export const TOEIC_PARTS = [
  {
    id: 'p1',
    number: 1,
    title: '지문 읽기',
    titleEn: 'Read a Text Aloud',
    description: '주어진 지문을 소리 내어 읽습니다.',
    questionCount: 2,
    questionNumbers: [1, 2],
    prepTime: 45,
    responseTime: 45,
    perQuestionTimes: null,
  },
  {
    id: 'p2',
    number: 2,
    title: '사진 묘사',
    titleEn: 'Describe a Picture',
    description: '사진을 보고 묘사합니다.',
    questionCount: 2,
    questionNumbers: [3, 4],
    prepTime: 30,
    responseTime: 45,
    perQuestionTimes: null,
  },
  {
    id: 'p3',
    number: 3,
    title: '질문에 답하기',
    titleEn: 'Respond to Questions',
    description: '주제와 관련된 3개의 질문에 답합니다.',
    questionCount: 3,
    questionNumbers: [5, 6, 7],
    prepTime: null,
    responseTime: null,
    perQuestionTimes: [
      { prep: 3, response: 15 },
      { prep: 3, response: 15 },
      { prep: 3, response: 30 },
    ],
  },
  {
    id: 'p4',
    number: 4,
    title: '정보를 활용한 답변',
    titleEn: 'Respond to Questions Using Information Provided',
    description: '제공된 정보를 활용해 3개의 질문에 답합니다.',
    questionCount: 3,
    questionNumbers: [8, 9, 10],
    prepTime: 30,
    responseTime: null,
    perQuestionTimes: [
      { prep: 3, response: 15 },
      { prep: 3, response: 15 },
      { prep: 3, response: 30 },
    ],
  },
  {
    id: 'p5',
    number: 5,
    title: '해결책 제안',
    titleEn: 'Propose a Solution',
    description: '음성 메시지를 듣고 해결책을 제안합니다.',
    questionCount: 1,
    questionNumbers: [11],
    prepTime: 30,
    responseTime: 60,
    perQuestionTimes: null,
  },
  {
    id: 'p6',
    number: 6,
    title: '의견 제시',
    titleEn: 'Express an Opinion',
    description: '질문을 읽고 의견을 제시합니다.',
    questionCount: 1,
    questionNumbers: [12],
    prepTime: 15,
    responseTime: 60,
    perQuestionTimes: null,
  },
]

export const PART_MAP = Object.fromEntries(TOEIC_PARTS.map((p) => [p.id, p]))

export function getTimingForSubQuestion(part, subQIdx) {
  if (part.perQuestionTimes) {
    return part.perQuestionTimes[subQIdx] ?? part.perQuestionTimes.at(-1)
  }
  return { prep: part.prepTime, response: part.responseTime }
}
