let slides;
let dots;
let slideIndices = [];
let currentIndex = 0;
let timeoutId;

function initSlideshow() {
    slides = document.getElementsByClassName("mySlides");
    dots = document.getElementsByClassName("dot");
    resetSlideIndices();
    showNextSlide();
}

function resetSlideIndices() {
    slideIndices = Array.from({length: slides.length}, (_, i) => i);
    shuffleArray(slideIndices);
    currentIndex = 0;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function showNextSlide() {
    if (slides.length === 0) return;

    // 全てのスライドを非表示にする
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    // 全てのドットからactiveクラスを削除
    for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    // 次のスライドを表示
    let slideIndex = slideIndices[currentIndex];
    slides[slideIndex].style.display = "block";
    dots[slideIndex].className += " active";

    // インデックスを進める
    currentIndex++;
    if (currentIndex >= slides.length) {
        resetSlideIndices();
    }

    // 3秒後に次のスライドを表示
    clearTimeout(timeoutId);
    timeoutId = setTimeout(showNextSlide, 3000);
}

function plusSlides(n) {
    clearTimeout(timeoutId);
    currentIndex += n;
    if (currentIndex >= slides.length) {
        currentIndex = 0;
    } else if (currentIndex < 0) {
        currentIndex = slides.length - 1;
    }
    showSlide(slideIndices[currentIndex]);
}

function currentSlide(n) {
    clearTimeout(timeoutId);
    let index = slideIndices.indexOf(n - 1);
    if (index !== -1) {
        currentIndex = index;
    }
    showSlide(n - 1);
}

function showSlide(n) {
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[n].style.display = "block";
    dots[n].className += " active";
    clearTimeout(timeoutId);
    timeoutId = setTimeout(showNextSlide, 3000);
}

// イベントリスナーを追加
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.mySlides').forEach(slide => {
        slide.addEventListener('touchstart', function() {
            this.classList.add('hover');
        }, {passive: true});
        
        slide.addEventListener('touchend', function() {
            this.classList.remove('hover');
        }, {passive: true});
    });
});

// ページ読み込み時にスライドショーを初期化
window.onload = initSlideshow;

function updateSlideshow(newImages) {
    var slideshowContainer = document.querySelector('.slideshow-container');
    var dotsContainer = document.querySelector('.dot-container');
    
    newImages.forEach((src, index) => {
        var slide = document.createElement('div');
        slide.className = 'mySlides fade';
        var img = document.createElement('img');
        img.src = src;
        img.style.width = '100%';
        slide.appendChild(img);
        slideshowContainer.appendChild(slide);
        
        var dot = document.createElement('span');
        dot.className = 'dot';
        dot.onclick = function() { currentSlide(slideshowContainer.children.length); };
        dotsContainer.appendChild(dot);
    });
    
    // スライドとドットの参照を更新
    slides = document.getElementsByClassName("mySlides");
    dots = document.getElementsByClassName("dot");
    
    // スライドショーを更新
    clearTimeout(timeoutId);
    resetSlideIndices();
    showNextSlide();
}

document.getElementById('uploadForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    var imageFiles = document.getElementById('imageUpload').files;
    
    if (imageFiles.length === 0) {
        alert('画像を選択してください。');
        return;
    }

    var confirmMessage = '以下の画像をアップロードしてよろしいですか？\n';
    for (var i = 0; i < imageFiles.length; i++) {
        confirmMessage += '- ' + imageFiles[i].name + '\n';
    }

    if (confirm(confirmMessage)) {
        var formData = new FormData();
        
        for (var i = 0; i < imageFiles.length; i++) {
            formData.append('images[]', imageFiles[i]);
        }
        
        // 注: 実際のサーバー通信の代わりに、ローカルでの処理をシミュレート
        setTimeout(() => {
            var newImages = Array.from(imageFiles).map(file => URL.createObjectURL(file));
            updateSlideshow(newImages);
            alert('画像のアップロードが完了しました。');
        }, 1000);
    } else {
        alert('アップロードがキャンセルされました。');
    }
});
