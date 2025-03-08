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
        document.querySelector(this.getAttribute('href')).scrollIntoView({
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

// FiveM 伺服器資訊
const SERVER_CODE = 'zyldgd'; // 從https://cfx.re/join/zyldgd獲取的伺服器代碼
const CFX_API_URL = `https://servers-frontend.fivem.net/api/servers/single/`;

// 從FiveM API獲取伺服器資訊
async function getFiveMServerInfo() {
    try {
        const response = await fetch(`${CFX_API_URL}${SERVER_CODE}`);
        if (!response.ok) {
            throw new Error('無法獲取伺服器數據');
        }
        const data = await response.json();
        return data.Data;
    } catch (error) {
        console.error('獲取伺服器數據時出錯:', error);
        return null;
    }
}

// 更新在線玩家數量
async function updatePlayerCount() {
    try {
        const serverInfo = await getFiveMServerInfo();
        if (serverInfo) {
            // 更新在線玩家數量
            const onlinePlayers = serverInfo.clients || 0;
            const maxPlayers = serverInfo.sv_maxclients || 128;
            document.getElementById('player-count').textContent = onlinePlayers;
            
            // 更新註冊玩家數量（使用伺服器實際數據，如果有的話）
            if (serverInfo.vars && serverInfo.vars.registeredPlayers) {
                document.getElementById('registered-count').textContent = serverInfo.vars.registeredPlayers;
            }
            
            // 如果伺服器名稱可用，也可以更新
            if (serverInfo.hostname) {
                const serverNameElements = document.querySelectorAll('.server-name');
                serverNameElements.forEach(el => {
                    el.textContent = serverInfo.hostname;
                });
            }
            
            console.log('伺服器資訊已更新', serverInfo);
        } else {
            // 如果API獲取失敗，則使用模擬數據
            fallbackPlayerCount();
        }
    } catch (error) {
        console.error('更新玩家數量時出錯:', error);
        fallbackPlayerCount();
    }
}

// 後備方案：模擬在線玩家數量
function fallbackPlayerCount() {
    const min = 30;
    const max = 120;
    const playerCount = Math.floor(Math.random() * (max - min + 1)) + min;
    document.getElementById('player-count').textContent = playerCount;
}

// 初始加載時更新一次
updatePlayerCount();

// 每60秒更新一次在線玩家數（避免過於頻繁請求API）
setInterval(updatePlayerCount, 60000);

// 創建運營天數計算器
const serverStartDate = new Date('2022-01-01'); // 伺服器開始日期
const currentDate = new Date();
const timeDiff = Math.abs(currentDate.getTime() - serverStartDate.getTime());
const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
document.getElementById('days-count').textContent = daysDiff + '+';

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