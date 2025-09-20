// 應用程式主要邏輯
class MeridianLearningApp {
    constructor() {
        this.currentSection = 'home';
        this.flashcards = [];
        this.quizQuestions = [];
        this.currentFlashcardIndex = 0;
        this.currentQuizIndex = 0;
        this.currentQuizAnswered = false; // 新增：追蹤當前題目是否已回答
        this.flashcardStats = {
            correct: 0,
            incorrect: 0,
            total: 0
        };
        this.quizStats = {
            correct: 0,
            incorrect: 0,
            total: 0,
            startTime: null,
            endTime: null
        };
        this.userAnswers = [];
        this.answeredQuestions = []; // 新增：追蹤已回答的題目
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
        this.setupEventListeners();
        this.loadFlashcards();
        this.loadQuizQuestions();
        this.updateProgress();
        this.showSection('home');
    }

    setupEventListeners() {
        // 導航連結 - 使用事件委託
        document.addEventListener('click', (e) => {
            // 導航按鈕
            if (e.target.classList.contains('nav-link')) {
                e.preventDefault();
                const section = e.target.getAttribute('data-section');
                if (section) {
                    this.showSection(section);
                }
            }
        });

        // 閃卡控制
        const flashcard = document.getElementById('flashcard');
        if (flashcard) {
            flashcard.addEventListener('click', (e) => {
                e.stopPropagation();
                this.flipFlashcard();
            });
        }

        // 閃卡按鈕事件
        this.addEventListenerSafe('prev-flashcard', 'click', () => this.previousFlashcard());
        this.addEventListenerSafe('next-flashcard', 'click', () => this.nextFlashcard());
        this.addEventListenerSafe('shuffle-flashcards', 'click', () => this.shuffleFlashcards());
        this.addEventListenerSafe('reset-flashcards', 'click', () => this.resetFlashcards());
        this.addEventListenerSafe('mark-correct', 'click', () => this.markFlashcard(true));
        this.addEventListenerSafe('mark-incorrect', 'click', () => this.markFlashcard(false));

        // 測驗控制
        this.addEventListenerSafe('start-quiz', 'click', () => this.startQuiz());
        this.addEventListenerSafe('prev-question', 'click', () => this.previousQuestion());
        this.addEventListenerSafe('next-question', 'click', () => this.nextQuestion());
        this.addEventListenerSafe('review-answers', 'click', () => this.reviewAnswers());
        this.addEventListenerSafe('retake-quiz', 'click', () => this.retakeQuiz());

        // 浮動按鈕
        this.addEventListenerSafe('search-fab', 'click', () => this.toggleSearch());
        this.addEventListenerSafe('bookmark-fab', 'click', () => this.toggleBookmarks());
        this.addEventListenerSafe('progress-fab', 'click', () => this.showProgressDetail());

        // 搜索功能
        this.addEventListenerSafe('search-close', 'click', () => this.closeSearch());
        this.addEventListenerSafe('search-input', 'input', (e) => this.handleSearch(e.target.value));

        // 搜索覆蓋層點擊關閉
        this.addEventListenerSafe('search-overlay', 'click', (e) => {
            if (e.target.id === 'search-overlay') {
                this.closeSearch();
            }
        });

        // 鍵盤快捷鍵
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
    }

    addEventListenerSafe(elementId, event, handler) {
        const element = document.getElementById(elementId);
        if (element) {
            element.addEventListener(event, handler);
        }
    }

    async loadFlashcards() {
        // 使用預設資料
        this.flashcards = this.getDefaultFlashcards();
        this.flashcardStats.total = this.flashcards.length;
        this.updateFlashcardDisplay();
    }

    async loadQuizQuestions() {
        // 使用預設資料
        this.quizQuestions = this.getDefaultQuizQuestions();
        this.quizStats.total = this.quizQuestions.length;
        this.updateQuizTotalDisplay();
    }

    getDefaultFlashcards() {
        return [
            {
                question: "什麼是「生命底氣」？",
                answer: "一個人內在能量狀態的總和，是面對未知與壓力時的穩定器，決定我們面對挑戰時是從容還是驚慌失措"
            },
            {
                question: "生命底氣的建立始於何時？",
                answer: "從胎兒在母體中孕育，到呱呱墜地的那一刻起，生命最初階段對一生的底氣具有決定性重要性"
            },
            {
                question: "為新生兒建立底氣資料庫的黃金時期？",
                answer: "三個月內最重要，十二歲以前都還有機會"
            },
            {
                question: "產後護理的核心觀念是什麼？",
                answer: "理解生產是全身206塊骨頭都開了，不僅僅是骨盆，此時身體極度脆弱需要完整休養"
            },
            {
                question: "成年人重建底氣的三大方法？",
                answer: "1.每日兩分鐘靜心清空內在 2.自我肯定認知價值 3.療癒性觸摸連結心靈"
            },
            {
                question: "合谷穴的主要功能口訣？",
                answer: "面口合谷收 - 調理頭部、面部、口腔相關問題"
            },
            {
                question: "合谷穴的正確按摩方法？",
                answer: "用大拇指扣進去朝骨頭深處垂直按壓，帶一點旋轉揉動感覺"
            },
            {
                question: "足三里穴的功能口訣？",
                answer: "肚腹三里留 - 全方位調理消化系統的養生大穴"
            },
            {
                question: "委中穴的功能口訣？",
                answer: "腰背問題委中求 - 處理腰部和背部緊繃酸痛問題"
            },
            {
                question: "廉泉穴的緊急應用？",
                answer: "位於喉結上方凹陷處，暈車噁心不適時用手抓捏約30下可迅速緩解"
            }
        ];
    }

    getDefaultQuizQuestions() {
        return [
            {
                question: "根據林美卿老師的教學，「生命底氣」最重要的特質是什麼？",
                type: "multiple",
                options: ["A. 擁有豐富財富", "B. 面對挑戰時的內在穩定力", "C. 身體強壯健康", "D. 社交能力優秀"],
                answer: "B",
                explanation: "生命底氣是面對未知與壓力時的穩定器，是內在能量狀態的總和"
            },
            {
                question: "合谷穴的功能口訣是？",
                type: "multiple",
                options: ["A. 腰背問題委中求", "B. 面口合谷收", "C. 肚腹三里留", "D. 筋會陽陵泉"],
                answer: "B",
                explanation: "合谷穴對應「面口合谷收」，主要調理頭部、面部、口腔相關問題"
            },
            {
                question: "足三里穴最適合的使用時機是？",
                type: "multiple",
                options: ["A. 飯後立即", "B. 飯前", "C. 睡前", "D. 運動後"],
                answer: "B",
                explanation: "建議在每天飯前敲打雙腿足三里各100下，提升消化吸收能力"
            },
            {
                question: "孕婦使用合谷穴的注意事項？",
                type: "multiple",
                options: ["A. 隨時可用", "B. 只能輕按", "C. 未滿38週禁用，足月後可助順產", "D. 完全禁用"],
                answer: "C",
                explanation: "懷孕未滿38週絕對不可按壓，38週後臨盆時按壓則能幫助順產"
            },
            {
                question: "委中穴主要處理什麼問題？",
                type: "multiple",
                options: ["A. 消化不良", "B. 腰背問題", "C. 頭痛", "D. 失眠"],
                answer: "B",
                explanation: "委中穴對應「腰背問題委中求」，是處理腰背問題的關鍵穴位"
            },
            {
                question: "新生兒的靈魂與成人一樣大，能完全理解周遭對話。",
                type: "truefalse",
                options: ["正確", "錯誤"],
                answer: "正確",
                explanation: "林老師強調嬰兒靈魂與我們一樣大，會照單全收所有訊息"
            },
            {
                question: "生命底氣只能在童年時期建立，成年後無法改變。",
                type: "truefalse",
                options: ["正確", "錯誤"],
                answer: "錯誤",
                explanation: "成年人透過覺察練習可以療癒舊傷，重建內在力量"
            },
            {
                question: "合谷穴可以隨時按壓，對任何人都安全。",
                type: "truefalse",
                options: ["正確", "錯誤"],
                answer: "錯誤",
                explanation: "懷孕未滿38週的孕婦絕對不可按壓合谷穴"
            },
            {
                question: "足三里穴被稱為長壽穴，適合飯後立即使用。",
                type: "truefalse",
                options: ["正確", "錯誤"],
                answer: "錯誤",
                explanation: "足三里穴應在飯前使用，每次飯前敲打100下"
            },
            {
                question: "委中穴位於膝蓋後方，主要用拍打方式刺激。",
                type: "truefalse",
                options: ["正確", "錯誤"],
                answer: "正確",
                explanation: "委中穴位於膝蓋後方正中，最直接有效的方法就是拍打"
            }
        ];
    }

    showSection(sectionId) {
        console.log('Switching to section:', sectionId); // Debug log

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

    initializeFlashcards() {
        if (this.flashcards.length > 0) {
            this.resetFlashcards();
        }
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
        console.log('Starting quiz...'); // Debug log
        
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
        this.currentQuizAnswered = false;
        
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
        
        // 更新當前題目回答狀態
        this.currentQuizAnswered = this.answeredQuestions[this.currentQuizIndex];
        
        const optionsContainer = document.getElementById('answer-options');
        if (optionsContainer) {
            optionsContainer.innerHTML = '';
            
            currentQuestion.options.forEach((option, index) => {
                const optionEl = document.createElement('div');
                optionEl.className = 'answer-option';
                optionEl.textContent = option;
                
                // 根據題目類型決定選項值
                let optionValue;
                if (currentQuestion.type === 'truefalse') {
                    optionValue = option; // 對是非題，直接使用選項文字
                } else {
                    optionValue = String.fromCharCode(65 + index); // 對選擇題，使用 A, B, C, D
                }
                
                // 如果已經回答過，禁用選項並顯示狀態
                if (this.currentQuizAnswered) {
                    optionEl.classList.add('disabled');
                    
                    if (optionValue === currentQuestion.answer) {
                        optionEl.classList.add('correct');
                    }
                    
                    if (this.userAnswers[this.currentQuizIndex] === optionValue && optionValue !== currentQuestion.answer) {
                        optionEl.classList.add('incorrect');
                    }
                    
                    if (this.userAnswers[this.currentQuizIndex] === optionValue) {
                        optionEl.classList.add('selected');
                    }
                } else {
                    // 未回答時可以點擊
                    optionEl.onclick = () => this.selectAnswer(optionValue);
                    
                    if (this.userAnswers[this.currentQuizIndex] === optionValue) {
                        optionEl.classList.add('selected');
                    }
                }
                
                optionsContainer.appendChild(optionEl);
            });
        }
        
        // 顯示或隱藏反饋
        if (this.currentQuizAnswered) {
            this.showQuizFeedback();
        } else {
            this.hideQuizFeedback();
        }
        
        // 更新按鈕狀態
        const prevBtn = document.getElementById('prev-question');
        const nextBtn = document.getElementById('next-question');
        
        if (prevBtn) prevBtn.disabled = this.currentQuizIndex === 0;
        if (nextBtn) {
            nextBtn.textContent = this.currentQuizIndex === this.quizQuestions.length - 1 ? '完成測驗' : '下一題';
        }
    }

    updateQuizTotalDisplay() {
        const totalElements = document.querySelectorAll('#total-questions');
        totalElements.forEach(el => {
            el.textContent = this.quizQuestions.length;
        });
    }

    selectAnswer(answer) {
        if (this.currentQuizAnswered) return; // 已回答則不能再選擇
        
        this.userAnswers[this.currentQuizIndex] = answer;
        this.answeredQuestions[this.currentQuizIndex] = true;
        this.currentQuizAnswered = true;
        
        // 更新選項顯示並禁用點擊
        const currentQuestion = this.quizQuestions[this.currentQuizIndex];
        document.querySelectorAll('.answer-option').forEach((option, index) => {
            // 根據題目類型決定選項值
            let optionValue;
            if (currentQuestion.type === 'truefalse') {
                optionValue = option.textContent; // 對是非題，使用選項文字
            } else {
                optionValue = String.fromCharCode(65 + index); // 對選擇題，使用 A, B, C, D
            }
            
            option.classList.remove('selected');
            option.classList.add('disabled');
            option.onclick = null;
            
            // 標記正確答案
            if (optionValue === currentQuestion.answer) {
                option.classList.add('correct');
            }
            
            // 標記用戶選擇
            if (optionValue === answer) {
                option.classList.add('selected');
                if (optionValue !== currentQuestion.answer) {
                    option.classList.add('incorrect');
                }
            }
        });
        
        // 顯示即時反饋
        this.showQuizFeedback();
    }

    showQuizFeedback() {
        const feedbackEl = document.getElementById('quiz-feedback');
        const resultIconEl = document.getElementById('result-icon');
        const resultTextEl = document.getElementById('result-text');
        const correctAnswerEl = document.getElementById('correct-answer-text');
        const explanationEl = document.getElementById('explanation-text');
        
        if (!feedbackEl) return;
        
        const currentQuestion = this.quizQuestions[this.currentQuizIndex];
        const userAnswer = this.userAnswers[this.currentQuizIndex];
        const isCorrect = userAnswer === currentQuestion.answer;
        
        // 設定反饋圖示和文字
        if (resultIconEl && resultTextEl) {
            if (isCorrect) {
                resultIconEl.textContent = '✓';
                resultIconEl.className = 'result-icon correct';
                resultTextEl.textContent = '答對了！';
                resultTextEl.className = 'result-text correct';
            } else {
                resultIconEl.textContent = '✗';
                resultIconEl.className = 'result-icon incorrect';
                resultTextEl.textContent = '答錯了';
                resultTextEl.className = 'result-text incorrect';
            }
        }
        
        // 顯示正確答案
        if (correctAnswerEl) {
            if (currentQuestion.type === 'truefalse') {
                correctAnswerEl.textContent = currentQuestion.answer;
            } else {
                const correctOption = currentQuestion.options.find(option => 
                    option.startsWith(currentQuestion.answer + '.')
                );
                correctAnswerEl.textContent = correctOption || currentQuestion.answer;
            }
        }
        
        // 顯示解釋
        if (explanationEl) {
            explanationEl.textContent = currentQuestion.explanation;
        }
        
        // 顯示反饋區域
        feedbackEl.classList.remove('hidden');
    }

    hideQuizFeedback() {
        const feedbackEl = document.getElementById('quiz-feedback');
        if (feedbackEl) {
            feedbackEl.classList.add('hidden');
        }
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
        
        if (questionEl) questionEl.classList.add('hidden');
        if (resultEl) resultEl.classList.remove('hidden');
        
        const score = Math.round((this.quizStats.correct / this.quizStats.total) * 100);
        const scoreEl = document.getElementById('final-score');
        const correctEl = document.getElementById('correct-answers');
        const incorrectEl = document.getElementById('incorrect-answers');
        
        if (scoreEl) scoreEl.textContent = score;
        if (correctEl) correctEl.textContent = this.quizStats.correct;
        if (incorrectEl) incorrectEl.textContent = this.quizStats.incorrect;
        
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
        // 簡化版答案檢視
        let reviewText = '測驗回顧：\n\n';
        this.quizQuestions.forEach((q, index) => {
            const userAnswer = this.userAnswers[index] || '未作答';
            const isCorrect = userAnswer === q.answer;
            reviewText += `第${index + 1}題: ${isCorrect ? '✓' : '✗'}\n`;
            reviewText += `問題: ${q.question}\n`;
            reviewText += `您的答案: ${userAnswer}\n`;
            reviewText += `正確答案: ${q.answer}\n`;
            reviewText += `說明: ${q.explanation}\n\n`;
        });
        
        alert(reviewText);
    }

    retakeQuiz() {
        const resultEl = document.getElementById('quiz-result');
        const startEl = document.getElementById('quiz-start');
        
        if (resultEl) resultEl.classList.add('hidden');
        if (startEl) startEl.classList.remove('hidden');
        
        // 重置所有狀態
        this.userAnswers = [];
        this.answeredQuestions = [];
        this.currentQuizAnswered = false;
        this.currentQuizIndex = 0;
        
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
        }
    }

    // 搜索功能
    toggleSearch() {
        const overlay = document.getElementById('search-overlay');
        if (overlay) {
            overlay.classList.toggle('hidden');
            
            if (!overlay.classList.contains('hidden')) {
                const searchInput = document.getElementById('search-input');
                if (searchInput) {
                    searchInput.focus();
                }
            }
        }
    }

    closeSearch() {
        const overlay = document.getElementById('search-overlay');
        const input = document.getElementById('search-input');
        const results = document.getElementById('search-results');
        
        if (overlay) overlay.classList.add('hidden');
        if (input) input.value = '';
        if (results) results.innerHTML = '';
    }

    handleSearch(query) {
        const resultsEl = document.getElementById('search-results');
        if (!resultsEl) return;
        
        if (query.length < 2) {
            resultsEl.innerHTML = '';
            return;
        }

        const searchData = this.getSearchData();
        const results = searchData.filter(item => 
            item.title.includes(query) || item.content.includes(query)
        );

        const resultsHTML = results.map(result => `
            <div class="search-result-item" onclick="app.navigateToResult('${result.section}')">
                <h4>${result.title}</h4>
                <p>${result.content.substring(0, 100)}...</p>
            </div>
        `).join('');

        resultsEl.innerHTML = resultsHTML || '<p>沒有找到相關結果</p>';
    }

    getSearchData() {
        return [
            { section: 'concepts', title: '生命底氣', content: '內在能量狀態的總和，面對未知與壓力的穩定器' },
            { section: 'acupoints', title: '合谷穴', content: '面口合谷收，調理頭部面部口腔相關問題' },
            { section: 'acupoints', title: '足三里', content: '肚腹三里留，消化系統調理的養生大穴' },
            { section: 'acupoints', title: '委中穴', content: '腰背問題委中求，處理腰背部緊繃酸痛' },
            { section: 'acupoints', title: '廉泉穴', content: '急救廉泉穴，暈車噁心不適時緊急自救' },
            { section: 'concepts', title: '潛意識資料庫', content: '三個月內最重要，影響一生的反應模式' }
        ];
    }

    navigateToResult(section) {
        this.closeSearch();
        this.showSection(section);
    }

    // 收藏功能
    toggleBookmarks() {
        alert('收藏功能：標記重要內容供日後複習\n\n目前已收藏的內容會在此顯示。');
    }

    // 進度詳情
    showProgressDetail() {
        const completed = Object.values(this.sectionProgress).filter(Boolean).length;
        const total = Object.keys(this.sectionProgress).length;
        const completedSections = Object.entries(this.sectionProgress)
            .filter(([_, completed]) => completed)
            .map(([section, _]) => section)
            .join(', ');
            
        alert(`學習進度詳情：\n\n已完成: ${completed}/${total} 個章節\n完成度: ${Math.round(completed/total*100)}%\n\n已完成章節: ${completedSections}`);
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
        
        if (e.key === 'Escape') {
            this.closeSearch();
        }
        
        if (e.ctrlKey && e.key === 'f') {
            e.preventDefault();
            this.toggleSearch();
        }
    }
}

// 啟動應用程式
let app;
document.addEventListener('DOMContentLoaded', () => {
    console.log('Initializing app...');
    app = new MeridianLearningApp();
});