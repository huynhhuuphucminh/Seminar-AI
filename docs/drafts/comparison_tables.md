# Equal-budget comparison

Each run used 2,020 objective evaluations on [−5.12, 5.12]² with seeds 0–4. PSO B used 20 particles, 100 updates and ω = 0.7. Random Search sampled uniformly. Hill Climbing used one uniform start and clipped Gaussian proposals (σ = 0.3 per coordinate), accepting only strict improvements, with no restarts.

**Table 4.1. Final best-so-far fitness at 2,020 evaluations.** Lower is better. SD is the sample standard deviation across five seeds. PSO B is the default configuration (ω = 0.7, c₁ = c₂ = 1.5).

| Function | Method | Mean | SD | Best | Worst |
|---|---|---:|---:|---:|---:|
| Sphere | PSO B | 1.795e−13 | 1.843e−13 | 4.595e−14 | 4.616e−13 |
| Sphere | Random Search | 1.397e−02 | 1.605e−02 | 1.216e−03 | 4.154e−02 |
| Sphere | Hill Climbing | 2.602e−04 | 2.883e−04 | 4.341e−05 | 6.466e−04 |
| Rastrigin | PSO B | 2.077e−07 | 4.565e−07 | 5.684e−14 | 1.024e−06 |
| Rastrigin | Random Search | 1.232e+00 | 8.268e−01 | 2.408e−01 | 2.484e+00 |
| Rastrigin | Hill Climbing | 5.205e+00 | 4.557e+00 | 1.991e+00 | 1.304e+01 |

**Table 4.2. Evaluations to first observed fitness strictly below 0.01.** PSO B is the default configuration (ω = 0.7, c₁ = c₂ = 1.5). Means include only runs that reached the threshold. PSO records the end of the first qualifying 20-evaluation batch. Baselines record every evaluation. “Not reached” means all five runs finished without hitting the threshold.

| Function | Method | Mean evaluations among hits | Seeds reaching target |
|---|---|---:|---:|
| Sphere | PSO B | 132.0 | 5/5 |
| Sphere | Random Search | 659.0 | 3/5 |
| Sphere | Hill Climbing | 42.6 | 5/5 |
| Rastrigin | PSO B | 784.0 | 5/5 |
| Rastrigin | Random Search | Not reached | 0/5 |
| Rastrigin | Hill Climbing | Not reached | 0/5 |

Hill Climbing reached 0.01 sooner on Sphere, while PSO B kept improving and finished with the lowest mean. Only PSO B reached the threshold on Rastrigin. These results cover two 2-D functions and five seeds per method.

**Figures 4.1 and 4.2.** Mean best-so-far fitness and min–max bands at common evaluation checkpoints. The Rastrigin plot displays values at or below 10⁻¹³ at that floor. [Sphere](../../figs/fig_compare_sphere.png) · [Rastrigin](../../figs/fig_compare_rastrigin.png)

Source for both tables and figures: team experiments in [Baseline_Comparison.ipynb](../../notebooks/Baseline_Comparison.ipynb), using [Member 2 PSO histories](../../results/results_pso.csv) and [Member 3 baseline histories](../../results/results_baseline.csv).
