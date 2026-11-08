# Premature convergence on Rastrigin

The diagnostic sweep used five particles, 100 iterations, ω = 0.4, c₁ = 0.5, and c₂ = 2.5. We ran seeds 0–19, printed every final value, and selected the first seed whose final fitness exceeded 0.9. Nineteen seeds met this rule. Seed 0 was the first, with final fitness 1.98991811419.

**Seed 0 trajectory.** Diversity is the mean Euclidean distance of particles from their current centroid. The default PSO comparison uses 20 particles, ω = 0.7 and c₁ = c₂ = 1.5.

| Iteration | Diagnostic best fitness | Diagnostic diversity | Default best fitness | Default diversity |
|---:|---:|---:|---:|---:|
| 0 | 24.218210 | 4.183873 | 9.480294 | 3.826593 |
| 10 | 2.169646 | 0.292136 | 4.689884 | 1.301081 |
| 50 | 1.989918 | 7.524e−05 | 2.074e−03 | 0.569387 |
| 100 | 1.989918 | 7.852e−10 | 1.408e−08 | 0.091767 |

The final diagnostic gbest was approximately (−0.994959, 0.994959). Rastrigin is separable, so we solved 2u + 20π sin(2πu) = 0 by bisection near −1 and 1. The diagonal Hessian entries 2 + 40π² cos(2πu) are positive there, with zero mixed derivatives. Evaluating the objective at that stationary point gives 1.98991811419, the same as at the final gbest to the displayed precision. The global minimum at (0, 0) has fitness 0.

The five particles start spread out and cluster near the same basin by iteration 10. The relatively strong social term can pull particles toward the shared best, the low inertia retains less previous motion, and fewer particles offer fewer chances to visit distinct basins. The default run retained more diversity and found a point near the origin. The comparison changes population size, inertia and both acceleration weights together, so it illustrates a failure mode without isolating its cause. The two runs also used different budgets (505 versus 2,020 evaluations).

**Figure 4.3.** Diagnostic particle positions at iterations 0, 10, 50 and 100, with the global minimum and final gbest marked. The right panels compare best fitness and swarm diversity with the same-seed default run. Source: team experiments. [Local-optimum figure](figures/fig_local_optimum.png) · [Notebook and 20-seed sweep](Baseline_SoSanh.ipynb)
