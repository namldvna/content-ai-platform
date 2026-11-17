---
name: video-reverse-engineer
description: "Bóc tách cấu trúc cảnh, thời lượng, thoại, nhịp, biểu cảm, cảm xúc của video đã được phép phân tích."
version: 1.0.0
status: REPO_INSTALLED_UAT_PENDING
owner: project-xay-kenh-tiktok
---

# video-reverse-engineer

## Kích hoạt
Khi có file MP4 hợp lệ hoặc link muốn phân tích theo bố cục/tâm lý/từng cảnh.
## Đầu vào
Tệp được phép xử lý (tốt nhất), link công khai, mục tiêu phân tích, độ sâu scene-by-scene, ngôn ngữ.
## Pipeline phân tích
1. Xác thực nguồn và phạm vi quyền; không tự coi một link là quyền tải lại.
2. Với **tệp hợp lệ**: `ffprobe` lấy duration/fps/aspect/audio; PySceneDetect tìm cut; Whisper/faster-whisper/whisper.cpp làm transcript, đối chiếu lỗi thủ công; FFmpeg lấy keyframes đúng quyền.
3. Tạo bảng timeline mỗi 1–10 giây hoặc theo scene: subject, camera, action, dialogue summary (paraphrase), sound, beat, emotional_tension, cut_type, intended_effect.
4. Bóc 5 lớp: hook (0–3 giây), escalation, điểm bẻ lái, payoff, CTA/comment trigger.
5. Tách nguyên lý tái dùng (loại hook/tốc độ/tương phản/tâm lý) khỏi yếu tố không được bê nguyên (câu thoại đặc thù, cảnh quay, nhạc, nhân vật được bảo hộ).
6. Tạo 3 hypothesis về vì sao người xem có thể bị cuốn; KHÔNG khẳng định nếu thiếu retention thực.
## Chuẩn đầu ra
`VIDEO_ANALYSIS.md` gồm bảng timeline; `BEAT_MAP.csv` (start_sec,end_sec,beat,emotion,visual,audio,transition,notes); `NEW_IDEA_BRIEF.md` tối thiểu 3 ý tưởng nguyên bản.
## QA
Cảnh nào không thấy phải ghi 'không quan sát được'. Không bịa thoại từ hình câm.

## Quy tắc bắt buộc áp dụng chung
- Phân biệt rõ DỮ LIỆU XÁC THỰC, SUY LUẬN, ĐỀ XUẤT. Tuyệt đối không tự bịa view, retention, RPM, điều kiện YPP hoặc trạng thái bản quyền.
- Chỉ đọc/phân tích file video người dùng sở hữu, được cấp phép hoặc có quyền xử lý; với video đối thủ, ưu tiên metadata công khai, mô tả, phụ đề được cung cấp hợp lệ và quan sát trực tiếp. Không tìm cách vượt DRM, paywall, quyền truy cập hay cơ chế bảo vệ của nền tảng.
- Không sao chép nguyên văn lời thoại, cốt truyện, đoạn phim, hình nhân vật, thumbnail, âm thanh/giọng nhận diện người khác khi thiếu quyền. Khai thác *nguyên lý* hiệu quả rồi tạo nội dung độc lập, có ý tưởng, cách thể hiện và giá trị mới.
- Reaction/critique phải có bình luận có thực chất; kiểm tra bản quyền riêng với chính sách reused/inauthentic content. Không khẳng định 'đổi giọng/crop/mirror/tăng tốc' đủ để bật kiếm tiền.
- Nếu tài liệu đầu vào thiếu, đánh dấu `UNKNOWN`, vẫn đưa bản đề xuất có giả định công khai. Không tự đăng, kết nối tài khoản, chuyển kênh, kích hoạt kiếm tiền hoặc chi tiền nếu chưa được phê duyệt.
- Ghi task_id, source_url, source_rights, model_version, human_approver, asset_manifest, expected_output, qa_status, last_reviewed_at. Nếu lỗi phải nêu blocker và cách xử lý.