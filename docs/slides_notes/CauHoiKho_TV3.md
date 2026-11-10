# TV3 Q&A practice

Answer one question aloud before reading its model answer. Rehearse twice, using questions from another member’s section in the second round.

1. **Why compare by evaluations instead of iterations?** A PSO update evaluates 20 candidates and a Hill Climbing step evaluates one. Both initialization and rejected proposals count toward the budget.
2. **What makes the Rastrigin result a local minimum?** The final position matches a stationary point near (−0.994959, 0.994959) with positive curvature on both axes. Its fitness is about 1.990, above the global minimum of 0.
3. **Why can Hill Climbing reach 0.01 faster but finish worse on Sphere?** A local step quickly reduces fitness from a poor starting point. The fixed step scale makes small improvements harder near the origin, while PSO continued refining within the budget.
4. **What does “not reached” mean in the threshold table?** None of the five runs finished below 0.01. If some runs succeed, we report their mean first-hit count alongside the number of successes. PSO’s count is observed at the end of a 20-evaluation batch.
5. **Does the same-seed diagnostic prove that the social coefficient caused the stall?** The comparison changes swarm size, inertia and both acceleration coefficients. It also uses 505 evaluations for the diagnostic and 2,020 for the default. A controlled sweep would vary one factor at a time.
6. **Could Hill Climbing do better with a different step scale?** A smaller or adaptive scale could improve final precision on Sphere. Restarts or larger jumps might reach other Rastrigin basins. We tested one uniform start and σ = 0.3 with no restarts.
7. **Why does the best inertia change across the two functions?** Sphere has one basin, and ω = 0.4 gave the best mean there. On Rastrigin, one run under ω = 0.4 stalled near 0.995, while all five runs at ω = 0.7 got close to zero. We would tune inertia on the new objective.
8. **What happens to the velocity update when diversity collapses?** If particle positions approach their personal and shared bests, the two attraction displacements shrink. The inertia term then carries forward a fraction of the previous velocity. This can leave little motion to explore other basins.

Evidence for rehearsal is in the [comparison tables](../03_TV3_ThucNghiem/BangSoSanh.md) and [local-optimum analysis](../03_TV3_ThucNghiem/PhanTichKetCucTri.md).
