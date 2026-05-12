  /* ========== Toast system ========== */
  const ICONS = {
    success: 'i-check-circle',
    error:   'i-alert',
    warn:    'i-alert',
    info:    'i-info',
    processing: 'i-bot'
  };
  function showToast(opts) {
    const { type = 'info', title = '', msg = '', duration = 3500 } = (typeof opts === 'string') ? { msg: opts } : opts;
    const stack = document.getElementById('toastStack');
    if (!stack) { console.log('[toast]', type, title, msg); return; }
    const el = document.createElement('div');
    el.className = 'toast ' + type;
    el.innerHTML =
      '<svg class="icon-svg t-icon"><use href="#' + (ICONS[type] || 'i-info') + '"/></svg>' +
      '<div class="t-body">' +
        (title ? '<div class="t-title">' + escapeHtml(title) + '</div>' : '') +
        '<div class="t-msg">' + escapeHtml(msg) + '</div>' +
      '</div>' +
      '<button class="t-close" aria-label="Đóng"><svg class="icon-svg"><use href="#i-x"/></svg></button>';
    el.querySelector('.t-close').onclick = () => dismissToast(el);
    stack.appendChild(el);
    if (duration > 0) setTimeout(() => dismissToast(el), duration);
    return el;
  }
  function dismissToast(el) {
    if (!el || el.classList.contains('is-hide')) return;
    el.classList.add('is-hide');
    setTimeout(() => el.remove(), 220);
  }
  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  }

  /* ========== View routing ========== */
  const views = {
    dashboard:          ['Dashboard', 'Tổng quan hệ thống'],
    analyze:            ['Phân tích kênh', 'Crawl & phân tích fanpage, website đối thủ'],
    'analysis-library': ['Kho phân tích', 'Xem lại lịch sử tất cả kênh đã phân tích'],
    strategy:           ['Đề xuất chiến lược', 'AI gợi ý nội dung & lịch đăng'],
    content:            ['Tạo nội dung', 'AI tạo bài viết, kịch bản, hình ảnh'],
    approval:           ['Hàng chờ duyệt', 'Bài AI tạo · cần duyệt trước khi đăng'],
    schedule:           ['Lịch đăng bài', 'Tự động đăng theo lịch'],
    report:             ['Báo cáo', 'Xuất Excel & phân tích hiệu suất'],
    brand:              ['Cài đặt thương hiệu', 'Tone of voice & brand guideline'],
    'ai-standards':     ['Tiêu chuẩn AI', 'Bài mẫu, banner & quy tắc Do/Don\'t để AI học'],
    platform:           ['Kết nối kênh', 'Facebook, Instagram, YouTube, Website'],
    'ai-settings':      ['Cài đặt AI', 'Quản lý API key các dịch vụ AI'],
    account:            ['Tài khoản', 'Thông tin cá nhân, bảo mật & gói dịch vụ']
  };
  function showView(id) {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    const view = document.getElementById('view-' + id);
    if (view) view.classList.add('active');
    if (views[id]) {
      document.getElementById('header-title').textContent = views[id][0];
      document.getElementById('header-sub').textContent = views[id][1];
    }
    document.querySelectorAll('.nav-item').forEach(n => {
      if (n.getAttribute('onclick') && n.getAttribute('onclick').includes("'" + id + "'")) {
        n.classList.add('active');
      }
    });
    // Close mobile sidebar after navigation
    document.body.classList.remove('sidebar-open');
  }
  // A2: expose showView on window immediately so wrapper below can reference it safely
  window.showView = showView;

  /* ========== Sidebar toggle (mobile / collapse) ========== */
  function toggleSidebar() {
    document.body.classList.toggle('sidebar-open');
  }

  /* ========== Report modal ========== */
  const reportData = {
    mktsoftware: { title: 'Báo cáo phân tích: facebook.com/mktsoftware', sub: 'Fanpage · Phân tích 30 ngày · Cập nhật 14:32 hôm nay' },
    getfly:      { title: 'Báo cáo phân tích: facebook.com/getfly.crm',  sub: 'Fanpage · Phân tích 30 ngày · Cập nhật 14:32 hôm nay' },
    compare:     { title: 'So sánh toàn bộ đối thủ', sub: '3 nguồn · facebook.com/mktsoftware, getfly.crm, sapo.vn/blog' }
  };
  function openReport(key) {
    const d = reportData[key] || reportData.mktsoftware;
    document.getElementById('modalTitle').textContent = d.title;
    document.getElementById('modalSub').textContent = d.sub;
    if (key === 'compare') {
      switchTab('tab-compare', document.querySelectorAll('.modal-tab')[3]);
    } else {
      switchTab('tab-overview', document.querySelectorAll('.modal-tab')[0]);
    }
    document.getElementById('reportModal').classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeReport() {
    document.getElementById('reportModal').classList.remove('open');
    document.body.style.overflow = '';
  }
  function switchTab(panelId, tabEl) {
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.modal-tab').forEach(t => t.classList.remove('active'));
    document.getElementById(panelId).classList.add('active');
    if (tabEl) tabEl.classList.add('active');
  }

  /* ========== Export (toast feedback) ========== */
  function exportFile(type) {
    const labels = { excel: 'Excel (.xlsx)', pdf: 'PDF', csv: 'CSV' };
    const t = showToast({ type: 'processing', title: 'Đang xuất ' + labels[type], msg: 'AI đang tổng hợp dữ liệu, file sẽ tự tải về sau ~10s...', duration: 0 });
    setTimeout(() => {
      dismissToast(t);
      showToast({ type: 'success', title: 'Đã xuất ' + labels[type], msg: 'Trong sản phẩm thật, file sẽ tải về ngay. Đây là demo.' });
    }, 1800);
  }

  // A5: Escape đóng tất cả modal/popover
  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    closeReport();
    const cc = document.getElementById('createContentModal');
    if (cc && cc.classList.contains('open')) { cc.classList.remove('open'); document.body.style.overflow = ''; }
    schCloseAddModal();
    schClosePopover();
  });

  /* ========== Channel list (analyze view) ========== */
  /* NOTE: duplicate selectChannel (old — CSS-only, no CH_DATA) removed — Fix A1 */
  function toggleAll(cb) {
    document.querySelectorAll('#view-analyze .ch-item input[type=checkbox]').forEach(c => { c.checked = cb.checked; });
    updateMulti();
  }
  function updateMulti() {
    const checked = document.querySelectorAll('#view-analyze .ch-item input[type=checkbox]:checked').length;
    const banner = document.getElementById('multiBanner');
    if (checked > 1) { banner.style.display='flex'; document.getElementById('multiCount').textContent=checked; }
    else banner.style.display='none';
  }
  function clearMulti() {
    document.querySelectorAll('#view-analyze .ch-item input[type=checkbox]').forEach(c => c.checked = false);
    document.getElementById('multiBanner').style.display = 'none';
  }

  /* ========== Channel detail tabs ========== */
  function switchChTab(panelId, tabEl) {
    document.querySelectorAll('.ch-panel').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.ch-tab').forEach(t => t.classList.remove('active'));
    document.getElementById(panelId).classList.add('active');
    if (tabEl) tabEl.classList.add('active');
  }

  /* ========== Analysis library ========== */
  /* NOTE: duplicate filterLib (old — CSS-only, no row filter) removed — Fix A1 */
  function selectLibCh(rowEl, id, icon, name, type, typeKey, score, date, batch) {
    document.querySelectorAll('.lib-row').forEach(r => r.classList.remove('selected'));
    rowEl.classList.add('selected');
    document.getElementById('libDetailIcon').textContent = icon;
    document.getElementById('libDetailName').textContent = name;
    document.getElementById('libDetailScore').textContent = score;
    document.getElementById('libDetailDate').textContent = date;
    document.getElementById('libDetailBatch').textContent = batch;
    const typeBadge = document.getElementById('libDetailType');
    const classes = { fanpage:'type-fanpage', content:'type-content', video:'type-video', competitor:'type-competitor', brand:'type-brand' };
    typeBadge.className = 'ch-type-badge ' + (classes[typeKey] || 'type-fanpage');
    typeBadge.textContent = type;
  }

  /* ========== Account tabs ========== */
  function switchAccTab(panelId, tabEl) {
    document.querySelectorAll('.acc-panel').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.acc-tab').forEach(t => t.classList.remove('active'));
    document.getElementById(panelId).classList.add('active');
    if (tabEl) tabEl.classList.add('active');
  }

  /* ========== AI settings: system vs custom key ========== */
  function setApiMode(service, mode, btn) {
    const wrap = btn.closest('.api-card');
    wrap.querySelectorAll('.api-mode-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const keyDiv = document.getElementById('key-' + service);
    const sysDiv = document.getElementById('system-' + service);
    if (mode === 'custom') { if(keyDiv) keyDiv.style.display='block'; if(sysDiv) sysDiv.style.display='none'; }
    else { if(keyDiv) keyDiv.style.display='none'; if(sysDiv) sysDiv.style.display='block'; }
  }
  function toggleKeyVisibility(btn) {
    const input = btn.previousElementSibling;
    if (input.type === 'password') { input.type = 'text'; btn.innerHTML = '<svg class="icon-svg"><use href="#i-eye-off"/></svg>'; }
    else { input.type = 'password'; btn.innerHTML = '<svg class="icon-svg"><use href="#i-eye"/></svg>'; }
  }
  function testKey(service) {
    const t = showToast({ type: 'processing', title: 'Đang kiểm tra ' + service, msg: 'Gửi request thử nghiệm tới API...', duration: 0 });
    setTimeout(() => {
      dismissToast(t);
      showToast({ type: 'success', title: 'Kết nối thành công', msg: 'API key của ' + service + ' hợp lệ.' });
    }, 1200);
  }
  function setImageProvider(p) {
    showToast({ type: 'success', title: 'Đã chọn nhà cung cấp ảnh', msg: p });
  }

  /* ========== Content bundle tabs ========== */
  function switchBundleTab(tabEl, panelId) {
    const bundle = tabEl.closest('.content-bundle');
    bundle.querySelectorAll('.bundle-tab').forEach(t => t.classList.remove('active'));
    bundle.querySelectorAll('.bundle-content').forEach(p => p.style.display = 'none');
    tabEl.classList.add('active');
    const panel = document.getElementById(panelId);
    if (panel) panel.style.display = 'block';
  }

  /* ========== Approval Queue actions ========== */
  function approvePost(rowEl, name) {
    rowEl.style.transition = 'all 0.3s ease';
    rowEl.style.opacity = '0';
    rowEl.style.transform = 'translateX(20px)';
    setTimeout(() => {
      rowEl.remove();
      showToast({ type: 'success', title: 'Đã duyệt — đang lên lịch đăng', msg: name });
      updateApprovalCount();
    }, 280);
  }
  function rejectPost(rowEl, name) {
    rowEl.style.transition = 'all 0.3s ease';
    rowEl.style.opacity = '0.5';
    setTimeout(() => {
      rowEl.remove();
      showToast({ type: 'warn', title: 'Đã từ chối', msg: name + ' — gửi lại brief để AI sửa lại.' });
      updateApprovalCount();
    }, 280);
  }
  function updateApprovalCount() {
    const remaining = document.querySelectorAll('#approvalRows .approval-row').length;
    document.querySelectorAll('.nav-item .nav-badge-warn').forEach(b => b.textContent = remaining);
    // Fix 2: sync #abPending counter in approval banner
    const abPending = document.getElementById('abPending');
    if (abPending) abPending.textContent = remaining;
    if (remaining === 0) {
      const empty = document.getElementById('approvalEmpty');
      if (empty) empty.style.display = 'block';
    }
  }

  /* A6 + C1: Approve all — disable button chống double-click, 1 toast tổng thay vì N toast riêng */
  function approveAll() {
    const rows = [...document.querySelectorAll('#approvalRows .approval-row')];
    if (rows.length === 0) return;
    const total = rows.length;
    // A6: disable nút tránh double-click
    const btn = document.querySelector('[onclick="approveAll()"]');
    if (btn) btn.disabled = true;
    rows.forEach((row, i) => {
      setTimeout(() => {
        // C1: animate riêng từng row nhưng không fire toast riêng
        row.style.transition = 'all 0.3s ease';
        row.style.opacity = '0';
        row.style.transform = 'translateX(20px)';
        setTimeout(() => {
          row.remove();
          updateApprovalCount();
          if (i === total - 1) {
            // C1: 1 toast tổng duy nhất
            showToast({ type: 'success', title: 'Đã duyệt ' + total + ' bài', msg: 'Đang lên lịch đăng tự động.' });
            if (btn) setTimeout(() => { btn.disabled = false; }, 500);
          }
        }, 280);
      }, i * 120);
    });
  }

  /* Fix 4: Filter approval by platform */
  let _approvalFilterOpen = false;
  function toggleApprovalFilter() {
    let dd = document.getElementById('approvalFilterDropdown');
    if (dd) { dd.remove(); _approvalFilterOpen = false; return; }
    _approvalFilterOpen = true;
    dd = document.createElement('div');
    dd.id = 'approvalFilterDropdown';
    dd.style.cssText = 'position:absolute;top:calc(100% + 4px);right:0;background:var(--white);border:1.5px solid var(--border);border-radius:8px;box-shadow:var(--shadow);z-index:200;min-width:160px;overflow:hidden';
    const opts = [['all','Tất cả'],['fb','Facebook'],['ig','Instagram'],['yt','YouTube'],['web','Website']];
    opts.forEach(([val, label]) => {
      const btn = document.createElement('button');
      btn.style.cssText = 'display:block;width:100%;text-align:left;padding:9px 14px;border:none;background:transparent;font-size:13px;cursor:pointer;font-family:inherit;';
      btn.textContent = label;
      btn.onmouseenter = () => btn.style.background = 'var(--bg-soft)';
      btn.onmouseleave = () => btn.style.background = 'transparent';
      btn.onclick = () => {
        document.querySelectorAll('#approvalRows .approval-row').forEach(row => {
          row.style.display = (val === 'all' || (row.dataset.platform || '') === val) ? '' : 'none';
        });
        // C2: cập nhật label nút Lọc theo filter đang active
        const filterBtn = document.getElementById('approvalFilterBtn');
        if (filterBtn) filterBtn.textContent = (label === 'Tất cả') ? '🔽 Lọc' : '🔽 Lọc: ' + label;
        dd.remove(); _approvalFilterOpen = false;
      };
      dd.appendChild(btn);
    });
    const filterBtn = document.getElementById('approvalFilterBtn');
    filterBtn.parentElement.style.position = 'relative';
    filterBtn.parentElement.appendChild(dd);
    setTimeout(() => document.addEventListener('mousedown', function close(e) {
      if (!dd.contains(e.target)) { dd.remove(); _approvalFilterOpen = false; document.removeEventListener('mousedown', close); }
    }), 0);
  }

  /* Fix 5: Add analyze channel handler */
  function addAnalyzeChannel() {
    const inp = document.querySelector('#view-analyze .input-field[type=text]');
    const url = inp ? inp.value.trim() : '';
    if (!url) { showToast({type:'warn', msg:'Hãy dán link fanpage hoặc website cần phân tích.'}); return; }
    if (inp) inp.value = '';
    startAnalyzeDemo();
  }

  /* Fix 6 + C5: filterLib — ẩn/hiện row theo data-type + hiện empty state khi 0 kết quả */
  function filterLib(type, btn) {
    document.querySelectorAll('.lib-filter-btn, .lib-stat').forEach(el => el.classList.remove('active'));
    if (btn) btn.classList.add('active');
    document.querySelectorAll('.lib-row').forEach(row => {
      row.style.display = (!type || type === 'all' || row.dataset.type === type) ? '' : 'none';
    });
    // C5: hiện empty state nếu 0 row visible
    const visible = document.querySelectorAll('#libRows .lib-row:not([style*="none"])').length;
    const libEmpty = document.getElementById('libEmpty');
    if (libEmpty) libEmpty.style.display = visible === 0 ? 'block' : 'none';
  }

  /* Fix 7 + C5: Search kho phân tích + empty state */
  function filterLibSearch(q) {
    const term = q.toLowerCase();
    document.querySelectorAll('.lib-row').forEach(row => {
      const name = (row.querySelector('.lib-ch-name') || row).textContent.toLowerCase();
      row.style.display = name.includes(term) ? '' : 'none';
    });
    // C5: hiện empty state nếu 0 row visible
    const visible = document.querySelectorAll('#libRows .lib-row:not([style*="none"])').length;
    const libEmpty = document.getElementById('libEmpty');
    if (libEmpty) libEmpty.style.display = visible === 0 ? 'block' : 'none';
  }

  /* Fix 8: selectChannel loads data vào detail panel */
  const CH_DATA = {
    mkt:    { icon:'📘', name:'facebook.com/mktsoftware', score:'8.2', posts:'45', eng:'2,300', rate:'4.2%', followers:'128K', reportKey:'mktsoftware' },
    getfly: { icon:'📘', name:'facebook.com/getfly.crm',  score:'7.5', posts:'30', eng:'1,800', rate:'3.8%', followers:'87K',  reportKey:'getfly' },
    sapo:   { icon:'🌐', name:'sapo.vn/blog',             score:'7.1', posts:'22', eng:'950',   rate:'2.1%', followers:'—',    reportKey:'compare' }
  };
  function selectChannel(key) {
    document.querySelectorAll('.ch-item').forEach(el => el.classList.remove('selected'));
    const el = document.getElementById('ch-' + key);
    if (el) el.classList.add('selected');
    const d = CH_DATA[key]; if (!d) return;
    const set = (id, val) => { const e = document.getElementById(id); if(e) e.textContent = val; };
    set('chDetailIcon', d.icon); set('chDetailName', d.name); set('chDetailScore', d.score);
    const cards = document.querySelectorAll('#cht-overview .stat-value');
    if (cards[0]) cards[0].textContent = d.posts;
    if (cards[1]) cards[1].textContent = d.eng;
    if (cards[2]) cards[2].textContent = d.rate;
    if (cards[3]) cards[3].textContent = d.followers;
    // A4: dùng onclick property thay setAttribute để tránh XSS-prone pattern
    const reportBtn = document.querySelector('#view-analyze .ch-detail .btn-ghost');
    if (reportBtn) reportBtn.onclick = () => openReport(d.reportKey);
  }

  /* C3: Combined filter — platform AND status cùng lúc */
  let _contentFilter = { platform: 'all', status: 'all' };

  function applyContentFilters() {
    document.querySelectorAll('#view-content .content-card').forEach(card => {
      const platOK = _contentFilter.platform === 'all' || card.dataset.platform === _contentFilter.platform;
      const statOK = _contentFilter.status === 'all' || card.dataset.status === _contentFilter.status;
      card.style.display = (platOK && statOK) ? '' : 'none';
    });
  }
  function filterContent(platform, btn) {
    _contentFilter.platform = platform || 'all';
    document.querySelectorAll('#view-content .content-filter-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    applyContentFilters();
  }
  function filterContentStatus(select) {
    _contentFilter.status = select.value || 'all';
    applyContentFilters();
  }

  /* Fix 10: Save brand settings */
  function saveBrandSettings() {
    showToast({type:'success', title:'Đã lưu cài đặt thương hiệu', msg:'Tone of voice & brand guideline đã được cập nhật.'});
  }

  /* Fix 11: Tone tag toggle */
  function toggleToneTag(el) {
    el.classList.toggle('tag-blue');
    el.classList.toggle('tag-gray');
  }

  /* Fix 13: Calendar side stats computed from SCH.posts */
  function schUpdateSideStats() {
    const range = schCurrentRange();
    const visible = schGetVisiblePosts().filter(p => p.date >= range.from && p.date <= range.to);
    const counts = {fb:0, ig:0, yt:0, web:0};
    visible.forEach(p => { if(counts[p.platform] !== undefined) counts[p.platform]++; });
    const el = document.getElementById('schSideStats');
    if (!el) return;
    const maxCount = Math.max(1, ...Object.values(counts));
    el.innerHTML = Object.entries(counts).map(([k,v]) =>
      '<div class="report-metric">' +
      '<div class="metric-label">' + (SCH_PLATFORM_LABEL[k]||k) + '</div>' +
      '<div class="metric-bar-wrap"><div class="metric-bar metric-' + k + '" style="width:' + Math.round(v/maxCount*100) + '%"></div></div>' +
      '<div class="metric-val">' + v + ' bài</div></div>'
    ).join('');
  }

  /* Fix 19: Date range filter Báo cáo */
  function filterReport(range) {
    const labels = {'7d':'7 ngày qua','30d':'30 ngày qua','month':'Tháng này'};
    const mock = {'7d':[12,28400,820,68],'30d':[48,124000,3200,287],'month':[35,96000,2400,201]};
    const data = mock[range] || mock['30d'];
    const t = showToast({type:'processing', title:'Đang tải báo cáo', msg:labels[range]||range, duration:0});
    setTimeout(() => {
      dismissToast(t);
      const cards = document.querySelectorAll('#view-report .stat-value');
      const vals = [String(data[0]), (data[1]/1000).toFixed(0)+'K', data[2].toLocaleString('vi-VN'), String(data[3])];
      vals.forEach((v,i) => { if(cards[i]) cards[i].textContent = v; });
      showToast({type:'success', msg:'Đã tải báo cáo '+(labels[range]||range)});
    }, 1200);
  }

  /* Fix 20: Email report — uses notif settings */
  function emailReport() {
    const s = getNotifSettings();
    const dateRange = (document.getElementById('reportDateRange') || {}).value || '30d';
    const labels = {'7d':'7 ngày qua','30d':'30 ngày qua','month':'Tháng này'};
    const subject = '[MKT Software] Báo cáo hiệu suất — ' + (labels[dateRange] || 'Báo cáo');
    const body = 'BÁO CÁO HIỆU SUẤT — ' + (labels[dateRange] || '') + '\n\n'
      + '📊 Bài đã đăng: 48\n'
      + '👥 Tổng tiếp cận: 124,000\n'
      + '❤️  Tương tác: 3,200\n'
      + '🔗 Click: 287\n\n'
      + 'Top kênh: Facebook (18 bài) · Instagram (12 bài)\n\n'
      + 'Xuất từ MKT Software — ' + new Date().toLocaleDateString('vi-VN') + '\n'
      + '— Tự hào Công nghệ Việt';
    sendEmailReport(subject, body);
  }

  /* Fix 17: Create content modal */
  function openCreateContentModal() {
    const existing = document.getElementById('createContentModal');
    if (existing) { existing.classList.add('open'); document.body.style.overflow='hidden'; return; }
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay open';
    overlay.id = 'createContentModal';
    overlay.innerHTML =
      '<div class="modal" style="max-width:480px">' +
      '<div class="modal-header"><h2>Tạo nội dung mới</h2>' +
      '<button class="modal-close" onclick="document.getElementById(\'createContentModal\').classList.remove(\'open\');document.body.style.overflow=\'\'"><svg class="icon-svg"><use href="#i-x"/></svg></button></div>' +
      '<div class="modal-body">' +
      '<div class="input-group"><label class="input-label">Chủ đề / Brief</label>' +
      '<input class="input-field" id="ccmTopic" placeholder="VD: Hướng dẫn setup MKT Software trong 10 phút"></div>' +
      '<div class="input-group"><label class="input-label">Kênh</label>' +
      '<select class="input-field" id="ccmChannel"><option value="fb">Facebook</option><option value="ig">Instagram</option><option value="yt">YouTube</option><option value="web">Website</option></select></div>' +
      '<div class="input-group"><label class="input-label">Tone</label>' +
      '<select class="input-field" id="ccmTone"><option>Chuyên nghiệp</option><option>Thân thiện</option><option>Truyền cảm hứng</option><option>Bán hàng</option></select></div>' +
      '</div>' +
      '<div class="modal-footer">' +
      '<button class="btn btn-outline" onclick="document.getElementById(\'createContentModal\').classList.remove(\'open\');document.body.style.overflow=\'\'">Huỷ</button>' +
      '<button class="btn btn-accent" onclick="_submitCreateContent()"><svg class="icon-svg"><use href="#i-bot"/></svg> AI tạo ngay</button>' +
      '</div></div>';
    overlay.onclick = function(e) { if(e.target === overlay) { overlay.classList.remove('open'); document.body.style.overflow=''; } };
    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';
  }
  function _submitCreateContent() {
    const topic = (document.getElementById('ccmTopic')||{}).value || '';
    if (!topic.trim()) { showToast({type:'warn', msg:'Hãy nhập chủ đề nội dung cần tạo.'}); return; }
    document.getElementById('createContentModal').classList.remove('open');
    document.body.style.overflow = '';
    const t = showToast({type:'processing', title:'AI đang tạo nội dung', msg:'"' + topic.slice(0,40) + (topic.length>40?'…':'') + '"', duration:0});
    setTimeout(() => {
      dismissToast(t);
      showToast({type:'success', title:'Tạo nội dung xong', msg:'Bài mới đã vào Hàng chờ duyệt — anh duyệt trước khi đăng.'});
    }, 2000);
  }

  /* Fix 18: Inline edit caption in approval row */
  function toggleEditCaption(btn, rowEl) {
    const existing = rowEl.querySelector('.ar-edit-area');
    if (existing) {
      existing.remove();
      const doneBtn = rowEl.querySelector('.ar-done-btn');
      if (doneBtn) doneBtn.remove();
      btn.textContent = 'Sửa nhanh';
      return;
    }
    const preview = rowEl.querySelector('.ar-preview');
    const ta = document.createElement('textarea');
    ta.className = 'ar-edit-area input-field';
    ta.style.cssText = 'width:100%;margin-top:8px;min-height:80px;font-size:13px';
    ta.value = preview ? preview.textContent.trim() : '';
    const doneBtn = document.createElement('button');
    doneBtn.className = 'btn btn-primary btn-sm ar-done-btn';
    doneBtn.style.marginTop = '6px';
    doneBtn.textContent = 'Lưu chỉnh sửa';
    doneBtn.onclick = () => {
      if (preview) preview.textContent = ta.value;
      ta.remove(); doneBtn.remove(); cancelBtn.remove();
      btn.textContent = 'Sửa nhanh';
      showToast({type:'success', msg:'Đã cập nhật caption.'});
    };
    // C4: nút Hủy cạnh nút Lưu
    const cancelBtn = document.createElement('button');
    cancelBtn.className = 'btn btn-ghost btn-sm';
    cancelBtn.style.cssText = 'margin-top:6px;margin-left:6px';
    cancelBtn.textContent = 'Hủy';
    cancelBtn.onclick = () => {
      ta.remove(); doneBtn.remove(); cancelBtn.remove();
      btn.textContent = 'Sửa nhanh';
    };
    rowEl.querySelector('.ar-body').appendChild(ta);
    rowEl.querySelector('.ar-body').appendChild(doneBtn);
    rowEl.querySelector('.ar-body').appendChild(cancelBtn);
    btn.textContent = 'Đóng';
  }

  /* Fix 1: Dashboard mini schedule render từ SCH.posts */
  function renderDashboardSchedule() {
    const grid = document.querySelector('#view-dashboard .schedule-grid');
    if (!grid) return;
    // A3: guard — seed data trước nếu chưa có (tránh race condition)
    if (!SCH.posts || SCH.posts.length === 0) schSeedData();
    const today = new Date();
    const monday = schStartOfWeek(today);
    const dayNames = ['T2','T3','T4','T5','T6','T7','CN'];
    const platIcon = {fb:'📘', ig:'📸', yt:'▶️', web:'🌐'};
    const platClass = {fb:'slot-fb', ig:'slot-ig', yt:'slot-yt', web:'slot-web'};

    let html = '';
    for (let i = 0; i < 7; i++) {
      const d = schAddDays(monday, i);
      const isToday = schSameDay(d, today);
      const isWeekend = d.getDay() === 0 || d.getDay() === 6;
      const dayPosts = SCH.posts.filter(p => schSameDay(p.date, d)).sort((a,b) => (a.hour*60+a.minute)-(b.hour*60+b.minute));
      const dateStr = d.getDate() + '/' + (d.getMonth()+1);
      const headerStyle = isToday ? 'background:var(--accent)' : (isWeekend ? 'background:#78909C' : '');
      const colStyle = isToday ? 'border:2px solid var(--accent);border-radius:8px' : '';

      html += '<div class="day-col" style="' + colStyle + '">';
      html += '<div class="day-header"' + (headerStyle ? ' style="' + headerStyle + '"' : '') + '>' + dayNames[i] + (isToday ? ' ★' : '') + '</div>';
      html += '<div class="day-date">' + dateStr + '</div>';
      html += '<div class="day-slots">';
      if (dayPosts.length === 0 && isWeekend) {
        html += '<div style="display:flex;align-items:center;justify-content:center;font-size:11px;color:var(--text-muted);padding-top:20px">Nghỉ</div>';
      } else {
        dayPosts.slice(0,3).forEach(p => {
          html += '<div class="slot-item ' + (platClass[p.platform]||'') + '">' + (platIcon[p.platform]||'') + ' ' + schFmtTime(p.hour, p.minute) + '</div>';
        });
      }
      html += '</div></div>';
    }
    grid.innerHTML = html;
  }

  /* ========== Analyze processing demo ========== */
  // A7: module-level ref để clear interval cũ trước khi tạo mới
  let _analyzeTick = null;

  function startAnalyzeDemo() {
    // A7: clear interval cũ nếu đang chạy (tránh double-trigger)
    if (_analyzeTick) { clearInterval(_analyzeTick); _analyzeTick = null; }
    const card = document.getElementById('analyzeProcessingCard');
    const fill = document.getElementById('analyzeProgress');
    const sub  = document.getElementById('analyzeProgressSub');
    if (!card || !fill) return;
    card.style.display = 'flex';
    let p = 0;
    const stages = [
      [15, 'Đang tải bài đăng 30 ngày gần nhất...'],
      [40, 'AI đang phân loại topic & tone...'],
      [65, 'Tính toán điểm engagement & giờ vàng...'],
      [88, 'Tổng hợp insight đối thủ...'],
      [100, 'Hoàn tất, đang ghi vào kho...']
    ];
    let i = 0;
    _analyzeTick = setInterval(() => {
      if (i >= stages.length) {
        clearInterval(_analyzeTick);
        _analyzeTick = null; // A7: reset ref sau khi done
        setTimeout(() => {
          card.style.display = 'none';
          showToast({ type: 'success', title: 'Phân tích hoàn tất', msg: '1 fanpage · 45 bài · 30 ngày — đã lưu vào kho.' });
        }, 400);
        return;
      }
      [p, sub.textContent] = [stages[i][0], stages[i][1]];
      fill.style.width = p + '%';
      i++;
    }, 600);
    showToast({ type: 'processing', title: 'AI bắt đầu phân tích', msg: 'Quá trình ~3-5 giây cho demo. Sản phẩm thật sẽ chạy ngầm.' });
  }

  /* ============================================================
     SCHEDULE — calendar v2
     - 3 modes: month / week / day
     - Time-axis 6h..23h, drag-drop reschedule (HTML5 native)
     - "+" button per cell → modal → adds slot
     - Slot click → mini popover (edit time, delete)
     - Conflict detect (same platform within 15 min)
     - Tooltip preview on 500ms hover
     - Filter chips per platform (multi-select)
     - Loading skeleton on mode switch (200ms)
     ============================================================ */
  const SCH = {
    mode: 'week',
    cursor: new Date(),               // anchor date for current navigation
    filters: new Set(['fb','ig','yt','web']),
    posts: [],                        // mock data
    queuePool: [],                    // approval-queue mock
    selectedPostId: null,
    dragId: null,
    tooltipTimer: null,
    tooltipEl: null,
    nowTimer: null
  };
  const SCH_HOURS_START = 6;
  const SCH_HOURS_END = 23;            // last hour shown
  const SCH_HOUR_PX = 56;              // matches .cal-day-cell height
  const SCH_VN_DAYS = ['CN','T2','T3','T4','T5','T6','T7'];
  const SCH_PLATFORM_LABEL = { fb:'Facebook', ig:'Instagram', yt:'YouTube', web:'Website' };
  const SCH_PLATFORM_DOT = { fb:'cal-chip-fb', ig:'cal-chip-ig', yt:'cal-chip-yt', web:'cal-chip-web' };
  const SCH_TYPE_EMOJI = { image:'📷', video:'📹', text:'📝', article:'📰', reel:'🎬' };

  function schStartOfDay(d) { const x = new Date(d); x.setHours(0,0,0,0); return x; }
  function schStartOfWeek(d) {
    // Monday = first day of week (VN convention)
    const x = schStartOfDay(d); const day = x.getDay(); const diff = (day === 0 ? -6 : 1 - day);
    x.setDate(x.getDate() + diff); return x;
  }
  function schAddDays(d, n) { const x = new Date(d); x.setDate(x.getDate() + n); return x; }
  function schSameDay(a, b) { return a.getFullYear()===b.getFullYear() && a.getMonth()===b.getMonth() && a.getDate()===b.getDate(); }
  function schFmtVNDate(d) { return d.getDate() + '/' + (d.getMonth()+1); }
  function schFmtTime(h, m) { return String(h).padStart(2,'0') + ':' + String(m||0).padStart(2,'0'); }
  function schKeyFromDate(d) { return d.getFullYear() + '-' + (d.getMonth()+1) + '-' + d.getDate(); }

  /* Mock data — relative to today so demo always looks fresh */
  function schSeedData() {
    const now = new Date(); const monday = schStartOfWeek(now);
    const mk = (offset, h, m, plat, type, title, caption) => ({
      id: 'p' + Math.random().toString(36).slice(2,8),
      date: schAddDays(monday, offset),
      hour: h, minute: m||0, platform: plat, type: type,
      title: title, caption: caption || ''
    });
    SCH.posts = [
      mk(0, 8, 0,  'fb',  'image',   'Top 5 lỗi quản lý nhân sự',         'Anh chị HR đang đau đầu vì onboarding lộn xộn? Bài hôm nay liệt kê 5 lỗi phổ biến...'),
      mk(0, 14, 30,'ig',  'reel',    'Reel ngắn — quy trình tự động',     '⚡ 30 giây tóm tắt cách MKT tự động hoá quy trình duyệt nội dung.'),
      mk(0, 20, 0, 'fb',  'video',   'Live demo MKT Software v2.4',       'Tối nay 20h, livestream demo tính năng AI mới — quà tặng 3 tài khoản Pro.'),
      mk(1, 9, 0,  'web', 'article', 'Bài blog: Marketing AI 2026',       'Năm 2026, marketing không AI = chậm chân. Bài này hệ thống 7 xu hướng MKT đang dùng cho khách hàng.'),
      mk(1, 9, 10, 'fb',  'text',    'Trích blog đẩy Fanpage',            'Trích đoạn từ bài blog mới — kéo về website đọc full.'),     // conflict 15min với post trên (cùng platform fb chỉ chênh 9:00 vs 9:10 là OK; nhưng cùng nền fb 9:00 + 9:10 → đây là test 2 fb gần nhau)
      mk(2, 11, 30,'ig',  'image',   'Carousel "5 dấu hiệu cần CRM"',     'Slide 1/5: Khi khách hàng "rớt" giữa chừng vì không có hệ thống...'),
      mk(2, 19, 0, 'yt',  'video',   'YouTube long form: Case study GetFly','30 phút phân tích case study GetFly — từ 0 đến 12 tỉ doanh thu/năm.'),
      mk(3, 10, 0, 'fb',  'image',   'Infographic: 7 KPI sống còn',       'Infographic 1 trang — lưu lại để báo cáo sếp.'),
      mk(3, 15, 0, 'web', 'article', 'Update changelog v2.4',             'Tính năng mới: tự động đăng đa kênh + hàng chờ duyệt + cảnh báo trùng giờ.'),
      mk(4, 8, 0,  'ig',  'reel',    'Reel happy Friday',                 'Cuối tuần vui — team MKT chia sẻ moment hậu trường.'),
      mk(4, 18, 30,'fb',  'text',    'Tóm tắt tuần',                      'Tổng kết tuần: 4 case mới, 12 bài đăng, 3 fanpage chốt deal.'),
      mk(-1, 7, 30,'fb', 'image',    'Bài thứ Hai tuần trước',            'Bài này đã đăng tuần trước, giữ lại để tham chiếu.'),
      mk(7, 9, 0,  'fb',  'image',   'Kế hoạch tuần sau',                 'Bài demo cho tuần kế tiếp.')
    ];
    SCH.queuePool = [
      { id:'q1', title:'AI Content Brief — chiến dịch tháng 6',  type:'article', plat:'web' },
      { id:'q2', title:'Reel: "3 phút setup MKT"',                type:'reel',    plat:'ig'  },
      { id:'q3', title:'Carousel: "Đừng để khách rời page"',      type:'image',   plat:'ig'  },
      { id:'q4', title:'Long-form FB: Case ngành F&B',            type:'text',    plat:'fb'  },
      { id:'q5', title:'YouTube short: Tip 60s tăng reach',       type:'video',   plat:'yt'  }
    ];
  }

  function schGetVisiblePosts() {
    return SCH.posts.filter(p => SCH.filters.has(p.platform));
  }

  /* Conflict: same platform & within ±15min on same day */
  function schDetectConflicts(posts) {
    const set = new Set();
    for (let i = 0; i < posts.length; i++) {
      for (let j = i+1; j < posts.length; j++) {
        const a = posts[i], b = posts[j];
        if (a.platform !== b.platform) continue;
        if (!schSameDay(a.date, b.date)) continue;
        const diff = Math.abs((a.hour*60 + a.minute) - (b.hour*60 + b.minute));
        if (diff <= 15) { set.add(a.id); set.add(b.id); }
      }
    }
    return set;
  }

  /* ===== Render dispatcher ===== */
  function schRender() {
    const vp = document.getElementById('schViewport');
    if (!vp) return;
    const empty = document.getElementById('schEmpty');
    if (empty) empty.style.display = 'none';

    schUpdateTitle();

    if (SCH.mode === 'week')  schRenderWeek(vp);
    else if (SCH.mode === 'day') schRenderDay(vp);
    else schRenderMonth(vp);

    // Empty banner if zero visible posts in current view range
    const range = schCurrentRange();
    const visible = schGetVisiblePosts().filter(p => p.date >= range.from && p.date <= range.to);
    if (visible.length === 0 && empty) empty.style.display = 'block';

    schStartNowLineTicker();
    schUpdateSideStats();
  }

  function schCurrentRange() {
    if (SCH.mode === 'week') {
      const start = schStartOfWeek(SCH.cursor);
      return { from: start, to: schAddDays(start, 6) };
    }
    if (SCH.mode === 'day') {
      const d = schStartOfDay(SCH.cursor);
      return { from: d, to: d };
    }
    const m = new Date(SCH.cursor.getFullYear(), SCH.cursor.getMonth(), 1);
    const last = new Date(SCH.cursor.getFullYear(), SCH.cursor.getMonth()+1, 0);
    return { from: m, to: last };
  }

  function schUpdateTitle() {
    const t = document.getElementById('schTitle'); if (!t) return;
    const c = SCH.cursor;
    if (SCH.mode === 'month') {
      t.textContent = 'Tháng ' + (c.getMonth()+1) + ', ' + c.getFullYear();
    } else if (SCH.mode === 'day') {
      t.textContent = SCH_VN_DAYS[c.getDay()] + ', ' + schFmtVNDate(c) + '/' + c.getFullYear();
    } else {
      const start = schStartOfWeek(c); const end = schAddDays(start, 6);
      t.textContent = 'Tuần ' + schFmtVNDate(start) + ' – ' + schFmtVNDate(end) + ', ' + end.getFullYear();
    }
  }

  /* ===== WEEK view ===== */
  function schRenderWeek(vp) {
    const start = schStartOfWeek(SCH.cursor);
    const days = Array.from({length:7}, (_,i) => schAddDays(start, i));
    const today = new Date();
    const conflicts = schDetectConflicts(schGetVisiblePosts());

    let html = '<div class="cal-week-grid" role="grid" aria-label="Lịch tuần">';
    // Header row: corner + 7 day headers
    html += '<div class="cal-col-head-corner" aria-hidden="true"></div>';
    days.forEach(d => {
      const isToday = schSameDay(d, today);
      html += '<div class="cal-col-head' + (isToday ? ' is-today' : '') + '" role="columnheader">'
        + '<span class="cal-day-name">' + SCH_VN_DAYS[d.getDay()] + '</span>'
        + '<span class="cal-day-num">' + d.getDate() + '/' + (d.getMonth()+1) + '</span>'
        + '</div>';
    });

    // Time rows
    for (let h = SCH_HOURS_START; h <= SCH_HOURS_END; h++) {
      html += '<div class="cal-time-cell">' + schFmtTime(h, 0) + '</div>';
      days.forEach((d, di) => {
        const isToday = schSameDay(d, today);
        const isWeekend = d.getDay() === 0 || d.getDay() === 6;
        const cellKey = schKeyFromDate(d) + '-' + h;
        html += '<div class="cal-day-cell'
          + (isToday ? ' is-today' : '')
          + (isWeekend ? ' is-weekend' : '')
          + '" data-date="' + schKeyFromDate(d) + '" data-hour="' + h + '" data-day-idx="' + di + '"'
          + ' ondragover="schOnDragOver(event)" ondragleave="schOnDragLeave(event)" ondrop="schOnDrop(event)">'
          + '<button class="cal-add-btn" onclick="schOpenAddModal(\'' + schKeyFromDate(d) + '\',' + h + ')" aria-label="Thêm bài"><svg class="icon-svg"><use href="#i-plus"/></svg></button>'
          + '</div>';
      });
    }

    // Weekend "rest" ribbon (only if column has 0 posts)
    html += '</div>';
    vp.innerHTML = html;

    // Place posts as absolutely-positioned slots inside their day cells
    schGetVisiblePosts()
      .filter(p => p.date >= start && p.date <= schAddDays(start, 6))
      .forEach(p => {
        const dayIdx = Math.floor((schStartOfDay(p.date) - start) / 86400000);
        const startCell = vp.querySelector('.cal-day-cell[data-day-idx="' + dayIdx + '"][data-hour="' + Math.floor(p.hour) + '"]');
        if (!startCell) return;
        const slot = document.createElement('div');
        slot.className = 'cal-slot plat-' + p.platform + (conflicts.has(p.id) ? ' is-conflict' : '');
        slot.dataset.postId = p.id;
        slot.draggable = true;
        slot.style.top = ((p.minute / 60) * SCH_HOUR_PX) + 'px';
        slot.style.height = (Math.max(28, SCH_HOUR_PX * 0.85)) + 'px';
        // Fix 16: conflict tooltip
        if (conflicts.has(p.id)) {
          slot.title = '⚠ Xung đột lịch: cùng kênh, cách bài kế < 15 phút';
        }
        slot.innerHTML = '<span class="cal-slot-time">' + schFmtTime(p.hour, p.minute) + '</span> '
          + '<span class="cal-slot-title"><span class="cal-slot-emoji">' + (SCH_TYPE_EMOJI[p.type]||'📝') + '</span>' + escapeHtml(p.title) + '</span>';
        slot.addEventListener('dragstart', schOnDragStart);
        slot.addEventListener('dragend', schOnDragEnd);
        slot.addEventListener('click', e => { e.stopPropagation(); schOpenPopover(p.id, slot); });
        slot.addEventListener('mouseenter', e => schScheduleTooltip(p, slot));
        slot.addEventListener('mouseleave', schHideTooltip);
        startCell.appendChild(slot);
      });

    // Empty weekend ribbon for columns with no posts
    days.forEach((d, di) => {
      if (d.getDay() !== 0 && d.getDay() !== 6) return;
      const has = schGetVisiblePosts().some(p => schSameDay(p.date, d));
      if (has) return;
      // mount ribbon at 9h cell of that column
      const cell = vp.querySelector('.cal-day-cell[data-day-idx="' + di + '"][data-hour="9"]');
      if (!cell) return;
      const ribbon = document.createElement('div');
      ribbon.className = 'cal-rest-ribbon';
      ribbon.innerHTML = '<div style="font-size:18px">🌿</div>'
        + '<div class="cal-rest-text">Nghỉ ngơi · Cuối tuần</div>'
        + '<button class="btn btn-outline btn-sm" onclick="schOpenAddModal(\'' + schKeyFromDate(d) + '\',9)">+ Thêm bài hôm nay</button>';
      cell.appendChild(ribbon);
    });
  }

  /* ===== DAY view ===== */
  function schRenderDay(vp) {
    const d = schStartOfDay(SCH.cursor);
    const today = new Date();
    const isToday = schSameDay(d, today);
    const conflicts = schDetectConflicts(schGetVisiblePosts());

    let html = '<div class="cal-day-grid">';
    html += '<div class="cal-col-head-corner"></div>';
    html += '<div class="cal-col-head' + (isToday ? ' is-today' : '') + '">'
      + '<span class="cal-day-name">' + SCH_VN_DAYS[d.getDay()] + '</span>'
      + '<span class="cal-day-num">' + d.getDate() + '/' + (d.getMonth()+1) + '/' + d.getFullYear() + '</span>'
      + '</div>';

    for (let h = SCH_HOURS_START; h <= SCH_HOURS_END; h++) {
      html += '<div class="cal-time-cell">' + schFmtTime(h, 0) + '</div>';
      html += '<div class="cal-day-cell' + (isToday ? ' is-today' : '') + '"'
        + ' data-date="' + schKeyFromDate(d) + '" data-hour="' + h + '" data-day-idx="0"'
        + ' ondragover="schOnDragOver(event)" ondragleave="schOnDragLeave(event)" ondrop="schOnDrop(event)">'
        + '<button class="cal-add-btn" onclick="schOpenAddModal(\'' + schKeyFromDate(d) + '\',' + h + ')" aria-label="Thêm bài"><svg class="icon-svg"><use href="#i-plus"/></svg></button>'
        + '</div>';
    }
    html += '</div>';
    vp.innerHTML = html;

    schGetVisiblePosts()
      .filter(p => schSameDay(p.date, d))
      .forEach(p => {
        const cell = vp.querySelector('.cal-day-cell[data-hour="' + Math.floor(p.hour) + '"]');
        if (!cell) return;
        const slot = document.createElement('div');
        slot.className = 'cal-slot plat-' + p.platform + (conflicts.has(p.id) ? ' is-conflict' : '');
        slot.dataset.postId = p.id;
        slot.draggable = true;
        slot.style.top = ((p.minute / 60) * SCH_HOUR_PX) + 'px';
        slot.style.height = (Math.max(28, SCH_HOUR_PX * 0.85)) + 'px';
        // Fix 16: conflict tooltip
        if (conflicts.has(p.id)) {
          slot.title = '⚠ Xung đột lịch: cùng kênh, cách bài kế < 15 phút';
        }
        slot.innerHTML = '<span class="cal-slot-time">' + schFmtTime(p.hour, p.minute) + ' · ' + (SCH_PLATFORM_LABEL[p.platform]||p.platform) + '</span>'
          + '<span class="cal-slot-title"><span class="cal-slot-emoji">' + (SCH_TYPE_EMOJI[p.type]||'📝') + '</span>' + escapeHtml(p.title) + '</span>';
        slot.addEventListener('dragstart', schOnDragStart);
        slot.addEventListener('dragend', schOnDragEnd);
        slot.addEventListener('click', e => { e.stopPropagation(); schOpenPopover(p.id, slot); });
        slot.addEventListener('mouseenter', () => schScheduleTooltip(p, slot));
        slot.addEventListener('mouseleave', schHideTooltip);
        cell.appendChild(slot);
      });
  }

  /* ===== MONTH view ===== */
  function schRenderMonth(vp) {
    const c = SCH.cursor; const year = c.getFullYear(); const month = c.getMonth();
    const first = new Date(year, month, 1);
    const gridStart = schStartOfWeek(first);
    const today = new Date();

    let html = '<div class="cal-month-grid">';
    SCH_VN_DAYS.slice(1).concat(['CN']).forEach(name => {
      html += '<div class="cal-month-head">' + name + '</div>';
    });

    for (let row = 0; row < 6; row++) {
      for (let col = 0; col < 7; col++) {
        const d = schAddDays(gridStart, row*7 + col);
        const isOther = d.getMonth() !== month;
        const isToday = schSameDay(d, today);
        const isWeekend = d.getDay() === 0 || d.getDay() === 6;
        const dayPosts = schGetVisiblePosts().filter(p => schSameDay(p.date, d));
        dayPosts.sort((a,b) => (a.hour*60+a.minute) - (b.hour*60+b.minute));
        const visible = dayPosts.slice(0, 3);
        const more = dayPosts.length - visible.length;

        html += '<div class="cal-month-cell'
          + (isOther ? ' is-other-month' : '')
          + (isToday ? ' is-today' : '')
          + (isWeekend && !isOther ? ' is-weekend' : '')
          + '" data-date="' + schKeyFromDate(d) + '" data-hour="9"'
          + ' ondragover="schOnDragOver(event)" ondragleave="schOnDragLeave(event)" ondrop="schOnDrop(event)">';
        html += '<button class="cal-add-btn" onclick="schOpenAddModal(\'' + schKeyFromDate(d) + '\',9)" aria-label="Thêm bài"><svg class="icon-svg"><use href="#i-plus"/></svg></button>';
        html += '<div class="cal-month-num">' + d.getDate() + '</div>';
        visible.forEach(p => {
          html += '<span class="cal-month-slot plat-' + p.platform + '" data-post-id="' + p.id + '" draggable="true" title="' + escapeHtml(p.title) + '">'
            + schFmtTime(p.hour, p.minute) + ' ' + escapeHtml(p.title) + '</span>';
        });
        if (more > 0) {
          html += '<span class="cal-month-more" onclick="schDrillDay(\'' + schKeyFromDate(d) + '\')">+' + more + ' bài khác</span>';
        }
        html += '</div>';
      }
    }
    html += '</div>';
    vp.innerHTML = html;

    // wire drag for month slots
    vp.querySelectorAll('.cal-month-slot').forEach(slot => {
      slot.addEventListener('dragstart', schOnDragStart);
      slot.addEventListener('dragend', schOnDragEnd);
      slot.addEventListener('click', e => {
        e.stopPropagation();
        schOpenPopover(slot.dataset.postId, slot);
      });
      const id = slot.dataset.postId;
      const post = SCH.posts.find(p => p.id === id);
      if (post) {
        slot.addEventListener('mouseenter', () => schScheduleTooltip(post, slot));
        slot.addEventListener('mouseleave', schHideTooltip);
      }
    });
  }

  /* ===== Drill from "+N more" → switch to Day view at that date ===== */
  function schDrillDay(dateKey) {
    const [y, m, d] = dateKey.split('-').map(Number);
    SCH.cursor = new Date(y, m-1, d);
    schSetMode('day');
  }

  /* ===== Mode switch & Navigation ===== */
  function schSetMode(mode) {
    if (!['month','week','day'].includes(mode)) return;
    SCH.mode = mode;
    document.querySelectorAll('.cal-mode-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.mode === mode);
    });
    const loading = document.getElementById('schLoading');
    const vp = document.getElementById('schViewport');
    if (loading && vp) {
      loading.hidden = false;
      vp.style.opacity = '0';
      setTimeout(() => {
        loading.hidden = true;
        vp.style.opacity = '1';
        schRender();
      }, 200);
    } else {
      schRender();
    }
  }

  function schNavigate(dir) {
    const d = new Date(SCH.cursor);
    if (SCH.mode === 'week') d.setDate(d.getDate() + 7*dir);
    else if (SCH.mode === 'day') d.setDate(d.getDate() + dir);
    else d.setMonth(d.getMonth() + dir);
    SCH.cursor = d;
    schRender();
  }

  function schGoToday() {
    SCH.cursor = new Date();
    schRender();
    showToast({ type:'info', msg:'Đã quay về hôm nay.' });
  }

  /* ===== Filter chip ===== */
  function schToggleFilter(plat, btnEl) {
    if (plat === 'all') {
      SCH.filters = new Set(['fb','ig','yt','web']);
      document.querySelectorAll('#schFilters .cal-chip').forEach(c => c.classList.remove('active'));
      btnEl.classList.add('active');
    } else {
      const allBtn = document.querySelector('#schFilters .cal-chip[data-platform="all"]');
      if (allBtn) allBtn.classList.remove('active');
      if (SCH.filters.has(plat)) SCH.filters.delete(plat);
      else SCH.filters.add(plat);
      btnEl.classList.toggle('active', SCH.filters.has(plat));
      if (SCH.filters.size === 0) {
        // fallback: re-enable all
        SCH.filters = new Set(['fb','ig','yt','web']);
        if (allBtn) allBtn.classList.add('active');
      }
    }
    schRender();
  }

  /* ===== Drag & drop ===== */
  function schOnDragStart(e) {
    SCH.dragId = e.currentTarget.dataset.postId;
    e.currentTarget.classList.add('is-dragging');
    if (e.dataTransfer) {
      e.dataTransfer.effectAllowed = 'move';
      try { e.dataTransfer.setData('text/plain', SCH.dragId); } catch (_) {}
    }
    schHideTooltip(); schClosePopover();
  }
  function schOnDragEnd(e) {
    e.currentTarget.classList.remove('is-dragging');
    document.querySelectorAll('.is-drop-target').forEach(c => c.classList.remove('is-drop-target'));
    SCH.dragId = null;
  }
  function schOnDragOver(e) {
    e.preventDefault();
    if (e.dataTransfer) e.dataTransfer.dropEffect = 'move';
    e.currentTarget.classList.add('is-drop-target');
  }
  function schOnDragLeave(e) {
    e.currentTarget.classList.remove('is-drop-target');
  }
  function schOnDrop(e) {
    e.preventDefault();
    e.currentTarget.classList.remove('is-drop-target');
    const id = SCH.dragId || (e.dataTransfer && e.dataTransfer.getData('text/plain'));
    if (!id) return;
    const post = SCH.posts.find(p => p.id === id); if (!post) return;
    const dateKey = e.currentTarget.dataset.date;
    const newHour = parseInt(e.currentTarget.dataset.hour, 10);
    const [y, m, d] = dateKey.split('-').map(Number);
    post.date = new Date(y, m-1, d);
    post.hour = newHour; post.minute = 0;
    // TODO: PATCH /api/v1/schedule/slots/:id { date, hour }
    schRender();
    const dayName = SCH_VN_DAYS[post.date.getDay()];
    showToast({
      type: 'success',
      title: 'Đã đổi lịch',
      msg: 'Bài "' + post.title + '" → ' + dayName + ', ' + schFmtTime(post.hour, 0)
    });
  }

  /* ===== Add slot modal ===== */
  function schOpenAddModal(dateKey, hour) {
    const modal = document.getElementById('schAddModal'); if (!modal) return;
    const sel = document.getElementById('schAddPost');
    const dateInp = document.getElementById('schAddDate');
    const timeInp = document.getElementById('schAddTime');

    if (sel) {
      sel.innerHTML = SCH.queuePool.map(q =>
        '<option value="' + q.id + '" data-plat="' + q.plat + '" data-type="' + q.type + '">' + escapeHtml(q.title) + '</option>'
      ).join('');
    }
    let target;
    if (dateKey) {
      const [y,m,d] = dateKey.split('-').map(Number); target = new Date(y, m-1, d);
    } else target = new Date(SCH.cursor);
    if (dateInp) dateInp.value = target.getFullYear() + '-' + String(target.getMonth()+1).padStart(2,'0') + '-' + String(target.getDate()).padStart(2,'0');
    if (timeInp) timeInp.value = (typeof hour === 'number' ? String(hour).padStart(2,'0') : '09') + ':00';

    // pre-select platform from chosen queue item (FB default)
    const firstOpt = sel && sel.options[0];
    const plat = (firstOpt && firstOpt.dataset.plat) || 'fb';
    document.querySelectorAll('input[name="schAddPlat"]').forEach(r => r.checked = (r.value === plat));

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function schCloseAddModal() {
    const modal = document.getElementById('schAddModal');
    if (modal) modal.classList.remove('open');
    document.body.style.overflow = '';
  }
  function schSubmitAdd() {
    const sel = document.getElementById('schAddPost');
    const dateInp = document.getElementById('schAddDate');
    const timeInp = document.getElementById('schAddTime');
    const plat = (document.querySelector('input[name="schAddPlat"]:checked') || {}).value || 'fb';
    if (!sel || !sel.value) { showToast({ type:'warn', msg:'Hãy chọn 1 bài từ Hàng chờ duyệt.' }); return; }
    const queueItem = SCH.queuePool.find(q => q.id === sel.value);
    if (!queueItem) return;
    const [y,m,d] = (dateInp.value || '').split('-').map(Number);
    const [hh,mm] = (timeInp.value || '09:00').split(':').map(Number);
    const post = {
      id: 'p' + Math.random().toString(36).slice(2,8),
      date: new Date(y, m-1, d),
      hour: hh||9, minute: mm||0,
      platform: plat,
      type: queueItem.type,
      title: queueItem.title,
      caption: '(Chuyển từ hàng chờ duyệt — chờ AI viết caption hoàn chỉnh.)'
    };
    SCH.posts.push(post);
    schCloseAddModal();
    schRender();
    showToast({ type:'success', title:'Đã thêm vào lịch', msg:post.title + ' · ' + schFmtTime(post.hour, post.minute) + ' · ' + (SCH_PLATFORM_LABEL[plat]||plat) });
    // TODO: POST /api/v1/schedule/slots
  }

  /* ===== Popover (mini-edit on slot click) ===== */
  function schOpenPopover(postId, anchorEl) {
    const post = SCH.posts.find(p => p.id === postId); if (!post) return;
    SCH.selectedPostId = postId;
    const pop = document.getElementById('schPopover'); if (!pop) return;

    const platEl = document.getElementById('schPopPlatform');
    const titleEl = document.getElementById('schPopTitle');
    const timeEl = document.getElementById('schPopTime');
    if (platEl) platEl.innerHTML = '<span class="cal-chip-dot"></span>' + escapeHtml(SCH_PLATFORM_LABEL[post.platform] || post.platform);
    if (platEl) platEl.className = 'cal-pop-platform ' + (SCH_PLATFORM_DOT[post.platform]||'');
    if (titleEl) titleEl.textContent = post.title;
    if (timeEl) timeEl.value = schFmtTime(post.hour, post.minute);

    pop.hidden = false;
    // position next to anchor
    const r = anchorEl.getBoundingClientRect();
    const pw = 280; const margin = 8;
    let left = r.right + margin;
    if (left + pw > window.innerWidth - 12) left = Math.max(12, r.left - pw - margin);
    let top = r.top;
    if (top + 200 > window.innerHeight - 12) top = Math.max(12, window.innerHeight - 220);
    pop.style.left = left + 'px';
    pop.style.top = top + 'px';

    if (timeEl) timeEl.onchange = () => {
      const [hh, mm] = (timeEl.value || '').split(':').map(Number);
      if (Number.isFinite(hh)) post.hour = hh;
      if (Number.isFinite(mm)) post.minute = mm;
      schRender();
      showToast({ type:'success', msg:'Đã cập nhật giờ đăng: ' + schFmtTime(post.hour, post.minute) });
    };

    document.addEventListener('mousedown', schPopOutsideClose, { once: true });
  }
  function schPopOutsideClose(e) {
    const pop = document.getElementById('schPopover');
    if (!pop || pop.hidden) return;
    if (!pop.contains(e.target) && !e.target.closest('.cal-slot') && !e.target.closest('.cal-month-slot')) {
      schClosePopover();
    } else {
      document.addEventListener('mousedown', schPopOutsideClose, { once: true });
    }
  }
  function schClosePopover() {
    const pop = document.getElementById('schPopover');
    if (pop) pop.hidden = true;
    SCH.selectedPostId = null;
  }
  function schPopEdit() {
    showToast({ type:'info', title:'Sửa nội dung', msg:'Tính năng sửa caption + ảnh sẽ có ở v1.2.' });
  }
  function schPopDelete() {
    const id = SCH.selectedPostId; if (!id) return;
    const post = SCH.posts.find(p => p.id === id);
    if (!post) return;
    if (!confirm('Xóa bài "' + post.title + '" khỏi lịch?')) return;
    SCH.posts = SCH.posts.filter(p => p.id !== id);
    schClosePopover();
    schRender();
    showToast({ type:'warn', title:'Đã xóa khỏi lịch', msg: post.title });
    // TODO: DELETE /api/v1/schedule/slots/:id
  }

  /* ===== Tooltip preview (500ms hover) ===== */
  function schScheduleTooltip(post, anchor) {
    clearTimeout(SCH.tooltipTimer);
    SCH.tooltipTimer = setTimeout(() => schShowTooltip(post, anchor), 500);
  }
  function schShowTooltip(post, anchor) {
    schHideTooltip();
    const tip = document.createElement('div');
    tip.className = 'cal-slot-tooltip';
    const snippet = (post.caption || '').slice(0, 120) + (post.caption && post.caption.length > 120 ? '…' : '');
    tip.innerHTML = '<div class="tt-meta">' + (SCH_TYPE_EMOJI[post.type]||'📝') + ' ' + (SCH_PLATFORM_LABEL[post.platform]||'') + ' · ' + schFmtTime(post.hour, post.minute) + '</div>'
      + '<div><strong>' + escapeHtml(post.title) + '</strong></div>'
      + (snippet ? '<div style="margin-top:4px">' + escapeHtml(snippet) + '</div>' : '');
    document.body.appendChild(tip);
    const r = anchor.getBoundingClientRect();
    let left = r.left;
    let top = r.bottom + 6;
    // clamp inside viewport
    const tw = 280;
    if (left + tw > window.innerWidth - 12) left = window.innerWidth - tw - 12;
    if (top + 100 > window.innerHeight - 12) top = r.top - 110;
    tip.style.left = Math.max(12, left) + 'px';
    tip.style.top  = top + 'px';
    requestAnimationFrame(() => tip.classList.add('is-show'));
    SCH.tooltipEl = tip;
  }
  function schHideTooltip() {
    clearTimeout(SCH.tooltipTimer);
    if (SCH.tooltipEl) { SCH.tooltipEl.remove(); SCH.tooltipEl = null; }
  }

  /* ===== Now-line on today's column (week/day view) ===== */
  function schStartNowLineTicker() {
    if (SCH.nowTimer) { clearInterval(SCH.nowTimer); SCH.nowTimer = null; }
    schDrawNowLine();
    SCH.nowTimer = setInterval(schDrawNowLine, 60000);
  }
  function schDrawNowLine() {
    const vp = document.getElementById('schViewport'); if (!vp) return;
    vp.querySelectorAll('.cal-now-line').forEach(n => n.remove());
    if (SCH.mode === 'month') return;
    const now = new Date();
    if (now.getHours() < SCH_HOURS_START || now.getHours() > SCH_HOURS_END) return;
    let cell;
    if (SCH.mode === 'week') {
      const start = schStartOfWeek(SCH.cursor);
      if (now < start || now > schAddDays(start, 6)) return;
      const dayIdx = Math.floor((schStartOfDay(now) - start) / 86400000);
      cell = vp.querySelector('.cal-day-cell[data-day-idx="' + dayIdx + '"][data-hour="' + now.getHours() + '"]');
    } else {
      if (!schSameDay(now, SCH.cursor)) return;
      cell = vp.querySelector('.cal-day-cell[data-hour="' + now.getHours() + '"]');
    }
    if (!cell) return;
    const line = document.createElement('div');
    line.className = 'cal-now-line';
    line.style.top = ((now.getMinutes() / 60) * SCH_HOUR_PX) + 'px';
    cell.appendChild(line);
  }

  /* ===== Error retry ===== */
  function schRetry() {
    const err = document.getElementById('schError');
    if (err) err.style.display = 'none';
    showToast({ type:'processing', msg:'Đang kết nối lại...' });
    setTimeout(schRender, 600);
    // TODO: hook to API error — re-fetch slots
  }

  /* ===== Init ===== */
  function schInit() {
    if (SCH.posts.length === 0) schSeedData();
    schRender();
    // Fix 1: render dashboard mini schedule after seed
    renderDashboardSchedule();
  }
  // run after DOM ready, regardless of whether view is active yet
  document.addEventListener('DOMContentLoaded', schInit);
  // re-render whenever schedule view becomes visible (in case of routing race)
  // A2: safe wrapper — falls back to local showView if window.showView not yet set
  const _origShowView = window.showView || showView;
  window.showView = function(id) {
    _origShowView(id);
    if (id === 'schedule') {
      schClosePopover();
      schRender();
    } else {
      schHideTooltip(); schClosePopover();
    }
    if (id === 'ai-settings') loadNotifSettings();
    if (id === 'ai-standards') loadAiStd();
  };

  /* ========== Hash routing (for deep-link & screenshot tooling) ========== */
  function initFromHash() {
    const id = (location.hash || '').replace(/^#/, '');
    if (id && views[id]) showView(id);
  }
  window.addEventListener('hashchange', initFromHash);
  window.addEventListener('DOMContentLoaded', initFromHash);

  /* ========== Notification settings (Email + Telegram) ========== */
  const NOTIF_KEY = 'mkt_notif_v1';

  function loadNotifSettings() {
    try {
      const s = JSON.parse(localStorage.getItem(NOTIF_KEY) || '{}');
      const email = document.getElementById('notifEmail');
      const token = document.getElementById('notifTgToken');
      const chatId = document.getElementById('notifTgChatId');
      const auto = document.getElementById('notifAutoEnabled');
      if (email && s.email) email.value = s.email;
      if (token && s.tgToken) token.value = s.tgToken;
      if (chatId && s.tgChatId) chatId.value = s.tgChatId;
      if (auto) auto.checked = s.autoEnabled !== false;
    } catch (_) {}
  }

  function saveNotifSettings() {
    const email = (document.getElementById('notifEmail') || {}).value || '';
    const tgToken = (document.getElementById('notifTgToken') || {}).value || '';
    const tgChatId = (document.getElementById('notifTgChatId') || {}).value || '';
    const autoEnabled = (document.getElementById('notifAutoEnabled') || {}).checked !== false;
    localStorage.setItem(NOTIF_KEY, JSON.stringify({ email, tgToken, tgChatId, autoEnabled }));
    showToast({ type: 'success', title: 'Đã lưu cài đặt thông báo', msg: 'Email & Telegram sẵn sàng.' });
  }

  function getNotifSettings() {
    try { return JSON.parse(localStorage.getItem(NOTIF_KEY) || '{}'); } catch (_) { return {}; }
  }

  /* --- Gửi Telegram --- */
  async function sendTelegram(text) {
    const s = getNotifSettings();
    if (!s.tgToken || !s.tgChatId) {
      showToast({ type: 'warn', title: 'Chưa cài Telegram', msg: 'Vào Cài đặt AI → Thông báo để nhập Bot Token + Chat ID.' });
      return false;
    }
    try {
      const res = await fetch('https://api.telegram.org/bot' + s.tgToken + '/sendMessage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: s.tgChatId, text, parse_mode: 'HTML' })
      });
      const data = await res.json();
      if (data.ok) return true;
      throw new Error(data.description || 'Telegram API error');
    } catch (e) {
      showToast({ type: 'error', title: 'Lỗi gửi Telegram', msg: e.message });
      return false;
    }
  }

  async function testTelegram() {
    const t = showToast({ type: 'processing', title: 'Đang gửi thử Telegram...', msg: '', duration: 0 });
    saveNotifSettings();
    const ok = await sendTelegram('✅ <b>MKT Software</b> — Kết nối Telegram thành công!\n\nSau khi đăng bài, báo cáo sẽ tự động gửi về đây.');
    dismissToast(t);
    if (ok) showToast({ type: 'success', title: 'Telegram hoạt động!', msg: 'Kiểm tra tin nhắn trong bot của anh.' });
  }

  /* --- Gửi Email (mailto) --- */
  function sendEmailReport(subject, body) {
    const s = getNotifSettings();
    const to = s.email || '';
    if (!to) {
      showToast({ type: 'warn', title: 'Chưa cài email', msg: 'Vào Cài đặt AI → Thông báo để nhập email nhận báo cáo.' });
      return;
    }
    const mailto = 'mailto:' + to + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    window.open(mailto, '_blank');
    showToast({ type: 'success', title: 'Đang mở email client', msg: 'Gửi tới: ' + to });
  }

  function testEmail() {
    saveNotifSettings();
    const s = getNotifSettings();
    if (!s.email) { showToast({ type: 'warn', msg: 'Nhập email trước.' }); return; }
    sendEmailReport(
      '[MKT Software] Báo cáo thử nghiệm',
      'Xin chào,\n\nĐây là email thử nghiệm từ MKT Software.\nHệ thống thông báo đã được cài đặt thành công.\n\n—\nMKT Software · Tự hào Công nghệ Việt'
    );
  }

  /* --- Telegram report từ view Báo cáo --- */
  async function telegramReport() {
    const dateRange = (document.getElementById('reportDateRange') || {}).value || '30d';
    const labels = {'7d':'7 ngày qua','30d':'30 ngày qua','month':'Tháng này'};
    const t = showToast({ type: 'processing', title: 'Đang gửi Telegram...', msg: '', duration: 0 });
    const text = '📊 <b>Báo cáo MKT Software</b> — ' + (labels[dateRange] || '') + '\n\n'
      + '📝 Bài đã đăng: <b>48</b>\n'
      + '👥 Tiếp cận: <b>124,000</b>\n'
      + '❤️ Tương tác: <b>3,200</b>\n'
      + '🔗 Click: <b>287</b>\n\n'
      + '📡 Top kênh: Facebook · Instagram\n'
      + '📅 ' + new Date().toLocaleDateString('vi-VN') + '\n\n'
      + '<i>MKT Software · AI tạo · Anh duyệt · Đăng đa kênh</i>';
    const ok = await sendTelegram(text);
    dismissToast(t);
    if (ok) showToast({ type: 'success', title: 'Đã gửi Telegram!', msg: 'Báo cáo đã về điện thoại.' });
  }

  /* --- Thông báo bài đăng tự động --- */
  async function notifyPostPublished(postInfo) {
    const s = getNotifSettings();
    if (!s.autoEnabled) return;
    const text = '📢 <b>MKT Software — Bài vừa đăng thành công!</b>\n\n'
      + '📝 <b>' + (postInfo.title || 'Bài viết') + '</b>\n'
      + '📡 Kênh: ' + (postInfo.platform || '—') + '\n'
      + '🕐 Giờ: ' + (postInfo.time || '—') + '\n\n'
      + '<i>MKT Software · AI tạo · Anh duyệt · Đăng đa kênh</i>';
    if (s.tgToken && s.tgChatId) await sendTelegram(text);
    if (s.email) sendEmailReport(
      '[MKT Software] Bài "' + postInfo.title + '" đã đăng thành công',
      'Bài vừa đăng thành công!\n\nTên bài: ' + postInfo.title + '\nKênh: ' + postInfo.platform + '\nGiờ đăng: ' + postInfo.time + '\n\n—\nMKT Software'
    );
  }

  /* ========== Xuất Excel (SheetJS) ========== */

  function exportScheduleExcel() {
    if (typeof XLSX === 'undefined') {
      showToast({ type: 'error', msg: 'SheetJS chưa load. Kiểm tra kết nối mạng.' });
      return;
    }
    const t = showToast({ type: 'processing', title: 'Đang xuất Excel lịch đăng bài...', msg: '', duration: 0 });
    try {
      const posts = SCH.posts || [];
      const rows = posts.map(function(p) {
        return {
          'Ngày đăng': p.date ? p.date.toLocaleDateString('vi-VN') : '',
          'Giờ đăng': schFmtTime(p.hour, p.minute),
          'Kênh': SCH_PLATFORM_LABEL[p.platform] || p.platform,
          'Loại': p.type,
          'Tiêu đề': p.title,
          'Caption': p.caption || '',
          'Xung đột': schDetectConflicts([p]).has(p.id) ? 'Có' : 'Không'
        };
      });
      if (rows.length === 0) {
        dismissToast(t);
        showToast({ type: 'warn', msg: 'Lịch đăng bài chưa có bài nào.' });
        return;
      }
      const ws = XLSX.utils.json_to_sheet(rows);
      const cols = Object.keys(rows[0]);
      ws['!cols'] = cols.map(function(k) {
        return { wch: Math.max(k.length, Math.max.apply(null, rows.map(function(r) { return String(r[k] || '').length; }))) + 2 };
      });
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Lịch đăng bài');
      dismissToast(t);
      XLSX.writeFile(wb, 'lich-dang-bai-' + new Date().toISOString().slice(0, 10) + '.xlsx');
      showToast({ type: 'success', title: 'Đã xuất Excel', msg: rows.length + ' bài trong lịch.' });
    } catch (e) {
      dismissToast(t);
      showToast({ type: 'error', title: 'Lỗi xuất Excel', msg: e.message });
    }
  }

  function exportApprovalExcel() {
    if (typeof XLSX === 'undefined') {
      showToast({ type: 'error', msg: 'SheetJS chưa load. Kiểm tra kết nối mạng.' });
      return;
    }
    const t = showToast({ type: 'processing', title: 'Đang xuất Excel hàng chờ duyệt...', msg: '', duration: 0 });
    try {
      const rows_el = document.querySelectorAll('#approvalRows .approval-row');
      const rows = Array.from(rows_el).map(function(row) {
        return {
          'Tiêu đề': (row.querySelector('.ar-title') || {}).textContent || '',
          'Kênh': (row.querySelector('.tag') || {}).textContent || '',
          'Trạng thái': 'Chờ duyệt',
          'Preview': ((row.querySelector('.ar-preview') || {}).textContent || '').slice(0, 200),
          'Ngày tạo': new Date().toLocaleDateString('vi-VN')
        };
      });
      // Fallback nếu DOM trống
      if (rows.length === 0) {
        const pool = (SCH && SCH.queuePool) ? SCH.queuePool : [];
        pool.forEach(function(q) {
          rows.push({
            'Tiêu đề': q.title,
            'Kênh': (SCH_PLATFORM_LABEL && SCH_PLATFORM_LABEL[q.plat]) || q.plat,
            'Trạng thái': 'Hàng chờ duyệt',
            'Preview': '',
            'Ngày tạo': new Date().toLocaleDateString('vi-VN')
          });
        });
      }
      if (rows.length === 0) {
        dismissToast(t);
        showToast({ type: 'warn', msg: 'Hàng chờ duyệt đang trống.' });
        return;
      }
      const ws = XLSX.utils.json_to_sheet(rows);
      const cols = Object.keys(rows[0]);
      ws['!cols'] = cols.map(function(k) {
        return { wch: Math.max(k.length, Math.max.apply(null, rows.map(function(r) { return String(r[k] || '').length; }))) + 2 };
      });
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Hàng chờ duyệt');
      dismissToast(t);
      XLSX.writeFile(wb, 'hang-cho-duyet-' + new Date().toISOString().slice(0, 10) + '.xlsx');
      showToast({ type: 'success', title: 'Đã xuất Excel', msg: rows.length + ' bài hàng chờ.' });
    } catch (e) {
      dismissToast(t);
      showToast({ type: 'error', title: 'Lỗi xuất Excel', msg: e.message });
    }
  }

  function exportReportExcel() {
    if (typeof XLSX === 'undefined') {
      showToast({ type: 'error', msg: 'SheetJS chưa load. Kiểm tra kết nối mạng.' });
      return;
    }
    const t = showToast({ type: 'processing', title: 'Đang xuất báo cáo Excel...', msg: '', duration: 0 });
    try {
      const wb = XLSX.utils.book_new();
      // Sheet 1: Tổng quan
      const summary = [
        { 'Chỉ số': 'Bài đã đăng tháng này', 'Giá trị': 48, 'So tháng trước': '+23%' },
        { 'Chỉ số': 'Tổng tiếp cận', 'Giá trị': 124000, 'So tháng trước': '+18%' },
        { 'Chỉ số': 'Tổng tương tác', 'Giá trị': 3200, 'So tháng trước': '+12%' },
        { 'Chỉ số': 'Tổng click', 'Giá trị': 287, 'So tháng trước': '+9%' },
        { 'Chỉ số': 'Tỷ lệ đăng thành công', 'Giá trị': '94%', 'So tháng trước': '+2%' }
      ];
      XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(summary), 'Tổng quan');
      // Sheet 2: Hiệu suất theo kênh
      var channels = [
        { 'Kênh': 'Facebook', 'Bài đăng': 18, 'Tiếp cận': 54000, 'Tương tác': 1450, 'Tỷ lệ tương tác': '4.2%', 'Click': 124 },
        { 'Kênh': 'Instagram', 'Bài đăng': 12, 'Tiếp cận': 38000, 'Tương tác': 980, 'Tỷ lệ tương tác': '3.8%', 'Click': 87 },
        { 'Kênh': 'YouTube', 'Bài đăng': 5, 'Tiếp cận': 22000, 'Tương tác': 560, 'Tỷ lệ tương tác': '2.1%', 'Click': 52 },
        { 'Kênh': 'Website', 'Bài đăng': 13, 'Tiếp cận': 10000, 'Tương tác': 210, 'Tỷ lệ tương tác': '1.2%', 'Click': 24 }
      ];
      XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(channels), 'Theo kênh');
      // Sheet 3: Top bài từ SCH.posts
      var topPosts = ((typeof SCH !== 'undefined' && SCH.posts) ? SCH.posts : [])
        .slice(0, 10)
        .map(function(p, i) {
          return {
            'STT': i + 1,
            'Tiêu đề': p.title,
            'Kênh': (typeof SCH_PLATFORM_LABEL !== 'undefined' && SCH_PLATFORM_LABEL[p.platform]) || p.platform,
            'Loại': p.type,
            'Ngày đăng': p.date ? p.date.toLocaleDateString('vi-VN') : '',
            'Tương tác (mock)': Math.floor(Math.random() * 3000 + 500)
          };
        });
      if (topPosts.length === 0) {
        topPosts = [{ 'STT': 1, 'Tiêu đề': 'Chưa có bài trong lịch', 'Kênh': '—', 'Loại': '—', 'Ngày đăng': '—', 'Tương tác (mock)': 0 }];
      }
      XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(topPosts), 'Top bài');
      dismissToast(t);
      XLSX.writeFile(wb, 'bao-cao-hieu-suat-' + new Date().toISOString().slice(0, 10) + '.xlsx');
      showToast({ type: 'success', title: 'Đã xuất báo cáo Excel', msg: '3 sheet: Tổng quan · Theo kênh · Top bài.' });
    } catch (e) {
      dismissToast(t);
      showToast({ type: 'error', title: 'Lỗi xuất Excel', msg: e.message });
    }
  }

/* ===================== AI STANDARDS ===================== */
(function() {
  var AI_STD_KEY = 'mkt_ai_std_v1';

  var _defaults = {
    posts: [
      '🎯 Bạn đang dùng phần mềm marketing nào? Hầu hết SME Việt Nam vẫn đang lãng phí 3–5 giờ/ngày chỉ để đăng bài thủ công.\n\nMKT Software giải quyết điều đó: lên lịch 1 lần, tự động đăng đúng giờ trên 5 kênh.\n\n✅ Tiết kiệm 80% thời gian\n✅ Không bỏ lỡ giờ vàng\n✅ Báo cáo tự động hàng tuần\n\n👉 Dùng thử miễn phí 14 ngày tại mktsoftware.vn\n\n#MKTSoftware #MarketingTuDong #SMEVietNam',
      '📊 Case study thực chiến: Agency 5 người quản lý 20 fanpage như thế nào?\n\nAnh Minh - founder agency tại Hà Nội chia sẻ:\n"Trước khi dùng MKT Software, cả team ngồi đăng bài từ 7h sáng. Bây giờ hệ thống tự làm, tụi mình chỉ cần duyệt nội dung."\n\n📈 Kết quả sau 3 tháng:\n- Tiết kiệm 40 giờ/tháng\n- Tăng 35% engagement\n- Onboard thêm 8 khách hàng mới\n\n#CaseStudy #AgencyVietNam',
      '❓ Câu hỏi: "Phần mềm có hỗ trợ Zalo OA không?"\n\n✅ Có! MKT Software hỗ trợ đăng chéo Facebook, Instagram, YouTube, TikTok và Zalo OA trong cùng 1 giao diện.\n\n💬 Còn câu hỏi nào không? Inbox trực tiếp hoặc comment bên dưới nhé!\n\n#HoiDap #MKTSoftware'
    ],
    doRules: [
      'Bắt đầu bằng hook mạnh — câu hỏi hoặc số liệu gây chú ý',
      'Dùng emoji có chọn lọc, 2–4 cái/bài',
      'Kết thúc bằng CTA rõ ràng và 1 hành động duy nhất',
      'Xưng "anh/chị" với khách hàng, gần gũi nhưng chuyên nghiệp',
      'Dùng số liệu cụ thể thay vì lời hoa mỹ chung chung'
    ],
    dontRules: [
      'Không dùng từ "rẻ nhất", "miễn phí mãi", "nhanh nhất Việt Nam"',
      'Không viết đoạn văn dài > 3 dòng liên tiếp không có ngắt',
      'Không dùng tiếng Anh pha tiếng Việt quá nhiều',
      'Không kết thúc bài mà không có CTA',
      'Không viết sai chính tả tên thương hiệu: MKT Software'
    ]
  };

  window.aiStdLogoChange = function(input) {
    if (!input.files || !input.files[0]) return;
    var reader = new FileReader();
    reader.onload = function(e) {
      var img = document.getElementById('aiStdLogoPreview');
      if (img) img.src = e.target.result;
    };
    reader.readAsDataURL(input.files[0]);
  };

  window.aiStdBannerChange = function(input) {
    if (!input.files || !input.files[0]) return;
    var reader = new FileReader();
    var name = input.files[0].name.replace(/\.[^.]+$/, '');
    reader.onload = function(e) {
      var list = document.getElementById('aiStdBannerList');
      if (!list) return;
      var addBtn = list.querySelector('.ai-std-banner-add');
      var thumb = document.createElement('div');
      thumb.className = 'ai-std-banner-thumb';
      thumb.innerHTML = '<img src="' + e.target.result + '" style="width:100%;height:60px;object-fit:cover;border-radius:5px;margin-bottom:5px" alt="">'
        + '<div style="font-size:11px;font-weight:600;color:var(--text)">' + escapeHtml(name) + '</div>'
        + '<div style="font-size:10px;color:var(--text-muted)">Đã tải lên</div>';
      if (addBtn) list.insertBefore(thumb, addBtn);
      else list.appendChild(thumb);
    };
    reader.readAsDataURL(input.files[0]);
    input.value = '';
  };

  function renderPosts(posts) {
    var el = document.getElementById('aiStdPostList');
    if (!el) return;
    el.innerHTML = '';
    posts.forEach(function(txt, i) {
      var card = document.createElement('div');
      card.className = 'ai-std-post-card';
      card.innerHTML = '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">'
        + '<span style="font-size:11px;font-weight:700;color:var(--text-muted)">Bài mẫu ' + (i + 1) + '</span>'
        + '<button class="btn btn-outline btn-sm" style="color:#E63946;border-color:#E63946" onclick="aiStdRemovePost(' + i + ')">Xóa</button>'
        + '</div>'
        + '<textarea class="input-field" rows="4" style="font-size:12px;resize:vertical" onchange="aiStdUpdatePost(' + i + ',this.value)">' + escapeHtml(txt) + '</textarea>';
      el.appendChild(card);
    });
  }

  function renderRules(list, elId) {
    var el = document.getElementById(elId);
    if (!el) return;
    el.innerHTML = '';
    list.forEach(function(rule, i) {
      var li = document.createElement('li');
      li.style.cssText = 'display:flex;gap:6px;align-items:center';
      li.innerHTML = '<input class="input-field" style="flex:1;font-size:12px;padding:5px 8px" value="' + escapeHtml(rule) + '">'
        + '<button class="btn btn-outline btn-sm" style="padding:3px 7px;color:#E63946;border-color:#E63946;flex-shrink:0" onclick="aiStdRemoveRule(\'' + elId + '\',' + i + ')">×</button>';
      el.appendChild(li);
    });
  }

  function getState() {
    try { return JSON.parse(localStorage.getItem(AI_STD_KEY)) || null; } catch(e) { return null; }
  }

  window.loadAiStd = function(reset) {
    var state = (!reset && getState()) || JSON.parse(JSON.stringify(_defaults));
    renderPosts(state.posts);
    renderRules(state.doRules, 'aiStdDoList');
    renderRules(state.dontRules, 'aiStdDontList');
  };

  window.saveAiStd = function() {
    var posts = [];
    document.querySelectorAll('#aiStdPostList textarea').forEach(function(t) { posts.push(t.value); });
    var doRules = [];
    document.querySelectorAll('#aiStdDoList input').forEach(function(i) { doRules.push(i.value); });
    var dontRules = [];
    document.querySelectorAll('#aiStdDontList input').forEach(function(i) { dontRules.push(i.value); });
    localStorage.setItem(AI_STD_KEY, JSON.stringify({ posts: posts, doRules: doRules, dontRules: dontRules }));
    showToast({ type: 'success', title: 'Đã lưu Tiêu chuẩn AI', msg: posts.length + ' bài mẫu · ' + doRules.length + ' Do · ' + dontRules.length + ' Don\'t.' });
  };

  window.aiStdAddPost = function() {
    var txts = document.querySelectorAll('#aiStdPostList textarea');
    var posts = [];
    txts.forEach(function(t) { posts.push(t.value); });
    posts.push('');
    renderPosts(posts);
    var cards = document.querySelectorAll('#aiStdPostList .ai-std-post-card');
    if (cards.length) cards[cards.length - 1].querySelector('textarea').focus();
  };

  window.aiStdRemovePost = function(i) {
    var txts = document.querySelectorAll('#aiStdPostList textarea');
    var posts = [];
    txts.forEach(function(t) { posts.push(t.value); });
    posts.splice(i, 1);
    renderPosts(posts);
  };

  window.aiStdUpdatePost = function(i, val) {};

  window.aiStdAddRule = function(type) {
    var elId = type === 'do' ? 'aiStdDoList' : 'aiStdDontList';
    var inputs = document.querySelectorAll('#' + elId + ' input');
    var rules = [];
    inputs.forEach(function(inp) { rules.push(inp.value); });
    rules.push('');
    renderRules(rules, elId);
    var all = document.querySelectorAll('#' + elId + ' input');
    if (all.length) all[all.length - 1].focus();
  };

  window.aiStdRemoveRule = function(elId, i) {
    var inputs = document.querySelectorAll('#' + elId + ' input');
    var rules = [];
    inputs.forEach(function(inp) { rules.push(inp.value); });
    rules.splice(i, 1);
    renderRules(rules, elId);
  };
})();
