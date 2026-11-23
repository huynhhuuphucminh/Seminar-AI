# AI-use log

The assignment requires the team to cite every AI tool used and to verify independently any content suggested by AI. This folder records that use.

| File | Content |
|---|---|
| [`prompts.md`](prompts.md) | The prompt set the team designed (shared context block P0 and prompts 1.1 to 4.3), translated from the Vietnamese original |
| [`member1.md`](member1.md) | Log for Member 1, Văn Tuấn Khải: theory, paper review, report assembly |
| [`member2.md`](member2.md) | Log for Member 2, Huỳnh Hữu Phúc Minh: objective functions, simulation, inertia and velocity-limit experiments; also team-level planning |
| [`member3.md`](member3.md) | Log for Member 3, Lê Lương Quốc Trung: baselines, comparison, premature-convergence diagnostic |

## How to read the logs

- **One file per part of the work.** Each file covers the sections that member is responsible for. The **Run by** column says who operated the tool; some sections were drafted by a teammate on the owner's behalf.
- **Tools.** Claude (Anthropic) was used through Claude Code with Claude Opus 5.5 or Claude Sonnet 5.5; OpenAI Codex was used by Member 3. Where the model is not known, the log says "Claude".
- **Prompt or request.** A prompt ID (P0, 1.1 … 4.3) refers to [`prompts.md`](prompts.md). From 8 November most work was delegated to coding assistants with direct, task-level requests; those rows say "direct request" and describe it.
- **Checks.** The checks column records what was verified and how (re-running code, recomputing numbers from the CSV files, comparing with the source papers). Every number in `Report.pdf` was reproduced from the notebooks and the files in `results/`.
- **Velocity limit.** Rows dated 8 and 9 November refer to the first experimental setting, v_max = 2.0. On 10 November all experiments were re-run with v_max = 10.24 (the domain width); the submitted report, slides and results use this setting.
- **Paths.** Paths follow the final repository layout (`notebooks/`, `results/`, `figs/`, `docs/…`), even for work done under the earlier layout.
