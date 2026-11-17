---
name: youtube-mmo-content-studio-router
description: Điều phối phân tích video đối thủ, reaction, viết kịch bản nguyên bản, làm video AI và phát triển YouTube/TikTok an toàn.
version: 1.0.1
status: REPO_INSTALLED_UAT_PENDING
---
# YouTube/TikTok MMO Content Studio Router

Khi được giao nhiệm vụ nghiên cứu kênh, phân tích video hoặc tạo video: dùng một hoặc nhiều skill trong .agents/skills/ theo thứ tự dưới đây.

1. viral-video-hunter: thu thập metadata và phân tích các tín hiệu công khai có căn cứ.
2. rea-video (nếu đã cài CLI) + video-reverse-engineer: phân tích cấu trúc, phân cảnh, nhịp dựng, thông điệp; chỉ xử lý media khi có quyền. Nếu CLI chưa có, dùng skill phân tích thủ công và báo blocker.
3. viral-script-rebuilder: sáng tạo kịch bản độc lập; không chép nguyên lời thoại, hình ảnh, tình tiết đặc thù.
4. reaction-video-creator: phản biện, nhận xét, phân tích có đóng góp thực chất.
5. ai-video-production-director + remotion-react-video: tổ chức storyboard, prompt, hậu kỳ/dựng bằng React.
6. video-media-inspection: kiểm tra tệp video, phụ đề, âm thanh, đồng bộ và continuity.
7. youtube-monetization-auditor: rà chính sách kiếm tiền, bản quyền, quyền asset và reused/inauthentic.
8. youtube-seo-growth: tối ưu tiêu đề, thumbnail, giữ chân người xem và đo lường.
9. mmo-channel-operations: quản trị lịch sản xuất, chi phí, doanh thu và KPI.

## Chốt chất lượng
- Bằng chứng xác thực khác với suy luận và ý tưởng.
- File đầu vào phải thuộc quyền sử dụng của người dùng hoặc có giấy phép; với video đối thủ, chỉ sử dụng dữ liệu công khai được phép quan sát.
- YouTube Content & Copyright Gate bắt buộc, kiểm duyệt con người trước đăng.
- Không tải/chỉnh sửa để giả mạo người sở hữu, vi phạm bản quyền, đánh lừa YouTube hoặc né Content ID.
- Lưu task_id, link nguồn, rights status, outcome, QA, người duyệt, trạng thái publish và version.
- Không tự nhận các công cụ FFmpeg, Whisper, SceneDetect, Remotion hay YouTube API đã kết nối. Chỉ thực thi khi môi trường và quyền thực tế có sẵn.
- Nếu không có quyền dữ liệu hay credential, giao bản nghiên cứu/brief và nêu rõ blocker.
