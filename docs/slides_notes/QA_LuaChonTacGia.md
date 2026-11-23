# Câu hỏi kiểu "Vì sao tác giả chọn…? Ưu, nhược?"

> Soạn từ bản PDF hai bài trong `references/`: Kennedy & Eberhart (1995), Poli, Kennedy & Blackwell (2007). Trang ghi theo số trang của bài (K&E: 1942–1948; Poli: Swarm Intelligence 1, 33–57, dùng số mục). Mỗi câu gồm:
> - **Tác giả làm gì, vì sao** (theo bài, có trích trang).
> - **Ưu / Nhược** (phần nhận xét của nhóm, không phải lời tác giả; khi trả lời nên nói "in our view").
> - **Say:** câu trả lời mẫu bằng tiếng Anh.
>
> Bổ sung cho `QA_ChuanBi.md`.

---

## Phần 1. Kennedy & Eberhart (1995)

**1. Vì sao tác giả xuất phát từ mô phỏng xã hội (đàn chim, con người) mà không từ lý thuyết tối ưu?**
- Tác giả: mục tiêu ban đầu là mô phỏng hành vi xã hội; giả thuyết nền là câu của Wilson: cá thể hưởng lợi từ phát hiện của cả đàn khi thức ăn phân bố khó đoán (tr. 1943). Thuật toán tối ưu là "phát hiện ra" trong quá trình mô phỏng; tác giả nói nó "stands without metaphorical support" (tr. 1942).
- Ưu: ý tưởng trực quan, rất ít phép toán, dễ cài (tác giả nhấn mạnh "a few lines of code", tr. 1942, 1948).
- Nhược: không có cơ sở toán học ban đầu; tham số chọn bằng thử nghiệm, nên về sau phải bổ sung phân tích (ω, χ, Poli Sect. 2.3–2.4, 5).
- Say: *They started from a social simulation because their hypothesis was that sharing discoveries helps a group search. In our view this made the method simple and intuitive, but it had no theory behind it, so parameters were set by trial and later work had to add damping and stability analysis.*

**2. Vì sao cho các "con chim" được chồng lên nhau (không tránh va chạm)?**
- Tác giả: họ muốn mô hình cả hành vi con người; hai người có thể giữ cùng quan điểm mà không "va chạm", nên chuyển động trong không gian trừu tượng nhiều chiều, không có va chạm (tr. 1943).
- Ưu: các hạt trở thành điểm trong không gian tìm kiếm; nhiều hạt có thể cùng hội tụ về một nghiệm tốt.
- Nhược: chính vì được trùng nhau nên cả đàn có thể co về một điểm và mất đa dạng (hội tụ sớm, như slide 12).
- Say: *They wanted to model human beliefs, which can coincide without colliding, so agents became collision-free points. That lets the whole swarm converge on one good solution, but it also lets it collapse onto one point and lose diversity, which is what we saw in our stuck-swarm run.*

**3. Vì sao bỏ "craziness" và "nearest-neighbour velocity matching"?**
- Tác giả: craziness chỉ thêm biến động nhân tạo cho trông "giống thật" (tr. 1944). Bỏ nó thì thuật toán chạy tốt như cũ; bỏ khớp vận tốc với hàng xóm thì tối ưu "slightly faster" (tr. 1945). Nguyên tắc: chỉ giữ những phần cần cho việc tối ưu.
- Ưu: thuật toán gọn, ít tham số, chạy nhanh hơn.
- Nhược: mất cơ chế tạo đa dạng ngẫu nhiên; về sau người ta lại phải thêm các biến thể "diversity control" để chống hội tụ sớm (Poli Sect. 4.5).
- Say: *Craziness only made the flock look realistic, and removing velocity matching made optimisation slightly faster, so both went. In our view the cost is that the swarm lost an explicit source of diversity, which later variants had to add back.*

**4. Vì sao dùng hai trí nhớ pbest và gbest, không chỉ một?**
- Tác giả: thử bỏ thì thấy "both necessary" (tr. 1945). pbest giống trí nhớ cá nhân ("simple nostalgia"), gbest giống chuẩn mực chung của nhóm. Lệch về pbest thì lang thang, lệch về gbest thì lao vội vào cực tiểu địa phương; gần bằng nhau là tốt nhất.
- Ưu: cân bằng tự nhiên giữa khám phá (pbest) và khai thác (gbest); đây chính là câu hỏi định hướng của đề.
- Nhược: cân bằng phụ thuộc tham số; tác giả chỉ kết luận "approximately equal" từ quan sát mô phỏng, không định lượng.
- Say: *They tested removing each memory and found both necessary: pbest keeps individual experience, gbest spreads the group's knowledge. The strength is a built-in balance between exploration and exploitation; the weakness is that the right balance was only found by observation, not derived.*

**5. Vì sao đổi từ phép so sánh "if" sang hiệu số (pbest − x)?**
- Tác giả: phép so sánh "crude", khó hiểu và "aesthetically displeasing"; kéo theo hiệu số dễ hiểu hơn và chạy tốt hơn (tr. 1945).
- Ưu: lực kéo tỉ lệ khoảng cách: xa kéo mạnh, gần kéo nhẹ, nên hạt tự tinh chỉnh khi tới gần mục tiêu.
- Nhược: khi các hạt dồn sát pbest và gbest thì lực kéo gần bằng 0, nên đàn dễ "đứng yên" (stagnation) nếu không có quán tính.
- Say: *The sign test pushed every particle by the same amount, near or far, which they found crude. Using the difference makes the pull grow with distance, so particles refine as they get close. The flip side is that the pull vanishes when everyone sits on the same point.*

**6. Vì sao bỏ p_increment, g_increment và dùng hằng số 2?**
- Tác giả: "no good way to guess" increment nào nên lớn hơn, nên bỏ cả hai; nhân 2 để rand() có trung bình 1, hạt "overfly" mục tiêu khoảng nửa số lần; bản này tốt hơn các bản trước (tr. 1946). Tác giả tự để ngỏ câu hỏi 2 có phải giá trị tối ưu không.
- Ưu: không còn tham số phải chỉnh; overshoot giúp khám phá vùng bên kia mục tiêu.
- Nhược: không có cơ chế hãm, tốc độ tăng không kiểm soát (Poli Sect. 2.2), nên vẫn cần v_max; sau này được thay bằng ω hoặc χ (c ≈ 1.5).
- Say: *There was no good way to tell which increment should be larger, so they removed both and used 2, which gives the random factor a mean of one and makes particles overshoot about half the time. The weakness, as Poli et al. later explain, is that with no damping velocities can grow without control.*

**7. Vì sao giữ vận tốc cũ (momentum)?**
- Tác giả: bản bỏ vận tốc cũ "quite ineffective at finding global optima" (tr. 1946). Ở phần kết luận, họ cho rằng momentum gây overshoot, tức khám phá vùng chưa biết (tr. 1948).
- Ưu: hạt mang đà vượt qua các điểm tốt đã biết, đi tới vùng mới.
- Nhược: trọng số 1 cho vận tốc cũ là quá lớn, gây bùng nổ vận tốc; chính vì vậy mới có ω < 1 năm 1998.
- Say: *Without the old velocity the method was "quite ineffective at finding global optima"; momentum is what carries particles past known points into new regions. But keeping it at full weight was too much, which is why the inertia weight was introduced later.*

**8. Tác giả còn thử những phiên bản nào mà bị loại? Vì sao?**
- Tác giả (tr. 1946):
  - Gộp hai lực thành một, kéo về điểm giữa pbest và gbest: đàn có xu hướng hội tụ về điểm giữa đó "whether it was an optimum or not". Kết luận: hai cú "kick" ngẫu nhiên riêng là cần thiết.
  - Hai loại hạt "explorers" (dùng phép so sánh, hay vượt xa) và "settlers" (dùng hiệu số, leo đồi): không tốt hơn bản đơn giản, nên bỏ ("Occam's razor slashed again").
- Ưu (của cách làm): thử nhiều biến thể rồi giữ bản đơn giản nhất chạy tốt.
- Nhược: chỉ báo cáo kết quả định tính, không có bảng số so sánh các biến thể.
- Say: *They tried a single pull towards the midpoint of pbest and gbest, which converged on that midpoint whether or not it was an optimum, and a split into explorers and settlers, which did not help. They kept the simplest version, though the comparison is reported only qualitatively.*

**9. Vì sao dùng gbest (cả đàn chung một best)?**
- Tác giả: cài đặt bằng cách lưu chỉ số của hạt tốt nhất vào biến gbest, mọi hạt đều biết (tr. 1944). Đơn giản, rẻ.
- Ưu: thông tin lan ngay tới cả đàn, hội tụ nhanh.
- Nhược: dễ bị cực tiểu địa phương hút; Poli (Sect. 3.1) cho biết lbest (vòng) chậm hơn nhưng "less vulnerable to the attraction of local optima", và không topology nào tốt nhất trên mọi hàm.
- Say: *gbest is the simplest structure: one index that everyone can read, so information spreads immediately and the swarm converges fast. The price is a higher risk of being pulled into a local optimum; the review says an lbest ring is slower but less vulnerable.*

**10. Vì sao tác giả kiểm thử bằng mạng XOR, Iris, EEG và hàm Schaffer f6?**
- Tác giả: một bài toán phi tuyến nhiều chiều (huấn luyện trọng số mạng nơ-ron, 13 tham số cho XOR), so với backprop; và một hàm thử chuẩn cho thuật toán di truyền, rất nhiều cực trị (tr. 1945, 1947).
- Kết quả: XOR đạt tiêu chí sau trung bình 30.7 vòng với 20 tác tử; Iris hiệu quả như backprop (284 epoch); EEG 92% so với 89%; f6 tìm được tối ưu toàn cục mọi lần.
- Ưu: bao phủ cả bài toán thực tế (mạng nơ-ron) lẫn hàm thử khó.
- Nhược: ít bài, ít lần chạy, không có thống kê; chính tác giả gọi kết quả EEG là "informal indications" (tr. 1947).
- Say: *They chose neural-network training as a real nonlinear problem and Schaffer f6 as a hard genetic-algorithm benchmark. The coverage is reasonable for a first paper, but the tests are few and without statistics; the authors themselves call the generalisation result informal.*

**11. Vì sao tác giả nói PSO thành công nhờ hạt hay "vượt quá mục tiêu"?**
- Tác giả: dẫn Holland về cân bằng giữa thử vùng đã biết và khám phá vùng chưa biết; yếu tố ngẫu nhiên giúp tìm kỹ giữa các vùng tốt, còn momentum gây overshoot, tức khám phá; họ cho rằng bản hiện tại "allocates trials nearly optimally" (tr. 1948).
- Ưu: giải thích trực quan vì sao cần cả ngẫu nhiên lẫn quán tính.
- Nhược: "nearly optimally" là nhận định, không được chứng minh trong bài.
- Say: *They link success to overshooting: random factors search between good regions, and momentum explores beyond them. It is a good intuition, but "nearly optimal" is a claim, not something the paper proves.*

---

## Phần 2. Poli, Kennedy & Blackwell (2007)

**12. Vì sao người ta đưa trọng số quán tính ω vào?**
- Bài: φ₁ = φ₂ = 2 khiến tốc độ tăng không kiểm soát; v_max được dùng để chặn, nhưng giá trị tốt phụ thuộc bài toán, không có quy tắc chung, và v_max "chopped off" dao động thay vì làm hạt hội tụ (Sect. 2.2). ω được đề xuất để kiểm soát phạm vi tìm kiếm và giảm, thậm chí bỏ, vai trò của v_max (Sect. 2.3). 1 − ω đóng vai trò ma sát.
- Ưu: một tham số duy nhất điều chỉnh khám phá/khai thác; có cách hiểu vật lý rõ ràng.
- Nhược: không đặt riêng được; giá trị ω ổn định phụ thuộc c₁, c₂ (chú thích 3, Sect. 5).
- Say: *Velocities exploded with coefficients of 2, and v_max was problem-specific and only clipped the oscillations. The inertia weight damps the velocity like friction, so one parameter controls exploration versus exploitation; its drawback is that a stable ω depends on the acceleration coefficients.*

**13. Vì sao nhiều người giảm ω từ 0.9 xuống 0.4 trong lúc chạy?**
- Bài: ω cao ứng với môi trường ít nhớt, khám phá rộng; giảm dần về thấp thì hệ tiêu tán hơn, khai thác và "homing into local optima" tốt hơn (Sect. 2.3). Ngoài ra có ω mờ (fuzzy), ω ngẫu nhiên U(0.5, 1), thậm chí ω tăng dần.
- Ưu: khám phá trước, tinh chỉnh sau, hợp với quá trình tìm kiếm tự nhiên.
- Nhược: thêm lịch trình phải chọn (bắt đầu, kết thúc, tốc độ giảm); phụ thuộc số vòng chạy. Nhóm dùng ω cố định nên không thử điều này.
- Say: *Starting high explores widely and ending low lets the swarm settle into a good region. The cost is another schedule to tune, tied to the run length; we used a constant ω, so we did not test this.*

**14. Vì sao hệ số co χ với φ = 4.1, cho χ ≈ 0.7298?**
- Bài: Clerc phân tích hệ lặp và đặt hệ số co để kiểm soát hội tụ, "preventing explosion, ensuring convergence", bỏ được v_max tùy ý; công thức χ = 2 / (φ − 2 + √(φ² − 4φ)), cần φ > 4; thường đặt φ = 4.1, φ₁ = φ₂ = 2.05 (Sect. 2.4).
- Ưu: chọn tham số có căn cứ lý thuyết thay vì thử mò; tương đương ω = 0.7298, c ≈ 1.496, chính là cơ sở cho thiết lập 0.7 / 1.5 của nhóm.
- Nhược: phân tích dựa trên mô hình đơn giản (thường một hạt, không ngẫu nhiên, Sect. 5); hội tụ không có nghĩa là hội tụ về cực tiểu toàn cục.
- Say: *Clerc's analysis gives a constriction factor that prevents explosion and ensures convergence without an arbitrary v_max; φ = 4.1 gives χ ≈ 0.7298, equivalent to ω ≈ 0.73 and c ≈ 1.5, which is where our default comes from. The analysis uses a simplified model, and convergence does not guarantee the global optimum.*

**15. Đã có χ sao vẫn khuyên đặt V_max = X_max?**
- Bài: hạt có χ hội tụ mà không cần v_max, nhưng các thí nghiệm sau đó (Eberhart & Shi 2000) cho thấy giới hạn v_max bằng miền giá trị mỗi biến là một "prudent rule of thumb"; kết quả là "canonical PSO" không có tham số riêng cho từng bài (Sect. 2.4).
- Ưu: lưới an toàn rẻ, không cần chỉnh theo bài toán.
- Nhược: thêm một chi tiết cài đặt; nếu đặt chặt hơn thì lại gặp vấn đề cũ. Nhóm thấy v_max ≤ 5.12 làm một lần chạy bị kẹt (slide dự phòng B3).
- Say: *Constricted particles converge without v_max, but later experiments found that also limiting v_max to the range of each variable was a prudent rule of thumb. It costs nothing to tune; our own runs showed that a tighter limit can hurt.*

**16. Vì sao số hạt thường 20–50?**
- Bài: chọn theo kinh nghiệm, dựa trên số chiều và độ khó cảm nhận; 20–50 là phổ biến (Sect. 2.2). Chú thích 4: có bằng chứng quần thể lớn tốt hơn cho bài nhiều chiều; topology dày tốt cho bài một cực trị, thưa tốt cho bài nhiều cực trị.
- Ưu: khoảng an toàn cho phần lớn bài toán.
- Nhược: không có quy tắc lý thuyết; Poli liệt kê việc chọn kích thước quần thể là câu hỏi mở (Sect. 7.5).
- Say: *Population size is set empirically, and 20 to 50 is common; we used 20. There is no theoretical rule, and the review lists this as an open question.*

**17. Vì sao có topology lbest, von Neumann, FIPS?**
- Bài: gbest hội tụ nhanh nhưng dễ bị hút vào cực tiểu địa phương; lbest cho phép các nhóm con hội tụ ở nhiều vùng, tìm kỹ hơn (Sect. 3.1). Von Neumann (mỗi hạt 4 hàng xóm) tỏ ra tốt trong nghiên cứu của Kennedy & Mendes. FIPS cho hạt chịu ảnh hưởng của mọi hàng xóm, tìm nghiệm trong ít vòng hơn nhưng phụ thuộc topology nhiều hơn (Sect. 2.5).
- Ưu: thêm cách kiểm soát tốc độ lan truyền thông tin, giảm hội tụ sớm.
- Nhược: không topology nào tốt nhất trên mọi hàm; khả năng tìm kiếm cục bộ và toàn cục không tương quan, nên chọn topology còn tùy thước đo (Sect. 3.1).
- Say: *gbest converges fast but is easily trapped, so ring and other neighbourhoods slow the spread of information and let subgroups search different regions. The review's lesson is that no topology wins on every function, and the best one depends on how performance is measured.*

**18. Vì sao bài tổng quan chỉ đếm số bài ứng dụng?**
- Bài: đếm hơn 1,100 bài trên IEEE Xplore, khoảng 700 là ứng dụng, chia 26 nhóm (Sect. 6); tự mô tả là "snapshot" theo góc nhìn của tác giả, không phải khảo sát đầy đủ.
- Ưu: cho thấy PSO được dùng rộng ở đâu.
- Nhược: số bài chỉ cho thấy mức phổ biến, không cho thấy PSO tốt hơn phương pháp khác ở lĩnh vực đó (nhận xét của nhóm, đã ghi trong báo cáo).
- Say: *The review counts application papers to show where PSO is used. In our view that measures popularity, not effectiveness, so it cannot tell whether PSO beats other methods in those fields.*

---

## Phần 3. Câu nối với lựa chọn của nhóm

**19. Nếu được làm lại, nhóm có chọn khác tác giả gốc không?**
- Ý chính: nhóm đã theo bản chuẩn 2007 (ω, c ≈ 1.5, V_max = X_max) thay vì bản 1995 (hệ số 2, không hãm). Điều nhóm muốn làm thêm: thử lbest bên cạnh gbest (vì gbest dễ bị kẹt, Poli 3.1), thử ω giảm dần, và đổi từng tham số một ở thí nghiệm hội tụ sớm.
- Say: *We already follow the 2007 standard form rather than the 1995 one, because the original had no damping. If we redid it, we would compare gbest with an lbest ring, try a decreasing ω, and vary one parameter at a time in the premature-convergence test.*

**20. Lựa chọn nào của tác giả gốc mà kết quả của nhóm ủng hộ rõ nhất?**
- Ý chính: (1) Cần cả hai trí nhớ và cân bằng: cấu hình lệch về gbest (c₂ = 2.5, c₁ = 0.5, cùng 5 hạt) bị kẹt cả 20 lần; kết quả này phù hợp với quan sát 1995 nhưng không tách riêng được c₂ (xem C10 trong `QA_ChuanBi.md`). (2) Giữ momentum: các ví dụ cho thấy hạt vượt qua mục tiêu (P1 từ 3 sang −1.15) và đàn vẫn tiến bộ. (3) v_max khó chọn: v_max chặt đổi thứ hạng ω.
- Say: *Three choices are consistent with our results: both memories with balanced pulls, since our gbest-heavy setting with only five particles got stuck in all 20 runs, although we did not isolate c₂; keeping momentum, since particles overshoot and the swarm still improves; and the difficulty of choosing v_max, since a tight limit changed our ranking of ω.*
