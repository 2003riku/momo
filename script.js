let slideIndex = 0;
showSlides();

// 次へ/前へコントロール
function plusSlides(n) {
    slideIndex += n;
    if (slideIndex >= document.getElementsByClassName("mySlides").length) {
        slideIndex = 0;
    } else if (slideIndex < 0) {
        slideIndex = document.getElementsByClassName("mySlides").length - 1;
    }
    showSlides(slideIndex);
}

// 各スライドのサムネイル
function currentSlide(n) {
    slideIndex = n - 1;
    showSlides(slideIndex);
}

function showSlides() {
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";  
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}    
    for (let i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";  
    dots[slideIndex-1].className += " active";
    setTimeout(showSlides, 5000); // 5秒ごとに変更
  }
  
  // イベントリスナーを追加して、ホバー効果がモバイルデバイスでも機能するようにします
  document.querySelectorAll('.mySlides').forEach(slide => {
    slide.addEventListener('touchstart', function() {
      this.classList.add('hover');
    }, {passive: true});
    
    slide.addEventListener('touchend', function() {
      this.classList.remove('hover');
    }, {passive: true});
  });

// 初期化関数
function initSlideshow() {
    showSlides(); // 最初のスライドを表示
    setInterval(showSlides, 3000); // 3秒ごとにスライドを切り替え
}

// ページ読み込み時にスライドショーを初期化
window.onload = initSlideshow;

// 新しい画像が追加されたときの処理
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
        dotsContainer.appendChild(dot);
    });
    
    // スライドとドットの参照を更新
    slides = document.getElementsByClassName("mySlides");
    dots = document.getElementsByClassName("dot");
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
        
        // ここで、サーバーにデータを送信する処理を行います
        // 例: fetch('/upload', { method: 'POST', body: formData })
        //     .then(response => response.json())
        //     .then(data => {
        //         // アップロード成功後の処理
        //         updateSlideshow(data.newImages);
        //         alert('画像のアップロードが完了しました。');
        //     })
        //     .catch(error => {
        //         console.error('Error:', error);
        //         alert('アップロードに失敗しました。');
        //     });
        
        // 注: 実際のサーバー通信の代わりに、ローカルでの処理をシミュレート
        setTimeout(() => {
            var newImages = Array.from(imageFiles).map(file => URL.createObjectURL(file));
            updateSlideshow(newImages);
            
            // スライドとドットの参照を更新
            slides = document.getElementsByClassName("mySlides");
            dots = document.getElementsByClassName("dot");
            
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
        slideshowContainer.appendChild(slide);
        
        var dot = document.createElement('span');
        dot.className = 'dot';
        dot.onclick = function() { currentSlide(slideshowContainer.children.length); };
        dotsContainer.appendChild(dot);
    });
    
    // スライドショーを更新
    showSlides();
}