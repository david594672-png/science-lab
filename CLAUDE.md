# 自然科互動動畫實驗室：協作說明

這是給國中、高中自然科使用的互動實驗網站，全部是靜態 HTML 和 JS，用 GitHub Pages 上架（推到 main 就會自動更新網站）。
老師上課用 **iPad** 投影操作，所以每一頁都要在 iPad 上跑得順。

## 協作規則（一定要遵守）

- **不要直接推到 main。** 先開自己的分支（例如 `bio-g7`），改好之後發 Pull Request，由專案負責人（david594672-png）確認後才合併。
- **分工**：國一生物由協作者負責，其他年級由專案負責人處理。改到下面這些**共用檔案**之前要先問人，改的時候只能**新增**，不要更動或刪除原本的寫法：
  - `lab-kit.js`、`lab-kit.css`：2D 實驗頁的共用工具和樣式
  - `lab3d.js`：3D 實驗頁的共用工具
  - `lesson.js`：每頁的「學習任務」卡
  - `curriculum.js`：課程與單元清單（課程區、互動實驗室都讀這份）
  - `index.html`、`courses.html`、`course.html`、`courses.css`、`courses-ui.js`
- **原創**：不可以抄別的網站或別人的程式、圖片、3D 模型。照課綱內容自己設計。
- 介面文字全部用**繁體中文**（台灣用語），程式註解也用中文。

## 國一生物負責的檔案

`life-lab.html`、`enzyme-lock-key.html`、`heart.html`、`nerve-lab.html`、`homeo-lab.html`、`reproduction.html`、`genetics-lab.html`、`class-lab.html`、`ecosystem-lab.html`、`environment-lab.html`、`cell-division.html`

這幾頁都已經有了，可以直接改良，也可以新增。單元對應寫在 `curriculum.js` 的 `id: 'g7'` 那一段。

## 在電腦上預覽

```bash
python -m http.server 8000
```

然後打開 http://localhost:8000/ 。測試時把視窗設成 **1180×820**（iPad 橫放），也要看直放和手機寬度，並確認瀏覽器主控台沒有錯誤。

## 一個實驗頁的基本結構

```html
<html lang="zh-Hant" data-subject="bio">     <!-- 科目風格：phy 物理 / chem 化學 / bio 生物 / earth 地科 -->
<link rel="stylesheet" href="lab-kit.css">
<canvas id="cv"></canvas>                     <!-- 2D 頁的畫布 -->
<aside class="panel" id="panel">              <!-- 右側控制面板 -->
  <button class="collapse" id="collapse">收合</button>
  <a class="back" href="index.html#g7">← 回課程總覽</a>
  <h1>頁面標題</h1><p class="sub">國一生物 · 單元名稱</p>
  <div class="body"> …按鈕、滑桿（.modes / .group / .ctrl / .row / .btn / dl.live / .result）… </div>
</aside>
<script src="lab-kit.js"></script>
<script> /* 這一頁的程式 */ </script>
<script src="lesson.js" defer></script>     <!-- 左下角「學習任務」和全螢幕按鈕 -->
```

寫新頁之前，先打開一頁現有的頁面照著寫（2D 可以看 `enzyme-lock-key.html`，3D 可以看 `heart.html`）。

## 2D 頁：`lab-kit.js`

- `Lab.init({ draw(ctx, w, h, dt, t), ui(), down(x,y), move(x,y), up(), resize(w,h) })`：畫布只會佔面板以外的區域。`draw` 每一幀呼叫一次；`ui` 每秒更新面板數字 10 次。
- 控制項：
  - `Lab.bindSlider('id', 值 => …, 值 => '顯示文字')`：要有 `<input id="id">` 和 `<output id="idVal">`。
  - `Lab.bindGroup('.mode', key => …)`：一組按鈕只能選一個。
  - `Lab.showMode(key)`：顯示 `data-mode="key"` 的面板區塊。
- 基本繪圖：`line`、`arrow`、`text`、`card`、`circle`、`pill`、`chart`
- 美術工具（讓畫面不簡陋，請多用）：
  - `Lab.lg / Lab.rg`：線性／放射漸層
  - `Lab.shade(hex, ±k)`：顏色調亮或調暗
  - `Lab.alpha(color, a)`：調整透明度
  - `Lab.shadow`：地面陰影
  - `Lab.ball`：立體球
  - `Lab.crate`：木箱
  - `Lab.car`：小車
  - `Lab.wheel`：輪子
  - `Lab.person`：人物
  - `Lab.cloud`：雲
  - `Lab.force`：有描邊、附標籤的力箭頭
  - `Lab.glass`：半透明資訊框

## 3D 頁：`lab3d.js`（three.js 0.160，用 importmap 從 jsdelivr 載入）

```js
import { start3D, THREE } from './lab3d.js';
const L = start3D({ background, camera: [x,y,z], target, minDist, maxDist, frame(dt, t), ui(), tap(x, y) });
```

`L` 裡面可以用的東西：

- three.js 物件：`L.scene`、`L.camera`、`L.renderer`、`L.controls`
- 材質：`L.mat(color, opts)`、`L.glow(color)`
- 標籤：`L.label(文字, 位置或函式, 'big' | 'plain')`
- 互動：`L.pick(x, y, 物件陣列)`（點選）、`L.fly(位置, 目標, 秒數)`（移動鏡頭）
- 箭頭：`L.arrow(color).point(from, to)`

## 學習任務卡：`lesson.js`

在 `LESSONS` 裡用檔名加一筆資料。課程頁（`course.html`）也會讀這裡的學習目標。

```js
'heart.html': {
  goals: ['學習目標…'],
  tasks: [['先預測：…（要按哪個按鈕／拉哪根滑桿）', '操作後看到的結果與解釋']],
  myths: [['常見的錯誤想法', '正確觀念']]
}
```

## 生物科的風格

- 用 `data-subject="bio"`：會套用綠色主色、葉形標誌和圓角。
- 畫面要有質感：用漸層、陰影、柔和的光暈，細胞膜做成「邊緣亮、中間透明」。不要只用單色色塊和細線。
- 生物構造用 3D 比較好懂的（細胞、器官）就用 3D；流程或圖表用 2D。

## iPad 效能與常見錯誤

- 不要在每一幀新建 three.js 幾何或材質；粒子數量要節制，必要時降低數量。
- 觸控按鈕至少 44px 高。
- JS 語法陷阱：`-(x) ** 2` 會出錯，要寫成 `-((x) ** 2)`。
- 改完之後檢查主控台，不能有錯誤。
