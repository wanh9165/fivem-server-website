// 導航欄滾動效果
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// 導航欄選單切換
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', function() {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// 關閉導航欄選單點擊鏈接時
document.querySelectorAll('.nav-links a').forEach(function(link) {
    link.addEventListener('click', function() {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// 平滑滾動到錨點
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollView({
            behavior: 'smooth'
        });
    });
});

// 活躍的導航鏈接標記
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', function() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
        }
    });
});

// 從CFX.RE獲取實際在線玩家數
async function updatePlayerCount() {
    const playerCountElement = document.getElementById('player-count');
    if (!playerCountElement) return;
    
    // 顯示加載動畫
    playerCountElement.innerHTML = '<i class="fas fa-sync fa-spin"></i>';
    
    try {
        // 使用 fetch API 直接獲取頁面內容
        const response = await fetch('https://cfx.re/join/zyldgd', {
            method: 'GET',
            headers: {
                'Accept': 'text/html',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });

        if (!response.ok) {
            throw new Error(`無法連接到伺服器 (狀態碼: ${response.status})`);
        }
        
        const html = await response.text();
        
        // 使用更精確的正則表達式匹配玩家數量
        const playerCountMatch = html.match(/people_outline[^0-9]*([0-9]+)/i);
        
        if (playerCountMatch && playerCountMatch[1]) {
            const count = parseInt(playerCountMatch[1], 10);
            
            // 更新顯示
            playerCountElement.textContent = count;
            
            // 更新最後更新時間
            const now = new Date();
            const timeString = now.toLocaleTimeString('zh-TW', { 
                hour: '2-digit', 
                minute: '2-digit',
                second: '2-digit'
            });
            
            // 儲存最後成功更新的時間和數量
            playerCountElement.dataset.lastUpdate = now.toISOString();
            playerCountElement.dataset.lastCount = count;
            
            // 更新工具提示
            playerCountElement.title = `最後更新: ${timeString}`;
            
            // 只有當數量真的改變時才顯示更新動畫
            const lastCount = parseInt(playerCountElement.dataset.lastCount) || 0;
            if (count !== lastCount) {
                playerCountElement.classList.add('updated');
                setTimeout(() => {
                    playerCountElement.classList.remove('updated');
                }, 1000);
            }
            
            console.log(`成功獲取玩家數量: ${count} (${timeString})`);
        } else {
            throw new Error('無法從頁面解析玩家數量');
        }
    } catch (error) {
        console.error('獲取玩家數量失敗:', error);
        
        // 檢查是否有上一次的成功數據
        const lastUpdate = playerCountElement.dataset.lastUpdate;
        const lastCount = playerCountElement.dataset.lastCount;
        
        if (lastCount) {
            // 如果有上一次的數據，繼續顯示，但標註可能不是最新
            playerCountElement.textContent = lastCount;
            const lastUpdateTime = new Date(lastUpdate).toLocaleTimeString('zh-TW');
            playerCountElement.title = `可能不是最新數據 (上次更新: ${lastUpdateTime})`;
        } else {
            // 如果完全沒有數據，顯示連線中
            playerCountElement.textContent = '連線中';
            playerCountElement.title = '正在嘗試連接到伺服器';
        }
    }
}

// 網站功能初始化
document.addEventListener('DOMContentLoaded', function() {
    // 立即更新在線玩家數
    updatePlayerCount();
    
    // 每15秒更新一次在線玩家數
    setInterval(updatePlayerCount, 15000);
    
    // 更新運營天數
    updateOperationDays();
    
    // 每天更新一次運營天數
    setInterval(updateOperationDays, 24 * 60 * 60 * 1000);
});

// 創建運營天數計算器
function updateOperationDays() {
    const serverStartDate = new Date('2025-02-19'); // 伺服器開始日期設定為2025年2月19日
    const currentDate = new Date();
    
    // 檢查當前日期是否已經超過開始日期
    if (currentDate >= serverStartDate) {
        // 正常計算運營天數
        const timeDiff = Math.abs(currentDate.getTime() - serverStartDate.getTime());
        const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
        document.getElementById('days-count').textContent = daysDiff + '+';
    } else {
        // 如果尚未到開始日期，顯示距離開始的倒數天數
        const timeDiff = Math.abs(serverStartDate.getTime() - currentDate.getTime());
        const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
        document.getElementById('days-count').textContent = '即將開業 ' + daysDiff + ' 天';
    }
}

// 圖片預加載
const preloadImages = () => {
    const imageSources = [
        'images/gta6-bg.jpg', // 新的 GTA VI 背景圖片
        'images/join-bg.jpg',
        'images/server-preview.jpg',
        'images/logo.png',
        'images/gallery1.jpg',
        'images/gallery2.jpg',
        'images/gallery3.jpg',
        'images/gallery4.jpg',
        'images/gallery5.jpg',
        'images/gallery6.jpg'
    ];
    
    imageSources.forEach(src => {
        const img = new Image();
        img.src = src;
    });
};

// 頁面加載完成後執行
window.addEventListener('load', () => {
    preloadImages();
    
    // 添加淡入效果
    document.body.classList.add('loaded');
}); 