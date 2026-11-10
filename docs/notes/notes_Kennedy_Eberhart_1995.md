# Reading notes: Kennedy & Eberhart (1995), _Particle Swarm Optimization_

**Source:** Kennedy, J. & Eberhart, R. (1995). Particle Swarm Optimization. _Proceedings of ICNN '95_, pp. 1942–1948. https://doi.org/10.1109/ICNN.1995.488968

> **Status:** drafted with AI assistance from the PDF (see the AI-use log), then checked against the scanned paper, pp. 1944–1948. Page numbers are those printed on the paper (1942 to 1948).

## 0. The paper in three lines

- Proposes a method for optimising continuous nonlinear functions, derived from simulations of social behaviour (bird flocks, fish schools).
- Each "particle" remembers its own best position (pbest), knows the best position of the whole flock (gbest) and is pulled towards both.
- Tests: training neural-network weights (XOR, Iris, EEG) and the Schaffer f6 function, with results comparable to backpropagation and to a basic GA.

## Abstract and 1. Introduction (p. 1942)

**1.1 Aim and approach**

- Introduces a method for optimising continuous nonlinear functions, "discovered" through the simulation of a simplified social model.
- The authors stress that the algorithm stands on its own without the social metaphor.
- Structure of the paper: precursors (social simulation) → several paradigms → one detailed implementation → results.

**1.2 Two roots**

- Artificial life (A-life), in particular bird flocks, fish schools and swarm theory.
- Evolutionary computation, related to both genetic algorithms (GA) and evolutionary programming.

**1.3 Advantages claimed by the authors**

- Very simple concept, implemented in a few lines of code.
- Needs only primitive mathematical operators and little memory and time.
- Applications in the paper: training neural-network weights and the Schaffer f6 function (taken from Davis [1]).

## 2. Simulating Social Behavior (pp. 1942–1943)

**2.1 Earlier flocking simulations**

- Reynolds [8] was interested in the aesthetics of the flock's "choreography"; Heppner and Grenander [4] (Heppner is a zoologist) looked for the rules that let flocks move in synchrony.
- Both held that local rules (as in cellular automata) produce unpredictable group behaviour, and both relied on keeping a distance between individuals.

**2.2 The advantage of sharing information**

- Quotes E. O. Wilson [9] (p. 209): members of a school of fish can profit from the discoveries and experience of the whole school when searching for food, especially when food is distributed unpredictably.
- The authors treat this as the fundamental hypothesis behind PSO.

**2.3 From birds to people (abstraction)**

- The original goal also included modelling human social behaviour.
- The difference: people adjust beliefs and attitudes (an abstract multidimensional space), so there are **no collisions**, whereas two birds cannot occupy the same position.
- "Change" is therefore mapped onto "movement" in an abstract space, in line with the classical Aristotelian view that qualitative and quantitative change are both kinds of motion. This is why PSO particles may overlap.
- The authors also note that physical space is a trivial component of psychological experience; navigating an n-dimensional socio-psychological space is much harder.

## 3. Precursors: Etiology of PSO (pp. 1943–1946)

**3.1 Nearest-neighbour velocity matching and craziness (p. 1943)**

- First simulation: agents on a toroidal grid; at every iteration each agent takes the (X, Y) velocity of its nearest neighbour, which synchronises the flock.
- Problem: the flock soon settles on one unchanging direction. Fix: a random variable, "craziness", added to the velocities.
- The authors state that craziness is entirely artificial and only makes the simulation look realistic.

**3.2 The cornfield vector (p. 1944)**

- Idea: in Heppner's simulation birds knew a "roost" in advance; real birds find food without knowing where it is, possibly by exploiting each other's knowledge.
- Evaluation function: `Eval = √((presentx − 100)²) + √((presenty − 100)²)`, which is 0 at (100, 100). The two square roots are **separate for x and y**, so the value is `|presentx − 100| + |presenty − 100|` (Manhattan distance), **not** the Euclidean distance (checked against the PDF, p. 1944).
- (100, 100) is only a target set by the authors for testing. Agents do not know these coordinates; they only receive the Eval value where they stand.
- **pbest:** each agent remembers its best value and the XY position where it was reached. If the agent is to the right of pbestx, vx is decreased by `rand() * p_increment`; if to the left, it is increased. The same holds for vy.
- **gbest:** a variable holding the index of the best agent, known to all agents; the update rule is the same with `g_increment`.
- Observations:
  - High increments: the whole flock (15 to 30 individuals) is "sucked" into the cornfield in a few iterations.
  - Low increments: the flock swirls around and "lands" on the target, which looks realistic.

**3.3 Eliminating ancillary variables (p. 1945)**

- Without craziness the algorithm still works well; without velocity matching optimisation is even slightly faster. From here the "flock" becomes a "swarm".
- pbest and gbest, with their increments, are both **necessary**.
  - pbest resembles "autobiographical memory" (each individual remembers its own experience, although only one fact) and is called "simple nostalgia": a tendency to return to the place that satisfied it most.
  - gbest resembles "publicized knowledge" or a group norm.
- Effect of the ratio of the two increments:
  - p_increment much higher: individuals wander excessively.
  - g_increment much higher: the flock rushes prematurely towards local minima (premature convergence).
  - Roughly equal values: the most effective search.

**3.4 Multidimensional search (p. 1945)**

- Extension from 1-D arrays (x, y) to a D × N matrix (D dimensions, N agents).
- First experiment: training a three-layer (2-3-1) feed-forward network on XOR, 13 parameters in total including biases, i.e. flying through a 13-dimensional space. Each agent is a set of 13 weights; Eval is the network's error on the XOR truth table with those weights. Parameter count: 2·3 (input → hidden) + 3 (hidden biases) + 3·1 (hidden → output) + 1 (output bias) = 13.
- Stopping criterion: "average sum-squared error per PE" below e = 0.05, reached after on average **30.7 iterations with 20 agents**. More complex architectures took longer but still worked well.
- PSO uses no derivatives here: it only runs the network forward to get the error. It is not gradient descent.

**3.5 Acceleration by distance (pp. 1945–1946)**

- The authors found the old rule (testing only the sign of an inequality) aesthetically displeasing and hard to understand.
- New rule: adjust the velocity by the **difference** in each dimension, e.g. `vx += rand() * p_increment * (pbestx − presentx)`. Easier to understand and more effective.
- This is the first form that resembles the modern PSO equation: the velocity gets an added pull proportional to the distance. The old rule added or subtracted the same amount whether the agent was far from or near pbest; the new rule pulls hard when far, gently when near and not at all at pbest. (The spring picture is the team's interpretation, not the paper's.)
- Notation `vx[][]`, `presentx[][]`: two pairs of brackets because these are now matrices of agents by dimensions (noted by the authors right below the formula). `increment` and `bestx` may also carry the prefix `g` instead of `p`.
- **Index order is not consistent in the paper:** the note in 3.5 says "agents by dimensions", but 3.4 says D × N and the formula in 3.6 writes `pbestx[][gbest]` (gbest is an agent index in the second bracket). Reading it as `[dimension][agent]` is an inference from the formula.

**3.6 Current simplified version (p. 1946)**

- p_increment and g_increment are removed as well, because there is no good way to guess which should be larger.
- The random factor is multiplied by **2** to give it a mean of 1, so that agents "overfly" the target about half the time.
- Formula (rewritten from the paper): `v = v + 2·rand()·(pbest − x) + 2·rand()·(gbest − x)`.
  - As printed: `vx[][] = vx[][] + 2*rand()*(pbestx[][] − presentx[][]) + 2*rand()*(pbestx[][gbest] − presentx[][])`. The first term pulls towards the agent's own pbest, the second towards the pbest of the best agent (`gbest` is an agent index). The leading `vx[][]` is the momentum term.
  - `rand()` is a random number in [0, 1), called separately for each term; the factor 2 gives it a mean of 1.
- The authors say further research should show whether 2 is optimal or whether the value should evolve for each problem.
- **Compared with modern PSO:** there is no inertia weight ω and no Vmax yet; the coefficient is fixed at 2. The paper only gives the velocity update; adding the velocity to the position is implicit.

**3.7 Other experiments (p. 1946)**

- Replacing the two terms by one point midway between pbest and gbest: tends to converge on that point whether or not it is an optimum. Conclusion: the two random "kicks" are necessary.
- Two agent types, "explorers" (inequality test) and "settlers" (difference term): no improvement. The authors invoke Occam's razor.
- **Removing the momentum of vx** (dropping the old v term): simpler but "quite ineffective at finding global optima". Evidence for the role of inertia.

## 4. Swarms and Particles (pp. 1946–1947)

**4.1 Why "swarm"**

- Following Millonas [6], who stated five principles of swarm intelligence:
  1. Proximity: simple space and time computations.
  2. Quality: respond to quality factors in the environment.
  3. Diverse response: do not commit activities along excessively narrow channels.
  4. Stability: do not change behaviour every time the environment changes.
  5. Adaptability: change behaviour when it is worth the computational price.
  Principles 4 and 5 are two sides of the same coin.

**4.2 PSO satisfies the five principles (the authors' argument)**

- n-dimensional computations over time steps; the population responds to quality through pbest and gbest.
- Allocating responses between pbest and gbest ensures diversity.
- The population changes state only when gbest changes (stability) and does change when gbest changes (adaptability).

**4.3 Why "particle"**

- A compromise: members could be called mass-less, volume-less "points", but velocities and accelerations suit "particles" with arbitrarily small mass and volume better.
- Also refers to Reeves [7] on particle systems modelling clouds, fire and smoke.

## 5. Tests and Early Applications (p. 1947)

**5.1 Training neural networks**

- PSO trained network weights **as effectively as backpropagation** (XOR problem, Section 3.4).
- Fisher Iris classification [3]: as effective as backpropagation, **284 epochs** on average over ten training sessions.

**5.2 Generalisation (only an early indication)**

- On an EEG spike dataset (spikes versus false positives): backpropagation reached 89% correct on the test set, PSO **92%**.
- The authors call these "intriguing informal indications"; they should not be read as PSO always generalising better than gradient descent.

**5.3 The Schaffer f6 function**

- Highly nonlinear, many local optima, discontinuous surface.
- PSO found the global optimum in **every run** and needed roughly as many evaluations as the elementary GA in Davis [1], Chapter 2.

## 6. Conclusions (pp. 1947–1948)

**6.1 Positioning**

- Extremely simple and apparently effective on a wide range of functions.
- A "mid-level" form of A-life, between evolutionary search ("eons", geological time) and neural processing (milliseconds): social optimisation happens on the time scale of ordinary experience.

**6.2 Relation to evolutionary computation**

- Between GA and evolutionary programming; highly dependent on stochastic processes (like evolutionary programming).
- The adjustment towards pbest/gbest is conceptually similar to GA crossover; it uses the concept of fitness.

**6.3 What is specific to PSO**

- It "flies" potential solutions through hyperspace and accelerates them towards better solutions; other evolutionary methods operate directly on the solutions.
- Much of its success seems to come from the agents' tendency to **hurtle past their target** (overshoot). The authors link this to Holland's "optimum allocation of trials" [5]: the balance between conservative testing of known regions and risky exploration of the unknown.
  - The stochastic factors allow a thorough search of the space between good regions.
  - The momentum effect (adding to the existing velocity instead of replacing it) causes overshooting and exploration of unknown regions.
- The authors say the current version "appears" to allocate trials nearly optimally. This is an assessment, not a proof.
- Directly related to the guiding question of the S01 assignment (exploration and exploitation).

**6.4 Limitations and further work (stated by the authors)**

- Much further research is needed. The design goals were simplicity and robustness, needing only a problem specification and a few parameters.
- Open questions from 3.6: whether the constant 2 is optimal and whether it should evolve per problem.

**6.5 The authors' philosophy and closing remark**

- The authors are a social psychologist and an electrical engineer. They argue that social behaviour is widespread in the animal kingdom because it optimises, so modelling social behaviour is a way to solve engineering optimisation problems.
- Philosophy: let wisdom emerge rather than impose it, emulate nature rather than control it, make things simpler rather than more complex.

## Points to remember for the report

| Topic | Main point in the paper | Used in |
|---|---|---|
| Motivation | Sharing information in a group has an evolutionary advantage (Wilson) | Introduction |
| Concepts | pbest (individual memory), gbest (group norm), both necessary | Background |
| Formula | `v = v + 2·rand()·(pbest − x) + 2·rand()·(gbest − x)`, no ω yet | Method, `formulas_and_hill_climbing.md` |
| Balance of p and g | High g: premature convergence; high p: wandering; roughly equal: best | Results and Discussion (premature convergence) |
| Role of momentum | Dropping the old v term makes finding the global optimum poor | Discussion |
| Evidence | XOR 30.7 iterations / 20 agents; Iris 284 epochs; EEG 92% vs 89%; Schaffer f6 global optimum in every run | Paper Review |
| Limits | Small tests, many comparisons only preliminary, no parameter analysis | Critical analysis |

## Glossary used in these notes

| Term | Meaning |
|---|---|
| swarm / flock | the population of agents; "flock" in the early simulations, "swarm" after simplification |
| particle | one agent, a candidate solution |
| pbest / gbest | best position found by the individual / by the whole swarm |
| fitness | score of a solution (lower is better in this paper's examples) |
| overshoot / overfly | moving past the target |
| momentum | the previous velocity carried into the update |
| local minima / global optimum | basins other than the best one / the best solution |
| epoch | one training pass over the whole dataset |
| generalise | perform well on data not seen in training |
| craziness | random variable added to the velocity in Section 3.1 |
