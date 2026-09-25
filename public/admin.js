document.addEventListener('DOMContentLoaded', () => {
    const loginOverlay = document.getElementById('loginOverlay');
    const adminApp = document.getElementById('adminApp');
    const loginForm = document.getElementById('loginForm');
    const loginError = document.getElementById('loginError');
    const adminPassword = document.getElementById('adminPassword');
    const logoutBtn = document.getElementById('logoutBtn');

    const navItems = document.querySelectorAll('.nav-item[data-tab]');
    const tabContents = document.querySelectorAll('.tab-content');

    // Stats
    const statVisits = document.getElementById('statVisits');
    const statDownloads = document.getElementById('statDownloads');

    // Config
    const configForm = document.getElementById('configForm');
    const configMsg = document.getElementById('configMsg');
    const configTheme = document.getElementById('configTheme');
    const configLangs = document.getElementById('configLangs');
    const configAdsense = document.getElementById('configAdsense');
    const configPassword = document.getElementById('configPassword');

    let token = localStorage.getItem('adminToken');

    // Initialization
    if (token) {
        loadDashboard();
    }

    // Login
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const pw = adminPassword.value;
        try {
            const res = await fetch('/api/admin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password: pw })
            });
            const data = await res.json();
            if (res.ok && data.success) {
                token = data.token;
                localStorage.setItem('adminToken', token);
                loadDashboard();
            } else {
                loginError.textContent = data.error || 'Login failed';
            }
        } catch (e) {
            loginError.textContent = 'Server error';
        }
    });

    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('adminToken');
        token = null;
        adminApp.style.display = 'none';
        loginOverlay.classList.add('active');
    });

    // Nav
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            navItems.forEach(n => n.classList.remove('active'));
            tabContents.forEach(t => t.classList.remove('active'));

            item.classList.add('active');
            document.getElementById('tab-' + item.dataset.tab).classList.add('active');
        });
    });

    function apiCall(endpoint, options = {}) {
        return fetch(endpoint, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
                ...(options.headers || {})
            }
        }).then(res => {
            if (res.status === 401) {
                logoutBtn.click();
                throw new Error('Unauthorized');
            }
            return res.json();
        });
    }

    async function loadDashboard() {
        loginOverlay.classList.remove('active');
        adminApp.style.display = 'flex';

        // Load Stats
        try {
            const stats = await apiCall('/api/admin/stats');
            statVisits.textContent = stats.visits;
            statDownloads.textContent = stats.downloads;
        } catch (e) { }

        // Load Config
        try {
            const config = await apiCall('/api/admin/config');
            configTheme.value = config.theme || 'dark';
            configLangs.value = (config.languages || []).join(',');
            configAdsense.value = config.adsenseScript || '';
        } catch (e) { }
    }

    // Save config
    configForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        try {
            const currentConfig = await apiCall('/api/admin/config');

            const newConfig = {
                theme: configTheme.value,
                languages: configLangs.value.split(',').map(s => s.trim()).filter(Boolean),
                adsenseScript: configAdsense.value,
                adminPassword: configPassword.value ? configPassword.value : currentConfig.adminPassword
            };

            await apiCall('/api/admin/config', {
                method: 'POST',
                body: JSON.stringify(newConfig)
            });

            if (configPassword.value) {
                token = configPassword.value;
                localStorage.setItem('adminToken', token);
                configPassword.value = '';
            }

            configMsg.textContent = 'Configuration saved successfully!';
            setTimeout(() => configMsg.textContent = '', 3000);
        } catch (e) {
            configMsg.textContent = 'Failed to save configuration';
            configMsg.style.color = 'var(--red)';
        }
    });

});
