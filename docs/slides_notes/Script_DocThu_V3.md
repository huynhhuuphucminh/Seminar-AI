# Script đọc thử: Seminar S01 PSO (theo kịch bản V3)

> Đọc to liền một mạch và bấm giờ. `[click]` là chỗ chuyển hình hoặc hiện ý tiếp theo. Bảng thời gian ước tính ở cuối file.

---

## TV1: What PSO is and where it came from

### Slide 0. Title

Good morning. We are Khải, Minh and Trung. Our topic is Particle Swarm Optimization, and how a swarm balances exploration and exploitation.

### Slide 1. The problem: find the global minimum

Our task is to find the input that minimises an objective function. Often there is no gradient, only function values. `[click]` A local search that only accepts downhill moves stops at the first local minimum it reaches, like this red dot, even though the global minimum is here, at x equals zero.

PSO searches with a population of candidate solutions instead. `[click]` So our guiding question is: how does PSO combine what each member remembers with what the group knows, to both explore and refine?

### Slide 2. Hill Climbing vs a particle swarm

PSO began in 1995, when Kennedy and Eberhart simulated bird flocks looking for food.

`[click]` Hill Climbing keeps one point. It tries a small random step and keeps it only if it is better, so once it reaches a local minimum, it can never leave.

`[click]` PSO keeps a swarm. Each particle has a position x, one candidate solution, and a velocity v, the step it takes next. It remembers its own best, pbest, and the swarm shares one global best, gbest. Every move is accepted, even a bad one, but each step costs N evaluations instead of one.

So how should pbest and gbest change the velocity? It took several versions.

### Slide 3. Version 1: an "if" rule

The first version was an if-rule. `[click]` If the particle is to the right of its pbest, lower its velocity by a random amount; if it is to the left, raise it. The same for gbest.

`[click]` Only the direction counts: a particle far from its target gets the same push as one right next to it.

`[click]` Still, this rule taught the key lesson. Both memories were necessary. If the pull to gbest was much stronger, the flock rushed into a local minimum; if the pull to pbest was stronger, particles wandered. Equal pulls worked best.

### Slide 4. Version 2: pull by distance, then factor 2

`[click]` Next, the push was made to depend on distance: multiply by pbest minus x. Far away means a strong pull, close means a gentle one, and it worked better.

`[click]` Then the two increments were replaced by a factor 2. The average pull is then 1, so particles overshoot their target about half the time. This is the 1995 PSO.

`[click]` Is the old velocity needed? The authors removed it, so each step only points at the two best positions, and that version was "quite ineffective at finding global optima". Momentum carries particles past their targets into unexplored regions, so it stays.

### Slide 5. Version 3: speed limit, then inertia

But in the 1995 rule the old velocity has full weight, one, and the pulls have strength 2, so speeds could grow without control.

`[click]` The first fix was a speed limit, v max: each velocity coordinate is clipped to plus or minus v max. It works, but a good v max depends on the problem.

`[click]` So Shi and Eberhart put a weight on the old velocity: the inertia weight, omega. With coefficients c one, c two and fresh random numbers r one, r two, this is today's standard form. The 1995 rule is omega 1 and c 2.

`[click]` One minus omega works like friction. A large omega keeps particles moving and explores; a small omega slows them down and refines. With omega, v max can be as wide as the search range.

Minh will now show it with real numbers.

---

## TV2: How PSO runs

### Slide 6. One step by hand

Thank you. Before the experiments, let us apply the rule once by hand, in one dimension, with f of x equals x squared.

`[click]` Particle 1 is at 3, particle 2 at minus 2. f is 9 and 4, so particle 2 is the global best. At the start, each personal best is the current position, so the cognitive term is zero.

`[click]` For particle 1, inertia is 0.7 times 0.5, which is 0.35, and the social pull is 1.5 times 0.6 times minus 5, which is minus 4.5. Adding the three terms, the velocity is minus 4.15. The new position is x plus v: 3 minus 4.15, which is minus 1.15. It overshoots zero, but its value drops from 9 to 1.32.

`[click]` Particle 2 is the global best, so nothing pulls it. Its new position is minus 2 minus 0.35, which is minus 2.35, so it gets worse.

`[click]` But the global best moves from minus 2 to minus 1.15. One particle got worse; the swarm got better.

### Slide 7. Test problems and setup

Now the experiments. We chose two functions with the same minimum, zero at the origin, but different fitness landscapes.

`[click]` Sphere is unimodal, one minimum and no local minima, so it tests how fast the swarm converges. `[click]` Rastrigin is multimodal, with a grid of local minima, so it tests whether the swarm gets trapped in one.

`[click]` The algorithm is a loop: start at random, evaluate, update the memories, move every particle, repeat.

`[click]` For the settings, we took the 2007 standard and rounded it: omega 0.7, and c one equals c two equals 1.5. The speed limit v max is 10.24, the width of the domain, so it only stops very large jumps; and a particle that leaves the domain is put back on the boundary.

One run is 20 particles for 100 iterations, plus the first evaluation: 2,020 function evaluations. Every method gets exactly this budget, with five random seeds.

### Slide 8. Five particles: iteration 0 to 1

Now the real algorithm: five particles, two dimensions, on Sphere.

`[click]` At iteration 0, particle 1 is the best, with 8.26.

`[click]` After one update, particles 1, 2 and 4 get worse, and some hit the edge, where we move them back to 5.12. But particle 3 lands near the origin with 0.37, so the swarm's best drops from 8.26 to 0.37 in one step.

The same lesson as the hand example: individuals can get worse while the group gets better.

Trung will now show what happens over many runs.

---

## TV3: How well PSO works and when it fails

### Slide 9. How much inertia?

Thank you. First, we changed only the inertia weight: 0.4, 0.7 and 0.9, with five seeds each.

`[click]` On both functions, the smallest omega gave the best mean, and 0.9 was the worst: with high inertia, particles take longer to settle.

`[click]` But with a tighter speed limit, one run with omega 0.4 got stuck on Rastrigin, and 0.7 became best. With five seeds, one bad run can dominate a mean.

So inertia matters, but the best value depends on the other settings.

### Slide 10. Same budget, two landscapes

Next, PSO against Random Search and Hill Climbing, all with 2,020 evaluations. The bands show the best and worst of five seeds.

`[click]` On Sphere, Hill Climbing reaches 0.01 first, after about 43 evaluations; PSO needs about 216, because each step costs 20 evaluations. But PSO keeps improving and finishes far lower.

`[click]` On Rastrigin, all five PSO runs reach 0.01, and not one baseline run does. Hill Climbing stays at the first local minimum it finds, like the red dot on slide 1.

So the winner depends on the landscape, and on whether we need early speed or final accuracy.

### Slide 11. When the swarm gets stuck

PSO can fail too. We built a weak swarm on purpose: five particles and a very strong pull towards the global best.

`[click]` All 20 runs converged to a local minimum instead of the global one. In this one, the particles bunch together by iteration 10, and by iteration 50 they sit on one point with a value near one, not zero.

`[click]` The right panel shows why: the spread of the swarm falls by nine orders of magnitude. Nobody explores any more. This is premature convergence, the risk Kennedy and Eberhart warned about.

`[click]` With default settings, the same seed stays spread out and finds the minimum.

Since we changed several settings at once, we cannot say which one caused the collapse.

### Slide 12. So what? Answer, uses, limits

Back to our guiding question.

`[click]` Each particle's own best keeps the swarm diverse: exploration. The global best pulls everyone to the best region: exploitation. Inertia decides how far particles carry on. When the social pull wins too early, the swarm collapses.

`[click]` This matters in real problems with many local optima: PSO tracks the maximum power of solar panels under partial shade, and a PSO variant plans drone flight paths.

`[click]` Our evidence is small: two functions, two dimensions, five seeds. Next: shifted functions, neighbour-only communication, and Hill Climbing with restarts.

So on multimodal functions, sharing information helps, as long as the swarm does not converge too early.

Thank you. We are happy to take your questions.

---

## Thời gian ước tính

Tính theo số từ. Cột "nhanh" là 130 từ/phút, cột "chậm" là 110 từ/phút (tốc độ thường gặp khi nói tiếng Anh không phải tiếng mẹ đẻ). Cột "ước tính thật" lấy tốc độ chậm cộng thêm 20% cho các lần dừng ở `[click]`, chỉ vào hình và ngắt nghỉ.

| Người | Slide | Số từ | Nhanh | Chậm | Ước tính thật |
|---|---|---|---|---|---|
| TV1 | 0–5 | 549 | 4:13 | 4:59 | khoảng 5:59 |
| TV2 | 6–8 | 403 | 3:06 | 3:40 | khoảng 4:24 |
| TV3 | 9–12 | 416 | 3:12 | 3:47 | khoảng 4:32 |
| **Tổng** | | **1,368** | **10:31** | **12:26** | **khoảng 14:55** |

Script đã được rút gọn để vừa 15 phút. Nếu bấm giờ thật vẫn quá, cắt tiếp theo thứ tự: câu "With five seeds, one bad run can dominate a mean." ở slide 9, cụm "like the red dot on slide 1" ở slide 10.
