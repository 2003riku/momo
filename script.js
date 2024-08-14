let slides;
let dots;
let slideIndex = 0;
let timeoutId;

function initSlideshow() {
    slides = document.getElementsByClassName("mySlides");
    dots = document.getElementsByClassName("dot");
    showRandomSlide();
}

function showRandomSlide() {
    if (slides.length === 0) return;

    // 全てのスライドを非表示にする
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    // 全てのドットからactiveクラスを削除
    for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    // ランダムなインデックスを生成
    slideIndex = Math.floor(Math.random() * slides.length);

    // 選択されたスライドを表示
    slides[slideIndex].style.display = "block";
    dots[slideIndex].className += " active";

    // 3秒後に次のランダムスライドを表示
    timeoutId = setTimeout(showRandomSlide, 3000);
}

function plusSlides(n) {
    clearTimeout(timeoutId);
    slideIndex += n;
    if (slideIndex >= slides.length) {
        slideIndex = 0;
    } else if (slideIndex < 0) {
        slideIndex = slides.length - 1;
    }
    showSlide(slideIndex);
}

function currentSlide(n) {
    clearTimeout(timeoutId);
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
    timeoutId = setTimeout(showRandomSlide, 3000);
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
    showRandomSlide();
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
