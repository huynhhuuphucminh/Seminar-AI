# TV1 presentation segment

> Bản nháp do AI (Claude) soạn theo prompt 4.1. TV1 tập nói theo speaker notes và bấm giờ; sửa lời cho tự nhiên với giọng của mình.

Three content slides in about four and a half minutes, after the title slide. TV1 opens the talk.

## 1. Why PSO? · 1 min 20 s

- Many problems: minimise a function without gradients
- Local search stops at the first basin
- PSO: many particles that share what they find
- Guiding question: individual memory versus social information

**Visual and credit.** Small sketch of a swarm moving towards a minimum on a contour plot; reuse iteration 0 and 5 panels of `02_TV2_MoPhong/figures/fig_swarm_sphere.png`. Credit: team experiment.

**Speaker notes.** Our topic is Particle Swarm Optimization. Many real problems, like tuning a model or building a schedule, come down to finding the input that gives the lowest value of some function. Often we have no gradient, and the function has many local minima. A simple local search can get stuck in the first valley it finds. PSO searches with a whole group of particles that share information. Our guiding question is how PSO mixes what each particle remembers with what the group knows, to balance exploring new regions and refining good ones.

## 2. From flocking to an optimiser (Kennedy & Eberhart, 1995) · 1 min 40 s

- Started as a simulation of bird flocks
- pbest: each agent's own best memory
- gbest: the best position known to everyone
- Both are necessary; unbalanced pulls cause problems
- v ← v + 2·rand()·(pbest − x) + 2·rand()·(gbest − x)

**Visual and credit.** The update equation large in the centre, with "pbest" and "gbest" labels. Credit: Kennedy & Eberhart (1995), p. 1946.

**Speaker notes.** PSO was not designed from optimisation theory. Kennedy, a social psychologist, and Eberhart, an electrical engineer, were simulating bird flocks. Each agent remembered the best place it had found, called pbest, and everyone knew the best place found by the group, called gbest. When they removed unnecessary parts, both memories turned out to be essential. They also saw that if the pull towards gbest is much stronger, the flock rushes into a local minimum too early. The final rule adds two random pulls to the current velocity. The factor 2 makes the average pull equal to one, so particles overshoot their target about half the time. In their early tests, PSO trained small neural networks about as well as backpropagation.

## 3. What changed by 2007 (Poli et al., 2007) · 1 min 30 s

- Inertia weight ω: 1 − ω acts like friction
- High ω explores, low ω exploits
- Constriction χ ≈ 0.7298 ↔ ω = 0.73, c ≈ 1.49
- Topology: gbest is fast, lbest resists local optima
- Our default: ω = 0.7, c₁ = c₂ = 1.5

**Visual and credit.** Modern update equation with ω highlighted; a two-column comparison 1995 versus 2007. Credit: Poli et al. (2007), Sects. 2.3, 2.4, 3.1.

**Speaker notes.** Twelve years later, Poli, Kennedy and Blackwell reviewed how PSO had developed. The coefficient 2 from the original paper made particles speed up out of control, so two fixes became standard. The inertia weight multiplies the old velocity; one minus omega works like friction. A high omega lets particles travel far and explore, a low omega slows them down so they exploit. Clerc's constriction factor gives an equivalent setting of about 0.73 for omega and about 1.49 for both coefficients. That is why our team uses 0.7 and 1.5. The review also shows that the communication structure matters: the global-best topology converges fast, while a ring is slower but less likely to be trapped. Now my teammate will show how the algorithm works step by step.
