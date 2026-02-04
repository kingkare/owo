/**
 * 2026 春节倒计时插件
 * 兼容 Pjax，支持主题切换与本地存储
 */

// 声明一个全局变量，用于清除旧的定时器，防止 Pjax 跳转后产生多个定时器冲突
var countdownTimer = null;

function initCountdown() {
    const targetDate = new Date('2026-02-17T00:00:00').getTime();

    // 1. 倒计时核心逻辑
    const updateTimer = () => {
        const now = new Date().getTime();
        const diff = targetDate - now;

        const d = document.getElementById('days');
        const h = document.getElementById('hours');
        const m = document.getElementById('minutes');
        const s = document.getElementById('seconds');

        // 如果元素不存在（比如不在首页），则停止执行
        if (!d) return;

        if (diff <= 0) {
            if (countdownTimer) clearInterval(countdownTimer);
            return;
        }

        d.innerText = Math.floor(diff / 86400000).toString().padStart(2, '0');
        h.innerText = Math.floor((diff % 86400000) / 3600000).toString().padStart(2, '0');
        m.innerText = Math.floor((diff % 3600000) / 60000).toString().padStart(2, '0');
        s.innerText = Math.floor((diff % 60000) / 1000).toString().padStart(2, '0');
    };

    // 清除旧定时器并开启新定时器
    if (countdownTimer) clearInterval(countdownTimer);
    if (document.getElementById('days')) {
        countdownTimer = setInterval(updateTimer, 1000);
        updateTimer();
    }

    // 2. 加载用户之前保存的主题风格
    const savedTheme = localStorage.getItem('countdown-theme');
    const content = document.getElementById('countdown-main-content');
    if (savedTheme && content) {
        // 保持 class 结构为 "countdown-content theme-xxx"
        content.className = 'countdown-content theme-' + savedTheme;
    }
}

// 3. 切换菜单显示/隐藏
function toggleCountdownMenu() {
    const menu = document.getElementById('countdown-menu');
    if (menu) {
        menu.classList.toggle('show');
    }
}

// 4. 切换主题函数
function changeCountdownTheme(themeName) {
    const content = document.getElementById('countdown-main-content');
    if (content) {
        content.className = 'countdown-content theme-' + themeName;
        localStorage.setItem('countdown-theme', themeName);
        // 切换后自动关闭菜单
        const menu = document.getElementById('countdown-menu');
        if (menu) menu.classList.remove('show');
    }
}

// 5. 点击外部区域自动关闭菜单
document.addEventListener('click', function (e) {
    const menu = document.getElementById('countdown-menu');
    const settingsBtn = document.querySelector('.countdown-settings');
    if (menu && menu.classList.contains('show')) {
        if (!menu.contains(e.target) && !settingsBtn.contains(e.target)) {
            menu.classList.remove('show');
        }
    }
});

// 6. 核心：兼容 Pjax 逻辑
// 首次进入页面执行
initCountdown();

// 监听 Pjax 完成事件，确保跳转页面后侧边栏功能依然有效
document.addEventListener('pjax:complete', function () {
    initCountdown();

});
