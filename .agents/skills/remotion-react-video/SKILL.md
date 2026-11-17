---
name: remotion-react-video
description: Hướng dẫn thiết kế video bằng React/Remotion khi cần template video Shorts, Reels, cảnh quay, phụ đề hoặc render tự động.
version: 1.0.0
status: REPO_INSTALLED_UAT_PENDING
---
# Remotion/React Video Production

Nguồn chính chủ để tham khảo: https://github.com/remotion-dev/skills (bộ Remotion Agent Skills, kiểm tra phiên bản trước khi dùng).

## Khi sử dụng
- Người dùng yêu cầu dựng video bằng ReactJS, Remotion, tạo template, motion typography, phụ đề, timeline nhiều cảnh.
- Nếu người dùng yêu cầu *reaction video* chứ không phải ReactJS, dùng reaction-video-creator trước.

## Quy trình
1. Kiểm tra dự án hiện có; không tự scaffold vào root của content-ai-platform vì đây là ứng dụng web khác. Với yêu cầu dựng mới, chỉ tạo dự án phụ tách biệt và có đường dẫn rõ ràng.
2. Đọc tài liệu Remotion chính thức và các skill remotion-best-practices, remotion-create, remotion-markup, remotion-captions, remotion-multimedia trong repo chính chủ.
3. Đề xuất composition: fps, width, height, durationInFrames, assets, timeline, âm thanh, caption, Safe Zones (9:16, 16:9).
4. Phân cảnh, lời thoại, nhịp chuyển, nguồn ảnh/nhạc và bản quyền; giữ consistency nhân vật và camera.
5. Chỉ cài dependency hoặc render video khi máy thực thi có quyền, môi trường đã chuẩn bị và giấy phép phần mềm phù hợp; không tuyên bố đã cài npx/module nếu chưa chạy.
6. Kiểm tra frame/âm thanh/caption/CTA/không gian chữ, đồng thời kiểm quyền sử dụng và chính sách đăng.

## Lệnh nguồn chính chủ (dành cho môi trường phát triển đã kiểm duyệt)
`npx skills add remotion-dev/skills`

Lệnh trên chỉ là hướng dẫn cài bộ skill chính chủ, CHƯA được thực thi bởi skill này. Không yêu cầu tài khoản, API key hay bypass quy định.
