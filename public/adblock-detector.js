window.hasAdBlocker = false;

function detectAdBlocker() {
  const ad = document.createElement('div');
  ad.innerHTML = '&nbsp;';
  ad.className = 'adsbox';
  ad.style.position = 'absolute';
  ad.style.left = '-9999px';
  document.body.appendChild(ad);
  
  window.setTimeout(function() {
    if (ad.offsetHeight === 0 || ad.clientHeight === 0 || window.getComputedStyle(ad).display === 'none') {
      window.hasAdBlocker = true;
      showAdblockPopup();
    }
    ad.remove();
  }, 300);
}

function showAdblockPopup() {
  let popup = document.getElementById('adblock-popup');
  if (!popup) {
    popup = document.createElement('div');
    popup.id = 'adblock-popup';
    popup.style.cssText = 'position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(15,23,42,0.95); z-index: 2147483647; display: flex; justify-content: center; align-items: center; text-align: center; backdrop-filter: blur(10px);';
    popup.innerHTML = `
      <div style="background: #1e293b; padding: 40px; border-radius: 16px; border: 1px solid #FF00D0; max-width: 500px; box-shadow: 0 20px 50px rgba(0,0,0,0.5);">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#FF00D0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom: 20px;"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
        <h2 style="color: #fff; margin-bottom: 20px; font-size: 24px;">Reklam Engelleyici Tespit Edildi</h2>
        <p style="color: #cbd5e1; font-size: 16px; line-height: 1.6; margin-bottom: 30px;">Bu sitenin tek gelir kaynağı reklamlardır. Hizmetimizi ücretsiz kullanmaya devam edebilmek için lütfen reklam engelleyicinizi devre dışı bırakınız ve sayfayı yenileyiniz.</p>
        <button onclick="location.reload()" style="padding: 12px 30px; background: linear-gradient(90deg, #533085, #FF00D0); color: #fff; border: none; border-radius: 8px; cursor: pointer; font-size: 16px; font-weight: 600; width: 100%;">Anladım, Sayfayı Yenile</button>
      </div>
    `;
    document.body.appendChild(popup);
  } else {
    popup.style.display = 'flex';
  }
}

window.addEventListener('load', detectAdBlocker);
