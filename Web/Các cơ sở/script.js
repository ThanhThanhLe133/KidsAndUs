$(document).ready(() => {
    window.onload = function() {
        window.location.reload();
    };
    //load effect
    const waveElements = $(".wave-effect");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    $(entry.target).addClass("visible");
                }
            });
        },
        { threshold: 0.5 }
    );

    waveElements.each((index, el) => observer.observe(el));

    //.header.fixed
    const header = $('.header.fixed');

    $(window).on('scroll', function () {
        if ($(this).scrollTop() === 0) {
            header.css('top', '42px');
        } else {
            header.css('top', '0px');
        }
    });

    //slide image .top
    let currentIndex1 = 0;
    const slides1 = $('.image-slide.top ul li');
    const totalSlides1 = slides1.length;

    function showNextSlide1() {
        currentIndex1++;
        if (currentIndex1 >= totalSlides1) {
            currentIndex1 = 0; 
        }
        updateSlidePosition1();
    }

    function showPreviousSlide1() {
        if (currentIndex1 > 0) {
            currentIndex1--; 
        }        
        updateSlidePosition1();
    }

    function updateSlidePosition1() {
        const slideContainer = $('.image-slide.top ul');
        const slideWidth = slides1.outerWidth(); // Sử dụng outerWidth để lấy chiều rộng bao gồm padding
        slideContainer.css('transform', `translateX(-${currentIndex1 * slideWidth}px)`);
    }

    $('.top .prev').on('click', showPreviousSlide1);
    $('.top .next').on('click', showNextSlide1);
    
    setInterval(showNextSlide1, 5000);

     //slide image .method
     let currentIndex2 = 0;
     const slides2 = $('.image-slide.method ul li');
     const totalSlides2 = slides2.length;
 
     function showNextSlide2() {
         currentIndex2++;
         if (currentIndex2 >= totalSlides2) {
             currentIndex2 = 0; 
         }
         updateSlidePosition2();
     }
 
     function showPreviousSlide2() {
         if (currentIndex2 > 0) {
             currentIndex2--; 
         }        
         updateSlidePosition2();
     }
 
     function updateSlidePosition2() {
         const slideContainer = $('.image-slide.method ul');
         const slideWidth = slides2.outerWidth(); // Sử dụng outerWidth để lấy chiều rộng bao gồm padding
         slideContainer.css('transform', `translateX(-${currentIndex2 * slideWidth}px)`);
     }
 
     $('.method .prev').on('click', showPreviousSlide2);
     $('.method .next').on('click', showNextSlide2);
     
     setInterval(showNextSlide2, 3000);

     //register-form
     $('input, select').on('blur', function() {
        let $select = $(this);
        if ($select.val() === "") {
            $select.addClass('error');
            $select.next('.error-message').show();
        } else {
            $select.removeClass('error');
            $select.next('.error-message').hide();
        }
    });

    $('input, select').on('focus', function() {
        $(this).removeClass('error');
        $(this).next('.error-message').hide();
    });
    $('select').on('click', function() {
        let $select = $(this);
        $select.css('color', '#353535');
    });

    const imgs = [
        'images/base_11.jpg',
        'images/base_12.jpg',
        'images/base_13.jpg',
        'images/base_14.jpg',
        'images/base_15.jpg',
    ]; // Replace with your images

    let viewIndex = -1;

    // Render image grid
    const $grid = $('.interactive-img__container');
    imgs.forEach((img, index) => {
        const $item = $(`
            <div class="interactive__item">
                <img src="${img}" alt="Thumbnail ${index + 1}" class="interactive__item-thumbnail" data-index="${index}">
            </div>
        `);
        $grid.append($item);
    });

    // Open viewer
    $grid.on('click', '.interactive__item-thumbnail', function () {
        viewIndex = parseInt($(this).data('index'));
        showViewer();
    });

    // Close viewer
    $(document).on('click', '.interactive__item-viewer', function () {
        closeViewer();
    });

    // Prevent image clicks from closing the viewer
    $(document).on('click', '.interactive__item__viewer-image', function (e) {
        e.stopPropagation();
    });

    // Navigate to previous image
    $(document).on('click', '.interactive__item__viewer-button:first-of-type', function (e) {
        e.stopPropagation();
        viewIndex = viewIndex === 0 ? imgs.length - 1 : viewIndex - 1;
        updateViewer();
    });

    // Navigate to next image
    $(document).on('click', '.interactive__item__viewer-button:last-of-type', function (e) {
        e.stopPropagation();
        viewIndex = (viewIndex + 1) % imgs.length;
        updateViewer();
    });

    // Show viewer overlay
    function showViewer() {
        const $viewer = $(`
            <div class="interactive__item-viewer">
                <img src="${imgs[viewIndex]}" class="interactive__item__viewer-image" alt="Image Viewer">
                <button class="interactive__item__viewer-button">❮</button>
                <button class="interactive__item__viewer-button">❯</button>
            </div>
        `);
        $('body').append($viewer);
    }

    // Update viewer image
    function updateViewer() {
        $('.interactive__item-viewer img').attr('src', imgs[viewIndex]);
    }

    // Close viewer
    function closeViewer() {
        $('.interactive__item-viewer').remove();
        viewIndex = -1;
    }
});