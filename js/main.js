// ==========================================
// 弹窗控制逻辑
// ==========================================
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    modal.style.display = 'flex';
    setTimeout(() => { modal.classList.add('active'); }, 10);
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    modal.classList.remove('active');
    setTimeout(() => { modal.style.display = 'none'; }, 300);
}

window.onclick = function(event) {
    if (event.target.classList.contains('modal-overlay')) {
        closeModal(event.target.id);
    }
}

// ==========================================
// 页面交互逻辑：点赞与评论 (本地缓存模拟版)
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const likeBtn = document.getElementById('like-btn');
    if (likeBtn) {
        const path = window.location.pathname;
        const likeKey = 'liked_' + path;
        const commentsKey = 'comments_' + path;
        
        const likeCountSpan = document.getElementById('like-count');
        const commentList = document.getElementById('comment-list');

        // --- 1. 点赞系统逻辑 ---
        let isLiked = localStorage.getItem(likeKey) === 'true';
        let baseLikes = 12; 
        
        if (isLiked) {
            likeBtn.classList.add('active');
            likeCountSpan.innerText = baseLikes + 1;
        } else {
            likeCountSpan.innerText = baseLikes;
        }

        likeBtn.addEventListener('click', () => {
            isLiked = !isLiked;
            localStorage.setItem(likeKey, isLiked);
            if (isLiked) {
                likeBtn.classList.add('active');
                likeCountSpan.innerText = baseLikes + 1;
            } else {
                likeBtn.classList.remove('active');
                likeCountSpan.innerText = baseLikes;
            }
        });

        // --- 2. 评论系统逻辑 ---
        const renderComments = () => {
            const comments = JSON.parse(localStorage.getItem(commentsKey) || '[]');
            if (comments.length === 0) {
                commentList.innerHTML = '<p class="no-comments">暂无评论，来抢个沙发吧！</p>';
                return;
            }
            commentList.innerHTML = comments.slice().reverse().map(c => `
                <div class="comment-item">
                    <img src="https://api.dicebear.com/7.x/bottts/svg?seed=${c.name}" class="comment-avatar">
                    <div class="comment-content-box">
                        <div class="comment-meta">
                            <span class="comment-author">${c.name}</span> 
                            <span class="comment-time">${c.time}</span>
                        </div>
                        <div class="comment-text">${c.text}</div>
                    </div>
                </div>
            `).join('');
        };
        
        renderComments(); 

        window.submitComment = function() {
            const input = document.getElementById('comment-input');
            const text = input.value.trim();
            if (!text) {
                alert('评论内容不能为空哦！');
                return;
            }
            const comments = JSON.parse(localStorage.getItem(commentsKey) || '[]');
            comments.push({
                name: '访客_' + Math.floor(Math.random() * 9000 + 1000),
                time: new Date().toLocaleString(),
                text: text
            });
            localStorage.setItem(commentsKey, JSON.stringify(comments));
            input.value = ''; 
            renderComments(); 
        }
    }
});