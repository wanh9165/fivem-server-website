@echo off
echo 正在啟動伺服器...

:: 檢查是否以管理員權限運行
net session >nul 2>&1
if %errorLevel% == 0 (
    echo 已獲得管理員權限
) else (
    echo 請以管理員權限運行此腳本
    echo 按任意鍵退出...
    pause >nul
    exit
)

:: 檢查 Python 是否安裝
python --version >nul 2>&1
if %errorLevel% == 0 (
    echo Python 已安裝
) else (
    echo 未找到 Python，請先安裝 Python
    echo 您可以從 https://www.python.org/downloads/ 下載安裝
    echo 按任意鍵退出...
    pause >nul
    exit
)

:: 檢查端口 80 是否被占用
netstat -ano | find ":80" >nul
if %errorLevel% == 0 (
    echo 警告：端口 80 已被占用
    echo 嘗試使用備用端口 8080...
    set PORT=80
) else (
    set PORT=80
)

:: 殺死可能存在的 Python 進程
taskkill /F /IM python.exe >nul 2>&1

:: 啟動伺服器
echo 正在啟動網站，請稍候...
start "" python -m http.server %PORT% --bind 0.0.0.0

:: 等待伺服器啟動
timeout /t 2 >nul

:: 打開瀏覽器
if %PORT% == 80 (
    start http://localhost
) else (
    start http://localhost:%PORT%
)

echo.
echo 伺服器已啟動！
echo 您可以通過以下地址訪問網站：
echo - http://localhost:%PORT%
echo - http://127.0.0.1:%PORT%
echo - http://[cryptobotx.xyz]:%PORT%
echo.
echo 要停止伺服器，請關閉此窗口或按 Ctrl+C
echo.

:: 保持窗口開啟
pause >nul 