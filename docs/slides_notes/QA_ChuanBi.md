# Câu hỏi có thể bị hỏi: Seminar S01 PSO

> Soạn theo slide 10 phút, `Report.tex` (bản v_max = 10.24) và ghi chú hai bài báo (`docs/notes/`). Mỗi câu có: **ý chính** (tiếng Việt, để hiểu) và **Say** (câu trả lời mẫu bằng tiếng Anh, 2–4 câu, đọc được ngay). Số liệu lấy từ báo cáo; câu nào là suy luận của nhóm thì ghi rõ "có thể" hoặc "we think".
>
> Ba file `qa_practice_member*.md` cũ dùng số liệu bản v_max = 2.0, nên dùng file này thay thế.
>
> Số slide ghi trong ngoặc là số hiện ở góc phải dưới của slide (1 = slide tiêu đề).
>
> Đề S01 yêu cầu mỗi thành viên trả lời ít nhất một câu. Gợi ý người trả lời ghi ở cuối mỗi câu: TV1 (lý thuyết, bài báo), TV2 (công thức, ví dụ, setup), TV3 (kết quả, phản biện).

---

## A. Lý thuyết và bài báo gốc

**A1. PSO bắt nguồn từ đâu?** *(TV1, slide 3)*
- Ý chính: từ mô phỏng hành vi xã hội (đàn chim, đàn cá), không phải từ lý thuyết tối ưu. Kennedy & Eberhart dựa vào lập luận của Wilson: mỗi con cá hưởng lợi từ những gì cả đàn phát hiện khi thức ăn phân bố khó đoán. Họ bỏ dần các phần chỉ để mô phỏng trông thật (craziness, khớp vận tốc với hàng xóm) và giữ lại pbest, gbest.
- Say: *PSO came from simulations of bird flocks, not from optimisation theory. Kennedy and Eberhart's key hypothesis was that individuals profit from what the whole group discovers. When they removed the parts that only made the flock look realistic, pbest and gbest were the two memories that had to stay.*

**A2. Vì sao cần cả pbest lẫn gbest?** *(TV1, slide 4)*
- Ý chính: bài 1995 (tr. 1945) thử bỏ từng phần và thấy cả hai đều cần. g_inc ≫ p_inc thì đàn lao vội vào cực tiểu địa phương; p_inc ≫ g_inc thì từng cá thể đi lang thang. Hai lực gần bằng nhau là tốt nhất. pbest giữ đa dạng (khám phá), gbest tập trung đàn (khai thác).
- Say: *The 1995 paper found both memories necessary. A much stronger pull to gbest made the flock rush prematurely into local minima; a much stronger pull to pbest made particles wander. Roughly equal pulls worked best, which is exactly the exploration–exploitation balance in our guiding question.*

**A3. p_inc và g_inc là gì, bằng bao nhiêu?** *(TV1, slide 4)*
- Ý chính: là hai tham số kích thước bước do người làm thí nghiệm chọn; mỗi bước vận tốc cộng hoặc trừ một lượng ngẫu nhiên trong [0, inc]. Bài báo chỉ so sánh lớn và nhỏ, không đưa giá trị chuẩn. Ở bản cuối 1995, cả hai được thay bằng hệ số 2.
- Say: *They are step-size parameters chosen by the experimenter, not fixed constants. The paper compared high and low values and their ratio rather than giving one setting. In the final 1995 version they were replaced by a factor 2, because there was no good way to guess which should be larger.*

**A4. Vì sao hệ số là 2?** *(TV1, slide 5)*
- Ý chính: rand() đều trên [0, 1] nên 2·rand() có trung bình 1. Hạt trung bình đi đúng tới mục tiêu, nên khoảng một nửa số lần sẽ vượt qua mục tiêu (overshoot), giúp khám phá vùng phía bên kia.
- Say: *rand() is uniform on [0, 1], so 2·rand() has a mean of 1. On average a particle steps exactly onto its target, so it overshoots about half the time, which the authors saw as a way to explore beyond known good points.*

**A5. Vì sao không bỏ vận tốc cũ v?** *(TV1, slide 5)*
- Ý chính: tác giả 1995 đã thử bản không có v cũ và thấy nó "quite ineffective at finding global optima". Không có quán tính, mỗi bước chỉ trỏ về pbest và gbest, đàn co cụm nhanh và mất khả năng khám phá.
- Say: *The authors tried a version without the old velocity and called it "quite ineffective at finding global optima". Without momentum each step only points at the two best positions, so the swarm contracts too quickly and stops exploring.*

**A6. v_max và ω khác nhau thế nào? Đã có ω sao còn giữ v_max?** *(TV2, slide 6)*
- Ý chính: v_max cắt cứng từng tọa độ vận tốc; giá trị tốt phụ thuộc bài toán và nó chỉ "cắt" dao động chứ không làm hạt chậm dần. ω < 1 hãm vận tốc một cách trơn (1 − ω như ma sát). Khi có ω, v_max chỉ cần đặt rộng (V_max = X_max, Poli et al. 2007); nhóm giữ v_max = 10.24 để chặn những bước quá lớn lúc đầu, vì vận tốc ban đầu lấy ngẫu nhiên trong ±10.24.
- Say: *v_max clips each velocity coordinate; a good value depends on the problem and it only cuts the swings. ω damps the velocity smoothly, like friction. With ω in place, v_max only needs to be wide, so we set it to the domain width, 10.24, following the V_max = X_max rule in Poli et al.*

**A7. Vì sao chọn ω = 0.7 và c₁ = c₂ = 1.5?** *(TV2, slide 8)*
- Ý chính: Poli et al. (2007, Sect. 2.4) cho thấy bộ tham số co (constriction) chuẩn χ ≈ 0.7298 tương đương ω = 0.7298, c₁ = c₂ ≈ 1.49618. Nhóm làm tròn thành 0.7 và 1.5, rồi thử thêm ω = 0.4 và 0.9.
- Say: *Poli et al. show that the standard constriction setting is algebraically equivalent to ω ≈ 0.73 and c₁ = c₂ ≈ 1.5. We rounded these values for our default and then varied ω to 0.4 and 0.9.*

**A8. Constriction χ là gì, khác ω thế nào?** *(TV1, slide dự phòng B2)*
- Ý chính: χ nhân với toàn bộ vế phải của phương trình vận tốc (Clerc & Kennedy 2002). Phân tích ổn định của mô hình đơn giản cho cách chọn χ để hạt hội tụ mà không cần v_max. Về đại số, χ ≈ 0.7298 với φ = 4.1 tương đương một PSO có ω.
- Say: *Constriction scales the whole velocity update instead of only the old velocity. A stability analysis of a simplified model shows how to choose it so particles converge without v_max. Its usual setting is algebraically the same as an inertia PSO with ω ≈ 0.73 and c ≈ 1.5.*

**A9. Topology là gì? Nhóm dùng loại nào?** *(TV1, slide dự phòng B2)*
- Ý chính: là mạng quyết định hạt nhìn thấy best của ai. gbest: cả đàn nhìn một best chung, hội tụ nhanh. lbest (vòng): chỉ nhìn hàng xóm, chậm hơn nhưng ít bị kẹt hơn. Poli et al. (Sect. 3.1): không topology nào tốt nhất trên mọi hàm. Nhóm chỉ dùng gbest.
- Say: *The topology decides whose best a particle can see. In gbest everyone sees the swarm's best, which converges fast; in an lbest ring each particle sees only its neighbours, which is slower but less often trapped. We used only gbest, which is one of our limitations.*

**A10. Vì sao r₁, r₂ phải sinh mới cho từng hạt, từng chiều, từng vòng?** *(TV2, slide 6)*
- Ý chính: đó là phép nhân từng thành phần trong dạng chuẩn. Nếu chỉ một số ngẫu nhiên cho cả hạt, mọi chiều bị kéo cùng một tỉ lệ, hạt chỉ di chuyển trên một số hướng cố định và đàn kém đa dạng.
- Say: *That is the component-wise product in the standard form. With one random number per particle, every coordinate would be pulled by the same fraction, so the directions a particle can take would be restricted.*

**A11. Đề bài viết x(t+1) = x(t) + v(t), sao nhóm dùng v(t+1)?** *(TV2, slide 7)*
- Ý chính: vận tốc được cập nhật trước, rồi hạt đi bằng vận tốc mới. Đây là dạng trong Algorithm 1 và Eq. 2 của Poli et al. (2007), báo cáo có ghi rõ lựa chọn này. Dùng v(t) sẽ bỏ qua lực hút vừa tính ở cùng bước.
- Say: *We update the velocity first and move with the new velocity, which is the form in Poli et al., Algorithm 1 and Eq. 2. Using the old velocity would ignore the attraction computed in the same step. The report states this choice explicitly.*

**A12. Có chứng minh PSO luôn hội tụ về cực tiểu toàn cục không?** *(TV1 hoặc TV3, slide 12)*
- Ý chính: không. Poli et al. (Sect. 5) nói chưa có mô hình toán học đầy đủ; các phân tích hội tụ dùng hệ đơn giản (một hạt, một chiều, không ngẫu nhiên). Van den Bergh (2002) chỉ ra hạt có thể hội tụ về một điểm không phải cực tiểu. Thí nghiệm bị kẹt của nhóm minh họa đúng điều này.
- Say: *No. Poli et al. state there is no comprehensive mathematical model of PSO, and the convergence analyses use simplified one-particle systems. One analysis shows a particle can converge to a point that is not an optimum, and our stuck-swarm diagnostic is an example of that.*

---

## B. Công thức và ví dụ tính tay

**B1. Vì sao số hạng cognitive bằng 0 ở bước đầu?** *(TV2, slide 7)*
- Ý chính: ở vòng 0, pbest của mỗi hạt chính là vị trí hiện tại, nên pbest − x = 0.
- Say: *At iteration 0 each pbest equals the particle's own position, so pbest − x is zero. The cognitive term only acts after a particle has moved away from its best point.*

**B2. Vì sao P2 (gbest) lại tệ đi?** *(TV2, slide 7)*
- Ý chính: P2 là gbest nên social cũng bằng 0, cognitive bằng 0, chỉ còn quán tính 0.7·(−0.5) = −0.35 đẩy nó ra xa cực tiểu: x từ −2 thành −2.35, f từ 4 lên 5.5225. Không có gì kéo nó lại trong bước này.
- Say: *Particle 2 is the global best, so both pulls are zero and only inertia moves it, from −2 to −2.35. Its fitness rises from 4 to 5.52, but the swarm's best still improves because particle 1 lands at −1.15.*

**B3. P1 vượt qua 0 rồi, vậy có phải xấu không?** *(TV2, slide 7)*
- Ý chính: không. Vượt mục tiêu (overshoot) là hành vi tác giả 1995 cố ý giữ lại (A4). f của P1 vẫn giảm từ 9 xuống 1.3225, và nó trở thành gbest mới.
- Say: *Overshooting is intended: it lets particles explore past their targets. Particle 1 still improves from 9 to 1.32 and becomes the new global best.*

**B4. Ở ví dụ 5 hạt, vì sao gbest đứng yên ở 0.37 từ vòng 1 đến vòng 5?** *(TV3, slide 9)*
- Ý chính: chỉ 5 hạt và 5 vòng, nên đây là minh họa chứ không phải một lần chạy hội tụ. Vận tốc ban đầu lấy trong ±10.24 nên vài hạt bị đẩy ra biên ở vòng 1 (tọa độ 5.12). Hạt 3 tình cờ rơi gần gốc (0.37); 4 vòng sau chưa hạt nào tìm được điểm tốt hơn.
- Say: *With only five particles and five iterations this is an illustration, not a convergence run. The initial velocities are as large as the domain, so several particles hit the boundary at iteration 1. Particle 3 happened to land near the origin, and no particle beat 0.37 in the next four iterations.*

**B5. Làm sao biết code đúng công thức?** *(TV2, slide 9)*
- Ý chính: notebook tính lại bằng tay bước cập nhật đầu tiên của cả 5 hạt từ giá trị đã ghi và kiểm tra khớp (báo cáo có tính chi tiết hạt 2). Notebook cũng tái hiện ví dụ 1 chiều và chạy lại một tổ hợp để so với CSV đã lưu.
- Say: *The notebook recomputes the first update of all five particles from the logged values and asserts that they match; the report shows particle 2 step by step. It also reproduces the one-dimensional example and replays saved runs against the CSV files.*

**B6. Hạt ra khỏi miền thì xử lý thế nào?** *(TV2, slide 8)*
- Ý chính: kẹp vị trí về biên gần nhất (5.12 hoặc −5.12). Poli et al. (Sect. 7.2) nói chưa có cách xử lý được thống nhất; kẹp là cách đơn giản nhất. Nhược điểm: hạt dồn ở biên, như vòng 1 của ví dụ 5 hạt.
- Say: *Positions outside the domain are moved to the nearest boundary. Poli et al. list boundary handling as an open question; clipping is the simplest choice, and it explains the 5.12 values in our five-particle table.*

---

## C. Thực nghiệm

**C1. Vì sao 2,020 lượt đánh giá?** *(TV2, slide 8)*
- Ý chính: 20 hạt đánh giá một lần lúc khởi tạo và một lần mỗi vòng trong 100 vòng: 20 + 20 × 100 = 2,020. Random Search và Hill Climbing nhận đúng số lượt này, tính cả khởi tạo và các bước bị từ chối.
- Say: *Twenty particles are evaluated once at the start and once per iteration for 100 iterations: 20 plus 2,000. Both baselines get exactly the same number of evaluations, counting initialisation and rejected proposals.*

**C2. Vì sao so theo số lượt đánh giá, không theo số vòng lặp?** *(TV3, slide 11)*
- Ý chính: một vòng PSO tốn 20 lượt, một bước Hill Climbing tốn 1 lượt. So theo vòng thì không công bằng. Random Search và Hill Climbing cũng không có khái niệm "vòng".
- Say: *One PSO iteration costs 20 evaluations and one Hill Climbing step costs one. Counting evaluations gives every method the same cost, and the baselines have no iterations anyway.*

**C3. Biểu đồ fitness theo iteration: trục dọc là gì?** *(TV3, slide 10)*
- Ý chính: best fitness đến thời điểm đó, f(gbest), trung bình trên 5 seed, thang log. Dải xám là min–max của 5 seed. Đường ω = 0.4 nằm phẳng ở 10⁻¹⁶ là do sàn hiển thị (log của 0 không vẽ được), giá trị thật nhỏ hơn.
- Say: *The y-axis is the best fitness found so far, f of gbest, averaged over five seeds on a log scale. The band is the best and worst seed. Values below 10⁻¹⁶ are floored only for display.*

**C4. Rastrigin ra 0, có thật là 0 không?** *(TV3, slide 10)*
- Ý chính: không chính xác. Rastrigin tính bằng hiệu hai số gần 20, nên giá trị dưới khoảng 10⁻¹³ là sai số làm tròn. Nhóm hiểu là "đã tới cực tiểu toàn cục".
- Say: *Not exactly. Rastrigin is computed as a difference of two numbers close to 20, so values below about 10⁻¹³ are floating-point rounding. We read them as reaching the global minimum.*

**C5. Năm seed có đủ không?** *(TV3, slide 10 và 13)*
- Ý chính: đủ để minh họa và kiểm tra tái lập, không đủ để kết luận có ý nghĩa thống kê. Một lần chạy có thể chi phối trung bình (ω = 0.9 trên Rastrigin: một lần 0.67, bốn lần còn lại dưới 0.07). Khác biệt kiểu 10⁻³⁰ với 10⁻¹² không có ý nghĩa thực tế.
- Say: *Five seeds are enough to illustrate behaviour and check reproducibility, not to claim significance. One run can dominate a mean: for ω = 0.9 on Rastrigin one run ended at 0.67 while the other four were below 0.07. So we report best and worst, not only means.*

**C6. Hill Climbing tới 0.01 nhanh hơn trên Sphere, vậy nó tốt hơn PSO?** *(TV3, slide 11)*
- Ý chính: tùy mục tiêu. HC tới 0.01 sau trung bình 42.6 lượt, PSO 216 lượt (vì mỗi vòng PSO tốn 20 lượt và PSO chỉ được ghi nhận cuối mỗi lô 20). Nhưng sau đó HC chậm lại (có thể vì bước cố định σ = 0.3 khó tinh chỉnh gần gốc), kết thúc ở 2.6 × 10⁻⁴; PSO tiếp tục giảm tới 1.0 × 10⁻¹².
- Say: *It depends on the goal. Hill Climbing reached 0.01 first, after about 43 evaluations against 216 for PSO, because each PSO step costs 20 evaluations. But it then slowed down, probably because of its fixed step size, and it finished at 2.6 × 10⁻⁴ while PSO reached 10⁻¹².*

**C7. Vì sao trên Rastrigin, Random Search lại tốt hơn Hill Climbing?** *(TV3, slide 11)*
- Ý chính: Random Search lấy mẫu đều khắp miền nên thử điểm ở nhiều lưu vực khác nhau (trung bình 1.23). HC một lần khởi đầu, chỉ nhận bước tốt hơn với bước cố định, nên hầu như không rời lưu vực đầu tiên (trung bình 5.2). Không cái nào tới 0.01; PSO tới trong cả 5 lần.
- Say: *Random Search samples the whole domain, so it keeps trying different basins. Our single-start Hill Climbing accepts only improvements with a fixed step, so it rarely leaves the first basin it reaches. Neither reached 0.01, while all five PSO runs did.*

**C8. So sánh có công bằng không? HC có restart thì sao?** *(TV3, slide dự phòng B4)*
- Ý chính: cùng seed, cùng ngân sách, tính chi phí bằng lượt đánh giá. Nhưng HC chỉ có một bước σ = 0.3 và không restart; HC có restart ngẫu nhiên sẽ là đối thủ mạnh hơn. Đây là giới hạn đã ghi trong báo cáo.
- Say: *Same seeds and the same evaluation budget for every method. But our Hill Climbing has one step size and no restarts; a random-restart version would be a stronger baseline, and we list that as a limitation.*

**C9. Trường hợp bị kẹt: làm sao biết đó là cực tiểu địa phương?** *(TV3, slide 12)*
- Ý chính: seed 0 dừng ở gần (0, −0.994959) với f = 0.994959, trong khi cực tiểu toàn cục là 0. Báo cáo kiểm tra đó là điểm dừng của Rastrigin (một lưu vực gần tọa độ nguyên). Độ phân tán của đàn giảm từ 4.18 xuống 3 × 10⁻⁹, tức cả đàn co về một điểm.
- Say: *Seed 0 ended near (0, −0.995) with fitness 0.995, while the global minimum is 0, and we verified that point is a local minimum of Rastrigin. The swarm's spread fell from 4.18 to about 3 × 10⁻⁹, so all particles collapsed onto that one point.*

**C10. Thí nghiệm bị kẹt có chứng minh c₂ lớn gây kẹt không?** *(TV3, slide 12)*
- Ý chính: không. Nó đổi cùng lúc ω, c₁, c₂ và số hạt, và chỉ dùng 505 lượt so với 2,020 của bản mặc định. Nó chỉ minh họa cách đàn mất đa dạng. Muốn tách nguyên nhân phải thay từng tham số một.
- Say: *No. The diagnostic changes ω, c₁, c₂ and the number of particles at once, and uses 505 evaluations against 2,020. It shows how a swarm can collapse, but a controlled sweep that changes one factor at a time would be needed to name the cause.*

---

## D. Lý thuyết nói một đằng, thực nghiệm ra một nẻo?

**D1. Lý thuyết: ω cao thì khám phá, nên tốt cho hàm nhiều cực tiểu. Nhưng trên Rastrigin, ω = 0.4 (thấp) lại tốt nhất, ω = 0.9 tệ nhất. Giải thích?** *(TV3, slide 10)*
- Ý chính: "ω cao khám phá" không có nghĩa là "ω cao luôn tốt trên hàm đa cực trị". Có vài lý do khả dĩ (đây là cách nhóm hiểu, chưa tách riêng từng yếu tố):
  - Ngân sách chỉ 100 vòng: với ω = 0.9 đàn còn dao động mạnh khi hết lượt, chưa kịp tinh chỉnh (Sphere cũng vậy: 3.6 × 10⁻⁴).
  - Bài toán nhỏ: 2 chiều, 20 hạt rải đều trên miền đã phủ khá tốt, nên phần khám phá lúc đầu đã đủ; điều quyết định là khai thác.
  - Rastrigin có dạng "cái bát lớn có gợn sóng": gbest kéo đàn về đáy bát chung, nên khai thác mạnh vẫn tới được 0.
  - Kết quả phụ thuộc v_max: với v_max ≤ 5.12, một lần chạy ω = 0.4 bị kẹt ở 0.995 và ω = 0.7 thành tốt nhất (slide dự phòng B3). Tức là ω thấp có rủi ro kẹt, chỉ là lần này không xảy ra với v_max = 10.24.
- Say: *High ω explores, but exploration only pays if there is time to refine afterwards. With 100 iterations in two dimensions, 20 particles already cover the domain well, and ω = 0.9 was still moving too much when the budget ran out. The ranking is fragile: with a tighter v_max one ω = 0.4 run got stuck and ω = 0.7 became best.*

**D2. Poli et al. khuyến nghị ω ≈ 0.73, sao thực nghiệm lại cho ω = 0.4 tốt nhất?** *(TV2 hoặc TV3, slide 10)*
- Ý chính: khuyến nghị 0.73 là một thiết lập an toàn chung, rút từ phân tích ổn định, không phải tối ưu cho mọi bài. Bài của nhóm nhỏ và dễ (2-D, cực tiểu ở tâm), nên khai thác mạnh có lợi. Ngoài ra ω = 0.7 vẫn tới gần 0 trên cả hai hàm và ổn định hơn khi đổi v_max.
- Say: *The 0.73 setting is a robust general choice from a stability analysis, not the best value for every problem. Our test problems are small and centred, so strong exploitation paid off. ω = 0.7 still reached near zero on both functions and was more stable when we changed v_max.*

**D3. Lý thuyết (1995): g_inc quá lớn → đàn lao vội vào cực tiểu địa phương. Thực nghiệm có thấy không?** *(TV3, slide 12)*
- Ý chính: có, ở thí nghiệm chẩn đoán: c₂ = 2.5 lớn hơn nhiều so với c₁ = 0.5, cùng với ít hạt, cả 20 lần chạy dừng trên 0.9 và đàn co về một điểm. Khớp với quan sát năm 1995. Nhưng vì đổi nhiều tham số cùng lúc nên chỉ là "phù hợp với", không phải "chứng minh" (xem C10).
- Say: *Yes, in our diagnostic: with c₂ much larger than c₁ and only five particles, all 20 runs ended above 0.9 and the swarm collapsed onto one point. That matches the 1995 observation, but because several settings changed together it is consistent with the theory rather than proof of it.*

**D4. Nhưng ω = 0.4 vừa tốt nhất ở slide inertia, vừa có mặt trong cấu hình bị kẹt. Mâu thuẫn không?** *(TV3, slide 10 và 12)*
- Ý chính: không mâu thuẫn. ω = 0.4 với c₁ = c₂ = 1.5 và 20 hạt tới cực tiểu toàn cục cả 5 lần. Cấu hình bị kẹt khác ở chỗ lực xã hội mạnh (c₂ = 2.5, c₁ = 0.5) và chỉ 5 hạt. Vậy ω thấp một mình không gây kẹt; chính sự mất cân bằng pbest/gbest và đàn nhỏ mới là các yếu tố khả nghi.
- Say: *No. With balanced pulls and 20 particles, ω = 0.4 reached the global minimum in all five runs. The stuck setting also has a much stronger social pull and only five particles. So low inertia alone did not cause the collapse; the imbalance and the small swarm are the likely contributors.*

**D5. Lý thuyết: Hill Climbing bị kẹt ở cực tiểu địa phương. Thực nghiệm có khớp không?** *(TV1 hoặc TV3, slide 3 và 11)*
- Ý chính: khớp trên Rastrigin: HC kết thúc trung bình 5.2, tệ hơn cả Random Search, không lần nào tới 0.01. Nhưng trên Sphere (chỉ một lưu vực) HC lại tới 0.01 nhanh nhất, đúng như lý thuyết: không có cực tiểu địa phương thì leo dốc là đủ.
- Say: *Yes. On Rastrigin our Hill Climbing averaged 5.2 and never reached 0.01, worse even than Random Search. On Sphere, with a single basin, it was the fastest to reach 0.01, which is what the theory predicts when there is no local minimum to get stuck in.*

**D6. Lý thuyết nói PSO "chấp nhận mọi bước, kể cả bước tệ". Thực nghiệm thấy điều đó ở đâu?** *(TV2, slide 7 và 9)*
- Ý chính: ở cả hai ví dụ. Tính tay: P2 tệ đi (4 → 5.52) nhưng gbest tốt lên. 5 hạt: 3 trên 5 hạt tệ đi ở vòng 1 nhưng gbest giảm từ 8.26 xuống 0.37. Bước tệ không mất gì vì pbest và gbest chỉ đổi khi tốt hơn.
- Say: *In both worked examples. By hand, particle 2 got worse while the swarm's best improved. With five particles, three of five got worse at iteration 1, yet gbest dropped from 8.26 to 0.37. Bad moves cost nothing because the memories only change on improvement.*

**D7. Lý thuyết: v_max tốt phụ thuộc bài toán. Thực nghiệm cho thấy gì?** *(TV2 hoặc TV3, slide dự phòng B3)*
- Ý chính: đúng vậy. Trên Sphere, thứ hạng ω không đổi với mọi v_max. Trên Rastrigin, v_max ≤ 5.12 làm một lần chạy ω = 0.4 kẹt ở 0.995 và đổi thứ hạng; v_max = 10.24 hoặc không giới hạn thì cả 5 lần đều tới 0. Kết luận về ω gắn với v_max đã chọn.
- Say: *It did matter. On Sphere the ranking of ω held for every limit, but on Rastrigin a limit of 5.12 or less made one ω = 0.4 run stall at 0.995 and changed the ranking. So our conclusions about ω are tied to the velocity limit we chose.*

**D8. Poli et al. nói PSO có thể thiên về cực tiểu gần gốc tọa độ. Kết quả của nhóm có bị ảnh hưởng không?** *(TV3, slide 13)*
- Ý chính: có thể. Cả hai hàm có cực tiểu đúng ở tâm miền, nên kết quả có thể đẹp hơn thực tế. Cách kiểm tra: dùng hàm dịch (shifted) để cực tiểu nằm lệch tâm. Đây là giới hạn đã ghi.
- Say: *It might. Both our functions have their minimum at the centre of the domain, and Poli et al. mention a possible bias towards the origin. Shifted versions of the functions would be a fairer test; we list this as a limitation.*

**D9. Bài 1995 nói PSO train mạng nơ-ron tốt như backprop. Đó có phải bằng chứng mạnh?** *(TV1, không có trên slide, hỏi về bài báo)*
- Ý chính: không. Tác giả tự gọi kết quả EEG (92% so với 89%) là "informal indication": một bộ dữ liệu, ít lần chạy. Bằng chứng năm 1995 nhỏ; tổng quan 2007 cũng chỉ đếm số bài ứng dụng, không đo hiệu quả.
- Say: *No. The authors themselves call it an "informal indication": one EEG dataset, 92% against 89%. The 1995 evidence is small, and even the 2007 review counts application papers rather than measuring how well PSO performs in each field.*

---

## E. Ứng dụng và phản biện

**E1. Hai ứng dụng thực tế liên quan gì đến thí nghiệm của nhóm?** *(TV3, slide 13)*
- Ý chính: cả hai bài toán có nhiều cực trị địa phương, giống Rastrigin.
  - Pin mặt trời bị che bóng một phần (Alshareef et al. 2019): đường công suất có nhiều đỉnh; phương pháp cục bộ perturb-and-observe bị kẹt ở đỉnh thấp trong 2/3 kịch bản, giống HC trên Rastrigin.
  - Lập đường bay UAV (Phung & Ha 2021): một biến thể PSO (SPSO) có chi phí trung bình thấp hơn PSO cổ điển ở 6/8 kịch bản; tác giả cũng ghi nhận có lúc hội tụ về cực tiểu địa phương.
  - Lưu ý: họ dùng biến thể và thiết lập riêng, nên kết quả của nhóm không chuyển trực tiếp sang.
- Say: *Both problems have several local optima, like Rastrigin. In solar power tracking under partial shading, a local method got stuck on a lower peak in two of three scenarios, much like our Hill Climbing. In drone path planning a PSO variant beat classic PSO in six of eight scenarios. They use their own variants and settings, so our results do not transfer directly.*

**E2. Kết quả có còn đúng ở bài nhiều chiều hơn không?** *(TV3, slide 13)*
- Ý chính: chưa biết. Nhóm chỉ thử 2 chiều. Poli et al. (chú thích tr. 37) có nhắc quần thể lớn hơn tốt hơn cho bài nhiều chiều. Đây là hướng làm tiếp.
- Say: *We do not know: we only tested two dimensions. Higher dimensions usually need larger swarms and more evaluations, so this is one of the follow-ups we propose.*

**E3. Nếu làm tiếp, nhóm sẽ làm gì trước?** *(bất kỳ ai, slide 13)*
- Ý chính: (1) đổi từng tham số một (c₁, c₂, số hạt) với ngân sách cố định để tách nguyên nhân hội tụ sớm; (2) hàm dịch và nhiều chiều hơn; (3) so gbest với lbest; (4) Hill Climbing có restart làm baseline mạnh hơn.
- Say: *First, a controlled sweep that changes one parameter at a time under a fixed budget, to find what causes premature convergence. Then shifted and higher-dimensional functions, an lbest ring against gbest, and a Hill Climbing with restarts as a stronger baseline.*

**E4. Khi nào nên dùng PSO, khi nào không?** *(TV3, slide 13)*
- Ý chính: nên thử khi không có gradient, hàm có nhiều cực trị và có thể đánh giá nhiều ứng viên. Không nên khi hàm trơn một cực trị và cần kết quả nhanh với ít lượt (HC tới 0.01 nhanh hơn trên Sphere), hoặc khi mỗi lần đánh giá rất đắt.
- Say: *PSO is worth trying when there is no gradient, the function has several local optima and we can afford many evaluations. For a smooth single-basin function where early progress matters, a local method can be faster, as Hill Climbing was on Sphere.*

---

## Mẹo khi trả lời

- Trả lời câu hỏi trước, rồi mới đưa số liệu. Một con số là đủ, không đọc cả bảng.
- Phân biệt rõ "the paper reports…" (bài báo) với "in our experiment…" (nhóm làm). Đề S01 chấm điểm việc này.
- Không chắc thì nói: *"We did not test that; our evidence covers only…"*. Tránh khẳng định quá mức (rubric trừ điểm "overstating conclusions").
- Slide dự phòng B0–B4 nằm sau slide cảm ơn: B0 điểm xuất phát của ví dụ tính tay, B1 pseudo-code, B2 biến thể và topology, B3 độ nhạy v_max, B4 tính công bằng của so sánh.
