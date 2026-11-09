# Tự chấm báo cáo theo rubric (prompt 4.3)

> Bản nháp do AI (Claude) chấm thử bản `BaoCao_Seminar_PSO.pdf` (7 trang, khoảng 3600 từ) theo rubric 100 điểm của đề S01. Chỉ để tham khảo; cả nhóm đọc và quyết định.

## Ba đầu ra tối thiểu

| Đầu ra | Có trong báo cáo | Vị trí |
|---|---|---|
| Trạng thái các hạt ở vòng 0 và vòng 1 | Có | Bảng 3.3 (5 hạt, Sphere) và Bảng 3.2 (ví dụ 1 chiều) |
| Biểu đồ fitness theo số vòng lặp hoặc số lần đánh giá | Có | Hình 4.1; hình theo ω nằm trong notebook của TV2 |
| Phân tích trường hợp kẹt cực trị địa phương | Có | Mục 4.3, Hình 4.2 |

## Chấm từng tiêu chí

| Tiêu chí | Điểm tối đa | Mức dự kiến | Điểm dự kiến | Bằng chứng | Việc cần làm để lên mức cao hơn |
|---|---|---|---|---|---|
| Đặt vấn đề và mục tiêu | 5 | Xuất sắc | 5 | Mục 1 nêu bối cảnh, câu hỏi định hướng in đậm, phạm vi rõ | Không cần |
| Đọc và tổng hợp bài báo | 15 | Tốt | 11–15 | Mục 2 trích đúng mục tiêu, phương pháp, kết quả của bài 1995 (có số trang) và bài 2007 (có số mục); Mục 2.3 so sánh hai nguồn | TV1 phải tự đọc lại và nói được bằng lời của mình; giảng viên sẽ hỏi |
| Giải thích thuật toán và công thức | 15 | Xuất sắc | 15 | Bảng 3.1 định nghĩa mọi ký hiệu kèm miền giá trị; 4 bước thuật toán; 2 ví dụ số có kiểm chứng bằng code | Không cần; chỉ cần TV1, TV2 tự bấm máy lại được trước lớp |
| Bằng chứng, so sánh, thực nghiệm | 10 | Xuất sắc | 10 | Hai baseline cùng ngân sách 2020 lần đánh giá, 5 seed, Bảng 4.1–4.3, Hình 4.1–4.2, dữ liệu tái lập được | Không cần |
| Phân tích phản biện và hạn chế | 10 | Tốt đến Xuất sắc | 7.5–10 | Mục 4.4 nêu giới hạn (2 hàm 2 chiều, 5 seed, cực tiểu ở gốc, một topology); Mục 4.3 không quy kết nguyên nhân | Có thể thêm 1 câu về chi phí tính toán thực tế nếu bị hỏi |
| Chất lượng slide và trích dẫn | 10 | Tốt | 7.5–10 | 10 slide nội dung, mỗi slide có dòng nguồn; References đủ | Điền tên thành viên trên slide 1; kiểm tra hai nguồn ngoài của TV3 |
| Thuyết trình | 15 | Chưa chấm được | ? | Dàn ý 3 phần, mỗi người khoảng 5 phút | Tập ít nhất một lần, bấm giờ đúng 15 phút |
| Hỏi đáp và thảo luận | 20 | Chưa chấm được | ? | Mỗi người có 8–10 câu hỏi ôn tập | Tập prompt 4.2, mỗi người tự trả lời được câu hỏi về phần mình |

**Ước tính phần chấm được trên văn bản (65 điểm): khoảng 56 đến 65.** 35 điểm còn lại (thuyết trình, hỏi đáp) phụ thuộc hoàn toàn vào việc cả nhóm hiểu bài.

## 5 việc ưu tiên trước khi nộp

1. **Chốt ngôn ngữ nộp bài.** Đề S01 ghi "report in Vietnamese"; nhóm đang làm bằng tiếng Anh. Hỏi lại giảng viên.
2. **Điền họ tên và MSSV** ở dòng tác giả của báo cáo (đang tô vàng) và slide 1.
3. **Một thành viên xác nhận hai nguồn ngoài** Alshareef et al. (2019) và Phung & Ha (2021) đã tự mở ra đọc (hai bài đã được thêm vào thư mục làm việc và AI đã giúp đọc, nhưng người trong nhóm vẫn cần tự đọc lại); nếu chưa, bỏ hai nguồn này, phần ứng dụng vẫn đứng được nhờ Poli et al. (2007, Sect. 6).
4. **Mỗi người đọc lại phần mình** và sửa câu chữ theo cách mình hiểu (đề yêu cầu giải thích bằng lời của mình).
5. **Tập thuyết trình và hỏi đáp** theo `05_Slide/DanYSlide_*.md` và `CauHoiKho_*.md`.
