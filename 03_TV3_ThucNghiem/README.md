# 03_TV3_ThucNghiem

Thư mục của **Thành viên 3: Thực nghiệm, so sánh và phân tích**.

| File | Sinh ra từ prompt | Hạn |
|---|---|---|
| `Baseline_SoSanh.ipynb` | 3.1, 3.2, 3.3 | 08/11 |
| `results_baseline.csv` | 3.1 | 07/11 |
| `BangSoSanh.md` | 3.2 | 08/11 |
| `figures/fig_compare_sphere.png`, `figures/fig_compare_rastrigin.png` | 3.2 | 08/11 |
| `figures/fig_local_optimum.png`, `PhanTichKetCucTri.md` | 3.3 | 08/11 |
| `BaoCao_Results_Conclusion.md` | 3.4 | 08/11 |

Chạy tất cả các ô trong [notebook](Baseline_SoSanh.ipynb). Notebook dùng bản sao hàm `pso` của TV2. Trong repo, notebook tự tìm CSV của TV2. Nếu dùng Colab, có thể tải [CSV của TV2](../02_TV2_MoPhong/results_pso.csv) lên bảng **Files** để đối chiếu. Khi thiếu CSV, notebook chạy lại các cấu hình PSO từ đầu. Mỗi lần chạy tạo lại `results_baseline.csv` và ba hình PNG.

Bàn giao cho TV1 bản [Results and Conclusion](BaoCao_Results_Conclusion.md), [bảng so sánh](BangSoSanh.md) và [phân tích cực trị](PhanTichKetCucTri.md). Tài liệu thuyết trình của TV3 nằm trong [dàn ý slide](../05_Slide/DanYSlide_TV3.md) và [câu hỏi ôn tập](../05_Slide/CauHoiKho_TV3.md).

Bản này đã đối chiếu với bản xuất Google Docs “Seminar AI”. Kiểm tra lại bảng ngưỡng fitness dưới 0.01 bằng cách lọc một tổ hợp trong CSV, rồi tự chạy notebook và xác nhận cực tiểu địa phương trên hình. Tập nói theo dàn ý và bấm giờ trước khi ghép slide.

Các phần bàn giao viết bằng tiếng Anh theo README của repo. Đề S01 ghi báo cáo nộp cuối viết bằng tiếng Việt, nên nhóm cần xác nhận ngôn ngữ khi ghép báo cáo.
