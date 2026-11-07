/* =========================================================
   學習任務卡 + 全螢幕按鈕（所有實驗頁共用）
   ---------------------------------------------------------
   每頁左下角兩顆按鈕：
   1. 學習任務：學習目標／「先預測 → 再操作 → 揭曉」任務／常見迷思
   2. 全螢幕：上課投影用
   內容寫在下面的 LESSONS，用檔名（或「檔名#模式」）對應頁面。
   新增一頁的任務：照格式加一筆即可。
   ========================================================= */
(() => {
  'use strict';

  /* 格式：
     goals: ['學習目標', ...]
     tasks: [['先預測的問題（含要操作的按鈕或拉桿）', '操作後看到的結果與解釋'], ...]
     myths: [['錯誤想法', '正確觀念'], ...] */
  const LESSONS = {
    'shm-lab.html': {
      goals: ['用參考圓的投影理解簡諧運動', '比較端點與平衡點的位移、速度、加速度', '用 T = 2π√(m/k) 判斷週期由什麼決定'],
      tasks: [
        ['按「停在最高點」。先預測：木塊的速度和加速度各是多少？', '速度為 0，但加速度最大、方向向下指向平衡點；能量全部是位能。'],
        ['按「停在平衡點」。先預測：這時哪個量最大、哪個量為 0？', '速度最大、加速度為 0；能量全部是動能。木塊不會停在這裡，因為它還有速度。'],
        ['保持 k 不變，把質量 m 從 1 kg 調到 4 kg。先預測：週期變幾倍？', '週期變 2 倍。T ∝ √m，質量 4 倍 → 週期 √4 = 2 倍。'],
        ['只把振幅 A 加倍。先預測：週期會不會變長？', '週期不變！振幅只影響最大速度（2 倍）、最大加速度（2 倍）和總能量（4 倍）。'],
        ['打開「速度 v」和「加速度 a」。先預測：木塊的箭頭和圓上的哪一段一樣長？', '木塊的箭頭剛好等於圓上箭頭的鉛直分量（虛線）。簡諧運動就是圓周運動在直徑上的投影。']
      ],
      myths: [
        ['速度為 0 的地方，加速度也是 0。', '端點速度為 0，但彈簧拉得最開，回復力和加速度最大。'],
        ['平衡點合力為 0，木塊會停在平衡點。', '合力為 0 只代表那一瞬間不加速，木塊有最大速度，會因慣性繼續前進。'],
        ['參考圓上的質點就是彈簧上的木塊。', '參考圓只是幾何模型，木塊對應的是它在直徑方向的投影（影子點）。']
      ]
    },

    'optics-lab.html': {
      goals: ['用光直線前進解釋針孔成像', '說出反射角 = 入射角，以及光速改變造成折射', '描述凸透鏡成像如何隨物距改變'],
      tasks: [
        ['「針孔成像」：把像距拉大（屏幕往後移）。先預測：像會變大還是變小？', '像變大，而且一直是倒立的。像高 ÷ 物高 = 像距 ÷ 物距。'],
        ['「反射與折射」：入射角調到 0°。先預測：折射光會偏折嗎？', '垂直射入不偏折。光速其實變慢了，只是方向沒變。'],
        ['介質從「水」換成「鑽石」。先預測：折射角變大還是變小？', '折射角變小、更偏向法線。光在鑽石裡最慢（約空氣的 41%），偏折最多。看看跑動的光點，粉紅色的跑最慢。'],
        ['「面鏡與透鏡」選凸透鏡，物距從 12 慢慢拉近到 F 以內。先預測：像會怎麼變？', '倒立縮小實像 → 物在 2F 時等大 → 倒立放大 → 物在 F 上不成像 → 物在 F 內變成正立放大的虛像。'],
        ['「色光與反射」只開紅光和綠光。先預測：黃色、藍色物體各看起來是什麼顏色？', '黃色物體看起來是黃色（反射紅和綠）；藍色物體看起來是黑色（沒有藍光可以反射）。']
      ],
      myths: [
        ['光從空氣進入水中，速度會變快。', '光在水、玻璃中都比在空氣中慢，所以折射光偏向法線。'],
        ['凸透鏡一定成實像。', '物體在焦點內時，凸透鏡成正立放大的虛像（放大鏡）。'],
        ['黑色是一種顏色的光。', '物體看起來黑，是因為沒有色光被反射出來。']
      ]
    },

    'enzyme-lock-key.html': {
      goals: ['用鎖鑰模型說明酵素的專一性', '比較溫度與 pH 對酵素活性的影響', '分辨「變慢」與「變性」'],
      tasks: [
        ['選「澱粉酶」，把「蛋白質」拖進凹槽。先預測：會發生什麼？', '會被彈開。澱粉酶的活化位只和澱粉形狀互補，這就是專一性。'],
        ['把溫度拉到 70 °C，再拉回 37 °C。先預測：酵素還能用嗎？', '不能。高溫讓酵素變性，形狀回不去，要按「重新開始」換新的酵素。'],
        ['把溫度拉到 10 °C，放入正確的養分。先預測：會不會反應？', '會反應，只是變得很慢；溫度回到 37 °C 就恢復。低溫不會讓酵素變性。'],
        ['換「蛋白酶」，把 pH 拉到 7。先預測：它的活性如何？', '幾乎沒有活性。蛋白酶來自很酸的胃液，最適 pH 約 2。']
      ],
      myths: [
        ['酵素反應完就被用掉了。', '酵素反應前後不變，可以一再重複使用。'],
        ['低溫和高溫一樣會破壞酵素。', '低溫只讓反應變慢，回溫可以恢復；高溫變性才是不可逆的。'],
        ['所有酵素都在 pH 7 最好。', '每種酵素的最適 pH 不同：胃蛋白酶約 2、唾液澱粉酶約 7、胰脂肪酶約 8。']
      ]
    },

    'heart.html': {
      goals: ['說出肺循環與體循環的路線', '說明瓣膜如何防止血液逆流', '比較肺部與組織的氣體交換方向'],
      tasks: [
        ['把心搏速度調到最慢，按「只看瓣膜」。先預測：心室收縮時，哪一種瓣膜打開？', '半月瓣打開、房室瓣關閉，血液只能往動脈走，不會倒流回心房。'],
        ['切到「循環示意圖」，跟著一顆血液從右心室出發。先預測：它的下一站是哪裡？', '右心室 → 肺動脈 → 肺 → 肺靜脈 → 左心房。這是肺循環。'],
        ['先預測：肺動脈裡流的是充氧血還是缺氧血？', '缺氧血！血管叫「動脈」是因為它離開心臟，和含氧量無關。'],
        ['切到「氣體交換」模式。先預測：在組織微血管，CO₂ 往哪個方向移動？', '從細胞進入血液。氣體總是由濃度高往濃度低的地方擴散。']
      ],
      myths: [
        ['動脈裡都是充氧血。', '肺動脈是缺氧血、肺靜脈是充氧血。動脈、靜脈是依血流方向命名的。'],
        ['畫面左邊是心臟的左側。', '面對面看時，畫面左邊是人體的右邊（右心房、右心室）。'],
        ['瓣膜會主動推動血液。', '推動血液的是心肌收縮，瓣膜只是單向閘門。']
      ]
    },

    'transverse-wave.html': {
      goals: ['說明波傳遞的是能量與波形，不是介質', '用 v = fλ 解釋頻率與波長的關係'],
      tasks: [
        ['盯著紅色質點。先預測：它會跟著波往右走嗎？', '不會，它只在原地上下振動。往右走的是「波形」。'],
        ['把頻率調高。先預測：波長變長還是變短？', '變短。同一介質中波速固定，v = fλ，f 變大 λ 就變小。'],
        ['按暫停，用手指把波往右拖。先預測：紅色質點怎麼動？', '還是只有上下動。拖曳相當於讓時間前進，波形往右移。'],
        ['只把振幅加大。先預測：波會跑得比較快嗎？', '不會，波速由介質決定，振幅只影響能量大小。']
      ],
      myths: [
        ['波前進時，介質也跟著前進。', '介質質點只在平衡位置附近振動，傳過去的是能量和波形。'],
        ['頻率越高，波跑得越快。', '同一介質中波速固定，頻率高的波波長較短。']
      ]
    },

    'waves-3d.html': {
      goals: ['比較橫波與縱波的振動方向', '知道聲波是縱波'],
      tasks: [
        ['看下排（紫色）的紅球。先預測：它的振動方向和波的前進方向有什麼關係？', '互相平行（左右振動），這是縱波；上排紅球上下振動，和前進方向垂直，是橫波。'],
        ['把頻率加倍。先預測：左上的波速會怎麼變？', '這個模擬固定了波長，所以 v = fλ 會跟著加倍。真實介質中則是波速固定、波長變短。'],
        ['先預測：聲音在空氣中傳播是哪一種波？', '縱波。空氣分子沿傳播方向前後振動，形成疏密相間。']
      ],
      myths: [
        ['縱波的質點會一路往前移動。', '縱波的質點也只在原地前後振動。'],
        ['只有橫波才有波長。', '縱波的波長是相鄰兩個密部（或疏部）的距離。']
      ]
    },

    'measure-lab.html': {
      goals: ['分辨準確值與估計值', '知道最小刻度決定能讀到哪一位'],
      tasks: [
        ['用「A 尺（最小刻度 1 cm）」量。先預測：可以讀到小數點後第幾位？', '準確值讀到 1 cm，再估計到 0.1 cm，例如 12.3 cm。'],
        ['換成「B 尺（最小刻度 1 mm）」。先預測：結果有幾位？', '準確值到 0.1 cm，再估計到 0.01 cm，例如 12.34 cm，多了一位。'],
        ['兩個同學的估計值差了一點點。先預測：一定有人量錯嗎？', '不一定。最後一位本來就是估計的，有小小差異是正常的。']
      ],
      myths: [
        ['估計值不準，所以不用寫。', '測量值一定要寫到估計值那一位，它表示測量的精細程度。'],
        ['12 cm 和 12.0 cm 是一樣的。', '12.0 cm 表示用了更精細的尺，兩者的精確程度不同。']
      ]
    },

    'solution-lab.html': {
      goals: ['分辨純物質與混合物', '計算重量百分濃度與 ppm', '說明溫度對溶解度的影響'],
      tasks: [
        ['「重量百分濃度」：加入 20 g 方糖和 80 g 水。先預測：濃度是多少？', '20 ÷ (20 + 80) × 100% = 20%。要除以「溶液」的重量，不是除以水。'],
        ['「飽和與溫度」：把溫度調高。先預測：還能再溶解更多糖嗎？', '可以。大部分固體的溶解度隨溫度升高而變大。'],
        ['「百萬分點」：5 mg 汙染物溶在 2 L 水中。先預測：大約幾 ppm？', '2 L 水約 2,000,000 mg，5 ÷ 2,000,000 × 10⁶ = 2.5 ppm。'],
        ['先預測：B 杯的食鹽水是純物質還是混合物？', '混合物。由兩種以上物質組成，而且比例可以改變。']
      ],
      myths: [
        ['濃度 = 溶質 ÷ 溶劑。', '重量百分濃度 = 溶質 ÷ 溶液（溶質 + 溶劑）× 100%。'],
        ['糖溶在水裡就消失了。', '糖分子仍在水中，只是分散到看不見，總質量不變。']
      ]
    },

    'heat-lab.html': {
      goals: ['說明溫度計利用熱脹冷縮', '用比熱解釋升溫快慢與海陸風', '知道三態變化時溫度不變'],
      tasks: [
        ['「自製溫度計」放入熱水。先預測：液柱上升還是下降？', '上升。液體受熱膨脹。'],
        ['「比熱賽跑」同時加熱。先預測：誰的溫度升得比較快？', '比熱小的升溫快。水的比熱很大，所以升溫最慢。'],
        ['「海風陸風」切到白天。先預測：風從海吹向陸地，還是反過來？', '白天陸地升溫快、空氣上升，風從海吹向陸地（海風）；晚上相反（陸風）。'],
        ['「三態變化」冰正在熔化時繼續加熱。先預測：溫度會上升嗎？', '維持 0 °C 不變，吸收的熱都用來熔化，全部熔化後才會升溫。']
      ],
      myths: [
        ['溫度和熱是同一件事。', '溫度是冷熱程度，熱是因溫度差而轉移的能量。'],
        ['加熱時溫度一定會上升。', '熔化、沸騰等狀態改變時，吸熱但溫度不變。']
      ]
    },

    'matter-lab.html': {
      goals: ['分辨元素、化合物、混合物', '認識週期表的族與性質', '用電荷平衡組合離子化合物'],
      tasks: [
        ['「粒子分類機」：先預測水是元素、化合物還是混合物？', '化合物。由氫、氧兩種元素以固定比例組成。'],
        ['「週期表探索牆」點 1A 族。先預測：它們有什麼共同性質？', '都是很活潑的金屬，容易失去 1 個電子形成 +1 價離子。'],
        ['「離子樂高」：Mg²⁺ 和 Cl⁻ 要幾個配幾個？', '1 個 Mg²⁺ 配 2 個 Cl⁻（MgCl₂），正負電荷要剛好抵消。'],
        ['先預測：8A 族的惰性氣體為什麼很少反應？', '最外層電子已經是穩定結構，不容易得失電子。']
      ],
      myths: [
        ['空氣是一種化合物。', '空氣是混合物（氮氣、氧氣等），成分比例可以改變。'],
        ['化合物保留了組成元素的性質。', '例如鈉很活潑、氯有毒，但氯化鈉是可以吃的食鹽。']
      ]
    },

    'force-lab.html': {
      goals: ['用合力判斷物體是否改變運動', '說明靜摩擦力隨推力改變', '用 P = F ÷ A 解釋壓力', '說明浮力等於排開液體的重量'],
      tasks: [
        ['「力的合成」左右拉力都是 4 N。先預測：磚塊會動嗎？', '合力為 0，保持原本的狀態（靜止）。'],
        ['「摩擦力」慢慢加大推力，箱子還沒動。先預測：這時摩擦力多大？', '摩擦力等於推力，會跟著推力一起變大，直到超過最大靜摩擦力才開始滑動。'],
        ['「壓力與面積」同樣的下壓力。先預測：單根釘子還是釘板比較容易刺破氣球？', '單根釘子。面積小，壓力 P = F ÷ A 大。'],
        ['「浮力溢水」放入鐵塊。先預測：溢出的水重量和浮力有什麼關係？', '一樣大（阿基米德原理）。']
      ],
      myths: [
        ['物體沒動，就沒有摩擦力。', '沒動時可能有靜摩擦力，大小剛好等於推力。'],
        ['越重的物體受到的浮力越大。', '浮力等於排開液體的重量，和物體本身多重無關。']
      ]
    },

    'force-pressure-lab.html': {
      goals: ['用合力判斷平衡', '說明摩擦力與接觸面積無關', '說明液體壓力與深度、密度的關係', '說明大氣壓力隨高度改變'],
      tasks: [
        ['「摩擦力」把木塊換成最大面和最小面接觸。先預測：拉動時的摩擦力會不同嗎？', '幾乎一樣。摩擦力和接觸面積無關，和正向力、接觸面材質有關。'],
        ['「固體壓力」同一個物體換不同的面朝下。先預測：哪一面的壓力最大？', '接觸面積最小的那一面（48 cm²）。重量不變，面積越小壓力越大。'],
        ['「液體壓力」把水換成食鹽水。先預測：同一深度的壓力變大還是變小？', '變大。液體壓力 = 密度 × 深度，食鹽水密度較大。'],
        ['「大氣壓力」觀測地點換到玉山頂。先預測：水銀柱變高還是變低？', '變低。高山上空氣稀薄，大氣壓力較小；月球上沒有大氣，撐不起水銀柱。']
      ],
      myths: [
        ['接觸面積越大，摩擦力越大。', '摩擦力主要由正向力和接觸面材質決定，和面積大小無關。'],
        ['液體壓力只有向下。', '液體在同一深度往各個方向都有壓力。']
      ]
    },

    'pressure-lab.html': {
      goals: ['用 P = F ÷ A 解釋固體壓力', '說明液體壓力與深度、密度的關係', '說明浮力等於排開液體的重量'],
      tasks: [
        ['「固體壓力」同樣的下壓力。先預測：單根釘子還是釘板比較容易刺破氣球？', '單根釘子。面積小，壓力大。'],
        ['「液體壓力」把探測深度加倍。先預測：壓力變幾倍？', '液體壓力變 2 倍（P = 密度 × 深度）。'],
        ['把液體換成沙拉油。先預測：同一深度的壓力變大還是變小？', '變小，沙拉油密度比水小。'],
        ['「浮力溢水杯」放入保麗龍和鐵塊。先預測：誰溢出的水比較多？', '看它們排開了多少水。浮在水面的保麗龍，浮力等於它的重量；沉下去的鐵塊，浮力等於它體積的水重。']
      ],
      myths: [
        ['容器越大，底部的液體壓力越大。', '液體壓力只看深度和密度，和容器大小形狀無關。'],
        ['沉下去的東西就沒有浮力。', '沉下去的物體也受浮力，只是浮力小於重量。']
      ]
    },

    'kinematics-lab.html': {
      goals: ['分辨位移與路徑長', '看懂 x-t 圖、v-t 圖', '說明上拋到最高點的速度與加速度'],
      tasks: [
        ['「位移 vs 路徑長」繞一圈回到起點。先預測：位移和路徑長各是多少？', '位移為 0，路徑長不為 0。位移只看起點到終點。'],
        ['「x-t 圖 · v-t 圖」選等加速度。先預測：x-t 圖是直線還是曲線？', 'x-t 圖是拋物線（越來越陡），v-t 圖是斜直線。'],
        ['「自由落體 · 上拋」選鉛直上拋。先預測：到最高點時速度和加速度各是多少？', '速度為 0，加速度仍是 g、方向向下。'],
        ['「打點計時器」選加速度運動。先預測：紙帶上的點距會怎麼變？', '點距越來越大，表示每段相同時間走得越來越遠。']
      ],
      myths: [
        ['上拋到最高點時，加速度是 0。', '最高點速度為 0，但重力仍在，加速度一直是 g 向下。'],
        ['負的加速度一定是在減速。', '要看加速度和速度方向：同向加速、反向減速。']
      ]
    },

    'newton-park.html': {
      goals: ['用慣性解釋生活現象', '用 F = ma 比較力與質量', '說明作用力與反作用力的特性'],
      tasks: [
        ['「急煞車」。先預測：乘客會往前倒還是往後倒？', '往前倒。身體因慣性想保持原本的運動。'],
        ['「互相推開」。先預測：質量小的人和質量大的人，誰受力比較大？', '受力一樣大、方向相反；質量小的人加速度比較大，所以滑得比較快。'],
        ['「圓周運動」剪斷繩子。先預測：物體往哪個方向飛出去？', '沿著剪斷瞬間的切線方向飛出，不是往外沿半徑飛。'],
        ['「萬有引力」距離變成 2 倍。先預測：引力變成幾倍？', '變成 1/4，引力和距離平方成反比。']
      ],
      myths: [
        ['作用力和反作用力互相抵消。', '它們作用在不同物體上，所以不能抵消。'],
        ['物體運動就一定有力在推它。', '沒有外力時，運動中的物體會保持等速直線運動（慣性）。']
      ]
    },

    'work-energy.html': {
      goals: ['判斷力是否作功', '說明力學能守恆', '比較彈力位能與形變的關係'],
      tasks: [
        ['「作功」提著物體水平等速移動。先預測：手對物體有作功嗎？', '沒有。施力向上、位移水平，力和位移垂直就不作功。'],
        ['「力學能守恆」從高處放下（忽略摩擦）。先預測：到最低點時動能多大？', '等於起點的重力位能，位能全部轉成動能。'],
        ['「彈力位能」把彈簧壓縮得更多。先預測：物體會被彈得更遠還是更近？', '更遠。形變越大，彈力位能越大（高中：Uₛ = ½kx²，壓縮量加倍，位能變 4 倍）。']
      ],
      myths: [
        ['有出力就有作功。', '要有沿著力方向的位移才算作功。'],
        ['能量會在運動中消失。', '沒有摩擦時，動能與位能互相轉換，總力學能不變。']
      ]
    },

    'static-circuit.html': {
      goals: ['比較三種起電方式', '說明電流、電壓、電阻的意義', '用歐姆定律與串並聯分析電路'],
      tasks: [
        ['「靜電三部曲」做感應起電。先預測：最後物體帶的電，和靠近的帶電體相同還是相反？', '相反。感應起電後帶的是異性電；接觸起電則帶同性電。'],
        ['「歐姆定律測量」電阻固定，把電壓加倍。先預測：電流怎麼變？', '電流也加倍，V-I 圖是通過原點的直線，斜率就是電阻。'],
        ['「串並聯」比較兩顆燈泡串聯和並聯。先預測：哪一種每顆燈比較亮？', '並聯比較亮。並聯時每顆燈都分到完整的電壓。'],
        ['串聯時拿掉一顆燈。先預測：另一顆還會亮嗎？', '不會，電路斷了；並聯時另一顆仍然會亮。']
      ],
      myths: [
        ['電流經過燈泡後被用掉，變小了。', '串聯電路各處電流一樣大，消耗的是電能，不是電流。'],
        ['電池提供固定的電流。', '電池提供的是電壓，電流大小由電路的電阻決定。']
      ]
    },

    'power-lab.html': {
      goals: ['用 P = IV = V²/R 比較電功率', '用 E = P × t 計算電能'],
      tasks: [
        ['「吹風機」電壓 220 V，比較粗線（22 Ω）和細線（44 Ω）。先預測：哪一種熱得快？', '粗線。電壓固定時 P = V²/R，電阻小、功率大。'],
        ['時間調成 ×5。先預測：消耗的電能和時間有什麼關係？', '電能 E = P × t，時間越長，用電越多。'],
        ['「亮度競技場」比較串聯和並聯。先預測：哪一種燈泡比較亮？', '並聯。每顆燈都分到完整電壓，功率比較大。']
      ],
      myths: [
        ['電阻越大，一定越熱。', '電壓固定時（家用電），電阻越小功率越大、越熱。'],
        ['電費是按照電流計算的。', '電費按電能（度 = kW·h）計算。']
      ]
    },

    'electrochem.html': {
      goals: ['說明化學電池把化學能轉成電能', '說明電解、電鍍時兩極的變化'],
      tasks: [
        ['「化學電池」鋅銅電池。先預測：哪一個金屬是負極？', '鋅。鋅比較活潑，容易失去電子，電子從鋅流出。'],
        ['「電解硫酸銅」用碳棒。先預測：負極（陰極）會出現什麼？', '有紅色的銅析出。'],
        ['「電解水」。先預測：負極和正極產生的氣體體積比是多少？', '負極產生氫氣、正極產生氧氣，體積比約 2 : 1。'],
        ['「電鍍」要把銅鍍在鑰匙上。先預測：鑰匙要接哪一極？', '接負極（陰極），銅離子在鑰匙表面得到電子變成銅。']
      ],
      myths: [
        ['電解水加 NaOH 是為了產生氣體。', '加 NaOH 或稀硫酸是為了讓水容易導電，氣體還是來自水。'],
        ['電池裡儲存的是電。', '電池儲存的是化學能，使用時才轉換成電能。']
      ]
    },

    'geology-fault.html': {
      goals: ['分辨正斷層與逆斷層的受力', '認識地球內部構造'],
      tasks: [
        ['「斷層受力」選張力（拉扯）。先預測：上盤往上還是往下移動？', '往下滑，這是正斷層。'],
        ['改成壓力（擠壓）。先預測：上盤往哪裡移動？', '往上移，這是逆斷層，台灣很常見。'],
        ['「地球內部構造」。先預測：岩石圈包含哪些部分？', '地殼加上最上部的地函，是一層堅硬的岩石。']
      ],
      myths: [
        ['地函是一大片液態岩漿。', '地函大部分是固態，只有軟流圈能非常緩慢地流動。'],
        ['斷層一定會看到明顯的裂縫。', '很多斷層藏在地底，要靠地質調查才找得到。']
      ]
    },

    'taiwan-earthquake.html': {
      goals: ['說明板塊擠壓如何累積能量並引發地震', '知道台灣多逆斷層的原因'],
      tasks: [
        ['按「模擬板塊擠壓」。先預測：一擠壓就會立刻地震嗎？', '不會。岩層先慢慢變形、累積應力，超過岩石能承受的程度才突然錯動。'],
        ['按「觸發地震」。先預測：斷層的上盤往上還是往下？', '往上，這是逆斷層。台灣位在菲律賓海板塊與歐亞板塊擠壓的地方。']
      ],
      myths: [
        ['震央就是地震發生的地方。', '地底下開始錯動的位置叫震源，震央是震源正上方的地表位置。'],
        ['地震規模和震度是同一件事。', '規模表示釋放的能量，只有一個值；震度是各地搖晃程度，每個地方不同。']
      ]
    },

    'weather-pressure.html': {
      goals: ['說明高、低氣壓的空氣運動', '判斷北半球高、低氣壓的風向'],
      tasks: [
        ['先預測：北半球高氣壓中心的風怎麼吹？', '順時針、向外吹出；中心空氣下沉，天氣多晴朗。'],
        ['先預測：北半球低氣壓中心的風怎麼吹？', '逆時針、向內吹入；中心空氣上升，容易成雲致雨。']
      ],
      myths: [
        ['高氣壓一定很熱。', '高氣壓代表空氣下沉、天氣穩定，冬天的冷高壓反而很冷。'],
        ['風是從低壓吹向高壓。', '風由高壓吹向低壓。']
      ]
    },

    'weather-fronts.html': {
      goals: ['比較冷鋒與暖鋒的結構', '說明鋒面過境的天氣變化'],
      tasks: [
        ['選「冷鋒」自動推演。先預測：冷鋒過境後氣溫會怎樣？', '下降。冷空氣取代了原本的暖空氣。'],
        ['比較冷鋒和暖鋒。先預測：哪一種雨帶比較窄、雨勢比較急？', '冷鋒。冷空氣快速把暖空氣往上推，形成積雨雲。'],
        ['選「暖鋒」。先預測：雲和雨分布在鋒面的前方還是後方？', '在鋒面前方、範圍很廣，多為層狀雲帶來的綿綿細雨。']
      ],
      myths: [
        ['鋒面是一條線。', '鋒面是冷暖空氣交界的傾斜面，地圖上的線是它和地面的交界。'],
        ['梅雨就是冷鋒。', '梅雨鋒面通常是滯留鋒，冷暖空氣勢力相當，停留很久。']
      ]
    },

    'typhoon-wind.html': {
      goals: ['知道北半球颱風逆時針旋轉', '用颱風位置判斷台灣各地的風向'],
      tasks: [
        ['選任一條路徑，按「沿路徑移動」。先預測：颱風中心在台灣東方海面時，台灣吹什麼方向的風？', '偏北風。颱風逆時針旋轉，它的西側氣流由北往南吹。'],
        ['先預測：颱風中心在台灣南方海面時，台灣吹什麼方向的風？', '偏東風。颱風北側的氣流由東往西吹。'],
        ['比較「北部登陸・西行」和「台灣海峽北上」。先預測：哪一條路徑讓西半部的風雨比較大？', '台灣海峽北上。颱風在西側時，西半部變成迎風面，常吹西南風帶來豪雨。']
      ],
      myths: [
        ['颱風眼的風雨最大。', '颱風眼風平浪靜，風雨最強的是眼外圍的眼牆。'],
        ['颱風一定是順時針旋轉。', '北半球的颱風逆時針旋轉，南半球的才順時針。']
      ]
    },

    'cell-division.html': {
      goals: ['比較有絲分裂與減數分裂', '說明精子與卵形成的差異'],
      tasks: [
        ['「中期排列對決」。先預測：有絲分裂和減數第一次分裂，中期的染色體排法有什麼不同？', '有絲分裂排成一列；減數第一次分裂是同源染色體成對排列。'],
        ['「精卵分裂差異」。先預測：一個母細胞各會產生幾個精子、幾個卵？', '4 個精子；1 個卵（另外 3 個是很小的極體）。'],
        ['先預測：減數分裂後，子細胞的染色體數目是母細胞的多少？', '一半。受精後才恢復原本的數目。']
      ],
      myths: [
        ['減數分裂只分裂一次。', '減數分裂有兩次分裂，染色體只複製一次，所以數目減半。'],
        ['有絲分裂會讓染色體減半。', '有絲分裂產生的兩個子細胞，染色體數目和母細胞一樣。']
      ]
    },

    'clay-sim.html#cell': {
      goals: ['說明細胞分裂的過程', '知道分裂後子細胞的染色體數目'],
      tasks: [
        ['用「下一步」一步步看細胞分裂。先預測：分裂前染色體會先做什麼？', '先複製，每條染色體變成兩條相同的染色分體。'],
        ['先預測：分裂完成後，每個子細胞的染色體數目和原本相比如何？', '一樣多。細胞分裂讓生物長大、修補傷口，遺傳物質不變。']
      ],
      myths: [['細胞分裂後細胞會越來越小。', '子細胞分裂後會再長大，生物體才能成長。']]
    },

    'clay-sim.html#typhoon': {
      goals: ['知道北半球颱風逆時針旋轉', '用颱風位置判斷風向'],
      tasks: [
        ['用「下一步」移動颱風。先預測：颱風在台灣東方時，台灣吹什麼方向的風？', '偏北風。颱風逆時針旋轉，它的西側氣流由北往南吹。'],
        ['先預測：風雨最大的地方是颱風眼嗎？', '不是。颱風眼風平浪靜，眼牆的風雨最強。']
      ],
      myths: [['颱風一定是順時針旋轉。', '北半球的颱風逆時針旋轉，南半球的才順時針。']]
    },

    'moon-phases.html': {
      goals: ['用日、地、月的位置解釋月相', '知道月亮永遠有一半被照亮'],
      tasks: [
        ['打開「標出兩個一半」。先預測：月亮被太陽照亮的部分會變大變小嗎？', '永遠是一半被照亮。月相改變，是因為我們從地球看到的那一半不同。'],
        ['先預測：滿月時，太陽、地球、月亮怎麼排？', '地球在中間，月亮在太陽的對面。'],
        ['先預測：上弦月大約什麼時候出現在南方天空？', '黃昏時。上弦月中午東升、半夜西落。']
      ],
      myths: [
        ['月相是地球的影子遮住月亮造成的。', '那是月食。月相是因為看到月亮亮面的比例不同。'],
        ['月亮只在晚上出現。', '很多月相白天也看得到，例如下午的上弦月。']
      ]
    },

    'daily-motion.html': {
      goals: ['說明周日運動是地球自轉造成的', '比較四季太陽的路徑'],
      tasks: [
        ['打開「星星的軌跡和北極星」。先預測：星星繞著哪裡轉？', '繞著北極星附近（北天極）逆時針轉。'],
        ['按「比較四季的太陽路徑」。先預測：夏至和冬至，哪一天正午太陽比較高？', '夏至較高、白天較長；冬至較低、白天較短。'],
        ['先預測：太陽為什麼東升西落？', '地球由西向東自轉，所以看起來天上的東西都由東往西移動。']
      ],
      myths: [
        ['北極星在正頭頂。', '北極星的仰角約等於當地緯度，台灣約 22～25°。'],
        ['太陽每天都從正東方升起。', '只有春分、秋分從正東方升起；夏天偏北、冬天偏南。']
      ]
    }
  };
  // 月亮與天空教室：月相 + 周日運動
  LESSONS['sky-lab.html'] = {
    goals: [...LESSONS['moon-phases.html'].goals, ...LESSONS['daily-motion.html'].goals],
    tasks: [...LESSONS['moon-phases.html'].tasks, ...LESSONS['daily-motion.html'].tasks],
    myths: [...LESSONS['moon-phases.html'].myths, ...LESSONS['daily-motion.html'].myths]
  };

  /* ===== 樣式（lx- 前綴，避免和各頁原本的樣式衝突） ===== */
  const css = `
  .lx-fab { position: fixed; left: 16px; bottom: calc(16px + env(safe-area-inset-bottom, 0px)); z-index: 60; display: flex; gap: 8px; }
  .lx-btn {
    display: inline-flex; align-items: center; justify-content: center; gap: 6px; min-height: 44px; min-width: 44px; padding: 0 14px;
    border-radius: 999px; border: 1px solid rgba(255,255,255,.18); cursor: pointer; touch-action: manipulation;
    font: 600 14px/1 "Noto Sans TC","PingFang TC","Microsoft JhengHei",system-ui,sans-serif; color: #eef1fa;
    background: rgba(16,20,40,.72); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
    box-shadow: 0 6px 20px rgba(0,0,0,.3); -webkit-tap-highlight-color: transparent;
  }
  .lx-btn:hover { background: rgba(30,38,72,.85); }
  .lx-btn[aria-expanded="true"] { background: #5b9cff; border-color: #5b9cff; color: #0b1020; }
  .lx-btn svg { width: 18px; height: 18px; }
  .lx-card {
    position: fixed; left: 16px; bottom: calc(72px + env(safe-area-inset-bottom, 0px)); z-index: 61; width: 380px;
    max-height: min(68vh, 620px); display: flex; flex-direction: column; overflow: hidden;
    border-radius: 20px; border: 1px solid rgba(255,255,255,.14); color: #eef1fa;
    background: rgba(14,18,36,.86); backdrop-filter: blur(18px) saturate(140%); -webkit-backdrop-filter: blur(18px) saturate(140%);
    box-shadow: 0 20px 60px rgba(0,0,0,.5);
    font: 14px/1.65 "Noto Sans TC","PingFang TC","Microsoft JhengHei",system-ui,sans-serif; letter-spacing: .02em;
  }
  .lx-card[hidden] { display: none; }
  .lx-head { display: flex; align-items: center; gap: 10px; padding: 14px 16px 10px; }
  .lx-head b { font-size: 16px; }
  .lx-head small { color: rgba(238,241,250,.6); font-size: 12px; }
  .lx-x { margin-left: auto; width: 36px; height: 36px; border-radius: 50%; border: 0; cursor: pointer; color: #eef1fa; background: rgba(255,255,255,.08); font-size: 16px; }
  .lx-tabs { display: grid; grid-template-columns: repeat(3, 1fr); gap: 4px; margin: 0 16px; padding: 4px; border-radius: 12px; background: rgba(255,255,255,.06); }
  .lx-tab { min-height: 38px; border: 0; border-radius: 9px; cursor: pointer; background: transparent; color: rgba(238,241,250,.6); font: inherit; font-size: 13px; }
  .lx-tab[aria-selected="true"] { background: rgba(255,255,255,.14); color: #eef1fa; font-weight: 700; }
  .lx-body { overflow-y: auto; padding: 12px 16px 16px; overscroll-behavior: contain; -webkit-overflow-scrolling: touch; }
  .lx-body ol, .lx-body ul { margin: 0; padding: 0; list-style: none; display: grid; gap: 10px; }
  .lx-goal { display: flex; gap: 10px; }
  .lx-goal::before { content: "◎"; color: #5b9cff; }
  .lx-task { padding: 12px; border-radius: 14px; background: rgba(255,255,255,.05); border: 1px solid rgba(255,255,255,.08); }
  .lx-task .lx-q b { color: #ffd166; margin-right: 4px; }
  .lx-reveal { margin-top: 8px; min-height: 36px; padding: 0 14px; border-radius: 999px; cursor: pointer; font: inherit; font-size: 13px; color: #5b9cff; background: rgba(91,156,255,.12); border: 1px solid rgba(91,156,255,.4); }
  .lx-ans { margin-top: 8px; padding: 8px 10px; border-radius: 10px; background: rgba(76,201,240,.1); border-left: 3px solid #4cc9f0; }
  .lx-ans[hidden] { display: none; }
  .lx-myth { padding: 12px; border-radius: 14px; background: rgba(255,255,255,.05); }
  .lx-wrong { color: #ff8fa8; }
  .lx-wrong::before { content: "✗ "; font-weight: 700; }
  .lx-right { margin-top: 4px; }
  .lx-right::before { content: "✓ "; color: #6ee7a8; font-weight: 700; }
  .lx-foot { margin-top: 12px; font-size: 12px; color: rgba(238,241,250,.5); }
  /* 手機與直式平板：按鈕移到左側中間（底部常是控制抽屜），任務卡變成底部大卡片 */
  @media (max-width: 760px), (max-width: 1100px) and (orientation: portrait) {
    .lx-fab { left: 8px; bottom: auto; top: 38%; flex-direction: column; }
    .lx-btn .lx-label { display: none; }
    .lx-card { left: 8px; right: 8px; bottom: calc(8px + env(safe-area-inset-bottom, 0px)); width: auto; max-height: 72vh; }
  }
  @media print { .lx-fab, .lx-card { display: none !important; } }`;

  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const ICON = {
    book: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5a2 2 0 0 1 2-2h12v16H6a2 2 0 0 0-2 2z"/><path d="M4 19V5M9 7h6"/></svg>',
    full: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg>',
    exit: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5"/></svg>'
  };

  function init() {
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);

    const fab = document.createElement('div');
    fab.className = 'lx-fab';
    document.body.appendChild(fab);

    /* ----- 全螢幕 ----- */
    const root = document.documentElement;
    const canFull = !!(root.requestFullscreen || root.webkitRequestFullscreen);
    if (canFull) {
      const fb = document.createElement('button');
      fb.className = 'lx-btn';
      fb.setAttribute('aria-label', '全螢幕');
      fb.title = '全螢幕（投影用）';
      const isFull = () => !!(document.fullscreenElement || document.webkitFullscreenElement);
      const paint = () => { fb.innerHTML = isFull() ? ICON.exit : ICON.full; };
      fb.addEventListener('click', () => {
        if (isFull()) (document.exitFullscreen || document.webkitExitFullscreen).call(document);
        else (root.requestFullscreen || root.webkitRequestFullscreen).call(root);
      });
      document.addEventListener('fullscreenchange', paint);
      document.addEventListener('webkitfullscreenchange', paint);
      paint();
      fab.appendChild(fb);
    }

    /* ----- 學習任務 ----- */
    const card = document.createElement('section');
    card.className = 'lx-card';
    card.hidden = true;
    card.setAttribute('aria-label', '學習任務');
    document.body.appendChild(card);

    const lb = document.createElement('button');
    lb.className = 'lx-btn';
    lb.innerHTML = `${ICON.book}<span class="lx-label">學習任務</span>`;
    lb.setAttribute('aria-expanded', 'false');
    lb.setAttribute('aria-label', '學習任務');
    fab.prepend(lb);

    let tab = 'tasks';
    const lesson = () => {
      const file = decodeURIComponent(location.pathname.split('/').pop() || 'index.html');
      return LESSONS[file + location.hash] || LESSONS[file] || null;
    };
    function render() {
      const L = lesson();
      lb.hidden = !L;
      if (!L) { card.hidden = true; return; }
      const title = (document.querySelector('h1') || {}).textContent || document.title;
      const body = {
        goals: `<ul>${L.goals.map(g => `<li class="lx-goal">${esc(g)}</li>`).join('')}</ul>`,
        tasks: `<ol>${L.tasks.map(([q, a]) => `
          <li class="lx-task"><div class="lx-q"><b>先預測</b>${esc(q)}</div>
          <button class="lx-reveal">操作後揭曉</button><div class="lx-ans" hidden>${esc(a)}</div></li>`).join('')}</ol>
          <p class="lx-foot">先寫下或說出你的預測，再動手操作，最後才按「揭曉」。</p>`,
        myths: `<ul>${L.myths.map(([w, r]) => `<li class="lx-myth"><div class="lx-wrong">${esc(w)}</div><div class="lx-right">${esc(r)}</div></li>`).join('')}</ul>`
      };
      card.innerHTML = `
        <div class="lx-head"><div><b>學習任務</b><br><small>${esc(title.trim())}</small></div><button class="lx-x" aria-label="關閉">✕</button></div>
        <div class="lx-tabs" role="tablist">
          ${[['goals', '學習目標'], ['tasks', `操作任務 ${L.tasks.length}`], ['myths', '常見迷思']].map(([k, n]) =>
            `<button class="lx-tab" role="tab" data-k="${k}" aria-selected="${k === tab}">${n}</button>`).join('')}
        </div>
        <div class="lx-body">${body[tab]}</div>`;
    }
    const open = o => { card.hidden = !o; lb.setAttribute('aria-expanded', String(o)); if (o) render(); };
    lb.addEventListener('click', () => open(card.hidden));
    card.addEventListener('click', e => {
      if (e.target.closest('.lx-x')) return open(false);
      const t = e.target.closest('.lx-tab');
      if (t) { tab = t.dataset.k; render(); return; }
      const r = e.target.closest('.lx-reveal');
      if (r) { r.nextElementSibling.hidden = false; r.remove(); }
    });
    // 鍵盤事件不要傳到頁面（例如光學頁的 H 快捷鍵）
    card.addEventListener('keydown', e => { if (e.key === 'Escape') open(false); e.stopPropagation(); });
    window.addEventListener('hashchange', () => { if (!card.hidden) render(); else lb.hidden = !lesson(); });
    render();
    card.hidden = true;

    /* 避開按鈕：左下角的操作提示往右挪；左側面板若長到按鈕的位置，就縮短並改成可捲動 */
    const MOBILE = '(max-width: 760px), (max-width: 1100px) and (orientation: portrait)';
    function avoid() {
      const fr = fab.getBoundingClientRect();
      const hits = r => r.left < fr.right && r.right > fr.left && r.top < fr.bottom && r.bottom > fr.top;
      document.querySelectorAll('.hint').forEach(h => {
        if (hits(h.getBoundingClientRect()) && getComputedStyle(h).position !== 'static') h.style.left = (fr.right + 12) + 'px';
      });
      if (matchMedia(MOBILE).matches) return;     // 手機版面板是底部抽屜，按鈕在左側中間，不會重疊
      document.querySelectorAll('.panel').forEach(p => {
        p.style.maxHeight = '';
        const r = p.getBoundingClientRect();
        if (r.left < 200 && hits(r)) {
          p.style.maxHeight = Math.max(160, fr.top - r.top - 12) + 'px';
          p.style.overflowY = 'auto';
        }
      });
    }
    setTimeout(avoid, 300);
    addEventListener('resize', () => setTimeout(avoid, 100));
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
