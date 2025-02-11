// 获取DOM元素
const timeDisplay = document.querySelector('.time-display');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');

let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;

// 格式化时间显示，精确到百分之一秒
function formatTime(ms) {
    const hours = Math.floor(ms / 3600000);
    const minutes = Math.floor((ms % 3600000) / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const centiseconds = Math.floor((ms % 1000) / 10); // 将毫秒转换为百分之一秒
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`;
}

// 更新显示时间
function updateDisplay() {
    const currentTime = Date.now();
    elapsedTime = startTime ? currentTime - startTime : 0;
    timeDisplay.textContent = formatTime(elapsedTime);
}

// 开始/暂停计时
startBtn.addEventListener('click', () => {
    if (!isRunning) {
        // 开始计时
        isRunning = true;
        startBtn.textContent = '暂停';
        startBtn.classList.add('pause');
        startTime = Date.now() - elapsedTime;
        // 设置更新频率为10毫秒，足够显示百分之一秒的精度
        timerInterval = setInterval(updateDisplay, 10);
    } else {
        // 暂停计时
        isRunning = false;
        startBtn.textContent = '开始';
        startBtn.classList.remove('pause');
        clearInterval(timerInterval);
    }
});

// 重置计时器
resetBtn.addEventListener('click', () => {
    isRunning = false;
    startBtn.textContent = '开始';
    startBtn.classList.remove('pause');
    clearInterval(timerInterval);
    startTime = 0;
    elapsedTime = 0;
    timeDisplay.textContent = '00:00:00.00';
}); 