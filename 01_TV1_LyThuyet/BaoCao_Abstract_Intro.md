<!--
Trạng thái: bản nháp do AI (Claude) viết theo prompt 1.6. Mọi con số lấy từ summary_pso.csv (TV2) và BangSoSanh.md (TV3), đã đối chiếu với CSV.
TV1 cần đọc lại và viết lại bằng lời của mình. Abstract: 197 từ (giới hạn 200).
-->

# Abstract

Particle Swarm Optimization (PSO) searches a continuous space with a population of particles that are pulled towards their own best positions and towards the best position found by the swarm. This report reviews the original algorithm of Kennedy and Eberhart (1995) and the later changes surveyed by Poli et al. (2007), then studies how PSO balances exploration and exploitation on two 2-D benchmark functions, the unimodal Sphere and the multimodal Rastrigin. We give a step-by-step worked example, simulate five particles over five iterations, compare three inertia weights (ω = 0.4, 0.7, 0.9) over five seeds, and compare PSO with Random Search and Hill Climbing under an equal budget of 2,020 function evaluations. With ω = 0.7, PSO reached a mean final fitness of 1.8 × 10⁻¹³ on Sphere and 2.1 × 10⁻⁷ on Rastrigin, and it was the only method to reach a fitness of 0.01 on Rastrigin. A low inertia weight gave the fastest convergence on Sphere but left one Rastrigin run in a local minimum, and a diagnostic run with a strong social pull showed swarm diversity collapsing around a suboptimal basin. The experiments are small, so these results illustrate rather than establish general behaviour.

# 1. Introduction

Many practical problems, from tuning a model's hyper-parameters to scheduling, can be written as finding the input that minimises a continuous objective function. When the function has no usable gradient or has many local minima, simple local search methods such as Hill Climbing can stop at the first basin they reach. Population-based methods try to avoid this by searching from many points at once.

PSO is one such method. Each particle remembers the best position it has visited, and the swarm shares the best position found by any particle; every move combines the particle's momentum with random pulls towards these two memories. The method is easy to implement and needs no gradient, which explains its wide use (Poli et al., 2007). Its behaviour, however, depends on how these pulls are weighted.

This report addresses the guiding question of the seminar: **how does PSO combine individual experience and social information to balance exploration and exploitation?** We focus on three aspects: the role of the personal-best and global-best terms, the effect of the inertia weight, and the risk of premature convergence.

The scope is deliberately small. We use two benchmark functions in two dimensions (Sphere and Rastrigin), a global-best PSO with velocity clamping, three inertia-weight settings with five random seeds each, and two baselines, Random Search and Hill Climbing, with the same evaluation budget. The results describe these settings only.

Section 2 reviews the two source papers. Section 3 defines the objective functions, the algorithm and the experimental setup, and works through two numerical examples. Section 4 presents and discusses the results, including a case of premature convergence, and Section 5 concludes.
