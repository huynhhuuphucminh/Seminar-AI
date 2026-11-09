# Danh sách việc khi ghép báo cáo (prompt 1.7)

> Bản nháp do AI (Claude) ghi lại khi ghép `BaoCao_Seminar_PSO.docx`. Cột "Trạng thái" cho biết đã sửa trong bản ghép hay còn chờ người.

| Vị trí | Vấn đề | Cách xử lý | Trạng thái |
|---|---|---|---|
| Dòng tác giả, slide 1 | Chưa có họ tên, MSSV | Điền vào chỗ tô vàng `[Member …]` | Chờ cả nhóm |
| Toàn bài | Đề S01 ghi báo cáo bằng tiếng Việt, nhóm làm tiếng Anh | Giữ tiếng Anh theo README của nhóm (TV1 chốt ngày 09/11); nếu giảng viên yêu cầu tiếng Việt thì dịch từ bản tiếng Anh | Đã chốt tiếng Anh; nên xác nhận với giảng viên |
| Mục 2 | Bảng ký hiệu có ở cả Background và Method | Chỉ giữ ở Method (Bảng 3.1) | Đã sửa |
| Mục 3.2 | Phần Method gốc dài khoảng 1700 từ | Rút gọn danh sách bước, gộp hai bảng vòng 0 và vòng 1 thành Bảng 3.3 | Đã sửa |
| Mục 3.4 | Bảng trạng thái tách 2 bảng | Gộp thành một bảng, thêm dòng gbest | Đã sửa |
| Mục 4.1 | Hai hình so sánh riêng | Ghép thành Hình 4.1 (trái Sphere, phải Rastrigin) | Đã sửa |
| Mục 4.2 | Câu "ω = 0.9 kept so much velocity…" là suy diễn | Viết lại thành "still converging when the budget ran out (mean 4.2 × 10⁻⁵)" | Đã sửa |
| Mục 4.1 | Câu Hill Climbing "stayed in the basin" quá chắc | Viết lại thành "rarely left the basin it reached first" | Đã sửa |
| Mục 4.4 | Ứng dụng chỉ dựa vào hai nguồn ngoài | Thêm danh mục ứng dụng từ Poli et al. (2007, Sect. 6); giữ hai nguồn ngoài | Đã sửa; chờ TV3 xác nhận đã đọc |
| Mục 4.4 | Chưa nêu thiên lệch về gốc tọa độ | Thêm hạn chế: cả hai hàm có cực tiểu ở tâm miền (Poli et al., 2007, Sect. 7.1) | Đã sửa |
| References | Thiếu ghi chú công cụ AI | Thêm mục "Use of AI tools" | Đã sửa |
| Ký hiệu | ω, c₁, c₂, pbest, gbest thống nhất giữa các phần | Đã kiểm tra | Đã sửa |
| Số liệu | Mọi con số trong Bảng 3.3, 4.1, 4.2, 4.3 | Đã tính lại từ `results_pso.csv`, `results_baseline.csv`, `swarm_states_sphere_seed42.csv` | Khớp |
| Độ dài | 6–10 trang | Bản ghép 7 trang A4 (tính cả References) | Đạt |
