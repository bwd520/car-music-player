// 车机音乐播放器主应用
class CarMusicPlayer {
    constructor() {
        this.currentSong = null;
        this.currentIndex = 0;
        this.isPlaying = false;
        this.volume = 0.8;
        this.isCarMode = false;
        this.playlist = [];
        this.elements = {};
        this.demoInterval = null;
        this.init();
    }

    async init() {
        try {
            this.initElements();
            this.detectCarMode();
            await this.loadMusicData();
            this.setupEventListeners();
            this.setupCarControls();
            this.showMainApp();
        } catch (error) {
            console.error('应用初始化失败:', error);
            this.showMainApp();
        }
    }

    initElements() {
        const elementIds = [
            'loading', 'main-app', 'car-mode-indicator',
            'album-image', 'song-title', 'song-artist',
            'current-time', 'duration', 'progress-bar', 'progress-fill', 'progress-handle',
            'prev-btn', 'play-btn', 'next-btn',
            'volume-slider', 'volume-fill', 'volume-level',
            'playlist-toggle', 'playlist-modal', 'playlist-content', 'close-playlist',
            'audio-player'
        ];
        
        elementIds.forEach(id => {
            this.elements[id] = document.getElementById(id);
        });
    }

    detectCarMode() {
        const isLandscape = window.innerWidth > window.innerHeight;
        const isLargeScreen = window.innerWidth >= 800 || window.innerHeight >= 480;
        this.isCarMode = isLandscape && isLargeScreen;
        
        if (this.isCarMode) {
            this.elements['car-mode-indicator'].classList.remove('hidden');
            document.body.classList.add('car-mode');
        }
    }

    async loadMusicData() {
        try {
            this.playlist = this.getLocalTestData();
            if (this.playlist.length > 0) {
                this.currentSong = this.playlist[0];
                this.currentIndex = 0;
                this.updateUI();
            }
        } catch (error) {
            console.error('加载音乐数据失败:', error);
            this.showError('音乐数据加载失败');
        }
    }    get
DefaultCover(index, text) {
        const colors = ['1db954', 'ff6b6b', '4ecdc4', '45b7d1', 'f7b731'];
        const color = colors[index % colors.length];
        return `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300"><rect width="300" height="300" fill="%23${color}"/><text x="150" y="150" font-family="Arial" font-size="20" fill="white" text-anchor="middle" dy="0.3em">${text}</text></svg>`;
    }

    getLocalTestData() {
        return [
            {
                id: 1,
                title: '车载DJ串烧 - 劲爆电音',
                artist: '沈阳CD024',
                album: '车载音乐精选',
                duration: 240,
                src: 'demo',
                cover: this.getDefaultCover(0, 'DJ MIX'),
                genre: 'Electronic'
            },
            {
                id: 2,
                title: '夜场精选 - 动感节拍',
                artist: '沈阳CD024',
                album: '夜店音乐合集',
                duration: 280,
                src: 'demo',
                cover: this.getDefaultCover(1, 'CLUB'),
                genre: 'Dance'
            },
            {
                id: 3,
                title: '电音派对 - 狂欢时刻',
                artist: '沈阳CD024',
                album: '电子音乐专辑',
                duration: 320,
                src: 'demo',
                cover: this.getDefaultCover(2, 'PARTY'),
                genre: 'EDM'
            },
            {
                id: 4,
                title: '车载慢摇 - 舒缓节奏',
                artist: '沈阳CD024',
                album: '慢摇音乐集',
                duration: 200,
                src: 'demo',
                cover: this.getDefaultCover(3, 'CHILL'),
                genre: 'Chill'
            },
            {
                id: 5,
                title: 'DJ现场 - 混音版',
                artist: '沈阳CD024',
                album: 'DJ现场录音',
                duration: 360,
                src: 'demo',
                cover: this.getDefaultCover(4, 'LIVE'),
                genre: 'Live Mix'
            }
        ];
    }    se
tupEventListeners() {
        this.elements['play-btn'].addEventListener('click', () => this.togglePlayPause());
        this.elements['prev-btn'].addEventListener('click', () => this.playPrevious());
        this.elements['next-btn'].addEventListener('click', () => this.playNext());
        this.elements['progress-bar'].addEventListener('click', (e) => this.handleProgressClick(e));
        this.elements['volume-slider'].addEventListener('click', (e) => this.handleVolumeClick(e));
        this.elements['playlist-toggle'].addEventListener('click', () => this.togglePlaylist());
        this.elements['close-playlist'].addEventListener('click', () => this.hidePlaylist());
        this.elements['playlist-modal'].addEventListener('click', (e) => {
            if (e.target === this.elements['playlist-modal']) {
                this.hidePlaylist();
            }
        });
        
        const audio = this.elements['audio-player'];
        audio.addEventListener('loadedmetadata', () => this.updateDuration());
        audio.addEventListener('timeupdate', () => this.updateProgress());
        audio.addEventListener('ended', () => this.playNext());
        audio.addEventListener('play', () => this.onPlay());
        audio.addEventListener('pause', () => this.onPause());
        audio.addEventListener('error', (e) => this.onAudioError(e));
        
        document.addEventListener('keydown', (e) => this.handleKeyDown(e));
        window.addEventListener('resize', () => this.detectCarMode());
    }

    setupCarControls() {
        if ('mediaSession' in navigator) {
            navigator.mediaSession.setActionHandler('play', () => this.play());
            navigator.mediaSession.setActionHandler('pause', () => this.pause());
            navigator.mediaSession.setActionHandler('previoustrack', () => this.playPrevious());
            navigator.mediaSession.setActionHandler('nexttrack', () => this.playNext());
        }
    }

    showMainApp() {
        this.elements['loading'].classList.add('hidden');
        this.elements['main-app'].classList.remove('hidden');
        this.setVolume(this.volume);
        
        // 显示演示模式提示
        setTimeout(() => {
            this.showError('演示模式：点击播放按钮体验界面功能', 'info');
        }, 1000);
    }

    updateUI() {
        if (!this.currentSong) return;
        
        this.elements['song-title'].textContent = this.currentSong.title;
        this.elements['song-artist'].textContent = this.currentSong.artist;
        this.elements['album-image'].src = this.currentSong.cover;
        this.elements['album-image'].alt = this.currentSong.title;
        this.elements['duration'].textContent = this.formatTime(this.currentSong.duration);
        
        if ('mediaSession' in navigator) {
            navigator.mediaSession.metadata = new MediaMetadata({
                title: this.currentSong.title,
                artist: this.currentSong.artist,
                album: this.currentSong.album,
                artwork: [{ src: this.currentSong.cover, sizes: '300x300', type: 'image/svg+xml' }]
            });
        }
        
        this.updatePlaylist();
    }    toggleP
layPause() {
        if (this.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
    }

    async play() {
        try {
            if (!this.currentSong) return;
            
            // 检查是否为演示模式
            if (this.currentSong.src === 'demo') {
                this.startDemoMode();
                return;
            }
            
            const audio = this.elements['audio-player'];
            
            if (audio.src !== this.currentSong.src) {
                audio.src = this.currentSong.src;
            }
            
            audio.volume = this.volume;
            await audio.play();
            
        } catch (error) {
            console.error('播放失败:', error);
            this.showError('播放失败，使用演示模式');
            this.startDemoMode();
        }
    }

    startDemoMode() {
        if (this.demoInterval) {
            clearInterval(this.demoInterval);
        }
        
        this.isPlaying = true;
        this.onPlay();
        
        let currentTime = 0;
        const duration = this.currentSong.duration;
        
        this.demoInterval = setInterval(() => {
            currentTime += 1;
            
            const percentage = (currentTime / duration) * 100;
            this.elements['progress-fill'].style.width = `${percentage}%`;
            this.elements['progress-handle'].style.left = `${percentage}%`;
            this.elements['current-time'].textContent = this.formatTime(currentTime);
            
            if (currentTime >= duration) {
                clearInterval(this.demoInterval);
                this.demoInterval = null;
                this.onPause();
                setTimeout(() => this.playNext(), 500);
            }
        }, 1000);
    }

    pause() {
        if (this.demoInterval) {
            clearInterval(this.demoInterval);
            this.demoInterval = null;
        }
        
        const audio = this.elements['audio-player'];
        if (audio.src && audio.src !== 'demo') {
            audio.pause();
        } else {
            this.onPause();
        }
    }    playNe
xt() {
        if (this.playlist.length === 0) return;
        
        if (this.demoInterval) {
            clearInterval(this.demoInterval);
            this.demoInterval = null;
        }
        
        this.currentIndex = (this.currentIndex + 1) % this.playlist.length;
        this.currentSong = this.playlist[this.currentIndex];
        this.updateUI();
        
        if (this.isPlaying) {
            this.play();
        }
    }

    playPrevious() {
        if (this.playlist.length === 0) return;
        
        if (this.demoInterval) {
            clearInterval(this.demoInterval);
            this.demoInterval = null;
        }
        
        this.currentIndex = (this.currentIndex - 1 + this.playlist.length) % this.playlist.length;
        this.currentSong = this.playlist[this.currentIndex];
        this.updateUI();
        
        if (this.isPlaying) {
            this.play();
        }
    }

    handleProgressClick(e) {
        const rect = e.target.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const width = rect.width;
        const percentage = clickX / width;
        
        if (this.currentSong.src === 'demo') {
            // 演示模式下模拟跳转
            const newTime = percentage * this.currentSong.duration;
            this.elements['current-time'].textContent = this.formatTime(newTime);
            this.elements['progress-fill'].style.width = `${percentage * 100}%`;
            this.elements['progress-handle'].style.left = `${percentage * 100}%`;
        } else {
            const audio = this.elements['audio-player'];
            if (audio.duration) {
                audio.currentTime = percentage * audio.duration;
            }
        }
    }

    handleVolumeClick(e) {
        const rect = e.target.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const width = rect.width;
        const newVolume = Math.max(0, Math.min(1, clickX / width));
        this.setVolume(newVolume);
    }

    setVolume(volume) {
        this.volume = Math.max(0, Math.min(1, volume));
        
        const audio = this.elements['audio-player'];
        audio.volume = this.volume;
        
        this.elements['volume-fill'].style.width = `${this.volume * 100}%`;
        this.elements['volume-level'].textContent = `${Math.round(this.volume * 100)}%`;
    }    
updateDuration() {
        const audio = this.elements['audio-player'];
        if (audio.duration) {
            this.elements['duration'].textContent = this.formatTime(audio.duration);
        }
    }

    updateProgress() {
        const audio = this.elements['audio-player'];
        if (audio.duration) {
            const percentage = (audio.currentTime / audio.duration) * 100;
            this.elements['progress-fill'].style.width = `${percentage}%`;
            this.elements['progress-handle'].style.left = `${percentage}%`;
            this.elements['current-time'].textContent = this.formatTime(audio.currentTime);
        }
    }

    formatTime(seconds) {
        if (isNaN(seconds)) return '00:00';
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    onPlay() {
        this.isPlaying = true;
        this.elements['play-btn'].textContent = '⏸️';
        this.elements['album-image'].parentElement.classList.add('rotating');
    }

    onPause() {
        this.isPlaying = false;
        this.elements['play-btn'].textContent = '▶️';
        this.elements['album-image'].parentElement.classList.remove('rotating');
    }

    onAudioError(e) {
        console.error('音频播放错误:', e);
        this.showError('音频加载失败，使用演示模式');
        this.startDemoMode();
    }

    togglePlaylist() {
        const modal = this.elements['playlist-modal'];
        if (modal.classList.contains('hidden')) {
            this.showPlaylist();
        } else {
            this.hidePlaylist();
        }
    }

    showPlaylist() {
        this.elements['playlist-modal'].classList.remove('hidden');
        this.elements['playlist-toggle'].textContent = '📋 隐藏播放列表';
    }

    hidePlaylist() {
        this.elements['playlist-modal'].classList.add('hidden');
        this.elements['playlist-toggle'].textContent = '📋 显示播放列表';
    }    
updatePlaylist() {
        const container = this.elements['playlist-content'];
        container.innerHTML = '';
        
        this.playlist.forEach((song, index) => {
            const item = document.createElement('div');
            item.className = `playlist-item ${index === this.currentIndex ? 'active' : ''}`;
            
            item.innerHTML = `
                <img src="${song.cover}" alt="${song.title}">
                <div class="playlist-item-info">
                    <div class="playlist-item-title">${song.title}</div>
                    <div class="playlist-item-artist">${song.artist}</div>
                </div>
                ${index === this.currentIndex ? '<span class="playing-indicator">🎵</span>' : ''}
            `;
            
            item.addEventListener('click', () => this.selectSong(index));
            container.appendChild(item);
        });
    }

    selectSong(index) {
        if (index >= 0 && index < this.playlist.length) {
            if (this.demoInterval) {
                clearInterval(this.demoInterval);
                this.demoInterval = null;
            }
            
            this.currentIndex = index;
            this.currentSong = this.playlist[index];
            this.updateUI();
            this.hidePlaylist();
            
            if (this.isPlaying) {
                this.play();
            }
        }
    }

    handleKeyDown(e) {
        switch (e.code) {
            case 'Space':
                e.preventDefault();
                this.togglePlayPause();
                break;
            case 'ArrowLeft':
                e.preventDefault();
                this.playPrevious();
                break;
            case 'ArrowRight':
                e.preventDefault();
                this.playNext();
                break;
            case 'ArrowUp':
                e.preventDefault();
                this.setVolume(this.volume + 0.1);
                break;
            case 'ArrowDown':
                e.preventDefault();
                this.setVolume(this.volume - 0.1);
                break;
            case 'KeyL':
                e.preventDefault();
                this.togglePlaylist();
                break;
            case 'Escape':
                e.preventDefault();
                this.hidePlaylist();
                break;
        }
    }    showEr
ror(message, type = 'error') {
        const errorDiv = document.createElement('div');
        const bgColor = type === 'info' ? '#17a2b8' : '#dc3545';
        
        errorDiv.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: ${bgColor};
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            z-index: 10000;
            font-size: 14px;
            max-width: 80%;
            text-align: center;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            animation: slideDown 0.3s ease;
        `;
        
        // 添加动画样式
        if (!document.getElementById('notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                @keyframes slideDown {
                    from { transform: translateX(-50%) translateY(-100%); opacity: 0; }
                    to { transform: translateX(-50%) translateY(0); opacity: 1; }
                }
            `;
            document.head.appendChild(style);
        }
        
        errorDiv.textContent = message;
        document.body.appendChild(errorDiv);
        
        setTimeout(() => {
            if (document.body.contains(errorDiv)) {
                errorDiv.style.animation = 'slideDown 0.3s ease reverse';
                setTimeout(() => {
                    if (document.body.contains(errorDiv)) {
                        document.body.removeChild(errorDiv);
                    }
                }, 300);
            }
        }, type === 'info' ? 3000 : 5000);
    }
}

// 初始化应用
document.addEventListener('DOMContentLoaded', () => {
    new CarMusicPlayer();
});

// 防止页面刷新时的意外行为
window.addEventListener('beforeunload', (e) => {
    // 可以在这里保存播放状态
});