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

Twelve years later, Poli, Kennedy and Blackwell (2007) reviewed how the method had changed. They restate the original algorithm with acceleration coefficients φ₁ and φ₂ and note that each velocity component was originally kept within [−V_max, V_max] (Sect. 2.1). They report that φ₁ = φ₂ = 2, the value used in early work, made particle speeds grow without control, and that the best V_max depended on the problem (Sect. 2.2).

Two modifications replaced V_max as the main damping mechanism. The inertia weight ω of Shi and Eberhart multiplies the previous velocity; the authors interpret 1 − ω as friction, so a high ω (around 0.9) favours exploration and a low ω (around 0.4) favours exploitation, and many studies decrease ω during a run (Sect. 2.3). Clerc's constriction coefficient χ scales the whole update and guarantees convergence without V_max. With its common setting, χ ≈ 0.7298, the constricted PSO is algebraically equivalent to an inertia PSO with ω = 0.7298 and c₁ = c₂ ≈ 1.49618 (Sect. 2.4). These values are close to the default setting used in our experiments (ω = 0.7, c₁ = c₂ = 1.5).

The review also covers the communication structure of the swarm. In the gbest topology every particle is attracted by the best particle of the whole swarm; in the lbest ring each particle sees only its neighbours, which converges more slowly but is less vulnerable to local optima, and no topology was found to be best on all functions (Sect. 3.1). Other variants include the fully informed particle swarm, which uses all neighbours, swarms with diversity control designed against the "tendency for the swarm to converge prematurely on local optima", and velocity-free bare-bones PSO (Sects. 2.5, 4.5, 4.6). Among about 700 application papers, the largest categories included image analysis, electricity networks and load dispatching, control, scheduling and neural networks (Sect. 6). Open questions include how to handle particles leaving the search space and a possible bias towards optima near the origin (Sect. 7.1–7.2).

## 2.4 Comparison of the two sources

The 1995 paper presents a new, deliberately simple algorithm with fixed coefficients and a handful of demonstrations. The 2007 review shows that later work kept the core idea of a pull towards personal and swarm memories, but added explicit control of the dynamics (ω or χ), studied the effect of topology, and gathered evidence from a large body of applications. Both sources identify the same weakness: a swarm that follows its best member too strongly can converge before it finds the global optimum. Our experiments examine this trade-off on two benchmark functions.
