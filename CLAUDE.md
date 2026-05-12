# CLAUDE.md — content-ai-platform

## 1. Sản phẩm này là gì

Dashboard SPA demo cho **MKT Software** — platform tạo & duyệt content AI cho agency.
Trạng thái: **v1.1 mockup** — 12 view, Approval Queue, responsive.
Score hiện tại: 8.5/10. Known issue: HEX divergence vs `../_brand/tokens.css` (TODO migrate).

## 2. Stack & cấu trúc

- Stack: Vanilla HTML/CSS/JS, no bundler
- `index.html` — SPA entry, tất cả view trong 1 file
- `assets/js/app.js` — logic
- `assets/css/styles.css` — styles
- `assets/css/tokens.css` — LOCAL copy của brand tokens (⚠ có drift vs workspace canonical)
- `assets/img/icons.svg` — Lucide sprite (subset)
- `assets/img/logo/` — logo PNG

## 3. Quy tắc đặc thù

- `assets/css/tokens.css` là LOCAL copy — khi sửa brand phải sửa cả đây lẫn `../_brand/tokens.css`
- TODO: migrate HEX hardcode về `var(--vt-*)` (chưa làm)
- Approval Queue là feature core — không xoá/break flow này
- Lucide icons: đang dùng sprite SVG local, không load CDN

## Brand

```css
/* tokens.css local có trong assets/css/tokens.css */
/* ⚠ Verify vs ../_brand/tokens.css trước khi thêm màu mới */
```

Navy `#1E3A5F` · Blue `#2C5AA0` · Orange `#F5A623` · Teal `#3FB1B5` · Red `#E63946`
