# Nhật ký dùng AI: Thành viên 3

| Ngày | Công cụ AI | Mã prompt | Dùng cho phần nào | Đã kiểm tra gì | Ghi chú |
|---|---|---|---|---|---|
| 2026-11-08 | OpenAI Codex | Theo đầu mục 3.1–3.4, 4.1–4.2 trong repo | Viết và chạy notebook, tạo dữ liệu và hình, soạn Results/Conclusion, dàn ý slide và câu hỏi ôn tập | Chạy lại 30 lượt PSO và đối chiếu 3.030 dòng với CSV TV2, kiểm tra 20 lượt baseline đủ 2.020 đánh giá/lượt, so bảng tổng hợp với kết quả chạy, kiểm chứng cực tiểu Rastrigin bằng đạo hàm và Hessian, chạy lại khi thiếu CSV TV2 | Dùng README và đề S01 vì repo không có nội dung prompt Google Docs. TV3 cần tự chạy lại, tự kiểm chứng và diễn đạt lại trước khi nộp. |
| 2026-11-08 | OpenAI Codex | 3.1–3.4, 4.1–4.2 theo bản xuất Google Docs | Đối chiếu và sửa bản đầu: Hill Climbing σ = 0.3, bảng lần đầu đạt fitness dưới 0.01, ca chẩn đoán Rastrigin 5 hạt và 20 seed, cập nhật báo cáo và slide | Chạy lại notebook, đếm số lần gọi hàm thực tế của baseline, đối chiếu CSV TV2, tính lại fitness cực tiểu, xem ba hình đã tạo | Kết quả bản này thay thế số liệu bản đầu. Câu hỏi ôn tập là tài liệu luyện, TV3 cần tự tập trả lời và bấm giờ phần nói. |
| 2026-11-09 | Claude (Claude Code) | — | Chạy lại `Baseline_SoSanh.ipynb` để lưu kèm kết quả | `results_baseline.csv` và 3 hình sinh lại trùng từng byte với bản đã commit | Chỉ thêm output vào notebook, không sửa code |
