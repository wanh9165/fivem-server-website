# 一念浪天涯 - GTA FIVEM 伺服器官方網站

這是「一念浪天涯」GTA FIVEM 伺服器的官方網站源碼。網站使用HTML、CSS和JavaScript構建，旨在為玩家提供伺服器資訊、特色介紹以及加入方式。

## 網站特色

- 響應式設計，適配各種設備尺寸
- 現代化UI/UX設計
- 平滑的滾動和動畫效果
- 適合遊戲伺服器的專業展示頁面
- 可擴展性強，易於維護

## 技術堆疊

- HTML5
- CSS3 (自適應設計、Flexbox、Grid佈局)
- JavaScript (原生JS，無依賴框架)
- Font Awesome 圖標
- Google Fonts

## 目錄結構

```
/
├── index.html          # 主HTML文件
├── css/
│   └── style.css       # 樣式文件
├── js/
│   └── script.js       # JavaScript代碼
├── images/             # 圖片資源目錄
│   ├── logo.png
│   ├── hero-bg.jpg
│   ├── join-bg.jpg
│   ├── server-preview.jpg
│   └── gallery/        # 遊戲畫廊圖片
└── README.md           # 本文件
```

## 本地開發與部署

### 本地開發

1. 克隆此儲存庫到本地：
   ```
   git clone https://github.com/yourusername/gta-fivem-server-website.git
   ```

2. 使用瀏覽器打開 `index.html` 文件預覽網站。

### 編輯和更新

1. 所有內容更改可直接在 `index.html` 文件中進行。
2. 樣式調整在 `css/style.css` 文件中修改。
3. 功能調整在 `js/script.js` 文件中更新。

### 自動部署到GitHub Pages

本項目已設置自動部署功能。當你推送更改到主分支後，網站將自動更新：

1. 編輯文件後，提交更改：
   ```
   git add .
   git commit -m "描述你的更改"
   ```

2. 推送到GitHub：
   ```
   git push origin main
   ```

3. GitHub Actions將會自動運行部署流程，幾分鐘後網站將自動更新。

## 圖片替換指南

為達到最佳效果，請使用以下建議的圖片尺寸：

- Logo: 透明背景PNG，建議尺寸200x200像素
- 英雄背景圖: 1920x1080像素，JPG格式
- 加入背景圖: 1920x1080像素，JPG格式
- 服務器預覽圖: 800x600像素，JPG格式
- 畫廊圖片: 800x600像素，JPG格式

## 聯絡與支持

如需技術支持或有任何問題，請聯絡伺服器管理員或訪問我們的Discord社區。

## 授權

本網站模板僅供「一念浪天涯」GTA FIVEM 伺服器使用。未經許可，請勿用於其他服務器或商業用途。 