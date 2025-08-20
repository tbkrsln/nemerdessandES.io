// Üstadım Projesi - Ana JavaScript Dosyası
class UstadimApp {
    constructor() {
        this.currentScreen = 'mainScreen';
        this.screens = {
            mainScreen: document.getElementById('mainScreen'),
            secondScreen: document.getElementById('secondScreen'),
            thirdScreen: document.getElementById('thirdScreen'),
            fourthScreen: document.getElementById('fourthScreen'),
            fifthScreen: document.getElementById('fifthScreen')
        };
        
        this.buttons = {
            efendimBtn: document.getElementById('efendimBtn'),
            insanSevmiyorumBtn: document.getElementById('insanSevmiyorumBtn'),
            evetBtn: document.getElementById('evetBtn'),
            hayirBtn: document.getElementById('hayirBtn'),
            cokSeviyorumBtn: document.getElementById('cokSeviyorumBtn'),
            sonsuzSevgiBtn: document.getElementById('sonsuzSevgiBtn'),
            azSeviyorumBtn: document.getElementById('azSeviyorumBtn'),
            hicSevmiyorumBtn: document.getElementById('hicSevmiyorumBtn'),
            evetEvlenirimBtn: document.getElementById('evetEvlenirimBtn'),
            dusuneyimBtn: document.getElementById('dusuneyimBtn'),
            hayirEvlenmemBtn: document.getElementById('hayirEvlenmemBtn'),
            backToStartBtn: document.getElementById('backToStartBtn')
        };
        
        this.loadingOverlay = document.getElementById('loadingOverlay');
        this.growingBtn = document.getElementById('evetBtn');
        this.growthInterval = null;
        this.growthCount = 0;
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.hideLoadingOverlay();
        this.startBackgroundAnimations();
        console.log('🎉 Üstadım uygulaması başlatıldı!');
    }
    
    setupEventListeners() {
        // Ana ekran butonları
        this.buttons.efendimBtn.addEventListener('click', () => {
            this.showScreen('secondScreen');
            this.playButtonSound();
        });
        
        this.buttons.insanSevmiyorumBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.shakeButton(this.buttons.insanSevmiyorumBtn);
            this.showNotification('😤 Yalan söylüyorsun!', 'warning');
        });
        
        // İkinci ekran butonları
        this.buttons.evetBtn.addEventListener('click', () => {
            this.showScreen('thirdScreen');
            this.playButtonSound();
        });
        
        this.buttons.hayirBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.shakeButton(this.buttons.hayirBtn);
            this.showNotification('😅 Yine yalan söylüyorsun!', 'warning');
        });
        
        // Üçüncü ekran butonları
        this.buttons.cokSeviyorumBtn.addEventListener('click', () => {
            this.showScreen('fourthScreen');
            this.playButtonSound();
            this.showNotification('💕 Aww, çok tatlısın!', 'success');
        });
        
        this.buttons.sonsuzSevgiBtn.addEventListener('click', () => {
            this.showScreen('fourthScreen');
            this.playButtonSound();
            this.showNotification('💖 Kocaman sevgi! Muhteşem!', 'success');
        });
        
        this.buttons.azSeviyorumBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.shakeButton(this.buttons.azSeviyorumBtn);
            this.showNotification('😐 Az mı? Daha çok sevmelisin!', 'warning');
        });
        
        this.buttons.hicSevmiyorumBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.shakeButton(this.buttons.hicSevmiyorumBtn);
            this.showNotification('😠 Hiç mi? Bu çok üzücü!', 'error');
            // Bu butona sürekli basılırsa ekstra efekt
            this.addExtraShakeEffect(this.buttons.hicSevmiyorumBtn);
        });
        
        // Dördüncü ekran butonları
        this.buttons.evetEvlenirimBtn.addEventListener('click', () => {
            this.showScreen('fifthScreen');
            this.playButtonSound();
            this.showNotification('💕 HOLLANDA YOLCUSU KALMASIN! 🎉', 'success');
            this.startCelebration();
        });
        
        this.buttons.dusuneyimBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.shakeButton(this.buttons.dusuneyimBtn);
            this.showNotification('🤔 Düşünmeye gerek yok, hemen gidelim!', 'warning');
        });
        
        this.buttons.hayirEvlenmemBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.shakeButton(this.buttons.hayirEvlenmemBtn);
            this.showNotification('😱 HAYIR MI? Tahsilat ne olacak!', 'error');
            this.addExtraShakeEffect(this.buttons.hayirEvlenmemBtn);
        });
        
        // Beşinci ekran butonları
        this.buttons.backToStartBtn.addEventListener('click', () => {
            this.showScreen('mainScreen');
            this.playButtonSound();
            this.resetAllAnimations();
        });
        
        // Klavye kısayolları
        document.addEventListener('keydown', (e) => {
            this.handleKeyboard(e);
        });
        
        // Sayfa yüklendiğinde
        window.addEventListener('load', () => {
            this.hideLoadingOverlay();
        });
    }
    
    showScreen(screenName) {
        // Tüm ekranları gizle
        Object.values(this.screens).forEach(screen => {
            screen.classList.remove('active');
        });
        
        // Seçilen ekranı göster
        if (this.screens[screenName]) {
            this.screens[screenName].classList.add('active');
            this.currentScreen = screenName;
            
            // Ekran geçiş efektleri
            this.addScreenTransitionEffects(screenName);
            
            console.log(`🔄 Ekran değiştirildi: ${screenName}`);
        }
    }
    
    addScreenTransitionEffects(screenName) {
        const screen = this.screens[screenName];
        
        // Ekran içeriğini animasyonlu göster
        const elements = screen.querySelectorAll('.animate__animated');
        elements.forEach((element, index) => {
            element.style.animationDelay = `${index * 0.2}s`;
            element.classList.add('animate__fadeIn');
        });
        
        // Arka plan kalplerini yenile
        this.refreshBackgroundHearts();
        
        // Özel ekran efektleri
        if (screenName === 'fifthScreen') {
            this.startRingAnimation();
        }
    }
    
    shakeButton(button) {
        button.style.animation = 'shake 0.5s ease-in-out';
        button.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            button.style.animation = '';
            button.style.transform = '';
        }, 500);
        
        // Shake animasyonu CSS'e ekle
        if (!document.querySelector('#shakeKeyframes')) {
            const style = document.createElement('style');
            style.id = 'shakeKeyframes';
            style.textContent = `
                @keyframes shake {
                    0%, 100% { transform: translateX(0) scale(0.95); }
                    25% { transform: translateX(-5px) scale(0.95); }
                    75% { transform: translateX(5px) scale(0.95); }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    addExtraShakeEffect(button) {
        // Ekstra sallama efekti
        button.style.animation = 'extraShake 1s ease-in-out';
        
        setTimeout(() => {
            button.style.animation = '';
        }, 1000);
        
        // Extra shake animasyonu
        if (!document.querySelector('#extraShakeKeyframes')) {
            const style = document.createElement('style');
            style.id = 'extraShakeKeyframes';
            style.textContent = `
                @keyframes extraShake {
                    0%, 100% { transform: translateX(0) rotate(0deg); }
                    25% { transform: translateX(-15px) rotate(-5deg); }
                    50% { transform: translateX(15px) rotate(5deg); }
                    75% { transform: translateX(-15px) rotate(-5deg); }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    startRingAnimation() {
        const ring = document.querySelector('.ring');
        if (ring) {
            ring.style.animation = 'ringBounce 2s ease-in-out infinite';
        }
    }
    
    startCelebration() {
        // Konfeti efekti
        this.createConfetti();
        
        // Ses efekti
        this.playCelebrationSound();
    }
    
    createConfetti() {
        const colors = ['#ff6b9d', '#ffd700', '#667eea', '#4CAF50', '#ff9800'];
        
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.style.cssText = `
                    position: fixed;
                    top: -10px;
                    left: ${Math.random() * 100}%;
                    width: 10px;
                    height: 10px;
                    background: ${colors[Math.floor(Math.random() * colors.length)]};
                    border-radius: 50%;
                    animation: confettiFall 3s linear forwards;
                    z-index: 1000;
                `;
                
                document.body.appendChild(confetti);
                
                setTimeout(() => {
                    if (confetti.parentNode) {
                        confetti.remove();
                    }
                }, 3000);
            }, i * 100);
        }
        
        // Confetti animasyonu CSS'e ekle
        if (!document.querySelector('#confettiKeyframes')) {
            const style = document.createElement('style');
            style.id = 'confettiKeyframes';
            style.textContent = `
                @keyframes confettiFall {
                    0% {
                        transform: translateY(-10px) rotate(0deg);
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(100vh) rotate(720deg);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    playCelebrationSound() {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            
            // Çoklu ton çal
            for (let i = 0; i < 5; i++) {
                setTimeout(() => {
                    const oscillator = audioContext.createOscillator();
                    const gainNode = audioContext.createGain();
                    
                    oscillator.connect(gainNode);
                    gainNode.connect(audioContext.destination);
                    
                    oscillator.frequency.setValueAtTime(800 + (i * 100), audioContext.currentTime);
                    oscillator.frequency.exponentialRampToValueAtTime(400 + (i * 100), audioContext.currentTime + 0.2);
                    
                    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
                    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
                    
                    oscillator.start(audioContext.currentTime);
                    oscillator.stop(audioContext.currentTime + 0.2);
                }, i * 200);
            }
        } catch (error) {
            console.log('Kutlama sesi çalınamadı:', error);
        }
    }
    
    resetAllAnimations() {
        // Tüm animasyonları sıfırla
        this.stopGrowingAnimation();
        
        // Butonları normal boyuta getir
        Object.values(this.buttons).forEach(button => {
            if (button) {
                button.style.transform = '';
                button.style.animation = '';
            }
        });
        
        // Konfeti temizle
        const confetti = document.querySelectorAll('div[style*="confettiFall"]');
        confetti.forEach(c => c.remove());
        
        console.log('🔄 Tüm animasyonlar sıfırlandı');
    }
    
    startGrowingAnimation() {
        if (this.growthInterval) return;
        
        this.growthCount = 0;
        this.growthInterval = setInterval(() => {
            this.growthCount++;
            const scale = 1 + (this.growthCount * 0.1);
            const fontSize = 1.1 + (this.growthCount * 0.05);
            
            this.growingBtn.style.transform = `scale(${scale})`;
            this.growingBtn.style.fontSize = `${fontSize}rem`;
            
            // Maksimum boyut sınırı
            if (scale >= 2) {
                this.stopGrowingAnimation();
                this.showNotification('🎉 Buton çok büyüdü!', 'success');
            }
        }, 1000); // Her saniye büyüme
        
        console.log('🌱 Büyüme animasyonu başlatıldı');
    }
    
    stopGrowingAnimation() {
        if (this.growthInterval) {
            clearInterval(this.growthInterval);
            this.growthInterval = null;
            
            // Butonu normal boyuta getir
            setTimeout(() => {
                this.growingBtn.style.transform = 'scale(1)';
                this.growingBtn.style.fontSize = '1.1rem';
            }, 1000);
            
            console.log('🛑 Büyüme animasyonu durduruldu');
        }
    }
    
    refreshBackgroundHearts() {
        const hearts = document.querySelectorAll('.background-hearts .heart');
        hearts.forEach((heart, index) => {
            heart.style.animation = 'none';
            setTimeout(() => {
                heart.style.animation = `floatHeart 8s linear infinite ${index * 1.5}s`;
            }, 100);
        });
    }
    
    startBackgroundAnimations() {
        // Arka plan kalplerini başlat
        this.refreshBackgroundHearts();
        
        // Gradient animasyonunu başlat
        document.body.style.animation = 'gradientShift 15s ease infinite';
    }
    
    hideLoadingOverlay() {
        setTimeout(() => {
            this.loadingOverlay.classList.add('hidden');
            setTimeout(() => {
                this.loadingOverlay.style.display = 'none';
            }, 500);
        }, 1500);
    }
    
    showNotification(message, type = 'info') {
        // Mevcut bildirimleri temizle
        const existingNotifications = document.querySelectorAll('.custom-notification');
        existingNotifications.forEach(notification => notification.remove());
        
        const notification = document.createElement('div');
        notification.className = `custom-notification notification-${type}`;
        notification.innerHTML = `
            <span class="notification-message">${message}</span>
            <button class="notification-close">×</button>
        `;
        
        // Stil ekle
        const colors = {
            success: '#4CAF50',
            warning: '#ff9800',
            error: '#f44336',
            info: '#2196F3'
        };
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${colors[type] || colors.info};
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            z-index: 1000;
            display: flex;
            align-items: center;
            gap: 10px;
            animation: slideInRight 0.3s ease-out;
            max-width: 300px;
            font-family: 'Poppins', sans-serif;
            font-weight: 500;
        `;
        
        // Kapatma butonu
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.style.cssText = `
            background: none;
            border: none;
            color: white;
            font-size: 20px;
            cursor: pointer;
            padding: 0;
            margin-left: 10px;
        `;
        
        closeBtn.addEventListener('click', () => {
            notification.remove();
        });
        
        document.body.appendChild(notification);
        
        // 4 saniye sonra otomatik kaldır
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOutRight 0.3s ease-out';
                setTimeout(() => notification.remove(), 300);
            }
        }, 4000);
    }
    
    playButtonSound() {
        // Basit ses efekti (tarayıcı uyumluluğu için)
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
            
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.1);
        } catch (error) {
            console.log('Ses efekti çalınamadı:', error);
        }
    }
    
    handleKeyboard(event) {
        switch(event.key) {
            case '1':
                this.showScreen('mainScreen');
                break;
            case '2':
                this.showScreen('secondScreen');
                break;
            case '3':
                this.showScreen('thirdScreen');
                break;
            case '4':
                this.showScreen('fourthScreen');
                break;
            case '5':
                this.showScreen('fifthScreen');
                break;
            case 'Escape':
                this.showScreen('mainScreen');
                break;
            case 'Enter':
                this.goToNextScreen();
                break;
        }
    }
    
    goToNextScreen() {
        const screenOrder = ['mainScreen', 'secondScreen', 'thirdScreen', 'fourthScreen', 'fifthScreen'];
        const currentIndex = screenOrder.indexOf(this.currentScreen);
        const nextScreen = screenOrder[currentIndex + 1];
        
        if (nextScreen) {
            this.showScreen(nextScreen);
        }
    }
}

// CSS animasyonları için stil ekle
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .notification-close:hover {
        opacity: 0.8;
    }
    
    .custom-notification {
        font-family: 'Poppins', sans-serif;
        font-weight: 500;
    }
`;
document.head.appendChild(style);

// Sayfa yüklendiğinde uygulamayı başlat
document.addEventListener('DOMContentLoaded', () => {
    window.ustadimApp = new UstadimApp();
    
    // Kullanım talimatları
    console.log(`
    🎮 Üstadım Uygulaması Kullanım Talimatları:
    
    📱 Ekran Geçişleri:
    - 1 tuşu: Ana ekran
    - 2 tuşu: İkinci ekran  
    - 3 tuşu: Üçüncü ekran
    - 4 tuşu: Dördüncü ekran
    - 5 tuşu: Beşinci ekran
    - ESC: Ana sayfaya dön
    - Enter: Sonraki ekrana geç
    
    🎯 Özellikler:
    - "İnsan Sevmiyorum" butonu sürekli hareket eder
    - "Evet" butonu süre geçtikçe büyür
    - "Hayır" butonu sürekli hareket eder
    - Yeni ekranlar ve seçenekler
    - Konfeti efektleri
    - Özel animasyonlar
    - Smooth ekran geçişleri
    - Responsive tasarım
    
    💕 İyi eğlenceler!
    `);
});

// Hata yakalama
window.addEventListener('error', (event) => {
    console.error('❌ Uygulama hatası:', event.error);
});

// Sayfa görünürlük değişikliği
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        console.log('📱 Sayfa arka planda');
    } else {
        console.log('📱 Sayfa ön planda');
        if (window.ustadimApp) {
            window.ustadimApp.refreshBackgroundHearts();
        }
    }
});
