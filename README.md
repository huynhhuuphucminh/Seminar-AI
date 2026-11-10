# PSO seminar (CS420, S01): how individual memory and social information balance exploration and exploitation

Report, slides, code and results for seminar topic **S01, Particle Swarm Optimization**, CS420 Introduction to Artificial Intelligence.

**Team:** Văn Tuấn Khải (24125032), Huỳnh Hữu Phúc Minh (24125068), Lê Lương Quốc Trung (24125084).

## What is in this repository

| Path | Content |
|---|---|
| [`Report.pdf`](Report.pdf), [`Report.tex`](Report.tex) | The report (English, LaTeX source and compiled PDF) |
| [`slides/`](slides) | Presentation slides (`.pptx` and `.pdf`) |
| [`notebooks/`](notebooks) | `PSO_Seminar.ipynb` (PSO, worked examples, inertia sweep, `v_max` sensitivity) and `Baseline_SoSanh.ipynb` (comparison with Random Search and Hill Climbing, premature-convergence diagnostic) |
| [`results/`](results) | CSV files written by the notebooks (every number in the report comes from here) |
| [`figs/`](figs) | Figures written by the notebooks and used in the report and slides |
| [`references/`](references) | The two source papers: Kennedy and Eberhart (1995), Poli, Kennedy and Blackwell (2007) |
| [`docs/`](docs) | Assignment sheet, reading notes, working drafts, review lists, slide outlines and the AI-use log (see [`docs/README.md`](docs/README.md)) |

## Main result in one paragraph

On two 2-D functions (Sphere and Rastrigin) and with an equal budget of 2,020 function evaluations, PSO with `ω = 0.7`, `c1 = c2 = 1.5` and `v_max = 10.24` (the domain width) reached the best final fitness (mean `1.0e-12` on Sphere and `1.1e-6` on Rastrigin) and was the only method to reach a fitness of 0.01 on Rastrigin; Hill Climbing reached 0.01 sooner on Sphere. With the inertia weight varied, `ω = 0.4` gave the best final mean on both functions, but with a tighter velocity limit (`v_max = 2.0`) one Rastrigin run stalled, so the ranking of inertia weights depends on that limit. A diagnostic run with a strong social pull and few particles collapsed onto a local minimum in all 20 seeds. The experiments are small (two functions, five seeds), so the report treats them as illustrations.

## How to reproduce

Requirements: Python 3 with `numpy`, `pandas` and `matplotlib` (and Jupyter to open the notebooks).

1. Run `notebooks/PSO_Seminar.ipynb` from top to bottom. It writes `results/results_pso.csv`, `summary_pso.csv`, `swarm_states_sphere_seed42.csv`, `update_decomposition_iter0_to_1.csv`, `vmax_sensitivity.csv` and the figures `figs/fig_swarm_sphere.png`, `figs/fig_omega_*.png`.
2. Run `notebooks/Baseline_SoSanh.ipynb` afterwards. It reads `results/results_pso.csv`, checks that it matches a replay of the same code, and writes `results/results_baseline.csv`, `diagnostic_sweep.csv`, `diagnostic_trace_seed0.csv` and `figs/fig_compare_*.png`, `figs/fig_local_optimum.png`.
3. Open the notebooks from the repository root or from `notebooks/`; both work. In Colab, upload `results/results_pso.csv` before step 2.

All runs are determined by their random seeds (0 to 4 for the sweeps, 42 for the five-particle example, 0 to 19 for the diagnostic), so re-running reproduces the stored CSV files exactly.

To rebuild the report (needs a LaTeX distribution with `pdflatex`):

```bash
pdflatex Report.tex
pdflatex Report.tex
pdflatex Report.tex
```

## Use of AI tools

Claude (Anthropic) and OpenAI Codex were used to draft reading notes, implement and run the notebooks, and draft sections of the report and slides. The prompts and the checks made are recorded in [`docs/ai_log/`](docs/ai_log). Every number in the report was reproduced from the notebooks and files above.
