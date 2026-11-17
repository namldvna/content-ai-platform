---
name: mmo-channel-operations
description: "Vận hành portfolio kênh YouTube minh bạch, theo dõi doanh thu hợp lệ, tài sản và chuyển giao kênh có kiểm toán."
version: 1.0.0
status: REPO_INSTALLED_UAT_PENDING
owner: project-xay-kenh-tiktok
---

# mmo-channel-operations

## Kích hoạt
Khi lập mô hình MMO/YouTube portfolio, phân vai nhiều kênh, hoạch định công suất, doanh thu, bán/chuyển giao kênh hợp lệ.
## Đầu vào
Danh sách kênh chủ sở hữu, niche, catalog video, quyền từng asset, team, chi phí tools/edit, thu nhập xác nhận, điều khoản hợp tác.
## Quy trình
1. Tạo channel registry: `channel_id | owner | admin roles | niche | stage | policy_status | ypp_status | revenue_sources | rights_risk`.
2. Phân bổ 4 lane: research, content, production, publication QA; dashboard tổng gồm số video đạt QC, tỷ lệ tái làm, cost/video, effective revenue/video, estimated margin (có chi phí thật).
3. Tránh sản xuất tự động hàng loạt video gần như giống nhau; mỗi kênh cần định vị, người xem, chủ đề và sản phẩm/giá trị riêng.
4. Đa dạng dòng thu hợp lệ: quảng cáo YPP (khi đủ điều kiện), affiliate theo quy định và minh bạch tài trợ, sản phẩm số/dịch vụ hợp pháp. Không bảo đảm RPM.
5. Nếu cần **sell/chuyển nhượng kênh**: kiểm tra hợp đồng/quyền sở hữu video, giấy phép, doanh thu/tax, strikes, nghĩa vụ tồn đọng, Brand Account ownership; tham khảo hướng dẫn chính thức về transfer và đánh giá điều khoản hiện hành. Không mua bán mật khẩu hoặc lách xác thực/bật kiếm tiền.
6. Cổng phê duyệt: đăng video, điều chỉnh quyền truy cập, mua tài khoản, bán/chuyển chủ kênh, ký hợp đồng, tích hợp thanh toán => người sở hữu duyệt.
## Chuẩn đầu ra
`CHANNEL_REGISTRY.csv`, `PORTFOLIO_SCORECARD.md`, `P&L_TEMPLATE.csv`, `TRANSFER_DUE_DILIGENCE.md`, RACI và SOP tuần.
## QA
Không gọi số liệu mô phỏng là dữ liệu đã kết nối; không tự động bán/chuyển tài khoản hoặc rút tiền.

## Quy tắc bắt buộc áp dụng chung
- Phân biệt rõ DỮ LIỆU XÁC THỰC, SUY LUẬN, ĐỀ XUẤT. Tuyệt đối không tự bịa view, retention, RPM, điều kiện YPP hoặc trạng thái bản quyền.
- Chỉ đọc/phân tích file video người dùng sở hữu, được cấp phép hoặc có quyền xử lý; với video đối thủ, ưu tiên metadata công khai, mô tả, phụ đề được cung cấp hợp lệ và quan sát trực tiếp. Không tìm cách vượt DRM, paywall, quyền truy cập hay cơ chế bảo vệ của nền tảng.
- Không sao chép nguyên văn lời thoại, cốt truyện, đoạn phim, hình nhân vật, thumbnail, âm thanh/giọng nhận diện người khác khi thiếu quyền. Khai thác *nguyên lý* hiệu quả rồi tạo nội dung độc lập, có ý tưởng, cách thể hiện và giá trị mới.
- Reaction/critique phải có bình luận có thực chất; kiểm tra bản quyền riêng với chính sách reused/inauthentic content. Không khẳng định 'đổi giọng/crop/mirror/tăng tốc' đủ để bật kiếm tiền.
- Nếu tài liệu đầu vào thiếu, đánh dấu `UNKNOWN`, vẫn đưa bản đề xuất có giả định công khai. Không tự đăng, kết nối tài khoản, chuyển kênh, kích hoạt kiếm tiền hoặc chi tiền nếu chưa được phê duyệt.
- Ghi task_id, source_url, source_rights, model_version, human_approver, asset_manifest, expected_output, qa_status, last_reviewed_at. Nếu lỗi phải nêu blocker và cách xử lý.