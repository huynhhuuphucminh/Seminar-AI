# 4. Results and Discussion

## 4.1 Equal-budget comparison

We compared default PSO (ω = 0.7) with two baselines on Sphere and Rastrigin. Random Search drew independent uniform candidates from the search box. Hill Climbing began at one uniform point and added independent Gaussian noise with standard deviation 0.3 per coordinate. It clipped each proposal to the box, accepted only strict improvements and used no restarts.

Each run received 2,020 objective evaluations, including initialization and rejected proposals. PSO used 20 evaluations per swarm batch. Figures 4.1 and 4.2 therefore compare best-so-far fitness after 20, 40, …, 2,020 evaluations. Table 4.1 reports the mean, sample standard deviation and range across seeds 0–4. Table 4.2 reports the first recorded fitness below 0.01. It separates the proportion of seeds reaching the target from the mean evaluation count among those seeds.

> **Tables 4.1 and 4.2.** Insert the [final fitness and first-hit tables](BangSoSanh.md). Source: team experiments.
>
> **Figures 4.1 and 4.2.** Best-so-far fitness on [Sphere](figures/fig_compare_sphere.png) and [Rastrigin](figures/fig_compare_rastrigin.png). Lines show the arithmetic mean and ribbons show the full observed range across five runs. The Rastrigin plot uses a display floor of 10⁻¹³ because of floating-point resolution. Source: team experiments.

On Sphere, Hill Climbing reached 0.01 in all five runs after a mean of 42.6 evaluations, compared with 132.0 evaluations for default PSO (Table 4.2). Hill Climbing's progress then slowed, while PSO continued improving (Figure 4.1). At the full budget, PSO averaged 1.795 × 10⁻¹³, compared with 2.602 × 10⁻⁴ for Hill Climbing and 1.397 × 10⁻² for Random Search (Table 4.1). A single local search was useful for rapid initial progress on the smooth objective. PSO was stronger when the goal was final accuracy under this budget.

On Rastrigin, default PSO reached 0.01 in all five runs, averaging 784 evaluations. Neither baseline reached it (Table 4.2). Random Search still finished ahead of Hill Climbing, with final means of 1.232 and 5.205, respectively, while PSO averaged 2.077 × 10⁻⁷ (Table 4.1). Uniform sampling continued to try points in different basins. The fixed-scale, single-start Hill Climbing runs made slower improvements on this landscape (Figure 4.2). The comparison measures final fitness and evaluations to a target. Runtime depends on implementation and was outside the scope of the experiment.

## 4.2 Sensitivity to inertia

**Table 4.3. Mean final PSO fitness in the TV2 inertia sweep.** Each mean uses five seeds and 2,020 evaluations per run. The cognitive and social coefficients were held at 1.5. Source: team experiments. [TV2 inertia summary](../02_TV2_MoPhong/summary_pso.csv)

| Function | A (ω = 0.4) | B (ω = 0.7) | C (ω = 0.9) |
|---|---:|---:|---:|
| Sphere | 5.455e−31 | 1.795e−13 | 4.158e−05 |
| Rastrigin | 1.990e−01 | 2.077e−07 | 8.452e−03 |

The lowest inertia gave the best final mean on Sphere, while the middle setting gave the best mean on Rastrigin (Table 4.3). Four Rastrigin runs under configuration A had fitness below 10⁻⁶, but a fifth ended near 0.995 and dominated its mean. Configuration C retained more velocity from the previous update and gave the highest mean on Sphere within this budget. Inertia was the only parameter varied independently, so the sweep shows sensitivity to ω under these settings. Ranking the effects of the cognitive and social coefficients would require a separate controlled sweep.

## 4.3 Premature convergence

In a separate Rastrigin diagnostic, we ran five particles with ω = 0.4, c₁ = 0.5 and c₂ = 2.5 for 100 iterations across seeds 0–19. Seed 0 was the first to finish above 0.9. It ended at a verified local minimum near (−0.994959, 0.994959) with fitness 1.989918, above the global value of 0. The mean particle distance to the swarm centroid fell from 4.184 to 7.85 × 10⁻¹⁰. The same-seed default run retained a final mean distance of 0.0918 and found a point near the origin with fitness 1.408 × 10⁻⁸ (Figure 4.3).

The strong pull toward gbest, weak momentum and small population are plausible contributors to the rapid collapse in diversity seen in Figure 4.3. The diagnostic changes several settings together and uses 505 evaluations compared with 2,020 for the default run. It shows how a swarm can converge tightly around a suboptimal basin without estimating how much each parameter contributed.

> **Figure 4.3.** Rastrigin contours at iterations 0, 10, 50 and 100, with fitness and diversity traces for the diagnostic and default runs. Source: team experiments. [Figure](figures/fig_local_optimum.png) · [Analysis](PhanTichKetCucTri.md)

## 4.4 Applications and scope

The benchmark results motivate testing PSO when final solution quality matters and multiple candidates can be evaluated within the budget. Figure 4.3 illustrates why swarm diversity matters on multimodal objectives. Two published applications are CNN hyperparameter tuning and economic dispatch. Wang et al. (2019) used a PSO variant to tune CNN hyperparameters, where evaluations involve training and validation. Gaing (2003) applied PSO to generator dispatch under operational constraints. The benchmark evidence covers two 2-D functions, five comparison seeds and one Hill Climbing step scale. It cannot establish the same ranking for either application.

# 5. Conclusion

Personal bests retain information from each particle's search. The global best lets the swarm exploit a promising region together. Inertia affects how much motion carries forward. In our two benchmarks, the default setting used this balance to finish with better mean fitness than either baseline (Table 4.1). Yet the diagnostic swarm became tightly concentrated around a suboptimal Rastrigin basin (Figure 4.3). Sharing a promising position can speed up refinement, while keeping some particles mobile helps preserve the chance to discover another basin.

A controlled follow-up could vary population size and the acceleration coefficients one at a time under a fixed evaluation budget. A second experiment could compare diversity-triggered restarts with the original PSO on higher-dimensional objectives, counting restart evaluations within the same budget.

## References to merge into the report

- Gaing, Z.-L. (2003). Particle swarm optimization to solving the economic dispatch considering the generator constraints. *IEEE Transactions on Power Systems, 18*(3), 1187–1195. [DOI](https://doi.org/10.1109/TPWRS.2003.814889)
- Wang, Y., Zhang, H., & Zhang, G. (2019). cPSO-CNN: An efficient PSO-based algorithm for fine-tuning hyper-parameters of convolutional neural networks. *Swarm and Evolutionary Computation, 49*, 114–123. [DOI](https://doi.org/10.1016/j.swevo.2019.06.002)
- TV2 and TV3, CS420 Seminar S01 (2026). [PSO histories](../02_TV2_MoPhong/results_pso.csv), [baseline histories](results_baseline.csv), and [comparison notebook](Baseline_SoSanh.ipynb). Team-generated data and analysis.
- OpenAI Codex assisted with experiment implementation, analysis and drafting. [TV3 AI log](../NhatKyAI/TV3.md)
