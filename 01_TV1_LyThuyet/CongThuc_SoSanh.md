# Công thức, ký hiệu và so sánh PSO với Hill Climbing

> **Trạng thái: BẢN NHÁP do AI (Claude) soạn theo prompt 1.4.** Bảng ký hiệu, mã giả và bảng so sánh viết bằng tiếng Anh để đưa vào báo cáo; phần ghi chú viết tiếng Việt. Giá trị trong bảng ký hiệu khớp bảng thông số chung. Bảng ký hiệu đầy đủ đã được đưa vào phần Method (Bảng 3.1), nên khi ghép báo cáo không lặp lại ở Background.

## 1. Symbols (English, for the report)

| Symbol | Meaning | Range or unit | Value used by the team |
|---|---|---|---|
| x_i(t) | Position of particle i at iteration t (a candidate solution) | point in the search domain | [−5.12, 5.12]² |
| v_i(t) | Velocity of particle i (step added to the position) | same unit as x | each component in [−2.0, 2.0] |
| pbest_i | Best position visited by particle i so far | point in the domain | updated when f improves |
| gbest | Best position found by the whole swarm so far | point in the domain | updated every iteration |
| ω | Inertia weight | usually 0.4 to 0.9 | 0.4, 0.7, 0.9 |
| c₁ | Cognitive (personal) acceleration coefficient | ≥ 0 | 1.5 |
| c₂ | Social acceleration coefficient | ≥ 0 | 1.5 |
| r₁, r₂ | Uniform random numbers, new for each particle, dimension and iteration | [0, 1] | drawn by the code |
| t | Iteration counter | 0, 1, …, T | T = 100 |
| N | Number of particles | integer | 20 (5 in the small simulation) |
| n | Number of dimensions | integer | 2 |

## 2. The three terms of the velocity update

v_i(t+1) = **ω v_i(t)** + **c₁ r₁ (pbest_i − x_i(t))** + **c₂ r₂ (gbest − x_i(t))**

| Term | Meaning | Role |
|---|---|---|
| Inertia ω v_i(t) | Keeps part of the previous motion | Large ω carries particles further and favours **exploration**; small ω damps motion and favours **exploitation** |
| Cognitive c₁ r₁ (pbest_i − x_i) | Pull towards the particle's own best memory | Keeps particles searching around regions they found good; preserves diversity because each particle has its own pbest |
| Social c₂ r₂ (gbest − x_i) | Pull towards the swarm's best | Spreads good information and concentrates the swarm (**exploitation**); if too strong, the swarm collapses early onto one basin |

**Ghi chú (VI):** Kennedy & Eberhart (1995, tr. 1945) đã quan sát: g_increment quá lớn làm đàn "lao sớm vào cực tiểu địa phương", p_increment quá lớn làm từng cá thể lang thang; hai giá trị xấp xỉ nhau cho tìm kiếm tốt nhất. Đây là lý do nhóm đặt c₁ = c₂. Poli et al. (2007, Mục 2.3) diễn giải 1 − ω như hệ số ma sát.

## 3. Pseudo-code (English, for the report)

```
Input: objective f, domain [lo, hi]^n, N, T, ω, c1, c2, vmax
1  for each particle i = 1..N:
2      x_i ← uniform random point in [lo, hi]^n
3      v_i ← uniform random vector in [−vmax, vmax]^n
4      pbest_i ← x_i
5  gbest ← argmin over i of f(pbest_i)
6  for t = 1..T:
7      for each particle i:
8          draw r1, r2 ~ U(0, 1) for every dimension
9          v_i ← ω v_i + c1 r1 (pbest_i − x_i) + c2 r2 (gbest − x_i)
10         v_i ← clip(v_i, −vmax, vmax)
11         x_i ← clip(x_i + v_i, lo, hi)
12         if f(x_i) < f(pbest_i): pbest_i ← x_i
13     gbest ← argmin over i of f(pbest_i)
14 return gbest, f(gbest)
```

**Ghi chú (VI):** dòng 13 nằm ngoài vòng lặp hạt, nghĩa là cả bầy dùng chung gbest của vòng trước trong suốt một vòng (cập nhật đồng bộ). Code của TV2 làm đúng như vậy.

## 4. PSO versus Hill Climbing (English, for the report)

| Criterion | Hill Climbing | PSO |
|---|---|---|
| Solutions kept | One current solution | A population of N particles |
| Memory | Only the current point | Each particle's pbest plus the swarm's gbest |
| How the next point is chosen | A neighbour of the current point (here a Gaussian step, σ = 0.3); accepted only if better | Velocity combining inertia, own best and swarm best; every move is accepted, only the memories require improvement |
| Information sharing | None | Through gbest (social term) |
| Escaping local optima | Cannot without restarts, because worse moves are never accepted | Possible, because particles move through worse regions and other particles may still find a better basin; not guaranteed |
| Cost per iteration | 1 evaluation | N evaluations |
| Typical strength | Fast early progress on smooth, single-basin functions | Better final accuracy and robustness on multimodal functions under the same budget |
| When to use | Cheap local refinement, good starting point known | Global search, no gradient, landscape with many local optima |

**Ghi chú (VI):** dòng "Typical strength" khớp với kết quả TV3 (Bảng 4.1, 4.2): Hill Climbing đạt ngưỡng 0.01 trên Sphere nhanh hơn PSO (42.6 so với 132 lần đánh giá) nhưng PSO cho kết quả cuối tốt hơn, và trên Rastrigin chỉ PSO đạt ngưỡng.

## 5. Applications (với nguồn)

Lấy từ Poli et al. (2007, Mục 6, tr. 50–51), không cần nguồn ngoài:

- **Scheduling:** 38 application papers (5.6%) in the authors' analysis of IEEE Xplore.
- **Neural networks** (training and design, which includes tuning a network's hyper-parameters): 26 papers (3.8%). Kennedy & Eberhart (1995) already trained neural-network weights with PSO (XOR, Iris).
- **Electricity networks and load dispatching:** 48 papers (7.1%), the second-largest category.

TV3 có thêm hai nguồn ngoài (Wang et al. 2019 cho tối ưu siêu tham số CNN, Gaing 2003 cho economic dispatch). Hai nguồn này hợp với danh mục trên, nhưng TV3 cần xác nhận đã tự mở ra đọc.
