// 經絡養生互動學習應用程式
class MeridianHealthApp {
    constructor() {
        this.currentSection = 'home';
        this.flashcards = [];
        this.quizQuestions = [];
        this.currentFlashcardIndex = 0;
        this.currentQuizIndex = 0;
        this.flashcardStats = {
            correct: 0,
            incorrect: 0,
            total: 60
        };
        this.quizStats = {
            correct: 0,
            incorrect: 0,
            total: 50,
            startTime: null,
            endTime: null
        };
        this.userAnswers = [];
        this.answeredQuestions = [];
        this.sectionProgress = {
            home: true,
            concepts: false,
            acupoints: false,
            summary: false,
            suggestions: false,
            conclusion: false,
            flashcards: false,
            quiz: false
        };
        
        this.init();
    }

    init() {
        this.loadData();
        this.setupEventListeners();
        this.updateProgress();
        this.showSection('home');
    }

    loadData() {
        // 60題閃卡資料
        this.flashcards = [
            {"question": "什麼是「生命底氣」？", "answer": "一個人內在能量狀態的總和，是面對未知與壓力時的穩定器，決定我們面對挑戰時是從容還是驚慌失措"},
            {"question": "生命底氣的建立始於何時？", "answer": "從胎兒在母體中孕育，到呱呱墜地的那一刻起，生命最初階段對一生的底氣具有決定性重要性"},
            {"question": "為新生兒建立底氣資料庫的黃金時期？", "answer": "三個月內最重要，十二歲以前都還有機會"},
            {"question": "成年人重建底氣的三大方法？", "answer": "1.每日兩分鐘靜心清空內在 2.自我肯定認知價值 3.療癒性觸摸連結心靈"},
            {"question": "新生兒的靈魂與成人有何差異？", "answer": "林老師強調嬰兒靈魂與成人一樣大，會照單全收所有訊息，因此需要用愛的語言歡迎他們"},
            {"question": "潛意識資料庫建置的重要性？", "answer": "決定一生的反應模式和生命底氣，三個月內最關鍵，影響面對挑戰時的內在穩定力"},
            {"question": "如何為新生兒創造正向迎接儀式？", "answer": "用充滿愛的語言：小神通我們歡迎你！全家都歡迎你來到這個世界！絕對避免垃圾話或開玩笑"},
            {"question": "成年人無名病痛的可能根源？", "answer": "檢查正常但不舒服，根源可能在潛意識中，麻醉昏迷時負面話語被照單全收形成負面晶片"},
            {"question": "靜心回歸的目的？", "answer": "清空累積的負面訊息與情緒垃圾，才能為自己裝入更多更好的宇宙能量重新注入活力"},
            {"question": "「我就是禮物」概念的意義？", "answer": "每個生命的存在本身就是對地球最珍貴的禮物，從內心認同自己是禮物時將到處受歡迎"},
            {"question": "療癒性觸摸的核心要點？", "answer": "帶著愛與肯定的意念溫柔撫摸身體，心靈觸動與經絡疏通同步發生"},
            {"question": "避免給嬰兒植入負面晶片的方法？", "answer": "避免在產房談論恐懼話題，用充滿愛與歡迎的語言，絕對不說垃圾話或開玩笑"},
            {"question": "與嬰兒溝通的正確態度？", "answer": "必須認知嬰兒靈魂能完全理解，所有對話都應認真不開玩笑，每句話都會被潛意識吸收"},
            {"question": "生命底氣與金錢財富的關係？", "answer": "生命底氣是最根本重要的資產，價值遠勝過萬貫家財，是永遠用不完的泉源"},
            {"question": "中醫理論中「汗為心之液」的含義？", "answer": "汗水是由心臟搏動、血液轉化而來的珍貴液體，每一次正確排汗都是重要的代謝與淨化"},
            {"question": "流汗的兩大核心功能？", "answer": "1.排出重金屬等深層廢物 2.體現陽氣，陽氣不足則百病叢生"},
            {"question": "皮膚病根本成因？", "answer": "運動後立刻吹冷氣導致汗水被困皮下腠理層，久而久之腐敗發酸，引發皮膚搔癢過敏"},
            {"question": "運動流汗後正確處理方式？", "answer": "耐心等待20-30分鐘讓汗水完全流透，以心跳恢復正常為準"},
            {"question": "如何判斷排汗是否完成？", "answer": "心跳從急促恢復平穩，身體不再冒出運動後熱汗代表排汗已透"},
            {"question": "錯誤流汗的潛在後果？", "answer": "皮膚病、身體異味、肩頸僵硬頭痛因寒氣入侵影響經絡循環"},
            {"question": "為何重金屬主要透過汗液排出？", "answer": "重金屬並非主要從尿液排出，而是必須透過汗珠被帶離身體"},
            {"question": "夏天不流汗的危險信號？", "answer": "體內已極寒狀態，陽氣嚴重不足，陽氣不足則百病叢生"},
            {"question": "運動後不正確降溫的影響？", "answer": "毛孔關閉汗水回不去也出不來，被困皮下腐敗形成濕毒"},
            {"question": "膽固醇真正作用？", "answer": "身體製造骨本的珍貴原料，不是敵人"},
            {"question": "膽固醇過高真正原因？", "answer": "缺乏陽光維生素D3無法轉化膽固醇致累積"},
            {"question": "正確曬太陽時間？", "answer": "夏天正午10-20分鐘，冬天正午30分鐘"},
            {"question": "曬太陽關鍵要點？", "answer": "曝露身體和頭頂百會穴且不可塗防曬乳"},
            {"question": "維生素D3功能？", "answer": "催化膽固醇轉化為骨本並溫養子宮"},
            {"question": "子宮肌瘤成因？", "answer": "未能排淨的血塊，經期飲酒和錯誤進補時機"},
            {"question": "經期禁酒原因？", "answer": "酒精讓子宮無法正常收縮排淨形成血塊"},
            {"question": "四物湯正確服用時機？", "answer": "月經完全乾淨後2-3天才開始"},
            {"question": "溫泉療癒核心原理？", "answer": "無冷氣環境下身體將皮下廢物隨汗水徹底排出"},
            {"question": "溫泉第一回合站立原因？", "answer": "防止手部心臟末梢受熱衝擊心跳過快"},
            {"question": "溫泉循環需重複幾次？", "answer": "至少四次浸泡5-10分鐘+休息10分鐘"},
            {"question": "判斷溫泉排毒完成的方法？", "answer": "汗水由鹹變無味且身體前所未有輕鬆"},
            {"question": "居家泡澡注意事項？", "answer": "保持水溫、延長時間、完後不可立刻吹冷氣"},
            {"question": "骨刺本質？", "answer": "氣血循環不暢形成的乾涸血塊"},
            {"question": "改善骨刺根本方法？", "answer": "恢復循環矯正脊椎刺激疼痛點化解血塊"},
            {"question": "刮頭保健作用？", "answer": "放鬆腦神經促進氣血循環改善頭痛睡眠"},
            {"question": "頭頂百會穴重要性？", "answer": "經絡陽氣匯聚點曬百會補陽最直接"},
            {"question": "經絡養生核心理念？", "answer": "保持身體通暢與溫暖預防百病"},
            {"question": "新生兒期不宜說垃圾話原因？", "answer": "潛意識照單全收形成負面晶片"},
            {"question": "靜心清空內在的方法？", "answer": "每天兩分鐘觀息或冥想釋放情緒垃圾"},
            {"question": "療癒觸摸與經絡關係？", "answer": "帶愛意觸摸同步疏通經絡釋放壓力"},
            {"question": "正午曬太陽為何重點？", "answer": "陽氣最盛能快速合成維生素D3和平衡內分泌"},
            {"question": "經期為何不能早補？", "answer": "早補造成假性充血促成新血塊"},
            {"question": "流汗後吹冷氣的後果？", "answer": "毛孔關閉汗被困皮下形成濕毒"},
            {"question": "陽氣不足的表現？", "answer": "夏天不流汗手腳冰冷疲倦易感冒"},
            {"question": "重金屬排汗指標？", "answer": "汗液鹹味轉淡表示深層排毒完成"},
            {"question": "百病之基石？", "answer": "保持經絡通暢與身體溫暖"},
            {"question": "陽光補D3替代方案？", "answer": "補充5000 IU維生素D3"},
            {"question": "錯誤流汗形同？", "answer": "自我傷害"},
            {"question": "汗水與心臟關係？", "answer": "汗水由心臟搏動推動"},
            {"question": "合谷穴功能口訣？", "answer": "面口合谷收"},
            {"question": "足三里功能口訣？", "answer": "肚腹三里留"},
            {"question": "委中穴功能口訣？", "answer": "腰背問題委中求"},
            {"question": "陽陵泉功能口訣？", "answer": "筋會陽陵泉"},
            {"question": "廉泉穴功能口訣？", "answer": "急救廉泉穴"},
            {"question": "百會穴主要功能？", "answer": "補陽要穴"},
            {"question": "腎俞穴主要功能？", "answer": "溫養腎氣"},
            {"question": "三陰交穴主要功能？", "answer": "婦科要穴"},
            {"question": "經絡養生三大支柱？", "answer": "排汗、補陽、深層淨化"}
        ];

        // 50題測驗題目 (30選擇題 + 20是非題)
        this.quizQuestions = [
            // 選擇題 (30題)
            {"question": "根據林美卿老師的教學，「生命底氣」最重要的特質是什麼？", "options": ["擁有豐富財富", "面對挑戰時的內在穩定力", "身體強壯健康", "社交能力優秀"], "answer": "B", "explanation": "生命底氣是面對未知與壓力時的穩定器，是內在能量狀態的總和"},
            {"question": "合谷穴的功能口訣是？", "options": ["腰背問題委中求", "面口合谷收", "肚腹三里留", "筋會陽陵泉"], "answer": "B", "explanation": "合谷穴對應「面口合谷收」，主要調理頭部、面部、口腔相關問題"},
            {"question": "足三里穴的主要功能是？", "options": ["調理腰背問題", "調理消化系統", "調理呼吸系統", "調理循環系統"], "answer": "B", "explanation": "足三里穴對應「肚腹三里留」，是消化系統的養生大穴"},
            {"question": "委中穴主要調理哪個部位的問題？", "options": ["頭部", "腰背部", "腹部", "四肢"], "answer": "B", "explanation": "委中穴對應「腰背問題委中求」，專門處理腰背部的緊繃酸痛"},
            {"question": "廉泉穴的主要用途是？", "options": ["日常保健", "美容養顏", "緊急自救", "增強免疫"], "answer": "C", "explanation": "廉泉穴是「急救廉泉穴」，用於暈車、噁心等緊急狀況的自救"},
            {"question": "孕婦在使用穴位按摩時需要特別注意哪個穴位？", "options": ["足三里", "合谷穴", "委中穴", "陽陵泉"], "answer": "B", "explanation": "合谷穴在孕婦未滿38週時禁用，因為可能引起子宮收縮"},
            {"question": "建立新生兒潛意識資料庫的最佳時期是？", "options": ["出生後一年內", "出生後三個月內", "出生後六個月內", "出生後兩年內"], "answer": "B", "explanation": "三個月內最重要，十二歲以前都還有機會建立"},
            {"question": "陽陵泉穴的功能口訣是？", "options": ["面口合谷收", "肚腹三里留", "筋會陽陵泉", "腰背委中求"], "answer": "C", "explanation": "陽陵泉穴對應「筋會陽陵泉」，專門處理筋絡問題"},
            {"question": "按摩足三里穴的最佳時機是？", "options": ["睡前", "飯後", "飯前", "隨時"], "answer": "C", "explanation": "飯前敲打足三里100下，可以促進消化和生長發育"},
            {"question": "正確曬太陽的時間是？", "options": ["早上6-8點", "正午10-20分鐘", "下午4-6點", "傍晚6-8點"], "answer": "B", "explanation": "夏天正午10-20分鐘，冬天正午30分鐘，陽氣最盛時段"},
            {"question": "運動後正確的處理方式是？", "options": ["立即沖冷水", "立即吹冷氣", "耐心等待20-30分鐘", "立即喝冰水"], "answer": "C", "explanation": "耐心等待20-30分鐘讓汗水完全流透，以心跳恢復正常為準"},
            {"question": "溫泉療癒需要重複幾次循環？", "options": ["兩次", "三次", "至少四次", "五次以上"], "answer": "C", "explanation": "至少四次浸泡5-10分鐘+休息10分鐘的完整循環"},
            {"question": "判斷溫泉排毒完成的指標是？", "options": ["身體發熱", "大量出汗", "汗水由鹹變無味", "感覺疲倦"], "answer": "C", "explanation": "汗水由鹹變無味且身體前所未有輕鬆表示排毒完成"},
            {"question": "膽固醇過高的真正原因是？", "options": ["吃太多油膩食物", "缺乏運動", "缺乏維生素D3", "遺傳因素"], "answer": "C", "explanation": "缺乏陽光維生素D3無法轉化膽固醇導致累積"},
            {"question": "經期禁酒的原因是？", "options": ["影響睡眠", "傷害肝臟", "讓子宮無法正常收縮", "影響消化"], "answer": "C", "explanation": "酒精讓子宮無法正常收縮排淨形成血塊"},
            {"question": "四物湯的正確服用時機是？", "options": ["月經期間", "月經前一週", "月經後2-3天", "隨時可服"], "answer": "C", "explanation": "月經完全乾淨後2-3天才開始服用"},
            {"question": "百會穴的主要功能是？", "options": ["治療頭痛", "補陽氣", "調理腸胃", "美容養顏"], "answer": "B", "explanation": "百會穴是經絡陽氣匯聚點，曬百會穴補陽最直接"},
            {"question": "腎俞穴的主要作用是？", "options": ["治療腰痛", "溫養腎氣", "調理脾胃", "安神助眠"], "answer": "B", "explanation": "腎俞穴主要功能是溫補腎氣，強壯腰膝，提升生命活力"},
            {"question": "三陰交穴被稱為什麼？", "options": ["養生大穴", "婦科要穴", "急救要穴", "美容要穴"], "answer": "B", "explanation": "三陰交是婦科調理要穴，能調節內分泌，延緩衰老"},
            {"question": "夏天不流汗代表什麼？", "options": ["身體健康", "體內極寒狀態", "新陳代謝好", "皮膚光滑"], "answer": "B", "explanation": "夏天不流汗是體內已極寒狀態，陽氣嚴重不足的危險信號"},
            {"question": "重金屬主要透過什麼排出？", "options": ["尿液", "糞便", "汗液", "呼吸"], "answer": "C", "explanation": "重金屬並非主要從尿液排出，而是必須透過汗珠被帶離身體"},
            {"question": "靜心的主要目的是？", "options": ["放鬆身體", "清空負面訊息", "提高專注", "改善睡眠"], "answer": "B", "explanation": "靜心是為了清空累積的負面訊息與情緒垃圾，重新注入正面能量"},
            {"question": "療癒觸摸的核心要點是？", "options": ["用力按壓", "帶著愛意", "快速按摩", "長時間刺激"], "answer": "B", "explanation": "帶著愛與肯定的意念溫柔撫摸身體，心靈觸動與經絡疏通同步發生"},
            {"question": "經絡養生的三大支柱不包括？", "options": ["排汗", "補陽", "深層淨化", "劇烈運動"], "answer": "D", "explanation": "經絡養生三大支柱是排汗、補陽、深層淨化"},
            {"question": "皮膚病的根本成因是？", "options": ["細菌感染", "病毒感染", "汗水被困皮下", "過敏反應"], "answer": "C", "explanation": "運動後立刻吹冷氣導致汗水被困皮下腠理層，久而久之腐敗發酸"},
            {"question": "骨刺的本質是什麼？", "options": ["骨骼增生", "乾涸血塊", "軟組織發炎", "神經壓迫"], "answer": "B", "explanation": "骨刺本質是氣血循環不暢形成的乾涸血塊"},
            {"question": "子宮肌瘤的成因是？", "options": ["荷爾蒙失調", "遺傳因素", "未排淨的血塊", "營養不良"], "answer": "C", "explanation": "子宮肌瘤成因是未能排淨的血塊，與經期飲酒和錯誤進補時機相關"},
            {"question": "曬太陽時不可以做什麼？", "options": ["戴帽子", "塗防曬乳", "穿長袖", "戴眼鏡"], "answer": "B", "explanation": "曬太陽時絕對不可塗防曬乳，會阻礙維生素D3的自然合成"},
            {"question": "維生素D3的主要功能是？", "options": ["增強免疫", "催化膽固醇轉化", "促進消化", "改善睡眠"], "answer": "B", "explanation": "維生素D3催化膽固醇轉化為骨本並溫養子宮"},
            {"question": "成年人重建底氣不包括哪種方法？", "options": ["靜心", "自我肯定", "療癒觸摸", "劇烈運動"], "answer": "D", "explanation": "成年人重建底氣的三大方法是：每日靜心、自我肯定、療癒觸摸"},
            
            // 是非題 (20題)
            {"question": "汗水是由心臟搏動推動的珍貴液體", "options": ["正確", "錯誤"], "answer": "A", "explanation": "正確。中醫理論中「汗為心之液」，汗水是由心臟搏動、血液轉化而來"},
            {"question": "孕婦可以隨時按摩合谷穴", "options": ["正確", "錯誤"], "answer": "B", "explanation": "錯誤。合谷穴在孕婦未滿38週時禁用，因為可能引起子宮收縮"},
            {"question": "運動後立即吹冷氣有助於健康", "options": ["正確", "錯誤"], "answer": "B", "explanation": "錯誤。運動後立即吹冷氣會導致汗水被困皮下，形成濕毒引發皮膚病"},
            {"question": "新生兒的靈魂與成人一樣大", "options": ["正確", "錯誤"], "answer": "A", "explanation": "正確。林老師強調嬰兒靈魂與成人一樣大，會照單全收所有訊息"},
            {"question": "膽固醇是身體的敵人需要消除", "options": ["正確", "錯誤"], "answer": "B", "explanation": "錯誤。膽固醇是身體製造骨本的珍貴原料，不是敵人"},
            {"question": "溫泉療癒需要在有冷氣的環境進行", "options": ["正確", "錯誤"], "answer": "B", "explanation": "錯誤。溫泉療癒核心原理是無冷氣環境下身體將皮下廢物隨汗水徹底排出"},
            {"question": "廉泉穴可用於暈車時的緊急自救", "options": ["正確", "錯誤"], "answer": "A", "explanation": "正確。廉泉穴是急救廉泉穴，暈車、噁心、不適時抓捏30下可迅速緩解"},
            {"question": "足三里穴應該在飯後按摩", "options": ["正確", "錯誤"], "answer": "B", "explanation": "錯誤。足三里穴應該飯前敲打100下，可以促進消化和生長發育"},
            {"question": "經期可以適量飲酒", "options": ["正確", "錯誤"], "answer": "B", "explanation": "錯誤。經期禁酒，因為酒精讓子宮無法正常收縮排淨形成血塊"},
            {"question": "陽光維生素D3可以在任何時間曝曬獲得", "options": ["正確", "錯誤"], "answer": "B", "explanation": "錯誤。正確曬太陽時間是夏天正午10-20分鐘，冬天正午30分鐘"},
            {"question": "重金屬主要透過尿液排出體外", "options": ["正確", "錯誤"], "answer": "B", "explanation": "錯誤。重金屬並非主要從尿液排出，而是必須透過汗珠被帶離身體"},
            {"question": "生命底氣比金錢財富更重要", "options": ["正確", "錯誤"], "answer": "A", "explanation": "正確。生命底氣是最根本重要的資產，價值遠勝過萬貫家財"},
            {"question": "四物湯可以在月經期間服用", "options": ["正確", "錯誤"], "answer": "B", "explanation": "錯誤。四物湯需要月經完全乾淨後2-3天才開始服用"},
            {"question": "百會穴是陽氣匯聚點", "options": ["正確", "錯誤"], "answer": "A", "explanation": "正確。百會穴是經絡陽氣匯聚點，曬百會穴補陽最直接"},
            {"question": "夏天不流汗代表身體很健康", "options": ["正確", "錯誤"], "answer": "B", "explanation": "錯誤。夏天不流汗是體內已極寒狀態，陽氣嚴重不足的危險信號"},
            {"question": "每天兩分鐘靜心有助於重建生命底氣", "options": ["正確", "錯誤"], "answer": "A", "explanation": "正確。每日兩分鐘靜心清空內在是成年人重建底氣的方法之一"},
            {"question": "骨刺是骨骼正常的生理現象", "options": ["正確", "錯誤"], "answer": "B", "explanation": "錯誤。骨刺本質是氣血循環不暢形成的乾涸血塊"},
            {"question": "與新生兒說話可以開玩笑", "options": ["正確", "錯誤"], "answer": "B", "explanation": "錯誤。與嬰兒溝通必須認真不開玩笑，每句話都會被潛意識吸收"},
            {"question": "療癒觸摸需要帶著愛的意念", "options": ["正確", "錯誤"], "answer": "A", "explanation": "正確。帶著愛與肯定的意念溫柔撫摸身體，心靈觸動與經絡疏通同步發生"},
            {"question": "經絡養生的目標是保持身體通暢與溫暖", "options": ["正確", "錯誤"], "answer": "A", "explanation": "正確。經絡養生核心理念是保持身體通暢與溫暖預防百病"}
        ];

        this.flashcardStats.total = this.flashcards.length;
        this.quizStats.total = this.quizQuestions.length;
    }

    setupEventListeners() {
        // 導航連結事件
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('nav-link')) {
                e.preventDefault();
                const section = e.target.getAttribute('data-section');
                if (section) {
                    this.showSection(section);
                }
            }
        });

        // 閃卡相關事件
        this.addEventListenerSafe('flashcard', 'click', (e) => {
            e.stopPropagation();
            this.flipFlashcard();
        });
        
        this.addEventListenerSafe('prev-flashcard', 'click', () => this.previousFlashcard());
        this.addEventListenerSafe('next-flashcard', 'click', () => this.nextFlashcard());
        this.addEventListenerSafe('shuffle-flashcards', 'click', () => this.shuffleFlashcards());
        this.addEventListenerSafe('reset-flashcards', 'click', () => this.resetFlashcards());
        this.addEventListenerSafe('mark-correct', 'click', () => this.markFlashcard(true));
        this.addEventListenerSafe('mark-incorrect', 'click', () => this.markFlashcard(false));

        // 測驗相關事件
        this.addEventListenerSafe('start-quiz', 'click', () => this.startQuiz());
        this.addEventListenerSafe('prev-question', 'click', () => this.previousQuestion());
        this.addEventListenerSafe('next-question', 'click', () => this.nextQuestion());
        this.addEventListenerSafe('review-answers', 'click', () => this.reviewAnswers());
        this.addEventListenerSafe('retake-quiz', 'click', () => this.retakeQuiz());
        this.addEventListenerSafe('back-to-result', 'click', () => this.backToResult());

        // 鍵盤快捷鍵
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
    }

    addEventListenerSafe(elementId, event, handler) {
        const element = document.getElementById(elementId);
        if (element) {
            element.addEventListener(event, handler);
        }
    }

    showSection(sectionId) {
        // 隱藏所有區塊
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });
        
        // 更新導航連結狀態
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        
        // 顯示目標區塊
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
            this.currentSection = sectionId;
            
            // 更新對應導航連結
            const activeLink = document.querySelector(`[data-section="${sectionId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
            
            // 標記為已閱讀
            this.sectionProgress[sectionId] = true;
            this.updateProgress();
            
            // 特殊處理
            if (sectionId === 'flashcards') {
                setTimeout(() => this.initializeFlashcards(), 100);
            }
        }
        
        // 滾動到頂部
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    updateProgress() {
        const totalSections = Object.keys(this.sectionProgress).length;
        const completedSections = Object.values(this.sectionProgress).filter(Boolean).length;
        const percentage = Math.round((completedSections / totalSections) * 100);
        
        const progressPercentage = document.getElementById('progress-percentage');
        const progressFill = document.getElementById('progress-fill');
        
        if (progressPercentage) {
            progressPercentage.textContent = `${percentage}%`;
        }
        if (progressFill) {
            progressFill.style.width = `${percentage}%`;
        }
    }

    // 閃卡功能
    initializeFlashcards() {
        if (this.flashcards.length > 0) {
            this.resetFlashcards();
        }
    }

    updateFlashcardDisplay() {
        if (this.flashcards.length === 0) return;
        
        const flashcard = document.getElementById('flashcard');
        if (!flashcard) return;
        
        const currentCard = this.flashcards[this.currentFlashcardIndex];
        
        // 更新卡片內容
        const cardNumbers = document.querySelectorAll('.card-number');
        cardNumbers.forEach(el => {
            el.textContent = `${this.currentFlashcardIndex + 1}/${this.flashcards.length}`;
        });
        
        const questionEl = document.querySelector('.card-question');
        const answerEl = document.querySelector('.card-answer');
        
        if (questionEl) questionEl.textContent = currentCard.question;
        if (answerEl) answerEl.textContent = currentCard.answer;
        
        // 重置翻轉狀態
        flashcard.classList.remove('flipped');
        
        // 更新統計
        this.updateFlashcardStats();
    }

    updateFlashcardStats() {
        const progressText = `${this.currentFlashcardIndex + 1}/${this.flashcards.length}`;
        const progressEl = document.getElementById('flashcard-progress');
        if (progressEl) {
            progressEl.textContent = progressText;
        }
        
        const total = this.flashcardStats.correct + this.flashcardStats.incorrect;
        const accuracy = total > 0 ? Math.round((this.flashcardStats.correct / total) * 100) : 0;
        const accuracyEl = document.getElementById('flashcard-accuracy');
        if (accuracyEl) {
            accuracyEl.textContent = `${accuracy}%`;
        }
    }

    flipFlashcard() {
        const flashcard = document.getElementById('flashcard');
        if (flashcard) {
            flashcard.classList.toggle('flipped');
        }
    }

    nextFlashcard() {
        if (this.currentFlashcardIndex < this.flashcards.length - 1) {
            this.currentFlashcardIndex++;
            this.updateFlashcardDisplay();
        }
    }

    previousFlashcard() {
        if (this.currentFlashcardIndex > 0) {
            this.currentFlashcardIndex--;
            this.updateFlashcardDisplay();
        }
    }

    markFlashcard(isCorrect) {
        if (isCorrect) {
            this.flashcardStats.correct++;
        } else {
            this.flashcardStats.incorrect++;
        }
        this.updateFlashcardStats();
        
        // 標記閃卡學習完成
        if (!this.sectionProgress.flashcards) {
            this.sectionProgress.flashcards = true;
            this.updateProgress();
        }
        
        // 自動跳到下一張
        setTimeout(() => {
            this.nextFlashcard();
        }, 500);
    }

    shuffleFlashcards() {
        for (let i = this.flashcards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.flashcards[i], this.flashcards[j]] = [this.flashcards[j], this.flashcards[i]];
        }
        this.currentFlashcardIndex = 0;
        this.updateFlashcardDisplay();
    }

    resetFlashcards() {
        this.currentFlashcardIndex = 0;
        this.flashcardStats = { correct: 0, incorrect: 0, total: this.flashcards.length };
        this.updateFlashcardDisplay();
    }

    // 測驗功能
    startQuiz() {
        this.quizStats = {
            correct: 0,
            incorrect: 0,
            total: this.quizQuestions.length,
            startTime: new Date(),
            endTime: null
        };
        this.userAnswers = new Array(this.quizQuestions.length).fill(null);
        this.answeredQuestions = new Array(this.quizQuestions.length).fill(false);
        this.currentQuizIndex = 0;
        
        const startEl = document.getElementById('quiz-start');
        const questionEl = document.getElementById('quiz-question');
        
        if (startEl) startEl.classList.add('hidden');
        if (questionEl) questionEl.classList.remove('hidden');
        
        this.updateQuizDisplay();
        this.startQuizTimer();
    }

    updateQuizDisplay() {
        if (this.quizQuestions.length === 0) return;
        
        const currentQuestion = this.quizQuestions[this.currentQuizIndex];
        
        const currentQuestionEl = document.getElementById('current-question');
        const totalQuestionsEl = document.getElementById('total-questions');
        const questionTextEl = document.getElementById('question-text');
        
        if (currentQuestionEl) currentQuestionEl.textContent = this.currentQuizIndex + 1;
        if (totalQuestionsEl) totalQuestionsEl.textContent = this.quizQuestions.length;
        if (questionTextEl) questionTextEl.textContent = currentQuestion.question;
        
        const optionsContainer = document.getElementById('answer-options');
        const feedbackEl = document.getElementById('question-feedback');
        
        if (optionsContainer) {
            optionsContainer.innerHTML = '';
            
            currentQuestion.options.forEach((option, index) => {
                const optionEl = document.createElement('div');
                optionEl.className = 'answer-option';
                optionEl.textContent = option;
                
                const answerLetter = String.fromCharCode(65 + index);
                optionEl.onclick = () => this.selectAnswer(answerLetter);
                
                if (this.userAnswers[this.currentQuizIndex] === answerLetter) {
                    optionEl.classList.add('selected');
                }
                
                // 如果已經回答過，顯示正確/錯誤狀態
                if (this.answeredQuestions[this.currentQuizIndex]) {
                    optionEl.style.pointerEvents = 'none';
                    if (answerLetter === currentQuestion.answer) {
                        optionEl.classList.add('correct');
                    } else if (answerLetter === this.userAnswers[this.currentQuizIndex]) {
                        optionEl.classList.add('incorrect');
                    }
                }
                
                optionsContainer.appendChild(optionEl);
            });
        }
        
        // 顯示/隱藏反饋
        if (feedbackEl && this.answeredQuestions[this.currentQuizIndex]) {
            feedbackEl.classList.remove('hidden');
            const isCorrect = this.userAnswers[this.currentQuizIndex] === currentQuestion.answer;
            
            const resultEl = feedbackEl.querySelector('.feedback-result');
            const explanationEl = feedbackEl.querySelector('.feedback-explanation');
            
            if (resultEl) {
                resultEl.textContent = isCorrect ? '✅ 正確！' : '❌ 錯誤';
                resultEl.className = `feedback-result ${isCorrect ? 'correct' : 'incorrect'}`;
            }
            
            if (explanationEl) {
                explanationEl.textContent = currentQuestion.explanation;
            }
        } else if (feedbackEl) {
            feedbackEl.classList.add('hidden');
        }
        
        // 更新按鈕狀態
        const prevBtn = document.getElementById('prev-question');
        const nextBtn = document.getElementById('next-question');
        
        if (prevBtn) prevBtn.disabled = this.currentQuizIndex === 0;
        if (nextBtn) {
            nextBtn.textContent = this.currentQuizIndex === this.quizQuestions.length - 1 ? '完成測驗' : '下一題';
        }
    }

    selectAnswer(answer) {
        if (this.answeredQuestions[this.currentQuizIndex]) return; // 已經回答過
        
        this.userAnswers[this.currentQuizIndex] = answer;
        this.answeredQuestions[this.currentQuizIndex] = true;
        
        // 立即更新顯示以顯示反饋
        this.updateQuizDisplay();
    }

    nextQuestion() {
        if (this.currentQuizIndex < this.quizQuestions.length - 1) {
            this.currentQuizIndex++;
            this.updateQuizDisplay();
        } else {
            this.finishQuiz();
        }
    }

    previousQuestion() {
        if (this.currentQuizIndex > 0) {
            this.currentQuizIndex--;
            this.updateQuizDisplay();
        }
    }

    finishQuiz() {
        this.quizStats.endTime = new Date();
        
        // 計算分數
        this.userAnswers.forEach((answer, index) => {
            if (answer === this.quizQuestions[index].answer) {
                this.quizStats.correct++;
            } else {
                this.quizStats.incorrect++;
            }
        });
        
        // 顯示結果
        const questionEl = document.getElementById('quiz-question');
        const resultEl = document.getElementById('quiz-result');
        const reviewEl = document.getElementById('answer-review');
        
        if (questionEl) questionEl.classList.add('hidden');
        if (resultEl) resultEl.classList.remove('hidden');
        if (reviewEl) reviewEl.classList.add('hidden');
        
        const score = Math.round((this.quizStats.correct / this.quizStats.total) * 100);
        const scoreEl = document.getElementById('final-score');
        const correctEl = document.getElementById('correct-answers');
        const incorrectEl = document.getElementById('incorrect-answers');
        const accuracyEl = document.getElementById('accuracy-rate');
        
        if (scoreEl) scoreEl.textContent = score;
        if (correctEl) correctEl.textContent = this.quizStats.correct;
        if (incorrectEl) incorrectEl.textContent = this.quizStats.incorrect;
        if (accuracyEl) accuracyEl.textContent = `${score}%`;
        
        const duration = Math.round((this.quizStats.endTime - this.quizStats.startTime) / 1000);
        const minutes = Math.floor(duration / 60);
        const seconds = duration % 60;
        const timeEl = document.getElementById('total-time');
        if (timeEl) {
            timeEl.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
        
        // 標記測驗完成
        this.sectionProgress.quiz = true;
        this.updateProgress();
        
        // 清理計時器
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
        }
    }

    startQuizTimer() {
        const startTime = this.quizStats.startTime;
        const timerElement = document.getElementById('quiz-time');
        
        const updateTimer = () => {
            if (this.quizStats.endTime) return;
            
            const now = new Date();
            const elapsed = Math.round((now - startTime) / 1000);
            const minutes = Math.floor(elapsed / 60);
            const seconds = elapsed % 60;
            if (timerElement) {
                timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            }
        };
        
        updateTimer();
        this.timerInterval = setInterval(updateTimer, 1000);
    }

    reviewAnswers() {
        const resultEl = document.querySelector('.result-summary');
        const reviewEl = document.getElementById('answer-review');
        const reviewListEl = document.getElementById('review-list');
        
        if (resultEl) resultEl.classList.add('hidden');
        if (reviewEl) reviewEl.classList.remove('hidden');
        
        if (reviewListEl) {
            let reviewHTML = '';
            this.quizQuestions.forEach((q, index) => {
                const userAnswer = this.userAnswers[index] || '未作答';
                const isCorrect = userAnswer === q.answer;
                const userAnswerText = userAnswer !== '未作答' ? q.options[userAnswer.charCodeAt(0) - 65] : '未作答';
                const correctAnswerText = q.options[q.answer.charCodeAt(0) - 65];
                
                reviewHTML += `
                    <div class="review-item ${isCorrect ? 'correct' : 'incorrect'}">
                        <div class="review-question">第${index + 1}題: ${q.question}</div>
                        <div class="review-answer user-answer">您的答案: ${userAnswer}. ${userAnswerText}</div>
                        <div class="review-answer correct-answer">正確答案: ${q.answer}. ${correctAnswerText}</div>
                        <div class="review-answer">${q.explanation}</div>
                    </div>
                `;
            });
            reviewListEl.innerHTML = reviewHTML;
        }
    }

    backToResult() {
        const resultEl = document.querySelector('.result-summary');
        const reviewEl = document.getElementById('answer-review');
        
        if (resultEl) resultEl.classList.remove('hidden');
        if (reviewEl) reviewEl.classList.add('hidden');
    }

    retakeQuiz() {
        const resultEl = document.getElementById('quiz-result');
        const startEl = document.getElementById('quiz-start');
        
        if (resultEl) resultEl.classList.add('hidden');
        if (startEl) startEl.classList.remove('hidden');
        
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
        }
    }

    // 鍵盤快捷鍵
    handleKeyboard(e) {
        if (this.currentSection === 'flashcards') {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                this.previousFlashcard();
            }
            if (e.key === 'ArrowRight') {
                e.preventDefault();
                this.nextFlashcard();
            }
            if (e.key === ' ') {
                e.preventDefault();
                this.flipFlashcard();
            }
        }
        
        if (this.currentSection === 'quiz') {
            if (e.key >= '1' && e.key <= '4') {
                const optionIndex = parseInt(e.key) - 1;
                const answerLetter = String.fromCharCode(65 + optionIndex);
                this.selectAnswer(answerLetter);
            }
        }
    }
}

// 啟動應用程式
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new MeridianHealthApp();
});