# Seminar S01: Particle Swarm Optimization

Repo làm việc chung của nhóm 3 người cho seminar môn CS420 Nhập môn Trí tuệ nhân tạo.

- **Hạn nộp báo cáo:** 10/11/2026
- **Thuyết trình:** dự kiến 11 đến 16/11/2026 (15 phút trình bày, khoảng 5 phút hỏi đáp)
- **Kế hoạch, cách chấm điểm, phân công và bộ prompt:** xem file Google Docs "Seminar AI", tab **Tổng quan** và tab **Hệ thống AI và prompt**.

## Cấu trúc thư mục

| Thư mục | Người phụ trách | Nội dung |
|---|---|---|
| [`00_TaiLieu/`](00_TaiLieu/) | Cả nhóm (chỉ đọc) | Đề bài S01, thông tin môn học, PDF bài báo |
| [`01_TV1_LyThuyet/`](01_TV1_LyThuyet/) | Thành viên 1 | Ghi chú đọc bài báo, ví dụ tính tay, phần báo cáo của TV1 |
| [`02_TV2_MoPhong/`](02_TV2_MoPhong/) | Thành viên 2 | Notebook PSO, `results_pso.csv`, bảng mô phỏng, phần Method |
| [`03_TV3_ThucNghiem/`](03_TV3_ThucNghiem/) | Thành viên 3 | Notebook baseline và so sánh, `results_baseline.csv`, hình, phần Results |
| [`04_BaoCao/`](04_BaoCao/) | Thành viên 1 ghép | Bản báo cáo hoàn chỉnh, danh sách lỗi, kết quả tự chấm |
| [`05_Slide/`](05_Slide/) | Cả nhóm | Dàn ý slide của từng người, file slide cuối, câu hỏi khó |
| [`NhatKyAI/`](NhatKyAI/) | Mỗi người một file | Ghi lại mỗi lần dùng AI (đề bắt buộc trích dẫn công cụ AI) |

Mỗi thư mục có một file `README.md` ghi rõ cần nộp file gì, tên file là gì và sinh ra từ prompt nào.

## Quy tắc dùng repo

1. **Mỗi người chỉ sửa file trong thư mục của mình** và file nhật ký của mình trong `NhatKyAI/`. Nhờ vậy cả nhóm commit thẳng lên nhánh `main` mà không bị xung đột.
2. **Không cần biết git.** Dùng giao diện web của GitHub:
   - Thêm file: vào thư mục, bấm **Add file > Upload files**, kéo file vào, ghi nội dung commit rồi bấm **Commit changes**.
   - Sửa file văn bản: mở file, bấm biểu tượng bút chì, sửa rồi bấm **Commit changes**.
   - Nếu quen dùng, có thể dùng GitHub Desktop thay cho web.
3. **Ghi chú và phần báo cáo viết bằng Markdown (`.md`)** để xem trực tiếp trên GitHub và dễ so sánh các phiên bản. Bản báo cáo cuối cùng (Word hoặc PDF) để trong `04_BaoCao/`.
4. **Nội dung commit ghi ngắn gọn việc vừa làm**, ví dụ: `TV2: thêm bảng mô phỏng vòng 0 và vòng 1`.
5. **Không đưa mật khẩu, API key hay token lên repo.**

## Chạy notebook bằng Google Colab

1. Mở [colab.research.google.com](https://colab.research.google.com), chọn **File > Open notebook > GitHub**.
2. Tích **Include private repos**, cho phép Colab truy cập GitHub, chọn repo `Seminar-AI` và notebook cần mở.
3. Chạy xong, lưu lại bằng **File > Save a copy in GitHub**, chọn đúng repo, nhánh `main` và đúng đường dẫn thư mục của mình.
4. File kết quả (`.csv`, `.png`) do notebook tạo ra nằm trong phiên Colab: tải về từ bảng **Files** bên trái rồi upload vào đúng thư mục trên GitHub.

## Bàn giao giữa các thành viên

| Từ | Đến | Nội dung | Hạn |
|---|---|---|---|
| TV1 | TV2 | `01_TV1_LyThuyet/ViDuTinhTay.md` | 07/11 |
| TV2 | TV3 | `02_TV2_MoPhong/PSO_Seminar.ipynb` và `results_pso.csv` | sáng 08/11 |
| TV2, TV3 | TV1 | Phần báo cáo của mình (`BaoCao_*.md`), đã review | tối 08/11 |
| TV1 | Cả nhóm | Bản ghép trong `04_BaoCao/` để chạy prompt 4.3 | 09/11 |

Khi bàn giao, chỉ cần commit file lên đúng thư mục và nhắn cho người nhận.
