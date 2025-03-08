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
async function fetchRealPlayerCount() {
    try {
        // 使用CORS代理解決跨域問題
        const corsProxy = 'https://corsproxy.io/?';
        const serverCodeOrIP = 'zyldgd'; // 從CFX.RE伺服器代碼
        const apiUrl = `${corsProxy}https://servers-frontend.fivem.net/api/servers/single/${serverCodeOrIP}`;
        
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        // 檢查是否成功獲取數據並且包含玩家數量信息
        if (data && data.Data && data.Data.clients !== undefined) {
            return data.Data.clients; // 返回在線玩家數
        } else {
            throw new Error('無法獲取玩家數據');
        }
    } catch (error) {
        console.error('獲取在線玩家數失敗:', error);
        return null;
    }
}

// 在線玩家計數器更新
async function updatePlayerCount() {
    const playerCountElement = document.getElementById('player-count');
    if (!playerCountElement) return;
    
    // 先顯示加載中
    playerCountElement.textContent = "...";
    
    try {
        // 嘗試獲取實際在線玩家數
        const realPlayerCount = await fetchRealPlayerCount();
        
        if (realPlayerCount !== null) {
            // 成功獲取實際數據
            playerCountElement.textContent = realPlayerCount;
        } else {
            // 如果獲取失敗，使用隨機數字作為備選
            const min = 30;
            const max = 120;
            const fallbackCount = Math.floor(Math.random() * (max - min + 1)) + min;
            playerCountElement.textContent = fallbackCount;
        }
    } catch (error) {
        console.error('更新玩家數錯誤:', error);
        // 發生錯誤時的備用顯示
        playerCountElement.textContent = "在線";
    }
}

// 網站功能初始化
document.addEventListener('DOMContentLoaded', function() {
    // 更新在線玩家數
    updatePlayerCount();
    
    // 每60秒更新一次在線玩家數
    setInterval(updatePlayerCount, 60000);
    
    // 更新運營天數
    updateOperationDays();
    
    // 每天更新一次運營天數
    setInterval(updateOperationDays, 24 * 60 * 60 * 1000);
    
    // 添加伺服器直連按鈕
    const serverJoinButton = document.createElement('a');
    serverJoinButton.className = 'server-join-button';
    serverJoinButton.href = 'https://cfx.re/join/zyldgd';
    serverJoinButton.target = '_blank';
    serverJoinButton.innerHTML = '<i class="fas fa-gamepad"></i> 直接加入伺服器';
    
    // 查找加入區域，添加直連按鈕
    const joinButtons = document.querySelector('.join-buttons');
    if (joinButtons) {
        joinButtons.appendChild(serverJoinButton);
    }
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
        'images/hero-bg.jpg',
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