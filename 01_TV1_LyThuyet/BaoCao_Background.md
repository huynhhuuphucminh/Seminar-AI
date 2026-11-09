<!--
Trạng thái: bản nháp do AI (Claude) viết theo prompt 1.3, từ GhiChu_KennedyEberhart1995.md (đã đối chiếu với bản scan tr. 1942–1948)
và GhiChu_Poli2007.md (đã đối chiếu với PDF trong 00_TaiLieu). TV1 cần đọc lại và viết lại bằng lời của mình.
Bảng ký hiệu nằm ở phần Method (Bảng 3.1), nên phần này không lặp lại.
-->

# 2. Background and Paper Review

## 2.1 Swarm intelligence and the origin of PSO

Particle Swarm Optimization (PSO) came out of simulations of social behaviour rather than from optimisation theory. Kennedy and Eberhart (1995) started from bird-flocking models such as those of Reynolds and of Heppner and Grenander, and from the sociobiologist E. O. Wilson's argument that members of a school of fish can profit from the discoveries of the whole school when food is distributed unpredictably. They treated this sharing of information as the core hypothesis behind the method (Kennedy & Eberhart, 1995, pp. 1942–1943). Because the authors also wanted to model human social behaviour, which takes place in an abstract space where two individuals can hold the same position, they allowed their agents to overlap. The agents therefore behave less like birds and more like points moving through a search space.

## 2.2 The original algorithm (Kennedy & Eberhart, 1995)

The paper describes how the algorithm was built up step by step. An early "cornfield" simulation gave each agent two memories: the best position it had found itself (pbest) and the best position found by any agent (gbest). The authors then removed the parts that were not needed. Random "craziness" and nearest-neighbour velocity matching could be dropped without loss, but pbest and gbest were both necessary. They also observed that a pull towards gbest much stronger than the pull towards pbest made the flock rush prematurely towards local minima, while the reverse made individuals wander excessively; roughly equal pulls worked best (p. 1945). After replacing a sign test with an adjustment proportional to the distance from the best positions, the final "simplified" version updates each velocity as

v ← v + 2·rand()·(pbest − x) + 2·rand()·(gbest − x),

where the factor 2 gives the random multiplier a mean of 1, so that agents overshoot their target about half the time (p. 1946). A version without the previous velocity v was simpler but "quite ineffective at finding global optima", which shows the importance of momentum.

The reported evidence is small in scale. PSO trained a 13-weight neural network on the XOR problem to the error criterion in an average of 30.7 iterations with 20 agents, trained an Iris classifier as effectively as backpropagation (284 epochs on average over ten runs), reached 92% test accuracy on an EEG spike dataset against 89% for backpropagation, and found the global optimum of the Schaffer f6 function in every run (pp. 1945, 1947). The authors called the generalisation result an "informal indication". They linked PSO's success to the particles' tendency to overshoot their targets, which balances conservative testing of known regions against exploration of unknown ones (p. 1947).

## 2.3 Parameters and main variants (Poli et al., 2007)

Twelve years later, Poli, Kennedy and Blackwell (2007) published an overview of how the method had changed. The authors describe it as a snapshot of the field from their own point of view rather than an exhaustive survey, so it is an informed but partial account. They restate the original algorithm with acceleration coefficients φ₁ and φ₂ and note that each velocity component was originally kept within [−V_max, V_max] (Sect. 2.1). They report that φ₁ = φ₂ = 2, the value used in early work, made particle speeds grow without control, and that the best V_max depended on the problem (Sect. 2.2).

Two modifications replaced V_max as the main damping mechanism. The inertia weight ω of Shi and Eberhart multiplies the previous velocity; the authors interpret 1 − ω as friction, so a high ω (around 0.9) favours exploration and a low ω (around 0.4) favours exploitation, and many studies decrease ω during a run (Sect. 2.3). Clerc's constriction coefficient χ scales the whole update; a stability analysis of a simplified model showed how to choose it so that a particle converges without V_max (Sects. 2.4 and 5.1). With its common setting, χ ≈ 0.7298, the constricted PSO is algebraically equivalent to an inertia PSO with ω = 0.7298 and c₁ = c₂ ≈ 1.49618 (Sect. 2.4). These values are close to the default setting used in our experiments (ω = 0.7, c₁ = c₂ = 1.5).

The review also covers the communication structure of the swarm. In the gbest topology every particle is attracted by the best particle of the whole swarm; in the lbest ring each particle sees only its neighbours, which converges more slowly but is less vulnerable to local optima, and no topology was found to be best on all functions (Sect. 3.1). Other variants include the fully informed particle swarm, which uses all neighbours, swarms with diversity control designed against the "tendency for the swarm to converge prematurely on local optima", and velocity-free bare-bones PSO (Sects. 2.5, 4.5, 4.6). Among about 700 application papers, the largest categories included image analysis, electricity networks and load dispatching, control, scheduling and neural networks (Sect. 6). The authors end with open questions. They ask whether PSO is biased towards optima near the centre of the initialisation region (Sect. 7.1) and how to treat particles that move far from the swarm or outside the search space, where options such as not evaluating them, moving them to the boundary or re-initialising them are still debated (Sect. 7.2). They also ask how memories and neighbourhoods could adapt during a run (Sect. 7.3), whether a self-adapting, parameter-free PSO is possible without too many function evaluations (Sect. 7.4), and how theory could guide the choice of population size, run length, initialisation, random-number distributions and topology (Sect. 7.5). They conclude that the number of PSO publications grew exponentially up to 2006 while too few of the questions had been answered satisfactorily (Table 1, Sect. 8).

## 2.4 Comparison of the two sources

The 1995 paper presents a new, deliberately simple algorithm with fixed coefficients and a handful of demonstrations. The 2007 review shows that later work kept the core idea of a pull towards personal and swarm memories, but added explicit control of the dynamics (ω or χ), studied the effect of topology, and gathered evidence from a large body of applications. Both sources identify the same weakness: a swarm that follows its best member too strongly can converge before it finds the global optimum. Our experiments examine this trade-off on two benchmark functions.

## 2.5 PSO and Hill Climbing

Hill Climbing is a local search method. It keeps a single current state, moves to the best neighbouring state, and stops when no neighbour is better. It stores neither the path nor the set of visited states, so it needs very little memory, but it is not systematic and, being greedy, it can get stuck on local optima, ridges or plateaus. Common remedies are limited sideways moves, random choice among the improving moves, taking the first better neighbour, and random restarts (Nguyen & Nguyen, 2025, slides 4–12).

PSO differs in four ways. It keeps a whole population instead of one state. Each particle has a memory (its pbest) and the swarm shares information through gbest or a neighbourhood. A particle moves by a velocity update that includes momentum and random pulls, so it can pass through worse positions rather than only accept improvements. Finally, its "neighbours" are the particles that influence it through the topology, not adjacent states of the search space. Hill Climbing with random restarts also uses many starting points, but the runs are independent and share no information. The Hill Climbing baseline in our experiments is a stochastic variant for continuous space: it proposes a Gaussian perturbation of the current point and accepts only strict improvements, without restarts (Section 4).

## 2.6 Critical remarks

The two papers leave several limits that frame how far our results can be read.

- **Small evidence in 1995.** The tests were few, and the authors themselves call the generalisation result an "informal indication" (Kennedy & Eberhart, 1995, p. 1947).
- **Theory is incomplete.** Poli et al. (2007, Sect. 5) state that no comprehensive mathematical model of PSO exists, because the swarm has many interacting particles, memories, random forces and a dependence on the fitness function. The convergence analyses they review assume simplified systems, typically one particle in one dimension without randomness and in stagnation. One of them argues that a particle may converge to a point that is not an optimum, so PSO is not guaranteed to behave as an optimiser (van den Bergh, 2002, as summarised in Sect. 5.1).
- **Parameters interact.** The review notes that parameters cannot be set in isolation (Sect. 2.3, footnote 3) and that rules for population size, run length, initialisation, random-number distributions and topology are still missing (Sect. 7.5). The best topology also depends on the function (Sect. 3.1).
- **Premature convergence and slow-down.** The swarm can converge before finding the optimum, and can slow down when it approaches an optimum from one side; diversity-control schemes only partly alleviate this (Sects. 4.5 and 7.1).
- **Counts are not effectiveness.** The application survey counts papers in one database, so it shows how popular PSO is in each area, not how well it performs there (Sect. 6). This is our reading of the survey, not a claim made by its authors.
