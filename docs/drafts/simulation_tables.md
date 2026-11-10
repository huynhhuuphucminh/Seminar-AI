# Simulation tables: five particles over five iterations on Sphere

> **Status:** working draft from `notebooks/PSO_Seminar.ipynb`, section 2, written with AI assistance (see the AI-use log). **All numbers are from the first version, v_max = 2.0.** The submitted report uses v_max = 10.24; its Table 3 and the files in `results/` hold the final values.

**Setting:** 2-D Sphere, domain [−5.12, 5.12]², 5 particles, 5 iterations, seed 42, ω = 0.7, c₁ = c₂ = 1.5, |v| ≤ 2.0.

This is minimum output 1 of the assignment (particle states at iterations 0 and 1).

## 1. Iteration 0 (initialisation)

| particle | x1 | x2 | v1 | v2 | f(x) | pbest1 | pbest2 | f(pbest) |
|---|---|---|---|---|---|---|---|---|
| 1 | 2.8053 | -0.6259 | -0.5168 | 1.7071 | 8.2615 | 2.8053 | -0.6259 | 8.2615 |
| 2 | 3.6720 | 2.0210 | 0.5755 | 1.2910 | 17.5685 | 3.6720 | 2.0210 | 17.5685 |
| 3 | -4.1556 | 4.8704 | -0.2263 | -1.0910 | 40.9897 | -4.1556 | 4.8704 | 40.9897 |
| 4 | 2.6741 | 2.9293 | 0.2183 | -1.7447 | 15.7314 | 2.6741 | 2.9293 | 15.7314 |
| 5 | -3.8081 | -0.5080 | 1.3105 | 0.5267 | 14.7599 | -3.8081 | -0.5080 | 14.7599 |

gbest(0) = (2.8053, −0.6259), f(gbest) = 8.2615 (particle 1).

## 2. Iteration 1

| particle | x1 | x2 | v1 | v2 | f(x) | pbest1 | pbest2 | f(pbest) |
|---|---|---|---|---|---|---|---|---|
| 1 | 2.4435 | 0.5691 | -0.3618 | 1.1949 | 6.2947 | 2.4435 | 0.5691 | 6.2947 |
| 2 | 3.6513 | 1.4539 | -0.0208 | -0.5671 | 15.4455 | 3.6513 | 1.4539 | 15.4455 |
| 3 | -2.1556 | 2.8704 | 2.0000 | -2.0000 | 12.8858 | -2.1556 | 2.8704 | 12.8858 |
| 4 | 2.8525 | 0.9293 | 0.1784 | -2.0000 | 9.0003 | 2.8525 | 0.9293 | 9.0003 |
| 5 | -1.8081 | -0.2578 | 2.0000 | 0.2503 | 3.3357 | -1.8081 | -0.2578 | 3.3357 |

gbest(1) = (−1.8081, −0.2578), f(gbest) = 3.3357 (particle 5).

All five particles improved on their old positions, so every pbest moved to the new position.

## 3. Particle 2 by hand (iteration 0 to 1)

Particle 1 is not a useful example: at iteration 0 it is the gbest, so both the cognitive and the social terms are zero and it moves by inertia only. Particle 2 is used instead:

- Random numbers used by the notebook: r₁ = (0.9707, 0.8931), r₂ = (0.3258, 0.3705).
- At iteration 0, pbest₂ = x₂, so the cognitive term is 1.5 · r₁ · 0 = 0 in both dimensions.

| Step | Dimension 1 | Dimension 2 |
|---|---|---|
| Inertia ω·v(0) | 0.7 × 0.5755 = 0.4028 | 0.7 × 1.2910 = 0.9037 |
| Cognitive c₁r₁(pbest − x) | 0 | 0 |
| Social c₂r₂(gbest − x) | 1.5 × 0.3258 × (2.8053 − 3.6720) = −0.4236 | 1.5 × 0.3705 × (−0.6259 − 2.0210) = −1.4709 |
| v(1) = sum (within ±2.0) | −0.0208 | −0.5671 |
| x(1) = x(0) + v(1) | 3.6720 − 0.0208 = 3.6513 | 2.0210 − 0.5671 = 1.4539 |
| f(x(1)) | 3.6513² + 1.4539² = 15.4455 | |

Differences in the fourth decimal (e.g. 3.6512 against 3.6513) come from rounding; the notebook uses full precision.

**Two points that are easy to get wrong by hand:**
- **Velocity limit:** particle 3 had a raw velocity of (4.7444, −2.3258), clipped to (2.0, −2.0). Particle 5 had a raw velocity of 3.1683 in dimension 1, clipped to 2.0.
- **The gbest used in the update** is the gbest of iteration 0 (particle 1), not the new gbest of iteration 1.

## 4. gbest over five iterations

| iteration | 0 | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|---|
| f(gbest) | 8.2615 | 3.3357 | 0.1734 | 0.1734 | 0.1734 | 0.0195 |

## 5. Inertia-weight results handed to Member 3 (v_max = 2.0)

Final best fitness (iteration 100, 2020 evaluations), five seeds:

| function | config | ω | mean | std | best | worst |
|---|---|---|---|---|---|---|
| Sphere | A | 0.4 | 5.455e-31 | 7.353e-31 | 1.193e-32 | 1.794e-30 |
| Sphere | B | 0.7 | 1.795e-13 | 1.843e-13 | 4.595e-14 | 4.616e-13 |
| Sphere | C | 0.9 | 4.158e-05 | 5.612e-05 | 6.167e-06 | 1.377e-04 |
| Rastrigin | A | 0.4 | 1.990e-01 | 4.450e-01 | 0 | 9.950e-01 |
| Rastrigin | B | 0.7 | 2.077e-07 | 4.565e-07 | 5.684e-14 | 1.024e-06 |
| Rastrigin | C | 0.9 | 8.452e-03 | 8.004e-03 | 5.254e-04 | 1.956e-02 |

Notes for the Results section:
- On Rastrigin, setting A (ω = 0.4) stopped at 0.995 for seed 0, a local minimum next to the origin; the other four seeds reached 0.
- On Sphere, small ω converged fastest; on Rastrigin, ω = 0.7 was the most stable of the three settings.
- **Depends on v_max:** the stalled ω = 0.4 run only occurs with v_max ≤ 5.12. With v_max = 10.24 (the domain width) or no limit, all five ω = 0.4 runs reach 0 and ω = 0.9 gets worse. See section 4 of the notebook and `results/vmax_sensitivity.csv`. This led to the final setting v_max = 10.24.
- Rastrigin is computed as a difference of two numbers close to 20, so values below about 1e-13 (including 0) only mean "global minimum reached".
- Only five seeds and two 2-D functions, so these remarks hold for this experiment only.
