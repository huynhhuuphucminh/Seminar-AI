# Checklist from assembling the report (prompt 1.7)

> Written with AI assistance while assembling the **first Word report** (`docs/archive/Report_v_max_2.0.docx`, v_max = 2.0), and updated as issues were resolved. The "Status" column says whether the issue was fixed in that version or waited for the team. The submitted LaTeX report (`Report.pdf`) supersedes this version.

| Location | Issue | Action | Status |
|---|---|---|---|
| Author line, slide 1 | Names and student IDs missing | Fill in the highlighted `[Member …]` placeholders | Done in the LaTeX report |
| Whole report | The S01 sheet asks for a report in Vietnamese; the team wrote it in English | Keep English, as decided by the team on 9 November; translate if the lecturer requires Vietnamese | English kept |
| Section 2 | Symbol table in both Background and Method | Keep it in Method only (Table 3.1) | Fixed |
| Section 3.2 | Original Method draft about 1,700 words | Shorter list of steps; iteration 0 and 1 tables merged into Table 3.3 | Fixed |
| Section 3.4 | State table split in two | One table with a gbest row | Fixed |
| Section 4.1 | Two separate comparison figures | Combined into Figure 4.1 (Sphere left, Rastrigin right) | Fixed |
| Section 4.2 | "ω = 0.9 kept so much velocity…" was speculative | Rewritten as "still converging when the budget ran out (mean 4.2 × 10⁻⁵)" | Fixed |
| Section 4.1 | "Hill Climbing stayed in the basin" too strong | Rewritten as "rarely left the basin it reached first" | Fixed |
| Section 4.4 | Applications relied only on two external sources | Added the application categories of Poli et al. (2007, Sect. 6) | Fixed; the external sources were later replaced by Alshareef et al. (2019) and Phung & Ha (2021) |
| Section 4.4 | Origin bias not mentioned | Added a limitation: both functions have their minimum at the centre of the domain (Poli et al., 2007, Sect. 7.1) | Fixed |
| References | No statement on AI tools | Added "Use of AI tools" | Fixed |
| Symbols | ω, c₁, c₂, pbest, gbest consistent across sections | Checked | Fixed |
| Numbers | Every number in Tables 3.3, 4.1, 4.2 and 4.3 | Recomputed from `results_pso.csv`, `results_baseline.csv`, `swarm_states_sphere_seed42.csv` | Match |
| Sections 3.2, 4.2, Abstract | No reason given for v_max = 2.0 (tighter than the rule V_max = X_max of Poli et al., 2007) | Reason added to 3.2; inertia sweep repeated with v_max = 5.12, 10.24 and no clamp, result added to 4.2 (the Rastrigin ranking depends on v_max) | Fixed after review; the team then switched to v_max = 10.24 |
| Length | 6–10 pages | First assembled version: 7 A4 pages including References | Met |
