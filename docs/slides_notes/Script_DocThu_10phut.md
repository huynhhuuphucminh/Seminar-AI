# Script đọc thử 10 phút: Seminar S01 PSO

> Bản rút gọn từ `Script_DocThu_V3.md` (bản 15 phút, vẫn giữ nguyên). Đọc to liền một mạch và bấm giờ. `[click]` là chỗ chuyển hình hoặc hiện ý tiếp theo. Bảng thời gian và danh sách thay đổi slide ở cuối file.

---

## TV1: The problem, PSO vs Hill Climbing, and the first rules

### Slide 0. Title

Good morning. We are Khải, Minh and Trung, and our topic is Particle Swarm Optimization.

### Slide 1. The problem: find the global minimum

Our task is to minimise a function when there is no gradient, only function values. `[click]` A local search that only accepts downhill moves stops at the first local minimum, like this red dot, while the global minimum is at zero.

`[click]` So our guiding question is: how does PSO combine what each particle remembers with what the swarm knows, to balance exploration and exploitation?

### Slide 2. Hill Climbing vs a particle swarm

PSO comes from Kennedy and Eberhart's 1995 simulation of bird flocks.

`[click]` Hill Climbing keeps one point and accepts a step only if it is better, so it cannot leave a local minimum.

`[click]` PSO keeps a swarm. Each particle has a position x, one candidate solution, and a velocity v. It remembers its own best, pbest, and the swarm shares one global best, gbest. Every move is accepted, but each step costs N evaluations instead of one.

### Slide 3. Version 1: an "if" rule

The update rule took several versions. `[click]` The first only checked direction: if a particle is to the right of its pbest or gbest, lower its velocity; if it is to the left, raise it.

`[click]` Near or far, the push is the same. `[click]` Still, it taught the key lesson: both memories are needed, with roughly equal pulls.

### Slide 4. Version 2: pull by distance, then factor 2

`[click]` Next, the pull grew with distance, pbest minus x. `[click]` A factor 2 then gave the 1995 PSO.

`[click]` When the authors removed the old velocity, the method became "quite ineffective at finding global optima", so momentum stays. Minh will now take it to today's rule.

---

## TV2: The standard rule, a hand step, and the setup

### Slide 5. Version 3: speed limit, then inertia

Thank you. In the 1995 rule the old velocity had full weight, so speeds grew without control.

`[click]` The first fix was a speed limit, v max, which clips every velocity coordinate.

`[click]` The lasting fix, by Shi and Eberhart, was the inertia weight omega. Together with coefficients c one, c two and fresh random numbers r one, r two, it gives today's standard rule.

`[click]` A large omega keeps particles moving and explores; a small omega slows them down and refines.

### Slide 6. One step by hand

Here is one update by hand, in one dimension, with fitness f of x equals x squared. Particle 2, at minus 2, is the global best.

`[click]` For particle 1 at 3, inertia gives 0.35, the cognitive term is zero, and the social pull is minus 4.5. So v is minus 4.15, and x becomes 3 minus 4.15, which is minus 1.15. Its fitness drops from 9 to 1.32.

`[click]` Particle 2 drifts to minus 2.35 and gets worse, but the swarm's best still improves.

### Slide 7. Test problems and setup

Now the experiments. We use two functions with the minimum, zero, at the origin.

`[click]` Sphere is unimodal, so it tests speed. `[click]` Rastrigin is multimodal, with a grid of local minima, so it tests trapping. Fitness is the function value at a particle's position.

`[click]` We use omega 0.7, c one and c two equal to 1.5, and v max 10.24, the width of the domain. One run is 2,020 function evaluations, the same budget for every method, with five seeds. Trung will now show the results.

---

## TV3: Experiments and what they show

### Slide 8. Five particles: iteration 0 to 1

Thank you. Here are five particles on Sphere.

`[click]` At iteration 0, particle 1 is the best, with 8.26.

`[click]` After one update, three particles get worse, and some are put back on the boundary. But particle 3 lands near the origin, so the swarm's best drops from 8.26 to 0.37 in one step.

### Slide 9. How much inertia?

Next, we changed only omega: 0.4, 0.7 and 0.9, with five seeds each.

`[click]` The plots show the best fitness at each iteration. The smallest omega converged fastest, and 0.9 was the slowest.

`[click]` But with a tighter speed limit, one run with omega 0.4 got stuck on Rastrigin. So the best omega depends on the other settings.

### Slide 10. Same budget, two landscapes

Next, PSO against Random Search and Hill Climbing, all with 2,020 evaluations.

`[click]` On Sphere, Hill Climbing reaches 0.01 first, but PSO keeps improving and finishes far lower.

`[click]` On Rastrigin, all five PSO runs reach 0.01, and no baseline run does. Hill Climbing stays at the first local minimum it finds.

### Slide 11. When the swarm gets stuck

PSO can fail too. `[click]` With five particles and a very strong pull to the global best, all 20 runs ended in a local minimum.

`[click]` The spread of the swarm fell by nine orders of magnitude, so nobody explored any more. This is premature convergence.

`[click]` The default setting finds the minimum on the same seed, but we changed several settings at once, so we cannot name a single cause.

### Slide 12. So what? Answer, uses, limits

Back to our question. `[click]` pbest keeps the swarm diverse, gbest focuses it, and omega sets how far particles carry on. When the social pull wins too early, the swarm collapses.

`[click]` PSO is used, for example, to track the maximum power of solar panels and to plan drone flight paths.

`[click]` Our evidence is small: two functions, two dimensions and five seeds.

Thank you. We are happy to take your questions.

---

## Thời gian ước tính

Tính theo số từ. Cột "nhanh" là 130 từ/phút, cột "chậm" là 110 từ/phút. Cột "ước tính thật" lấy tốc độ chậm cộng 20% cho các lần dừng ở `[click]`, chỉ vào hình và ngắt nghỉ.

| Người | Slide | Số từ | Nhanh | Chậm | Ước tính thật |
|---|---|---|---|---|---|
| TV1 | 0–4 | 254 | 1:57 | 2:19 | khoảng 2:46 |
| TV2 | 5–7 | 247 | 1:54 | 2:15 | khoảng 2:42 |
| TV3 | 8–12 | 296 | 2:17 | 2:41 | khoảng 3:14 |
| **Tổng** | | **797** | **6:08** | **7:15** | **khoảng 8:42** |

## Thay đổi slide so với bản 15 phút

Đã áp dụng vào pptx (slide "iteration 0" thành slide dự phòng B0; speaker notes lấy từ file này).

- **Ví dụ tính tay:** từ 2 slide còn 1 (slide "iteration 0 → 1", đã có dòng Start với x, v, r₁, r₂). Slide "iteration 0" chuyển xuống phần dự phòng. Không bỏ hẳn vì đề S01 Task 2 bắt buộc "Manually calculate one update step for two particles in a one-dimensional optimization problem".
- **Còn 12 slide nội dung** (slide 1–12), đúng giới hạn 8–12 của đề.
- **Chia lại người nói cho đều:** TV1 slide 0–4, TV2 slide 5–7 (công thức chuẩn, tính tay, setup), TV3 slide 8–12 (toàn bộ kết quả). Nhãn Member trên slide 5 và 8 đã đổi theo.
- Chữ trên slide giữ nguyên; chỉ lời nói ngắn lại. Một số `[click]` được gộp (slide 7, 9, 12).
- Tổng khoảng 8:40 theo ước tính, chừa khoảng 1:20 cho chuyển người nói và chỉ vào hình.

**Nếu vẫn muốn bỏ hẳn phần tính tay:** bỏ slide 6, tiết kiệm khoảng 35 giây. Khi đó TV2 cần nói một câu ở slide 8 kiểu "the full hand calculation for two particles is in Section 3 of the report and in our backup slide", và nhóm chấp nhận rủi ro bị trừ điểm Task 2.
