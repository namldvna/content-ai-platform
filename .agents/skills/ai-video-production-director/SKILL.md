---
name: ai-video-production-director
description: "Điều phối quay dựng AI, Veo/Flow, Remotion React, CapCut, FFmpeg và duyệt chất lượng."
version: 1.0.0
status: REPO_INSTALLED_UAT_PENDING
owner: project-xay-kenh-tiktok
---

# ai-video-production-director

## Kích hoạt
Khi người dùng muốn sản xuất clip từ kịch bản, chia cảnh và tạo prompt cho mô hình video, giữ nhân vật đồng nhất.
## Đầu vào
Script đã duyệt, định dạng 9:16/16:9, thời lượng, số cảnh, nhân vật, reference asset có quyền, công cụ.
## Workflow
1. Tạo `character_bible`: đặc điểm, quần áo, tính cách, tuổi hợp bối cảnh; dùng hình do mình tạo hoặc có quyền.
2. Tạo `location_bible`, quy tắc continuity: hướng nhìn, trục 180°, eyeline, vị trí vật, tư thế trước/sau cut, ánh sáng.
3. Phân cảnh shot-by-shot với `duration`, `camera`, `action`, `dialogue`, `sound`, `continuity_previous`, `continuity_next`.
4. Prompt Veo/Flow ưu tiên chuyển động tự nhiên, không quay lưng vô lý, người nói quay về người nghe, máy quay bám chủ thể, cỡ cảnh phù hợp.
5. Dựng template intro/caption/transition bằng Remotion (ReactJS) nếu môi trường có license phù hợp; dùng FFmpeg để đo thời lượng, loudness, codec, aspect; không làm giả giọng/hình người thật thiếu sự đồng ý.
6. Quality gates: hình/âm/thông tin/logic/nhân vật/rights/originality/AI disclosure; QC 90/100 mới chuyển người duyệt.
7. Lưu project, assets, phiên bản, lỗi cố định, xuất bản nháp chứ không tự đăng.
## Chuẩn đầu ra
`SHOTLIST.csv`, `SCENE_PROMPTS.md`, `CHARACTER_BIBLE.md`, `ASSET_MANIFEST.csv`, `QA_REPORT.md`, video render nếu công cụ thực sự có quyền tạo.
## QA
Không tuyên bố đã render nếu chưa có MP4 đúng yêu cầu và bằng chứng file.

## Quy tắc bắt buộc áp dụng chung
- Phân biệt rõ DỮ LIỆU XÁC THỰC, SUY LUẬN, ĐỀ XUẤT. Tuyệt đối không tự bịa view, retention, RPM, điều kiện YPP hoặc trạng thái bản quyền.
- Chỉ đọc/phân tích file video người dùng sở hữu, được cấp phép hoặc có quyền xử lý; với video đối thủ, ưu tiên metadata công khai, mô tả, phụ đề được cung cấp hợp lệ và quan sát trực tiếp. Không tìm cách vượt DRM, paywall, quyền truy cập hay cơ chế bảo vệ của nền tảng.
- Không sao chép nguyên văn lời thoại, cốt truyện, đoạn phim, hình nhân vật, thumbnail, âm thanh/giọng nhận diện người khác khi thiếu quyền. Khai thác *nguyên lý* hiệu quả rồi tạo nội dung độc lập, có ý tưởng, cách thể hiện và giá trị mới.
- Reaction/critique phải có bình luận có thực chất; kiểm tra bản quyền riêng với chính sách reused/inauthentic content. Không khẳng định 'đổi giọng/crop/mirror/tăng tốc' đủ để bật kiếm tiền.
- Nếu tài liệu đầu vào thiếu, đánh dấu `UNKNOWN`, vẫn đưa bản đề xuất có giả định công khai. Không tự đăng, kết nối tài khoản, chuyển kênh, kích hoạt kiếm tiền hoặc chi tiền nếu chưa được phê duyệt.
- Ghi task_id, source_url, source_rights, model_version, human_approver, asset_manifest, expected_output, qa_status, last_reviewed_at. Nếu lỗi phải nêu blocker và cách xử lý.