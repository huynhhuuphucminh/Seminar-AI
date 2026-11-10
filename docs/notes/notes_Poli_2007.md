# Reading notes: Poli, Kennedy & Blackwell (2007), _Particle swarm optimization: An overview_

**Source:** Poli, R., Kennedy, J. & Blackwell, T. (2007). Particle swarm optimization: An overview. _Swarm Intelligence_, 1, 33–57. https://doi.org/10.1007/s11721-007-0002-0

> **Status:** drafted with AI assistance (see the AI-use log). Every point was compared with the text extracted from the PDF in `references/`. Page numbers are journal pages (page 1 of the PDF is p. 33). Points marked ★ are the most likely to come up in questions.

## 0. The paper in three lines

- A **review** by the original author Kennedy with two co-authors, giving a snapshot of PSO research up to 2007; it does not propose a new algorithm.
- Main content: update equations (original, inertia weight, constriction χ, FIPS), the role of parameters, neighbourhood structure (topology), variants, theory, applications and open questions.
- Message: PSO is simple, but its behaviour depends strongly on parameters and topology, and many theoretical questions remain open.

## 1. The original algorithm (Sect. 2.1, pp. 34–35) ★

- Each particle has three D-dimensional vectors: current position **x_i**, best position so far **p_i** (pbest) and velocity **v_i**. The paper says v_i "can effectively be seen as a step size".
- A single particle can solve almost nothing; progress appears only when particles **interact** through a social network (topology).
- **Algorithm 1 (Original PSO)**, Eq. (1):
  - `v_i ← v_i + U(0, φ1) ⊗ (p_i − x_i) + U(0, φ2) ⊗ (p_g − x_i)`
  - `x_i ← x_i + v_i` (uses the **just-updated** velocity; this is the basis for the team's choice x(t+1) = x(t) + v(t+1))
  - U(0, φ) is a vector of random numbers uniform in [0, φ], drawn anew at each iteration for each particle; ⊗ is component-wise multiplication.
  - In the original version each velocity component is kept within [−Vmax, +Vmax].
- Footnote 2 (p. 34): PSO usually **minimises**, and the paper uses "objective function" and "fitness function" interchangeably.

## 2. Parameters (Sect. 2.2, pp. 35–36) ★

- **Population size:** usually set empirically; values of **20–50** are common (the team uses 20).
- **φ1, φ2 (acceleration coefficients):** set the strength of the pulls towards pbest and p_g. They can be seen as **springs of random stiffness** with mean stiffness φ1/2 and φ2/2. PSO behaviour changes radically with φ1 and φ2.
- φ1 = φ2 = 2.0, common in early work, made particle speeds **grow without control**, hence Vmax.
- **Vmax:** affects the balance between exploration and exploitation, but a good value is problem-specific and no rule of thumb is known; with Vmax the particle's trajectory **fails to converge**, its oscillations are simply chopped off.

## 3. Inertia weight ω (Sect. 2.3, pp. 36–37) ★

- Proposed by Shi & Eberhart (1998b), Eq. (2): `v_i ← ω v_i + U(0, φ1) ⊗ (p_i − x_i) + U(0, φ2) ⊗ (p_g − x_i)`, then `x_i ← x_i + v_i`. This is the form the team uses.
- Physical interpretation: **1 − ω acts as a friction coefficient**; ω is the "fluidity" of the medium.
  - High ω (e.g. 0.9): low friction, extensive **exploration**.
  - Low ω (e.g. 0.4): more dissipative, **exploitation**, better at homing into local optima.
  - Many studies found it best to **decrease ω from about 0.9 to about 0.4** during a run.
- Other strategies: fuzzy adaptation of ω (Eberhart & Shi 2000), random ω = U(0.5, 1) (Eberhart & Shi 2001), even an increasing ω (Zheng et al. 2003).
- With ω and suitable coefficients, Vmax can be dropped or set very large (the dynamic range of each variable).
- **Link to the team's work:** the three settings A (0.4), B (0.7), C (0.9) fall within the range discussed in the paper.

## 4. Constriction coefficient χ (Sect. 2.4, pp. 37–38) ★

- Clerc's analysis explains why particles must be damped and introduces the constriction coefficient, Eqs. (3)–(4): `v_i ← χ (v_i + U(0, φ1) ⊗ (p_i − x_i) + U(0, φ2) ⊗ (p_g − x_i))` with φ = φ1 + φ2 > 4 and χ = 2 / (φ − 2 + √(φ² − 4φ)).
- Usually φ = 4.1 and φ1 = φ2 = 2.05, giving **χ ≈ 0.7298**; each (p − x) term is multiplied by a random number up to **0.7298 × 2.05 ≈ 1.49618**.
- Constricted particles converge **without Vmax**; a later rule of thumb is Vmax = Xmax (the dynamic range of each variable). The paper calls this "the canonical particle swarm algorithm of today".
- A constricted PSO is **algebraically equivalent** to an inertia PSO: Clerc's settings correspond to **ω = 0.7298, c1 = c2 = 1.49618**.
- **Link to the team's work:** the default ω = 0.7, c1 = c2 = 1.5 is very close to this standard setting, which answers "why 0.7 and 1.5?". The final setting v_max = 10.24 (the domain width) follows the rule Vmax = Xmax.
- Footnote 4 (p. 37): some evidence that larger populations suit higher-dimensional problems, densely connected topologies suit **unimodal** problems and sparsely connected ones suit **multimodal** problems.

## 5. FIPS (Sect. 2.5, p. 38)

- Fully informed particle swarm (Mendes): a particle is influenced by **all** its neighbours instead of only the best one, Eq. (5).
- With good parameters FIPS finds better solutions in fewer iterations, but depends more on the topology.

## 6. Topology (Sect. 3, pp. 38–40) ★

- Early topologies were based on distance in the search space (like bird flocks) but were costly and converged poorly, so they were abandoned.
- **gbest:** every particle is attracted by the best particle of the whole population (fully connected graph). This is the topology the team uses.
- **lbest:** a ring where each particle is connected to K = 2 neighbours. Allows parallel search in several regions; **converges more slowly than gbest but is less vulnerable to local optima**.
- Kennedy (1999) tested many structures: performance differences depend on the test function, and **no topology is best for every problem**.
- Kennedy & Mendes (2002): the **von Neumann** topology (grid, K = 4) was relatively superior.
- Mendes (2004): local search ability (best value reached) and global search ability (proportion of runs meeting a criterion) were **not correlated**.
- Sect. 3.2: dynamic topologies (changing during a run) have also been studied.

## 7. Variants (Sect. 4, pp. 41–46)

- 4.1 binary PSO; 4.2 dynamic problems (objective changes over time); 4.3 noisy functions; 4.4 hybrids and adaptive PSO.
- **4.5 PSO with diversity control (p. 45) ★:** several authors noted a **tendency of the swarm to converge prematurely on local optima** as diversity declines. Remedies: self-organised criticality (Løvbjerg 2002), collision avoidance (Blackwell & Bentley 2002), spatially extended particles that bounce off each other (Krink et al. 2002), negative entropy (Xie et al. 2002). Directly relevant to the team's local-optimum analysis.
- 4.6 Bare-bones PSO (Kennedy 2003): no velocity; positions sampled from a Gaussian around (p_i + p_g)/2 with standard deviation |p_i − p_g|; a Lévy (fat-tailed) version reproduces canonical PSO well. The paper conjectures that **fat tails help particles escape sub-optimal locations**.

## 8. Theory (Sect. 5, pp. 46–50)

- "A fully comprehensive mathematical model of particle swarm optimization is still not available."
- Analyses use deterministic models, models of PSO's randomness and executable models, typically one particle, one dimension, no randomness, stagnation.
- van den Bergh (2002), as summarised in Sect. 5.1: particles may converge on a point that is not an optimum, so PSO is not guaranteed to behave as an optimiser.
- ω, χ, φ1 and φ2 **cannot be set in isolation** (footnote 3, p. 37).

## 9. Applications (Sect. 6, pp. 50–51) ★

- Based on more than 1,100 publications in IEEE Xplore; about 700 are applications, grouped into 26 categories.
- PSO is especially promising for **multimodal problems** and problems with no good specialised method.
- Some large categories (papers, share of application papers): image and video analysis (51, 7.6%); design of electricity networks and **load dispatching** (48, 7.1%); control (47, 7.0%); antenna design (39, 5.8%); **scheduling** (38, 5.6%); **neural networks** (26, 3.8%).
- **Link to the team's work:** both applications suggested by the assignment (hyper-parameter tuning, scheduling) fall within these categories and can be cited from this paper.

## 10. Open questions (Sect. 7, pp. 51–53)

- 7.1: controversy about an **origin-seeking bias**, i.e. problems with a global optimum near the origin may be easier, and about a tendency to converge to optima inside the initialisation region when it is smaller than the search space. ★ Relevant because both Sphere and Rastrigin have their minimum at (0, 0); stated in the report's limitations.
- 7.1: PSO can **converge prematurely** and slow down near an optimum.
- 7.2: there is **no agreed best way** to handle particles that leave the search space (not evaluating them, moving them to the boundary, re-initialising). The team moves them to the boundary.
- 7.2: it is not known whether randomness is strictly necessary.
- 7.4: a long-term goal is a fully adaptive, parameter-free optimiser.
- 7.5: no principled way yet to choose population size, run length, initialisation or topology.

## Comparison with the 1995 paper

| Topic | Kennedy & Eberhart (1995) | Poli et al. (2007) |
|---|---|---|
| Equation | `v = v + 2·rand()·(pbest − x) + 2·rand()·(gbest − x)` | General form with φ1, φ2; adds ω (Eq. 2) and χ (Eq. 3) |
| Acceleration coefficients | Fixed at 2; authors call for further study | φ1 = φ2 = 2 makes velocities explode; standard setting equivalent to ω = 0.7298, c = 1.49618 |
| Velocity control | Not discussed | Vmax in the original; ω and χ take over the damping role |
| Neighbourhood | gbest (whole flock) | gbest, lbest, von Neumann, FIPS, dynamic topologies |
| Evidence | A few small experiments (XOR, Iris, EEG, Schaffer f6) | Survey of more than 1,100 publications |
| Premature convergence | Too large a g_increment makes the flock rush prematurely towards local minima | Widely observed; a whole group of diversity-control variants (4.5) |
