import { useLocalStorage } from './useLocalStorage'

const INITIAL_QUESTIONS = [
  // ── Part 1: Read a Text Aloud ──
  {
    id: 'sample-p1-1',
    partId: 'p1',
    order: 0,
    prompt: 'Q1 - 회사 야유회 공지문',
    content:
      "We are pleased to announce that the annual Hartwell Industries employee appreciation picnic will be held on Saturday, August 17th, from eleven a.m. to four p.m. at Lakeview Community Park. All full-time and part-time employees, along with their immediate family members, are warmly invited to attend. This year's event will feature a catered barbecue lunch, lawn games, a raffle drawing with exciting prizes, and live music performed by a local jazz band. To help us with catering arrangements, please submit your attendance form to the Human Resources department no later than Friday, August 9th.",
    sampleAnswer: '',
    templates: [],
    tags: ['공지', '회사'],
    memorized: false,
  },
  {
    id: 'sample-p1-2',
    partId: 'p1',
    order: 1,
    prompt: 'Q2 - 헬스클럽 광고문',
    content:
      'Are you ready to take your fitness to the next level? Join Pinnacle Fitness Center this month and enjoy our most competitive rates of the year. For just forty-nine dollars per month, members receive unlimited access to our state-of-the-art gym facilities, over sixty weekly group exercise classes, and free use of our indoor swimming pool and sauna. New members who sign up before September 30th will also receive a complimentary one-hour personal training session with one of our certified coaches. Visit us at 240 Westfield Avenue, or call five-five-five, zero-one-nine-zero to speak with a membership advisor today.',
    sampleAnswer: '',
    templates: [],
    tags: ['광고', '헬스'],
    memorized: false,
  },
  {
    id: 'sample-p1-3',
    partId: 'p1',
    order: 2,
    prompt: 'Q3 - 공항 탑승 안내 방송',
    content:
      'Attention, all passengers booked on Skyline Airways Flight SL 408 with service to Vancouver, Canada. We regret to inform you that this flight has been delayed due to a late-arriving aircraft from our previous destination. Updated boarding is now scheduled to begin at six fifty p.m. at Gate B-fourteen. The revised departure time is seven twenty-five p.m. Passengers requiring special assistance or traveling with young children are welcome to begin boarding at six forty p.m. We sincerely apologize for this inconvenience and appreciate your understanding. Please remain in the gate area and listen for further announcements.',
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
      'Welcome to the Greenfield Public Library. Our main branch is open Monday through Thursday from nine a.m. to eight p.m., Friday and Saturday from nine a.m. to six p.m., and Sunday from noon to five p.m. Library cards are available free of charge to all residents of Greenfield County. Cardholders may borrow up to ten items at a time for a lending period of three weeks. Items may be renewed online, by phone, or in person, provided no other patron has placed a hold on the material. Overdue fines are assessed at twenty-five cents per day per item. For inquiries, please visit the information desk or call us at five-five-five, two-four-seven-zero.',
    sampleAnswer: '',
    templates: [],
    tags: ['도서관', '공지'],
    memorized: false,
  },
  {
    id: 'sample-p1-5',
    partId: 'p1',
    order: 4,
    prompt: 'Q5 - 전자제품 사용 설명',
    content:
      'Thank you for choosing the ClearSound Pro wireless noise-canceling headphones. Before using your headphones for the first time, please charge the battery fully by connecting the included USB-C cable to a power source. A full charge takes approximately two hours and provides up to thirty hours of continuous playback. To pair the headphones with your device, press and hold the Bluetooth button on the right ear cup for three seconds until the indicator light flashes blue. The headphones will automatically connect to the last paired device when powered on. If you experience any technical difficulties, please contact our customer support team at www dot clearsoundpro dot com or call one-eight-hundred, five-five-five, seven-seven-three-two.',
    sampleAnswer: '',
    templates: [],
    tags: ['제품설명', '전자제품'],
    memorized: false,
  },

  // ── Part 2: Describe a Picture ──
  {
    id: 'sample-p2-1',
    partId: 'p2',
    order: 0,
    prompt: 'Q3 - 슈퍼마켓 계산대',
    content:
      '[사진 힌트] 슈퍼마켓 계산대 / 유니폼 입은 직원이 바코드 스캐너로 물건을 스캔 중 / 고객이 맞은편에서 지갑을 꺼내는 중 / 컨베이어 벨트 위에 식료품(과일, 통조림, 음료수) 놓여있음 / 뒤에 다른 고객들이 줄 서있음',
    sampleAnswer:
      "This picture shows the checkout area of a supermarket. In the center of the image, a store employee wearing a uniform is scanning items at the register using a barcode scanner. Standing across from the cashier, a customer appears to be taking out a wallet, getting ready to make a payment. On the conveyor belt in front of the cashier, there are various grocery items including what looks like fruits, canned goods, and a bottle of juice. In the background, several other shoppers are waiting in line. The store looks well-lit and organized.",
    templates: [
      'This picture shows...',
      'In the center of the image,...',
      'On the left/right side of the picture,...',
      'In the background,...',
      'The overall atmosphere appears to be...',
    ],
    tags: ['슈퍼마켓', '실내'],
    memorized: false,
  },
  {
    id: 'sample-p2-2',
    partId: 'p2',
    order: 1,
    prompt: 'Q4 - 야외 건설 현장',
    content:
      '[사진 힌트] 야외 건설 현장 / 노란 안전모·형광 조끼 착용한 작업자 여러 명 / 한 명이 도면을 들고 다른 사람에게 설명하는 중 / 배경에 크레인과 철골 구조물 / 자재들이 현장 한쪽에 정리되어 있음',
    sampleAnswer:
      "In this photo, I can see an outdoor construction site. Several workers are visible in the foreground, all wearing yellow hard hats and bright safety vests. One of the workers appears to be holding a large blueprint or set of documents and seems to be explaining something to the others. In the background, there is a tall crane and what looks like the steel framework of a building under construction. Construction materials and equipment are neatly arranged on one side of the site. The sky is clear, suggesting it is a fair-weather day, and the site looks well-organized and active.",
    templates: [
      'In this photo, I can see...',
      'In the foreground,...',
      'One of the [people] appears to be...',
      'In the background, there is...',
      'The site/area looks...',
    ],
    tags: ['건설', '야외'],
    memorized: false,
  },
  {
    id: 'sample-p2-3',
    partId: 'p2',
    order: 2,
    prompt: 'Q5 - 카페 내부',
    content:
      '[사진 힌트] 실내 카페 / 앞치마 두른 바리스타가 에스프레소 머신으로 음료 제조 중 / 카운터 맞은편 고객이 주문 기다리는 중 / 카운터에 컵과 커피 장비 / 뒤쪽 벽에 대형 메뉴판 / 따뜻한 조명, 아늑한 분위기',
    sampleAnswer:
      "This picture appears to be taken inside a coffee shop. Behind the counter, a barista wearing an apron is operating what looks like an espresso machine, in the process of preparing a beverage. Across the counter, a customer is standing and waiting for their order. The counter area is neatly organized with various cups and coffee-making equipment. On the wall behind the barista, there is a large menu board that displays what are likely drink options and their prices. The café has warm lighting and appears to have a cozy, welcoming atmosphere.",
    templates: [
      'This picture appears to be taken inside...',
      'Behind/in front of the counter,...',
      'The [person] is in the process of...',
      'The [place] has... and appears to have...',
    ],
    tags: ['카페', '실내'],
    memorized: false,
  },

  // ── Part 3: Respond to Questions ──
  {
    id: 'sample-p3-1',
    partId: 'p3',
    order: 0,
    prompt:
      '주제: 교통수단\nQ5. 평소 직장이나 학교에 어떻게 이동하나요?\nQ6. 출퇴근하는 데 보통 얼마나 걸리나요?\nQ7. 내가 사는 도시의 대중교통에서 가장 큰 문제점은 무엇이고, 어떻게 개선할 수 있을까요?',
    content: '',
    sampleAnswer:
      "Q5. I usually take the subway to work. It's fast and I don't have to worry about traffic or parking.\nQ6. My commute takes about forty minutes each way. It can be a bit longer during rush hour.\nQ7. I think the biggest problem with public transportation in my city is overcrowding, especially on subway lines during the morning and evening rush hours. The trains are so packed that it's quite uncomfortable. To improve this, I think the city should increase the frequency of trains during peak hours and encourage companies to adopt flexible working hours so that not everyone has to commute at exactly the same time.",
    templates: [
      'I usually... because...',
      'My commute takes about... It can be...',
      'I think the biggest problem is... To improve this,...',
    ],
    tags: ['교통', '통근'],
    memorized: false,
  },
  {
    id: 'sample-p3-2',
    partId: 'p3',
    order: 1,
    prompt:
      '주제: 기술/스마트폰\nQ5. 하루에 스마트폰을 얼마나 자주 사용하나요?\nQ6. 스마트폰으로 주로 무엇을 하나요?\nQ7. 우리가 일상생활에서 기술에 지나치게 의존하고 있다고 생각하나요? 이유를 설명하세요.',
    content: '',
    sampleAnswer:
      "Q5. I use my smartphone constantly throughout the day — probably for several hours in total, both for work and personal use.\nQ6. I mainly use it for messaging, checking emails, and browsing social media. I also use it a lot for navigation and online banking.\nQ7. Honestly, I do think we rely on technology too much these days. Most people feel anxious if they leave their phone at home, and many of us struggle to focus without checking our devices every few minutes. That said, I believe technology itself isn't the problem — it's how we use it. We need to set boundaries and be more intentional about when and how we use our devices.",
    templates: [
      'I use my smartphone... for both... and...',
      'I mainly use it for...',
      'I do/do not think we rely on technology too much because...',
      "That said, I believe... isn't the problem — it's...",
    ],
    tags: ['기술', '스마트폰'],
    memorized: false,
  },
  {
    id: 'sample-p3-3',
    partId: 'p3',
    order: 2,
    prompt:
      '주제: 여가·취미\nQ5. 여가 시간에 주로 무엇을 하며 보내나요?\nQ6. 그 활동을 얼마나 자주 하나요?\nQ7. 일과 여가 시간 사이의 균형을 유지하는 것이 왜 중요하다고 생각하나요?',
    content: '',
    sampleAnswer:
      "Q5. In my free time, I enjoy reading and going for walks. I find these activities very relaxing after a busy week.\nQ6. I try to read for at least thirty minutes every day before bed, and I go for a walk two or three times a week, usually in the evenings.\nQ7. I think maintaining a balance between work and leisure is extremely important for both mental and physical well-being. Without enough downtime, people are more likely to experience burnout, which actually reduces their productivity at work. When people have time to recharge and do things they enjoy, they tend to be more motivated and focused. So in the long run, taking time off benefits not just individuals but also the organizations they work for.",
    templates: [
      'In my free time, I enjoy... I find it...',
      'I try to... at least... every...',
      'I think... is important because... Without it,...',
      'In the long run,...',
    ],
    tags: ['여가', '취미', '워라밸'],
    memorized: false,
  },

  // ── Part 4: Respond to Questions Using Information Provided ──
  {
    id: 'sample-p4-1',
    partId: 'p4',
    order: 0,
    prompt:
      'Q8. 컨퍼런스는 어디서 열리나요?\nQ9. 얼리버드 등록 마감일과 요금은 얼마인가요?\nQ10. 오전 10시에 도착한다면 어떤 세션에 참석할 수 있나요? 그리고 어떤 세션을 가장 추천하나요?',
    content:
      'NATIONAL BUSINESS INNOVATION CONFERENCE\nDate: Thursday, October 10th\nVenue: Maplewood Convention Center, Hall B\nRegistration deadline: October 3rd\nWebsite: www.nbic2024.com\n\n[Registration Fees]\nEarly Bird (by Sept. 20): $120\nRegular: $180\n\n[Schedule]\n09:00 - 10:00  Registration & Networking\n10:00 - 11:30  Opening Keynote: Future of AI in Business\n12:00 - 13:30  Lunch Break\n13:30 - 15:00  Workshop A: Digital Marketing Trends\n13:30 - 15:00  Workshop B: Financial Planning for Startups\n15:30 - 17:00  Closing Keynote & Awards Ceremony',
    sampleAnswer:
      "Q8. The conference will be held at Maplewood Convention Center, Hall B.\nQ9. The early bird registration fee is one hundred and twenty dollars, and the deadline for that rate is September 20th.\nQ10. If you arrive at ten a.m., you will be just in time for the opening keynote on the future of AI in business, which runs until eleven-thirty. As for recommendations, I would suggest attending Workshop A on digital marketing trends in the afternoon, as it's a highly relevant topic for most businesses today.",
    templates: [
      'The [event] will be held at...',
      'The early bird fee is... and the deadline is...',
      'If you arrive at..., you will be in time for...',
      'I would suggest... because...',
    ],
    tags: ['컨퍼런스', '일정', '비즈니스'],
    memorized: false,
  },
  {
    id: 'sample-p4-2',
    partId: 'p4',
    order: 1,
    prompt:
      'Q8. 런치 스페셜은 어떤 메뉴 조합이고 얼마인가요?\nQ9. 6명 이상 단체 주문 시 서비스 요금은 어떻게 적용되나요?\nQ10. 그릴드 새먼과 가든 샐러드를 따로 주문하면 얼마인가요? 런치 스페셜로 주문하는 게 나을까요?',
    content:
      'MEDITERRA BISTRO — Lunch Menu  (11:30 AM – 3:00 PM)\n\n[ STARTERS ]\nGarden Salad .............. $8\nTomato Soup ............... $7\nBruschetta ................ $9\n\n[ MAIN COURSES ]\nGrilled Salmon ............ $22\nPasta Primavera ........... $16\nChicken Marsala ........... $19\nVeggie Burger ............. $14\n\n[ DESSERTS ]\nTiramisu .................. $8\nClassic Cheesecake ........ $7\n\n* Lunch Special: Any starter + any main course = $20  (Mon–Fri only)\n* 10% service charge applied to parties of 6 or more',
    sampleAnswer:
      "Q8. The lunch special lets you choose any starter plus any main course for a flat price of twenty dollars, and it's available Monday through Friday only.\nQ9. For parties of six or more, a ten percent service charge will be automatically added to the total bill.\nQ10. If you order the grilled salmon and the garden salad separately, that comes to thirty dollars in total — twenty-two for the salmon plus eight for the salad. With the lunch special, the same combination would only cost twenty dollars, saving you ten dollars. So yes, I would definitely recommend going with the lunch special if it's a weekday.",
    templates: [
      'The [special] lets you... for...',
      'For parties of... a ...% service charge will be added.',
      'If you order... separately, that comes to... in total.',
      'With the [special], the same combination would only cost..., saving you...',
    ],
    tags: ['레스토랑', '메뉴'],
    memorized: false,
  },
  {
    id: 'sample-p4-3',
    partId: 'p4',
    order: 2,
    prompt:
      'Q8. 스탠다드 룸의 1박 요금은 얼마인가요?\nQ9. 체크아웃 시간은 몇 시인가요?\nQ10. 피트니스 센터와 수영장 중 어느 것이 더 늦게까지 운영되나요? 그리고 호텔 시설 중 가장 추천하는 것은 무엇인가요?',
    content:
      'BLUEWAVE HOTEL — Guest Information\n\n[ Room Rates (per night) ]\nStandard Room ............. $120\nDeluxe Room ............... $180\nSuite ..................... $280\n\nCheck-in: 3:00 PM  |  Check-out: 12:00 PM (noon)\nLate check-out available upon request (subject to availability, $30 fee)\n\n[ Facilities & Hours ]\nSwimming Pool ............. 06:00 – 22:00\nFitness Center ............ 06:00 – 23:00\nRestaurant ................ 07:00 – 22:00\nSpa & Wellness Center ..... 10:00 – 21:00\nBusiness Center ........... 08:00 – 20:00',
    sampleAnswer:
      "Q8. The standard room rate is one hundred and twenty dollars per night.\nQ9. Check-out time is at noon, twelve p.m. However, late check-out is available upon request for an additional fee of thirty dollars.\nQ10. The fitness center stays open until eleven p.m., which is one hour later than the swimming pool, which closes at ten p.m. As for recommendations, I would suggest the spa and wellness center if you're looking to unwind after a long day. It's a great way to relax during your stay, though keep in mind it closes at nine p.m., so plan accordingly.",
    templates: [
      'The [room] rate is... per night.',
      'Check-out time is at... However, late check-out is available...',
      'The [facility] stays open until..., which is... later than...',
      "I would suggest... if you're looking to... Keep in mind that...",
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
      '보이스메일 내용: "안녕하세요, 저는 마케팅팀의 David Park입니다. 오늘 오후에 저희 팀과 귀하의 팀이 금요일 오후 2시~4시에 회의실 3B를 겹쳐서 예약했다는 걸 알게 됐습니다. 저희는 해외에서 오는 고객사 프레젠테이션이라 꼭 그 시간이 필요합니다. 내선번호 4-2-3으로 연락 주시면 해결책을 찾아보고 싶습니다. 감사합니다."',
    content: '',
    sampleAnswer:
      "Hi David, this is [name] returning your call. I completely understand — a client presentation with overseas visitors is definitely a priority. I'm happy to work something out. I have two suggestions. First, my team could move our meeting to Conference Room 2A, if it's available. I'll check right away and let you know within the hour. Alternatively, if both rooms are booked, we could reschedule our meeting to Monday morning instead, since our agenda isn't time-sensitive. Please let me know if either of those options works for you, and I'll take care of it immediately. You can reach me at extension 2-1-7.",
    templates: [
      'I completely understand — [situation] is definitely a priority.',
      'I have two suggestions.',
      'First,... I will check right away and let you know...',
      'Alternatively, we could...',
      'Please let me know if either option works, and I will...',
    ],
    tags: ['일정충돌', '회의실', '비즈니스'],
    memorized: false,
  },
  {
    id: 'sample-p5-2',
    partId: 'p5',
    order: 1,
    prompt:
      '보이스메일 내용: "안녕하세요, Maple Catering의 이벤트 코디네이터 Lisa Chen입니다. 다음 주 토요일 저녁 예약 건으로 연락드립니다. 저희 메인 연회장에 배관 문제가 생겨서 사용이 불가능해졌습니다. 80명 수용 대신 50명짜리 소규모 홀만 사용 가능한 상황입니다. 오늘 오후까지 555-8820으로 연락 주시면 해결책을 찾아보겠습니다. 죄송합니다."',
    content: '',
    sampleAnswer:
      "Hello, Lisa. This is [name] calling back about our Saturday evening event. Thank you for letting me know as soon as possible — I appreciate that. I understand this is a difficult situation, and I'd like to explore our options. First, I'd like to ask whether there are any other venues you work with that could accommodate eighty guests on short notice. If not, we could consider using the smaller hall and limiting the guest list to fifty people, prioritizing the most important attendees. Another option would be to postpone the event by one or two weeks if the main hall will be repaired by then. Could you let me know the expected repair timeline? Please call me back at five-five-five, three-four-one-two at your earliest convenience.",
    templates: [
      'Thank you for letting me know as soon as possible.',
      "I'd like to explore our options.",
      "First, I'd like to ask whether...",
      'If not, we could consider...',
      'Another option would be to...',
      'Could you let me know...? Please call me back at...',
    ],
    tags: ['이벤트', '장소변경', '문제해결'],
    memorized: false,
  },
  {
    id: 'sample-p5-3',
    partId: 'p5',
    order: 2,
    prompt:
      '보이스메일 내용: "안녕하세요, 저는 단골 고객 Ms. Rachel Turner입니다. 지난주 화요일에 온라인으로 주문한 사무용 의자가 아직도 도착하지 않았습니다. 주문 확인서에는 3~5일 배송이라고 나와 있었는데 벌써 7일이 지났습니다. 중요한 재택근무 회의가 이번 주 금요일인데 꼭 필요합니다. 555-9031로 연락 주세요."',
    content: '',
    sampleAnswer:
      "Hello, Ms. Turner. This is [name] from customer service, returning your call. I sincerely apologize for this delay — I completely understand how frustrating this must be, especially with an important meeting coming up on Friday. I've already looked into your order, and it appears there was an unexpected delay at our distribution center. I've escalated your case to our logistics team and requested priority delivery. Your chair should arrive by Thursday at the latest. To make up for this inconvenience, I'd like to offer you a full refund of your shipping fee and a fifteen-dollar store credit for your next purchase. I'll send a confirmation email within the next thirty minutes. Again, I'm very sorry for the trouble, and please don't hesitate to call me directly if anything comes up.",
    templates: [
      'I sincerely apologize for this delay — I completely understand...',
      "I've already looked into your order, and it appears...",
      "I've escalated your case and requested...",
      'Your [item] should arrive by...',
      "To make up for this, I'd like to offer you...",
      "I'll send a confirmation... Again, I'm very sorry for...",
    ],
    tags: ['고객응대', '배송지연'],
    memorized: false,
  },
  {
    id: 'sample-p5-4',
    partId: 'p5',
    order: 3,
    prompt:
      '보이스메일 내용: "안녕하세요, IT팀의 Kevin Marsh입니다. 내일 오전 10시 임원 발표에 사용할 프로젝터가 방금 고장났습니다. 회의실 3개를 확인했는데 모두 같은 모델이라 대체품이 없는 상황입니다. 발표 자료가 꼭 스크린에 표시돼야 해서 매우 급합니다. 내선번호 5-0-7로 연락 주시면 감사하겠습니다."',
    content: '',
    sampleAnswer:
      "Hi Kevin, this is [name] returning your call. I completely understand — a projector failure right before an executive presentation is a serious issue, and I want to help resolve this as quickly as possible. Here are two options. First, we could connect a laptop directly to the conference room TV using an HDMI cable. Most modern TVs in our meeting rooms support this, and it should work as a solid backup display. Alternatively, if you need a larger screen, I can contact our facilities team right now to see if they can source a rental projector on short notice — some vendors offer same-day delivery. I'm going to start making calls immediately. Please check your email in the next twenty minutes for an update. You can also reach me directly at extension 3-1-2.",
    templates: [
      '① 공감: I completely understand — [상황] is a serious issue.',
      '② 해결책 예고: Here are two options.',
      '③ 1안: First, we could [구체적 대안].',
      '④ 2안: Alternatively, I can contact [담당자/팀] to [조치].',
      '⑤ 즉시 행동: I\'m going to [행동] immediately.',
      '⑥ 후속 연락: Please check your [email/phone] in the next [시간] for an update.',
    ],
    tags: ['장비고장', '발표', '긴급'],
    memorized: false,
  },
  {
    id: 'sample-p5-5',
    partId: 'p5',
    order: 4,
    prompt:
      '보이스메일 내용: "안녕하세요, 저는 신입사원 Amy Cho입니다. 오늘부터 온보딩인데 HR에서 제 컴퓨터 계정과 사원증이 아직 준비가 안 됐다고 합니다. 배정된 팀장님은 출장 중이시고, 어디서 무엇을 해야 할지 몰라서 연락드렸습니다. 555-2241로 연락 주시면 감사하겠습니다."',
    content: '',
    sampleAnswer:
      "Hi Amy, welcome to the company! This is [name] from the HR department. I'm so sorry that your first day hasn't started as smoothly as it should have — I completely take responsibility for this oversight. Please don't worry; I'm going to sort everything out for you right now. First, please come to the HR office on the second floor, Room 201. I'll have a temporary access badge ready for you within the next fifteen minutes so you can move around the building freely. Regarding your computer account, I've already submitted an urgent request to our IT team and they've confirmed it will be activated by noon today. In the meantime, I'll set you up with some onboarding reading materials and introduce you to a team member who can show you around. Again, I apologize for the inconvenience, and I'll make sure the rest of your onboarding goes smoothly. See you shortly!",
    templates: [
      '① 환영+사과: Welcome! I\'m sorry that [상황] — I take responsibility for this.',
      '② 안심: Please don\'t worry; I\'m going to sort everything out right now.',
      '③ 즉각 조치 1: First, please [행동]. I\'ll have [결과] ready within [시간].',
      '④ 즉각 조치 2: Regarding [문제], I\'ve already [조치] and they confirmed [결과].',
      '⑤ 임시 대안: In the meantime, I\'ll [임시 해결책].',
      '⑥ 재사과+마무리: Again, I apologize, and I\'ll make sure [약속].',
    ],
    tags: ['온보딩', 'HR', '신입사원'],
    memorized: false,
  },
  {
    id: 'sample-p5-6',
    partId: 'p5',
    order: 5,
    prompt:
      '보이스메일 내용: "안녕하세요, 마케팅팀 팀장 Sandra Lee입니다. 어제 외부 업체에 보낸 디자인 시안 파일에 회사 기밀 내용이 포함된 슬라이드가 실수로 첨부됐다는 걸 방금 발견했습니다. 담당자인 귀하가 직접 처리해줄 수 있을까요? 내선 2-9-8로 바로 연락 주세요."',
    content: '',
    sampleAnswer:
      "Hi Sandra, this is [name]. Thank you for catching this immediately — I understand this is a sensitive situation and needs to be handled urgently. I'm taking action right now. First, I've already sent an email to our contact at the vendor asking them to delete the file immediately and confirm in writing that no copies were made or shared. I've also flagged this to our legal and compliance team as a precaution, as they may need to assess the potential exposure. Second, I'm reviewing how that slide was attached in the first place so we can prevent this from happening again — I'll have a brief incident report ready for you by end of day. Please rest assured that I'm treating this as the top priority. I'll call you back within the next thirty minutes with a full update.",
    templates: [
      '① 즉각 인식: I understand this is sensitive and needs to be handled urgently.',
      '② 이미 취한 조치: I\'ve already [조치1] asking them to [요청].',
      '③ 에스컬레이션: I\'ve also flagged this to [팀/부서] as a precaution.',
      '④ 재발 방지: I\'m reviewing how [문제] happened to prevent recurrence.',
      '⑤ 보고 약속: I\'ll have a [report/update] ready for you by [시간].',
      '⑥ 우선순위 확인: I\'m treating this as the top priority.',
    ],
    tags: ['기밀유출', '위기관리', '비즈니스'],
    memorized: false,
  },

  // ── Part 6: Express an Opinion ──
  {
    id: 'sample-p6-1',
    partId: 'p6',
    order: 0,
    prompt:
      '일부 회사들은 직원들이 주당 총 근무 시간만 채우면 출퇴근 시간을 자유롭게 선택할 수 있는 유연근무제를 도입하고 있습니다. 유연근무제가 직원과 회사 모두에게 이익이 된다고 생각하나요? 구체적인 이유와 예시를 들어 설명하세요.',
    content: '',
    sampleAnswer:
      "I strongly believe that flexible working hours benefit both employees and companies. For employees, the ability to choose their own schedule reduces stress and improves work-life balance. For example, a parent can drop their children off at school in the morning and start work later, without feeling rushed or guilty. This kind of flexibility leads to higher job satisfaction and lower turnover rates, which directly benefits the company. Additionally, when employees can work during their most productive hours — whether that's early morning or late evening — the quality of their output tends to improve. Of course, flexible schedules require strong communication and clear expectations to avoid confusion, but these challenges can easily be managed with the right systems in place. Overall, I think the advantages far outweigh the drawbacks.",
    templates: [
      'I strongly believe that... benefits both... and...',
      'For [employees/companies],...',
      'For example,...',
      'This leads to..., which directly...',
      'Of course,... require... but these challenges can be managed by...',
      'Overall, I think the advantages far outweigh the drawbacks.',
    ],
    tags: ['유연근무', '직장', '의견'],
    memorized: false,
  },
  {
    id: 'sample-p6-2',
    partId: 'p6',
    order: 1,
    prompt:
      '많은 사람들이 공부하거나 일하는 동안 음악을 듣습니다. 음악을 들으면서 공부하거나 일하는 것이 생산성에 도움이 된다고 생각하나요, 아니면 방해가 된다고 생각하나요? 구체적인 이유와 예시를 들어 의견을 밝히세요.',
    content: '',
    sampleAnswer:
      "In my opinion, whether music helps or hinders productivity depends largely on the type of task and the individual. For repetitive or routine tasks, such as data entry or cleaning, I think music can be very beneficial. It keeps energy levels up and makes the work feel less tedious. However, for tasks that require deep concentration, such as writing a report or solving a complex problem, music with lyrics can be distracting because the brain tries to process both the words in the music and the words you're trying to write at the same time. Personally, I find that instrumental music or ambient sounds help me focus without causing distraction. So my view is that music can be a useful productivity tool, but it needs to be chosen carefully based on what you're working on.",
    templates: [
      'In my opinion, whether... depends largely on...',
      'For [type of task],...',
      'However, for tasks that require...',
      'Personally, I find that...',
      'So my view is that... but it needs to be...',
    ],
    tags: ['음악', '생산성', '의견'],
    memorized: false,
  },
  {
    id: 'sample-p6-3',
    partId: 'p6',
    order: 2,
    prompt:
      '일부 전문가들은 아이들에게 초등학교부터 제2외국어를 가르쳐야 한다고 주장하는 반면, 중학교나 고등학교부터 시작하는 것이 더 효과적이라고 주장하는 사람들도 있습니다. 어떤 접근 방식이 더 낫다고 생각하나요? 구체적인 이유와 예시를 들어 설명하세요.',
    content: '',
    sampleAnswer:
      "I believe that introducing a second language in elementary school is the more effective approach. Research in linguistics shows that young children have a natural ability to absorb new languages much more easily than adults. Their brains are still in a critical developmental period where they can pick up pronunciation, grammar, and vocabulary almost intuitively, without the self-consciousness that older learners often experience. For example, children who start learning English in kindergarten or first grade tend to develop near-native accents and a more natural feel for the language compared to those who begin in middle school. Furthermore, starting early gives students more years of exposure and practice before they need the language for academic or professional purposes. While some argue that young children should focus on mastering their native language first, I think that with the right teaching methods, learning two languages simultaneously actually strengthens overall cognitive development rather than hindering it.",
    templates: [
      'I believe that... is the more effective approach.',
      'Research shows that...',
      'For example, children who... tend to...',
      'Furthermore, starting early...',
      'While some argue that..., I think that... actually... rather than...',
    ],
    tags: ['교육', '언어학습', '의견'],
    memorized: false,
  },
  {
    id: 'sample-p6-4',
    partId: 'p6',
    order: 3,
    prompt:
      '직장에서 팀워크와 개인 역량 중 어느 것이 성공에 더 중요하다고 생각하나요? 구체적인 이유와 예시를 들어 설명하세요.',
    content: '',
    sampleAnswer:
      "While both teamwork and individual skill are important, I believe teamwork is ultimately more critical to success in the modern workplace. No matter how talented an individual may be, complex projects today require collaboration across multiple areas of expertise that no single person can master alone. For example, developing a successful product requires engineers, designers, marketers, and project managers working in sync. If these people cannot communicate and cooperate effectively, even the most skilled individuals will fail to deliver results. Of course, individual competence is the foundation — you need capable people for a team to function. But I would argue that a team of moderately skilled people who collaborate well will consistently outperform a group of brilliant individuals who cannot work together. For this reason, companies should invest as much in building team culture and communication skills as they do in hiring individual talent.",
    templates: [
      '① 입장: While both [A] and [B] are important, I believe [A] is ultimately more critical because...',
      '② 이유: No matter how [adjective] an individual may be, [이유].',
      '③ 예시: For example, [구체적 상황] requires [여러 요소] working in sync.',
      '④ 인정+반박: Of course, [반대 입장] — but I would argue that [내 주장].',
      '⑤ 결론: For this reason, [주체] should [행동 제안].',
    ],
    tags: ['직장', '팀워크', '의견'],
    memorized: false,
  },
  {
    id: 'sample-p6-5',
    partId: 'p6',
    order: 4,
    prompt:
      '온라인 교육이 전통적인 오프라인 교육을 완전히 대체할 수 있다고 생각하나요? 구체적인 이유와 예시를 들어 의견을 밝히세요.',
    content: '',
    sampleAnswer:
      "I do not think online education can fully replace traditional in-person learning, although it is certainly a powerful complement to it. While online platforms offer undeniable advantages — such as flexibility, accessibility, and lower cost — they fall short in several critical areas. First, in-person education provides irreplaceable social development. Students learn not just from textbooks but from interacting with peers, navigating group dynamics, and developing communication skills in real-time situations. These are skills that a screen simply cannot replicate. Second, certain fields, such as medicine, laboratory science, and the performing arts, inherently require hands-on, physical practice that cannot be effectively conducted online. That said, I believe a blended approach — combining the convenience of online learning with the depth of face-to-face interaction — represents the most effective educational model going forward. Rather than viewing the two as competitors, we should see them as complementary tools.",
    templates: [
      '① 입장(부분 동의): I do not think [A] can fully replace [B], although it is certainly [긍정 인정].',
      '② 첫 번째 한계: First, [온라인/A]의 한계. [구체 이유].',
      '③ 두 번째 한계: Second, certain fields such as [예시] inherently require [오프라인/B].',
      '④ 절충안 제시: That said, I believe a blended approach — [설명] — represents the most effective model.',
      '⑤ 프레임 전환: Rather than viewing the two as competitors, we should see them as [관계].',
    ],
    tags: ['교육', '온라인학습', '의견'],
    memorized: false,
  },
  {
    id: 'sample-p6-6',
    partId: 'p6',
    order: 5,
    prompt:
      '기업들이 환경 보호에 개인보다 더 큰 책임이 있다고 생각하나요? 아니면 환경 문제 해결은 개인의 행동 변화에서 시작돼야 한다고 생각하나요? 이유를 들어 설명하세요.',
    content: '',
    sampleAnswer:
      "I strongly believe that corporations bear the greater responsibility for environmental protection, compared to individuals. While individual habits — such as recycling or reducing energy use — are meaningful, their cumulative impact is relatively small compared to the pollution and carbon emissions generated by large industries. According to various environmental studies, a small number of major corporations account for the majority of global greenhouse gas emissions. If these companies adopted cleaner production methods, renewable energy sources, and more sustainable supply chains, the environmental benefit would be far greater than any lifestyle change individuals could realistically make. Furthermore, individuals are often constrained by the choices corporations make available to them. If a company only offers products with excessive packaging or no eco-friendly alternatives, consumers have limited power to act sustainably regardless of their intentions. That said, I do believe individual awareness is important in creating social pressure on corporations to change. Ultimately, meaningful environmental progress requires systemic change at the corporate and governmental level, not just personal virtue.",
    templates: [
      '① 강한 입장: I strongly believe that [주체] bears the greater responsibility compared to [대조].',
      '② 상대 인정+전환: While [반대 측 행동] are meaningful, their impact is relatively small compared to [내 주장].',
      '③ 통계/데이터 인용: According to [출처], [사실].',
      '④ 구조적 제약 논거: Furthermore, [개인/약자] are often constrained by [강자]의 choices.',
      '⑤ 균형 인정: That said, I do believe [상대 측]\'s role is important in [제한된 역할].',
      '⑥ 강력 결론: Ultimately, meaningful [목표] requires [시스템 변화], not just [개인 행동].',
    ],
    tags: ['환경', '기업책임', '의견'],
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
