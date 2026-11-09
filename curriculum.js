/* =========================================================
   課程資料（課程區 courses.html、課程頁 course.html、互動區 index.html 共用）
   ========================================================= */
/* =========================================================
   科目設定：顏色與卡片插圖
   ========================================================= */
const SUBJECTS = {
  phy:   { name: '物理', color: 'var(--phy)',
           art: '<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="3"><ellipse cx="50" cy="50" rx="44" ry="16"/><ellipse cx="50" cy="50" rx="44" ry="16" transform="rotate(60 50 50)"/><ellipse cx="50" cy="50" rx="44" ry="16" transform="rotate(-60 50 50)"/><circle cx="50" cy="50" r="7" fill="currentColor"/></svg>' },
  chem:  { name: '化學', color: 'var(--chem)',
           art: '<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round"><path d="M38 10h24M42 10v26L18 80a7 7 0 0 0 6 10h52a7 7 0 0 0 6-10L58 36V10"/><path d="M26 66h48" opacity=".6"/><circle cx="44" cy="76" r="4" fill="currentColor"/><circle cx="58" cy="72" r="3" fill="currentColor"/></svg>' },
  bio:   { name: '生物', color: 'var(--bio)',
           art: '<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="3"><path d="M50 92C18 70 12 38 50 8c38 30 32 62 0 84z"/><path d="M50 92V24M50 44l-14-10M50 58l16-12M50 72l-12-8"/></svg>' },
  earth: { name: '地科', color: 'var(--earth)',
           art: '<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="3"><circle cx="50" cy="50" r="40"/><path d="M10 50h80M50 10c14 14 14 66 0 80M50 10c-14 14-14 66 0 80"/><path d="M22 28c10 6 46 6 56 0M22 72c10-6 46-6 56 0" opacity=".6"/></svg>' }
};

/* =========================================================
   108 課綱課程資料
   - url：留空表示「製作中」
   - more：同一單元的其他實驗，會在卡片上多出按鈕
   - subject：phy 物理 / chem 化學 / bio 生物 / earth 地科
   ========================================================= */
const COURSES = [
  {
    id: 'g7', tabLabel: '國一 生物', title: '國一 · 生物',
    desc: '從細胞到生態系，認識生命如何運作與彼此相連。',
    units: [
      { title: '生命的特性',       subject: 'bio', url: 'life-lab.html' },
      { title: '養分',             subject: 'bio', url: 'enzyme-lock-key.html' },
      { title: '生物的運輸與防禦', subject: 'bio', url: 'heart.html' },
      { title: '生物的協調作用',   subject: 'bio', url: 'nerve-lab.html' },
      { title: '生物的恆定性',     subject: 'bio', url: 'homeo-lab.html' },
      { title: '生殖',             subject: 'bio', url: 'reproduction.html',
        more: [{ label: '細胞分裂', url: 'cell-division.html' }] },
      { title: '遺傳',             subject: 'bio', url: 'genetics-lab.html' },
      { title: '地球上的生物',     subject: 'bio', url: 'class-lab.html' },
      { title: '生態系',           subject: 'bio', url: 'ecosystem-lab.html' },
      { title: '人類與環境',       subject: 'bio', url: 'environment-lab.html' }
    ]
  },
  {
    id: 'g8', tabLabel: '國二 理化', title: '國二 · 理化',
    desc: '從測量與物質出發，探索波、光、熱與化學反應的規律。',
    units: [
      { title: '科學方法與基本測量', subject: 'phy',  url: 'measure-lab.html' },
      { title: '物質的世界',         subject: 'chem', url: 'solution-lab.html' },
      { title: '波動與聲音',         subject: 'phy',  url: 'transverse-wave.html' },
      { title: '光',                 subject: 'phy',  url: 'optics-lab.html' },
      { title: '溫度與熱',           subject: 'phy',  url: 'heat-lab.html' },
      { title: '探索物質組成',       subject: 'chem', url: 'matter-lab.html' },
      { title: '化學反應',           subject: 'chem' },
      { title: '氧化與還原',         subject: 'chem' },
      { title: '電解質與酸鹼反應',   subject: 'chem' },
      { title: '反應速率與平衡',     subject: 'chem' },
      { title: '有機化合物',         subject: 'chem' },
      { title: '力與壓力',           subject: 'phy',  url: 'force-pressure-lab.html',
        more: [{ label: '彈簧與力', url: 'force-lab.html' }] }
    ]
  },
  {
    id: 'g9', tabLabel: '國三 理化/地科', title: '國三 · 理化與地科',
    desc: '運動、能量與電磁，再延伸到地球、天氣與浩瀚宇宙。',
    units: [
      { title: '直線運動',                           subject: 'phy',   url: 'kinematics-lab.html' },
      { title: '力與運動',                           subject: 'phy',   url: 'newton-park.html' },
      { title: '功與能',                             subject: 'phy',   url: 'work-energy.html' },
      { title: '基本的靜電現象與電路',               subject: 'phy',   url: 'static-circuit.html' },
      { title: '水與陸地',                           subject: 'earth' },
      { title: '板塊運動與地球歷史：斷層與地球構造', subject: 'earth', url: 'geology-fault.html' },
      { title: '板塊運動與地球歷史：台灣地震',       subject: 'earth', url: 'taiwan-earthquake.html' },
      { title: '宇宙中的天體：月相',                 subject: 'earth', url: 'moon-phases.html' },
      { title: '宇宙中的天體：周日運動',             subject: 'earth', url: 'daily-motion.html' },
      { title: '電的應用：電流的熱效應',             subject: 'phy',   url: 'power-lab.html' },
      { title: '電的應用：電流的化學效應',           subject: 'chem',  url: 'electrochem.html' },
      { title: '電與磁現象',                         subject: 'phy' },
      { title: '千變萬化的天氣：高低氣壓',           subject: 'earth', url: 'weather-pressure.html' },
      { title: '千變萬化的天氣：鋒面',               subject: 'earth', url: 'weather-fronts.html' },
      { title: '千變萬化的天氣：颱風風向',           subject: 'earth', url: 'typhoon-wind.html' },
      { title: '千變萬化的天氣：颱風構造與風速',     subject: 'earth', url: 'typhoon-3d.html' },
      { title: '全球氣候變遷與因應',                 subject: 'earth' }
    ]
  },

  /* ---------- 高中：依翰林版課本目錄（冊 → 章 → 節） ----------
     節的寫法：['1-1', '節名', '動畫網址（可省略）']；章名查不到時留空字串，只顯示「第 n 章」 */
  {
    id: 'h10', tabLabel: '高一 必修', title: '高一 · 必修自然',
    desc: '物理、化學、生物、地球科學四科必修，依翰林版課本章節編排。',
    books: [
      { name: '物理（全）', subject: 'phy', chapters: [
        ['科學的態度與方法', [['1-1', '科學的態度'], ['1-2', '科學的方法'], ['1-3', '物理學簡介']]],
        ['物質的組成與交互作用', [['2-1', '物質的組成'], ['2-2', '原子的尺度與結構'], ['2-3', '物質間的基本交互作用']]],
        ['物體的運動', [['3-1', '對物體運動的描述', 'kinematics-lab.html'], ['3-2', '牛頓運動定律──運動的原因', 'newton-park.html'], ['3-3', '天體運動']]],
        ['電與磁的統一', [['4-1', '電流的磁效應'], ['4-2', '電磁感應'], ['4-3', '電與磁的整合'], ['4-4', '光波'], ['4-5', '都卜勒效應']]],
        ['能量', [['5-1', '功與能量的形式', 'work-energy.html'], ['5-2', '微觀尺度下的能量'], ['5-3', '能量間的轉換與能量守恆'], ['5-4', '質能互換與核能']]],
        ['量子現象', [['6-1', '光電效應與光的粒子性'], ['6-2', '物質波與電子的波動性'], ['6-3', '波粒二象性'], ['6-4', '原子光譜']]]
      ]},
      { name: '化學（全）', subject: 'chem', chapters: [
        ['', [['1-1', '物質的分類、分離及狀態'], ['1-2', '化學的基本定律與莫耳'], ['1-3', '原子結構與元素週期表'], ['1-4', '物質的化學鍵、構造及特性']]],
        ['', [['2-1', '化學式與百分組成'], ['2-2', '化學反應式'], ['2-3', '化學計量'], ['2-4', '化學反應中的能量變化']]],
        ['', [['3-1', '溶液的種類與特性', 'solution-lab.html'], ['3-2', '溶解度'], ['3-3', '酸鹼反應'], ['3-4', '氧化還原反應']]],
        ['', [['4-1', '生活中常見的有機物質'], ['4-2', '科學與人文'], ['4-3', '資源與永續發展']]]
      ]},
      { name: '生物（全）', subject: 'bio', chapters: [
        ['細胞構造與功能', [['1-1', '細胞學說的發展歷程'], ['1-2', '細胞的構造與功能'], ['1-3', '細胞與能量'], ['1-4', '細胞分裂', 'cell-division.html']]],
        ['遺傳', [['2-1', '遺傳法則'], ['2-2', '遺傳的染色體學說之發展歷程'], ['2-3', '遺傳物質'], ['2-4', '基因轉殖及其應用']]],
        ['演化', [['3-1', '演化觀念的發展'], ['3-2', '演化概念對生物分類系統的影響']]]
      ]},
      { name: '地球科學（全）', subject: 'earth', chapters: [
        ['', [['1-1', '地球的起源'], ['1-2', '探索地球歷史']]],
        ['', [['2-1', '地球外的太空'], ['2-2', '從地球看星空'], ['2-3', '恆星亮度與顏色'], ['2-4', '膨脹中的宇宙']]],
        ['', [['3-1', '大氣的結構'], ['3-2', '多變的天氣', 'weather-fronts.html'], ['3-3', '氣象觀測與分析'], ['3-4', '颱風災害', 'typhoon-wind.html']]],
        ['', [['4-1', '海洋的結構'], ['4-2', '海水的運動'], ['4-3', '海洋與氣候']]],
        ['', [['5-1', '固體地球的結構'], ['5-2', '地表與地殼的變動', 'geology-fault.html'], ['5-3', '臺灣的板塊構造'], ['5-4', '地震災害與防治', 'taiwan-earthquake.html']]],
        ['', [['6-1', '氣候變遷的影響'], ['6-2', '永續發展與氣候變遷的調適']]]
      ]}
    ]
  },
  {
    id: 'h11', tabLabel: '高二 選修物理', title: '高二 · 選修物理',
    desc: '選修物理 I 力學一、II 力學二與熱學，依翰林版課本章節編排。',
    books: [
      { name: '選修物理 I　力學一', subject: 'phy', chapters: [
        ['測量與不確定度', [['1-1', '不確定度與有效數字'], ['1-2', '不確定度的組合'], ['1-3', '因次與因次分析']]],
        ['運動學—直線運動', [['2-1', '位置、路徑長與位移'], ['2-2', '速度與速率'], ['2-3', '加速度'], ['2-4', '等加速運動', 'kinematics-lab.html'], ['2-5', '自由落體運動'], ['2-6', '相對運動']]],
        ['運動學—平面運動', [['3-1', '向量的意義、分解與合成'], ['3-2', '平面運動的位移、速度與加速度'], ['3-3', '水平拋射'], ['3-4', '斜向拋射']]],
        ['牛頓運動定律', [['4-1', '力的向量性質'], ['4-2', '牛頓第一運動定律—狀態的意義'], ['4-3', '牛頓第二運動定律—狀態的改變', 'newton-park.html'], ['4-4', '牛頓第三運動定律—作用與反作用'], ['4-5', '等速圓周運動與向心力', 'ucm-lab.html'], ['4-6', '簡諧運動', 'shm-lab.html']]],
        ['萬有引力定律', [['5-1', '萬有引力定律'], ['5-2', '地球表面的重力與重力加速度'], ['5-3', '行星與人造衛星的運動'], ['5-4', '克卜勒定律與萬有引力定律']]]
      ]},
      { name: '選修物理 II　力學二與熱學', subject: 'phy', chapters: [
        ['動量與角動量', [['1-1', '動量與衝量'], ['1-2', '系統質心運動'], ['1-3', '動量守恆律'], ['1-4', '角動量與力矩'], ['1-5', '質點的角動量守恆律']]],
        ['牛頓運動定律的應用', [['2-1', '靜力學與應用實例'], ['2-2', '摩擦力']]],
        ['功與動能', [['3-1', '定力所作的功'], ['3-2', '變力所作的功'], ['3-3', '動能與功能定理', 'work-energy.html'], ['3-4', '功率']]],
        ['位能與力學能守恆定律', [['4-1', '重力位能'], ['4-2', '重力位能的一般表示式'], ['4-3', '彈性位能'], ['4-4', '力學能守恆定律', 'work-energy.html'], ['4-5', '一維碰撞']]],
        ['熱學', [['5-1', '絕對溫度與理想氣體方程式'], ['5-2', '氣體運動論'], ['5-3', '氣體分子的速率分布']]]
      ]}
    ]
  },
  {
    id: 'h12', tabLabel: '高三 選修物理', title: '高三 · 選修物理',
    desc: '選修物理 III 波動、光及聲音，IV 電磁現象一，V 電磁現象二與量子現象，依翰林版課本章節編排。',
    books: [
      { name: '選修物理 III　波動、光及聲音', subject: 'phy', chapters: [
        ['波動', [['1-1', '波的傳播', 'transverse-wave.html'], ['1-2', '振動與週期波'], ['1-3', '繩波的反射與透射'], ['1-4', '波的疊加原理'], ['1-5', '駐波'], ['1-6', '惠更斯原理'], ['1-7', '水波的干涉']]],
        ['聲波', [['2-1', '聲波的傳播'], ['2-2', '空氣柱的駐波'], ['2-3', '共振與共鳴']]],
        ['光的折射及其應用', [['3-1', '光的折射與司乃耳定律', 'optics-lab.html#refract'], ['3-2', '光的全反射'], ['3-3', '光的色散與彩虹成因'], ['3-4', '薄透鏡成像與應用', 'optics-lab.html#lens']]],
        ['光的干涉與繞射', [['4-1', '光的干涉'], ['4-2', '光的繞射']]]
      ]},
      { name: '選修物理 IV　電磁現象一', subject: 'phy', chapters: [
        // 只查到章名，節名待補；先以整章為一個單元
        ['靜電學', [['第1章', '靜電學', 'static-circuit.html']]],
        ['電流的磁效應', [['第2章', '電流的磁效應']]],
        ['電磁感應', [['第3章', '電磁感應']]]
      ]},
      { name: '選修物理 V　電磁現象二與量子現象', subject: 'phy', chapters: [
        ['電流與電路', [['1-1', '電動勢與電流'], ['1-2', '歐姆定律與電阻'], ['1-3', '電阻的串聯與並聯'], ['1-4', '電路中之電荷守恆與能量守恆'], ['1-5', '電功率與電流的熱效應', 'power-lab.html']]],
        ['近代物理的重大發現', [['2-1', '電子的發現'], ['2-2', '密立坎油滴實驗'], ['2-3', 'X 射線'], ['2-4', '黑體輻射'], ['2-5', '光電效應']]],
        ['原子結構與原子核', [['3-1', '拉塞福原子模型與原子光譜'], ['3-2', '波耳的氫原子模型'], ['3-3', '物質波與波粒二象性'], ['3-4', '原子核的組成'], ['3-5', '原子核衰變'], ['3-6', '交互作用與守恆律']]]
      ]}
    ]
  }
];

/* =========================================================
   整理成「一門一門的課程」給課程區用
   - 國中：一個年級一門（國三拆成理化、地科兩門）
   - 高中：一冊一門
   每門課：{ id, stage, grade, gradeName, name, subjects, desc, chapters:[{ title, units:[{ no, title, url, more, subject }] }] }
   ========================================================= */
const BOOK_DESC = {
  phy: '從運動、能量到電磁與量子，用互動實驗看懂物理定律。',
  chem: '從原子、化學鍵到化學計量與反應，認識物質的組成與變化。',
  bio: '從細胞、遺傳到演化，理解生命如何運作與延續。',
  earth: '從地球內部、大氣海洋到浩瀚宇宙，認識我們居住的星球。'
};
const GRADE_NAME = { g7: '國一', g8: '國二', g9: '國三', h10: '高一', h11: '高二', h12: '高三' };
function buildCourseList() {
  const list = [];
  COURSES.forEach(c => {
    const gradeName = GRADE_NAME[c.id];
    if (c.units) {
      const groups = c.id === 'g9'
        ? [['理化', u => u.subject !== 'earth'], ['地球科學', u => u.subject === 'earth']]
        : [[c.id === 'g7' ? '生物' : '理化', () => true]];
      groups.forEach(([name, test], gi) => {
        const units = c.units.map((u, i) => ({ ...u, no: String(i + 1).padStart(2, '0') })).filter(test);
        list.push({
          id: `${c.id}-${gi}`, stage: 'jh', grade: c.id, gradeName, name,
          subjects: [...new Set(units.map(u => u.subject))], desc: c.desc,
          chapters: units.map(u => ({ title: u.title, units: [u] }))
        });
      });
    } else {
      c.books.forEach((b, bi) => list.push({
        id: `${c.id}-${bi}`, stage: 'sh', grade: c.id, gradeName, name: b.name.replace('　', ' '),
        subjects: [b.subject], desc: BOOK_DESC[b.subject],
        chapters: b.chapters.map(([title, secs], ci) => ({
          title: title || `第 ${ci + 1} 章`,
          units: secs.map(([no, t, url]) => ({ no, title: t, url, subject: b.subject }))
        }))
      }));
    }
  });
  return list;
}
const COURSE_LIST = buildCourseList();
