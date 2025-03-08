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
    link.addEventListener('click', function(e) {
        e.preventDefault(); // 阻止默認行為
        
        // 關閉移動端選單
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        
        // 獲取目標 section 的 id
        const targetId = this.getAttribute('href');
        
        // 獲取目標元素
        const targetSection = document.querySelector(targetId);
        
        // 平滑滾動到目標位置
        if (targetSection) {
            // 獲取導航欄高度用於偏移量
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            
            // 計算目標位置，減去導航欄高度
            const targetPosition = targetSection.offsetTop - navbarHeight;
            
            // 執行滾動
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // 更新活動狀態
            document.querySelectorAll('.nav-links a').forEach(link => link.classList.remove('active'));
            this.classList.add('active');
        }
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
    
    // 直接顯示固定數量
    playerCountElement.textContent = '30+';
    playerCountElement.title = '在線玩家數量';
    
    // 添加更新動畫效果
    playerCountElement.classList.add('updated');
    setTimeout(() => {
        playerCountElement.classList.remove('updated');
    }, 1000);
}

// 網站功能初始化
document.addEventListener('DOMContentLoaded', function() {
    // 立即更新在線玩家數
    updatePlayerCount();
    
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
        'images/gta6-bg.jpg', // 主背景圖片
        'images/logo.png',    // Logo圖片
        'images/server-preview.jpg', // 伺服器預覽圖
        'images/gallery1.jpg',
        'images/gallery2.jpg',
        'images/gallery3.jpg',
        'images/gallery4.jpg',
        'images/gallery5.jpg'
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
    
    // 設置初始活動導航項
    setActiveNavItem();
    
    // 監聽滾動事件以更新活動導航項
    window.addEventListener('scroll', setActiveNavItem);
});

// 設置活動導航項
function setActiveNavItem() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let currentSection = '';
    
    // 獲取導航欄高度
    const navbarHeight = document.querySelector('.navbar').offsetHeight;
    
    // 找出當前視窗中的區域
    sections.forEach(section => {
        const sectionTop = section.offsetTop - navbarHeight - 100; // 添加一些偏移量
        const sectionHeight = section.offsetHeight;
        const sectionId = '#' + section.getAttribute('id');
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = sectionId;
        }
    });
    
    // 更新導航項的活動狀態
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentSection) {
            link.classList.add('active');
        }
    });
} 