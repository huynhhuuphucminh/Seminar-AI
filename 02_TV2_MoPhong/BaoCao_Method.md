<!--
Trạng thái: bản nháp do AI (Claude) viết từ notebook PSO_Seminar.ipynb và bảng thông số chung.
TV2 cần đọc lại, bấm máy lại ví dụ ở mục 3.3 và 3.4, và viết lại câu chữ theo cách của mình trước khi gửi TV1 ghép.
Ví dụ 1 chiều ở mục 3.3 cần khớp với file 01_TV1_LyThuyet/ViDuTinhTay.md khi TV1 nộp.
-->

# 3. Method and Worked Example

All examples and experiments in this section were designed and run by our team. Equations taken from the literature are cited where they appear.

## 3.1 Optimisation problem and objective functions

We minimise a continuous function f: ℝⁿ → ℝ over a box-shaped search domain. The **fitness** of a candidate solution x is simply its objective value f(x); a lower fitness is better. Two standard benchmark functions with n = 2 decision variables are used:

- **Sphere:** f(x) = Σᵢ xᵢ². It has a single minimum, f = 0 at x = (0, 0), and no local minima. It tests how fast the swarm converges on an easy, smooth landscape.
- **Rastrigin:** f(x) = 10n + Σᵢ (xᵢ² − 10 cos(2πxᵢ)). Its global minimum is also f = 0 at (0, 0), but the cosine term creates a regular grid of local minima, roughly at integer coordinates. It tests whether the swarm can avoid being trapped.

Both functions use the domain [−5.12, 5.12]² in every run. Each call of f on one particle counts as one **function evaluation**, the cost measure used to compare algorithms. Because Rastrigin is computed as a difference of two numbers close to 20, values below about 10⁻¹³ are at floating-point resolution and are treated as reaching the global minimum.

## 3.2 Algorithm

We use the global-best PSO with an inertia weight, in the form given by Poli et al. (2007, Sect. 2.3, Eq. 2). For particle i at iteration t:

v_i(t+1) = ω v_i(t) + c₁ r₁ ⊗ (pbest_i − x_i(t)) + c₂ r₂ ⊗ (gbest − x_i(t))

x_i(t+1) = x_i(t) + v_i(t+1)

**Table 3.1. Symbols and values used in this work.**

| Symbol | Meaning | Range or value used |
|---|---|---|
| x_i(t) | Position of particle i, a candidate solution | [−5.12, 5.12]² |
| v_i(t) | Velocity of particle i (step taken in one iteration) | each component in [−2.0, 2.0] |
| pbest_i | Best position found so far by particle i (personal best) | updated when f improves |
| gbest | Best position found so far by the whole swarm (global best) | updated every iteration |
| ω | Inertia weight: how much of the previous velocity is kept | 0.4, 0.7 (default), 0.9 |
| c₁ | Cognitive coefficient: pull towards pbest_i | 1.5 |
| c₂ | Social coefficient: pull towards gbest | 1.5 |
| r₁, r₂ | Random numbers, drawn independently for every particle, dimension and iteration | U(0, 1) |
| ⊗ | Component-wise multiplication | |
| N | Number of particles | 20 (5 in Sect. 3.4) |
| T | Number of iterations | 100 (5 in Sect. 3.4) |
| v_max | Velocity limit | 2.0 |

The assignment sheet writes the position update with v(t); we use the newly computed velocity v(t+1), which is the form in Poli et al. (2007). The algorithm runs as follows:

1. Place N particles uniformly at random in the domain and draw their velocities uniformly from [−v_max, v_max].
2. Evaluate f for every particle. Set pbest_i = x_i and gbest = the best of all pbest_i.
3. For t = 1, …, T:
   1. Draw r₁ and r₂ for every particle and dimension.
   2. Update every velocity with the equation above, then clip each component to [−v_max, v_max].
   3. Move every particle with x_i(t+1) = x_i(t) + v_i(t+1), then clip the position to the domain.
   4. Evaluate f at the new positions. If f(x_i) < f(pbest_i), set pbest_i = x_i.
   5. Set gbest to the best pbest_i.
4. Return gbest and f(gbest).

Velocity clamping follows the original PSO, in which each velocity component is kept within [−V_max, +V_max] (Poli et al., 2007, Sect. 2.2). Positions outside the domain are moved back to the nearest boundary. We keep v_max = 2.0, about 20% of the domain width (10.24), as a safeguard in the spirit of the original PSO. Poli et al. (2007, Sects. 2.3–2.4) note that with an inertia weight or constriction, V_max can be removed or set to the dynamic range of each variable, so our limit is tighter than that rule. It was active in the worked example (Section 3.4), and its effect on the inertia sweep is checked in Section 4.2. With N = 20 and T = 100, one run uses 20 + 20 × 100 = **2020 function evaluations**.

## 3.3 Worked example 1: one update step in one dimension

To show every term of the update, we take f(x) = x², ω = 0.7, c₁ = c₂ = 1.5, two particles and fixed random numbers. No velocity limit is applied in this example. At iteration 0, each pbest equals the particle's own position, and gbest = −2 because f(−2) = 4 < f(3) = 9.

**Table 3.2. One update step for two particles (f(x) = x²).**

| Particle | x(0) | v(0) | r₁ | r₂ | Inertia ωv | Cognitive c₁r₁(pbest − x) | Social c₂r₂(gbest − x) | v(1) | x(1) | f(x(1)) |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | 3 | 0.5 | 0.4 | 0.6 | 0.35 | 0 | 1.5 × 0.6 × (−5) = −4.5 | −4.15 | −1.15 | 1.3225 |
| 2 | −2 | −0.5 | 0.8 | 0.3 | −0.35 | 0 | 0 | −0.35 | −2.35 | 5.5225 |

The cognitive term is zero for both particles because pbest = x at iteration 0. Particle 2 is the current gbest, so its social term is also zero and it only moves by inertia, which takes it further from the optimum (f rises from 4 to 5.5225). Particle 1 is pulled strongly towards particle 2, overshoots the optimum and lands at −1.15. Its fitness improves from 9 to 1.3225, so pbest₁ = −1.15 and the new gbest = −1.15. The example shows that a single step can make one particle worse while the swarm as a whole improves.

## 3.4 Worked example 2: five particles over five iterations

We ran the full algorithm on the 2-D Sphere function with N = 5, T = 5, seed 42 and the default parameters (ω = 0.7, c₁ = c₂ = 1.5, v_max = 2.0). Tables 3.3 and 3.4 give the state of every particle at iterations 0 and 1.

**Table 3.3. Particle states at iteration 0 (Sphere, seed 42).**

| Particle | x1 | x2 | v1 | v2 | f(x) |
|---|---|---|---|---|---|
| 1 | 2.8053 | −0.6259 | −0.5168 | 1.7071 | 8.2615 |
| 2 | 3.6720 | 2.0210 | 0.5755 | 1.2910 | 17.5685 |
| 3 | −4.1556 | 4.8704 | −0.2263 | −1.0910 | 40.9897 |
| 4 | 2.6741 | 2.9293 | 0.2183 | −1.7447 | 15.7314 |
| 5 | −3.8081 | −0.5080 | 1.3105 | 0.5267 | 14.7599 |

At iteration 0, pbest_i = x_i for every particle and gbest = (2.8053, −0.6259) from particle 1, with f = 8.2615.

**Table 3.4. Particle states at iteration 1.**

| Particle | x1 | x2 | v1 | v2 | f(x) |
|---|---|---|---|---|---|
| 1 | 2.4435 | 0.5691 | −0.3618 | 1.1949 | 6.2947 |
| 2 | 3.6513 | 1.4539 | −0.0208 | −0.5671 | 15.4455 |
| 3 | −2.1556 | 2.8704 | 2.0000 | −2.0000 | 12.8858 |
| 4 | 2.8525 | 0.9293 | 0.1784 | −2.0000 | 9.0003 |
| 5 | −1.8081 | −0.2578 | 2.0000 | 0.2503 | 3.3357 |

Every particle improved, so every pbest_i moved to the new position. The new gbest is particle 5 at (−1.8081, −0.2578), f = 3.3357.

**Particle 2, step by step.** The random numbers used were r₁ = (0.9707, 0.8931) and r₂ = (0.3258, 0.3705). In dimension 1, the inertia term is 0.7 × 0.5755 = 0.4028, the cognitive term is 0 and the social term is 1.5 × 0.3258 × (2.8053 − 3.6720) = −0.4236, so v₁(1) = −0.0208 and x₁(1) = 3.6720 − 0.0208 = 3.6513 (rounded). In dimension 2, the inertia term is 0.9037 and the social term is 1.5 × 0.3705 × (−0.6259 − 2.0210) = −1.4709, so v₂(1) = −0.5671 and x₂(1) = 1.4539. The new fitness is 3.6513² + 1.4539² = 15.4455.

Two details matter when the step is checked by hand. First, particles 3, 4 and 5 hit the velocity limit: particle 3, for example, had a raw velocity of (4.7444, −2.3258), which was clipped to (2.0, −2.0). Second, every update in iteration 1 uses the gbest of iteration 0, not the gbest found during iteration 1.

Over the five iterations, f(gbest) fell from 8.2615 to 3.3357, 0.1734, 0.1734, 0.1734 and finally 0.0195. Figure 3.1 shows the swarm contracting towards the optimum.

> **Figure 3.1.** Positions of the five particles on the contour plot of the Sphere function at iterations 0, 1, 3 and 5 (seed 42). The star marks gbest and the cross marks the global minimum. *File: `02_TV2_MoPhong/figures/fig_swarm_sphere.png`.*

## 3.5 Experimental setup

To study the effect of the inertia weight, we compare three settings with c₁ = c₂ = 1.5: **A** (ω = 0.4), **B** (ω = 0.7) and **C** (ω = 0.9). Each setting is run on both functions with N = 20, T = 100 and five random seeds (0 to 4), giving 30 runs of 2020 function evaluations each. For each run we record the best fitness after every iteration. We report the final best fitness as the mean, sample standard deviation, best and worst value over the five seeds, and we plot the mean best fitness against the iteration number on a logarithmic scale, with a band from the minimum to the maximum over the seeds.

For the comparison with local search (Section 4), Random Search and Hill Climbing are given exactly the same budget of 2020 function evaluations per run and use the same seeds.

All code is in the notebook `02_TV2_MoPhong/PSO_Seminar.ipynb` (Python, NumPy). Each run is fully determined by its seed; re-running any combination reproduces the stored results in `results_pso.csv`. With five seeds and two 2-D functions, the experiment illustrates the behaviour of PSO but does not support general claims about other problems.

## References used in this section

Poli, R., Kennedy, J. & Blackwell, T. (2007). Particle swarm optimization: An overview. *Swarm Intelligence*, 1, 33–57. https://doi.org/10.1007/s11721-007-0002-0
