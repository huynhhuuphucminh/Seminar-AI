# Member 2 presentation segment

> Written with AI assistance (prompt 4.1, see the AI-use log). Member 2 rehearses with the speaker notes, times the segment and adapts the wording. Numbers are from the first version (v_max = 2.0); the final deck is in slides/.

Three content slides in about five minutes, after Member 1.

## 1. Problem, functions and update rule · 1 min 30 s

- Minimise f over [−5.12, 5.12]²; fitness = f(x)
- Sphere: one basin, minimum 0 at origin
- Rastrigin: grid of local minima, minimum 0 at origin
- v ← ωv + c₁r₁(pbest − x) + c₂r₂(gbest − x), then x ← x + v
- 20 particles × 100 iterations = 2,020 evaluations

**Visual and credit.** Two small 3-D or contour plots of Sphere and Rastrigin side by side; the update equation underneath with the three terms coloured (inertia, cognitive, social). Credit: team illustration; equation form from Poli et al. (2007), Eq. 2.

**Speaker notes.** We tested PSO on two functions in two dimensions. Sphere is a smooth bowl with a single minimum. Rastrigin has the same global minimum at the origin, but a cosine term adds a whole grid of local minima, so it tests whether the swarm gets trapped. Fitness is simply the function value, and lower is better. Each velocity has three parts: inertia keeps part of the old motion, the cognitive part pulls towards the particle's own best, and the social part pulls towards the swarm's best. Random numbers r1 and r2 change for every particle, dimension and iteration. One run uses 20 particles for 100 iterations, which is 2,020 function evaluations.

## 2. One step by hand · 1 min 40 s

- f(x) = x², ω = 0.7, c₁ = c₂ = 1.5
- Particle 1: inertia 0.35, social −4.5 → v = −4.15, x = −1.15
- Particle 2 is gbest: only inertia → x = −2.35
- Cognitive term is zero at the first step
- gbest improves from −2 to −1.15

**Visual and credit.** Table 3.2 from the report (one update step), with the arrows of particle 1 overshooting zero drawn on a number line. Credit: team worked example.

**Speaker notes.** Here is one update in one dimension. Particle 1 is at 3, particle 2 at minus 2. Particle 2 has the lower value, so it is the global best. For particle 1, inertia gives 0.35. The cognitive term is zero, because at the start the personal best is the current position. The social term is 1.5 times 0.6 times minus 5, which is minus 4.5. So the new velocity is minus 4.15 and the particle jumps to minus 1.15. It overshoots the minimum, but its value drops from 9 to 1.32. Particle 2 is already the best, so only inertia moves it, and it actually gets worse. Still, the swarm's best improves. One particle can get worse while the group gets better.

## 3. Five particles, five iterations · 1 min 50 s

- Sphere, 5 particles, seed 42
- Iteration 0 → 1: every particle improves
- Velocity clamp at ±2 is active for three particles
- f(gbest): 8.26 → 3.34 → 0.17 → 0.02 after 5 iterations
- Inertia sweep: best ω depends on the function

**Visual and credit.** `figs/fig_swarm_sphere.png` full width; a small inset of Table 3.4 (iteration 1). Credit: team experiment, Figure 3.1.

**Speaker notes.** Now the full algorithm with five particles on Sphere. At iteration 0 the particles are spread out and particle 1 is the best. After one update every particle improves, and particle 5 becomes the new global best. Three particles wanted to move faster than 2, so their velocity was clipped; this limit keeps the swarm from flying out of the domain. After five iterations the best value has dropped from 8.26 to 0.02, and the figure shows the swarm contracting around the origin. We then ran 20 particles with three inertia weights and five seeds each. The best setting was different on the two functions, and my teammate will now compare PSO with other methods under the same budget.
