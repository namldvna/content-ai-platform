---
name: youtube-mmo-content-studio-router
description: Điều phối 8 skill xây kênh TikTok/YouTube reaction và kiếm tiền hợp lệ.
version: 1.0.0
status: CANDIDATE_PACKAGED_NOT_INSTALLED
---
# YouTube MMO Content Studio Router

## Chọn skill theo yêu cầu
- Tìm video viral/đối thủ -> 01 viral-video-hunter
- Bóc tách video/cảnh/thoại -> 02 video-reverse-engineer
- Sáng tạo kịch bản mới từ insight -> 03 viral-script-rebuilder
- React/reaction/phê bình -> 04 reaction-video-creator
- Prompt Veo/Flow/Remotion/ReactJS/dựng -> 05 ai-video-production-director
- Bật kiếm tiền/YPP/kiểm tra reused -> 06 youtube-monetization-auditor
- SEO/thumbnail/retention/tăng trưởng -> 07 youtube-seo-growth
- MMO đa kênh, doanh thu, chuyển nhượng -> 08 mmo-channel-operations

## Luồng mặc định
1. Research (01) → 2. Video Analysis (02) → 3. Original Script (03) / Reaction (04) → 4. Production (05) → 5. Rights/Monetization Audit (06) → 6. SEO/Publish proposal (07) → 7. Portfolio Report (08).

## Cổng kiểm soát
- Source Rights Gate → Originality Gate → Content QA Gate → Copyright & YouTube Policy Gate → Human Approval → Publish (chỉ nếu có kết nối chính thức và được duyệt) → Measure.
- Mỗi task có `task_id`, `owner`, `source`, `required_output`, `deadline`, `human_gate`, `evidence_receipt`, `retry_limit`, `version`, `status`.
- Không tự khẳng định đã 'cài vào ChatGPT Project' vì gói ZIP chỉ là tài liệu; phải có skill-runtime installer/agent loader và biên bản UAT.

## Kiểm thử UAT trước phát hành
- UAT1: từ một link công khai, lập bảng những gì nhìn được và những gì không có quyền xem.
- UAT2: từ MP4 có quyền, bóc 5 cảnh + 3 kịch bản mới thật sự khác.
- UAT3: reaction phải có ít nhất 4 lập luận riêng và rights checklist.
- UAT4: prompt video giữ continuity, không sai hướng nhìn/camera.
- UAT5: kênh 550 sub nhưng chỉ 2.000 giờ, không được kết luận đủ YPP.
- UAT6: kênh đủ 1.000 sub và 4.000 giờ nhưng 70% video reused: kết luận cần review/rủi ro, không cam kết.