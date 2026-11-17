---
name: video-media-inspection
description: Kiểm tra metadata kỹ thuật, phân cảnh, giọng nói và phụ đề của file video có quyền bằng FFmpeg, PySceneDetect, Whisper khi công cụ sẵn có.
version: 1.0.0
status: REPO_INSTALLED_UAT_PENDING
---
# Video Media Inspection

## Điều kiện đầu vào
File MP4/MOV/audio do người dùng cung cấp hoặc được cấp phép xử lý; xác thực quyền. Video đối thủ chỉ phân tích thông tin công khai mà người dùng có quyền truy cập.

## Công cụ tham chiếu
- FFmpeg / ffprobe: https://github.com/FFmpeg/FFmpeg
- PySceneDetect: https://github.com/Breakthrough/PySceneDetect
- Whisper.cpp: https://github.com/ggml-org/whisper.cpp

Đây là các mã nguồn tham khảo, không phải dependencies đã được cài. Không tự tải video trái phép, không vượt DRM/paywall.

## Quy trình
1. Ghi provenance, quyền sử dụng, kích thước file, định dạng, codec, thời lượng và độ phân giải nếu công cụ có thật.
2. Lập bản đồ cảnh/cắt cảnh và bảng phân tích góc máy, bối cảnh, âm thanh, lời thoại. Không tự bịa timestamp khi chưa thực sự xem/đo.
3. Nếu có khả năng chuyển lời nói thành văn bản, tạo transcript có timestamps, đánh dấu từ không rõ và kiểm tra bản địa hóa tiếng Việt.
4. Phát hiện lỗi dựng: giọng không khớp, lỗi nhân vật xuyên cảnh, âm lượng, phụ đề sai, khung hình bị méo.
5. Xuất bảng `scene_id | start | end | camera | audio | transcript | visual | issue | suggested_fix`.

## Cổng kiểm soát
Không trích xuất hoặc tái sử dụng nguyên media của người khác cho clip mới khi thiếu quyền. Kiểm tra lại thủ công các vùng không chắc chắn trước xuất bản.
