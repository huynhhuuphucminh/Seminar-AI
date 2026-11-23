# Hand-worked example: one PSO update step in one dimension

> **Status:** drafted with AI assistance (prompt 1.5, see the AI-use log). The result matches the reference answer in the team's shared settings and the check cell in `notebooks/PSO_Seminar.ipynb` (section 2a). This example has no velocity limit, so it does not depend on v_max.

## Problem

- Objective: f(x) = x², to be **minimised** (global minimum f = 0 at x = 0).
- Parameters: ω = 0.7, c1 = c2 = 1.5. No velocity limit.
- Iteration 0: particle 1 has x = 3, v = 0.5; particle 2 has x = −2, v = −0.5. Each particle's pbest is its current position.
- Fixed random numbers: particle 1 uses r1 = 0.4, r2 = 0.6; particle 2 uses r1 = 0.8, r2 = 0.3.
- Update: v(t+1) = ω·v(t) + c1 r1 (pbest − x(t)) + c2 r2 (gbest − x(t)); x(t+1) = x(t) + v(t+1).

## Step 1: evaluate iteration 0 and choose gbest

- f(3) = 9, f(−2) = 4.
- Particle 2 has the lower value, so **gbest = −2**.

## Step 2: new velocity and position

**Particle 1** (x = 3, v = 0.5, pbest = 3):
- Inertia: ω·v = 0.7 × 0.5 = **0.35**
- Cognitive: c1 r1 (pbest − x) = 1.5 × 0.4 × (3 − 3) = **0**
- Social: c2 r2 (gbest − x) = 1.5 × 0.6 × (−2 − 3) = 0.9 × (−5) = **−4.5**
- v(1) = 0.35 + 0 − 4.5 = **−4.15**
- x(1) = 3 + (−4.15) = **−1.15**

**Particle 2** (x = −2, v = −0.5, pbest = −2):
- Inertia: 0.7 × (−0.5) = **−0.35**
- Cognitive: 1.5 × 0.8 × (−2 − (−2)) = **0**
- Social: 1.5 × 0.3 × (−2 − (−2)) = **0**
- v(1) = **−0.35**
- x(1) = −2 + (−0.35) = **−2.35**

## Step 3: evaluate and update pbest and gbest

- Particle 1: f(−1.15) = 1.3225 < 9, so pbest1 = −1.15.
- Particle 2: f(−2.35) = 5.5225 > 4, so pbest2 stays at −2.
- New gbest = best pbest = **−1.15** (f = 1.3225).

## Step 4: state table

| Iteration | Particle | x | v | f(x) | pbest | gbest |
|---|---|---|---|---|---|---|
| 0 | 1 | 3 | 0.5 | 9 | 3 | −2 |
| 0 | 2 | −2 | −0.5 | 4 | −2 | −2 |
| 1 | 1 | −1.15 | −4.15 | 1.3225 | −1.15 | −1.15 |
| 1 | 2 | −2.35 | −0.35 | 5.5225 | −2 | −1.15 |

## Step 5: explanation

- **Why is the cognitive term zero at iteration 0?** At initialisation a particle has no experience other than its current position, so pbest = x and pbest − x = 0. The term only acts from iteration 1, once the particle has moved away from its best point.
- **Why is particle 1 pulled so strongly towards particle 2?** Particle 1 is 5 units away from gbest, and the social pull grows with the distance: 0.9 × 5 = 4.5, much larger than the inertia of 0.35. Particle 1 passes the minimum at x = 0 and stops at −1.15. This is the overshooting that Kennedy & Eberhart (1995, p. 1947) see as one reason why PSO explores well.
- **Why does particle 2 get worse?** Particle 2 is the gbest, so nothing pulls it; it drifts with its inertia and moves away from the minimum (f rises from 4 to 5.5225). The swarm still improves because gbest falls from 4 to 1.3225: one step can make one particle worse while the swarm gets better.

## Summary paragraph for the report

At iteration 0, particle 2 holds the best position, so gbest = −2. For particle 1, the inertia term is 0.7 × 0.5 = 0.35, the cognitive term is zero because pbest equals the current position, and the social term is 1.5 × 0.6 × (−2 − 3) = −4.5. Its new velocity is −4.15 and it moves to x = −1.15, overshooting the optimum but improving its fitness from 9 to 1.3225. Particle 2 is itself the global best, so only inertia acts on it: v = −0.35 and x = −2.35, which worsens its fitness from 4 to 5.5225. After the step, gbest becomes −1.15. The example shows that the cognitive term is inactive at the first step and that one particle can get worse while the swarm's best solution improves.
