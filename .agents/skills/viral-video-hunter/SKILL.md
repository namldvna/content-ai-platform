---
name: viral-video-hunter
description: "Phát hiện ý tưởng/format video tăng trưởng từ metadata hợp lệ của YouTube, TikTok, Reels."
version: 1.0.0
status: REPO_INSTALLED_UAT_PENDING
owner: project-xay-kenh-tiktok
---

# viral-video-hunter

## Kích hoạt
Khi người dùng yêu cầu tìm video viral, đối thủ cùng ngách, chủ đề đang lên hoặc 20 ý tưởng video kế tiếp.
## Đầu vào
Ngách, ngôn ngữ, khu vực, 5–20 link kênh/video nếu có, khoảng ngày, mục tiêu (Shorts/long/reaction), ngân sách.
## Quy trình
1. Tạo taxonomy: ngách, nhân vật, cảm xúc, kiểu mở đầu, payoff, CTA; lấy mẫu nhiều kênh.
2. Ưu tiên dữ liệu chính thức YouTube Data API hoặc dữ liệu công khai truy cập được; lưu URL + thời điểm quan sát + lượt xem + thời gian đăng + độ dài + tiêu đề.
3. Chỉ tính 'views/ngày', 'views/follower' khi mẫu số xác thực; không coi đó là retention hay doanh thu.
4. Chấm điểm tiềm năng 0–100: nhu cầu 25, hook 20, khả thi sản xuất 20, khác biệt 20, rủi ro bản quyền thấp 15. Ghi rõ đây là khung đánh giá nội bộ, không phải điểm YouTube.
5. Đề xuất 10 ý tưởng mới không copy câu chữ/hình ảnh và xếp thử nghiệm A/B.
## Chuẩn đầu ra
Bảng `source_url | published_at | observed_at | metrics | viral_mechanism | new_angle | difficulty | risk | priority` + top 10 brief 60–120 giây.
## QA
Không gọi video là 'viral' nếu thiếu chỉ số; không đoán dữ liệu nội bộ kênh đối thủ.

## Quy tắc bắt buộc áp dụng chung
- Phân biệt rõ DỮ LIỆU XÁC THỰC, SUY LUẬN, ĐỀ XUẤT. Tuyệt đối không tự bịa view, retention, RPM, điều kiện YPP hoặc trạng thái bản quyền.
- Chỉ đọc/phân tích file video người dùng sở hữu, được cấp phép hoặc có quyền xử lý; với video đối thủ, ưu tiên metadata công khai, mô tả, phụ đề được cung cấp hợp lệ và quan sát trực tiếp. Không tìm cách vượt DRM, paywall, quyền truy cập hay cơ chế bảo vệ của nền tảng.
- Không sao chép nguyên văn lời thoại, cốt truyện, đoạn phim, hình nhân vật, thumbnail, âm thanh/giọng nhận diện người khác khi thiếu quyền. Khai thác *nguyên lý* hiệu quả rồi tạo nội dung độc lập, có ý tưởng, cách thể hiện và giá trị mới.
- Reaction/critique phải có bình luận có thực chất; kiểm tra bản quyền riêng với chính sách reused/inauthentic content. Không khẳng định 'đổi giọng/crop/mirror/tăng tốc' đủ để bật kiếm tiền.
- Nếu tài liệu đầu vào thiếu, đánh dấu `UNKNOWN`, vẫn đưa bản đề xuất có giả định công khai. Không tự đăng, kết nối tài khoản, chuyển kênh, kích hoạt kiếm tiền hoặc chi tiền nếu chưa được phê duyệt.
- Ghi task_id, source_url, source_rights, model_version, human_approver, asset_manifest, expected_output, qa_status, last_reviewed_at. Nếu lỗi phải nêu blocker và cách xử lý.