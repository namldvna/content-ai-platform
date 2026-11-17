---
name: youtube-monetization-auditor
description: "Kiểm tra tiêu chí YPP, content policy, AdSense, quyền nội dung và điều kiện bật doanh thu."
version: 1.0.0
status: REPO_INSTALLED_UAT_PENDING
owner: project-xay-kenh-tiktok
---

# youtube-monetization-auditor

## Kích hoạt
Khi người dùng muốn bật kiếm tiền, phân tích kênh bị từ chối, kiểm tra kênh trước khi mở rộng.
## Đầu vào
Quốc gia của kênh, trang Earn YouTube Studio (do người dùng cấp), subscriber, public watch hours đủ điều kiện 365 ngày, Shorts views đủ điều kiện 90 ngày, 3 public uploads 90 ngày, trạng thái strike, 2FA, AdSense, asset rights ledger.
## Hai tầng ngưỡng (theo nguồn YouTube Help, phải xác minh lại lúc kiểm toán)
- YPP mở rộng tại quốc gia hỗ trợ: >=500 subscriber + 3 public uploads 90 ngày + (>=3000 giờ xem dài hợp lệ 365 ngày HOẶC >=3 triệu Shorts views hợp lệ 90 ngày). Đây KHÔNG phải ngưỡng tự động bật doanh thu quảng cáo.
- Chia sẻ doanh thu quảng cáo: >=1000 subscriber + (>=4000 giờ xem dài hợp lệ 365 ngày HOẶC >=10 triệu Shorts views hợp lệ 90 ngày). Giờ xem Shorts Feed không cộng vào 4000 giờ.
- Tuân thủ chính sách, không có Community Guidelines strike đang hiệu lực, bảo mật hai bước, tính năng nâng cao, tài khoản AdSense for YouTube; người dưới 18 cần tài khoản thanh toán của cha/mẹ hoặc người giám hộ đủ tuổi.
## Audit 3 lớp
1. **Eligibility**: lấy chỉ số được xác minh từ Studio Earn; thiếu thì unknown.
2. **Originality**: xem 20 video gần nhất + top-watch-time; nội dung lặp/mass-produced/reused phản ánh rủi ro ở cấp độ toàn kênh.
3. **Rights & compliance**: bản quyền, giấy phép footage/nhạc, AI altered/synthetic disclosure khi cần, thuế/thanh toán theo quốc gia.
## Chuẩn đầu ra
`MONETIZATION_AUDIT.md`: PASS/BLOCK/UNKNOWN theo từng tiêu chí, bằng chứng, risk severity, đề xuất sửa đúng chính sách, thứ tự ưu tiên, trách nhiệm owner; không cam kết được YouTube chấp thuận.
## QA
Không hướng dẫn mua view/sub, thuê kéo giờ xem, giả danh/AdSense hay né kiểm duyệt; không nhầm 500 sub là đã có tiền quảng cáo.

## Quy tắc bắt buộc áp dụng chung
- Phân biệt rõ DỮ LIỆU XÁC THỰC, SUY LUẬN, ĐỀ XUẤT. Tuyệt đối không tự bịa view, retention, RPM, điều kiện YPP hoặc trạng thái bản quyền.
- Chỉ đọc/phân tích file video người dùng sở hữu, được cấp phép hoặc có quyền xử lý; với video đối thủ, ưu tiên metadata công khai, mô tả, phụ đề được cung cấp hợp lệ và quan sát trực tiếp. Không tìm cách vượt DRM, paywall, quyền truy cập hay cơ chế bảo vệ của nền tảng.
- Không sao chép nguyên văn lời thoại, cốt truyện, đoạn phim, hình nhân vật, thumbnail, âm thanh/giọng nhận diện người khác khi thiếu quyền. Khai thác *nguyên lý* hiệu quả rồi tạo nội dung độc lập, có ý tưởng, cách thể hiện và giá trị mới.
- Reaction/critique phải có bình luận có thực chất; kiểm tra bản quyền riêng với chính sách reused/inauthentic content. Không khẳng định 'đổi giọng/crop/mirror/tăng tốc' đủ để bật kiếm tiền.
- Nếu tài liệu đầu vào thiếu, đánh dấu `UNKNOWN`, vẫn đưa bản đề xuất có giả định công khai. Không tự đăng, kết nối tài khoản, chuyển kênh, kích hoạt kiếm tiền hoặc chi tiền nếu chưa được phê duyệt.
- Ghi task_id, source_url, source_rights, model_version, human_approver, asset_manifest, expected_output, qa_status, last_reviewed_at. Nếu lỗi phải nêu blocker và cách xử lý.