// Application data
const fullQuizBank = [
    // Original 5
    {id: 1, question: "膀胱經當令的時間是？", options: ["卯時（5-7點）", "申時（15-17點）", "亥時（21-23點）", "子時（23-1點）"], correct: 1, explanation: "申時（下午3-5點）是膀胱經氣血最旺盛的時候，此時多喝水、適度活動，有助於身體排毒。"},
    {id: 2, question: "根據影片建議，泡溫泉最理想的溫度範圍是？", options: ["35-38度", "38-42度", "42-45度", "45度以上"], correct: 1, explanation: "38-42度是最適合人體的溫度，能有效促進循環又不過度刺激，避免造成身體負擔。"},
    {id: 3, question: "膀胱經的主要功能不包括下列何者？", options: ["抵御風寒", "調節自律神經", "促進消化吸收", "傳導感覺信息"], correct: 2, explanation: "消化吸收主要是脾胃經絡的功能。膀胱經是人體抵禦外邪的屏障，並透過背俞穴調節與臟腑相連的自律神經。"},
    {id: 4, question: "影片中強調，每次泡溫泉的建議時間與狀態是？", options: ["20-30分鐘，直到大汗淋漓", "5-10分鐘，達到微微出汗即可", "至少30分鐘才能達到效果", "時間不限，舒服就好"], correct: 1, explanation: "泡湯養生的關鍵在於「微微出汗」，這表示循環已啟動但未耗氣傷津。大汗淋漓反而會耗損心氣，對身體造成負擔。"},
    {id: 5, question: "膀胱經在身體的位置主要分佈在？", options: ["身體前面，從胸到腳", "身體後面，從頭到腳", "身體左側", "身體右側"], correct: 1, explanation: "膀胱經是人體最長的一條經絡，從眼內角（睛明穴）開始，經過頭頂，沿著整個背部、腿後側，一直到足小趾外側（至陰穴）。"},
    // Expanded Set 1 (6-65)
    {id: 6, question: "影片提到，膀胱經與哪個人體重要神經系統有密切關係？", options: ["運動神經系統", "周邊神經系統", "中樞神經系統", "自律神經系統"], correct: 3, explanation: "膀胱經循行於脊椎兩側，這裡分布著交感與副交感神經幹，通過背俞穴直接影響與調節全身臟腑功能的自律神經系統。"},
    {id: 7, question: "當人體處於緊張、壓力的「戰鬥或逃跑」模式時，是哪個神經系統處於主導地位？", options: ["交感神經", "副交感神經", "感覺神經", "以上皆非"], correct: 0, explanation: "交感神經系統負責應對緊急情況，使心跳加速、血壓上升，進入「戰鬥或逃跑」的戒備狀態。"},
    {id: 8, question: "泡溫泉流的汗，屬於影片中提到的哪一種出汗類型？", options: ["主動式出汗", "被動式出汗", "精神性出汗", "味覺性出汗"], correct: 1, explanation: "被動式出汗是指非因運動，而是由外部熱源（如溫泉、桑拿）引起的出汗，這種出汗方式若過度，較容易消耗人體的氣。"},
    {id: 9, question: "影片建議，泡完溫泉後最好做什麼來幫助身體恢復？", options: ["立刻去運動", "喝冰水降溫", "充分休息並補充溫開水", "馬上進食大餐"], correct: 2, explanation: "泡湯後，身體循環加快，需要時間緩和。建議靜坐休息至少30分鐘，並補充溫開水，讓身體機能和血壓慢慢恢復平穩。"},
    {id: 10, question: "膀胱經的終點穴位是哪個，它位於何處？", options: ["湧泉穴，足底", "睛明穴，眼內角", "至陰穴，足小趾外側", "百會穴，頭頂"], correct: 2, explanation: "至陰穴是膀胱經的最後一個穴位，位於足小趾指甲角旁約0.1寸。它也是一個常用於轉正胎位的經驗效穴。"},
    {id: 11, question: "為什麼影片建議泡完溫泉後不要立刻用清水沖澡？", options: ["節省水資源", "讓皮膚上的礦物質多停留一會", "因為身體太熱", "沒有特別原因"], correct: 1, explanation: "溫泉中的礦物質會在皮膚上形成一層薄膜，有持續保溫和滋養的效果。立刻沖掉會減弱溫泉的「化學效應」。"},
    {id: 12, question: "「背俞穴」是哪條經絡上的重要穴位群？", options: ["督脈", "任脈", "足太陽膀胱經", "足少陽膽經"], correct: 2, explanation: "十二臟腑的背俞穴都位於背部的膀胱經上，是臟腑之氣輸注於體表的部位，既是診斷點也是治療點。"},
    {id: 13, question: "運動流汗（主動式出汗）與泡溫泉流汗（被動式出汗）最大的不同在於？", options: ["汗的鹹度不同", "前者是身體由內而外散熱，較不耗氣", "後者排出的毒素比較多", "沒有任何不同"], correct: 1, explanation: "主動運動時，身體為了散熱而出汗，氣隨汗出但有根基；被動出汗是身體為應對外熱的調節，若過度則容易單純耗氣傷津。"},
    {id: 14, question: "影片中提到，外界的「風寒」之邪最容易從身體哪個部位侵入？", options: ["腹部", "手心", "腳底", "後頸及背部"], correct: 3, explanation: "膀胱經主一身之表，是人體抵禦外邪的第一道防線，尤其後頸、背部是門戶，所以需要特別注意保暖，避免風寒直中。"},
    {id: 15, question: "下列哪種人不適合或需要謹慎泡溫泉？", options: ["長期失眠者", "肌肉痠痛者", "中重度心血管疾病患者", "手腳冰冷者"], correct: 2, explanation: "泡溫泉會導致血管擴張、血壓波動，對於有中重度心血管疾病（如高血壓、心臟病）的患者風險較高，需經醫師評估。"},
    {id: 16, question: "膀胱經的起點穴位是？", options: ["攢竹穴", "睛明穴", "承泣穴", "絲竹空穴"], correct: 1, explanation: "膀胱經起於眼內角的睛明穴，這也解釋了為何膀胱經能影響眼部狀況，如眼睛疲勞、乾澀等。"},
    {id: 17, question: "溫泉的「機械效應」主要是指？", options: ["放鬆身心", "吸收礦物質", "水的浮力與靜水壓力", "溫熱促進循環"], correct: 2, explanation: "水的浮力可以減輕關節負擔，靜水壓力則能對身體產生均勻的按摩作用，促進循環與淋巴回流。"},
    {id: 18, question: "泡湯前的準備步驟，下列何者正確？", options: ["吃飽飯後立刻去泡", "空腹去泡效果最好", "先用溫泉水沖洗四肢再緩慢入池", "直接跳入池中適應水溫"], correct: 2, explanation: "從離心臟最遠的四肢開始適應水溫，再緩慢將身體浸入水中，可以避免血壓急遽變化，是安全泡湯的重要步驟。"},
    {id: 19, question: "影片提到，人體最大的排毒通道是哪一條經絡？", options: ["肝經", "腎經", "大腸經", "膀胱經"], correct: 3, explanation: "膀胱經與腎經相表裡，負責將全身的代謝廢水轉化為尿液排出體外，是最大、最主要的排毒通道。"},
    {id: 20, question: "按摩膀胱經上的「腎俞穴」主要有什麼功用？", options: ["改善消化", "安神助眠", "補益腎氣、強健腰背", "疏肝理氣"], correct: 2, explanation: "腎俞是腎氣在背部的反應點和治療點，按摩此處能直接補充腎氣，對於腰痠、疲勞、頻尿等腎虛症狀有很好的幫助。"},
    {id: 21, question: "下列哪一種泉質的溫泉，俗稱「美人湯」，對皮膚角質有軟化作用？", options: ["單純泉", "碳酸氫鈉泉", "硫磺泉", "氯化物泉"], correct: 1, explanation: "碳酸氫鈉泉，俗稱「美人湯」，因其泉質有軟化皮膚角質、滋潤皮膚的效果而得名。"},
    {id: 22, question: "硫磺泉因其特殊氣味被稱為「臭蛋湯」，它對於下列哪種狀況有較好的幫助？", options: ["改善失眠", "慢性皮膚病", "促進食慾", "強化心臟"], correct: 1, explanation: "硫磺具有解毒、止癢和軟化角質的作用，因此對於一些慢性皮膚病（如乾癬、慢性濕疹）有輔助療效。"},
    {id: 23, question: "泡溫泉時採「半身浴」有什麼好處？", options: ["可以泡比較久", "對心肺的負擔較小", "水比較不容易冷", "沒有特別好處"], correct: 1, explanation: "將水位保持在心臟以下，可以減少水壓對心肺的壓迫，對於心血管功能較弱或初次泡湯者是更安全的方式。"},
    {id: 24, question: "影片強調「經絡養生」的核心精神是什麼？", options: ["生病了再找方法", "完全依賴醫生", "預防勝於治療，靠自己改變生活", "追求速效的療法"], correct: 2, explanation: "經絡養生是一種生活智慧，強調在日常中透過簡單的方法（如按摩、保暖、情緒管理）來維持經絡暢通，達到「治未病」的預防效果。"},
    {id: 25, question: "膀胱經氣血不通時，除了腰背痠痛，還可能出現什麼症狀？", options: ["前額頭痛", "膝關節前側疼痛", "後腦杓、後頸僵痛", "腹部絞痛"], correct: 2, explanation: "膀胱經經過後腦、後頸，因此此處的僵硬疼痛，常常是膀胱經不通暢的典型表現。"},
    {id: 26, question: "泡溫泉時，身體感受「溫熱」是屬於溫泉的哪一種效應？", options: ["熱效應", "化學效應", "機械效應", "心理效應"], correct: 0, explanation: "熱效應是指溫泉的溫度本身對人體的作用，包括擴張血管、促進血液循環、放鬆肌肉等。"},
    {id: 27, question: "「肝俞穴」是哪個臟腑的背俞穴？按摩它有助於什麼？", options: ["心臟；安神", "肺臟；止咳", "肝臟；疏肝理氣", "脾臟；助消化"], correct: 2, explanation: "肝俞是肝的背俞穴，肝主疏泄、藏血，負責調節情緒與氣機。按摩肝俞有助於疏通肝氣，改善壓力大、易怒、胸悶等問題。"},
    {id: 28, question: "為何飯後和酒後不宜立即泡溫泉？", options: ["會讓食物快速消化", "會讓酒快速分解", "血液集中在消化道，泡湯易致腦部缺血", "沒有影響"], correct: 2, explanation: "飯後血液集中於腸胃幫助消化，此時泡湯會使血液流向體表，造成消化不良或頭暈。酒後泡湯則會加速心跳、擴張血管，增加心血管意外的風險。"},
    {id: 29, question: "當身體處於放鬆、休息、消化狀態時，是哪個神經系統在主導？", options: ["交感神經", "副交感神經", "運動神經", "以上皆是"], correct: 1, explanation: "副交感神經系統負責讓身體「休息和消化」，與交感神經的「戰鬥或逃跑」功能相互拮抗，維持身體平衡。"},
    {id: 30, question: "按摩整個背部的膀胱經，對於穩定情緒、改善失眠有幫助，其原理是？", options: ["因為背部有很多肌肉", "促進了全身血液循環", "調節了與情緒、睡眠相關的自律神經", "純粹是心理作用"], correct: 2, explanation: "透過按摩膀胱經及背俞穴，可以直接調節亢奮的交感神經和放鬆的副交感神經，使自律神經恢復平衡，從而改善因神經失調引起的失眠和焦慮。"},
    {id: 31, question: "下列哪項不是膀胱經的日常保養方法？", options: ["背部保暖", "多做彎腰伸展", "常喝冰飲", "避免憋尿"], correct: 2, explanation: "膀胱經屬太陽寒水，喜溫惡寒。常喝冰飲會損傷陽氣，不利於經絡的溫通。"},
    {id: 32, question: "「心俞穴」主要調理哪個臟腑的功能？", options: ["肝臟", "心臟", "脾臟", "腎臟"], correct: 1, explanation: "心俞是心氣輸注之處，對於心悸、胸悶、失眠、多夢等心系相關問題有調節作用。"},
    {id: 33, question: "若想透過泡溫泉改善筋骨痠痛，可以選擇哪類泉質？", options: ["碳酸泉", "碳酸氫鈉泉", "食鹽泉（氯化物泉）", "以上皆可"], correct: 3, explanation: "不同泉質各有側重，但所有溫泉的熱效應和機械效應都能促進循環、放鬆肌肉，因此對筋骨痠痛都有一定的緩解作用。"},
    {id: 34, question: "影片中提到，流汗的生理功能不包含？", options: ["調節體溫", "排出廢物", "保護皮膚", "製造養分"], correct: 3, explanation: "流汗是身體散熱、排出部分代謝廢物（如尿素）、以及維持皮膚濕潤與酸鹼值平衡的方式，但它本身不能製造養分。"},
    {id: 35, question: "長期有「憋尿」習慣，最直接損傷的是哪兩條經絡？", options: ["肝經與膽經", "心經與小腸經", "肺經與大腸經", "腎經與膀胱經"], correct: 3, explanation: "膀胱主儲尿，腎主水液代謝，兩者互為表裡。憋尿直接影響膀胱功能，日久也會耗損腎的氣化能力。"},
    {id: 36, question: "為何說膀胱經是「感覺系統」的通道？", options: ["因為終點在腳趾", "因為起點在眼睛", "因為經絡循行於背部，與脊神經相連", "因為它很長"], correct: 2, explanation: "膀胱經緊鄰脊椎，背俞穴區域的神經末梢非常豐富，是外界感覺（如冷、熱、痛）傳入中樞神經的重要通路。"},
    {id: 37, question: "從經絡養生的角度看，保持心情愉快、情緒穩定，主要是為了哪個臟腑的氣機條達？", options: ["肝", "心", "脾", "肺"], correct: 0, explanation: "肝主疏泄，負責調暢全身的氣機，與情緒關係最為密切。心情鬱悶會導致肝氣鬱結，影響全身經絡的通暢。"},
    {id: 38, question: "泡溫泉時感到頭暈、心悸，應該怎麼辦？", options: ["再多泡一會兒適應一下", "立刻起身，緩慢離開溫泉池", "喝熱水暖身", "繼續泡，但把頭也浸入水中"], correct: 1, explanation: "頭暈、心悸是身體發出的警訊，可能表示血壓波動過大或腦部供血不足。應立即緩慢起身，到通風處休息，並補充水分。"},
    {id: 39, question: "「脾俞穴」的功能主要是什麼？", options: ["補腎", "養心", "健脾和胃、幫助運化", "清肺"], correct: 2, explanation: "脾主運化，負責消化吸收。按摩脾俞穴可以增強脾胃功能，改善腹脹、食慾不振、消化不良等問題。"},
    {id: 40, question: "感覺後小腿緊繃、痠脹，可能是哪條經絡循環不佳的信號？", options: ["胃經", "膽經", "膀胱經", "肝經"], correct: 2, explanation: "膀胱經從背部沿著大腿後側、小腿後側（承山穴等）下行，因此小腿肚的緊繃痠脹常常與膀胱經氣血不通有關。"},
    {id: 41, question: "申時（15-17點）除了是膀胱經當令，也是一天中適合做什麼事的時間？", options: ["睡回籠覺", "吃晚餐", "學習與記憶效率較高的時間", "進行劇烈運動"], correct: 2, explanation: "申時膀胱經氣血流注於腦，陽氣上達，是記憶力和工作效率較高的時段之一，適合用來學習或處理重要事務。"},
    {id: 42, question: "溫泉的「心理效應」指的是？", options: ["溫泉的神奇傳說", "溫泉中的化學物質影響大腦", "舒適環境與溫熱感受帶來的身心放鬆", "以上皆是"], correct: 2, explanation: "在溫暖舒適的環境中泡湯，本身就是一種能舒緩壓力、平靜心神的活動，這就是溫泉的心理效應。"},
    {id: 43, question: "在辦公室久坐後，可以做什麼簡單動作來疏通膀胱經？", options: ["趴著睡覺", "身體前彎，雙手盡量觸地", "用力按摩腹部", "喝一杯咖啡"], correct: 1, explanation: "身體前彎的動作可以有效伸展從背部到腿後側的整條膀胱經，有助於緩解久坐帶來的僵硬和氣血不通。"},
    {id: 44, question: "「肺俞穴」是調理哪個臟腑的要穴？", options: ["肺臟", "肝臟", "腎臟", "心臟"], correct: 0, explanation: "肺俞是肺氣輸注之處，對於咳嗽、氣喘、感冒等呼吸系統問題，以及相關的皮膚問題，都有很好的調節作用。"},
    {id: 45, question: "如果今天壓力特別大、很緊繃，可以透過按摩哪條經絡來幫助放鬆？", options: ["大腸經", "膀胱經", "胃經", "三焦經"], correct: 1, explanation: "壓力大會導致交感神經過度興奮，而按摩背部的膀胱經可以直接調節自律神經，幫助身體從緊繃狀態切換到放鬆狀態。"},
    {id: 46, question: "「子午流注」學說揭示了什麼規律？", options: ["月亮的運行週期", "人體氣血在十二經脈的流動順序與時間", "一年四季的氣候變化", "食物的消化過程"], correct: 1, explanation: "子午流注是中醫的理論，描述了人體氣血在一天十二個時辰中，會依序流經十二條主要經絡，並在特定時間達到高峰。"},
    {id: 47, question: "根據影片，泡湯流汗排出的主要是身體的什麼？", options: ["脂肪", "深層毒素", "水與電解質", "蛋白質"], correct: 2, explanation: "汗液的主要成分是水，其次是鈉、鉀等電解質以及少量的尿素。它是一種生理調節機制，而非主要的排毒管道。"},
    {id: 48, question: "經常拍打或按摩腿後側的膀胱經，有助於改善什麼問題？", options: ["膝蓋痛", "靜脈曲張與下肢水腫", "腳踝扭傷", "腹瀉"], correct: 1, explanation: "膀胱經是下肢後側主要的陽經，促進其循環有助於下肢的氣血回流，對於改善因循環不佳造成的靜脈曲張和水腫有幫助。"},
    {id: 49, question: "在中醫理論中，與「水液代謝」最相關的兩個臟腑是？", options: ["肝與膽", "心與小腸", "脾與胃", "腎與膀胱"], correct: 3, explanation: "腎主水，負責生成尿液；膀胱儲存並排泄尿液。兩者互為表裡，共同管理人體的水液平衡。"},
    {id: 50, question: "「氯化物泉」也就是食鹽泉，泡完後身體會有什麼感覺？", options: ["皮膚乾燥", "身體感覺清爽", "皮膚上會形成薄膜，保溫效果好", "沒有任何感覺"], correct: 2, explanation: "食鹽泉的鹽分會在皮膚上形成一層薄膜，能減少汗水蒸發，因此保溫效果特別好，適合冬天或虛寒體質者。"},
    {id: 51, question: "情緒波動大，時常焦慮或憂鬱，反映了哪個神經系統可能失衡？", options: ["運動神經系統", "自律神經系統", "感覺神經系統", "以上皆非"], correct: 1, explanation: "自律神經系統負責調控情緒、睡眠、心跳、壓力反應等，長期失衡是許多情緒問題和身心症狀的根源。"},
    {id: 52, question: "影片建議，除了泡湯，平日可以用什麼方法達到類似的溫和排汗效果？", options: ["穿很多衣服悶著", "喝薑茶後快走或做家事", "吃辛辣食物", "長時間曬太陽"], correct: 1, explanation: "喝薑茶等溫熱飲品後，進行適度活動，讓身體由內而外微微發熱出汗，是一種溫和不傷氣的主動排汗養生法。"},
    {id: 53, question: "膀胱經的循行路線經過臀部，因此對於哪種疼痛有調理作用？", options: ["腹股溝痛", "髖關節痛", "坐骨神經痛", "尾椎痛"], correct: 2, explanation: "坐骨神經的走向與膀胱經在臀部及腿後側的循行路線高度重疊，因此許多坐骨神經痛都可以從疏通膀胱經來著手改善。"},
    {id: 54, question: "身體的陽氣，尤其是抵禦外邪的「衛氣」，主要與哪條經絡關係最密切？", options: ["肝經", "心包經", "膀胱經", "膽經"], correct: 2, explanation: "膀胱經為太陽經，主一身之表，是陽氣最旺盛的經絡之一，負責衛氣的敷布，抵禦外邪入侵。"},
    {id: 55, question: "若要保養膀胱經，伸展時應著重於身體哪個部位的拉伸？", options: ["身體前側", "身體後側鏈（後頸、背、腿後）", "身體兩側", "手臂內側"], correct: 1, explanation: "從後頸、整個背部、臀部、大腿後側到小腿，都是膀胱經的覆蓋範圍，拉伸整個身體後側鏈就是最好的膀胱經伸展。"},
    {id: 56, question: "泡溫泉可以放鬆身心，主要是因為溫熱刺激能促使哪個神經系統活絡？", options: ["交感神經", "副交感神經", "運動神經", "感覺神經"], correct: 1, explanation: "溫熱的刺激有助於抑制過度亢奮的交感神經，同時提升副交感神經的活性，讓身體進入放鬆、修復的狀態。"},
    {id: 57, question: "冬季時，保養膀胱經的重點除了背部保暖，還應著重於哪個背俞穴的保養？", options: ["肝俞", "心俞", "脾俞", "腎俞"], correct: 3, explanation: "冬季對應腎，是養腎的季節。腎與膀胱相表裡，此時加強腎俞穴的保養（如搓熱、艾灸）可以事半功倍。"},
    {id: 58, question: "人體十二經絡中，陽經多分布在身體的哪個區域？", options: ["四肢內側與胸腹", "四肢外側與頭背", "僅在頭部", "僅在軀幹"], correct: 1, explanation: "一般來說，陽經（如膀胱經、膽經、胃經）主要循行於身體的背部、頭面和四肢外側，負責保護和功能性的活動。"},
    {id: 59, question: "「出汗過多會傷心」的中醫理論，是指過汗會耗損什麼？", options: ["心血", "心氣與心陽", "心陰", "以上皆是"], correct: 3, explanation: "中醫認為「汗為心之液」，出汗過度會同時耗損心氣、心陽（能量）和心陰（津液），導致心悸、疲倦、口乾等症狀。"},
    {id: 60, question: "在經絡實踐中，順著經絡的走向操作，稱為？", options: ["補法", "瀉法", "平補平瀉", "沒有分別"], correct: 0, explanation: "一般來說，順著經絡的循行方向進行按摩或拍打，有助於補充該經絡的氣血，稱為「補」。"},
    {id: 61, question: "泡湯時，溫泉的礦物質是透過溫泉的哪種效應被人體吸收？", options: ["熱效應", "機械效應", "化學效應", "心理效應"], correct: 2, explanation: "化學效應專指溫泉中的礦物離子透過皮膚滲透吸收，從而對人體產生特定的生理影響。"},
    {id: 62, question: "頭頂的疼痛或沉重感，通常與哪條經絡的氣血運行不暢有關？", options: ["胃經", "膽經", "膀胱經", "三焦經"], correct: 2, explanation: "膀胱經從頭頂正中線旁開1.5寸的位置經過，因此頭頂的不適多與膀胱經有關。"},
    {id: 63, question: "下列何者是「主動式出汗」的例子？", options: ["洗桑拿", "泡熱水澡", "夏天在沒空調的房間待著", "跑步運動"], correct: 3, explanation: "主動式出汗是身體因內部活動（如運動）產生熱量後，自主啟動的散熱機制。"},
    {id: 64, question: "中醫認為「恐傷腎」，過度的恐懼情緒會耗損腎氣，進而可能影響哪個腑的功能？", options: ["膽", "胃", "小腸", "膀胱"], correct: 3, explanation: "腎與膀胱相表裡，腎氣受損會直接影響膀胱的氣化和固攝功能，有些人極度恐懼時會小便失禁，就是這個道理。"},
    {id: 65, question: "在一天當中，除了申時，早晨哪個時段也適合敲打膀胱經來提振陽氣？", options: ["子時 (23-1點)", "丑時 (1-3點)", "寅時 (3-5點)", "辰時 (7-9點)"], correct: 3, explanation: "辰時（7-9點）是胃經當令，此時陽氣開始旺盛。早餐後適度敲打膀胱經，有助於陽氣的升發，讓人一天精神飽滿。"},
    // New Quiz Questions (66-85)
    {id: 66, question: "影片強調，膽固醇在人體內最重要的功能之一是作為什麼的原料？", options: ["能量", "肌肉", "荷爾蒙與維生素D", "血液"], correct: 2, explanation: "膽固醇是合成人體多種重要物質的基礎，包括性荷爾蒙、壓力荷爾蒙以及維持骨骼健康的維生素D，並非壞東西。"},
    {id: 67, question: "要透過曬太陽合成維生素D，需要陽光中的哪種光線？", options: ["UVA", "UVB", "UVC", "紅外線"], correct: 1, explanation: "是陽光中的中波紫外線（UVB）照射到皮膚上，才能啟動將膽固醇轉化為維生素D3的生化反應。"},
    {id: 68, question: "根據影片觀點，曬太陽補充陽氣最好的部位是？", options: ["臉部", "腹部", "後背", "手心"], correct: 2, explanation: "後背是督脈（諸陽之海）和膀胱經（太陽主表）的循行之處，是人體陽氣最集中的地方，曬後背是補充陽氣最高效的方式。"},
    {id: 69, question: "影片建議的最佳曬太陽時段是？", options: ["中午12點，陽光最強烈時", "上午9-10點或下午3-4點", "傍晚太陽下山時", "任何時間都可以"], correct: 1, explanation: "這兩個時段的陽光相對溫和，含有足夠的UVB來合成維生素D，又不易曬傷皮膚，是進行日光浴的黃金時間。"},
    {id: 70, question: "「督脈」在中醫裡被稱為什麼？", options: ["諸陰之海", "氣血之源", "水穀之海", "諸陽之海"], correct: 3, explanation: "督脈總督一身之陽氣，循行於人體背部正中線，被稱為「諸陽之海」，是補充和調節全身陽氣的總樞紐。"},
    {id: 71, question: "曬太陽後，影片建議喝什麼來補充流失的津液？", options: ["冰鎮可樂", "一杯濃茶", "溫開水或加少許鹽的水", "果汁"], correct: 2, explanation: "曬太陽會使身體輕微出汗，流失水分和電解質。喝溫開水或淡鹽水最能溫和地為身體補充津液，而不會因冰冷而損傷陽氣。"},
    {id: 72, question: "缺乏維生素D最廣為人知的影響是？", options: ["影響視力", "影響鈣質吸收，導致骨質疏鬆", "導致皮膚乾燥", "引起消化不良"], correct: 1, explanation: "維生素D最主要的功能是促進腸道對鈣和磷的吸收，維持血鈣平衡，對骨骼的健康至關重要。"},
    {id: 73, question: "為何現代人普遍缺乏維生素D？", options: ["飲食過於油膩", "運動量不足", "日曬不足且過度防曬", "睡眠時間太短"], correct: 2, explanation: "人體90%以上的維生素D依賴日曬合成。現代人多在室內活動，外出又使用高係數防曬，導致皮膚接觸陽光的機會大減。"},
    {id: 74, question: "根據影片觀點，下列何者是對「膽固醇」的正確理解？", options: ["它是百病之源，越低越好", "它是人體必需的原料，有好壞之分", "只能從食物中獲取", "它只會造成血管堵塞"], correct: 1, explanation: "人體自身會合成大部分膽固醇，它是構成細胞膜、合成荷爾蒙的必需品。我們需要的是平衡，而非盲目地降膽固醇。"},
    {id: 75, question: "初次進行日光浴，建議的時長是多少？", options: ["至少一小時", "5分鐘", "15-20分鐘", "曬到皮膚變紅為止"], correct: 2, explanation: "應從較短的時間開始，讓皮膚逐漸適應。15-20分鐘足以啟動維生素D的合成，又能有效避免曬傷。"},
    {id: 76, question: "曬太陽有助於改善情緒、對抗憂鬱，這是因為陽光能促進大腦分泌什麼？", options: ["褪黑激素", "血清素", "腎上腺素", "胰島素"], correct: 1, explanation: "陽光能幫助大腦製造更多的「快樂荷爾蒙」血清素，這有助於提振情緒、增加幸福感，所以多曬太陽會讓人心情變好。"},
    {id: 77, question: "「陽氣」在中醫概念裡，與下列哪個功能最不相關？", options: ["溫煦身體，提供能量", "抵禦外邪，保護身體", "推動氣血運行", "滋潤身體，保持靜定"], correct: 3, explanation: "滋潤、靜定、主內守的特性屬於「陰」的範疇。陽氣則代表溫熱、動力、防衛和功能性的活動。"},
    {id: 78, question: "如果無法在戶外曬太陽，影片暗示可以用什麼方法作為替代來溫暖後背？", options: ["穿濕衣服", "吹冷氣", "用熱水袋或暖暖包溫敷", "趴在冰涼的地上"], correct: 2, explanation: "使用溫熱的物品敷在後背（大椎穴、命門穴等），可以模擬陽光溫煦督脈和膀胱經的效果，有助於驅散寒氣、補充陽氣。"},
    {id: 79, question: "將陽光、空氣、水視為生命三要素，其中「陽光」對應到中醫的哪個核心概念？", options: ["氣", "血", "津液", "陽氣"], correct: 3, explanation: "陽光是自然界陽氣最主要的來源，人體作為自然的一部分，也需要透過陽光來補充自身的陽氣，維持生命活力。"},
    {id: 80, question: "下列哪條經絡不屬於「陽經」？", options: ["足太陽膀胱經", "手陽明大腸經", "足太陰脾經", "手太陽小腸經"], correct: 2, explanation: "經絡名稱中的「太陰」、「少陰」、「厥陰」屬於陰經，多分布在四肢內側和胸腹部。脾經是足太陰脾經，屬陰經。"},
    {id: 81, question: "曬太陽時，為何不建議隔著玻璃曬？", options: ["玻璃會反射所有陽光", "玻璃會過濾掉合成維生素D所需的UVB", "這樣曬沒有溫暖的感覺", "容易造成火災"], correct: 1, explanation: "普通的窗戶玻璃可以有效阻擋絕大部分的UVB光線，雖然你仍能感到溫暖（紅外線），但無法有效合成維生素D。"},
    {id: 82, question: "身體的陽氣不足時，最可能出現下列哪種症狀？", options: ["口乾舌燥、手心發熱", "怕冷、手腳冰冷、精神不振", "煩躁易怒、頭痛", "食慾旺盛、身體強壯"], correct: 1, explanation: "陽氣主溫煦，陽虛則寒。怕冷、四肢不溫、容易疲倦、精神萎靡是典型的陽氣不足表現。"},
    {id: 83, question: "膽固醇轉化為維生素D的過程，主要發生在人體的哪個部位？", options: ["肝臟", "血液中", "皮膚", "骨骼"], correct: 2, explanation: "皮膚是這個神奇轉化的工廠。皮膚細胞中含有7-脫氫膽固醇，經UVB照射後轉化為前維生素D3，再經體溫作用轉為維生素D3。"},
    {id: 84, question: "影片提到，曬太陽是一種「不花錢的補藥」，強調了它的什麼特性？", options: ["昂貴且稀有", "天然、免費且有效", "有許多副作用", "需要醫生處方"], correct: 1, explanation: "這句話的核心在於，陽光是大自然賜予的最寶貴、最容易獲得的健康資源，只要方法正確，它就是效益極高的養生法。"},
    {id: 85, question: "曬完太陽後，皮膚微微發紅，感覺溫熱，此時應該？", options: ["繼續曬，直到變黑", "立刻用冰塊冰敷", "到陰涼處自然散熱，並觀察皮膚變化", "塗抹厚重的乳液"], correct: 2, explanation: "曬後應避免過度的冷熱刺激。到陰涼處讓身體自然降溫是最好的方式。如果持續紅痛，則表示可能已輕微曬傷，需注意保濕與修護。"}
];

const appData = {
  videos: [
    {
      id: "video1",
      title: "膀胱經與感覺系統的奧秘",
      description: "探索膀胱經如何隱藏著感覺系統的現象，了解人體最大排毒通道的運作機制",
      url: "https://youtu.be/mPIC3vEZgH4",
      duration: "41分11秒",
      icon: "🫀"
    },
    {
      id: "video2", 
      title: "泡溫泉流汗的養生學問",
      description: "深入了解泡溫泉的正確方法與流汗背後的健康原理",
      url: "https://youtu.be/ePXGtMa9h0Y",
      duration: "22分10秒",
      icon: "♨️"
    },
    {
      id: "video3",
      title: "陽光與膽固醇的密切關係", 
      description: "揭示陽光、陽氣與膽固醇的驚人連結，學習如何透過曬太陽補充人體陽氣與合成維生素D",
      url: "https://youtu.be/7LhN914VjzY",
      duration: "實用指南",
      icon: "☀️"
    }
  ],
  flashcards: [
    {id: 1, question: "膀胱經的主要功能是什麼？", answer: "人體最大的排毒通道，抵御外界風寒的屏障，並調節自律神經", explanation: "膀胱經與腎相表裡，主管水液代謝與排尿；其循行於背部，是抵禦外邪的第一道防線；同時，背部的背俞穴與自律神經系統緊密相連，可調節全身臟腑功能。", category: "膀胱經"},
    {id: 2, question: "膀胱經當令的時間是？", answer: "申時（下午3點到5點）", explanation: "申時是膀胱經氣血最旺盛的時刻，此時多喝水、適度活動，有助於身體排出毒素，也是學習和工作效率較高的時段。", category: "膀胱經"},
    {id: 3, question: "泡溫泉最理想的溫度範圍與狀態？", answer: "38-42度攝氏，達到「微微出汗」即可", explanation: "此溫度能有效促進循環又不過度刺激。養生的關鍵是「微微出汗」，若「大汗淋漓」則會過度消耗心氣與津液，反而傷身。", category: "溫泉療法"},
    {id: 4, question: "泡溫泉的出汗屬於「主動」還是「被動」？", answer: "被動式出汗", explanation: "被動式出汗是由外部熱源（如溫泉、桑拿）導致，與運動時身體由內而外散熱的「主動式出汗」不同。被動式出汗若過度，較容易單純消耗人體的氣。", category: "溫泉療法"},
    {id: 5, question: "膀胱經在身體的哪個部位？", answer: "身體後部，從眼內角開始，沿頭部、背部、腿後側，一直到足小趾外側", explanation: "膀胱經是十二正經中最長、穴位最多的一條，幾乎貫穿整個身體的陽面，這也是其功能廣泛的原因。", category: "膀胱經"},
    {id: 6, question: "溫泉療法的四大效應是什麼？", answer: "熱效應、化學效應、機械效應、心理效應", explanation: "熱效應促進循環；化學效應吸收礦物質；機械效應是水的浮力與壓力；心理效應則是環境帶來的身心放鬆。", category: "溫泉療法"},
    {id: 7, question: "膀胱經如何與「自律神經系統」產生關聯？", answer: "透過脊椎兩側的「背俞穴」", explanation: "膀胱經循行於脊椎兩側，這裡分布著交感與副交感神經幹。刺激對應臟腑的背俞穴，可以直接調節自律神經，幫助身體恢復平衡。", category: "膀胱經"},
    {id: 8, question: "泡湯前的正確準備工作是什麼？", answer: "先用溫泉水沖洗四肢末梢，再從腳開始緩慢入池，可先採半身浴", explanation: "這種「漸進式入浴」能讓身體逐漸適應溫度和水壓，避免血壓急遽變化，是對心血管系統更安全的保護措施。", category: "溫泉療法"},
    {id: 9, question: "哪些人不適合或需謹慎泡溫泉？", answer: "中重度心血管病患者、急性皮膚病、發燒、孕婦、飯後或酒後", explanation: "這些情況下，泡溫泉可能加重病情或引發危險。例如，飯後泡湯會影響消化，心血管病患者則可能因血壓波動而出意外。", category: "溫泉療法"},
    {id: 10, question: "「背俞穴」的主要功能是什麼？", answer: "是臟腑之氣在背部的反應點，既是診斷點，也是治療點", explanation: "當某個內臟功能失調時，其對應的背俞穴常會出現壓痛、結節等異常。反之，刺激這些穴位也能治療相應的臟腑疾病。", category: "膀胱經"},
    {id: 11, question: "為何膀胱經被稱為「感覺系統」的通道？", answer: "因其循行路線緊鄰脊椎，與傳遞感覺的脊神經密切相關", explanation: "膀胱經背部路線是神經末梢密集區，是冷、熱、痛等外界感覺傳入中樞神經的重要通路，影響著我們的感知。", category: "膀胱經"},
    {id: 12, question: "泡湯後應該注意什麼？", answer: "不急於沖澡、充分休息至少30分鐘、大量補充溫開水", explanation: "休息是為了讓身體從循環加速的狀態平穩下來；補充水分是為了彌補流失的津液；不馬上沖澡則是為了讓溫泉的礦物質在皮膚上多停留一會兒。", category: "溫泉療法"},
    {id: 13, question: "膀胱經不通暢的典型症狀有哪些？", answer: "後頸僵硬、後腦頭痛、腰背痠痛、小腿後側緊繃、容易感冒", explanation: "這些症狀都出現在膀胱經的循行路線上。「不通則痛」是經絡學的基本觀念。", category: "膀胱經"},
    {id: 14, question: "外界的「風寒」之邪最容易從何處侵犯人體？", answer: "後頸與背部", explanation: "膀胱經主一身之表，是人體的第一道防線，而後頸與背部是這道防線的「門戶」，最易受寒，因此保暖尤為重要。", category: "膀胱經"},
    {id: 15, question: "「至陰穴」位於何處，有何特殊功用？", answer: "位於足小趾外側，是膀胱經的終點穴，常用於轉正胎位", explanation: "至陰穴是一個重要的經驗效穴，透過艾灸等方式刺激此穴，可以引導氣血向下，達到轉正胎位的效果。", category: "膀胱經"},
    {id: 16, question: "何謂「交感神經」與「副交感神經」？", answer: "一對相互拮抗的自律神經，前者主「戰鬥或逃跑」，後者主「休息與消化」", explanation: "交感神經讓我們應對壓力、保持警覺；副交感神經則讓我們放鬆、進行修復。兩者平衡，身心才能健康。", category: "基礎概念"},
    {id: 17, question: "俗稱「美人湯」的是哪種泉質的溫泉？", answer: "碳酸氫鈉泉", explanation: "碳酸氫鈉泉因其泉質有軟化皮膚角質、洗去多餘皮脂的效果，泡後皮膚感覺光滑細緻，故有「美人湯」之稱。", category: "溫泉療法"},
    {id: 18, question: "按摩「腎俞穴」對身體有什麼好處？", answer: "補益腎氣、強健腰膝、改善疲勞", explanation: "腎俞是腎氣輸注於背部的要穴，直接按摩此處如同為腎臟「充電」，對於腎虛引起的腰痠、頻尿、精神不振等問題很有幫助。", category: "實踐技巧"},
    {id: 19, question: "為何伸展身體的「後側鏈」有助於膀胱經保健？", answer: "因為身體後側鏈的走向與膀胱經的循行路線高度重合", explanation: "從後頸、背部、臀部、大腿後側到小腿，整個後側鏈的伸展，如身體前彎動作，能有效拉伸整條膀胱經，促進氣血暢通。", category: "實踐技巧"},
    {id: 20, question: "中醫說「汗為心之液」，「大汗淋漓」會對身體造成什麼影響？", answer: "會過度耗損心氣與津液，導致心悸、疲倦、口乾舌燥", explanation: "汗液與心血同源，適度出汗是正常的生理調節，但過度、大量的出汗會同時損耗身體的能量（氣）與水分（津液），反而傷身。", category: "應用理解"},
    {id: 21, question: "如何透過膀胱經來改善因壓力引起的失眠？", answer: "按摩或溫敷整個背部的膀胱經", explanation: "壓力會導致交感神經過度亢奮。按摩背部膀胱經可以直接調節自律神經，幫助身體切換至放鬆的副交感神經模式，從而改善睡眠。", category: "應用理解"},
    {id: 22, question: "按摩「肝俞穴」有什麼主要功用？", answer: "疏肝理氣、調節情緒", explanation: "肝主疏泄，與情緒壓力關係密切。當感到鬱悶、煩躁或壓力大時，按摩肝俞穴有助於疏通肝氣，讓心情舒暢。", category: "實踐技巧"},
    {id: 23, question: "膀胱經的起點「睛明穴」在哪裡？", answer: "在眼內角的凹陷處", explanation: "膀胱經始於睛明穴，這也是為什麼刺激膀胱經能夠改善眼睛疲勞、提升眼部循環的原因。", category: "膀胱經"},
    {id: 24, question: "硫磺泉（臭蛋湯）對哪一類問題有較好的輔助效果？", answer: "慢性皮膚病", explanation: "硫磺具有解毒、殺菌、軟化角質的作用，因此對於部分慢性皮膚病，如乾癬、慢性濕疹等，有不錯的輔助療效。", category: "溫泉療法"},
    {id: 25, question: "「子午流注」理論對日常養生有何指導意義？", answer: "提示我們在特定時間做對應的保養，可以事半功倍", explanation: "例如，在申時（15-17點）膀胱經當令時多喝水，在子時（23-1點）膽經當令時入睡，順應身體的自然節律，養生效果最好。", category: "應用理解"},
    {id: 26, question: "食鹽泉（氯化物泉）泡完後，為何保溫效果特別好？", answer: "因為鹽分會在皮膚上形成薄膜，減少汗液蒸發，從而鎖住熱量", explanation: "這個特性使得食鹽泉特別適合虛寒體質的人或在寒冷的冬天浸泡，能讓身體長時間保持溫暖。", category: "溫泉療法"},
    {id: 27, question: "按摩「脾俞穴」對應的主要是身體哪個系統的功能？", answer: "消化系統", explanation: "脾主運化，負責食物的消化與吸收。按摩脾俞穴可以健脾和胃，改善食慾不振、腹脹、消化不良等問題。", category: "實踐技巧"},
    {id: 28, question: "久坐族為何特別需要保養膀胱經？", answer: "因為久坐會直接壓迫經過臀部和腿後側的膀胱經，導致氣血不通", explanation: "長期壓迫會引起腰痠背痛、坐骨神經痛、下肢循環不良等問題。定時起身伸展、拍打經絡非常重要。", category: "應用理解"},
    {id: 29, question: "為何說膀胱經是人體的「陽中之陽」？", answer: "因其為太陽經，循行於背部（陽位），是陽氣最為旺盛的經絡", explanation: "膀胱經統領一身的陽氣，負責溫煦肌膚、抵禦外邪，是人體陽氣的總督導，其重要性不言而喻。", category: "膀胱經"},
    {id: 30, question: "除了泡溫泉，影片還建議了哪種溫和的「被動式」家庭養生法？", answer: "用熱毛巾溫敷後頸與背部", explanation: "這個簡單的方法可以模擬溫泉的熱效應，放鬆僵硬的肌肉，促進膀胱經的循環，並有助於調節自律神經，改善睡眠。", category: "實踐技巧"},
    {id: 31, question: "曬太陽對「膽固醇」有何重要作用？", answer: "將皮膚下的膽固醇轉化為人體必需的「維生素D」", explanation: "陽光中的UVB是啟動這個轉化的鑰匙。膽固醇並非壞東西，而是製造維生素D、荷爾蒙等重要物質的珍貴原料。", category: "陽光養生"},
    {id: 32, question: "曬太陽補充陽氣，最好曬哪個部位？", answer: "後背，尤其是脊椎（督脈）及兩側（膀胱經）", explanation: "後背是人體「諸陽之海」的督脈和膀胱經的所在，是陽氣匯集之處。曬後背是補充和激發全身陽氣最高效的方法。", category: "陽光養生"},
    {id: 33, question: "膽固醇在人體中有哪些重要功能？", answer: "構成細胞膜、合成荷爾蒙（性荷爾蒙、壓力荷爾蒙）、轉化為維生素D", explanation: "膽固醇是維持人體正常生理機能不可或缺的物質，盲目地追求低膽固醇可能導致荷爾蒙失調、免疫力下降等問題。", category: "基礎概念"},
    {id: 34, question: "影片建議的最佳曬太陽時間是？", answer: "上午9-10點或下午3-4點，陽光較溫和、不易曬傷的時段", explanation: "選擇正確的時間，既能獲得足夠的UVB來合成維生素D，又能避免正午烈日對皮膚的傷害。", category: "實踐技巧"},
    {id: 35, question: "曬太陽後，身體可能會流失津液，建議如何補充？", answer: "喝溫開水，或在水中加少許天然的海鹽", explanation: "曬太陽會溫和地發汗，補充溫水和微量電解質（鹽），能最有效地恢復體內平衡，避免因冰飲損傷陽氣。", category: "實踐技巧"},
    {id: 36, question: "總督一身陽氣，被稱為「諸陽之海」的經絡是哪一條？", answer: "督脈", explanation: "督脈循行於背部正中，是所有陽經的總匯。曬太陽時讓陽光直射督脈，是補充人體陽氣的關鍵。", category: "陽光養生"},
    {id: 37, question: "人體合成維生素D需要陽光中的哪種光線？", answer: "UVB（中波紫外線）", explanation: "普通玻璃會過濾掉大部分UVB，因此隔著窗戶曬太陽無法有效合成維生素D。需要讓皮膚直接接觸陽光。", category: "基礎概念"},
    {id: 38, question: "維生素D對於人體骨骼健康有何重要性？", answer: "促進鈣質的吸收，維持骨密度", explanation: "如果缺乏維生素D，即使補充再多的鈣，人體也無法有效吸收利用，容易導致骨質疏鬆、兒童佝僂病等問題。", category: "應用理解"},
    {id: 39, question: "曬太陽為何能改善情緒，帶來愉悅感？", answer: "陽光能促進大腦分泌「血清素」（快樂荷爾蒙）", explanation: "血清素是調節情緒、睡眠和食慾的重要神經傳導物質。充足的日照是天然、無副作用的抗憂鬱劑。", category: "應用理解"},
    {id: 40, question: "「陽氣」在中醫裡代表什麼？", answer: "人體的能量、溫暖、動力與防禦能力", explanation: "陽氣就像人體內的小太陽，提供溫煦、推動氣血、抵禦外邪。陽氣充足則精神飽滿、不易生病；陽氣虛弱則怕冷、疲倦。", category: "基礎概念"}
  ],
  quiz: [] // Initially empty, will be populated with 10 random questions
};

// Application state
let currentPage = 'home';
let studiedCards = new Set();
let currentFlashcardIndex = 0;
let currentQuizIndex = 0;
let quizAnswers = [];
let quizCompleted = false;

// Utility functions
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
  initializeNavigation();
  initializeVideoCards();
  initializeFlashcardsPage();
  initializeQuiz();
  updateProgress();
});

// Navigation functionality
function initializeNavigation() {
  const navButtons = document.querySelectorAll('.nav-btn');
  
  navButtons.forEach(button => {
    button.addEventListener('click', function() {
      const targetPage = this.dataset.page;
      navigateToPage(targetPage);
    });
  });
}

function navigateToPage(page) {
  // Hide current page
  document.querySelector('.page-content.active').classList.remove('active');
  
  // Show target page
  document.getElementById(`page-${page}`).classList.add('active');
  
  // Update navigation
  document.querySelector('.nav-btn.active').classList.remove('active');
  document.querySelector(`[data-page="${page}"]`).classList.add('active');
  
  currentPage = page;
  updateProgress();
  
  // Special handling for specific pages
  if (page === 'flashcards') {
    updateFlashcardStats();
  } else if (page === 'quiz') {
    // Start a new quiz only if one hasn't been started for this session
    if (appData.quiz.length === 0) {
        startNewQuiz();
    } else {
        displayCurrentQuizQuestion();
    }
  } else if (page === 'summary') {
    updateSummaryStats();
  }
}

// Progress tracking
function updateProgress() {
  const pages = ['home', 'theory', 'practice', 'flashcards', 'quiz', 'summary'];
  const currentIndex = pages.indexOf(currentPage);
  const progressPercent = ((currentIndex + 1) / pages.length) * 100;
  
  document.getElementById('progressBar').style.width = `${progressPercent}%`;
}

// Video cards functionality
function initializeVideoCards() {
  const videoCards = document.querySelectorAll('.video-card');
  
  videoCards.forEach(card => {
    card.addEventListener('click', function(e) {
      if (e.target.tagName !== 'BUTTON') {
        const url = this.dataset.url;
        window.open(url, '_blank');
      }
    });
    
    const button = card.querySelector('.btn');
    if (button) {
      button.addEventListener('click', function(e) {
        e.stopPropagation();
        const url = card.dataset.url;
        window.open(url, '_blank');
      });
    }
  });
}

// Flashcards functionality
function initializeFlashcardsPage() {
    const card = document.getElementById('flashcardDisplayCard');
    if (card) {
        card.addEventListener('click', flipDisplayedFlashcard);
    }

    const prevBtn = document.getElementById('flashcardPrevBtn');
    const nextBtn = document.getElementById('flashcardNextBtn');

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => navigateFlashcards(-1));
        nextBtn.addEventListener('click', () => navigateFlashcards(1));
    }
    
    displayCurrentFlashcard(); // Initial display
}

function displayCurrentFlashcard() {
    const cardData = appData.flashcards[currentFlashcardIndex];
    const cardElement = document.getElementById('flashcardDisplayCard');

    if (!cardData || !cardElement) return;

    // Reset flip state
    cardElement.classList.remove('flipped');

    // Populate content - using timeout to allow flip animation to reset
    setTimeout(() => {
      document.getElementById('flashcardQuestion').textContent = cardData.question;
      document.getElementById('flashcardAnswer').textContent = cardData.answer;
      document.getElementById('flashcardExplanation').textContent = cardData.explanation;
      document.getElementById('flashcardCategory').textContent = cardData.category;
    }, 150);
    
    // Update counter
    document.getElementById('currentCard').textContent = currentFlashcardIndex + 1;
    document.getElementById('totalFlashcards').textContent = appData.flashcards.length;

    // Update nav buttons
    document.getElementById('flashcardPrevBtn').disabled = currentFlashcardIndex === 0;
    document.getElementById('flashcardNextBtn').disabled = currentFlashcardIndex === appData.flashcards.length - 1;

    // Mark as studied
    if (!studiedCards.has(cardData.id)) {
        studiedCards.add(cardData.id);
        updateFlashcardStats();
    }
}

function flipDisplayedFlashcard() {
    document.getElementById('flashcardDisplayCard').classList.toggle('flipped');
}

function navigateFlashcards(direction) {
    const newIndex = currentFlashcardIndex + direction;
    if (newIndex >= 0 && newIndex < appData.flashcards.length) {
        currentFlashcardIndex = newIndex;
        displayCurrentFlashcard();
    }
}

function updateFlashcardStats() {
  document.getElementById('totalCards').textContent = appData.flashcards.length;
  document.getElementById('studiedCards').textContent = studiedCards.size;
}

// Quiz functionality
function startNewQuiz() {
    appData.quiz = shuffleArray(fullQuizBank).slice(0, 10);
    currentQuizIndex = 0;
    quizAnswers = new Array(appData.quiz.length).fill(null);
    quizCompleted = false;
    
    displayCurrentQuizQuestion();
}

function initializeQuiz() {
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const restartBtn = document.getElementById('restartQuizBtn');
  
  prevBtn.addEventListener('click', () => navigateQuiz(-1));
  nextBtn.addEventListener('click', () => {
    navigateQuiz(1)
  });
  restartBtn.addEventListener('click', startNewQuiz);
}

function displayCurrentQuizQuestion() {
  if (appData.quiz.length === 0) return;

  const question = appData.quiz[currentQuizIndex];
  const questionContainer = document.getElementById('quizQuestion');
  const optionsContainer = document.getElementById('quizOptions');
  const explanationContainer = document.getElementById('quizExplanation');
  
  document.getElementById('currentQuestion').textContent = currentQuizIndex + 1;
  document.getElementById('totalQuestions').textContent = appData.quiz.length;
  
  questionContainer.innerHTML = `<h3>${question.question}</h3>`;
  
  optionsContainer.innerHTML = '';
  question.options.forEach((option, index) => {
    const optionDiv = document.createElement('div');
    optionDiv.className = 'quiz-option';
    optionDiv.textContent = option;
    optionDiv.dataset.optionIndex = index;
    
    if (quizAnswers[currentQuizIndex] === index) {
      optionDiv.classList.add('selected');
    }
    
    if (quizAnswers[currentQuizIndex] !== null) {
      if (index === question.correct) {
        optionDiv.classList.add('correct');
      } else if (quizAnswers[currentQuizIndex] === index && index !== question.correct) {
        optionDiv.classList.add('incorrect');
      }
    }
    
    optionDiv.addEventListener('click', () => selectQuizOption(index));
    optionsContainer.appendChild(optionDiv);
  });
  
  if (quizAnswers[currentQuizIndex] !== null) {
    explanationContainer.innerHTML = `<strong>解析：</strong>${question.explanation}`;
    explanationContainer.classList.remove('hidden');
  } else {
    explanationContainer.classList.add('hidden');
  }
  
  updateQuizNavigation();
}

function selectQuizOption(optionIndex) {
  if (quizAnswers[currentQuizIndex] !== null) {
    return; // Already answered
  }
  
  quizAnswers[currentQuizIndex] = optionIndex;
  displayCurrentQuizQuestion();
  checkQuizCompletion();
}

function navigateQuiz(direction) {
  const newIndex = currentQuizIndex + direction;
  
  if (newIndex >= 0 && newIndex < appData.quiz.length) {
    currentQuizIndex = newIndex;
    displayCurrentQuizQuestion();
  }
}

function updateQuizNavigation() {
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  
  prevBtn.disabled = currentQuizIndex === 0;
  nextBtn.disabled = currentQuizIndex === appData.quiz.length - 1;
}

function checkQuizCompletion() {
  const answeredCount = quizAnswers.filter(answer => answer !== null).length;
  
  if (answeredCount === appData.quiz.length) {
    quizCompleted = true;
  }
}

function calculateQuizScore() {
  let correct = 0;
  
  quizAnswers.forEach((answer, index) => {
    if (answer === appData.quiz[index].correct) {
      correct++;
    }
  });
  
  return {
    correct,
    total: appData.quiz.length,
    percentage: appData.quiz.length > 0 ? Math.round((correct / appData.quiz.length) * 100) : 0
  };
}

// Summary page functionality
function updateSummaryStats() {
  const flashcardProgress = appData.flashcards.length > 0 ? studiedCards.size / appData.flashcards.length : 0;
  const quizProgress = quizCompleted ? 1 : (quizAnswers.filter(a => a !== null).length / (appData.quiz.length || 10)) * 0.8;
  const overallProgress = Math.round(((flashcardProgress * 0.5) + (quizProgress * 0.5)) * 100);
  document.getElementById('overallProgress').textContent = `${overallProgress}%`;
  
  if (quizCompleted) {
    const score = calculateQuizScore();
    document.getElementById('quizScore').textContent = `${score.correct}/${score.total} (${score.percentage}%)`;
  } else if (appData.quiz.length > 0) {
    const answeredCount = quizAnswers.filter(answer => answer !== null).length;
    document.getElementById('quizScore').textContent = `進行中 (${answeredCount}/${appData.quiz.length})`;
  } else {
     document.getElementById('quizScore').textContent = '未開始';
  }
  
  document.getElementById('flashcardProgress').textContent = `${studiedCards.size}/${appData.flashcards.length}`;
}

// Keyboard navigation
document.addEventListener('keydown', function(e) {
  if (currentPage === 'flashcards') {
      if (e.key === 'ArrowLeft') {
          navigateFlashcards(-1);
      } else if (e.key === 'ArrowRight') {
          navigateFlashcards(1);
      } else if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          flipDisplayedFlashcard();
      }
  } else if (currentPage === 'quiz') {
    if (e.key === 'ArrowLeft') {
      navigateQuiz(-1);
    } else if (e.key === 'ArrowRight') {
      navigateQuiz(1);
    } else if (e.key >= '1' && e.key <= '4') {
      const optionIndex = parseInt(e.key) - 1;
      if (appData.quiz[currentQuizIndex] && optionIndex < appData.quiz[currentQuizIndex].options.length) {
        selectQuizOption(optionIndex);
      }
    }
  }
});