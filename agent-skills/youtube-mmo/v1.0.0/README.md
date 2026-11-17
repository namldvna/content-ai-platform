# Bộ skill Xây kênh TikTok / YouTube / MMO v1.0

**Ngày tạo:** 17/11/2026  
**Trạng thái:** ĐÃ ĐÓNG GÓI FILE, **CHƯA CÀI** vào môi trường runtime Agent/ChatGPT. Chưa chạy video-analysis UAT thực tế do chưa có video kiểm thử được cấp quyền.  
**Phạm vi:** 8 skill + router + mẫu đầu ra và checklist chính sách.

## Tuyên bố sản phẩm
Bộ skill dùng để phân tích cấu trúc viral của video tham chiếu, xây kịch bản **mới** và sản xuất nội dung có ý nghĩa riêng. Không phải bộ công cụ sao chép video/phim trái phép hoặc lách kiếm tiền.

## Công cụ nên kết nối
1. YouTube Data API (Google): metadata công khai; YouTube Analytics API / Windsor YouTube cho số liệu chủ kênh sau OAuth.
2. PySceneDetect: phát hiện chuyển cảnh file được cấp quyền.
3. FFmpeg/ffprobe: kỹ thuật video/âm thanh, QA file được cấp quyền.
4. whisper.cpp hoặc faster-whisper: transcript tệp được cấp quyền.
5. Remotion: dựng video bằng ReactJS, phù hợp template/automation; **cần kiểm tra license công ty**.
6. Google Flow/Veo/CapCut: quay dựng sáng tạo và hậu kỳ; chỉ tích hợp nếu sẵn quyền sử dụng.

## Tài liệu chính thức
- https://support.google.com/youtube/answer/1311392 (reused & inauthentic content)
- https://support.google.com/youtube/answer/13429240 (expanded YPP)
- https://support.google.com/youtube/answer/72851 (YPP thresholds)
- https://support.google.com/youtube/answer/3056283 (channel transfer risks)
- https://support.google.com/youtube/answer/2533300 (minimum age/payment)
- https://developers.google.com/youtube/data/getting-started (YouTube Data API)
- https://developers.google.com/youtube/analytics/metrics (Analytics)

## Mã nguồn tham khảo (ưu tiên repo chính chủ)
- https://github.com/Breakthrough/PySceneDetect
- https://github.com/FFmpeg/FFmpeg
- https://github.com/ggml-org/whisper.cpp
- https://github.com/remotion-dev/skills
- https://github.com/remotion-dev/remotion

## Đề xuất tích hợp cho dự án
- 01–04–06 là tầng tư duy/kiểm soát, triển khai đầu tiên mà không cần cài mã nguồn lạ.
- 02–05 cần môi trường máy chủ/worker mới chạy được file media, có checkpoint quyền và kiểm toán code/dependency.
- 07 dùng YouTube Analytics của chủ kênh; 08 dùng báo cáo kế toán và dashboard đã cấp phép.

## Quy trình nghiệm thu cài đặt
1. Chọn Agent runtime/máy đích và kiểm tra quyền install.
2. Quét mã nguồn repo, xác nhận licence và pin phiên bản, không chạy lệnh không kiểm tra.
3. Copy folder `SKILL.md` vào skill registry đúng chuẩn runtime, cập nhật canonical_skill_id.
4. Test UAT theo router, lưu video/CSV/reports + audit logs.
5. Duyệt mới ghi `INSTALLED`, `UAT_PASS`, `PRODUCTION` riêng từng trạng thái.

> Để dùng ngay trong phiên chat, tải và cung cấp `ROUTER_SKILL.md` hoặc nội dung 1 skill tương ứng; để chạy tự động bằng AI Agent cần cài ở môi trường Agent đích.