import { useLocalStorage } from './useLocalStorage'

const INITIAL_QUESTIONS = [
  // ── Part 1: Read a Text Aloud ──
  {
    id: 'sample-p1-1',
    partId: 'p1',
    order: 0,
    prompt: 'Q1 - 회사 야유회 공지문',
    content:
      'The annual company picnic will be held on Saturday, July 15th, at Riverside Park. All employees and their families are invited to attend. Activities will include games, a barbecue, and live music. Please register by July 10th.',
    sampleAnswer: '',
    templates: [],
    tags: ['공지', '회사'],
    memorized: false,
  },
  {
    id: 'sample-p1-2',
    partId: 'p1',
    order: 1,
    prompt: 'Q2 - 자동차 수리 광고문',
    content:
      'Are you looking for a reliable car repair service? Visit Green Auto Center, open seven days a week from eight a.m. to seven p.m. Our certified mechanics provide fast and affordable service. Call us today for a free estimate.',
    sampleAnswer: '',
    templates: [],
    tags: ['광고', '서비스'],
    memorized: false,
  },
  {
    id: 'sample-p1-3',
    partId: 'p1',
    order: 2,
    prompt: 'Q3 - 공항 안내 방송',
    content:
      'Attention passengers on Flight KA 207 to Singapore. Due to a slight delay in aircraft preparation, boarding will begin at three forty-five p.m. instead of three fifteen p.m. We apologize for any inconvenience and thank you for your patience.',
    sampleAnswer: '',
    templates: [],
    tags: ['공항', '안내방송'],
    memorized: false,
  },
  {
    id: 'sample-p1-4',
    partId: 'p1',
    order: 3,
    prompt: 'Q4 - 도서관 이용 안내',
    content:
      'Welcome to the Central City Library. Library hours are Monday through Friday, nine a.m. to nine p.m., and Saturday and Sunday, ten a.m. to six p.m. All visitors must present a valid library card to borrow materials. Late returns are subject to a fine of fifty cents per day.',
    sampleAnswer: '',
    templates: [],
    tags: ['도서관', '공지'],
    memorized: false,
  },
  {
    id: 'sample-p1-5',
    partId: 'p1',
    order: 4,
    prompt: 'Q5 - 제품 사용 설명',
    content:
      'Thank you for purchasing the UltraBlend Pro smoothie maker. Before first use, wash all removable parts with warm soapy water. To blend, add ingredients, secure the lid, and press the power button. Do not operate the machine without the lid properly attached. For customer support, call our helpline at one-eight-hundred-555-0199.',
    sampleAnswer: '',
    templates: [],
    tags: ['제품설명', '안내'],
    memorized: false,
  },

  // ── Part 2: Describe a Picture ──
  {
    id: 'sample-p2-1',
    partId: 'p2',
    order: 0,
    prompt: 'Q3 - 회의실 사진',
    content:
      '[사진 힌트] 회의실 / 여러 명이 테이블에 앉아 노트북을 보고 있음 / 화이트보드 있음',
    sampleAnswer:
      'In this picture, I can see several people sitting around a conference table. They appear to be in a business meeting. Each person has a laptop open in front of them. There is a whiteboard on the wall in the background.',
    templates: [
      'In this picture, I can see...',
      'In the foreground/background, there is...',
      'It appears that...',
      'On the left/right side,...',
    ],
    tags: ['회의실', '비즈니스'],
    memorized: false,
  },
  {
    id: 'sample-p2-2',
    partId: 'p2',
    order: 1,
    prompt: 'Q4 - 야외 시장 사진',
    content:
      '[사진 힌트] 야외 시장 / 과일·채소 가판대 / 상인이 손님에게 물건을 건네는 중 / 사람들이 많이 지나다님',
    sampleAnswer:
      'This picture shows a busy outdoor market. In the center, a vendor is handing something to a customer across a stall filled with fresh fruits and vegetables. The market appears to be crowded with many people walking around. On the left, I can see a display of colorful produce. The atmosphere looks lively and energetic.',
    templates: [
      'This picture shows...',
      'In the center/left/right,...',
      'The [person/place] appears to be...',
      'The atmosphere looks...',
    ],
    tags: ['시장', '야외'],
    memorized: false,
  },
  {
    id: 'sample-p2-3',
    partId: 'p2',
    order: 2,
    prompt: 'Q5 - 공원 벤치 사진',
    content:
      '[사진 힌트] 공원 / 두 사람이 벤치에 앉아 대화 중 / 나무와 잔디 / 맑은 날씨',
    sampleAnswer:
      'In this photo, two people are sitting on a bench in what appears to be a park. They seem to be having a conversation and look relaxed. The park has many trees and a well-maintained lawn. The weather appears to be sunny and pleasant. In the background, I can see more trees and possibly other park visitors.',
    templates: [
      'In this photo, ...',
      'They seem to be...',
      'The weather appears to be...',
      'In the background, I can see...',
    ],
    tags: ['공원', '야외'],
    memorized: false,
  },

  // ── Part 3: Respond to Questions ──
  {
    id: 'sample-p3-1',
    partId: 'p3',
    order: 0,
    prompt:
      '주제: 여행\nQ5. 여행을 자주 가나요?\nQ6. 마지막으로 여행 간 곳은 어디인가요?\nQ7. 여행을 계획할 때 가장 중요하게 생각하는 것은 무엇인가요?',
    content: '',
    sampleAnswer:
      'Q5. Yes, I enjoy traveling. I usually travel about twice a year.\nQ6. The last place I visited was Jeju Island. I went there last summer with my family.\nQ7. When planning a trip, the most important thing for me is accommodation. I always look for a comfortable place to stay within my budget.',
    templates: [
      'Yes, I enjoy... / No, I usually...',
      'The last time I... was...',
      'The most important thing for me is...',
    ],
    tags: ['여행'],
    memorized: false,
  },
  {
    id: 'sample-p3-2',
    partId: 'p3',
    order: 1,
    prompt:
      '주제: 쇼핑\nQ5. 온라인 쇼핑과 오프라인 쇼핑 중 어느 것을 선호하나요?\nQ6. 얼마나 자주 쇼핑을 하나요?\nQ7. 최근에 구매한 것 중 가장 마음에 드는 것은 무엇인가요?',
    content: '',
    sampleAnswer:
      "Q5. I prefer online shopping because it's more convenient. I can compare prices and shop anytime.\nQ6. I go shopping about once a week, mostly online. For groceries, I visit the store twice a week.\nQ7. The best purchase I've made recently is a pair of wireless earphones. The sound quality is excellent and they're very comfortable to wear.",
    templates: [
      'I prefer... because...',
      'I usually... about once a...',
      "The best/most... I've recently... is...",
    ],
    tags: ['쇼핑'],
    memorized: false,
  },
  {
    id: 'sample-p3-3',
    partId: 'p3',
    order: 2,
    prompt:
      '주제: 음식\nQ5. 요리하는 것을 즐기나요?\nQ6. 가장 좋아하는 음식은 무엇인가요?\nQ7. 한국 음식이 외국에서도 인기를 끄는 이유가 무엇이라고 생각하나요?',
    content: '',
    sampleAnswer:
      "Q5. Yes, I enjoy cooking. I try to cook at home at least three times a week because it's healthier and more economical.\nQ6. My favorite food is bibimbap. I love the variety of vegetables and the spicy sauce mixed together.\nQ7. I think Korean food is popular abroad because of its bold flavors and healthy ingredients. Foods like kimchi and bulgogi have unique tastes that people find exciting and different from their local cuisine.",
    templates: [
      'Yes, I enjoy... because...',
      'My favorite... is... because...',
      'I think... is popular because...',
    ],
    tags: ['음식', '요리'],
    memorized: false,
  },

  // ── Part 4: Respond to Questions Using Information Provided ──
  {
    id: 'sample-p4-1',
    partId: 'p4',
    order: 0,
    prompt:
      'Q8. 가장 이른 기차는 몇 시에 출발하나요?\nQ9. 서울에서 부산까지 얼마나 걸리나요?\nQ10. 우등석 요금은 얼마인가요? 그리고 어느 좌석을 추천하나요?',
    content:
      '기차 시간표 - 서울 → 부산\n출발: 07:00 / 09:30 / 12:00 / 15:30\n소요시간: 약 2시간 30분\n가격: 일반석 59,800원 / 우등석 89,800원',
    sampleAnswer:
      "Q8. The earliest train departs at seven a.m.\nQ9. The trip from Seoul to Busan takes about two and a half hours.\nQ10. The first-class ticket costs 89,800 won. If you want a more comfortable ride, I'd recommend the first-class seat, but if you're on a budget, the standard seat is a good option.",
    templates: [
      'According to the schedule...',
      'Based on the information provided...',
      'The [item] costs...',
      'I would recommend... because...',
    ],
    tags: ['시간표', '교통'],
    memorized: false,
  },
  {
    id: 'sample-p4-2',
    partId: 'p4',
    order: 1,
    prompt:
      'Q8. 워크숍은 어디서 열리나요?\nQ9. 등록 마감일은 언제인가요?\nQ10. 오후 세션 중 리더십 스킬 관련 세션은 몇 시에 시작하나요? 그리고 어떤 세션을 추천하나요?',
    content:
      '비즈니스 스킬 워크숍\n일시: 2024년 3월 15일 (금)\n장소: 그랜드 호텔 3층 컨퍼런스룸 A\n등록 마감: 3월 10일\n\n[세션 일정]\n09:00 - 10:30  프레젠테이션 스킬\n11:00 - 12:30  협상 전략\n14:00 - 15:30  리더십 스킬\n16:00 - 17:30  네트워킹 방법',
    sampleAnswer:
      "Q8. The workshop will be held at Conference Room A on the third floor of the Grand Hotel.\nQ9. The registration deadline is March 10th.\nQ10. The leadership skills session starts at two p.m. Personally, I'd recommend the presentation skills session in the morning, as strong presentation abilities are useful in almost every professional situation.",
    templates: [
      'According to the schedule, the... will be held at...',
      'The deadline is...',
      'The [session] starts at...',
      "Personally, I'd recommend... because...",
    ],
    tags: ['워크숍', '비즈니스', '일정'],
    memorized: false,
  },
  {
    id: 'sample-p4-3',
    partId: 'p4',
    order: 2,
    prompt:
      'Q8. 스탠다드 룸의 1박 요금은 얼마인가요?\nQ9. 체크아웃 시간은 몇 시인가요?\nQ10. 수영장과 피트니스 센터 중 어느 것이 더 늦게까지 운영되나요? 그리고 호텔의 어떤 시설을 가장 추천하나요?',
    content:
      '블루웨이브 호텔 안내\n\n[객실 요금 (1박 기준)]\n스탠다드 룸: $120  /  디럭스 룸: $180  /  스위트: $280\n체크인: 오후 3시  /  체크아웃: 정오 12시\n\n[부대시설 운영시간]\n수영장: 06:00 – 22:00\n피트니스 센터: 06:00 – 23:00\n레스토랑: 07:00 – 22:00\n스파: 10:00 – 21:00',
    sampleAnswer:
      'Q8. The standard room rate is 120 dollars per night.\nQ9. Check-out time is at noon, twelve p.m.\nQ10. The fitness center operates until eleven p.m., which is one hour later than the swimming pool. As for recommendations, I would suggest the spa if you want to relax, or the fitness center if you prefer an active stay.',
    templates: [
      'The [room] rate is...',
      'Check-out time is at...',
      'The [facility] operates until..., which is... later than...',
      'I would suggest... if you want to...',
    ],
    tags: ['호텔', '시설안내'],
    memorized: false,
  },

  // ── Part 5: Propose a Solution ──
  {
    id: 'sample-p5-1',
    partId: 'p5',
    order: 0,
    prompt:
      '동료 직원 James가 내일 중요한 발표가 있는데 발표 파일을 실수로 삭제했다며 도움을 요청합니다.',
    content: '',
    sampleAnswer:
      "Hi James, I understand you've accidentally deleted your presentation files. First, check the Recycle Bin on your computer — files are often still recoverable from there. Also, if you've been saving to the cloud or email drafts, check those as well. If those options don't work, I'd be happy to help you rebuild the key slides tonight. Let me know what you need.",
    templates: [
      'I understand that...',
      'First, I suggest you...',
      'Another option would be to...',
      "If that doesn't work,...",
      "I'd be happy to help you...",
    ],
    tags: ['직장', '문제해결'],
    memorized: false,
  },
  {
    id: 'sample-p5-2',
    partId: 'p5',
    order: 1,
    prompt:
      '팀장 Sarah에게서 메시지가 왔습니다. 오늘 오후 3시에 예정된 팀 회의가 당신이 이미 잡아놓은 고객 미팅과 시간이 겹쳐서 어떻게 할지 조언을 구하고 있습니다.',
    content: '',
    sampleAnswer:
      "Hi Sarah, I understand there's a scheduling conflict between the team meeting and my client meeting at three p.m. today. I have a couple of suggestions. First, could we move the team meeting to four-thirty p.m.? My client meeting should wrap up by then. Alternatively, if the team meeting cannot be rescheduled, I could join briefly by phone for the first fifteen minutes to get the key updates, and then one of my teammates could fill me in on the rest. Please let me know which option works best for you.",
    templates: [
      "I understand there's a conflict with...",
      'I have a couple of suggestions...',
      'First, could we...?',
      'Alternatively,...',
      'Please let me know which option works best.',
    ],
    tags: ['일정충돌', '비즈니스'],
    memorized: false,
  },
  {
    id: 'sample-p5-3',
    partId: 'p5',
    order: 2,
    prompt:
      '단골 고객 Ms. Kim으로부터 이메일이 왔습니다. 지난주에 주문한 제품이 아직 도착하지 않았고, 내일까지 꼭 필요한 상황이라고 합니다.',
    content: '',
    sampleAnswer:
      "Dear Ms. Kim, I sincerely apologize for the delay in your order. I completely understand how urgent this is for you. I've already contacted our shipping department, and they confirmed your package will be delivered by tomorrow morning. As an apology for the inconvenience, I'd like to offer you a fifteen percent discount on your next purchase. Thank you for your patience, and please don't hesitate to contact me directly if there are any further issues.",
    templates: [
      'I sincerely apologize for...',
      'I completely understand...',
      "I've already... and they confirmed...",
      'As an apology, I would like to offer you...',
      'Please do not hesitate to contact me if...',
    ],
    tags: ['고객응대', '배송'],
    memorized: false,
  },

  // ── Part 6: Express an Opinion ──
  {
    id: 'sample-p6-1',
    partId: 'p6',
    order: 0,
    prompt:
      '원격 근무(재택근무)가 직원 생산성에 긍정적인 영향을 미친다고 생각하나요? 구체적인 이유와 예시를 들어 설명하세요.',
    content: '',
    sampleAnswer:
      "I believe remote work can significantly improve employee productivity. When people work from home, they avoid long commutes, which saves both time and energy. This allows them to start work feeling more refreshed. For example, studies have shown that remote workers often complete tasks more efficiently because there are fewer interruptions from coworkers. In my opinion, as long as employees have a dedicated workspace and clear communication with their team, remote work is a highly productive arrangement.",
    templates: [
      'I believe that...',
      'In my opinion,...',
      'For example,...',
      'This is because...',
      'Therefore, I think...',
    ],
    tags: ['원격근무', '의견'],
    memorized: false,
  },
  {
    id: 'sample-p6-2',
    partId: 'p6',
    order: 1,
    prompt:
      '소셜 미디어(SNS)가 현대인의 의사소통 방식에 미치는 긍정적 영향과 부정적 영향에 대해 의견을 말하세요.',
    content: '',
    sampleAnswer:
      "Social media has both positive and negative effects on modern communication. On the positive side, it allows people to stay connected with friends and family across great distances instantly and for free. It also helps people discover diverse perspectives and news from around the world. However, there are notable downsides. Excessive social media use can reduce face-to-face interaction, which may weaken personal relationships over time. Additionally, misinformation can spread quickly and be difficult to control. Overall, I think social media is a powerful tool, but we need to use it mindfully to maximize its benefits while minimizing the harm.",
    templates: [
      '... has both positive and negative effects on...',
      'On the positive side,...',
      'However, there are notable downsides...',
      'Overall, I think... but we need to...',
    ],
    tags: ['SNS', '기술', '의견'],
    memorized: false,
  },
  {
    id: 'sample-p6-3',
    partId: 'p6',
    order: 2,
    prompt:
      '대중교통과 자가용 중 어느 것이 도시 생활에 더 적합하다고 생각하나요? 이유를 들어 설명하세요.',
    content: '',
    sampleAnswer:
      "In my opinion, public transportation is more suitable for city life. Cities are often congested with traffic, and using public transit helps reduce the number of vehicles on the road, which decreases both traffic jams and air pollution. For example, in cities like Seoul, the subway system is so efficient and affordable that many people choose it over driving. Furthermore, public transportation allows commuters to read, rest, or work during their journey, which is impossible when driving. While having a personal vehicle offers flexibility, I believe the environmental and economic benefits of public transport make it the better choice for urban residents.",
    templates: [
      'In my opinion, ... is more suitable for... because...',
      'For example, in cities like...',
      'Furthermore,...',
      'While ... offers ..., I believe... makes it the better choice.',
    ],
    tags: ['교통', '도시', '의견'],
    memorized: false,
  },
]

export function useToeicData() {
  const [questions, setQuestions] = useLocalStorage('toeic_questions', INITIAL_QUESTIONS)

  function questionsForPart(partId) {
    return questions
      .filter((q) => q.partId === partId)
      .sort((a, b) => a.order - b.order)
  }

  function questionById(id) {
    return questions.find((q) => q.id === id)
  }

  function addQuestion(partId, prompt) {
    const siblings = questions.filter((q) => q.partId === partId)
    const newQ = {
      id: crypto.randomUUID(),
      partId,
      order: siblings.length,
      prompt,
      content: '',
      sampleAnswer: '',
      templates: [],
      tags: [],
      memorized: false,
    }
    setQuestions((prev) => [...prev, newQ])
    return newQ.id
  }

  function updateQuestion(id, patch) {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, ...patch } : q))
    )
  }

  function deleteQuestion(id) {
    const q = questions.find((item) => item.id === id)
    if (!q) return
    setQuestions((prev) => {
      const filtered = prev.filter((item) => item.id !== id)
      return filtered.map((item) =>
        item.partId === q.partId && item.order > q.order
          ? { ...item, order: item.order - 1 }
          : item
      )
    })
  }

  function toggleMemorized(id) {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, memorized: !q.memorized } : q))
    )
  }

  function progressForPart(partId) {
    const qs = questionsForPart(partId)
    const total = qs.length
    const done = qs.filter((q) => q.memorized).length
    return { total, done, pct: total === 0 ? 0 : Math.round((done / total) * 100) }
  }

  function overallProgress() {
    const total = questions.length
    const done = questions.filter((q) => q.memorized).length
    return { total, done, pct: total === 0 ? 0 : Math.round((done / total) * 100) }
  }

  function exportData() {
    return JSON.stringify({ version: 1, questions }, null, 2)
  }

  function importData(jsonString) {
    try {
      const data = JSON.parse(jsonString)
      if (data.questions) {
        setQuestions(data.questions)
        return true
      }
      return false
    } catch {
      return false
    }
  }

  return {
    questions,
    questionsForPart,
    questionById,
    addQuestion,
    updateQuestion,
    deleteQuestion,
    toggleMemorized,
    progressForPart,
    overallProgress,
    exportData,
    importData,
  }
}
