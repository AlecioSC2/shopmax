AOS.init({
  duration: 800,
  easing: 'slide',
  once: true
});

jQuery(document).ready(function($) {
  'use strict';

  var siteMenuClone = function() {
    $('<div class="site-mobile-menu"></div>').prependTo('.site-wrap');

    $('<div class="site-mobile-menu-header"></div>').prependTo(
      '.site-mobile-menu'
    );
    $('<div class="site-mobile-menu-close "></div>').prependTo(
      '.site-mobile-menu-header'
    );
    $('<div class="site-mobile-menu-logo"></div>').prependTo(
      '.site-mobile-menu-header'
    );

    $('<div class="site-mobile-menu-body"></div>').appendTo(
      '.site-mobile-menu'
    );

    $('.js-logo-clone')
      .clone()
      .appendTo('.site-mobile-menu-logo');

    $('<span class="ion-ios-close js-menu-toggle"></div>').prependTo(
      '.site-mobile-menu-close'
    );

    $('.js-clone-nav').each(function() {
      var $this = $(this);
      $this
        .clone()
        .attr('class', 'site-nav-wrap')
        .appendTo('.site-mobile-menu-body');
    });

    setTimeout(function() {
      var counter = 0;
      $('.site-mobile-menu .has-children').each(function() {
        var $this = $(this);

        $this.prepend('<span class="arrow-collapse collapsed">');

        $this.find('.arrow-collapse').attr({
          'data-toggle': 'collapse',
          'data-target': '#collapseItem' + counter
        });

        $this.find('> ul').attr({
          class: 'collapse',
          id: 'collapseItem' + counter
        });

        counter++;
      });
    }, 1000);

    $('body').on('click', '.arrow-collapse', function(e) {
      var $this = $(this);
      if (
        $this
          .closest('li')
          .find('.collapse')
          .hasClass('show')
      ) {
        $this.removeClass('active');
      } else {
        $this.addClass('active');
      }
      e.preventDefault();
    });

    $(window).resize(function() {
      var $this = $(this),
        w = $this.width();

      if (w > 768) {
        if ($('body').hasClass('offcanvas-menu')) {
          $('body').removeClass('offcanvas-menu');
        }
      }
    });

    $('body').on('click', '.js-menu-toggle', function(e) {
      var $this = $(this);
      e.preventDefault();

      if ($('body').hasClass('offcanvas-menu')) {
        $('body').removeClass('offcanvas-menu');
        $this.removeClass('active');
      } else {
        $('body').addClass('offcanvas-menu');
        $this.addClass('active');
      }
    });

    // click outisde offcanvas
    $(document).mouseup(function(e) {
      var container = $('.site-mobile-menu');
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('offcanvas-menu')) {
          $('body').removeClass('offcanvas-menu');
        }
      }
    });
  };
  siteMenuClone();

  var sitePlusMinus = function() {
    $('.js-btn-minus').on('click', function(e) {
      e.preventDefault();
      if (
        $(this)
          .closest('.input-group')
          .find('.form-control')
          .val() != 0
      ) {
        $(this)
          .closest('.input-group')
          .find('.form-control')
          .val(
            parseInt(
              $(this)
                .closest('.input-group')
                .find('.form-control')
                .val()
            ) - 1
          );
      } else {
        $(this)
          .closest('.input-group')
          .find('.form-control')
          .val(parseInt(0));
      }
    });
    $('.js-btn-plus').on('click', function(e) {
      e.preventDefault();
      $(this)
        .closest('.input-group')
        .find('.form-control')
        .val(
          parseInt(
            $(this)
              .closest('.input-group')
              .find('.form-control')
              .val()
          ) + 1
        );
    });
  };
  sitePlusMinus();

  var siteSliderRange = function() {
    $('#slider-range').slider({
      range: true,
      min: 0,
      max: 500,
      values: [75, 300],
      slide: function(event, ui) {
        $('#amount').val('$' + ui.values[0] + ' - $' + ui.values[1]);
      }
    });
    $('#amount').val(
      '$' +
        $('#slider-range').slider('values', 0) +
        ' - $' +
        $('#slider-range').slider('values', 1)
    );
  };
  siteSliderRange();

  var siteMagnificPopup = function() {
    $('.image-popup').magnificPopup({
      type: 'image',
      closeOnContentClick: true,
      closeBtnInside: false,
      fixedContentPos: true,
      mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
      gallery: {
        enabled: true,
        navigateByImgClick: true,
        preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
      },
      image: {
        verticalFit: true
      },
      zoom: {
        enabled: true,
        duration: 300 // don't foget to change the duration also in CSS
      }
    });

    $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
      disableOn: 700,
      type: 'iframe',
      mainClass: 'mfp-fade',
      removalDelay: 160,
      preloader: false,

      fixedContentPos: false
    });
  };
  siteMagnificPopup();

  var searchShow = function() {
    // alert();
    var searchWrap = $('.search-wrap');
    $('.js-search-open').on('click', function(e) {
      e.preventDefault();
      searchWrap.addClass('active');
      setTimeout(function() {
        searchWrap.find('.form-control').focus();
      }, 300);
    });
    $('.js-search-close').on('click', function(e) {
      e.preventDefault();
      searchWrap.removeClass('active');
    });
  };
  searchShow();

  var slider = function() {
    $('.nonloop-block-3').owlCarousel({
      center: false,
      items: 1,
      loop: false,
      stagePadding: 15,
      margin: 20,
      nav: true,
      navText: [
        '<span class="icon-arrow_back">',
        '<span class="icon-arrow_forward">'
      ],
      responsive: {
        600: {
          margin: 20,
          items: 2
        },
        1000: {
          margin: 20,
          items: 3
        },
        1200: {
          margin: 20,
          items: 3
        }
      }
    });
  };

  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id') || 1;
  const lang = urlParams.get('lang') || 'en';

  const starsTemplate = rating => `<span class="icon-star2 ${
    Math.floor(rating) > 0 ? 'text-warning' : ''
  }"></span>
	<span class="icon-star2 ${Math.floor(rating) > 1 ? 'text-warning' : ''}"></span>
	<span class="icon-star2 ${Math.floor(rating) > 2 ? 'text-warning' : ''}"></span>
	<span class="icon-star2 ${Math.floor(rating) > 3 ? 'text-warning' : ''}"></span>
	<span class="icon-star2 ${Math.floor(rating) > 4 ? 'text-warning' : ''}"></span>
	<span class="product-rating">(${rating})</span>`;

  const relatedItemTemplate = (
    title,
    imagePath,
    rating,
    price
  ) => `<div class="item">
 <div class="item-entry">
   <a href="#" class="secondary-item product-item md-height bg-gray d-block">
     <img src="${imagePath}" alt="${title}" class="img-fluid">
   </a>
   <h2 class="item-title"><a href="#">${title}</a></h2>
   <strong class="item-price">$${price}</strong>
   <div class="star-rating">
     ${starsTemplate(rating)}
   </div>
 </div>
</div>`;


const reviewsTemplate = reviews => {
	const liTemplate = text => `<li>${text}</li>`;
	const title = `<h5>${lang === 'es'? 'Reseñas' : 'Reviews'}</h5>`;
	return `${title}<ul>${reviews.map(liTemplate).join('')}</ul>`;
};


  const url = `//${document.location.hostname}:9001/api/${lang}/product/${id}`;
  fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    mode: 'cors'
  })
    .then(response => response.json())
    .then(({ product }) => {
      $('.product-title').text(product.title);
      $('.product-price').text(product.price);
      $('.product-description').text(product.description);
      $('.product-image').attr('src', product.images[0]);
      $('.product-rating').text(product.rating);
			$('.star-rating').html(starsTemplate(Math.floor(product.rating)));
			$('.product-reviews').html(reviewsTemplate(product.reviews));
			// Related Products JS

      if (product.related) {
        $('.related-products-label').text(lang === 'es' ? 'Productos Relacionados' : 'Related Products');
        $('.related-products').show();
        $('#related').html(
          product.related
            .map(({ title, rating, price, image }) =>
              relatedItemTemplate(title, image, rating, price)
            )
            .join('')
        );
      }

      $('.preloader').hide();
      $('.main-content').css('display', 'flex');
      $('.buy-now').text(lang === 'es' ? 'Agregar al Carrito' : 'Add To Cart');
			slider();

    });
});
