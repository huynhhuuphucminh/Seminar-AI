# 4. Results and Discussion

## 4.1 Equal-budget comparison

We compared default PSO (ω = 0.7) with two baselines on Sphere and Rastrigin. Random Search drew independent uniform candidates from the search box. Hill Climbing began at one uniform point and added independent Gaussian noise with standard deviation 0.3 per coordinate. It clipped each proposal to the box, accepted only strict improvements and used no restarts.

Each run received 2,020 objective evaluations, including initialization and rejected proposals. PSO used 20 evaluations per swarm batch. Figures 4.1 and 4.2 therefore compare best-so-far fitness after 20, 40, …, 2,020 evaluations. Table 4.1 reports the mean, sample standard deviation and range across seeds 0–4. Table 4.2 reports the first recorded fitness below 0.01. It separates the proportion of seeds reaching the target from the mean evaluation count among those seeds.

> **Tables 4.1 and 4.2.** Insert the [final fitness and first-hit tables](comparison_tables.md). Source: team experiments.
>
> **Figures 4.1 and 4.2.** Best-so-far fitness on [Sphere](../../figs/fig_compare_sphere.png) and [Rastrigin](../../figs/fig_compare_rastrigin.png). Lines show the arithmetic mean and ribbons show the full observed range across five runs. The Rastrigin plot uses a display floor of 10⁻¹³ because of floating-point resolution. Source: team experiments.

On Sphere, Hill Climbing reached 0.01 in all five runs after a mean of 42.6 evaluations, compared with 132.0 evaluations for default PSO (Table 4.2). Hill Climbing's progress then slowed, while PSO continued improving (Figure 4.1). At the full budget, PSO averaged 1.795 × 10⁻¹³, compared with 2.602 × 10⁻⁴ for Hill Climbing and 1.397 × 10⁻² for Random Search (Table 4.1). A single local search was useful for rapid initial progress on the smooth objective. PSO was stronger when the goal was final accuracy under this budget.

On Rastrigin, default PSO reached 0.01 in all five runs, averaging 784 evaluations. Neither baseline reached it (Table 4.2). Random Search still finished ahead of Hill Climbing, with final means of 1.232 and 5.205, respectively, while PSO averaged 2.077 × 10⁻⁷ (Table 4.1). Uniform sampling continued to try points in different basins. The fixed-scale, single-start Hill Climbing runs made slower improvements on this landscape (Figure 4.2). The comparison measures final fitness and evaluations to a target. Runtime depends on implementation and was outside the scope of the experiment.

## 4.2 Sensitivity to inertia

**Table 4.3. Mean final PSO fitness in the Member 2 inertia sweep.** Each mean uses five seeds and 2,020 evaluations per run. The cognitive and social coefficients were held at 1.5. Source: team experiments. [Member 2 inertia summary](../../results/summary_pso.csv)

| Function | A (ω = 0.4) | B (ω = 0.7) | C (ω = 0.9) |
|---|---:|---:|---:|
| Sphere | 5.455e−31 | 1.795e−13 | 4.158e−05 |
| Rastrigin | 1.990e−01 | 2.077e−07 | 8.452e−03 |

The lowest inertia gave the best final mean on Sphere, while the middle setting gave the best mean on Rastrigin (Table 4.3). Four Rastrigin runs under configuration A had fitness below 10⁻⁶, but a fifth ended near 0.995 and dominated its mean. Configuration C retained more velocity from the previous update and gave the highest mean on Sphere within this budget. Inertia was the only parameter varied independently, so the sweep shows sensitivity to ω under these settings. Ranking the effects of the cognitive and social coefficients would require a separate controlled sweep.

## 4.3 Premature convergence

In a separate Rastrigin diagnostic, we ran five particles with ω = 0.4, c₁ = 0.5 and c₂ = 2.5 for 100 iterations across seeds 0–19. Seed 0 was the first to finish above 0.9. It ended at a verified local minimum near (−0.994959, 0.994959) with fitness 1.989918, above the global value of 0. The mean particle distance to the swarm centroid fell from 4.184 to 7.85 × 10⁻¹⁰. The same-seed default run retained a final mean distance of 0.0918 and found a point near the origin with fitness 1.408 × 10⁻⁸ (Figure 4.3).

The strong pull toward gbest, weak momentum and small population are plausible contributors to the rapid collapse in diversity seen in Figure 4.3. The diagnostic changes several settings together and uses 505 evaluations compared with 2,020 for the default run. It shows how a swarm can converge tightly around a suboptimal basin without estimating how much each parameter contributed.

> **Figure 4.3.** Rastrigin contours at iterations 0, 10, 50 and 100, with fitness and diversity traces for the diagnostic and default runs. Source: team experiments. [Figure](../../figs/fig_local_optimum.png) · [Analysis](local_optimum_analysis.md)

## 4.4 Applications and scope

**Range of applications.** PSO has been used across many fields. Poli et al. (2007, Sect. 6) counted more than 1,100 PSO publications in IEEE Xplore, of which about 700 were applications, and grouped them into 26 categories. The largest were image and video analysis (51 papers), electricity networks and load dispatching (48) and control (47), followed by electronics and electromagnetics, antenna design, power generation, scheduling, communication networks, clustering and classification, and neural networks. The authors found PSO most promising for multimodal problems and for problems where no specialised method exists or where specialised methods give unsatisfactory results. These counts show how often PSO has been used in 2007, not how well it performs in each field. Two applications are described below, because in both the objective has several local optima, as in our Rastrigin experiment.

**Application 1: photovoltaic maximum power point tracking.** Alshareef et al. (2019) used a PSO-based method to track the maximum power point of a photovoltaic array under partial shading, where the power curve has several local peaks. Each particle is a converter duty cycle and its fitness is the measured output power. In hardware tests with three particles and three shading scenarios, standard PSO (ω = 0.4) reached 94–99% efficiency, while perturb-and-observe, a local method, was trapped on a local peak in two scenarios (35.87 W against 40.76 W rated in the first, 44.1 W against 76.53 W in the third). Their proposed variant, which applies perturb-and-observe to the best particle, converged faster (1.9–2.4 s against 3.0–4.6 s). This resembles our Hill Climbing baseline on Rastrigin, although their problem has one variable and ours has two.

**Application 2: UAV path planning.** Phung and Ha (2021) used a PSO variant, spherical vector-based PSO (SPSO), to plan the flight path of an unmanned aerial vehicle among several threats. The cost to be minimised is a weighted sum of four terms: path length, threat, smoothness and flight height. In classic PSO a particle is a list of 3D waypoints. In SPSO it is a list of vectors, each with a length, an elevation angle and an azimuth angle, so a particle position corresponds to the UAV's speed, turn angle and climb or dive angle. The authors compared SPSO with classic PSO, phase angle-encoded PSO, quantum-behaved PSO, a genetic algorithm, artificial bee colony and differential evolution on eight scenarios built from real digital elevation maps. They used 500 particles, 200 iterations and ten runs, and the PSO variants shared ω (starting at 1 and damped by 0.98 per iteration) and c₁ = c₂ = 1.5. SPSO gave a significantly lower mean cost than classic PSO in six of the eight scenarios (for example 6,006 against 6,396 in scenario 8) and the lowest mean cost in most scenarios against the other metaheuristics, although the authors note that differential evolution did better in scenario 7. They also report that SPSO converged to a local optimum in some scenarios, and that the genetic algorithm converged quickly to premature solutions. This is the failure mode shown in our Figure 4.3. A real drone flew the planned paths in two test scenarios. SPSO is a modified PSO, so these results do not transfer directly to the standard PSO used here.

The benchmark evidence in this report covers two 2-D functions, five comparison seeds and one Hill Climbing step scale. It cannot establish the same ranking for either application.

# 5. Conclusion

Personal bests retain information from each particle's search. The global best lets the swarm exploit a promising region together. Inertia affects how much motion carries forward. In our two benchmarks, the default setting used this balance to finish with better mean fitness than either baseline (Table 4.1). Yet the diagnostic swarm became tightly concentrated around a suboptimal Rastrigin basin (Figure 4.3). Sharing a promising position can speed up refinement, while keeping some particles mobile helps preserve the chance to discover another basin.

A controlled follow-up could vary population size and the acceleration coefficients one at a time under a fixed evaluation budget. A second experiment could compare diversity-triggered restarts with the original PSO on higher-dimensional objectives, counting restart evaluations within the same budget.

## References to merge into the report

- Alshareef, M., Lin, Z., Ma, M., & Cao, W. (2019). Accelerated particle swarm optimization for photovoltaic maximum power point tracking under partial shading conditions. *Energies, 12*(4), 623. [DOI](https://doi.org/10.3390/en12040623)
- Phung, M. D., & Ha, Q. P. (2021). Safety-enhanced UAV path planning with spherical vector-based particle swarm optimization. *Applied Soft Computing, 107*, 107376. [DOI](https://doi.org/10.1016/j.asoc.2021.107376)
- Member 2 and Member 3, CS420 Seminar S01 (2026). [PSO histories](../../results/results_pso.csv), [baseline histories](../../results/results_baseline.csv), and [comparison notebook](../../notebooks/Baseline_Comparison.ipynb). Team-generated data and analysis.
- OpenAI Codex assisted with experiment implementation, analysis and drafting. [Member 3 AI log](../ai_log/member3.md)
