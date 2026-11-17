---
name: viral-script-rebuilder
description: "Biến cơ chế cuốn hút từ video tham chiếu thành kịch bản sáng tạo riêng, có ý tưởng mới."
version: 1.0.0
status: CANDIDATE_PACKAGED_NOT_INSTALLED
owner: project-xay-kenh-tiktok
---

# viral-script-rebuilder

## Kích hoạt
Khi đã có phân tích video/ý tưởng và cần tạo 1–10 kịch bản Shorts 60–120s, series 1–3 phút.
## Đầu vào
Beat map, audience persona, moral/giá trị, giọng vùng miền, số tập, bối cảnh, asset có quyền, nền tảng.
## Workflow
1. Giữ *cơ chế kịch tính* ở cấp độ trừu tượng: bất công → tăng căng thẳng → lật tình thế → giải tỏa; không giữ chuỗi cảnh/thoại cụ thể.
2. Đề xuất ít nhất 3 phương án khác biệt: thay xung đột trung tâm, hoàn cảnh, nhân vật, quyết định nhân vật và cái kết; chọn bản có lợi ích cảm xúc rõ.
3. Viết hook 0–3s bằng một hành động/sự thật bất ngờ; không câu dẫn rỗng, không thumbnail đánh lừa.
4. Lập 6–12 beat theo giây; mỗi beat có sự kiện mới, không đứng giải thích quá lâu.
5. Viết hội thoại Việt tự nhiên: ngắt câu, từ đời thường, xưng hô khớp nhân vật, không thuyết minh hết cảm xúc.
6. Kết hợp ending có câu hỏi bình luận tự nhiên, tránh thao túng engagement giả.
7. Phản biện về logic, đạo đức nhân vật, khả thi hình ảnh, originality và tỷ lệ thời gian.
## Chuẩn đầu ra
Logline, khác biệt với tham chiếu, 3 hook, beat sheet, thoại theo nhân vật, shotlist, SFX/music brief (tài sản được phép), prompt/video asset list, kiểm tra bản quyền và AI-disclosure.
## QA
Cảnh phim mới không được gần như khớp từng beat/câu thoại với một tác phẩm cụ thể; nếu quá giống phải viết lại.

## Quy tắc bắt buộc áp dụng chung
- Phân biệt rõ DỮ LIỆU XÁC THỰC, SUY LUẬN, ĐỀ XUẤT. Tuyệt đối không tự bịa view, retention, RPM, điều kiện YPP hoặc trạng thái bản quyền.
- Chỉ đọc/phân tích file video người dùng sở hữu, được cấp phép hoặc có quyền xử lý; với video đối thủ, ưu tiên metadata công khai, mô tả, phụ đề được cung cấp hợp lệ và quan sát trực tiếp. Không tìm cách vượt DRM, paywall, quyền truy cập hay cơ chế bảo vệ của nền tảng.
- Không sao chép nguyên văn lời thoại, cốt truyện, đoạn phim, hình nhân vật, thumbnail, âm thanh/giọng nhận diện người khác khi thiếu quyền. Khai thác *nguyên lý* hiệu quả rồi tạo nội dung độc lập, có ý tưởng, cách thể hiện và giá trị mới.
- Reaction/critique phải có bình luận có thực chất; kiểm tra bản quyền riêng với chính sách reused/inauthentic content. Không khẳng định 'đổi giọng/crop/mirror/tăng tốc' đủ để bật kiếm tiền.
- Nếu tài liệu đầu vào thiếu, đánh dấu `UNKNOWN`, vẫn đưa bản đề xuất có giả định công khai. Không tự đăng, kết nối tài khoản, chuyển kênh, kích hoạt kiếm tiền hoặc chi tiền nếu chưa được phê duyệt.
- Ghi task_id, source_url, source_rights, model_version, human_approver, asset_manifest, expected_output, qa_status, last_reviewed_at. Nếu lỗi phải nêu blocker và cách xử lý.