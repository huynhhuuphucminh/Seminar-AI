# Ví dụ tính tay: một bước cập nhật PSO trong 1 chiều

> **Trạng thái: BẢN NHÁP do AI (Claude) soạn theo prompt 1.5.** Kết quả đã khớp với dòng "Đáp án đối chiếu" trong bảng thông số chung và với ô kiểm tra trong `02_TV2_MoPhong/PSO_Seminar.ipynb` (mục 2a). TV1 cần tự bấm máy lại ít nhất hạt 1.

## Đề bài

- Hàm mục tiêu: f(x) = x², cần tìm **cực tiểu** (cực tiểu toàn cục f = 0 tại x = 0).
- Tham số: ω = 0.7, c₁ = c₂ = 1.5. Ví dụ này không dùng giới hạn vận tốc.
- Vòng 0: hạt 1 có x = 3, v = 0.5; hạt 2 có x = −2, v = −0.5. pbest của mỗi hạt là vị trí hiện tại của nó.
- Số ngẫu nhiên cố định: hạt 1 dùng r₁ = 0.4, r₂ = 0.6; hạt 2 dùng r₁ = 0.8, r₂ = 0.3.
- Công thức: v(t+1) = ω·v(t) + c₁r₁(pbest − x(t)) + c₂r₂(gbest − x(t)); x(t+1) = x(t) + v(t+1).

## Bước 1: đánh giá vòng 0 và chọn gbest

- f(3) = 9, f(−2) = 4.
- Hạt 2 có f nhỏ hơn, nên **gbest = −2**.

## Bước 2: vận tốc và vị trí mới

**Hạt 1** (x = 3, v = 0.5, pbest = 3):
- Quán tính: ω·v = 0.7 × 0.5 = **0.35**
- Nhận thức: c₁r₁(pbest − x) = 1.5 × 0.4 × (3 − 3) = **0**
- Xã hội: c₂r₂(gbest − x) = 1.5 × 0.6 × (−2 − 3) = 0.9 × (−5) = **−4.5**
- v(1) = 0.35 + 0 − 4.5 = **−4.15**
- x(1) = 3 + (−4.15) = **−1.15**

**Hạt 2** (x = −2, v = −0.5, pbest = −2):
- Quán tính: 0.7 × (−0.5) = **−0.35**
- Nhận thức: 1.5 × 0.8 × (−2 − (−2)) = **0**
- Xã hội: 1.5 × 0.3 × (−2 − (−2)) = **0**
- v(1) = **−0.35**
- x(1) = −2 + (−0.35) = **−2.35**

## Bước 3: đánh giá và cập nhật pbest, gbest

- Hạt 1: f(−1.15) = 1.3225 < 9, nên pbest₁ = −1.15.
- Hạt 2: f(−2.35) = 5.5225 > 4, nên pbest₂ giữ nguyên = −2.
- gbest mới = pbest tốt nhất = **−1.15** (f = 1.3225).

## Bước 4: bảng trạng thái (dùng trong báo cáo)

| Iteration | Particle | x | v | f(x) | pbest | gbest |
|---|---|---|---|---|---|---|
| 0 | 1 | 3 | 0.5 | 9 | 3 | −2 |
| 0 | 2 | −2 | −0.5 | 4 | −2 | −2 |
| 1 | 1 | −1.15 | −4.15 | 1.3225 | −1.15 | −1.15 |
| 1 | 2 | −2.35 | −0.35 | 5.5225 | −2 | −1.15 |

## Bước 5: giải thích bằng lời

- **Vì sao thành phần nhận thức bằng 0 ở vòng 0?** Lúc khởi tạo, mỗi hạt chưa có kinh nghiệm nào ngoài vị trí hiện tại, nên pbest = x và hiệu (pbest − x) = 0. Thành phần này chỉ bắt đầu có tác dụng từ vòng 1, khi hạt đã đi khỏi chỗ tốt nhất của nó.
- **Vì sao hạt 1 bị kéo mạnh về phía hạt 2?** Hạt 1 cách gbest 5 đơn vị, và lực kéo xã hội tỉ lệ với khoảng cách: 0.9 × 5 = 4.5, lớn hơn nhiều so với quán tính 0.35. Hạt 1 vượt qua cực tiểu x = 0 và dừng ở −1.15. Đây đúng là hiện tượng "vọt quá mục tiêu" (overshoot) mà Kennedy & Eberhart (1995, tr. 1947) cho là một lý do PSO khám phá tốt.
- **Vì sao hạt 2 lại tệ đi?** Hạt 2 đang là gbest nên không bị kéo về đâu cả, chỉ trôi theo quán tính và đi xa cực tiểu hơn (f tăng từ 4 lên 5.5225). Nhưng cả bầy vẫn tiến bộ vì gbest giảm từ 4 xuống 1.3225: một bước có thể làm một hạt tệ đi trong khi cả bầy tốt lên.

## English summary for the report

At iteration 0, particle 2 holds the best position, so gbest = −2. For particle 1, the inertia term is 0.7 × 0.5 = 0.35, the cognitive term is zero because pbest equals the current position, and the social term is 1.5 × 0.6 × (−2 − 3) = −4.5. Its new velocity is −4.15 and it moves to x = −1.15, overshooting the optimum but improving its fitness from 9 to 1.3225. Particle 2 is itself the global best, so only inertia acts on it: v = −0.35 and x = −2.35, which worsens its fitness from 4 to 5.5225. After the step, gbest becomes −1.15. The example shows that the cognitive term is inactive at the first step and that one particle can get worse while the swarm's best solution improves.
