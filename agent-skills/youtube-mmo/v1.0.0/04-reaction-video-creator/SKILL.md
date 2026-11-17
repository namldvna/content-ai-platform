---
name: reaction-video-creator
description: "Thiết kế reaction dạng bình luận, phân tích, đánh giá, giải thích thực chất, an toàn bản quyền."
version: 1.0.0
status: CANDIDATE_PACKAGED_NOT_INSTALLED
owner: project-xay-kenh-tiktok
---

# reaction-video-creator

## Kích hoạt
Khi người dùng muốn React/reaction video đối thủ, chủ đề phim/giải trí/AI hoặc phân tích clip.
## Đầu vào
Chủ đề video, video nguồn, tình trạng quyền trích dẫn, góc nhìn độc lập, giá trị mới người xem nhận được.
## Pipeline
1. Xác định mục đích phản biện: phát hiện sai, giải thích quyết định, phân tích kể chuyện/diễn xuất/biên tập, so sánh quan điểm.
2. Mở đầu bằng nhận định của người dẫn; phân đoạn nguồn chỉ dùng trong phạm vi có cơ sở pháp lý và cần thiết cho bình luận (không có bảo đảm fair use tự động).
3. Xen kẽ người dẫn với minh họa tự quay/đồ họa, bằng chứng, phụ đề bình luận, đồ thị; không làm 'xem lại trọn clip' với vài câu cảm thán.
4. Viết reaction script dạng `time | original topic/summary | creator commentary | evidence | on-screen original asset | rights_status`.
5. Duyệt riêng 2 cổng: (a) quyền khai thác/trích dẫn, (b) chính sách YouTube reused content; hồ sơ phê duyệt không thể thay việc đánh giá của YouTube.
## Chuẩn đầu ra
Kịch bản reaction 1–3 phút, 4–8 điểm phản biện cụ thể, nguồn tham chiếu, shotlist gốc, rights checklist.
## QA
Không dựng lại toàn bộ footage của người khác. Không hướng dẫn né Content ID hoặc lách quy trình bản quyền.

## Quy tắc bắt buộc áp dụng chung
- Phân biệt rõ DỮ LIỆU XÁC THỰC, SUY LUẬN, ĐỀ XUẤT. Tuyệt đối không tự bịa view, retention, RPM, điều kiện YPP hoặc trạng thái bản quyền.
- Chỉ đọc/phân tích file video người dùng sở hữu, được cấp phép hoặc có quyền xử lý; với video đối thủ, ưu tiên metadata công khai, mô tả, phụ đề được cung cấp hợp lệ và quan sát trực tiếp. Không tìm cách vượt DRM, paywall, quyền truy cập hay cơ chế bảo vệ của nền tảng.
- Không sao chép nguyên văn lời thoại, cốt truyện, đoạn phim, hình nhân vật, thumbnail, âm thanh/giọng nhận diện người khác khi thiếu quyền. Khai thác *nguyên lý* hiệu quả rồi tạo nội dung độc lập, có ý tưởng, cách thể hiện và giá trị mới.
- Reaction/critique phải có bình luận có thực chất; kiểm tra bản quyền riêng với chính sách reused/inauthentic content. Không khẳng định 'đổi giọng/crop/mirror/tăng tốc' đủ để bật kiếm tiền.
- Nếu tài liệu đầu vào thiếu, đánh dấu `UNKNOWN`, vẫn đưa bản đề xuất có giả định công khai. Không tự đăng, kết nối tài khoản, chuyển kênh, kích hoạt kiếm tiền hoặc chi tiền nếu chưa được phê duyệt.
- Ghi task_id, source_url, source_rights, model_version, human_approver, asset_manifest, expected_output, qa_status, last_reviewed_at. Nếu lỗi phải nêu blocker và cách xử lý.