---
name: youtube-seo-growth
description: "Tối ưu tiêu đề/thumbnail/retention với dữ liệu có nguồn, cải thiện video Shorts và video dài."
version: 1.0.0
status: REPO_INSTALLED_UAT_PENDING
owner: project-xay-kenh-tiktok
---

# youtube-seo-growth

## Kích hoạt
Khi lên lịch kênh, tối ưu 10 video mỗi tuần, giảm rớt người xem hoặc chọn test nội dung.
## Đầu vào
Niche, danh sách video, Analytics do chủ kênh cho phép, key topic, thumbnail assets, mục tiêu business.
## Workflow
1. Lập topic cluster theo nhu cầu tìm kiếm và khả năng phục vụ người xem; xác thực số liệu công khai, không tự bịa volume search.
2. Thiết kế title/thumbnail chính xác, hấp dẫn và khớp nội dung; chuẩn bị 2 biến thể có sự khác biệt rõ.
3. Lập hook + kỳ vọng rõ ràng, nhịp nội dung theo logic câu chuyện; giữ lời hứa thumbnail.
4. Dùng YouTube Analytics chính chủ (hoặc Windsor connector khi đã kết nối) đo views, watch time, AVD, average view percentage, subscribers và traffic source; người ngoài không xem được retention video đối thủ.
5. Phân tích theo cohorts: Shorts vs long, chủ đề, format, độ dài, đăng tuần; dùng so sánh cùng loại không đánh đồng Shorts với long.
6. Tối ưu 1–2 biến mỗi vòng, ghi học được gì; ưu tiên thời gian xem hài lòng và tỷ lệ trở lại, không chạy theo view ảo.
## Chuẩn đầu ra
`GROWTH_PLAN.md` 30 ngày, editorial calendar 10 video/tuần, title/thumbnails brief, A/B hypotheses, dashboard spec và weekly kaizen.
## QA
Tránh nhồi từ khóa, clickbait sai sự thật, tương tác giả.

## Quy tắc bắt buộc áp dụng chung
- Phân biệt rõ DỮ LIỆU XÁC THỰC, SUY LUẬN, ĐỀ XUẤT. Tuyệt đối không tự bịa view, retention, RPM, điều kiện YPP hoặc trạng thái bản quyền.
- Chỉ đọc/phân tích file video người dùng sở hữu, được cấp phép hoặc có quyền xử lý; với video đối thủ, ưu tiên metadata công khai, mô tả, phụ đề được cung cấp hợp lệ và quan sát trực tiếp. Không tìm cách vượt DRM, paywall, quyền truy cập hay cơ chế bảo vệ của nền tảng.
- Không sao chép nguyên văn lời thoại, cốt truyện, đoạn phim, hình nhân vật, thumbnail, âm thanh/giọng nhận diện người khác khi thiếu quyền. Khai thác *nguyên lý* hiệu quả rồi tạo nội dung độc lập, có ý tưởng, cách thể hiện và giá trị mới.
- Reaction/critique phải có bình luận có thực chất; kiểm tra bản quyền riêng với chính sách reused/inauthentic content. Không khẳng định 'đổi giọng/crop/mirror/tăng tốc' đủ để bật kiếm tiền.
- Nếu tài liệu đầu vào thiếu, đánh dấu `UNKNOWN`, vẫn đưa bản đề xuất có giả định công khai. Không tự đăng, kết nối tài khoản, chuyển kênh, kích hoạt kiếm tiền hoặc chi tiền nếu chưa được phê duyệt.
- Ghi task_id, source_url, source_rights, model_version, human_approver, asset_manifest, expected_output, qa_status, last_reviewed_at. Nếu lỗi phải nêu blocker và cách xử lý.