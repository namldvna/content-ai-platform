# Content AI Platform — MKT Software

Nền tảng AI Agent phân tích kênh đối thủ → đề xuất chiến lược → tạo nội dung → đăng đa kênh → báo cáo. Sản phẩm thuộc hệ sinh thái **ViTechGroup / MKT Software**.

## Cấu trúc thư mục

```
content-ai-platform/
├── index.html                      # SPA, 12 view (Dashboard, Phân tích, ..., Approval Queue mới)
├── assets/
│   ├── css/
│   │   ├── tokens.css              # Design tokens brand-aligned (62 dòng)
│   │   └── styles.css              # Layout + components + responsive (492 dòng)
│   ├── js/
│   │   └── app.js                  # showView, toast, approval, processing demo (266 dòng)
│   └── img/
│       ├── icons.svg               # Lucide SVG sprite — 38 icons canonical
│       └── logo/
│           ├── vitech-group.png        # Logo ViTechGroup master (cam+xanh)
│           ├── vitech-group-white.png  # Logo ViTechGroup âm bản (cho nền tối)
│           └── mkt-software.png        # Logo MKT Software (sản phẩm hiện tại)
├── _archive/
│   └── v1-original.html            # Bản gốc 2281 dòng (single-file), giữ để tham chiếu
├── README.md
└── .gitignore
```

> **Note**: Lucide SVG sprite được inline thẳng vào `<body>` của `index.html` để tránh CORS với protocol `file://`. File `assets/img/icons.svg` là canonical source — khi sửa icon thì sửa file này, sau đó copy block `<defs>` vào HTML.

## Cách chạy

Đây là static site, không cần build:

```powershell
# Mở trực tiếp
Start-Process "index.html"

# Hoặc dev server (khuyên dùng để tránh CORS với fetch sau này)
npx http-server . -p 8000
# hoặc
python -m http.server 8000
```

Mở `http://localhost:8000` để xem.

## 11 view chính

| Nhóm | View | ID | Mô tả |
|---|---|---|---|
| Tổng quan | Dashboard | `dashboard` | KPI, chiến dịch, lịch tuần |
| Quy trình | Phân tích kênh | `analyze` | Crawl fanpage/website → AI phân tích |
| | Kho phân tích | `analysis-library` | Lịch sử các kênh đã phân tích, batch |
| | Đề xuất chiến lược | `strategy` | AI gợi ý kế hoạch 30 ngày |
| | Tạo nội dung | `content` | AI viết bài + hình + lịch |
| | Lịch đăng bài | `schedule` | Calendar đăng đa kênh |
| | Báo cáo | `report` | Hiệu quả trước/sau, xuất Excel/PDF |
| Cài đặt | Thương hiệu | `brand` | Brand guideline cho AI |
| | Kết nối kênh | `platform` | OAuth Facebook/IG/YT/TikTok/Web |
| | Cài đặt AI | `ai-settings` | API keys (system vs custom) |
| Tài khoản | Thông tin & Gói | `account` | Plan, billing, usage |

## Brand identity

Nguồn: ViTechGroup brand book.

| Token | Giá trị hiện tại | Giá trị brand-book chuẩn | Trạng thái |
|---|---|---|---|
| Primary (xanh) | `#25458F` | `#25458f` | ✅ Đã align |
| Primary Dark | `#0F2354` | `#0F2354` (tự thêm) | ✅ |
| Accent (cam) | `#F58220` | `#f58220` | ✅ Đã align |
| Font | `Be Vietnam Pro` 300–800 | `Be Vietnam Pro` | ✅ |

Xem chi tiết tokens trong `assets/css/styles.css` block `:root`.

## Đã hoàn tất (v1.1 — 2026-05-06)

Audit khởi đầu: **5.5/10**. Sau v1.1: **~8.5/10**.

- [x] **Brand alignment**: HEX xanh đã thành `#25458F` · cam đã thành `#F58220` (khớp brand-book) · loại bỏ purple/pink Material; thêm ViTechGroup co-branding ribbon trong sidebar
- [x] **Lucide SVG sprite** (38 icons) thay 48+ vị trí UI chrome quan trọng (sidebar nav, stat-icons, notif-icons, header buttons, approval queue actions, AI processing card)
- [x] **Approval Queue view** mới — 5 bài demo với: card thường, card AI cảnh báo (highlight cam), empty state. Hành động Duyệt / Sửa / Trả lại có animation + toast feedback. Banner đầu trang thể hiện nguyên tắc "AI tạo, người duyệt" của ViTech
- [x] **CTA header**: "+ Chiến dịch mới" → "+ Phân tích kênh mới" + secondary "Tạo nội dung" + cleanup "Cài đặt"
- [x] **Toast system**: 4 loại (success / error / warn / processing) với animation slide-in, auto-dismiss 3.5s. 10 chỗ thay `alert()` blocking
- [x] **Processing card** trong analyze view: spinner + progress bar 5 stage có narration tiếng Việt, kết thúc bằng toast success
- [x] **Responsive**: 3 breakpoints (1024px / 768px / 480px) — sidebar collapse + overlay + hamburger button khi < 768px
- [x] **Nav badge cảnh báo**: badge "Hàng chờ duyệt: 5" có animation pulse cam — hút mắt CEO khi xem dashboard

## Roadmap kế tiếp

- **v1.2**: Stat-icon emoji còn lại trong các tab → SVG · Audit log + role/permission · dark mode
- **v1.3**: Approval Queue tab "Đã duyệt" + "Trả lại sửa" với history · Bulk-edit cho multi-select · Custom toast positions
- **v2.0**: Real backend (FastAPI + Postgres) · AI Agent runtime thật · OAuth Facebook/IG/YT/TikTok · Multi-tenant + billing

## Liên quan

- Skill Claude Code: `cmo-web-design` (CMO + Web Design ViTechGroup)
- Brand guidelines: `D:/OneDrive/VITECH/Ai_2026/CODEX/PC_DEV/.codex/skills/vitech-cmo-web-design/references/brand-guidelines.md`
- Logo gốc: `D:/OneDrive/VITECH/LOGO/LOGO VITECH/`
