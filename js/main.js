document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;

    // 如果当前页面没有这个按钮，直接跳过防报错
    if (!themeToggleBtn) return;

    // 检查本地存储中是否有主题偏好
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
        body.classList.add('dark-mode');
        // 黑夜模式下显示黄色的太阳 Emoji
        themeToggleBtn.innerHTML = '☀️';
    } else {
        // 白天模式下显示黄色的月亮 Emoji
        themeToggleBtn.innerHTML = '🌙';
    }

    // 点击按钮切换主题
    themeToggleBtn.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        
        // 更新为 Emoji 并保存用户偏好到浏览器本地
        if (body.classList.contains('dark-mode')) {
            themeToggleBtn.innerHTML = '☀️';
            localStorage.setItem('theme', 'dark');
        } else {
            themeToggleBtn.innerHTML = '🌙';
            localStorage.setItem('theme', 'light');
        }
    });
});

// ==========================================
// 弹窗控制逻辑
// ==========================================

// 打开弹窗
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    modal.style.display = 'flex';
    // 延迟 10 毫秒添加 active 类，为了触发丝滑的淡入动画
    setTimeout(() => { modal.classList.add('active'); }, 10);
}

// 关闭弹窗
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    modal.classList.remove('active');
    // 等待 300 毫秒动画结束后，彻底隐藏 DOM
    setTimeout(() => { modal.style.display = 'none'; }, 300);
}

// 点击弹窗外部的半透明黑色背景，也能自动关闭弹窗
window.onclick = function(event) {
    if (event.target.classList.contains('modal-overlay')) {
        closeModal(event.target.id);
    }
}