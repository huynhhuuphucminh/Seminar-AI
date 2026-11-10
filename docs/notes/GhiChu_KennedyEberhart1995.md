# Ghi chú bài báo 1995: Kennedy & Eberhart, _Particle Swarm Optimization_

**Nguồn:** Kennedy, J. & Eberhart, R. (1995). Particle Swarm Optimization. _Proceedings of ICNN '95_, tr. 1942–1948. https://doi.org/10.1109/ICNN.1995.488968

> **Trạng thái: BẢN NHÁP do AI soạn từ PDF, cần TV1 đối chiếu lại từng ý với bài gốc, bấm lại các con số và viết lại bằng lời của mình trước khi dùng trong báo cáo.** Số trang ghi theo số trang in trên bài (1942 đến 1948).

## 0. Bài báo nói gì trong 3 dòng

- Đề xuất một phương pháp tối ưu hàm phi tuyến liên tục, bắt nguồn từ mô phỏng hành vi xã hội (đàn chim, đàn cá).
- Mỗi "hạt" nhớ vị trí tốt nhất của chính nó (pbest), biết vị trí tốt nhất của cả đàn (gbest) và bị kéo về hai điểm này.
- Thử nghiệm: huấn luyện trọng số mạng nơ-ron (XOR, Iris, EEG) và hàm Schaffer f6, kết quả ngang backpropagation và GA cơ bản.

## Abstract và 1. Introduction (tr. 1942)

**1.1 Mục tiêu và cách tiếp cận**

- Giới thiệu phương pháp tối ưu hàm phi tuyến liên tục, được "khám phá" qua mô phỏng một mô hình xã hội đơn giản.
- Tác giả nhấn mạnh thuật toán đứng vững mà không cần phép ẩn dụ xã hội.
- Cấu trúc bài: tiền thân (mô phỏng xã hội) → vài paradigm → một cách cài đặt chi tiết → kết quả.

**1.2 Hai nguồn gốc**

- Sự sống nhân tạo (A-life), đặc biệt là đàn chim, đàn cá và lý thuyết bầy đàn.
- Tính toán tiến hóa, liên quan đến cả genetic algorithm (GA) và evolutionary programming.

**1.3 Ưu điểm tác giả tự nhận**

- Khái niệm rất đơn giản, cài đặt vài dòng code.
- Chỉ cần phép toán sơ cấp, tốn ít bộ nhớ và thời gian.
- Ứng dụng nêu trong bài: huấn luyện trọng số mạng nơ-ron và hàm Schaffer f6 (lấy từ Davis [1]).

## 2. Simulating Social Behavior (tr. 1942–1943)

**2.1 Các mô phỏng đàn chim đi trước**

- Reynolds [8] quan tâm đến vẻ đẹp "vũ đạo" của đàn chim. Heppner & Grenander [4] (Heppner là nhà động vật học) tìm quy luật giúp đàn chim đồng bộ.
- Cả hai cho rằng quy luật cục bộ (như tế bào tự động) tạo nên hành vi nhóm khó đoán, và đều dựa vào việc giữ khoảng cách giữa các cá thể.

**2.2 Lợi thế của chia sẻ thông tin**

- Trích E. O. Wilson [9] (tr. 209): mỗi cá thể trong đàn cá hưởng lợi từ khám phá và kinh nghiệm của cả đàn khi tìm thức ăn, nhất là khi nguồn thức ăn phân bố không dự đoán được.
- Tác giả coi đây là giả thuyết nền tảng của PSO.

**2.3 Từ chim sang người (tính trừu tượng)**

- Mục tiêu ban đầu còn là mô hình hóa hành vi xã hội của con người.
- Điểm khác biệt: con người điều chỉnh cả niềm tin, thái độ (không gian đa chiều trừu tượng), nên **không có va chạm**. Hai chim thì không thể ở cùng một vị trí.
- Vì vậy "thay đổi" được ánh xạ thành "chuyển động" trong không gian trừu tượng, phù hợp quan điểm Aristotle cổ điển coi thay đổi về chất và về lượng đều là các dạng chuyển động. Đây là lý do các hạt PSO được phép trùng nhau.
- Tác giả cũng nhận xét không gian vật lý chỉ là thành phần tầm thường của trải nghiệm tâm lý. Điều hướng trong không gian tâm lý-xã hội n chiều khó hơn nhiều.

## 3. Precursors: Etiology of PSO (tr. 1943–1946)

**3.1 Nearest Neighbor Velocity Matching và Craziness (tr. 1943)**

- Mô phỏng đầu tiên: các "agent" trên lưới hình xuyến, mỗi vòng lặp lấy vận tốc (X, Y) của láng giềng gần nhất. Nhờ vậy đàn đồng bộ.
- Vấn đề: cả đàn nhanh chóng bay cùng một hướng không đổi. Giải pháp: biến ngẫu nhiên "craziness" cộng thêm vào vận tốc.
- Tác giả nói rõ craziness là hoàn toàn nhân tạo, chỉ để trông giống thật.

**3.2 Cornfield Vector (tr. 1944)**

- Ý tưởng: Heppner có "chỗ đậu" (roost) mà chim biết trước. Ngoài đời chim tìm thấy thức ăn mà không biết trước. Có thể là nhờ tận dụng kiến thức của nhau.
- Hàm đánh giá: `Eval = √((presentx − 100)²) + √((presenty − 100)²)`, bằng 0 tại (100, 100). Hai căn bậc hai nằm **riêng cho x và y**, nên giá trị chính là `|presentx − 100| + |presenty − 100|` (khoảng cách Manhattan), **không phải** khoảng cách Euclid. _(Đã đối chiếu với PDF tr. 1944.)_
- Điểm (100, 100) chỉ là mục tiêu giả lập do tác giả đặt để kiểm thử. Agent không biết tọa độ này, chỉ nhận về giá trị Eval tại chỗ nó đứng.
- **pbest:** mỗi agent nhớ giá trị tốt nhất và vị trí XY đạt được. Nếu agent ở bên phải pbestx thì vx giảm `rand() * p_increment`, bên trái thì tăng. Tương tự cho vy.
- **gbest:** biến lưu chỉ số agent tốt nhất, mọi agent đều biết. Quy tắc cập nhật tương tự với `g_increment`.
- Kết quả quan sát:
  - Increment cao: cả đàn (15 đến 30 cá thể) bị "hút" vào cornfield chỉ trong vài vòng.
  - Increment thấp: đàn lượn quanh rồi "đáp" xuống mục tiêu, trông giống thật.

**3.3 Loại bỏ biến phụ (tr. 1945)**

- Bỏ craziness: thuật toán vẫn chạy tốt. Bỏ velocity matching: tối ưu còn nhanh hơn một chút. Từ đây "đàn" (flock) thành "bầy" (swarm).
- pbest và gbest, cùng các increment, đều **cần thiết**.
  - pbest giống "ký ức tự truyện" (mỗi cá thể nhớ kinh nghiệm của mình, dù chỉ nhớ một dữ kiện), gọi là "simple nostalgia": xu hướng quay lại nơi từng hài lòng nhất.
  - gbest giống "tri thức công khai" hay chuẩn mực nhóm.
- Ảnh hưởng của tỉ lệ hai increment:
  - p_increment cao hơn nhiều: cá thể lang thang quá mức.
  - g_increment cao hơn nhiều: cả đàn lao sớm vào cực tiểu địa phương (hội tụ sớm).
  - Hai giá trị xấp xỉ bằng nhau: tìm kiếm hiệu quả nhất.

**3.4 Tìm kiếm đa chiều (tr. 1945)**

- Mở rộng từ mảng 1 chiều (x, y) lên ma trận D × N (D chiều, N agent).
- Thí nghiệm đầu: huấn luyện mạng perceptron 3 lớp (2-3-1) giải bài XOR, tổng 13 tham số (có bias), tức bay trong không gian 13 chiều. Mỗi agent là một bộ 13 trọng số, còn Eval là sai số của mạng khi dùng bộ trọng số đó trên bảng đáp án XOR. Đếm tham số: 2·3 (vào → ẩn) + 3 (bias ẩn) + 3·1 (ẩn → ra) + 1 (bias ra) = 13.
- Tiêu chí dừng: "average sum-squared error per PE" (tổng bình phương sai số, lấy trung bình trên mỗi PE) nhỏ hơn e = 0.05. Đạt sau trung bình **30.7 vòng lặp với 20 agent**. Kiến trúc phức tạp hơn lâu hơn nhưng vẫn tốt.
- PSO ở đây không dùng đạo hàm: chỉ cần chạy mạng truyền thẳng để lấy sai số. Đây không phải gradient descent.

**3.5 Gia tốc theo khoảng cách (tr. 1945–1946)**

- Cách cũ (chỉ xét dấu bất đẳng thức) bị tác giả đánh giá là thiếu thẩm mỹ và khó hiểu.
- Cách mới: điều chỉnh vận tốc theo **hiệu số** theo từng chiều, ví dụ `vx += rand() * p_increment * (pbestx − presentx)`. Dễ hiểu hơn và hiệu quả hơn.
- Đây là dạng đầu tiên giống phương trình PSO hiện đại: vận tốc cộng thêm một lực kéo tỉ lệ với khoảng cách. Cách cũ cộng trừ một lượng như nhau dù agent ở xa hay gần pbest, cách mới kéo mạnh khi xa, nhẹ khi gần, bằng 0 khi đúng pbest. _(Hình dung như lò xo là diễn giải của nhóm, không phải của bài.)_
- Ký hiệu `vx[][]`, `presentx[][]`: hai cặp ngoặc vì giờ là ma trận agent × chiều (tác giả chú thích ngay dưới công thức). `increment` và `bestx` cũng có thể mang tiền tố `g` thay cho `p`.
- **Thứ tự chỉ số chưa nhất quán trong bài:** chú thích ở 3.5 nói "agents by dimensions", nhưng 3.4 nói D × N và công thức 3.6 viết `pbestx[][gbest]` (gbest là chỉ số agent, đứng ngoặc sau). Nên đọc là `[chiều][agent]`. Chỗ này là suy ra từ công thức, cần TV1 xác nhận lại.

**3.6 Phiên bản đơn giản hiện tại (tr. 1946)**

- Bỏ luôn p_increment và g_increment vì không có cách tốt để đoán cái nào nên lớn hơn.
- Nhân hệ số ngẫu nhiên với **2** để kỳ vọng bằng 1, nhờ vậy agent "vượt qua" mục tiêu khoảng một nửa số lần.
- Công thức (viết lại theo bài): `v = v + 2·rand()·(pbest − x) + 2·rand()·(gbest − x)`.
  - Trong bài viết đầy đủ: `vx[][] = vx[][] + 2*rand()*(pbestx[][] − presentx[][]) + 2*rand()*(pbestx[][gbest] − presentx[][])`. Số hạng đầu kéo về pbest của chính agent, số hạng sau kéo về pbest của agent tốt nhất (`gbest` là chỉ số agent). Số hạng `vx[][]` ở đầu là phần quán tính.
  - `rand()` là số ngẫu nhiên trong [0, 1), được gọi riêng cho từng số hạng. Nhân 2 để kỳ vọng bằng 1.
- Tác giả nói còn phải nghiên cứu xem giá trị 2 có tối ưu hay nên tiến hóa theo từng bài toán.
- **Lưu ý khi so với PSO hiện đại:** chưa có trọng số quán tính ω và chưa có giới hạn Vmax, hệ số cố định bằng 2. Bài chỉ nêu công thức cập nhật vận tốc, và việc cộng vận tốc vào vị trí được hiểu ngầm.

**3.7 Các thử nghiệm khác (tr. 1946)**

- Thay hai số hạng bằng một điểm giữa pbest và gbest: dễ hội tụ vào điểm đó dù nó có phải cực trị hay không. Kết luận: hai "cú đẩy" ngẫu nhiên là cần thiết.
- Hai loại agent "explorer" (dùng bất đẳng thức) và "settler" (dùng hiệu số): không cải thiện. Tác giả nhắc "Occam's razor".
- **Bỏ momentum của vx** (bỏ số hạng v cũ): đơn giản hơn nhưng khá kém trong việc tìm cực trị toàn cục. Đây là bằng chứng cho vai trò của quán tính.

## 4. Swarms and Particles (tr. 1946–1947)

**4.1 Vì sao gọi là "swarm"**

- Dùng theo Millonas [6], người nêu 5 nguyên lý của trí tuệ bầy đàn:
  1. Proximity: tính toán đơn giản về không gian và thời gian.
  2. Quality: đáp ứng các yếu tố chất lượng của môi trường.
  3. Diverse response: không dồn hoạt động vào các kênh quá hẹp.
  4. Stability: không đổi chế độ hành vi mỗi khi môi trường đổi.
  5. Adaptability: đổi hành vi khi đáng với chi phí tính toán.
     Nguyên lý 4 và 5 là hai mặt của một vấn đề.

**4.2 PSO đáp ứng 5 nguyên lý (theo lập luận của tác giả)**

- Tính toán n chiều theo bước thời gian; quần thể phản ứng với chất lượng qua pbest và gbest.
- Phân chia phản ứng giữa pbest và gbest tạo ra sự đa dạng.
- Chỉ đổi trạng thái khi gbest đổi (ổn định) và có đổi khi gbest đổi (thích nghi).

**4.3 Vì sao gọi là "particle"**

- Là cách dung hòa: có thể coi là "điểm" không khối lượng, nhưng vận tốc và gia tốc phù hợp hơn với "hạt" có khối lượng và thể tích nhỏ tùy ý.
- Còn tham chiếu Reeves [7] về hệ hạt (particle systems) mô hình hóa mây, lửa, khói.

## 5. Tests and Early Applications (tr. 1947)

**5.1 Huấn luyện mạng nơ-ron**

- PSO huấn luyện trọng số hiệu quả **ngang backpropagation** (bài XOR, mục 3.4).
- Phân loại tập Fisher Iris [3]: ngang backpropagation, trung bình **284 epoch** qua 10 lần huấn luyện.

**5.2 Khả năng khái quát hóa (chỉ là dấu hiệu ban đầu)**

- Trên tập tín hiệu EEG (spike so với dương tính giả): backprop đạt 89% đúng trên tập test, PSO đạt **92%**.
- Tác giả gọi đây là "intriguing informal indications", tức bằng chứng chưa chính thức. Không nên diễn giải là PSO luôn khái quát tốt hơn gradient descent.

**5.3 Hàm Schaffer f6**

- Hàm rất phi tuyến, nhiều cực trị địa phương, bề mặt gián đoạn.
- PSO tìm ra cực trị toàn cục ở **mọi lần chạy** và có số lần đánh giá xấp xỉ GA cơ bản trong Davis [1], chương 2.

## 6. Conclusions (tr. 1947–1948)

**6.1 Định vị thuật toán**

- Cực kỳ đơn giản, có vẻ hiệu quả với nhiều hàm.
- Là A-life "tầm trung", nằm giữa tìm kiếm tiến hóa (bài viết là "eons", thang thời gian địa chất cực dài) và xử lý nơ-ron (cỡ mili giây): tối ưu xã hội diễn ra trong thang thời gian trải nghiệm thông thường.

**6.2 Quan hệ với tính toán tiến hóa**

- Nằm giữa GA và evolutionary programming. Phụ thuộc mạnh vào quá trình ngẫu nhiên (giống evolutionary programming).
- Việc kéo về pbest/gbest tương tự phép lai (crossover) của GA. Dùng khái niệm độ thích nghi (fitness).

**6.3 Điểm riêng của PSO**

- "Bay" các lời giải tiềm năng qua siêu không gian và tăng tốc về phía lời giải tốt hơn. Các phương pháp tiến hóa khác thao tác trực tiếp trên lời giải.
- Thành công phần lớn nhờ việc hạt **"lao quá mục tiêu"** (overshoot). Tác giả liên hệ với "optimum allocation of trials" của Holland [5]: cân bằng giữa thử nghiệm bảo thủ vùng đã biết và khám phá mạo hiểm vùng chưa biết.
  - Các yếu tố ngẫu nhiên giúp tìm kỹ vùng giữa các khu vực tốt.
  - Quán tính (cộng vào vận tốc hiện có thay vì thay thế) gây vượt quá và khám phá vùng lạ.
- Tác giả nhận xét phiên bản hiện tại "có vẻ" (it appears) phân bổ các lần thử gần như tối ưu. Đây là nhận định, bài không chứng minh.
- Chỗ này liên quan trực tiếp đến câu hỏi dẫn dắt của đề S01 (khám phá và khai thác).

**6.4 Hạn chế và hướng tiếp theo (do tác giả tự nêu)**

- Cần nhiều nghiên cứu hơn. Mục tiêu thiết kế là đơn giản và bền vững (robust), chỉ cần mô tả bài toán và vài tham số.
- Các câu hỏi mở từ mục 3.6: giá trị hằng số 2 có tối ưu không, có nên tiến hóa theo bài toán không.

**6.5 Triết lý và lời kết của tác giả**

- Hai tác giả là một nhà tâm lý học xã hội và một kỹ sư điện. Họ lập luận hành vi xã hội phổ biến trong giới động vật vì nó tối ưu hóa, nên mô hình hóa hành vi xã hội là một cách giải bài toán tối ưu kỹ thuật.
- Triết lý: cho trí tuệ _xuất hiện_ thay vì áp đặt, mô phỏng tự nhiên thay vì kiểm soát, làm mọi thứ đơn giản hơn thay vì phức tạp hơn.

## Điểm cần nhớ cho báo cáo

| Chủ đề            | Ý chính trong bài                                                                                           | Dùng cho                            |
| ----------------- | ----------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| Động lực          | Chia sẻ thông tin trong bầy có lợi thế tiến hóa (Wilson)                                                    | Introduction                        |
| Khái niệm         | pbest (nhớ cá nhân), gbest (chuẩn nhóm), cả hai đều cần thiết                                               | Background                          |
| Công thức         | `v = v + 2·rand()·(pbest − x) + 2·rand()·(gbest − x)`, chưa có ω                                            | Method, `CongThuc_SoSanh.md`        |
| Cân bằng p và g   | g cao: hội tụ sớm; p cao: lang thang; xấp xỉ bằng nhau: tốt nhất                                            | Results and Discussion (hội tụ sớm) |
| Vai trò quán tính | Bỏ số hạng v cũ làm tìm cực trị toàn cục kém                                                                | Discussion                          |
| Bằng chứng        | XOR 30.7 vòng / 20 agent; Iris 284 epoch; EEG 92% so với 89%; Schaffer f6 tìm được cực trị toàn cục mọi lần | Paper Review                        |
| Giới hạn          | Thử nghiệm nhỏ, nhiều so sánh chỉ mang tính chất sơ bộ, chưa có phân tích tham số                           | Critical analysis                   |

## Thuật ngữ Anh – Việt dùng trong ghi chú

| Anh                           | Việt                                                                  |
| ----------------------------- | --------------------------------------------------------------------- |
| swarm / flock                 | bầy / đàn                                                             |
| particle                      | hạt                                                                   |
| pbest / gbest                 | vị trí tốt nhất của cá thể / của cả bầy                               |
| fitness                       | độ thích nghi (điểm số của một lời giải; ở bài này càng nhỏ càng tốt) |
| overshoot / overfly           | vọt quá mục tiêu                                                      |
| momentum                      | quán tính (động lượng)                                                |
| local minima / global optimum | cực tiểu cục bộ / cực trị toàn cục                                    |
| epoch                         | một lượt huấn luyện qua toàn bộ dữ liệu                               |
| generalize                    | khái quát hóa (làm tốt trên dữ liệu chưa thấy)                        |
| craziness                     | "tính điên rồ", biến ngẫu nhiên thêm vào vận tốc ở mục 3.1            |

## Việc cần làm trước khi commit

- [ ] Đối chiếu từng ý ở trên với PDF (nhất là công thức hàm Eval ở mục 3.2). _(Claude đã đối chiếu Eval 3.2, 3.4 đến 3.7 và mục 6 với PDF tr. 1944 đến 1947 khi chỉnh sửa. TV1 vẫn cần tự đối chiếu lại.)_
- [ ] Kiểm tra lại số tham số của mạng 2-3-1: 2·3 (đầu vào → ẩn) + 3 (bias lớp ẩn) + 3·1 (ẩn → đầu ra) + 1 (bias đầu ra) = 13. Đối chiếu thêm các số 30.7 vòng và 284 epoch với PDF.
- [ ] Viết lại bằng lời của mình, tách rõ phần bài báo nói và phần nhóm tự làm.
- [ ] Ghi một dòng vào `NhatKyAI/TV1.md` (mã prompt 1.1).
