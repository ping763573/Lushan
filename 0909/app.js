// 應用程式狀態
let appState = {
    currentSection: 'home',
    flashcards: [],
    quiz: [],
    currentFlashcard: 0,
    filteredFlashcards: [],
    flashcardProgress: new Set(),
    currentQuizQuestion: 0,
    quizAnswers: [],
    quizStartTime: null,
    quizTimer: null,
    quizStats: {
        attempts: 0,
        bestScore: 0
    },
    currentQuestionAnswered: false
};

// 從JSON數據載入學習閃卡
const flashcardsData = [
    {"id": 1, "question": "什麼是生命底氣？", "answer": "比金錢更重要的內在能量、勇氣與安定感，是面對生命挑戰時的隱形盔甲", "category": "基礎概念"},
    {"id": 2, "question": "潛意識資料庫是什麼？", "answer": "生命之初被植入靈魂的晶片，記錄早期生命經驗與感受，影響一生的反應模式", "category": "基礎概念"},
    {"id": 3, "question": "經絡的定義是什麼？", "answer": "氣的通道，連接十大器官延伸至四肢末梢的能量路徑", "category": "基礎概念"},
    {"id": 4, "question": "什麼是氣？", "answer": "看不到摸不到但感覺得到的生命能量，沒有氣生命就停止", "category": "基礎概念"},
    {"id": 5, "question": "肝藏什麼？", "answer": "肝藏魂，肝不好的人容易發怒，因為魂找不到家", "category": "基礎概念"},
    {"id": 6, "question": "心藏什麼？", "answer": "心藏神，心臟主導神智、思想與記憶", "category": "基礎概念"},
    {"id": 7, "question": "脾主什麼？", "answer": "脾主意，脾胃對應意志力", "category": "基礎概念"},
    {"id": 8, "question": "肺藏什麼？", "answer": "肺藏魄，肺部儲藏魄力、勇氣", "category": "基礎概念"},
    {"id": 9, "question": "為什麼說底氣比金錢更重要？", "answer": "沒有底氣的人不會真正有錢，有錢沒底氣也會一生痛苦，錢都花在看病上", "category": "基礎概念"},
    {"id": 10, "question": "底氣不足的人有什麼表現？", "answer": "生活充滿慌張恐慌，身體不適就上網查症狀，容易被負面資訊籠罩", "category": "基礎概念"},
    {"id": 11, "question": "有底氣的人如何面對身體狀況？", "answer": "會思考我該做什麼改變讓身體好轉，而不是懷疑自己得了什麼病", "category": "基礎概念"},
    {"id": 12, "question": "潛意識資料庫何時開始建置？", "answer": "生命之初，特別是出生產房和手術麻醉期間", "category": "基礎概念"},
    {"id": 13, "question": "什麼是白袍症？", "answer": "平時血壓正常，一到醫院見醫生血壓就飆高，是底氣不足的表現", "category": "基礎概念"},
    {"id": 14, "question": "為什麼西醫找不到經絡？", "answer": "因為解剖對象是死人，死人斷氣了沒有氣，經絡只存在活人身上", "category": "基礎概念"},
    {"id": 15, "question": "十大器官在身體哪裡？", "answer": "都集中在身體軀幹裡，十二經絡從這裡延伸到末梢", "category": "基礎概念"},
    {"id": 16, "question": "末梢感覺麻痛緊酸代表什麼？", "answer": "對應的內部器官可能出了狀況，是器官發出的求救信號", "category": "基礎概念"},
    {"id": 17, "question": "秋天為什麼容易燥？", "answer": "秋天容易秋燥，但脾胃仍怕寒，要用薑茶暖胃配珍珠粉潤肺", "category": "基礎概念"},
    {"id": 18, "question": "產房氛圍為什麼重要？", "answer": "新生兒潜意識大門敞開，周圍氛圍和話語會植入影響一生", "category": "基礎概念"},
    {"id": 19, "question": "手術麻醉時要注意什麼？", "answer": "病人半清醒狀態，房間任何話語都可能進入潛意識影響後半生", "category": "基礎概念"},
    {"id": 20, "question": "什麼是無名的恐懼？", "answer": "早期潛意識植入負面資訊造成的莫名恐慌，找不到具體原因", "category": "基礎概念"},
    {"id": 21, "question": "睡前自我對話的最佳時機？", "answer": "每晚即將入睡前20秒，身心最放鬆、意識介於清醒與睡眠間", "category": "實踐技巧"},
    {"id": 22, "question": "如何進行睡前自我對話？", "answer": "呼喚自己名字，說：選擇跟你合作是我的榮幸，用歡喜肯定的心態", "category": "實踐技巧"},
    {"id": 23, "question": "如何避免失憶健忘？", "answer": "信任地交代事情給自己：明天記得提醒我這件事，練習信任自己", "category": "實踐技巧"},
    {"id": 24, "question": "靈魂療法的原理？", "answer": "透過溫暖恭敬的觸摸，讓因創傷漂泊的靈魂回家安頓身體", "category": "實踐技巧"},
    {"id": 25, "question": "靈魂療法如何操作？", "answer": "用紮實手心在背部心俞肺俞肝俞繞圈，肯定手腳功能，慎重放下", "category": "實踐技巧"},
    {"id": 26, "question": "為什麼靈魂療法要同性操作？", "answer": "異性操作易產生情感依賴和誤會，可能導致情感出軌", "category": "實踐技巧"},
    {"id": 27, "question": "刮痧應該用多大力道？", "answer": "要輕柔，外行才用猛力，越大力肌肉越反彈抵抗效果更差", "category": "實踐技巧"},
    {"id": 28, "question": "刮痧的正確方向？", "answer": "一律往下或往外單向刮，絕對不可來回刮", "category": "實踐技巧"},
    {"id": 29, "question": "刮神經叢要用什麼角度？", "answer": "工具與皮膚呈90度垂直，這樣力量才能透進去", "category": "實踐技巧"},
    {"id": 30, "question": "刮痧工具盾頭的用途？", "answer": "用於按壓氣結、肌肉特別僵硬緊繃的點，把它揉散", "category": "實踐技巧"},
    {"id": 31, "question": "刮痧工具魚肚的用途？", "answer": "用於刮肉比較多、面積較大的地方，例如肩膀", "category": "實踐技巧"},
    {"id": 32, "question": "刮痧工具尖角的用途？", "answer": "用於刮脊椎兩側的神經叢，這是非常關鍵的部位", "category": "實踐技巧"},
    {"id": 33, "question": "刮痧工具凹槽的用途？", "answer": "專門刮脊椎督脈、頸後大動脈等有骨骼突起的部位", "category": "實踐技巧"},
    {"id": 34, "question": "背部刮痧的第一步？", "answer": "開背，從頸椎開始用凹槽往下刮脊椎，讓每節椎骨顯露", "category": "實踐技巧"},
    {"id": 35, "question": "什麼是神經叢？為什麼重要？", "answer": "脊椎兩側的神經通道，五臟六腑的氣與營養從這裡吸收", "category": "實踐技巧"},
    {"id": 36, "question": "刮痧多久可以再做？", "answer": "等上次出的痧完全退掉後約一週，平常可與拍打輪流", "category": "實踐技巧"},
    {"id": 37, "question": "氣結不處理會怎樣？", "answer": "氣血不通，久了可能長出不好的東西如腫瘤", "category": "實踐技巧"},
    {"id": 38, "question": "刮痧從哪邊開始比較好？", "answer": "一般先刮左邊再刮右邊，從左邊開始效果更佳", "category": "實踐技巧"},
    {"id": 39, "question": "拍打的意義是什麼？", "answer": "如同管教，清除潛意識中累積的愧疚能量和小過錯", "category": "實踐技巧"},
    {"id": 40, "question": "撫觸的意義是什麼？", "answer": "如同饒恕，對無心之過或深層創傷給予理解接納", "category": "實踐技巧"},
    {"id": 41, "question": "如何判斷一個人有沒有底氣？", "answer": "看他面對身體狀況是思考如何改變，還是懷疑自己得病", "category": "應用理解"},
    {"id": 42, "question": "成年人的潛意識資料庫還能改變嗎？", "answer": "當然可以！只要還在呼吸就有機會重新安裝正向晶片", "category": "應用理解"},
    {"id": 43, "question": "如何為新生兒建立好的資料庫？", "answer": "熱烈歡迎來到地球，肯定身體各部位功能，建造性對話", "category": "應用理解"},
    {"id": 44, "question": "遇到殺氣騰騰的人如何處理？", "answer": "用溫暖觸摸安撫背部，回溯童年可愛之處，化解憤怒", "category": "應用理解"},
    {"id": 45, "question": "為什麼有人檢查不出病卻很痛苦？", "answer": "可能是靈魂與身體分離，底氣不足造成的身心問題", "category": "應用理解"},
    {"id": 46, "question": "如何重建與自己的連結？", "answer": "透過睡前自我對話和靈魂療法，把自己的靈魂叫回來", "category": "應用理解"},
    {"id": 47, "question": "身體不適時正確的思考方式？", "answer": "不要懷疑得了什麼病，而要思考該做什麼改變讓身體好轉", "category": "應用理解"},
    {"id": 48, "question": "如何建立建造性對話？", "answer": "每句話都要有建造性，肯定對方價值和能力，避免負面暗示", "category": "應用理解"},
    {"id": 49, "question": "什麼時候用拍打什麼時候用撫觸？", "answer": "有愧疚感需要管教用拍打，需要安撫理解用撫觸", "category": "應用理解"},
    {"id": 50, "question": "如何預防家族遺傳疾病？", "answer": "建立強大底氣，相信自己有能力改變，不被基因恐嚇", "category": "應用理解"},
    {"id": 51, "question": "年紀大的人可以刮痧嗎？", "answer": "可以，七八十歲老人也能刮，重點是力道要非常輕", "category": "應用理解"},
    {"id": 52, "question": "沒出痧是不是沒效果？", "answer": "不是，沒出痧不代表沒效果，身體狀況不同出痧程度不同", "category": "應用理解"},
    {"id": 53, "question": "刮痧後身體會有什麼感覺？", "answer": "僵硬的脖子肩膀會立刻輕鬆，轉動會很順暢", "category": "應用理解"},
    {"id": 54, "question": "如何成為自己生命的主宰？", "answer": "建立底氣，學會與靈魂合作，掌握身心健康主導權", "category": "應用理解"},
    {"id": 55, "question": "練習這些技巧的最終目標？", "answer": "擺脫恐慌擔憂，活出健康豐盛且無懼的生命狀態", "category": "應用理解"}
];

// 從JSON數據載入測驗題目
const quizData = [
    {"id": 1, "question": "生命底氣最重要的特質是什麼？", "options": ["有很多錢", "內在的勇氣與能量", "社會地位高", "身體很健康"], "correct": 1, "explanation": "底氣是比金錢更重要的內在勇氣與能量"},
    {"id": 2, "question": "潛意識資料庫主要在什麼時候建立？", "options": ["成年後", "青少年時期", "出生時和麻醉時", "老年時期"], "correct": 2, "explanation": "在出生產房和手術麻醉等意識薄弱時最容易植入"},
    {"id": 3, "question": "經絡是什麼的通道？", "options": ["血液", "氣", "神經", "淋巴"], "correct": 1, "explanation": "經絡是氣的通道，連接器官到末梢"},
    {"id": 4, "question": "肝藏什麼？", "options": ["神", "魂", "魄", "意"], "correct": 1, "explanation": "肝藏魂，肝不好的人容易發怒因為魂找不到家"},
    {"id": 5, "question": "睡前自我對話的最佳時機是？", "options": ["睡前1小時", "躺下就開始", "即將入睡前20秒", "半夜醒來時"], "correct": 2, "explanation": "在即將入睡前20秒，意識最放鬆時效果最好"},
    {"id": 6, "question": "刮痧時應該用什麼力道？", "options": ["越大力越好", "輕柔的力道", "中等力道", "根據個人喜好"], "correct": 1, "explanation": "要輕柔，外行才用猛力，大力會讓肌肉反彈"},
    {"id": 7, "question": "刮痧的正確方向是？", "options": ["來回刮", "往上刮", "往下或往外單向刮", "隨意方向"], "correct": 2, "explanation": "一律往下或往外單向刮，絕不可來回刮"},
    {"id": 8, "question": "靈魂療法為什麼要同性操作？", "options": ["效果比較好", "避免情感依賴", "傳統習俗", "沒有特殊原因"], "correct": 1, "explanation": "異性操作容易產生情感依賴和誤會"},
    {"id": 9, "question": "神經叢位於哪裡？", "options": ["手臂上", "脊椎兩側", "腿部", "頭部"], "correct": 1, "explanation": "神經叢位於脊椎兩側，是五臟六腑吸收養分的通道"},
    {"id": 10, "question": "拍打的意義類似什麼？", "options": ["饒恕", "管教", "安慰", "治療"], "correct": 1, "explanation": "拍打類似管教，清除潛意識中的愧疚能量"},
    {"id": 11, "question": "有底氣的人面對身體不適會？", "options": ["立刻看醫生", "上網查症狀", "思考要改變什麼", "感到恐慌"], "correct": 2, "explanation": "有底氣的人會思考該做什麼改變讓身體好轉"},
    {"id": 12, "question": "為什麼西醫找不到經絡？", "options": ["技術不夠", "解剖死人沒有氣", "經絡不存在", "儀器問題"], "correct": 1, "explanation": "解剖對象是死人，死人斷氣了當然找不到氣的通道"},
    {"id": 13, "question": "白袍症是什麼？", "options": ["醫生的職業病", "見到醫生血壓就高", "穿白袍的恐懼", "醫院的傳染病"], "correct": 1, "explanation": "平時血壓正常，一到醫院見醫生就血壓飆高"},
    {"id": 14, "question": "刮痧多久可以再做一次？", "options": ["每天", "三天", "一週左右", "一個月"], "correct": 2, "explanation": "要等上次的痧完全退掉，大約一週一次"},
    {"id": 15, "question": "心藏什麼？", "options": ["魂", "神", "魄", "意"], "correct": 1, "explanation": "心藏神，心臟主導神智、思想與記憶"},
    {"id": 16, "question": "產房氛圍為什麼重要？", "options": ["環境衛生", "影響潛意識建立", "醫療安全", "家屬心情"], "correct": 1, "explanation": "新生兒潛意識大門敞開，氛圍會植入影響一生"},
    {"id": 17, "question": "脾主什麼？", "options": ["魂", "神", "魄", "意"], "correct": 3, "explanation": "脾主意，對應意志力，意志力薄弱常是脾胃問題"},
    {"id": 18, "question": "氣結不處理會怎樣？", "options": ["沒關係", "會消失", "可能長腫瘤", "會轉移"], "correct": 2, "explanation": "氣血不通久了可能長出不好的東西"},
    {"id": 19, "question": "撫觸的意義類似什麼？", "options": ["管教", "饒恕", "懲罰", "訓練"], "correct": 1, "explanation": "撫觸類似饒恕，給予無心之過理解與接納"},
    {"id": 20, "question": "成年人還能改變潛意識嗎？", "options": ["不可能", "很困難", "只要呼吸就有機會", "需要手術"], "correct": 2, "explanation": "只要還在呼吸，就有機會重新安裝正向晶片"},
    {"id": 21, "question": "刮痧工具盾頭的主要用途？", "options": ["刮大面積", "按壓氣結", "刮脊椎", "按摩"], "correct": 1, "explanation": "盾頭用於按壓氣結和特別僵硬的點"},
    {"id": 22, "question": "肺藏什麼？", "options": ["魂", "神", "魄", "意"], "correct": 2, "explanation": "肺藏魄，肺部儲藏魄力和勇氣"},
    {"id": 23, "question": "秋天養生要注意什麼？", "options": ["少喝水", "薑茶配珍珠粉", "多吃冰", "不用特別注意"], "correct": 1, "explanation": "秋燥但脾胃怕寒，用薑茶暖胃配珍珠粉潤肺"},
    {"id": 24, "question": "如何避免失憶健忘？", "options": ["多吃補品", "信任交代給自己", "寫很多筆記", "多看醫生"], "correct": 1, "explanation": "練習信任自己，交代事情給潛意識"},
    {"id": 25, "question": "靈魂與身體分離會怎樣？", "options": ["沒影響", "產生很多毛病", "更健康", "更聰明"], "correct": 1, "explanation": "靈魂身體分離時會產生很多檢查不出的毛病"},
    {"id": 26, "question": "建造性對話的重點是？", "options": ["說很多話", "批評指正", "肯定與讚美", "保持沉默"], "correct": 2, "explanation": "每句話都要有建造性，肯定對方的價值"},
    {"id": 27, "question": "為什麼末梢會麻痛？", "options": ["血液循環差", "對應器官有問題", "營養不良", "缺乏運動"], "correct": 1, "explanation": "末梢麻痛是對應內部器官的求救信號"},
    {"id": 28, "question": "刮神經叢要用什麼角度？", "options": ["45度", "60度", "90度垂直", "任意角度"], "correct": 2, "explanation": "90度垂直才能讓力量透進去"},
    {"id": 29, "question": "什麼是無名的恐懼？", "options": ["說不出原因的恐慌感", "特定物體的恐懼", "社交恐懼", "高處恐懼"], "correct": 0, "explanation": "早期潛意識植入負面資訊造成的莫名恐慌"},
    {"id": 30, "question": "練習生命教育經絡學的最終目標？", "options": ["賺很多錢", "成為治療師", "活出無懼豐盛的生命", "幫助別人"], "correct": 2, "explanation": "最終目標是擺脫恐慌，活出健康豐盛無懼的生命"}
];

// 確保DOM加載完成後再執行
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM 已加載完成，開始初始化...');
    initApp();
});

function initApp() {
    console.log('初始化應用程式...');
    
    // 載入數據
    appState.flashcards = flashcardsData;
    appState.quiz = quizData;
    appState.filteredFlashcards = [...flashcardsData]; // 初始化過濾後的閃卡陣列
    
    // 更新統計數字
    updateStats();
    
    // 初始化各個功能模組
    setTimeout(() => {
        initNavigation();
        initFlashcards();
        initQuiz();
        updateSummaryStats();
        console.log('應用程式初始化完成');
    }, 100);
}

function updateStats() {
    const elements = {
        'flashcard-count': `${appState.flashcards.length}題題庫`,
        'quiz-count': `${appState.quiz.length}題測驗`,
        'quiz-total-questions': appState.quiz.length
    };
    
    Object.entries(elements).forEach(([id, text]) => {
        const el = document.getElementById(id);
        if (el) el.textContent = text;
    });
}

function initNavigation() {
    console.log('初始化導航...');
    
    // 使用事件委託處理導航點擊，但排除視頻按鈕
    document.body.addEventListener('click', function(e) {
        // 如果點擊的是視頻按鈕，讓默認行為執行（打開連結）
        if (e.target.closest('.video-btn')) {
            return; // 不阻止默認行為，讓連結正常工作
        }
        
        const navBtn = e.target.closest('.nav-btn');
        if (navBtn && navBtn.dataset.section) {
            e.preventDefault();
            const section = navBtn.dataset.section;
            console.log(`導航到: ${section}`);
            
            showSection(section);
            updateNavigation(navBtn);
            appState.currentSection = section;
        }
    });
    
    console.log('導航初始化完成');
}

function showSection(sectionId) {
    // 隱藏所有區段
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    // 顯示目標區段
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        console.log(`成功顯示區段: ${sectionId}`);
    } else {
        console.error(`找不到區段: ${sectionId}`);
    }
}

function updateNavigation(activeBtn) {
    // 移除所有按鈕的活動狀態
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // 添加當前按鈕的活動狀態
    if (activeBtn) {
        activeBtn.classList.add('active');
    }
}

function initFlashcards() {
    console.log('初始化學習閃卡...');
    
    const flashcard = document.getElementById('flashcard');
    if (!flashcard) {
        console.error('找不到閃卡元素');
        return;
    }
    
    // 載入第一張閃卡
    displayFlashcard();
    
    // 使用事件委託處理所有閃卡相關點擊
    document.body.addEventListener('click', function(e) {
        // [修正] 優先處理「上一題」和「下一題」按鈕的點擊事件。
        // 這是因為這些按鈕位於卡片翻轉容器的內部。
        // 如果先處理卡片翻轉事件，按鈕點擊會被錯誤地識別為翻轉卡片，導致無法換頁。
        
        // 上一題
        if (e.target.id === 'prev-card') {
            e.preventDefault();
            previousFlashcard();
            return;
        }
        
        // 下一題
        if (e.target.id === 'next-card') {
            e.preventDefault();
            nextFlashcard();
            return;
        }
        
        // 閃卡翻轉 (只有在點擊的不是上一題/下一題按鈕時才會執行)
        if (e.target.closest('#flashcard')) {
            e.preventDefault();
            flashcard.classList.toggle('flipped');
            if (flashcard.classList.contains('flipped')) {
                // [優化] 使用卡片ID而不是陣列索引來追蹤進度，這樣在篩選或隨機排序時更穩定。
                const currentCardData = appState.filteredFlashcards[appState.currentFlashcard];
                if (currentCardData) {
                    appState.flashcardProgress.add(currentCardData.id);
                }
                updateFlashcardProgress();
            }
            return;
        }
        
        // 隨機抽題
        if (e.target.id === 'shuffle-btn') {
            e.preventDefault();
            const randomIndex = Math.floor(Math.random() * appState.filteredFlashcards.length);
            appState.currentFlashcard = randomIndex;
            displayFlashcard();
            return;
        }
        
        // 重置進度
        if (e.target.id === 'reset-progress') {
            e.preventDefault();
            appState.flashcardProgress.clear();
            updateFlashcardProgress();
            return;
        }
    });
    
    // 類別篩選
    const categoryFilter = document.getElementById('category-filter');
    if (categoryFilter) {
        categoryFilter.addEventListener('change', function() {
            filterFlashcards(this.value);
        });
    }
    
    console.log('學習閃卡初始化完成');
}

function filterFlashcards(category) {
    if (category === 'all') {
        appState.filteredFlashcards = [...appState.flashcards];
    } else {
        appState.filteredFlashcards = appState.flashcards.filter(card => card.category === category);
    }
    
    // 重置當前索引
    appState.currentFlashcard = 0;
    displayFlashcard();
}

function previousFlashcard() {
    if (appState.currentFlashcard > 0) {
        appState.currentFlashcard--;
    } else {
        // 如果是第一題，跳到最後一題
        appState.currentFlashcard = appState.filteredFlashcards.length - 1;
    }
    displayFlashcard();
}

function nextFlashcard() {
    if (appState.currentFlashcard < appState.filteredFlashcards.length - 1) {
        appState.currentFlashcard++;
    } else {
        // 如果是最後一題，跳到第一題
        appState.currentFlashcard = 0;
    }
    displayFlashcard();
}

function displayFlashcard() {
    const flashcard = document.getElementById('flashcard');
    const currentCard = appState.filteredFlashcards[appState.currentFlashcard];
    
    if (!currentCard || !flashcard) return;
    
    // 移除翻轉狀態
    flashcard.classList.remove('flipped');
    
    // 更新內容
    const elements = {
        '.flashcard-front .flashcard-category': currentCard.category,
        '.flashcard-back .flashcard-category': currentCard.category,
        '.flashcard-question': currentCard.question,
        '.flashcard-answer': currentCard.answer
    };
    
    Object.entries(elements).forEach(([selector, text]) => {
        const el = flashcard.querySelector(selector);
        if (el) el.textContent = text;
    });
    
    updateFlashcardProgress();
}

function updateFlashcardProgress() {
    const elements = {
        'current-card': appState.currentFlashcard + 1,
        'total-cards': appState.filteredFlashcards.length
    };
    
    Object.entries(elements).forEach(([id, value]) => {
        const el = document.getElementById(id);
        if (el) el.textContent = value;
    });
    
    const progressFill = document.getElementById('progress-fill');
    if (progressFill) {
        const percent = (appState.flashcardProgress.size / appState.flashcards.length) * 100;
        progressFill.style.width = `${percent}%`;
    }
}

function initQuiz() {
    console.log('初始化測驗...');
    
    // 使用事件委託處理測驗相關點擊
    document.body.addEventListener('click', function(e) {
        switch(e.target.id) {
            case 'start-quiz':
                e.preventDefault();
                startQuiz();
                break;
            case 'prev-question':
                e.preventDefault();
                previousQuestion();
                break;
            case 'next-question':
                e.preventDefault();
                nextQuestion();
                break;
            case 'submit-quiz':
                e.preventDefault();
                submitQuiz();
                break;
            case 'review-wrong':
                e.preventDefault();
                reviewWrongAnswers();
                break;
            case 'restart-quiz':
                e.preventDefault();
                restartQuiz();
                break;
        }
    });
    
    console.log('測驗初始化完成');
}

function startQuiz() {
    console.log('開始測驗');
    
    // 切換顯示
    const quizStart = document.getElementById('quiz-start');
    const quizContainer = document.getElementById('quiz-container');
    
    if (quizStart) quizStart.classList.add('hidden');
    if (quizContainer) quizContainer.classList.remove('hidden');
    
    // 重置狀態
    appState.currentQuizQuestion = 0;
    appState.quizAnswers = new Array(appState.quiz.length).fill(null);
    appState.quizStartTime = Date.now();
    appState.currentQuestionAnswered = false;
    
    // 開始計時
    startQuizTimer();
    
    // 顯示第一題
    displayQuizQuestion();
}

function startQuizTimer() {
    const timerElement = document.getElementById('quiz-timer');
    if (!timerElement) return;
    
    if (appState.quizTimer) clearInterval(appState.quizTimer);
    
    appState.quizTimer = setInterval(() => {
        if (!appState.quizStartTime) return;
        
        const elapsed = Date.now() - appState.quizStartTime;
        const minutes = Math.floor(elapsed / 60000);
        const seconds = Math.floor((elapsed % 60000) / 1000);
        
        timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }, 1000);
}

function displayQuizQuestion() {
    const currentQuestion = appState.quiz[appState.currentQuizQuestion];
    if (!currentQuestion) return;
    
    // 重置當前題目狀態
    appState.currentQuestionAnswered = false;
    
    // 更新問題
    const questionElement = document.getElementById('quiz-question');
    if (questionElement) questionElement.textContent = currentQuestion.question;
    
    // 隱藏解析
    const explanationElement = document.getElementById('quiz-explanation');
    if (explanationElement) explanationElement.classList.add('hidden');
    
    // 更新選項
    const optionsContainer = document.getElementById('quiz-options');
    if (optionsContainer) {
        optionsContainer.innerHTML = '';
        
        currentQuestion.options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.className = 'quiz-option';
            optionElement.textContent = option;
            
            if (appState.quizAnswers[appState.currentQuizQuestion] === index) {
                optionElement.classList.add('selected');
            }
            
            optionElement.addEventListener('click', function() {
                // 如果已經回答過這題，不允許再選擇
                if (appState.currentQuestionAnswered) return;
                
                // 移除其他選項的選擇狀態
                optionsContainer.querySelectorAll('.quiz-option').forEach(opt => {
                    opt.classList.remove('selected');
                });
                
                // 添加當前選項的選擇狀態
                this.classList.add('selected');
                
                // 記錄答案
                appState.quizAnswers[appState.currentQuizQuestion] = index;
                
                // 立即顯示反饋
                showQuestionFeedback(index);
            });
            
            optionsContainer.appendChild(optionElement);
        });
    }
    
    updateQuizProgress();
    updateQuizButtons();
}

function showQuestionFeedback(selectedIndex) {
    const currentQuestion = appState.quiz[appState.currentQuizQuestion];
    const optionsContainer = document.getElementById('quiz-options');
    const explanationElement = document.getElementById('quiz-explanation');
    const explanationText = document.getElementById('explanation-text');
    
    // 標記為已回答
    appState.currentQuestionAnswered = true;
    
    // 禁用所有選項
    const options = optionsContainer.querySelectorAll('.quiz-option');
    options.forEach((option, index) => {
        option.classList.add('disabled');
        
        if (index === currentQuestion.correct) {
            option.classList.add('correct');
        } else if (index === selectedIndex && index !== currentQuestion.correct) {
            option.classList.add('incorrect');
        }
    });
    
    // 顯示解析
    if (explanationElement && explanationText) {
        explanationText.textContent = currentQuestion.explanation;
        explanationElement.classList.remove('hidden');
    }
}

function updateQuizProgress() {
    const elements = {
        'quiz-current': appState.currentQuizQuestion + 1,
        'quiz-total': appState.quiz.length
    };
    
    Object.entries(elements).forEach(([id, value]) => {
        const el = document.getElementById(id);
        if (el) el.textContent = value;
    });
    
    const progressFill = document.getElementById('quiz-progress-fill');
    if (progressFill) {
        const percent = ((appState.currentQuizQuestion + 1) / appState.quiz.length) * 100;
        progressFill.style.width = `${percent}%`;
    }
}

function updateQuizButtons() {
    const prevBtn = document.getElementById('prev-question');
    const nextBtn = document.getElementById('next-question');
    const submitBtn = document.getElementById('submit-quiz');
    
    if (prevBtn) prevBtn.disabled = appState.currentQuizQuestion === 0;
    
    const isLastQuestion = appState.currentQuizQuestion === appState.quiz.length - 1;
    if (nextBtn) nextBtn.classList.toggle('hidden', isLastQuestion);
    if (submitBtn) submitBtn.classList.toggle('hidden', !isLastQuestion);
}

function previousQuestion() {
    if (appState.currentQuizQuestion > 0) {
        appState.currentQuizQuestion--;
        displayQuizQuestion();
        
        // 如果上一題已經回答過，重新顯示反饋
        if (appState.quizAnswers[appState.currentQuizQuestion] !== null) {
            showQuestionFeedback(appState.quizAnswers[appState.currentQuizQuestion]);
        }
    }
}

function nextQuestion() {
    if (appState.currentQuizQuestion < appState.quiz.length - 1) {
        appState.currentQuizQuestion++;
        displayQuizQuestion();
        
        // 如果下一題已經回答過，重新顯示反饋
        if (appState.quizAnswers[appState.currentQuizQuestion] !== null) {
            showQuestionFeedback(appState.quizAnswers[appState.currentQuizQuestion]);
        }
    }
}

function submitQuiz() {
    if (appState.quizTimer) clearInterval(appState.quizTimer);
    
    const totalTime = Date.now() - appState.quizStartTime;
    
    let correctCount = 0;
    appState.quizAnswers.forEach((answer, index) => {
        if (answer === appState.quiz[index].correct) {
            correctCount++;
        }
    });
    
    const score = Math.round((correctCount / appState.quiz.length) * 100);
    
    appState.quizStats.attempts++;
    if (score > appState.quizStats.bestScore) {
        appState.quizStats.bestScore = score;
    }
    
    showQuizResults(score, correctCount, totalTime);
    updateSummaryStats();
}

function showQuizResults(score, correctCount, totalTime) {
    // 切換顯示
    const quizContainer = document.getElementById('quiz-container');
    const quizResults = document.getElementById('quiz-results');
    
    if (quizContainer) quizContainer.classList.add('hidden');
    if (quizResults) quizResults.classList.remove('hidden');
    
    // 更新結果
    const elements = {
        'final-score': score,
        'correct-count': correctCount,
        'wrong-count': appState.quiz.length - correctCount
    };
    
    Object.entries(elements).forEach(([id, value]) => {
        const el = document.getElementById(id);
        if (el) el.textContent = value;
    });
    
    const finalTime = document.getElementById('final-time');
    if (finalTime) {
        const minutes = Math.floor(totalTime / 60000);
        const seconds = Math.floor((totalTime % 60000) / 1000);
        finalTime.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
}

function reviewWrongAnswers() {
    const wrongQuestions = [];
    appState.quizAnswers.forEach((answer, index) => {
        if (answer !== appState.quiz[index].correct) {
            wrongQuestions.push(index);
        }
    });
    
    if (wrongQuestions.length === 0) {
        alert('恭喜！您沒有答錯任何題目！');
        return;
    }
    
    let reviewContent = '錯題回顧：\n\n';
    wrongQuestions.forEach((questionIndex, index) => {
        const question = appState.quiz[questionIndex];
        const userAnswer = appState.quizAnswers[questionIndex];
        
        reviewContent += `${index + 1}. ${question.question}\n`;
        reviewContent += `您的答案: ${userAnswer !== null ? question.options[userAnswer] : '未作答'}\n`;
        reviewContent += `正確答案: ${question.options[question.correct]}\n`;
        reviewContent += `解析: ${question.explanation}\n\n`;
    });
    
    alert(reviewContent);
}

function restartQuiz() {
    // 重置顯示
    const quizResults = document.getElementById('quiz-results');
    const quizStart = document.getElementById('quiz-start');
    
    if (quizResults) quizResults.classList.add('hidden');
    if (quizStart) quizStart.classList.remove('hidden');
    
    // 重置狀態
    appState.currentQuizQuestion = 0;
    appState.quizAnswers = [];
    appState.quizStartTime = null;
    appState.currentQuestionAnswered = false;
    
    if (appState.quizTimer) clearInterval(appState.quizTimer);
}

function updateSummaryStats() {
    const elements = {
        'cards-completed': appState.flashcardProgress.size,
        'quiz-attempts': appState.quizStats.attempts,
        'best-score': `${appState.quizStats.bestScore}%`
    };
    
    Object.entries(elements).forEach(([id, value]) => {
        const el = document.getElementById(id);
        if (el) el.textContent = value;
    });
}
