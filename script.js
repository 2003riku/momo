let slideIndex = 1;
let slides;
let dots;

function initGallery() {
    slides = document.getElementsByClassName("mySlides");
    dots = document.getElementsByClassName("dot");
    showSlides(slideIndex);
    addHoverListeners();
    createDots();
}

function addHoverListeners() {
    for (let i = 0; i < slides.length; i++) {
        slides[i].addEventListener('mouseenter', () => {
            slides[i].querySelector('.image-description').style.opacity = '1';
        });
        slides[i].addEventListener('mouseleave', () => {
            slides[i].querySelector('.image-description').style.opacity = '0';
        });
    }
}

function createDots() {
    let dotContainer = document.querySelector('.dot-container');
    for (let i = 0; i < slides.length; i++) {
        let dot = document.createElement('span');
        dot.className = 'dot';
        dot.onclick = function() { currentSlide(i + 1); };
        dotContainer.appendChild(dot);
    }
    dots = document.getElementsByClassName("dot");
}

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    if (n > slides.length) {slideIndex = 1}    
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";  
    dots[slideIndex-1].className += " active";
}

// ページ読み込み時にギャラリーを初期化
window.onload = initGallery;

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
            updateGallery(newImages);
            alert('画像のアップロードが完了しました。');
        }, 1000);
    } else {
        alert('アップロードがキャンセルされました。');
    }
});

function updateGallery(newImages) {
    var slideshowContainer = document.querySelector('.slideshow-container');
    var dotsContainer = document.querySelector('.dot-container');
    
    newImages.forEach((src, index) => {
        var slide = document.createElement('div');
        slide.className = 'mySlides fade';
        var img = document.createElement('img');
        img.src = src;
        img.style.width = '100%';
        slide.appendChild(img);
        
        var description = document.createElement('div');
        description.className = 'image-description';
        description.textContent = '新しい画像 ' + (index + 1);
        slide.appendChild(description);
        
        slideshowContainer.insertBefore(slide, slideshowContainer.lastElementChild);
        
        var dot = document.createElement('span');
        dot.className = 'dot';
        dot.onclick = function() { currentSlide(slides.length); };
        dotsContainer.appendChild(dot);
    });
    
    // スライドとドットの参照を更新
    slides = document.getElementsByClassName("mySlides");
    dots = document.getElementsByClassName("dot");
    
    // 新しいスライドにホバーイベントリスナーを追加
    addHoverListeners();
    
    // ギャラリーを更新
    showSlides(slideIndex);
}
// ... 既存のJavaScript ...

// ライトボックスを開く関数
function openLightbox(img) {
    var lightbox = document.getElementById("lightbox");
    var lightboxImg = document.getElementById("lightbox-img");
    var captionText = document.getElementById("lightbox-caption");
    
    lightbox.style.display = "block";
    lightboxImg.src = img.src;
    captionText.innerHTML = img.nextElementSibling.innerHTML;
}

// ライトボックスを閉じる関数
function closeLightbox() {
    document.getElementById("lightbox").style.display = "none";
}

// ESCキーでライトボックスを閉じる
document.addEventListener('keydown', function(event) {
    if (event.key === "Escape") {
        closeLightbox();
    }
});

// ライトボックスの外側をクリックして閉じる
window.onclick = function(event) {
    var lightbox = document.getElementById("lightbox");
    if (event.target === lightbox) {
        closeLightbox();
    }
}
