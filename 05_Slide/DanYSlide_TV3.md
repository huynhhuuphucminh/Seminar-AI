# TV3 presentation segment

Four slides in about five minutes. Adjust slide numbers when merging into the team deck.

## 1. Same budget, two landscapes · 1 min 15 s

- 2,020 objective evaluations per run
- Five seeds per method
- Hill Climbing reaches the Sphere target sooner
- Default PSO finishes with the lowest mean

**Visual and credit.** Place the [Sphere](../03_TV3_ThucNghiem/figures/fig_compare_sphere.png) and [Rastrigin](../03_TV3_ThucNghiem/figures/fig_compare_rastrigin.png) plots side by side. Credit: team experiments, Figures 4.1–4.2.

**Speaker notes.** We gave all three methods the same budget. One PSO batch evaluates 20 points, so the horizontal axis counts candidates instead of iterations. The bands show the best and worst runs across five seeds. On Sphere, Hill Climbing reaches fitness below 0.01 after about 43 evaluations on average. PSO takes longer to cross that mark, but continues to improve and ends lower. On Rastrigin, all five default PSO runs cross the threshold, and neither baseline crosses it within the budget.

## 2. Inertia depends on the landscape · 1 min 10 s

- Lower inertia wins on Sphere
- Middle inertia wins on Rastrigin
- One stalled run dominates configuration A’s Rastrigin mean

**Visual and credit.** Use [Table 4.3](../03_TV3_ThucNghiem/BaoCao_Results_Conclusion.md#42-sensitivity-to-inertia), with the best mean highlighted in each row. Credit: TV2 inertia sweep, team experiment.

**Speaker notes.** We changed only inertia in this sweep. On Sphere, 0.4 gave the lowest mean fitness. On Rastrigin, 0.7 gave the lowest mean. Four runs with 0.4 found values close to zero, but one stopped near 0.995. That one run raised the mean. The two landscapes favor different settings, and changing only inertia lets us attribute the difference in this sweep to the inertia setting. We would need another sweep to compare the effects of the other coefficients.

## 3. Where the swarm got stuck · 1 min 30 s

- Five particles, strong pull toward gbest
- Diversity drops as particles cluster
- Local fitness ≈ 1.990
- Default run stays more dispersed

**Visual and credit.** Use the [diagnostic figure](../03_TV3_ThucNghiem/figures/fig_local_optimum.png) at full width. Credit: team experiment, Figure 4.3.

**Speaker notes.** This is a separate diagnostic. We swept 20 seeds with five particles and chose the first seed that finished above 0.9. The dots show where the particles were at four iterations. The star is the final best and the cross is the global minimum. By iteration 10 the particles have clustered near the star. We verified the final point by solving for the nearby stationary point and checking positive curvature. The default run with the same seed remains more dispersed and finds a much better point. Its swarm is also larger and uses more evaluations, so this example cannot tell us which setting caused the difference.

## 4. Exploration and exploitation · 1 min 5 s

- Personal bests retain individual discoveries
- The shared best focuses the search
- Applications include CNN tuning and generator dispatch
- Evidence comes from two 2-D benchmarks

**Visual and credit.** Use a small crop of the diversity panel from Figure 4.3. Cite the team experiment below it. Cite Wang et al. (2019) and Gaing (2003) below the application examples. [Application references](../03_TV3_ThucNghiem/BaoCao_Results_Conclusion.md#references-to-merge-into-the-report)

**Speaker notes.** A particle can use what it found before and what the group has found. This can help the swarm refine a good answer quickly. When too many particles follow the same best and lose momentum, they may stop exploring other regions. Published studies apply PSO to tuning CNN hyperparameters and dispatching power generators. Those applications use different objectives and constraints. We tested only two functions in two dimensions. A follow-up could change the swarm size or one coefficient at a time, and test whether restarts help under the same budget.
