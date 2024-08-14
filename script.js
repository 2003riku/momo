let slideIndex = 0;
let slides;
let dots;
let timeoutId;
let isHovered = false;

function initSlideshow() {
    slides = document.getElementsByClassName("mySlides");
    dots = document.getElementsByClassName("dot");
    addHoverListeners();
    showSlides();
}

function addHoverListeners() {
    for (let i = 0; i < slides.length; i++) {
        slides[i].addEventListener('mouseenter', () => {
            isHovered = true;
            clearTimeout(timeoutId);
            slides[i].querySelector('.image-description').style.opacity = '1';
        });
        slides[i].addEventListener('mouseleave', () => {
            isHovered = false;
            slides[i].querySelector('.image-description').style.opacity = '0';
            timeoutId = setTimeout(showSlides, 3000);
        });
    }
}

function showSlides() {
    if (isHovered) return;

    let i;
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}    
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";  
    dots[slideIndex-1].className += " active";
    clearTimeout(timeoutId);
    if (!isHovered) {
        timeoutId = setTimeout(showSlides, 3000); // 3秒ごとに変更
    }
}

function plusSlides(n) {
    clearTimeout(timeoutId);
    slideIndex += n - 1;
    showSlides();
}

function currentSlide(n) {
    clearTimeout(timeoutId);
    slideIndex = n - 1;
    showSlides();
}

// ページ読み込み時にスライドショーを初期化
window.onload = initSlideshow;

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
        
        var description = document.createElement('div');
        description.className = 'image-description';
        description.textContent = '新しい画像 ' + (index + 1);
        slide.appendChild(description);
        
        slideshowContainer.appendChild(slide);
        
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
    
    // スライドショーを更新
    clearTimeout(timeoutId);
    showSlides();
}
