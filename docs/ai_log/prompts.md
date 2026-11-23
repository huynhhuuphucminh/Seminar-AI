# Prompt set used by the team

These are the prompts the team designed for the seminar, kept in the team's Google Doc ("Seminar AI", tab "AI system and prompts"). The original prompts were written in Vietnamese; this file is an English translation with the same structure and IDs. The "Prompt ID" column of the member logs refers to these IDs.

**How the prompts were used.** Each member was meant to open a new chat, paste the shared context block P0, then run their own prompts in order and review every output. From 8 November onwards, most work was instead delegated directly to coding assistants (Claude Code with Claude Opus or Claude Sonnet, and OpenAI Codex) with task-level requests such as "do the remaining Member 2 work" or "re-run the experiments with v_max = 10.24". Those entries in the logs say "direct request" and describe the request instead of citing a prompt ID.

**Settings in P0 are those of the first version.** P0 fixes v_max = 2.0 (velocity limit) for all experiments. The submitted report and notebooks use v_max = 10.24, the domain width, after a review on 9–10 November; see the member logs.

---

## P0. Shared context block (whole team)

Paste at the start of every new AI chat, before any other prompt.

```
You are an assistant helping a team of three third-year students prepare a seminar for the course Introduction to Artificial Intelligence (CS420).

TOPIC: Particle Swarm Optimization (PSO): optimisation through collective swarm behaviour.
GUIDING QUESTION: How does PSO combine individual experience and social information to balance exploration and exploitation?

ASSIGNMENT REQUIREMENTS:
1. Introduce the swarm-inspired motivation, particle population, position x, velocity v, pbest, gbest; distinguish PSO from Hill Climbing.
2. Present the velocity and position update equations and explain ω, c1, c2, r1, r2; calculate one update step by hand for 2 particles in a 1-D problem.
3. Choose at least 2 objective functions; define the search domain and the fitness evaluation.
4. Simulate at least 5 particles over 5 iterations; compare at least 3 parameter settings with at least 5 random seeds.
5. Table or plot of best fitness against iterations; compare PSO with Random Search or Hill Climbing under the same number of function evaluations.
6. Discuss premature convergence, parameter sensitivity and at least 2 real-world applications.
The report and slides are written in English. Report: 6 to 10 A4 pages: Abstract, Introduction, Background/Paper Review, Method/Worked Example, Results and Discussion, Conclusion, References.
Sources: Kennedy & Eberhart (1995), Particle Swarm Optimization (required); Poli, Kennedy & Blackwell (2007), Particle swarm optimization: An overview (recommended).

SHARED TEAM SETTINGS (use exactly, do not change):
- Sphere: f(x) = Σ xi², 2 dimensions, domain [−5.12, 5.12]².
- Rastrigin: f(x) = 10n + Σ (xi² − 10 cos(2π xi)), n = 2, domain [−5.12, 5.12]².
- Default: ω = 0.7, c1 = c2 = 1.5, 20 particles, 100 iterations, gbest; positions clipped to the domain; |v| ≤ 2.0.
- Update: v(t+1) = ω·v(t) + c1 r1 (pbest − x(t)) + c2 r2 (gbest − x(t)); x(t+1) = x(t) + v(t+1).
- Three settings: A ω = 0.4; B ω = 0.7; C ω = 0.9. Seeds: 0, 1, 2, 3, 4.
- Evaluation budget: 2020 objective-function calls per run.

RULES:
1. Language: everything that goes into the report, slides, tables and figures (titles, axis labels, legends) is written in academic English. Explanations, reading notes and guidance meant for me are written in Vietnamese.
2. When discussing a paper, rely only on the file I attach. If something is not in the paper, write "[not in the paper]" instead of guessing.
3. Never invent citations, numbers, page numbers or paper titles.
4. Always separate (a) what the paper says from (b) examples or experiments made by the team.
5. Show every calculation step by step so that I can check it.
6. Write short, clear sentences, as a student explaining in their own words; no flowery language, also in English.
7. At the end of every answer, list the points I must check myself.

If you understand, answer "Understood" and wait for the task.
```

---

## Member 1: theory and paper review

### 1.1 Reading notes on the required paper
Attach: PDF of Kennedy & Eberhart (1995). Output: reading notes.

```
Task: read the attached paper (Kennedy & Eberhart, 1995) and write reading notes covering:
1. Goal and motivation: what problem the authors want to solve and where the idea comes from.
2. How the algorithm is described: pbest, gbest, how velocity and position are updated. Copy the formula or description exactly as in the paper.
3. The intermediate versions the authors tried before the final one, and why they dropped them.
4. The function-optimisation examples or applications in the paper and the results the authors report.
5. Points the paper leaves unclear, or its limitations.
6. Five questions a lecturer could ask about this paper, with suggested answers.
Use bullet points. After each point, give its location in the paper (section name or page number).
```
Check: open the PDF and find each point at the location given; delete any point that cannot be found; pay most attention to formulas and experimental results.

### 1.2 Reading notes on the recommended paper
Attach: PDF of Poli, Kennedy & Blackwell (2007). Output: reading notes.

```
Task: read the attached review (Poli, Kennedy & Blackwell, 2007), focusing on:
1. The role of each parameter: inertia weight ω, c1, c2, velocity limit Vmax, constriction factor. For each: how the swarm's behaviour changes when it increases or decreases.
2. Neighbourhood structure (topology): how gbest and lbest differ and how this affects convergence.
3. The main PSO variants the paper describes, 1 to 2 sentences each.
4. The application areas the paper lists.
5. Open problems the paper raises, especially premature convergence.
6. What this paper adds to or changes from the 1995 original.
Use bullet points and give the location (section name or page number) after each point.
```
Check: compare each point with the PDF as for 1.1; check the parts on ω and the constriction factor with extra care.

### 1.3 Background/Paper Review section
Attach: paste the reviewed notes from 1.1 and 1.2 into [NOTES].

```
Based on the checked notes below, write the "Background/Paper Review" section of the report in English, about 1.5 to 2 A4 pages, covering:
1. Swarm intelligence and the origin of PSO.
2. The original PSO algorithm of Kennedy & Eberhart (1995).
3. The role of the parameters and the main variants according to Poli et al. (2007).
4. A comparison of the two sources: what changed between the original paper and the review.
Cite as (Kennedy & Eberhart, 1995) or (Poli et al., 2007). Use only information in the notes; do not add other sources.

[NOTES]
```
Check: every cited sentence must match the notes; rewrite sentences in your own voice; count the pages.

### 1.4 Formulas, symbols and comparison with Hill Climbing

```
Task:
1. Make a symbol table for PSO with: xi, vi, pbesti, gbest, ω, c1, c2, r1, r2, t, number of particles, number of dimensions. Columns: meaning, range or unit, value used by the team (from the shared settings).
2. Explain the three terms of the velocity equation: inertia, cognitive term, social term, and how each relates to exploration or exploitation.
3. Write PSO pseudo-code with numbered steps.
4. Make a table comparing PSO and Hill Climbing on: number of solutions kept, use of memory, how the next step is chosen, ability to escape local optima, cost per iteration, when to use.
5. Give 2 to 3 real-world applications (e.g. hyper-parameter tuning, scheduling, engineering design). State which applications appear in Poli et al. (2007); mark those from general knowledge as [source needed]. The symbol table, pseudo-code and comparison table are written in English because they go into the report; explanations for me are in Vietnamese.
```
Check: every value in the symbol table must match the shared settings; any application marked [source needed] must get a real source or be removed.

### 1.5 One-dimensional hand calculation

```
Calculate one PSO update step by hand for a 1-D problem, showing every operation:
- Objective: f(x) = x², to be minimised.
- Parameters: ω = 0.7, c1 = c2 = 1.5.
- Iteration 0: particle 1 has x = 3, v = 0.5; particle 2 has x = −2, v = −0.5. Each particle's pbest is its current position.
- Random numbers: particle 1 uses r1 = 0.4, r2 = 0.6; particle 2 uses r1 = 0.8, r2 = 0.3.
Requirements:
1. Compute f for each particle at iteration 0 and identify gbest.
2. Compute each particle's new velocity and position, giving the value of each term: inertia, cognitive, social.
3. Compute the new f values and update pbest and gbest.
4. Make a state table for iterations 0 and 1 with columns: particle, x, v, f(x), pbest, gbest.
5. Explain in words why the cognitive term is 0 at iteration 0 and why particle 1 is pulled strongly towards particle 2. The table in step 4 uses English column names; finally add a short English paragraph summarising the calculation for the report.
```
Check: compare with the reference answer (particle 1: v = −4.15, x = −1.15; particle 2: v = −0.35, x = −2.35; new gbest = −1.15) and recompute at least one particle with a calculator.

### 1.6 Abstract and Introduction
Attach: paste summaries of the Method (Member 2) and Results (Member 3) into [SUMMARY].

```
Write two sections of the report, in academic English:
1. Abstract, at most 200 words: context, aim, method, main results (use exactly the numbers in the summary below), conclusion.
2. Introduction, about 0.75 page: context of continuous optimisation, why PSO is of interest, the guiding question of the assignment, the scope of the report (2 test functions, 2 dimensions, comparison with baselines), the outline of the following sections.
Do not claim more than the numbers support, because the experiments are small.

[SUMMARY]
```
Check: every number in the Abstract must appear in Member 3's result tables; the guiding question must be quoted exactly.

### 1.7 Assembly check of the report
Attach: the assembled report.

```
This is the team's assembled report. Do not rewrite it. List the problems to fix in a table with columns: location, problem, suggested fix. Check:
1. All sections present and in order: Abstract, Introduction, Background/Paper Review, Method/Worked Example, Results and Discussion, Conclusion, References.
2. Consistent symbols across sections (ω, c1, c2, pbest, gbest...).
3. Numbers in the text match the tables and figures.
4. Every figure, table and equation has a source or is marked as made by the team.
5. Every citation is in the References and vice versa; the AI tools used are acknowledged.
6. Any conclusion stronger than the small experiments allow.
7. Whether the estimated length is within 6 to 10 pages; English grammar errors, unclear sentences or inconsistent terminology.
```
Check: decide yourself which problems to fix, as the AI may be wrong; then run prompt 4.3.

---

## Member 2: objective functions and simulation

Code runs in Google Colab: create a notebook, paste the code cell by cell, run it and save it to GitHub.

### 2.1 PSO code and objective functions

```
Write Python code (numpy, matplotlib) for Google Colab, split into titled cells with code comments in English:
1. Functions sphere(x) and rastrigin(x) as in the shared settings, with a test cell: both must equal 0 at (0, 0).
2. A function pso(func, n_particles, n_iter, w, c1, c2, bounds, vmax, seed, log_states=False):
   - initialise positions uniformly in the domain and velocities uniformly in [−vmax, vmax];
   - update with the shared formula, drawing new r1 and r2 for every particle, dimension and iteration;
   - clip positions to the domain and velocities to [−vmax, vmax];
   - count objective-function calls;
   - return the history of best fitness per iteration (with the number of evaluations) and the best solution;
   - if log_states=True, store each particle's state at every iteration: x, v, f, pbest, gbest, and the r1, r2 used.
3. A function that runs many combinations and writes results_pso.csv with columns: function, config, w, c1, c2, seed, iteration, evaluations, best_fitness.
4. A test cell: Sphere, default parameters, seed 0, print the final best fitness.
After each cell, explain briefly what it does and which line corresponds to which formula.
```
Check: runs without errors; Sphere with default parameters must end very close to 0; compare the velocity-update line with the shared formula symbol by symbol.

### 2.2 Five particles over five iterations
Attach: paste the pso function into [CODE].

```
Based on the code below, add cells that:
1. Run PSO on Sphere with 5 particles, 5 iterations, seed 42, default parameters, log_states=True.
2. Print a state table for every iteration 0 to 5 with columns: particle, x1, x2, v1, v2, f(x), pbest, f(pbest), and gbest of that iteration. Round to 4 digits.
3. Print the r1, r2 values used by particle 1 to move from iteration 0 to iteration 1.
4. Plot the 5 particles on the Sphere contour plot at iterations 0, 1, 3 and 5. Titles, labels and table column names in English.
Then, using the printed numbers, explain step by step how particle 1 moves from iteration 0 to iteration 1 so that I can check it with a calculator.

[CODE]
```
Check: using the printed r1, r2, recompute particle 1's new velocity and position (at least coordinate x1); it must match the table. This is minimum output 1 of the assignment.

### 2.3 Three ω settings with five seeds
Attach: paste the pso function into [CODE].

```
Based on the code below, write a cell that:
1. Runs settings A (ω = 0.4), B (ω = 0.7), C (ω = 0.9), c1 = c2 = 1.5, 20 particles, 100 iterations, on both Sphere and Rastrigin, each combination with seeds 0 to 4. Save everything to results_pso.csv.
2. Prints the final results: function, setting, mean, standard deviation, best and worst best fitness.
3. For each function, plots the mean best fitness over 5 seeds against the iteration (log scale), one line per setting, with a band from min to max. Title, axis labels and legend, all in English.
4. Saves the figures as 150 dpi PNG.
Then explain how to read the table and the plots, without drawing conclusions beyond the numbers.

[CODE]
```
Check: re-run any one combination and check the numbers against the CSV; the plots must be readable in black and white.

### 2.4 Method/Worked Example section
Attach: Member 1's hand calculation, the iteration 0 and 1 tables from 2.2 and the shared settings, pasted into [DATA].

```
Write the "Method/Worked Example" section of the report in English, about 2 pages, covering:
1. Problem and objective functions: Sphere and Rastrigin formulas, domain, global minimum, fitness evaluation; why these two (one unimodal, one multimodal).
2. Algorithm: the PSO steps with the team's settings, boundary handling and velocity limit.
3. 1-D hand calculation: present Member 1's data neatly.
4. Five-particle simulation: state table at iterations 0 and 1, explanation of one particle.
5. Experimental setup: 3 settings, 5 seeds, budget of 2020 evaluations, baselines with the same budget.
State that these examples and experiments were made by the team. Use only the numbers in the data below.

[DATA]
```
Check: every number must match the source tables; define every symbol at first use.

---

## Member 3: experiments, comparison and analysis

### 3.1 Random Search and Hill Climbing baselines

```
Write Python code (numpy) for Google Colab, with code comments in English:
1. sphere and rastrigin as in the shared settings (if I paste my teammate's code, reuse it).
2. random_search(func, bounds, budget, seed): uniform samples in the domain, exactly budget function calls, record the best fitness after each evaluation.
3. hill_climbing(func, bounds, budget, sigma, seed): start from a random point, add Gaussian noise σ = 0.3 at each step, clip to the domain, accept a new point only if it is better, no restarts, stop after budget function calls.
4. Run both with budget = 2020, seeds 0 to 4, on Sphere and Rastrigin; save results_baseline.csv with columns: function, method, seed, evaluations, best_fitness.
5. A test cell: count the actual number of function calls, which must be exactly 2020.
```
Check: run the evaluation-count test; all three methods must use the same budget, otherwise the comparison is unfair.

### 3.2 Comparison of PSO with the baselines
Attach: the first 5 lines of results_pso.csv and results_baseline.csv, pasted into [DATA SAMPLE].

```
Write a cell that reads results_pso.csv (setting B, ω = 0.7, only) and results_baseline.csv, then:
1. Puts all methods on the same axis: number of objective evaluations (PSO: 20 per iteration plus 20 at initialisation).
2. For each function, plots the mean best fitness over 5 seeds against evaluations, log scale, 3 lines: PSO, Random Search, Hill Climbing, with a min-to-max band. Title, labels and legend in English.
3. Prints the final results at 2020 evaluations: function, method, mean, standard deviation, best, worst.
4. Also prints the mean number of evaluations each method needs to first reach a best fitness below 0.01 (write "not reached" if it never does).
Then describe what the table and the plots show, reminding that there are only 5 seeds and two 2-D functions, so no general conclusion is possible.

[DATA SAMPLE]
```
Check: verify the table by filtering one combination of the CSV by hand. This is minimum output 2 of the assignment.

### 3.3 Case of premature convergence
Attach: paste the pso function into [CODE].

```
Based on the code below, write a cell that:
1. Runs PSO on Rastrigin with 5 particles, 100 iterations, ω = 0.4, c1 = 0.5, c2 = 2.5, seeds 0 to 19; prints each seed's final best fitness.
2. Automatically selects a seed whose final best fitness is above 0.9 (stuck in a local minimum). If there is none, print a message so that I can change the parameters.
3. For that seed: plots the particles on the Rastrigin contour plot at iterations 0, 10, 50 and 100; marks the global minimum (0, 0) and the final gbest. All text on the figure in English.
4. Computes and plots the swarm diversity over the iterations: mean distance from the particles to the swarm centroid.
5. Compares with the same seed using the default parameters (20 particles, ω = 0.7, c1 = c2 = 1.5).
Then explain in words why the swarm got stuck (fast loss of diversity, too strong a social term, few particles) and relate it to premature convergence and the balance between exploration and exploitation.

[CODE]
```
Check: confirm on the figure that the final gbest lies in another basin, not (0, 0); recompute f at that point. This is minimum output 3 of the assignment.

### 3.4 Results and Discussion, Conclusion
Attach: the result tables from 2.3 and 3.2, a description of the figures and the analysis from 3.3, pasted into [RESULTS].

```
Write two sections of the report, in academic English:
1. Results and Discussion, about 2 pages:
   - Effect of ω (settings A, B, C) on each function.
   - Comparison of PSO with Random Search and Hill Climbing under the same budget of 2020 evaluations.
   - The local-minimum case and premature convergence.
   - Parameter sensitivity: which parameter changed the results most in the team's experiments.
   - Strengths, weaknesses and conditions under which PSO should be used.
   - Limitations of the experiments: only 2 functions, 2 dimensions, 5 seeds.
   Every remark must point to specific numbers or figures (Table X, Figure Y).
2. Conclusion, about half a page: answer the guiding question of the assignment from the results, with 1 to 2 directions for further work.
Do not claim more than the numbers support.

[RESULTS]
```
Check: every remark must point to a table or figure; soften or delete any that cannot.

---

## Whole team, final stage

### 4.1 Slide outline for one's own part
Attach: one's own reviewed report section and related figures.

```
From the report section below, propose 3 to 4 slides in English for a 15-minute talk (8 to 12 slides for the whole team, about 5 minutes per person). For each slide:
1. A short title.
2. 3 to 5 points, at most 12 words each.
3. The figure, table or equation to show, with the source to print under it.
4. Speaker notes of about 1 minute, written in English as spoken language, with simple sentences that are easy to say.
Do not copy sentences from the report onto the slides.

[REPORT SECTION]
```
Check: rehearse with the speaker notes and time it; every figure or equation taken from a paper must carry its source on the slide.

### 4.2 Q&A practice
Attach: one's own report section.

```
Act as a strict lecturer grading the seminar. Based on the report section below and the PSO topic:
1. Ask me 8 questions in English, one at a time; wait for my answer in English before asking the next.
2. Mix the question types: definitions, explaining formulas, why a parameter was chosen, what happens if a parameter changes, comparison with other algorithms, challenging questions about the limits of the experiments.
3. After each answer: grade it as Excellent, Good, Satisfactory or Unsatisfactory; point out what is wrong or missing; give a short model answer in English and correct my English.
4. At the end: summarise my 3 weakest points to review.

[REPORT SECTION]
```
Check: answer in your own words, without reading; run it at least twice, the second time also with questions on the other members' parts.

### 4.3 Rubric self-assessment
Attach: the complete report and the S01 assignment sheet (PDF).

```
Using the 100-point rubric in the attached assignment sheet, grade the team's report. For each of the 8 criteria:
1. Expected level (Excellent 100%, Good 75%, Satisfactory 50%, Unsatisfactory 0 to 25%) and points.
2. Evidence: a short quote or the location in the report.
3. Concrete actions to reach a higher level.
Check the three minimum outputs separately: particle states at iterations 0 and 1, fitness-versus-iteration plot, analysis of a local-optimum case. Finally, list the 5 priority fixes before submission.
```
Check: the AI grade is only indicative; the team reads the 5 priority fixes together and assigns them before the deadline.
