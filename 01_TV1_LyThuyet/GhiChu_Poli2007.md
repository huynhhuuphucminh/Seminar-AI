# Ghi chú bài báo 2007: Poli, Kennedy & Blackwell, _Particle swarm optimization: An overview_

**Nguồn:** Poli, R., Kennedy, J. & Blackwell, T. (2007). Particle swarm optimization: An overview. _Swarm Intelligence_, 1, 33–57. https://doi.org/10.1007/s11721-007-0002-0

> **Trạng thái: BẢN NHÁP do AI (Claude) soạn từ PDF trong `00_TaiLieu/`.** Mỗi ý đã đối chiếu với văn bản trích từ PDF. Số trang ghi theo số trang của tạp chí (trang 1 của PDF là tr. 33). TV1 cần đọc lại các mục được đánh dấu ★ vì đó là chỗ dễ bị hỏi.

## 0. Bài báo nói gì trong 3 dòng

- Đây là bài **tổng quan** (overview) của chính tác giả gốc Kennedy cùng hai cộng sự, chụp lại tình hình nghiên cứu PSO tới năm 2007, không đề xuất thuật toán mới.
- Nội dung chính: các phương trình cập nhật (gốc, có ω, có hệ số co χ, FIPS), vai trò của tham số, cấu trúc lân cận (topology), các biến thể, lý thuyết, ứng dụng và câu hỏi còn mở.
- Thông điệp: PSO đơn giản nhưng hành vi phụ thuộc mạnh vào tham số và topology; nhiều câu hỏi lý thuyết vẫn chưa có lời giải.

## 1. Thuật toán gốc (Mục 2.1, tr. 34–35) ★

- Mỗi hạt có 3 vectơ D chiều: vị trí hiện tại **x_i**, vị trí tốt nhất từng đạt **p_i** (pbest), vận tốc **v_i**. Bài gọi v_i là "có thể xem như cỡ bước" (step size).
- Một hạt đơn lẻ gần như không giải được gì; tiến bộ chỉ xuất hiện khi các hạt **tương tác** qua một mạng xã hội (topology).
- **Algorithm 1 (Original PSO)**, phương trình (1):
  - `v_i ← v_i + U(0, φ1) ⊗ (p_i − x_i) + U(0, φ2) ⊗ (p_g − x_i)`
  - `x_i ← x_i + v_i` (dùng vận tốc **vừa cập nhật**: đây là cơ sở cho lựa chọn x(t+1) = x(t) + v(t+1) của nhóm)
  - U(0, φ) là vectơ số ngẫu nhiên đều trong [0, φ], sinh mới mỗi vòng và cho từng hạt; ⊗ là nhân từng thành phần.
  - Trong bản gốc, mỗi thành phần vận tốc bị giới hạn trong [−Vmax, +Vmax].
- Ghi chú 2 (tr. 34): PSO thường **cực tiểu hóa**, và bài dùng "objective function" và "fitness function" như nhau.

## 2. Tham số (Mục 2.2, tr. 35–36) ★

- **Cỡ quần thể:** thường chọn theo kinh nghiệm; giá trị **20–50** là phổ biến. (Nhóm dùng 20 hạt, nằm trong khoảng này.)
- **φ1, φ2 (hệ số gia tốc):** quyết định độ lớn lực kéo về pbest và về p_g. Có thể hình dung như **lò xo có độ cứng ngẫu nhiên**, độ cứng trung bình φ1/2 và φ2/2. Hành vi PSO thay đổi rất mạnh theo φ1, φ2.
- Giá trị φ1 = φ2 = 2.0 dùng phổ biến thời đầu làm tốc độ hạt **tăng không kiểm soát**, nên phải dùng Vmax.
- **Vmax:** ảnh hưởng tới cân bằng khám phá và khai thác, nhưng giá trị tốt phụ thuộc bài toán và không có quy tắc chung; khi dùng Vmax, quỹ đạo hạt **không hội tụ** mà bị "cắt" dao động.

## 3. Trọng số quán tính ω (Mục 2.3, tr. 36–37) ★

- Đề xuất bởi Shi & Eberhart (1998b), phương trình (2): `v_i ← ω v_i + U(0, φ1) ⊗ (p_i − x_i) + U(0, φ2) ⊗ (p_g − x_i)`, rồi `x_i ← x_i + v_i`. Đây là dạng nhóm dùng.
- Diễn giải vật lý: **1 − ω đóng vai trò hệ số ma sát**; ω là "độ loãng" của môi trường.
  - ω cao (ví dụ 0.9): ít ma sát, hạt **khám phá** rộng.
  - ω thấp (ví dụ 0.4): nhiều tiêu tán, hạt **khai thác**, dễ "chui vào" cực trị địa phương.
  - Nhiều nghiên cứu thấy tốt nhất là **giảm dần ω từ khoảng 0.9 xuống khoảng 0.4** trong quá trình chạy.
- Các cách khác: điều chỉnh ω bằng hệ mờ (Eberhart & Shi 2000), ω ngẫu nhiên ω = U(0.5, 1) (Eberhart & Shi 2001), thậm chí ω tăng dần (Zheng et al. 2003).
- Có ω và hệ số phù hợp thì có thể bỏ Vmax hoặc đặt Vmax rất lớn (bằng cả miền giá trị của biến).
- **Liên hệ với nhóm:** ba cấu hình A (0.4), B (0.7), C (0.9) của TV2 nằm đúng trong khoảng bài nhắc tới; kết quả của nhóm (ω nhỏ hội tụ nhanh trên Sphere nhưng có lần kẹt trên Rastrigin) khớp với diễn giải "ω thấp thì khai thác".

## 4. Hệ số co χ (constriction, Mục 2.4, tr. 37–38) ★

- Phân tích của Clerc cho thấy vì sao cần "hãm" hạt; đề xuất hệ số co χ, phương trình (3)–(4): `v_i ← χ (v_i + U(0, φ1) ⊗ (p_i − x_i) + U(0, φ2) ⊗ (p_g − x_i))` với φ = φ1 + φ2 > 4 và χ = 2 / (φ − 2 + √(φ² − 4φ)).
- Thường đặt φ = 4.1, φ1 = φ2 = 2.05, cho **χ ≈ 0.7298**, mỗi số hạng (p − x) nhân với số ngẫu nhiên tối đa **0.7298 × 2.05 ≈ 1.49618**.
- PSO có co hội tụ mà **không cần Vmax**; quy tắc thực hành sau đó là đặt Vmax = Xmax (miền giá trị mỗi biến). Bài gọi đây là "canonical particle swarm algorithm of today".
- PSO có χ **tương đương đại số** với PSO có ω: tham số của Clerc ứng với **ω = 0.7298, c₁ = c₂ = 1.49618**.
- **Liên hệ với nhóm:** bộ mặc định ω = 0.7, c₁ = c₂ = 1.5 rất gần bộ tham số chuẩn này. Đây là lý do hợp lý để giải thích khi bị hỏi "vì sao chọn 0.7 và 1.5".
- Chú thích 4 (tr. 37): có bằng chứng quần thể lớn tốt hơn cho bài toán nhiều chiều, topology liên kết dày tốt cho bài **đơn cực trị**, topology thưa tốt cho bài **đa cực trị**.

## 5. FIPS (Mục 2.5, tr. 38)

- Fully informed particle swarm (Mendes): hạt chịu ảnh hưởng của **tất cả** láng giềng thay vì chỉ láng giềng tốt nhất, phương trình (5).
- Với tham số tốt, FIPS tìm lời giải tốt hơn trong ít vòng hơn, nhưng phụ thuộc topology nhiều hơn.

## 6. Topology (Mục 3, tr. 38–40) ★

- Topology ban đầu dựa trên khoảng cách trong không gian tìm kiếm (giống đàn chim), nhưng tốn tính toán và hội tụ không tốt nên bị bỏ.
- **gbest:** mọi hạt bị ảnh hưởng bởi hạt tốt nhất của cả quần thể (đồ thị liên kết đầy đủ). Đây là topology nhóm dùng.
- **lbest:** vòng tròn, mỗi hạt nối với K = 2 hạt kề. Cho phép tìm kiếm song song ở nhiều vùng; **hội tụ chậm hơn gbest nhưng ít bị cực trị địa phương hút hơn**.
- Kennedy (1999) thử nhiều cấu trúc: khác biệt hiệu năng phụ thuộc hàm thử, **không có topology nào tốt nhất cho mọi bài**.
- Kennedy & Mendes (2002): topology **von Neumann** (lưới, K = 4) tương đối vượt trội.
- Mendes (2004): khả năng tìm kiếm cục bộ (giá trị tốt nhất đạt được) và khả năng tìm kiếm toàn cục (tỉ lệ lần chạy đạt ngưỡng) **không tương quan** với nhau.
- Mục 3.2: topology động (thay đổi trong lúc chạy) cũng đã được nghiên cứu.

## 7. Biến thể (Mục 4, tr. 41–46)

- 4.1 PSO nhị phân; 4.2 bài toán động (mục tiêu thay đổi theo thời gian); 4.3 hàm có nhiễu; 4.4 lai ghép và PSO tự thích nghi.
- **4.5 PSO kiểm soát đa dạng (tr. 45) ★:** nhiều tác giả ghi nhận **xu hướng bầy hội tụ sớm vào cực trị địa phương** khi đa dạng giảm. Các cách xử lý: self-organized criticality (Løvbjerg 2002), tránh va chạm (Blackwell & Bentley 2002), hạt có bán kính và bật ra khi va chạm (Krink et al. 2002), thêm "negative entropy" (Xie et al. 2002). Phần này liên quan trực tiếp tới phân tích kẹt cực trị của TV3.
- 4.6 Bare-bones PSO (Kennedy 2003): bỏ vận tốc, lấy mẫu vị trí theo phân phối Gauss quanh (p_i + p_g)/2 với độ lệch |p_i − p_g|; bản dùng phân phối Lévy (đuôi dày) tái hiện tốt PSO chuẩn. Bài nêu giả thuyết: **đuôi dày giúp hạt thoát khỏi vị trí chưa tối ưu**.

## 8. Lý thuyết (Mục 5, tr. 46–50)

- Phân tích mô hình tất định, mô hình hóa yếu tố ngẫu nhiên và mô hình chạy được. Các thông số ω, χ, φ1, φ2 **không thể chọn độc lập** với nhau (chú thích 3, tr. 37).

## 9. Ứng dụng (Mục 6, tr. 50–51) ★

- Dựa trên phân tích hơn 1100 công bố trong IEEE Xplore; khoảng 700 bài là ứng dụng, chia 26 nhóm.
- PSO đặc biệt hứa hẹn với **bài toán đa cực trị** và bài không có phương pháp chuyên biệt tốt.
- Một số nhóm lớn (số bài, tỉ lệ trên các bài ứng dụng): phân tích ảnh và video (51, 7.6%); thiết kế lưới điện và **phân bổ tải** (load dispatching) (48, 7.1%); điều khiển (47, 7.0%); thiết kế anten (39, 5.8%); **lập lịch** (scheduling) (38, 5.6%); **mạng nơ-ron** (26, 3.8%).
- **Liên hệ với nhóm:** hai ứng dụng mà đề gợi ý (tối ưu siêu tham số, lập lịch) đều có trong danh mục này, nên có thể trích dẫn trực tiếp từ bài thay vì dùng nguồn ngoài.

## 10. Câu hỏi còn mở (Mục 7, tr. 51–53)

- 7.1: tranh cãi về **thiên lệch tìm về gốc tọa độ** (origin-seeking bias): bài toán có cực trị gần gốc có thể dễ hơn. ★ Điều này liên quan tới nhóm vì cả Sphere và Rastrigin đều có cực tiểu tại (0, 0); nên nêu trong phần hạn chế.
- 7.1: PSO có thể **hội tụ sớm** và chậm lại khi tới gần cực trị.
- 7.2: xử lý hạt ra ngoài miền (bỏ không đánh giá, kéo về biên, khởi tạo lại) **chưa có cách tốt nhất được thống nhất**. Nhóm chọn kéo về biên.
- 7.2: chưa biết tính ngẫu nhiên có thật sự cần thiết không.
- 7.4: mục tiêu lâu dài là bộ tối ưu tự thích nghi, không cần chỉnh tham số.
- 7.5: chưa có cách chọn cỡ quần thể, độ dài lần chạy, cách khởi tạo, topology một cách có cơ sở.

## So sánh với bài gốc 1995

| Chủ đề | Kennedy & Eberhart (1995) | Poli et al. (2007) |
|---|---|---|
| Phương trình | `v = v + 2·rand()·(pbest − x) + 2·rand()·(gbest − x)` | Dạng tổng quát với φ1, φ2; thêm ω (pt. 2) và χ (pt. 3) |
| Hệ số gia tốc | Cố định bằng 2, tác giả nói cần nghiên cứu thêm | φ1 = φ2 = 2 gây bùng nổ vận tốc; bộ chuẩn tương đương ω = 0.7298, c = 1.49618 |
| Kiểm soát vận tốc | Không nói rõ | Vmax ở bản gốc; ω và χ thay thế vai trò hãm |
| Lân cận | gbest (cả đàn) | gbest, lbest, von Neumann, FIPS, topology động |
| Bằng chứng | Vài thí nghiệm nhỏ (XOR, Iris, EEG, Schaffer f6) | Tổng hợp hơn 1100 công bố |
| Hội tụ sớm | g_increment quá lớn làm đàn lao sớm vào cực tiểu địa phương | Ghi nhận rộng rãi, có cả nhóm biến thể kiểm soát đa dạng (4.5) |

## Việc cần làm trước khi dùng

- [ ] TV1 đọc lại các mục ★ trong PDF.
- [ ] Ghi dòng mã prompt 1.2 vào `NhatKyAI/TV1.md` (đã có dòng do Claude ghi, TV1 xác nhận lại).
