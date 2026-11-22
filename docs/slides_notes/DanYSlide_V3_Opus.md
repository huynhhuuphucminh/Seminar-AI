# Kịch bản thuyết trình V3 (bản để duyệt)

> Bản nháp do AI (Claude Opus 5.5) soạn lại từ đầu dựa trên đề S01, `Report.tex`, `results/` và bộ slide hiện tại. Chữ trên slide và lời nói viết bằng tiếng Anh (khớp báo cáo); ghi chú cho nhóm viết bằng tiếng Việt. Mọi con số đã đối chiếu với `Report.tex` (ghi số bảng hoặc dòng nguồn ở mỗi slide).

## 0. Ý tưởng chung

**Mạch kể chuyện.** Bài nói đi theo một câu hỏi duy nhất của đề: *"PSO kết hợp kinh nghiệm cá nhân và thông tin xã hội thế nào để cân bằng khám phá và khai thác?"* Mỗi phần trả lời một nửa:

- **Phần 1 (TV1): PSO là gì và từ đâu ra.** Bài toán → ý tưởng bầy đàn (bài 1995) → so với một người leo đồi → công thức → những gì đã thay đổi đến 2007.
- **Phần 2 (TV2): PSO chạy thế nào.** Thiết lập thí nghiệm → tính tay 1 bước → 5 hạt chạy thật.
- **Phần 3 (TV3): PSO tốt đến đâu, hỏng khi nào.** Ảnh hưởng của ω → so với baseline cùng ngân sách → ca bị kẹt → trả lời câu hỏi, ứng dụng, giới hạn.

**Hình ảnh xuyên suốt.** "Tìm thung lũng thấp nhất trong sương mù": Hill Climbing là một người leo núi đi một mình; PSO là một nhóm người có bộ đàm. Dùng hình ảnh này ở slide 1 và 3, rồi gọi lại ở slide 12 để khép bài.

**Nguyên tắc cho từng slide.** Mỗi slide có một câu thông điệp (in đậm ở dưới tựa trong file này, không cần in lên slide). Tối đa 4 ý, mỗi ý không quá 12 từ. Mỗi hình, công thức hoặc số liệu có nguồn ở chân slide.

## 1. Bảng tổng quan

12 slide nội dung (đề cho 8 đến 12), cộng slide tiêu đề và slide tài liệu tham khảo. Dự kiến 14 phút 20 giây, dư khoảng 40 giây.

| # | Người nói | Tựa slide | Thời gian | Yêu cầu đề / rubric |
|---|---|---|---|---|
| 0 | TV1 | Particle Swarm Optimization (title) | 0:15 | |
| 1 | TV1 | The problem: find the global minimum | 0:55 | Đặt vấn đề, câu hỏi, phạm vi (5đ) |
| 2 | TV1 | Hill Climbing vs a particle swarm | 1:00 | Task 1: x, v, pbest, gbest, quần thể; so với Hill Climbing |
| 3 | TV1 | Version 1: an "if" rule | 0:55 | Đọc bài bắt buộc (15đ); cân bằng pbest/gbest |
| 4 | TV1 | Version 2: pull by distance, then factor 2 | 1:00 | Đọc bài bắt buộc; vì sao cần quán tính |
| 5 | TV1 | Version 3: speed limit, then inertia | 1:20 | Task 2: ω, c₁, c₂, r₁, r₂, v_max; bài khuyến nghị |
| 6, 6b | TV2 | One step by hand: iteration 0 · iteration 0 → 1 | 1:30 | Task 2: tính tay 2 hạt, 1 chiều; tách 2 slide (trạng thái vòng 0; thế số từng bước sang vòng 1) |
| 7 | TV2 | Test problems and setup | 1:10 | Task 3: hàm, miền, cách tính fitness |
| 8 | TV2 | Five particles: iteration 0 → 1 | 1:40 | Task 4; đầu ra tối thiểu 1 |
| 9 | TV3 | How much inertia? | 1:15 | Task 4: 3 cấu hình × 5 seed; độ nhạy tham số |

| 10 | TV3 | Same budget, two landscapes | 1:20 | Task 5; đầu ra tối thiểu 2 |
| 11 | TV3 | When the swarm gets stuck | 1:20 | Task 6: hội tụ sớm; đầu ra tối thiểu 3 |
| 12 | TV3 | So what? Answer, uses, limits | 1:15 | Task 6: 2 ứng dụng; phân tích phản biện (10đ) |
| 13 | | References + AI-use statement | | Trích dẫn (10đ) |
| B1–B4 | | Backup slides (chỉ mở khi hỏi đáp) | | Hỏi đáp (20đ) |

**Thay đổi lớn so với deck hiện tại**

1. Phần 1 tăng từ 3 lên 5 slide, thêm hai thứ đề bắt buộc mà deck đang thiếu: định nghĩa rõ x, v, quần thể hạt, và so sánh với Hill Climbing.
2. Phần 1 dựng công thức theo từng bậc như trong bài 1995: quy tắc "if" → kéo theo khoảng cách → hệ số 2 → thêm trọng số quán tính ω. Mỗi bậc sửa một điểm yếu của bậc trước, nên khán giả thấy vì sao có từng thành phần. Phần 2 chỉ còn việc dùng công thức đó.
3. Thêm slide 12 trả lời thẳng câu hỏi định hướng. Deck hiện tại không có slide kết luận.
4. Bỏ hình 5 hạt ở slide 2 hiện tại vì trùng với slide 7.
5. Ví dụ tính tay vẫn do TV2 nói như deck hiện tại. Nếu nhóm muốn khớp đúng phân công trong "Seminar AI.pdf" (ví dụ tính tay là việc của TV1), đổi slide 7 sang TV1 và chuyển slide 9 sang TV2; thời gian mỗi người vẫn cân bằng.

---

## 2. Phần 1, TV1: PSO là gì và từ đâu ra (4:50)

### Slide 0. Title (0:15)

Giữ slide tiêu đề hiện tại. Lời nói: *"Good morning. We are presenting Particle Swarm Optimization, and our question is how a swarm balances exploring and refining."*

### Slide 1. The problem: find the global minimum (0:55)

**Thông điệp: nhiều bài toán là tìm điểm thấp nhất của một hàm không có đạo hàm và có nhiều thung lũng; tìm kiếm cục bộ dễ dừng ở thung lũng đầu tiên.**

**Bố cục.** Trái: hình mặt Rastrigin 2-D (3-D hoặc contour), có một chấm đỏ kẹt ở một hố phụ và dấu × ở (0, 0). Phải: các ý và hộp câu hỏi.

**Chữ trên slide**
- Goal: find x that minimises f(x) in a bounded continuous domain
- Hard when: no usable gradient, many local minima
- Examples: tuning hyper-parameters, scheduling, engineering design
- Hộp: **Guiding question.** How does PSO combine individual experience and social information to balance exploration and exploitation?
- Chân hộp: *Scope: global-best PSO on two 2-D benchmark functions, compared with Hill Climbing and Random Search.*

**Nguồn.** Hình: team illustration (cần vẽ, chưa có trong `figs/`). Câu hỏi: đề S01.

**Lời nói:** xem `Script_DocThu_V3.md` (bản mới nhất, dùng thuật ngữ local minimum, unimodal, multimodal).

### Slide 2. Hill Climbing vs a particle swarm (1:00)

**Thông điệp: Hill Climbing giữ một điểm và chỉ nhận bước tốt hơn; PSO giữ cả quần thể, mỗi hạt có vị trí, vận tốc và hai trí nhớ.**

**Bố cục.** Hai nửa trên cùng một contour.
- Trái, **Hill Climbing**: một chấm, các bước zigzag nhỏ, một bước bị gạch chéo (bị từ chối vì tệ hơn).
- Phải, **PSO**: 5 chấm; phóng to một hạt i có nhãn **xᵢ** (position), mũi tên **vᵢ** (velocity), ngôi sao rỗng **pbestᵢ**, ngôi sao đặc **gbest**.

**Chữ trên slide** (bảng ở dưới hình)

| | Hill Climbing | PSO |
|---|---|---|
| Keeps | one point | swarm of N particles, each a candidate xᵢ |
| Moves by | random neighbour (σ = 0.3), kept only if better | velocity vᵢ; every move is kept |
| Remembers | nothing but the current point | own best pbestᵢ + shared gbest |
| Cost per step | 1 evaluation | N evaluations |

- Chân slide: *Origin: simulations of bird flocks searching for food (Kennedy & Eberhart, 1995).*

**Nguồn.** Team illustration; K&E (1995), pp. 1942–1944; cài đặt Hill Climbing theo Report Sect. 3.

### Dải "bậc thang công thức" dùng chung cho slide 3, 4, 5

Đặt một dải nhỏ ở đầu ba slide này, tô sáng bậc đang nói:

**① If-rule (1995) → ② Pull by distance (1995) → ③ Factor 2 = the 1995 PSO → ④ Speed limit v_max, then inertia weight ω (1998, standard by 2007)**

Ý của chuỗi này: mỗi bậc sửa một điểm yếu của bậc trước. Khán giả hiểu vì sao công thức có dạng như hiện nay, thay vì nhận một công thức có sẵn. Ba bậc đầu đều có trong bài 1995 (đã đối chiếu PDF, trang 1944–1946).

### Slide 3. Version 1: an "if" rule (0:55)

**Thông điệp: phiên bản đầu chỉ xét hướng (trái hay phải pbest, gbest), nhưng đã cho ra bài học chính: cần cả hai trí nhớ, và lực kéo phải cân bằng.**

**Chữ trên slide**
- Công thức (cho mỗi tọa độ):
  - `if x > pbest: v ← v − rand()·p_inc`  ·  `if x < pbest: v ← v + rand()·p_inc`
  - `if x > gbest: v ← v − rand()·g_inc`  ·  `if x < gbest: v ← v + rand()·g_inc`
- Hình 1-D: hai hạt, một hạt cách pbest 0.5, một hạt cách 5, **hai mũi tên dài bằng nhau** → *far or near, same push*
- Lessons: pbest and gbest both necessary · g_inc ≫ p_inc → rush into local minima · p_inc ≫ g_inc → wandering · roughly equal works best

**Nguồn.** Kennedy & Eberhart (1995), pp. 1944–1945 (Sects. 3.2–3.3).

### Slide 4. Version 2: pull by distance, then factor 2 (1:00)

**Thông điệp: thay phép so sánh bằng hiệu số (xa thì kéo mạnh), rồi thay hai increment bằng hệ số 2; thử bỏ vận tốc cũ thì thuật toán hỏng, nên quán tính là bắt buộc.**

**Chữ trên slide** (hiện lần lượt 3 dòng)
- ② `v ← v + rand()·p_inc·(pbest − x) + rand()·g_inc·(gbest − x)`: *pull grows with distance; easier to understand, worked better*
- ③ `v ← v + 2·rand()·(pbest − x) + 2·rand()·(gbest − x)`: **the 1995 PSO**; increments dropped (no way to guess which is larger); factor 2 → mean pull 1 → overshoot about half the time
- Test: drop the old `v` → `v ← 2·rand()·(pbest − x) + 2·rand()·(gbest − x)` → *"quite ineffective at finding global optima"*
- Hộp: **The old velocity (momentum) is essential: it carries particles past their targets onto new ground.**

**Nguồn.** Kennedy & Eberhart (1995), pp. 1945–1946 (Sects. 3.5–3.7).

### Slide 5. Version 3: speed limit, then inertia (1:20)

**Thông điệp: ở bản 1995, vận tốc cũ có trọng số 1 và lực kéo hệ số 2 nên tốc độ tăng không kiểm soát. Cách sửa đầu tiên là giới hạn tốc độ v_max, nhưng giá trị tốt phụ thuộc bài toán. Cách sửa thứ hai là trọng số ω < 1, cho ra công thức chuẩn ngày nay; khi có ω thì v_max chỉ cần đặt rộng.**

**Chữ trên slide** (hiện lần lượt)
- Dòng vấn đề: *1995 rule: old velocity × 1, pulls × 2 → speeds grow without control*
- Hộp "Fix 1: speed limit":
  `vᵢ ← clip(vᵢ, −v_max, +v_max)`, mỗi tọa độ
  *works, but a good v_max depends on the problem; it cuts the swings instead of calming them*
- Hộp "Fix 2: inertia weight" (Shi & Eberhart, 1998), công thức lớn, ba thành phần tô ba màu:
  `vᵢ ← ω·vᵢ + c₁r₁(pbestᵢ − xᵢ) + c₂r₂(gbest − xᵢ)`,  `xᵢ ← xᵢ + vᵢ`
  nhãn: **inertia** · **cognitive (own experience)** · **social (swarm's knowledge)**
- Dòng nối: *1995 PSO = special case ω = 1, c₁ = c₂ = 2*

| Symbol | Meaning | Range |
|---|---|---|
| ω | inertia weight; 1 − ω acts like friction | usually 0.4–0.9 |
| c₁, c₂ | strength of the two pulls | ≥ 0 |
| r₁, r₂ | random numbers, new per particle, dimension, iteration | U(0, 1) |
| v_max | speed limit per coordinate | with ω: can be as wide as the search range |

- Chân: *Large ω explores, small ω refines. With ω (or χ), v_max can be set wide: V_max = X_max.*
- Giá trị cụ thể của nhóm (ω = 0.7, c = 1.5, v_max = 10.24) **không** đặt ở đây; TV2 nói ở slide 7. Phần topology (gbest và lbest) chuyển vào slide dự phòng B2.
- Dải bậc thang: bậc ④ đổi thành **④ Speed limit v_max, then inertia ω (1998)**.

**Nguồn.** v_max và vấn đề tốc độ: Poli et al. (2007), Sect. 2.2; ω: Shi & Eberhart (1998) qua Poli et al. (2007), Sect. 2.3; V_max = X_max: Poli et al. (2007), Sect. 2.4.

**Lời nói cho slide 1 đến 5:** xem `Script_DocThu_V3.md`.

---

## 3. Phần 2, TV2: PSO chạy thế nào (4:20)

### Slide 6. One step by hand (1:30)

**Thông điệp: ở bước đầu, thành phần nhận thức bằng 0; một hạt có thể tệ đi nhưng gbest của cả đàn vẫn tốt lên.**

Giữ slide 6 hiện tại (bảng + trục số); chỉ thêm dòng giả thiết đầy đủ ở đầu slide để đáp ứng "định nghĩa mọi ký hiệu".

**Chữ trên slide**
- Setup: f(x) = x², ω = 0.7, c₁ = c₂ = 1.5, no velocity limit
- P1: x = 3, v = 0.5, r₁ = 0.4, r₂ = 0.6 · P2: x = −2, v = −0.5, r₁ = 0.8, r₂ = 0.3
- f(3) = 9, f(−2) = 4 → **gbest = −2**; at start pbest = x

| Particle | Inertia | Cognitive | Social | v(1) | x(1) | f |
|---|---|---|---|---|---|---|
| 1 | 0.7·0.5 = 0.35 | 0 | 1.5·0.6·(−5) = −4.5 | −4.15 | −1.15 | 1.3225 |
| 2 (gbest) | −0.35 | 0 | 0 | −0.35 | −2.35 | 5.5225 |

- Kết: **gbest: −2 → −1.15 (f: 4 → 1.32)**

**Nguồn.** Team worked example (Report Table 2).

**Lời nói.** Let us do one step by hand, in one dimension, with f equal to x squared. Particle 1 is at 3, particle 2 at minus 2. Particle 2 has the lower value, 4, so it is the global best. At the start, each particle's best is where it stands, so the cognitive term is zero for both. For particle 1, inertia gives 0.35 and the social pull gives 1.5 times 0.6 times minus 5, which is minus 4.5. Its velocity is minus 4.15, so it jumps to minus 1.15: it overshoots zero, but its value drops from 9 to 1.32. Particle 2 is the global best, so nothing pulls it; it drifts with inertia and gets worse. Still, the swarm's best improves from minus 2 to minus 1.15.

### Slide 7. Test problems and setup (1:10)

**Thông điệp: hai hàm có cùng cực tiểu nhưng khác địa hình, một hàm kiểm tra tốc độ và một hàm kiểm tra khả năng bị kẹt; mọi phương pháp dùng cùng ngân sách.**

**Bố cục.** Hai thẻ cạnh nhau có hình nhỏ của mỗi hàm; dải thiết lập ở dưới; vòng lặp thuật toán 4 bước bên phải.

**Chữ trên slide**
- **Sphere** `f(x) = Σᵢ xᵢ²`: unimodal → tests speed
- **Rastrigin** `f(x) = 10n + Σᵢ (xᵢ² − 10 cos 2πxᵢ)`, n = 2: grid of local minima → tests trapping
- Both: domain [−5.12, 5.12]², minimum f = 0 at (0, 0); **fitness = f(x), lower is better**
- Loop: initialise x, v randomly → evaluate f → update pbest, gbest → move all particles → repeat
- **Our settings:** ω = 0.7, c₁ = c₂ = 1.5 (2007 standard, rounded); v_max = 10.24 (domain width); positions put back on the boundary; ω = 0.4 and 0.9 tested on slide 9
- Budget: 20 particles × 100 iterations + 20 initial = **2,020 evaluations**, seeds 0–4

**Nguồn.** Team design (Report Sect. 3).

**Lời nói:** xem `Script_DocThu_V3.md` (bản mới nhất, dùng thuật ngữ local minimum, unimodal, multimodal).

### Slide 8. Five particles: iteration 0 → 1 (1:40)

**Thông điệp: chạy thật với 5 hạt 2 chiều, sau một bước chỉ 2 hạt tốt lên nhưng gbest giảm từ 8.26 xuống 0.37.**

**Bố cục.** Trái: hai panel đầu (iteration 0 và 1) của `figs/fig_swarm_sphere.png`. Phải: bảng trạng thái (đầu ra tối thiểu 1).

| P | (x₁, x₂) iter 0 | f | (x₁, x₂) iter 1 | f |
|---|---|---|---|---|
| 1 | (2.81, −0.63) | **8.26** = gbest | (0.95, 5.12) | 27.12 |
| 2 | (3.67, 2.02) | 17.57 | (5.12, 5.12) | 52.43 |
| 3 | (−4.16, 4.87) | 40.99 | (−0.06, −0.60) | **0.37** = new gbest |
| 4 | (2.67, 2.93) | 15.73 | (3.48, −5.12) | 38.34 |
| 5 | (−3.81, −0.51) | 14.76 | (3.14, 1.26) | 11.45 |

- Sphere, seed 42, ω = 0.7, c₁ = c₂ = 1.5
- 5.12 = moved back to the boundary
- gbest stays 0.37 up to iteration 5; code matches a hand recomputation of particle 2

**Nguồn.** Team experiment (Report Table 3, Figure 1; `results/swarm_states_sphere_seed42.csv`).

**Lời nói.** Now the real algorithm: five particles in two dimensions on Sphere. At iteration 0, particle 1 is the best, with a value of 8.26. After one update, only particles 3 and 5 improve, while particles 1, 2 and 4 get worse and even hit the boundary, where we move them back to 5.12. But particle 3 lands close to the origin with 0.37, so the swarm's best drops from 8.26 to 0.37 in one step. This is the same lesson as the hand example, now in two dimensions: individuals can get worse while the group gets better. We recomputed particle 2's step by hand and it matches the code exactly. My teammate will now look at what happens over many runs.

---

## 4. Phần 3, TV3: PSO tốt đến đâu và hỏng khi nào (5:10)

### Slide 9. How much inertia? (1:15)

> Cập nhật: slide có hai hình best fitness theo iteration (`figs/fig_omega_sphere.png`, `figs/fig_omega_rastrigin.png`) để đáp ứng "A fitness-versus-iteration plot" trong mục Minimum Expected Outputs; bảng trung bình thu nhỏ đặt bên dưới.

**Thông điệp: ω càng nhỏ càng tinh chỉnh tốt trong thí nghiệm này, nhưng thứ hạng phụ thuộc giới hạn vận tốc; 5 seed chỉ đủ để minh họa.**

**Bố cục.** Bảng (ô tốt nhất mỗi hàng tô màu) và 3 ý ở dưới. Có thể thêm `fig_omega_rastrigin.png` nhỏ bên phải.

| Mean final fitness | A: ω = 0.4 | B: ω = 0.7 | C: ω = 0.9 |
|---|---|---|---|
| Sphere | **8.8 × 10⁻³⁰** | 1.0 × 10⁻¹² | 3.6 × 10⁻⁴ |
| Rastrigin | **≈ 0** | 1.1 × 10⁻⁶ | 0.164 |

- High ω keeps particles moving → slowest to settle
- With v_max = 2.0 or 5.12, one ω = 0.4 Rastrigin run stalls at 0.995 → ranking flips to ω = 0.7
- One ω = 0.9 run (0.67) dominates its Rastrigin mean; 10⁻³⁰ vs 10⁻¹² has no practical meaning

**Nguồn.** Team experiment: 20 particles, c₁ = c₂ = 1.5, seeds 0–4 (Report Tables 6–7, Sect. 4.2, Limitations).

**Lời nói.** We changed only the inertia weight, with five seeds each. On both functions the smallest omega gave the best mean, and 0.9 was clearly the worst, because particles that keep their momentum take longer to settle. But we should be careful. When we tightened the speed limit to 2 or 5.12, one run with omega 0.4 got stuck at 0.995 on Rastrigin, and then 0.7 was best. Also, one bad run can dominate a mean of five, and the difference between ten to the minus 30 and ten to the minus 12 means nothing in practice. So the honest conclusion is: inertia matters, but the best value depends on the other settings.

### Slide 10. Same budget, two landscapes (1:20)

**Thông điệp: trên hàm một hố, Hill Climbing nhanh hơn lúc đầu; trên hàm nhiều hố, chỉ PSO đạt ngưỡng 0.01.**

Giữ slide 8 hiện tại (hai đồ thị + ba ô số). Số đã đối chiếu.

**Chữ trên slide**
- Ô 1: **42.6 vs 216** evaluations to reach 0.01 on Sphere (Hill Climbing vs PSO)
- Ô 2: **1.0 × 10⁻¹²** PSO mean final on Sphere (Hill Climbing 2.6 × 10⁻⁴, Random Search 1.4 × 10⁻²)
- Ô 3: **5/5 vs 0/5** Rastrigin runs reaching 0.01 (PSO vs each baseline); means 1.1 × 10⁻⁶ vs 5.2 (HC), 1.2 (RS)

**Nguồn.** Team experiments, 2,020 evaluations, seeds 0–4 (Report Tables 4–5, Figure 2).

**Lời nói:** xem `Script_DocThu_V3.md` (bản mới nhất, dùng thuật ngữ local minimum, unimodal, multimodal).

### Slide 11. When the swarm gets stuck (1:20)

**Thông điệp: khi lực kéo xã hội mạnh và ít hạt, đàn mất đa dạng rất nhanh và hội tụ vào một hố sai; đó là hội tụ sớm.**

Giữ slide 10 hiện tại, sửa phần chữ bên phải theo thứ tự *thiết lập → kết quả → nguyên nhân → cảnh báo*.

**Chữ trên slide**
- **Setting:** Rastrigin, 5 particles, ω = 0.4, c₁ = 0.5, c₂ = 2.5 (strong social pull), seeds 0–19
- **Result:** all 20 runs end above 0.9; seed 0 stops at (0, −0.995), f ≈ 0.995
- **Why:** diversity (mean distance to centroid) 4.18 → 3.0 × 10⁻⁹: nobody explores any more
- **Compare:** default PSO, same seed, f ≈ 1.6 × 10⁻⁸
- **Caution:** several settings changed at once and only 505 evaluations, so no single cause

**Nguồn.** Team experiment (Report Figure 3, Sect. 4.3).

**Lời nói:** xem `Script_DocThu_V3.md` (bản mới nhất, dùng thuật ngữ local minimum, unimodal, multimodal).

### Slide 12. So what? Answer, uses, limits (1:15)

**Thông điệp: pbest giữ đa dạng, gbest gom đàn, ω quyết định đà; cân bằng ba thứ này là câu trả lời cho câu hỏi định hướng.**

**Bố cục.** Ba thẻ số 1–2–3 ở trên (câu trả lời); hai cột ở giữa (ứng dụng | giới hạn); dòng cuối gọi lại hình ảnh sương mù.

**Chữ trên slide**
- **Answer:** ① pbest keeps each particle's discoveries → diversity (exploration) · ② gbest pulls the swarm to the best region → focus (exploitation) · ③ ω sets how far particles carry on past their targets
- Too much social pull, too few particles → premature convergence
- **Real uses** (both with several local optima):
  - Solar panels: PSO tracks the max power point under partial shading; a local method got stuck on a lower peak in 2 of 3 scenarios (Alshareef et al., 2019)
  - UAV path planning with a PSO variant (SPSO); lower cost than classic PSO in 6 of 8 scenarios (Phung & Ha, 2021)
- **Limits of our study:** 2 functions, 2-D, optimum at the centre, 5 seeds, gbest topology only, Hill Climbing without restarts
- **Next:** shifted functions, lbest topology, swarm size, random-restart Hill Climbing

**Nguồn.** Team experiments; Alshareef et al. (2019); Phung & Ha (2021); Poli et al. (2007), Sect. 7.1 (thiên lệch về gốc tọa độ).

**Lời nói:** xem `Script_DocThu_V3.md` (bản mới nhất, dùng thuật ngữ local minimum, unimodal, multimodal).

### Slide 13. References + AI-use statement

Giữ slide cảm ơn hiện tại, thêm dòng tên các slide backup ở dưới cùng.

---

## 5. Slide dự phòng (đặt sau slide 13)

| Slide | Nội dung | Nguồn | Mở khi được hỏi |
|---|---|---|---|
| B1 | Pseudo-code 14 dòng, cập nhật đồng bộ (gbest đổi sau khi mọi hạt di chuyển) | Report Sect. 3 | "Write the algorithm" |
| B2 | Biến thể: χ, ω giảm dần, lbest ring, fully informed PSO, bare-bones PSO | Poli et al. (2007) | "What variants exist?" |
| B3 | Bảng độ nhạy v_max (2.0, 5.12, 10.24, không giới hạn) | Report Table 7 | "Why v_max = 10.24?" |
| B4 | Cách đếm ngân sách và cài đặt Random Search, Hill Climbing | Report Sect. 3 | "Is the comparison fair?" |

## 6. Câu hỏi khó cần chuẩn bị (mỗi người trả lời được ít nhất phần mình)

**TV1**
- Why is the cognitive term zero at the first step? *Vì pbest = x lúc khởi tạo.*
- Why was the if-rule replaced? *Nó chỉ xét hướng; hạt ở xa hay gần đều bị đẩy như nhau. Kéo theo hiệu số dễ hiểu hơn và chạy tốt hơn (K&E 1995, p. 1945).*
- Why does 1 − ω act like friction? *Không có lực kéo thì mỗi bước vận tốc chỉ còn ω lần, mất (1 − ω).*
- Is PSO guaranteed to find the global optimum? *Không; hội tụ sớm là ví dụ (slide 11).*
- gbest vs lbest? *lbest truyền thông tin chậm hơn nên ít bị kẹt hơn nhưng hội tụ chậm hơn.*

**TV2**
- Why these two functions? *Một hố so với nhiều hố, cùng cực tiểu nên so sánh được.*
- Why keep v_max if ω already slows particles down? *ω hãm dần, còn v_max chặn những bước quá lớn lúc đầu (vận tốc ban đầu lấy ngẫu nhiên). Với ω thì v_max chỉ cần rộng, nên nhóm đặt bằng độ rộng miền (Poli et al., 2007, Sect. 2.4); thử v_max chặt hơn ở slide dự phòng B3.*
- Why clip positions and velocities? *Giữ hạt trong miền; v_max = độ rộng miền theo Poli et al.*
- Why do particles 1, 2, 4 get worse? *Vận tốc ban đầu lớn và bị kéo về gbest nên vọt quá.*

**TV3**
- Why is Hill Climbing faster on Sphere? *1 lần đánh giá mỗi bước so với 20 của PSO.*
- Is the stuck run caused by c₂ or by few particles? *Không tách được; đây là giới hạn của thí nghiệm.*
- Would random-restart Hill Climbing beat PSO? *Có thể; nhóm chưa thử, đã ghi trong Limitations.*

## 7. Việc cần làm sau khi duyệt

1. Vẽ hình mặt Rastrigin có chấm kẹt (slide 1) và sơ đồ "Hill Climbing vs swarm" (slide 2), hình 1-D hai mũi tên bằng nhau (slide 3), dải bậc thang công thức (slide 3–5).
2. Cắt hai panel đầu của `fig_swarm_sphere.png` cho slide 8.
3. Sửa `slides/Slide_Seminar_PSO.pptx`: thêm slide 1, 2, 3, 12; dựng chuỗi công thức ở slide 3–5; đổi nhãn người nói; thêm backup.
4. Tập nói và bấm giờ. Nếu quá 15 phút, cắt lời ở slide 5 và 9 trước.
