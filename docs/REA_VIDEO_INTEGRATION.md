# Tích hợp rea-video (JuneYaooo/rea-video)

**Trạng thái:** Đã thêm adapter `.agents/skills/rea-video/SKILL.md` cho agent trong repository. **Chưa cài Python CLI, chưa tải mô hình OCR/ASR, chưa chạy UAT với video**.

- Repo upstream: https://github.com/JuneYaooo/rea-video
- Commit kiểm tra: `126b1a1e9b29443e76ca1b5fe95d67f84ce024d4`
- License: Apache-2.0
- Skill upstream: `skills/rea-video/SKILL.md`.
- Điểm đáng chú ý: báo cáo phân cảnh `report.html`, mô tả nhiều tầng `VIDEO.md`, `breakdown.json`, storyboard. Python >=3.10, ffmpeg/ffprobe; một số tính năng cài thêm OCR/ASR và có thể tải mô hình từ xa.

## Cách triển khai CLI sau khi kiểm tra môi trường phát triển
1. Kiểm tra Python/ffmpeg, quyền media và nguồn mã; chỉ chạy trong venv/container riêng.
2. Dùng bản commit ghim, rà `scripts/install_skill.sh` và các phụ thuộc trong `pyproject.toml` trước khi cài.
3. Không chạy script upstream trực tiếp trên máy production. Có thể cài trong môi trường thử bằng Python pip từ source sau khi kiểm tra dependency, nhưng xác nhận được quyền và môi trường mới thực hiện.
4. UAT 1 video sở hữu/có quyền: lấy bản đồ cảnh, `VIDEO.md`, `report.html` rồi soát kết quả bằng người.
5. Kiểm thử phối hợp `rea-video` → `viral-script-rebuilder` → `ai-video-production-director` → `youtube-monetization-auditor`.

## Các trạng thái cần phân biệt
- `REPO_INSTALLED`: file skill có trên nhánh mặc định GitHub.
- `CLI_INSTALLED`: rea-video executable/dependencies chạy được trên môi trường host.
- `UAT_PASS`: đã kiểm bằng video có quyền và đối chiếu kết quả.
- `PRODUCTION`: chạy đúng lịch, người duyệt, giám sát lỗi và chi phí.

Chỉ đánh dấu đạt trạng thái khi có bằng chứng từ host/runtime. Không sao chép video có bản quyền để đăng lại.
