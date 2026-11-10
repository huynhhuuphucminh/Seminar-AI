# Formulas, symbols and comparison of PSO with Hill Climbing

> **Status:** drafted with AI assistance (prompt 1.4, see the AI-use log). The full symbol table went into the Method section of the report. **Values are those of the first version (v_max = 2.0)**; the submitted report uses v_max = 10.24, so velocities lie in [−10.24, 10.24] and the PSO first-hit count on Sphere is 216 evaluations (Report, Tables 1 and 5).

## 1. Symbols

| Symbol | Meaning | Range or unit | Value used by the team |
|---|---|---|---|
| x_i(t) | Position of particle i at iteration t (a candidate solution) | point in the search domain | [−5.12, 5.12]² |
| v_i(t) | Velocity of particle i (step added to the position) | same unit as x | each component in [−2.0, 2.0] (final report: [−10.24, 10.24]) |
| pbest_i | Best position visited by particle i so far | point in the domain | updated when f improves |
| gbest | Best position found by the whole swarm so far | point in the domain | updated every iteration |
| ω | Inertia weight | usually 0.4 to 0.9 | 0.4, 0.7, 0.9 |
| c₁ | Cognitive (personal) acceleration coefficient | ≥ 0 | 1.5 |
| c₂ | Social acceleration coefficient | ≥ 0 | 1.5 |
| r₁, r₂ | Uniform random numbers, new for each particle, dimension and iteration | [0, 1] | drawn by the code |
| t | Iteration counter | 0, 1, …, T | T = 100 |
| N | Number of particles | integer | 20 (5 in the small simulation) |
| n | Number of dimensions | integer | 2 |

## 2. The three terms of the velocity update

v_i(t+1) = **ω v_i(t)** + **c₁ r₁ (pbest_i − x_i(t))** + **c₂ r₂ (gbest − x_i(t))**

| Term | Meaning | Role |
|---|---|---|
| Inertia ω v_i(t) | Keeps part of the previous motion | Large ω carries particles further and favours **exploration**; small ω damps motion and favours **exploitation** |
| Cognitive c₁ r₁ (pbest_i − x_i) | Pull towards the particle's own best memory | Keeps particles searching around regions they found good; preserves diversity because each particle has its own pbest |
| Social c₂ r₂ (gbest − x_i) | Pull towards the swarm's best | Spreads good information and concentrates the swarm (**exploitation**); if too strong, the swarm collapses early onto one basin |

**Note.** Kennedy & Eberhart (1995, p. 1945) observed that a much larger g_increment makes the flock "rush prematurely towards local minima" and a much larger p_increment makes individuals wander; roughly equal values gave the best search. This is why the team sets c₁ = c₂. Poli et al. (2007, Sect. 2.3) interpret 1 − ω as a friction coefficient.

## 3. Pseudo-code

```
Input: objective f, domain [lo, hi]^n, N, T, ω, c1, c2, vmax
1  for each particle i = 1..N:
2      x_i ← uniform random point in [lo, hi]^n
3      v_i ← uniform random vector in [−vmax, vmax]^n
4      pbest_i ← x_i
5  gbest ← argmin over i of f(pbest_i)
6  for t = 1..T:
7      for each particle i:
8          draw r1, r2 ~ U(0, 1) for every dimension
9          v_i ← ω v_i + c1 r1 (pbest_i − x_i) + c2 r2 (gbest − x_i)
10         v_i ← clip(v_i, −vmax, vmax)
11         x_i ← clip(x_i + v_i, lo, hi)
12         if f(x_i) < f(pbest_i): pbest_i ← x_i
13     gbest ← argmin over i of f(pbest_i)
14 return gbest, f(gbest)
```

**Note.** Line 13 is outside the particle loop, so the whole swarm uses the previous iteration's gbest during one iteration (synchronous update). The notebook implements exactly this.

## 4. PSO versus Hill Climbing

| Criterion | Hill Climbing | PSO |
|---|---|---|
| Solutions kept | One current solution | A population of N particles |
| Memory | Only the current point | Each particle's pbest plus the swarm's gbest |
| How the next point is chosen | A neighbour of the current point (here a Gaussian step, σ = 0.3); accepted only if better | Velocity combining inertia, own best and swarm best; every move is accepted, only the memories require improvement |
| Information sharing | None | Through gbest (social term) |
| Escaping local optima | Cannot without restarts, because worse moves are never accepted | Possible, because particles move through worse regions and other particles may still find a better basin; not guaranteed |
| Cost per iteration | 1 evaluation | N evaluations |
| Typical strength | Fast early progress on smooth, single-basin functions | Better final accuracy and robustness on multimodal functions under the same budget |
| When to use | Cheap local refinement, good starting point known | Global search, no gradient, landscape with many local optima |

**Note.** The "Typical strength" row matches the comparison results: Hill Climbing reaches 0.01 on Sphere sooner than PSO (42.6 against 216 evaluations in the final report; 132 with v_max = 2.0) but PSO ends with the better final value, and on Rastrigin only PSO reaches the threshold.

## 5. Applications (with sources)

From Poli et al. (2007, Sect. 6, pp. 50–51), no external source needed:

- **Scheduling:** 38 application papers (5.6%) in the authors' analysis of IEEE Xplore.
- **Neural networks** (training and design, which includes tuning a network's hyper-parameters): 26 papers (3.8%). Kennedy & Eberhart (1995) already trained neural-network weights with PSO (XOR, Iris).
- **Electricity networks and load dispatching:** 48 papers (7.1%), the second-largest category.

Section 4.4 of the report adds two external sources: Alshareef et al. (2019) for photovoltaic maximum power point tracking and Phung & Ha (2021) for UAV path planning. In the team's reading they belong to the power/energy and control/robotics categories above; the Poli paper does not mention them.
