/* =========================================================
   課程區、課程頁共用的小工具（需先載入 curriculum.js）
   ========================================================= */
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

// 封面漸層：單一科目用該科的顏色，理化用物理藍 → 化學紅
const COVER = {
  phy: ['#2457c5', '#4f8cff', '#7cc4ff'],
  chem: ['#b8344c', '#ff6b6b', '#ffa98a'],
  bio: ['#157a4c', '#3fbf7c', '#a3e26b'],
  earth: ['#a8661a', '#e0a83a', '#f5d27a']
};
function coverBg(c) {
  const cols = c.subjects.length > 1 ? ['#2457c5', '#7a56e8', '#ff6b6b'] : COVER[c.subjects[0]];
  return `linear-gradient(135deg, ${cols[0]} 0%, ${cols[1]} 55%, ${cols[2]} 100%)`;
}
const mainColor = c => SUBJECTS[c.subjects[0]].color;
const allUnits = c => c.chapters.flatMap(ch => ch.units);
const labCount = c => allUnits(c).filter(u => u.url).length;
const subjNames = c => c.subjects.map(s => SUBJECTS[s].name).join('・');
// 國中：「國二 理化」；高中：「高一 物理（全）」
const courseTitle = c => `${c.gradeName} ${c.name}`;

function coverHTML(c) {
  const big = c.stage === 'jh' ? c.name : c.name.replace(/^選修/, '選修\n').split('\n').map(esc).join('<br>');
  return `<div class="cover" style="--cover:${coverBg(c)}">
    <span class="art">${SUBJECTS[c.subjects[0]].art}</span>
    <span class="grade">${esc(c.gradeName)}</span>
    <span class="big">${big}</span>
    <span class="sub">${esc(subjNames(c))} · ${c.chapters.length} 章</span>
  </div>`;
}

/** 互動實驗室裡這個年級的位置 */
const labHref = c => `index.html#${c.grade}`;
const courseHref = c => `course.html?id=${encodeURIComponent(c.id)}`;
const PLAY = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 4.5v15a1 1 0 0 0 1.5.86l12-7.5a1 1 0 0 0 0-1.72l-12-7.5A1 1 0 0 0 7 4.5z"/></svg>';
