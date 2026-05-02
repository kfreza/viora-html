(function ($) {
  "use strict";

  /*
  |--------------------------------------------------------------------------
  | Template Name: KnowMax
  | Author: Laralink
  | Version: 1.0.0
  |--------------------------------------------------------------------------
  |--------------------------------------------------------------------------
  | TABLE OF CONTENTS:
  |--------------------------------------------------------------------------
  |
  | 1. Preloader
  | 2. Mobile Menu
  | 3. Sticky Header
  | 4. Dynamic Background
  | 5. Slick Slider
  | 6. Modal Video
  | 7. Light Gallery
  | 8. Isotop
  | 9. Dynamic contact form
  | 10. Tabs
  | 11. Counter Animation
  | 12. Review
  | 13. Accordian
  | 14. Language Select
  | 15. Social Toggle Button
  | 16. Heart toggle
  | 17. Project Cards
  |
  */

  /*--------------------------------------------------------------
  Scripts initialization
  --------------------------------------------------------------*/
  $.exists = function (selector) {
    return $(selector).length > 0;
  };

  $(window).on("load", function () {
    preloader();
    isotopInit();
  });

  $(function () {
    mainNav();
    stickyHeader();
    dynamicBackground();
    slickInit();
    modalVideo();
    lightGallery();
    isotopInit();
    tabs();
    counterInit();
    review();
    accordian();
    languageSwitch();
    socialButtonToggle();
    elementToggle();
    initProjectCards();
    if ($.exists(".wow")) {
      new WOW().init();
    }
  });

  $(window).on("scroll", function () {
    // stickyHeader();
  });

  /*--------------------------------------------------------------
  1. Preloader
  --------------------------------------------------------------*/
  var startTime = new Date().getTime();

  function preloader() {
    var endTime = new Date().getTime();
    var duration = (endTime - startTime) / 1000;

    console.log("Loading Time: " + duration + " Seconds");

    $(".cs_preloader_in").fadeOut();
    $(".cs_preloader").delay(150).fadeOut("slow");
  }

  /*--------------------------------------------------------------
  2. Mobile Menu
  --------------------------------------------------------------*/
  function mainNav() {
    $('.cs_nav').append('<span class="cs_menu_toggle"><span></span></span>');
    $('.menu-item-has-children').append(
      '<span class="cs_menu_dropdown_toggle"><span></span></span>',
    );
    $('.cs_menu_toggle').on('click', function () {
      $(this).toggleClass('cs_toggle_active').siblings('.cs_nav_list_wrap').toggleClass('cs_active');
    });
    $('.cs_menu_dropdown_toggle').on('click', function () {
      $(this).toggleClass('active').siblings('ul').slideToggle();
      $(this).parent().toggleClass('active');
    });
  }

  /*--------------------------------------------------------------
  3. Sticky Header
  --------------------------------------------------------------*/
  function stickyHeader() {
    var $window = $(window);
    var lastScrollTop = 0;
    var $header = $('.cs_sticky_header');
    var headerHeight = $header.outerHeight() + 20;

    $window.scroll(function () {
      var windowTop = $window.scrollTop();

      if (windowTop >= headerHeight) {
        console.log($window)
        $header.addClass('cs_gescout_sticky');
      } else {
        $header.removeClass('cs_gescout_sticky');
        $header.removeClass('cs_gescout_show');
      }

      if ($header.hasClass('cs_gescout_sticky')) {
        if (windowTop < lastScrollTop) {
          $header.addClass('cs_gescout_show');
        } else {
          $header.removeClass('cs_gescout_show');
        }
      }
      lastScrollTop = windowTop;
    });
  }

  /*--------------------------------------------------------------
  4. Dynamic Background
  --------------------------------------------------------------*/
  function dynamicBackground() {
    $("[data-src]").each(function () {
      var src = $(this).attr("data-src");
      $(this).css({
        "background-image": "url(" + src + ")",
      });
    });
  }

  /*--------------------------------------------------------------
  5. Slick Slider
  --------------------------------------------------------------*/
  function slickInit() {
    if ($.exists(".cs_slider")) {
      $(".cs_slider").each(function () {
        // Slick Variable
        var $ts = $(this).find(".cs_slider_container");
        var $slickActive = $(this).find(".cs_slider_wrapper");
        var $status = $(this).find(".cs_slider_number");
        // Auto Play
        var autoPlayVar = parseInt($ts.attr("data-autoplay"), 10);
        // Auto Play Time Out
        var autoplaySpdVar = 3000;
        if (autoPlayVar > 1) {
          autoplaySpdVar = autoPlayVar;
          autoPlayVar = 1;
        }
        // Slide Change Speed
        var speedVar = parseInt($ts.attr("data-speed"), 10);
        // Slider Loop
        var loopVar = Boolean(parseInt($ts.attr("data-loop"), 10));
        // Slider Center
        var centerVar = Boolean(parseInt($ts.attr("data-center"), 10));
        // Variable Width
        var variableWidthVar = Boolean(
          parseInt($ts.attr("data-variable-width"), 10)
        );
        // Pagination
        var paginaiton = $(this)
          .find(".cs_pagination")
          .hasClass("cs_pagination");
        // Slide Per View
        var slidesPerView = $ts.attr("data-slides-per-view");
        if (slidesPerView == 1) {
          slidesPerView = 1;
        }
        if (slidesPerView == "responsive") {
          var slidesPerView = parseInt($ts.attr("data-add-slides"), 10);
          var lgPoint = parseInt($ts.attr("data-lg-slides"), 10);
          var mdPoint = parseInt($ts.attr("data-md-slides"), 10);
          var smPoint = parseInt($ts.attr("data-sm-slides"), 10);
          var xsPoing = parseInt($ts.attr("data-xs-slides"), 10);
        }
        // Fade Slider
        var fadeVar = parseInt($($ts).attr("data-fade-slide"));
        fadeVar === 1 ? (fadeVar = true) : (fadeVar = false);
        /* Start Count Slide Number */
        $slickActive.on(
          "init reInit afterChange",
          function (event, slick, currentSlide, nextSlide) {
            var i = (currentSlide ? currentSlide : 0) + 1;
            $status.html(
              `<span class="cs_current_number" data-number="${i}"><span>${i}</span></span> <span class="cs_slider_number_seperator">/</span> <span class="cs_total_numbers"  data-number="${slick.slideCount}"><span>${slick.slideCount}</span></span>`
            );
          }
        );
        /* End Count Slide Number */
        // Slick Active Code
        $slickActive.slick({
          autoplay: autoPlayVar,
          dots: paginaiton,
          centerPadding: "28%",
          speed: speedVar,
          infinite: loopVar,
          autoplaySpeed: autoplaySpdVar,
          centerMode: centerVar,
          fade: fadeVar,
          prevArrow: $(this).find(".cs_left_arrow"),
          nextArrow: $(this).find(".cs_right_arrow"),
          appendDots: $(this).find(".cs_pagination"),
          slidesToShow: slidesPerView,
          variableWidth: variableWidthVar,
          swipeToSlide: true,
          responsive: [
            {
              breakpoint: 1600,
              settings: {
                slidesToShow: lgPoint,
              },
            },
            {
              breakpoint: 1200,
              settings: {
                slidesToShow: mdPoint,
              },
            },
            {
              breakpoint: 992,
              settings: {
                slidesToShow: smPoint,
              },
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: xsPoing,
              },
            },
          ],
        });
      });
    }
  }

  /*--------------------------------------------------------------
  6. Modal Video
  --------------------------------------------------------------*/
  function modalVideo() {
    if ($.exists(".cs_video_open")) {
      $("body").append(`
<div class="cs_video_popup">
<div class="cs_video_popup-overlay"></div>
<div class="cs_video_popup-content">
<div class="cs_video_popup-layer"></div>
<div class="cs_video_popup-container">
<div class="cs_video_popup-align">
<div class="embed-responsive embed-responsive-16by9">
<iframe class="embed-responsive-item" src="about:blank"></iframe>
</div>
</div>
<div class="cs_video_popup-close"></div>
</div>
</div>
</div>
`);
      $(document).on("click", ".cs_video_open", function (e) {
        e.preventDefault();
        var video = $(this).attr("href");

        $(".cs_video_popup-container iframe").attr("src", `${video}`);

        $(".cs_video_popup").addClass("active");
      });
      $(".cs_video_popup-close, .cs_video_popup-layer").on(
        "click",
        function (e) {
          $(".cs_video_popup").removeClass("active");
          $("html").removeClass("overflow-hidden");
          $(".cs_video_popup-container iframe").attr("src", "about:blank");
          e.preventDefault();
        }
      );
    }
  }

  /*--------------------------------------------------------------
  7. Light Gallery
  --------------------------------------------------------------*/
  function lightGallery() {
    $(".cs_lightgallery").each(function () {
      $(this).lightGallery({
        selector: ".cs_gallery_item",
        subHtmlSelectorRelative: false,
        thumbnail: false,
        mousewheel: true,
      });
    });
  }

  /*--------------------------------------------------------------
    8. Isotop
  --------------------------------------------------------------*/
  function isotopInit() {
    if ($.exists('.cs_isotop')) {
      $('.cs_isotop').isotope({
        itemSelector: '.cs_isotop_item',
        transitionDuration: '0.60s',
        percentPosition: true,
        masonry: {
          columnWidth: '.cs_grid_sizer',
        },
      });
      /* Active Class of Portfolio*/
      $('.cs_isotop_filter ul li').on('click', function (event) {
        $(this).siblings('.active').removeClass('active');
        $(this).addClass('active');
        event.preventDefault();
      });
      /*=== Portfolio filtering ===*/
      $('.cs_isotop_filter ul').on('click', 'a', function () {
        var filterElement = $(this).attr('data-filter');
        $('.cs_isotop').isotope({
          filter: filterElement,
        });
      });
    }
  }

  /*--------------------------------------------------------------
  9. Dynamic contact form
  --------------------------------------------------------------*/
  if ($.exists("#cs_form")) {
    const form = document.getElementById("cs_form");
    const result = document.getElementById("cs_result");

    form.addEventListener("submit", function (e) {
      const formData = new FormData(form);
      e.preventDefault();
      var object = {};
      formData.forEach((value, key) => {
        object[key] = value;
      });
      var json = JSON.stringify(object);
      result.innerHTML = "Please wait...";

      fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: json,
      })
        .then(async (response) => {
          let json = await response.json();
          if (response.status == 200) {
            result.innerHTML = json.message;
          } else {
            console.log(response);
            result.innerHTML = json.message;
          }
        })
        .catch((error) => {
          console.log(error);
          result.innerHTML = "Something went wrong!";
        })
        .then(function () {
          form.reset();
          setTimeout(() => {
            result.style.display = "none";
          }, 5000);
        });
    });
  }

  /*--------------------------------------------------------------
  10. Tabs
  --------------------------------------------------------------*/
  function tabs() {
    $(".cs_tabs .cs_tab_links a").on("click", function (e) {
      var currentAttrValue = $(this).attr("href");
      $(".cs_tabs " + currentAttrValue)
        .fadeIn(400)
        .siblings()
        .hide();
      console.log(currentAttrValue)
      $(this).closest(".cs_tab_links").find("li").removeClass("active");
      $(this).parents("li").addClass("active");
      e.preventDefault();
    });
  }

  /*=====================================================================
  11. Counter Animation
  =======================================================================*/
  function counterInit() {
    if (!$.exists(".odometer")) return;

    const observer = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            const el = $(entry.target);
            el.html(el.data("count-to"));
            observer.unobserve(entry.target); // run only once
          }
        });
      },
      {
        threshold: 0.3,
      }
    );

    $(".odometer").each(function () {
      observer.observe(this);
    });
  }

  /*=====================================================================
    12. Review
  =======================================================================*/
  function review() {
    $(".cs_rating").each(function () {
      var review = $(this).data("rating");
      var reviewVal = review * 20 + "%";
      $(this).find(".cs_rating_percentage").css("width", reviewVal);
    });
  }

  /*====================================================================
    13. Accordian
  ======================================================================*/
  function accordian() {
    $(".cs_accordian").children(".cs_accordian_body").hide();
    $(".cs_accordian.active").children(".cs_accordian_body").show();
    $(".cs_accordian_head").on("click", function () {
      $(this)
        .parent(".cs_accordian")
        .siblings()
        .children(".cs_accordian_body")
        .slideUp(250);
      $(this).siblings().slideDown(250);
      $(this)
        .parent()
        .parent()
        .siblings()
        .find(".cs_accordian_body")
        .slideUp(250);
      /* Accordian Active Class */
      $(this).parents(".cs_accordian").addClass("active");
      $(this).parent(".cs_accordian").siblings().removeClass("active");
    });
  }

  /*======================================================================
  14. Language Select
========================================================================*/
  function languageSwitch() {

    const languageItem = $(".cs_language_select");

    // Toggle dropdown
    languageItem.on("click", ".cs_language_switcher", function (e) {
      e.stopPropagation();
      $(this).siblings(".cs_language_dropdown").slideToggle(250);
    });

    // Select language (event delegation safe)
    languageItem.on("click", ".cs_language_dropdown button", function (e) {
      e.stopPropagation();

      const parent = $(this).closest(".cs_language_select");
      const switcherBtn = parent.find(".cs_language_switcher button");

      const selectedLang = $(this).data("lang");
      const selectedFlagClass = $(this).find(".flag-btn").attr("class");
      const selectedText = $(this).find(".cs_flag_title").text();

      // Update data-lang
      switcherBtn.attr("data-lang", selectedLang);

      // Update flag
      switcherBtn.find(".flag-btn").attr("class", selectedFlagClass);

      // Update text (same class exists in both)
      switcherBtn.find(".cs_flag_title").text(selectedText);

      // Close dropdown
      parent.find(".cs_language_dropdown").slideUp(200);
    });

    // Outside click close
    $(document).on("click", function () {
      $(".cs_language_dropdown").slideUp(200);
    });

  }

  /*======================================================================
  15. Social Toggle Button
========================================================================*/
  function socialButtonToggle() {
    if ($.exists(".cs_social_toggle")) {
      const $toggleBtn = $(".cs_social_toggle");

      // Icon Update Function
      function updateIcon($btn) {
        const $icon = $btn.find("i");
        if ($btn.hasClass("active")) {
          $icon.removeClass("fa-plus").addClass("fa-arrow-right-long");
        } else {
          $icon.removeClass("fa-arrow-right-long").addClass("fa-plus");
        }
      }

      // Load Check
      $toggleBtn.each(function () {
        updateIcon($(this));
      });

      // Click Event
      $toggleBtn.on("click", function () {
        const $this = $(this);
        const $parent = $this.closest(".cs_social_links");

        // --- NEW LOGIC START ---
        $toggleBtn.not($this).removeClass("active");
        $(".cs_social_links").not($parent).removeClass("active");

        $toggleBtn.not($this).each(function () {
          updateIcon($(this));
        });
        // --- NEW LOGIC END ---

        // Current Element Toggle
        $this.toggleClass("active");
        $parent.toggleClass("active");

        // Current Icon Update
        updateIcon($this);
      });
    }
  }

  /*=====================================================================
      16. Heart toggle
    =======================================================================*/
  function elementToggle() {
    // 1. Heart Toggler (Existing)
    $(".cs_heart_toggler i").on("click", function () {
      $(this).toggleClass("fa-solid");
    });

    // 2. Category Widget Toggle (Optimized)
    $(".cs_sidebar_widget_title").on("click", function () {
      const $this = $(this);

      // Toggle Active Class & Content
      $this.toggleClass("active")
        .siblings(".cs_sidebar_widget_content")
        .slideToggle()
        .parent(".cs_sidebar_widget")
        .toggleClass("active");

      // Icon Change Logic (Conflict-free)
      const icon = $this.find('i');

      // Check for Plus/Minus (Nested Widget)
      if (icon.hasClass('fa-plus') || icon.hasClass('fa-minus')) {
        icon.toggleClass('fa-plus fa-minus');
      }

      // Note: Chevron rotate-er logic CSS die handle kora bhalo (ja tumi already korcho)
    });

    // 3. Dashboard Nav (Existing)
    $(".cs_dashboard_nav li").on("click", function () {
      $(this).addClass("active").siblings().slideToggle().removeClass("active");
    });
  }


  //

  function initProjectCards() {
    const projects = document.querySelectorAll('.cs_project_style_1');
    const defaultActive = document.querySelector('.cs_project_style_1.active');

    projects.forEach(project => {
      project.addEventListener('mouseenter', function () {
        projects.forEach(p => p.classList.remove('active'));
        this.classList.add('active');
      });

      project.addEventListener('mouseleave', function () {
        projects.forEach(p => p.classList.remove('active'));
        defaultActive.classList.add('active');
      });
    });
  }


})(jQuery); // End of use strict
