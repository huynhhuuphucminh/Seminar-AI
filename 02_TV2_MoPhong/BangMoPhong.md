# Bảng mô phỏng: 5 hạt qua 5 vòng lặp trên hàm Sphere

> **Trạng thái:** bản nháp do AI (Claude) tạo từ notebook `PSO_Seminar.ipynb`, phần 2. TV2 cần tự bấm máy lại ít nhất hạt 2 (mục 3 bên dưới) trước khi đưa vào báo cáo.

**Thiết lập:** hàm Sphere 2 chiều, miền [−5.12, 5.12]², 5 hạt, 5 vòng lặp, seed 42, ω = 0.7, c₁ = c₂ = 1.5, |v| ≤ 2.0. Toàn bộ trạng thái của 6 vòng (0 đến 5) nằm trong file `swarm_states_sphere_seed42.csv`; phân rã vận tốc của cả 5 hạt nằm trong `update_decomposition_iter0_to_1.csv`.

Đây là đầu ra tối thiểu số 1 của đề (trạng thái các hạt ở vòng 0 và vòng 1). Hai bảng dưới đây dùng tên cột tiếng Anh để đưa thẳng vào báo cáo.

## 1. Iteration 0 (initialisation)

| particle | x1 | x2 | v1 | v2 | f(x) | pbest1 | pbest2 | f(pbest) |
|---|---|---|---|---|---|---|---|---|
| 1 | 2.8053 | -0.6259 | -0.5168 | 1.7071 | 8.2615 | 2.8053 | -0.6259 | 8.2615 |
| 2 | 3.6720 | 2.0210 | 0.5755 | 1.2910 | 17.5685 | 3.6720 | 2.0210 | 17.5685 |
| 3 | -4.1556 | 4.8704 | -0.2263 | -1.0910 | 40.9897 | -4.1556 | 4.8704 | 40.9897 |
| 4 | 2.6741 | 2.9293 | 0.2183 | -1.7447 | 15.7314 | 2.6741 | 2.9293 | 15.7314 |
| 5 | -3.8081 | -0.5080 | 1.3105 | 0.5267 | 14.7599 | -3.8081 | -0.5080 | 14.7599 |

gbest(0) = (2.8053, −0.6259), f(gbest) = 8.2615 (particle 1).

## 2. Iteration 1

| particle | x1 | x2 | v1 | v2 | f(x) | pbest1 | pbest2 | f(pbest) |
|---|---|---|---|---|---|---|---|---|
| 1 | 2.4435 | 0.5691 | -0.3618 | 1.1949 | 6.2947 | 2.4435 | 0.5691 | 6.2947 |
| 2 | 3.6513 | 1.4539 | -0.0208 | -0.5671 | 15.4455 | 3.6513 | 1.4539 | 15.4455 |
| 3 | -2.1556 | 2.8704 | 2.0000 | -2.0000 | 12.8858 | -2.1556 | 2.8704 | 12.8858 |
| 4 | 2.8525 | 0.9293 | 0.1784 | -2.0000 | 9.0003 | 2.8525 | 0.9293 | 9.0003 |
| 5 | -1.8081 | -0.2578 | 2.0000 | 0.2503 | 3.3357 | -1.8081 | -0.2578 | 3.3357 |

gbest(1) = (−1.8081, −0.2578), f(gbest) = 3.3357 (particle 5).

Cả 5 hạt đều tốt hơn vị trí cũ nên pbest của mọi hạt được cập nhật bằng vị trí mới.

## 3. Bấm máy lại hạt 2 (vòng 0 sang vòng 1)

Hạt 1 không dùng làm ví dụ được: ở vòng 0 nó chính là gbest, nên cả thành phần nhận thức lẫn xã hội đều bằng 0 và nó chỉ đi theo quán tính. Dùng hạt 2:

- Số ngẫu nhiên notebook đã dùng: r₁ = (0.9707, 0.8931), r₂ = (0.3258, 0.3705).
- Ở vòng 0, pbest₂ = x₂, nên thành phần nhận thức = 1.5 · r₁ · 0 = 0 ở cả hai chiều.

| Bước | Chiều 1 | Chiều 2 |
|---|---|---|
| Quán tính ω·v(0) | 0.7 × 0.5755 = 0.4028 | 0.7 × 1.2910 = 0.9037 |
| Nhận thức c₁r₁(pbest − x) | 0 | 0 |
| Xã hội c₂r₂(gbest − x) | 1.5 × 0.3258 × (2.8053 − 3.6720) = −0.4236 | 1.5 × 0.3705 × (−0.6259 − 2.0210) = −1.4709 |
| v(1) = tổng (không vượt ±2.0) | −0.0208 | −0.5671 |
| x(1) = x(0) + v(1) | 3.6720 − 0.0208 = 3.6513 | 2.0210 − 0.5671 = 1.4539 |
| f(x(1)) | 3.6513² + 1.4539² = 15.4455 | |

Sai lệch ở chữ số thứ 4 (ví dụ 3.6512 so với 3.6513) là do làm tròn, notebook tính với đủ chữ số.

**Hai điểm dễ sai khi bấm máy:**
- **Giới hạn vận tốc:** hạt 3 có vận tốc thô (4.7444, −2.3258), bị cắt về (2.0, −2.0). Hạt 5 có vận tốc thô ở chiều 1 là 3.1683, bị cắt về 2.0.
- **gbest dùng để cập nhật** là gbest của vòng 0 (hạt 1), không phải gbest mới của vòng 1.

## 4. gbest qua 5 vòng

| iteration | 0 | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|---|
| f(gbest) | 8.2615 | 3.3357 | 0.1734 | 0.1734 | 0.1734 | 0.0195 |

Hình `figures/fig_swarm_sphere.png` vẽ vị trí 5 hạt trên đường đồng mức của Sphere tại vòng 0, 1, 3 và 5.

## 5. Kết quả thí nghiệm ω bàn giao cho TV3

Từ notebook phần 3, file `results_pso.csv` (3030 dòng) và `summary_pso.csv`. Best fitness cuối (vòng 100, 2020 lần đánh giá), 5 seed:

| function | config | ω | mean | std | best | worst |
|---|---|---|---|---|---|---|
| Sphere | A | 0.4 | 5.455e-31 | 7.353e-31 | 1.193e-32 | 1.794e-30 |
| Sphere | B | 0.7 | 1.795e-13 | 1.843e-13 | 4.595e-14 | 4.616e-13 |
| Sphere | C | 0.9 | 4.158e-05 | 5.612e-05 | 6.167e-06 | 1.377e-04 |
| Rastrigin | A | 0.4 | 1.990e-01 | 4.450e-01 | 0 | 9.950e-01 |
| Rastrigin | B | 0.7 | 2.077e-07 | 4.565e-07 | 5.684e-14 | 1.024e-06 |
| Rastrigin | C | 0.9 | 8.452e-03 | 8.004e-03 | 5.254e-04 | 1.956e-02 |

Một số điểm TV3 nên đọc kỹ trước khi viết Results:
- Với Rastrigin, cấu hình A (ω = 0.4) có seed 0 dừng ở 0.995, nghĩa là kẹt ở một cực tiểu địa phương cạnh gốc tọa độ; 4 seed còn lại về 0. Đây là một ví dụ có sẵn cho phần hội tụ sớm.
- Với Sphere, ω nhỏ hội tụ nhanh nhất; với Rastrigin, ω = 0.7 cho kết quả ổn định nhất trong 3 cấu hình.
- **Phụ thuộc v_max:** lần chạy ω = 0.4 bị kẹt chỉ xuất hiện khi v_max ≤ 5.12. Chạy lại với v_max = 10.24 (bằng độ rộng miền) hoặc không giới hạn thì cả 5 lần ω = 0.4 đều về 0, còn ω = 0.9 tệ hơn. Xem notebook phần 4 và `vmax_sensitivity.csv`.
- Rastrigin được tính bằng phép trừ hai số gần 20, nên giá trị nhỏ hơn khoảng 1e-13 (kể cả 0) chỉ có nghĩa là "đã tới cực tiểu toàn cục".
- Chỉ có 5 seed và 2 hàm 2 chiều, nên các nhận xét trên chỉ đúng trong thí nghiệm này.
