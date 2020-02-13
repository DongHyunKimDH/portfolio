$(document).ready(function () {
    var $body = $("body");
    var $gnb = $("#gnb ul li a");
    var $intro = $("#intro");
    var $contents = $("#contents");
    var $project = $("#project");
    var $webAcce = $("#webAcce");
    var $aboutMe = $("#aboutMe");
    
    var $gnbFirst = $("#gnb").find(".first");
    var $gnbLast = $("#gnb").find(".last");
    var $FillDiv = $("#intro .fillbg");
    var $IntroTxt = $("#intro .txt-ani").children();
    var introArray = new Array($IntroTxt.size());
    var $line = $("#fixed-line").children();
    var $indicator = $("#indicator").children();
    
    var articleLength = $("#cnt-wrap article").length;
    var winWidth;
    var winHeight;
    var contentsWidth;
    var contentsHeight;
    var cntMarginL = $(".hor").data("cntmargin");
    var cntMarginH = $(".hor").data("cntmargintop");
    var $tabBtn = $(".tab");

    var resizeTimer = 0;
    var introTimer = 0;
    var contentsTimer = 0;
    var projectTimer = 0;
    var webAcceTimer = 0;
    var aboutMeTimer = 0;

    var scrollX = 0;
    var scrollY = 0;
    var $mainBlack = "#333435";
    var $mainBlue = "#7ec6c5";
    var $mainRed = "#cb6586";

    
    // intro active
    $intro.addClass("active");
    // resize width()
    $(window).on("resize", function() {
        winWidth = $(window).width();
        winHeight = $(window).height();
        if(winWidth <= 501) {
            $("body").addClass("mobile");
        }
        else {
            $("body").removeClass("mobile");
            $("#gnb, .menu").removeClass("active");
        }
        contentsWidth = $("#contents .hor").outerWidth();
        contentsHeight = $("#contents .hor").outerHeight();
        if( (!$body.hasClass("mobile")) && ($contents.hasClass("active")) ) { // contents PC화면
            cntMarginL = $(".hor").attr("data-cntmargin");
            $contents.find(".hor > div:odd").css("textAlign","left");
            $line.eq(0).stop().animate({
                marginLeft : cntMarginL,
                marginTop : "0px",
                left : "24%",
                top : "32%",
                height : "55.45%"
            });
            $line.eq(1).stop().animate({
                marginLeft : cntMarginL,
                marginTop : "0px",
                left : "53.5%",
                top : "20.4%",
                height : "66.3%"
            });
            $line.eq(2).stop().animate({
                marginLeft : cntMarginL,
                marginTop : "0px",
                left : "85%",
                top : "28.8%",
                height : "54.5%",
                opacity : 1
            });
            $line.eq(3).stop().animate({
                marginLeft : cntMarginL,
                marginTop : "0px",
                left : "122%",
                top : "25.6%",
                height : "61%",
                opacity : 1
            });
            $("#contents .hor").stop().animate({
                marginLeft : cntMarginL,
                marginTop : "0px"
            });

            $(".m-close-btn").css("display","none");
            $project.find(".project1").css("display","table-cell");
            console.log(cntMarginL, cntMarginH);
        }
        else if ($body.hasClass("mobile") && ($contents.hasClass("active"))) { // contents Mobile화면
            cntMarginH = $(".hor").attr("data-cntmargintop");
            $contents.find(".hor > div:odd").css("textAlign","right");
            $line.eq(0).stop().animate({
                marginLeft : "0px",
                marginTop : cntMarginH,
                left : "22%",
                top : "32%",
                height : "58%"
            });
            $line.eq(1).stop().animate({
                marginLeft : "0px",
                marginTop : cntMarginH,
                left : "85%",
                top : "91.4%",
                height : "65%"
            });
            $line.eq(2).stop().animate({
                marginLeft : "0px",
                marginTop : cntMarginH,
                left : "22%",
                top : "168.8%",
                height : "53%",
                opacity : 1
            });
            $line.eq(3).stop().animate({
                marginLeft : "0px",
                marginTop : cntMarginH,
                left : "85%",
                top : "230.6%",
                height : "48.8%",
                opacity : 1
            });
            $("#contents .hor").stop().animate({
                marginLeft : "0px",
                marginTop : cntMarginH
            });

        }

        if((!$body.hasClass("mobile")) && ($project.hasClass("active"))) { // project PC
            // 모바일에서 모달창 열고 창크기 변환할 때
            $(".m-close-btn").click().css("display","none");
            $(".project1").css("display", "table-cell");
            $line.eq(0).stop().animate({
                marginLeft : "0px",
                left : "50%",
                top : "0px",
                height : "100%"
            })
            $line.eq(1).stop().animate({
                marginLeft : "0px",
                left : "75%",
                top : "10%",
                height : "90%"
            })
            $line.eq(2).stop().animate({
                opacity : "1",
                marginLeft : "0px",
                left : "99.9%",
                top : "0px",
                height : "100%"
            })
            $line.eq(3).css({
                marginLeft : "0px",
                opacity : 0
            });
        }
        else if($body.hasClass("mobile") && $project.hasClass("active")) { // project Mobile
            $(".project-common").css("display", "none");
            $line.eq(0).stop().animate({
                marginLeft : "0px",
                left : "19.3%",
                top : "23%",
                height : "49.5%"
            })
            $line.eq(1).stop().animate({
                marginLeft : "0px",
                left : "84%",
                top : "23%",
                height : "49.5%"
            })
            $line.eq(2).stop().animate({
                opacity : "0",
                marginLeft : "0px"
            })
            $line.eq(3).css({
                opacity : "0",
                marginLeft : "0px"
            });
        }
        if((!$body.hasClass("mobile")) && ($webAcce.hasClass("active"))) { // webAcce PC
            $line.eq(0).stop().animate({
                left : "0%",
                top : "0%",
                height : "100%"
            });
            $line.eq(1).stop().animate({
                left : "50%",
                top : "0%",
                height : "100%"
            });
            $line.eq(2).stop().animate({
                left : "100%",
                top : "0%",
                height : "100%",
                opacity : 1
            });

        }
        else if($body.hasClass("mobile") && $webAcce.hasClass("active")) { // webAcce Mobile
            $line.eq(0).stop().animate({
                left : "0%",
                top : "0%",
                height : "100%"
            });
            $line.eq(1).stop().animate({
                left : "99.5%",
                top : "0%",
                height : "100%"
            });
            $line.eq(2).stop().animate({
                left : "100%",
                top : "0%",
                height : "100%",
                opacity : 0
            });

        }
        if((!$body.hasClass("mobile")) && ($aboutMe.hasClass("active"))) { // aboutMe PC

        }
        else if(($body.hasClass("mobile")) && ($aboutMe.hasClass("active"))) { // aboutMe Mobile
            
        }
        if(($aboutMe.hasClass("active")) && (winWidth <= 760)) {
            $aboutMe.find(".about ul li").css("color", "var(--mainColor)");
        }
        else if(($aboutMe.hasClass("active")) && (winWidth >= 761)) {
            $aboutMe.find(".about ul li").css("color", "#ffffff");
        }
        
    });
    $(window).trigger("resize");
    
    // Intro
    function introAni() {
        $("#intro *").removeAttr("style");
        $indicator.eq(0).addClass("active");
        $(".deco-line1, .deco-line2").css({
            left : "50%",
            top : "22.48%",
            height : "58.3%"
        });
        //  배경색 채우기
        $FillDiv.eq(0).stop().animate({width: "50%"}, 200);
        $FillDiv.eq(1).stop().delay(180).animate({width: "50%"}, 200);
        $FillDiv.eq(3).stop().delay(350).animate({height: "50%"}, 200);
        $FillDiv.eq(2).stop().delay(650).animate({width: "50%"}, 200, function () {
            //  글자 fade, 배경fade, 글자색
            for (var i = 0; i < $IntroTxt.size(); i++) {
                introArray[i] = Math.floor(Math.random() * 20) + 1;
                for (var remove = 0; remove < i; remove++) {
                    if (introArray[i] == introArray[remove]) {
                        i--;
                        break;
                    }
                }
                $IntroTxt.eq(introArray[i] - 1).stop().delay(i * 30).animate({opacity: 1});
            }
        });
    
        setTimeout(function() { // Fade된 글자색 바꾸기
            $IntroTxt.css({
                color : "var(--mainColor)"
            });
        }, 1720);
        setTimeout(function() { // 글자색 바꾸고 배경 Fade 시키기
            $FillDiv.css("opacity", "0");
        }, 2800);
    
        // line 애니메이트
        if(!$body.hasClass("mobile")) {
            $line.eq(0).stop().delay(4000).animate({
                left : "27.28%",
                height : "53.3%"
            });
            $line.eq(1).stop().delay(4000).animate({
                left : "73%",
                height : "53.3%"
            });
            $(".deco-line3, .deco-line4").css("opacity", 0);    
        }
        else {
            $line.eq(0).stop().animate({
                marginLeft : "0px",
                left : "22.28%",
                top : "30%",
                height : "33.3%"
            });
            $line.eq(1).stop().animate({
                marginLeft : "0px",
                left : "78%",
                top : "30%",
                height : "33.3%"
            });
            $(".deco-line3, .deco-line4").css("opacity", 0);
            $(".txt-ani").css("transform","scale(1.3)");
        }
    }
    introAni();
    function swiperActive() {
        var swiper1 = new Swiper('#tabpanel1 .swiper-container', {
            effect: 'cube',
            grabCursor: true,
            cubeEffect: {
              shadow: false,
              slideShadows: false,
              shadowOffset: 20,
              shadowScale: 0.94,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });
        var swiper2 = new Swiper('#tabpanel2 .swiper-container', {
            effect: 'cube',
            grabCursor: true,
            cubeEffect: {
              shadow: false,
              slideShadows: false,
              shadowOffset: 20,
              shadowScale: 0.94,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });
        var swiper3 = new Swiper('#tabpanel3 .swiper-container', {
            effect: 'cube',
            grabCursor: true,
            cubeEffect: {
              shadow: false,
              slideShadows: false,
              shadowOffset: 20,
              shadowScale: 0.94,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });
        var swiper4 = new Swiper('#tabpanel4 .swiper-container', {
            effect: 'cube',
            grabCursor: true,
            cubeEffect: {
              shadow: false,
              slideShadows: false,
              shadowOffset: 20,
              shadowScale: 0.94,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });
    }
    // menu active
    $(".menu").on("click",function() {
        $(this).toggleClass("active");
        $("#gnb").toggleClass("active");
    });
    // gnb click event
    $gnb.on("click", function(e) {
        e.preventDefault();
        var aIdx = $(this).parent().index();
        switch(aIdx) {
            case 0 : {
                $indicator.eq(aIdx).click();
                $gnb.closest("#gnb").removeClass("active").prev().removeClass("active");
                break;
            }
            case 1 : {
                $indicator.eq(aIdx).click();
                $gnb.closest("#gnb").removeClass("active").prev().removeClass("active");
                break;
            }
            case 2 : {
                $indicator.eq(aIdx).click();
                $gnb.closest("#gnb").removeClass("active").prev().removeClass("active");
                break;
            }
            case 3 : {
                $indicator.eq(aIdx).click();
                $gnb.closest("#gnb").removeClass("active").prev().removeClass("active");
                break;
            }
            case 4 : {
                $indicator.eq(aIdx).click();
                $gnb.closest("#gnb").removeClass("active").prev().removeClass("active");
                break;
            }
        }
    });
    // gnb focus 제어
    $gnbFirst.on('keydown', function (e) {
        if ( e.shiftKey && e.keyCode == 9) {
          e.preventDefault();
          $gnbLast.focus();  
        }
      });
    $gnbLast.on('keydown', function (e) {
    if ( !e.shiftKey && e.keyCode == 9) {
        e.preventDefault();
        $('.menu').focus();
    }
    });

    // 테마컬러 변경 버튼 활성화
    $("#color-change-btn .color-btn-active span").on("click", function() {
        $(this).parent().toggleClass("active");
    });
    // 컬러 변경 하기
    $("#color-change-btn .color-btn-active ~button").on("click", function() {
        var colIdx = $(this).index(); // 1 2 3
        switch (colIdx) {
            case 1 : {
                document.documentElement.style.setProperty("--mainColor",$mainBlack);
                break;
            }
            case 2 : {
                document.documentElement.style.setProperty("--mainColor",$mainBlue);
                break;
            }
            case 3 : {
                document.documentElement.style.setProperty("--mainColor",$mainRed);
                break;
            }
        }
        $(".color-btn-active").removeClass("active");
    })
    // indicator
    $indicator.on("click",function() {
        var target = $($(this).attr("href"));
        var aIdx = $(this).index();
        $(this).addClass("active").siblings().removeClass("active");
        switch (aIdx) {
            case 0 : {
                introAni();
                break;
            }
            case 1 : {
                if(!$body.hasClass("mobile")) {
                    $line.eq(0).stop().animate({
                        left : "24%",
                        top : "32%",
                        height : "55.45%"
                    });
                    $line.eq(1).stop().animate({
                        left : "53.5%",
                        top : "20.4%",
                        height : "66.3%"
                    });
                    $line.eq(2).stop().animate({
                        left : "85%",
                        top : "28.8%",
                        height : "54.5%",
                        opacity : 1
                    });
                    $line.eq(3).stop().animate({
                        left : "122%",
                        top : "25.6%",
                        height : "61%",
                        opacity : 1
                    });    
                }
                else {
                    $contents.find(".hor > div:odd").css("textAlign","right");
                    $line.eq(0).stop().animate({
                        left : "22%",
                        top : "32%",
                        height : "58%"
                    });
                    $line.eq(1).stop().animate({
                        left : "85%",
                        top : "91.4%",
                        height : "65%"
                    });
                    $line.eq(2).stop().animate({
                        left : "22%",
                        top : "168.8%",
                        height : "53%",
                        opacity : 1
                    });
                    $line.eq(3).stop().animate({
                        left : "85%",
                        top : "230.6%",
                        height : "48.8%",
                        opacity : 1
                    });
                }
                break;
            }
            case 2 : {
                if(!$body.hasClass("mobile")) {
                    $line.eq(0).stop().animate({
                        marginLeft : "0px",
                        left : "50%",
                        top : "0px",
                        height : "100%"
                    })
                    $line.eq(1).stop().animate({
                        marginLeft : "0px",
                        left : "75%",
                        top : "10%",
                        height : "90%"
                    })
                    $line.eq(2).stop().animate({
                        marginLeft : "0px",
                        left : "99.9%",
                        top : "0px",
                        height : "100%"
                    })
                    $line.eq(3).css({
                        marginLeft : "0px",
                        opacity : 0
                    });
                }
                else {
                    $line.eq(0).stop().animate({
                        marginLeft : "0px",
                        left : "19.3%",
                        top : "23%",
                        height : "49.5%"
                    })
                    $line.eq(1).stop().animate({
                        marginLeft : "0px",
                        left : "84%",
                        top : "23%",
                        height : "49.5%"
                    })
                    $line.eq(2).stop().animate({
                        opacity : "0",
                        marginLeft : "0px"
                    })
                    $line.eq(3).css({
                        opacity : "0",
                        marginLeft : "0px"
                    });
    
                }
                break;
            }
            case 3 : {
                swiperActive();
                if(!$body.hasClass("mobile")) {
                    $line.eq(0).stop().animate({
                        left : "0%",
                        top : "0%",
                        height : "100%"
                    });
                    $line.eq(1).stop().animate({
                        left : "50%",
                        top : "0%",
                        height : "100%"
                    });
                    $line.eq(2).stop().animate({
                        left : "100%",
                        top : "0%",
                        height : "100%",
                        opacity : 1
                    },function() {
                        $('.tab:first-of-type, .tabpanel:first-of-type').addClass('active').attr('tabIndex', 0);
                        $('.tab:first-of-type').attr('aria-selected', true);
                        $('.tabpanel:first-of-type').attr('aria-hidden', false);
                        tabActive($("#tabpanel1"));
                    });
                }
                else {
                    $line.eq(0).stop().animate({
                        left : "0%",
                        top : "0%",
                        height : "100%"
                    });
                    $line.eq(1).stop().animate({
                        left : "99.5%",
                        top : "0%",
                        height : "100%"
                    });
                    $line.eq(2).stop().animate({
                        left : "100%",
                        top : "0%",
                        height : "100%",
                        opacity : 0
                    });        
                    $('.tab:first-of-type, .tabpanel:first-of-type').addClass('active').attr('tabIndex', 0);
                    $('.tab:first-of-type').attr('aria-selected', true);
                    $('.tabpanel:first-of-type').attr('aria-hidden', false);
                    tabActive($("#tabpanel1"));
                }
                break;
            }
            case 4 : {
                if(!$body.hasClass("mobile")) {
                    $line.eq(0).stop().animate({
                        left : "24.3%",
                        top : "24%",
                        height : "51.2%"
                    });
                    $line.eq(1).stop().animate({
                        left : "53.9%",
                        top : "10%",
                        height : "76.8%"
                    });
                    $line.eq(2).stop().animate({
                        left : "83.4%",
                        top : "24%",
                        height : "51.2%"
                    });
                    $line.eq(3).css("opacity", "0");
                    $aboutMe.find("ul li").stop().delay(2200).animate({color : "#ffffff"},function() {
                        $line.css("height","0px");
                    });    
                }
                else {

                }
                break;
            }
        }
        $("#cnt-wrap article").stop().fadeOut();
        target.addClass("active").stop().fadeIn().siblings().removeClass("active");
        if(!$contents.hasClass("active")) {
            $line.css({
                marginLeft : "0%",
                marginTop : "0%"
            });
        }
    });

    // intro wheel event
    $intro.on("mousewheel DOMMouseScroll", function(e) {
        clearTimeout(introTimer);
        if(!$body.hasClass("mobile")) {
            introTimer = setTimeout(function () {
                if($intro.is(":animated")) return false;
                $contents.find(".hor > div:odd").removeAttr("style");
                var delta = e.originalEvent.wheelDelta || e.originalEvent.detail * -1;
                if (delta < 0) {
                        $intro.removeClass("active").stop().fadeOut();
                        $line.eq(0).stop().animate({
                            left : "24%",
                            top : "32%",
                            height : "55.45%"
                        });
                        $line.eq(1).stop().animate({
                            left : "53.5%",
                            top : "20.4%",
                            height : "66.3%"
                        });
                        $line.eq(2).stop().animate({
                            left : "85%",
                            top : "28.8%",
                            height : "54.5%",
                            opacity : 1
                        });
                        $line.eq(3).stop().animate({
                            left : "122%",
                            top : "25.6%",
                            height : "61%",
                            opacity : 1
                        }, function() {
                            $contents.addClass("active").stop().delay(800).fadeIn();
                        });
                        $indicator.eq(0).removeClass("active").next().addClass("active");
                }
            });
        }
        else {
            introTimer = setTimeout(function () {
                if($intro.is(":animated")) return false;
                var delta = e.originalEvent.wheelDelta || e.originalEvent.detail * -1;
                if (delta < 0) {
                        $intro.removeClass("active").stop().fadeOut();
                        $contents.find(".hor > div:odd").css({textAlign : "right", marginTop : "0px"});
                        $line.eq(0).stop().animate({
                            marginTop : "0px",
                            left : "22%",
                            top : "32%",
                            height : "58%"
                        });
                        $line.eq(1).stop().animate({
                            marginTop : "0px",
                            left : "85%",
                            top : "91.4%",
                            height : "65%"
                        });
                        $line.eq(2).stop().animate({
                            marginTop : "0px",
                            left : "22%",
                            top : "168.8%",
                            height : "53%",
                            opacity : 1
                        });
                        $line.eq(3).stop().animate({
                            marginTop : "0px",
                            left : "85%",
                            top : "230.6%",
                            height : "48.8%",
                            opacity : 1
                        }, function() {
                            $contents.addClass("active").stop().delay(800).fadeIn();
                        });
                        $indicator.eq(0).removeClass("active").next().addClass("active");
                }
            });

        }
    });

    // contents wheel event
    $contents.on("mousewheel DOMMouseScroll", function(e) {
        clearTimeout(contentsTimer);
        if(!$body.hasClass("mobile")) {
            contentsTimer = setTimeout(function() {2
                if($contents.is(":animated")) return false;
                var delta = e.originalEvent.wheelDelta || e.originalEvent.detail * -1;
                if(delta > 0 && articleLength > 0) { // 휠 올릴때
                    var fillWidth = $(".scroll-fill").width();
                    $("#contents .hor, .deco-line").stop().animate({marginLeft : scrollX+=120},250,"easeOutCubic",function() {
                        cntMarginL = scrollX;
                        $("#contents .hor").attr("data-cntmargin",cntMarginL);
                        if(scrollX > 0) {
                            $(this).stop().animate({marginLeft : 0}, function() {
                                $contents.find(".prev-txt").addClass("active");
                                if((scrollX == 0) && ($contents.find(".prev-txt").hasClass("active"))) {
                                    $(this).on("mousewheel DOMMouseScroll", function(evt) {
                                        var deltas = evt.originalEvent.wheelDelta || evt.originalEvent.detail * -1;
                                        if((deltas > 0) && ($contents.find(".prev-txt").hasClass("active"))) {
                                            $contents.removeClass("active").stop().fadeOut();
                                            $line.eq(0).stop().animate({
                                                marginLeft : "0px",
                                                left : "27.28%",
                                                top : "210px",
                                                height : "500px"
                                            })
                                            $line.eq(1).stop().animate({
                                                marginLeft : "0px",
                                                left : "73%",
                                                top : "210px",
                                                height : "500px"
                                            })
                                            $(".deco-line3, .deco-line4").css("opacity", 0);
                                            $contents.find(".prev-txt").removeClass("active");
                                            $contents.prev().addClass("active").stop().delay(800).fadeIn();
                                            $indicator.eq(0).addClass("active").siblings().removeClass("active");
                                        }
                                    });
                                }
                            });
                            setTimeout(function() {
                                scrollX = 0;
                            },50);
                            setTimeout(function() {
                                $contents.find(".prev-txt").removeClass("active");
                            },2500)
                        }
                    });
                    $(".scroll-fill").stop().animate({
                        width : fillWidth = -scrollX/($(document).width() - (winWidth*0.5))*100
                    }, function() {
                        console.log(fillWidth,scrollX,($(document).width() - (winWidth*0.5)));
                    });
                }
                else if(delta < 0) { // 휠내릴때
                    contentsWidth = $("#contents .hor").outerWidth();
                    $("#contents .hor, .deco-line").stop().animate({marginLeft : scrollX-=120},50,"easeOutCubic",function() {
                        cntMarginL = scrollX;
                        $("#contents .hor").attr("data-cntmargin",cntMarginL);
                        if(scrollX <= ($(document).width() - (winWidth*0.5))*-1) { // 가로스크롤 기준점 도달
                            $(this).stop().animate({marginLeft : ($(document).width() - (winWidth*0.5))*-1});
                            $contents.find(".next-txt").addClass("active");
                            $(".scroll-fill").stop().animate({width : "100%"});
                            if(scrollX <= ($(document).width() - (winWidth*0.5))*-1 && ($contents.find(".next-txt").hasClass("active"))) { // 안내문구 active 상태에서 휠 한번더 내릴때
                                $(this).on("mousewheel DOMMouseScroll", function(evt) {
                                    var deltas = evt.originalEvent.wheelDelta || evt.originalEvent.detail * -1;
                                    if(deltas < 0 && $contents.find(".next-txt").hasClass("active")) {
                                        $contents.find(".next-txt").removeClass("active");
                                        $contents.removeClass("active").stop().fadeOut();
                                        $line.eq(0).stop().animate({
                                            marginLeft : "0px",
                                            left : "50%",
                                            top : "0px",
                                            height : "100%"
                                        })
                                        $line.eq(1).stop().animate({
                                            marginLeft : "0px",
                                            left : "75%",
                                            top : "10%",
                                            height : "90%"
                                        })
                                        $line.eq(2).stop().animate({
                                            marginLeft : "0px",
                                            left : "99.9%",
                                            top : "0px",
                                            height : "100%"
                                        })
                                        $line.eq(3).css({
                                            marginLeft : "0px",
                                            opacity : 0
                                        });
                                        $project.addClass("active").stop().delay(800).fadeIn();
                                        $indicator.eq(2).addClass("active").siblings().removeClass("active");
                                    }
                                })
                            }
                            setTimeout(function() {
                                scrollX = ($(document).width() - (winWidth*0.5))*-1;
                            },50);
                            setTimeout(function() {
                                $contents.find(".next-txt").removeClass("active");
                            },3000)    
                        }
                    });
                    $(".scroll-fill").stop().animate({
                        width : -scrollX/($(document).width() - (winWidth*0.5))*100+"%"
                    },function() {
                        console.log(scrollX,($(document).width() - (winWidth*0.5)));
                        if(-scrollX >= ($(document).width() - (winWidth*0.5))*100) {
                            $(".scroll-fill").stop().animate({
                                width : "100%"
                            });
                        }
                    });
                }
            },30);
        }
        else { // mobile
            contentsTimer = setTimeout(function() {
                if($contents.is(":animated")) return false;
                var delta = e.originalEvent.wheelDelta || e.originalEvent.detail * -1;
                if(delta > 0 && articleLength > 0) { // 휠 올릴때
                    $("#contents .hor, .deco-line").stop().animate({marginTop : scrollY+=120},250,"easeOutCubic",function() {
                        cntMarginH = scrollY;
                        $("#contents .hor").attr("data-cntmargintop",cntMarginH);
                        if(scrollY > 0) {
                            $(this).stop().animate({marginTop : 0}, function() {
                                if(scrollY == 0) {
                                    $(this).on("mousewheel DOMMouseScroll", function(evt) {
                                        var deltas = evt.originalEvent.wheelDelta || evt.originalEvent.detail * -1;
                                        if((deltas > 0) && ($body.hasClass("mobile"))) {
                                            $contents.removeClass("active").stop().fadeOut();
                                            $line.eq(0).stop().animate({
                                                marginLeft : "0px",
                                                left : "22.28%",
                                                top : "30%",
                                                height : "33.3%"
                                            });
                                            $line.eq(1).stop().animate({
                                                marginLeft : "0px",
                                                left : "78%",
                                                top : "30%",
                                                height : "33.3%"
                                            });
                                            $(".deco-line3, .deco-line4").css("opacity", 0);
                                            $contents.prev().addClass("active").stop().delay(800).fadeIn();
                                            $(".txt-ani").css("transform","scale(1.3)");
                                        }
                                    });
                                }
                            });
                            setTimeout(function() {
                                scrollY = 0;
                            },50);
                        }
                    });
                }
                else if(delta < 0) { // 휠내릴때
                    contentsHeight = $("#contents .hor").outerHeight();
                    console.log($(document).height(),scrollY, ($(document).height() + ($(window).outerHeight()* 0.8))*-1);
                    $("#contents .hor, .deco-line").stop().animate({marginTop : scrollY-=120},50,"easeOutCubic",function() {
                        cntMarginH = scrollY;
                        $("#contents .hor").attr("data-cntmargintop",cntMarginH);
                        if(scrollY <= ($(document).height() + ($(window).outerHeight()* 0.8))*-1) {
                            $(this).stop().animate({marginTop : ($(document).height() + ($(window).outerHeight()* 0.8))*-1});
                            if(scrollY <= ($(document).height() + ($(window).outerHeight()* 0.8))*-1) {
                                $contents.find(".next-txt").addClass("active");
                                $(this).on("mousewheel DOMMouseScroll", function(evt) {
                                    var deltas = evt.originalEvent.wheelDelta || evt.originalEvent.detail * -1;
                                    if(deltas < 0 && $contents.find(".next-txt").hasClass("active")) {
                                        $contents.find(".next-txt").removeClass("active");
                                        $contents.removeClass("active").stop().fadeOut();
                                        $line.eq(0).stop().animate({
                                            marginLeft : "0px",
                                            marginTop : "0px",
                                            left : "19.3%",
                                            top : "23%",
                                            height : "49.5%"
                                        })
                                        $line.eq(1).stop().animate({
                                            marginLeft : "0px",
                                            marginTop : "0px",
                                            left : "84%",
                                            top : "23%",
                                            height : "49.5%"
                                        })
                                        $line.eq(2).stop().animate({
                                            opacity : "0",
                                            marginLeft : "0px",
                                            marginTop : "0px"
                                        })
                                        $line.eq(3).css({
                                            opacity : "0",
                                            marginLeft : "0px",
                                            marginTop : "0px"
                                        });
                                        $project.addClass("active").stop().delay(800).fadeIn();
                                        $indicator.eq(2).addClass("active").siblings().removeClass("active");
                                    }
                                })
                            }
                            setTimeout(function() {
                                scrollY = ($(document).height() + ($(window).outerHeight()* 0.8))*-1;
                            },50);
                        }
                    });
                    
                }
            },30);

        }
    });
    
    // project wheel event
    $project.on("mousewheel DOMMouseScroll", function(e) {
        clearTimeout(projectTimer);
        if(!$body.hasClass("mobile")) { // PC
            projectTimer = setTimeout(function() {
                if($project.is(":animated")) return false;
                var delta = e.originalEvent.wheelDelta || e.originalEvent.detail * -1;
                if(delta > 0) {
                    $project.removeClass("active").stop().fadeOut();
                    $line.eq(0).stop().animate({
                        marginLeft : cntMarginL,
                        marginTop : "0px",
                        left : "24%",
                        top : "32%",
                        height : "55.45%"
                    });
                    $line.eq(1).stop().animate({
                        marginLeft : cntMarginL,
                        marginTop : "0px",
                        left : "53.5%",
                        top : "20.4%",
                        height : "66.3%"
                    });
                    $line.eq(2).stop().animate({
                        marginLeft : cntMarginL,
                        marginTop : "0px",
                        left : "85%",
                        top : "28.8%",
                        height : "54.5%",
                        opacity : 1
                    });
                    $line.eq(3).stop().animate({
                        marginLeft : cntMarginL,
                        marginTop : "0px",
                        left : "122%",
                        top : "25.6%",
                        height : "61%",
                        opacity : 1
                    }, function() {
                        $contents.addClass("active").stop().delay(800).fadeIn();
                        $indicator.eq(1).addClass("active").siblings().removeClass("active");
                    });

                }
                else if(delta < 0) {
                    $project.removeClass("active").stop().fadeOut();
                    $line.eq(0).stop().animate({
                        left : "0%",
                        top : "0%",
                        height : "100%"
                    });
                    $line.eq(1).stop().animate({
                        left : "50%",
                        top : "0%",
                        height : "100%"
                    });
                    $line.eq(2).stop().animate({
                        left : "100%",
                        top : "0%",
                        height : "100%",
                        opacity : 1
                    }, function() {
                        $webAcce.addClass("active").stop().delay(800).fadeIn();
                        $(window).trigger("resize");
                    });
                    $indicator.eq(3).addClass("active").siblings().removeClass("active");
                    $('.tab:first-of-type, .tabpanel:first-of-type').addClass('active').attr('tabIndex', 0);
                    $('.tab:first-of-type').attr('aria-selected', true);
                    $('.tabpanel:first-of-type').attr('aria-hidden', false);
                    tabActive($("#tabpanel1"));   
                }
            });
        }
        else { // Mobile
            projectTimer = setTimeout(function() {
                if($project.is(":animated")) return false;
                var delta = e.originalEvent.wheelDelta || e.originalEvent.detail * -1;
                if(delta > 0) {
                    $project.removeClass("active").stop().fadeOut();
                    $line.eq(0).stop().animate({
                        marginLeft : "0px",
                        marginTop : cntMarginH,
                        left : "22%",
                        top : "32%",
                        height : "58%"
                    });
                    $line.eq(1).stop().animate({
                        marginLeft : "0px",
                        marginTop : cntMarginH,
                        left : "85%",
                        top : "91.4%",
                        height : "65%"
                    });
                    $line.eq(2).stop().animate({
                        marginLeft : "0px",
                        marginTop : cntMarginH,
                        left : "22%",
                        top : "168.8%",
                        height : "53%",
                        opacity : 1
                    });
                    $line.eq(3).stop().animate({
                        marginLeft : "0px",
                        marginTop : cntMarginH,
                        left : "85%",
                        top : "230.6%",
                        height : "48.8%",
                        opacity : 1
                    }, function() {
                        $contents.addClass("active").stop().delay(800).fadeIn();
                        $indicator.eq(1).addClass("active").siblings().removeClass("active");
                    });

                }
                else if(delta < 0) {
                    $project.removeClass("active").stop().fadeOut();
                    $line.eq(0).stop().animate({
                        left : "0%",
                        top : "0%",
                        height : "100%"
                    });
                    $line.eq(1).stop().animate({
                        left : "99.5%",
                        top : "0%",
                        height : "100%"
                    });
                    $line.eq(2).stop().animate({
                        left : "100%",
                        top : "0%",
                        height : "100%",
                        opacity : 0
                    }, function() {
                        $webAcce.addClass("active").stop().delay(800).fadeIn();
                        $(window).trigger("resize");
                    });
                    $indicator.eq(3).addClass("active").siblings().removeClass("active");
                    $('.tab:first-of-type, .tabpanel:first-of-type').addClass('active').attr('tabIndex', 0);
                    $('.tab:first-of-type').attr('aria-selected', true);
                    $('.tabpanel:first-of-type').attr('aria-hidden', false);
                    tabActive($("#tabpanel1"));   
                }
            });

        }
    })
    // project click event
    $project.find(".modal-btn").on("click", function() {
        var btnIdx = $(this).index(); // 1 ~ 4
        if(!$body.hasClass("mobile")) {
            switch(btnIdx) {
                case 1 : {
                    $project.find(".project1").attr("aria-hidden","false").css("display", "table-cell").stop().fadeIn().siblings().attr("aria-hidden","true").css("display", "none");
                    break;
                }
                case 2 : {
                    $project.find(".project2").attr("aria-hidden","false").css("display", "table-cell").stop().fadeIn().siblings().attr("aria-hidden","true").css("display", "none");
                    break;
                }
                case 3 : {
                    $project.find(".project3").attr("aria-hidden","false").css("display", "table-cell").stop().fadeIn().siblings().attr("aria-hidden","true").css("display", "none");
                    break;
                }
                case 4 : {
                    $project.find(".project4").attr("aria-hidden","false").css("display", "table-cell").stop().fadeIn().siblings().attr("aria-hidden","true").css("display", "none");
                    break;
                }
            }
        }
        else {
            switch(btnIdx) {
                case 1 : {
                    $project.prepend("<div id='dim'></dim>");
                    $(".m-close-btn").css("display","block");
                    $project.find(".project1").attr("aria-hidden","false").css("display", "table-cell").stop().fadeIn().siblings().attr("aria-hidden","true").css("display", "none");
                    $(".project-modal-area").css("zIndex","-1");
                    $line.css("zIndex","0");
                    break;
                }
                case 2 : {
                    $project.prepend("<div id='dim'></dim>");
                    $(".m-close-btn").css("display","block");
                    $project.find(".project2").attr("aria-hidden","false").css("display", "table-cell").stop().fadeIn().siblings().attr("aria-hidden","true").css("display", "none");
                    $(".project-modal-area").css("zIndex","-1");
                    $line.css("zIndex","0");
                    break;
                }
                case 3 : {
                    $project.prepend("<div id='dim'></dim>");
                    $(".m-close-btn").css("display","block");
                    $project.find(".project3").attr("aria-hidden","false").css("display", "table-cell").stop().fadeIn().siblings().attr("aria-hidden","true").css("display", "none");
                    $(".project-modal-area").css("zIndex","-1");
                    $line.css("zIndex","0");
                    break;
                }
                case 4 : {
                    $project.prepend("<div id='dim'></dim>");
                    $(".m-close-btn").css("display","block");
                    $project.find(".project4").attr("aria-hidden","false").css("display", "table-cell").stop().fadeIn().siblings().attr("aria-hidden","true").css("display", "none");
                    $(".project-modal-area").css("zIndex","-1");
                    $line.css("zIndex","0");
                    break;
                }
            }
        }
    });
    // project mobile close
    $project.find(".m-close-btn").on("click", function() {
        $("#dim").remove();
        $(this).parent().attr("aria-hidden","true").css("display", "none");
        $(".project-modal-area").css("zIndex","1");
        $line.css("zIndex","500");
    })
    $(document).on("click", "#dim", function() {
        $(".m-close-btn").click();
    })

    // webAcce wheel event
    $webAcce.on("mousewheel DOMMouseScroll", function(e) {
        clearTimeout(webAcceTimer);
        if(!$body.hasClass("mobile")) {
            webAcceTimer = setTimeout(function () {
                if($webAcce.is(":animated")) return false;
                var delta = e.originalEvent.wheelDelta || e.originalEvent.detail * -1;
                if(delta > 0) {
                    $webAcce.removeClass("active").stop().fadeOut();
                    $line.eq(0).stop().animate({
                        marginLeft : "0px",
                        left : "50%",
                        top : "0px",
                        height : "100%"
                    });
                    $line.eq(1).stop().animate({
                        marginLeft : "0px",
                        left : "75%",
                        top : "10%",
                        height : "90%"
                    });
                    $line.eq(2).stop().animate({
                        marginLeft : "0px",
                        left : "99.9%",
                        top : "0px",
                        height : "100%"
                    }, function() {
                        $project.addClass("active").stop().fadeIn();
                    });
                    $indicator.eq(2).addClass("active").siblings().removeClass("active");

                }
                else if(delta < 0) {
                    $webAcce.removeClass("active").stop().fadeOut();
                    $line.eq(0).stop().animate({
                        left : "24.3%",
                        top : "24%",
                        height : "51.2%"
                    });
                    $line.eq(1).stop().animate({
                        left : "53.9%",
                        top : "10%",
                        height : "76.8%"
                    });
                    $line.eq(2).stop().animate({
                        left : "83.4%",
                        top : "24%",
                        height : "51.2%"
                    }, function() {
                        $aboutMe.addClass("active").stop().delay(800).fadeIn();
                        $aboutMe.css("zIndex","501");
                        $aboutMe.find("ul li").stop().delay(2200).animate({color : "#ffffff"},function() {
                            $line.css("height","0px");
                        });
                    });
                    $indicator.eq(4).addClass("active").siblings().removeClass("active");
                }
            });
        }
        else {
            webAcceTimer = setTimeout(function () {
                if($webAcce.is(":animated")) return false;
                var delta = e.originalEvent.wheelDelta || e.originalEvent.detail * -1;
                if(delta > 0) {
                    $webAcce.removeClass("active").stop().fadeOut();
                    $line.eq(0).stop().animate({
                        marginLeft : "0px",
                        left : "19.3%",
                        top : "23%",
                        height : "49.5%"
                    })
                    $line.eq(1).stop().animate({
                        marginLeft : "0px",
                        left : "84%",
                        top : "23%",
                        height : "49.5%"
                    })
                    $line.eq(2).stop().animate({
                        opacity : "0",
                        marginLeft : "0px"
                    })
                    $line.eq(3).css({
                        opacity : "0",
                        marginLeft : "0px"
                    });
                    $project.addClass("active").stop().delay(800).fadeIn();
                    $indicator.eq(2).addClass("active").siblings().removeClass("active");

                }
                else if(delta < 0) {
                    $webAcce.removeClass("active").stop().fadeOut();
                    $line.eq(0).stop().animate({
                        left : "24.3%",
                        top : "24%",
                        height : "51.2%"
                    });
                    $line.eq(1).stop().animate({
                        left : "53.9%",
                        top : "10%",
                        height : "76.8%"
                    });
                    $line.eq(2).stop().animate({
                        left : "83.4%",
                        top : "24%",
                        height : "51.2%"
                    }, function() {
                        $aboutMe.addClass("active").stop().delay(800).fadeIn();
                        $aboutMe.css("zIndex","501");
                        $aboutMe.find("ul li").stop().delay(2200).animate({color : "#ffffff"},function() {
                            $line.css("height","0px");
                        });
                    });
                    $indicator.eq(4).addClass("active").siblings().removeClass("active");
                }
            });

        }
            
    });

    // webAcce btn click event
    $tabBtn.on("click", function() {
        var $target = $(this);
        tabActive($target);
    });

    // webAcce tabBtn 키보드제어
    $tabBtn.on("keydown", function(e) 
    { // 방향키 37 39 , esc space 27 32 , home end 36 35 enter 13
        var key = e.keyCode;
        switch(key)
        {
            case 13 : //enter
            case 32 : { // space bar
                var $target = $(this);
                tabActive($target);
            }
            case 27 : {

                break;
            }

            case 35 : { // end
                e.preventDefault();
                $(this).siblings(".last").attr("tabIndex",0).focus();
                break;
            }
            case 36 : { // home
                e.preventDefault();
                $(this).attr("tabIndex",-1).siblings(".first").attr("tabIndex",0).focus();
                break;
            }
            case 37 : { // 이전방향키
                $(this).attr("tabIndex", -1).prev().focus();
                if($(this).hasClass("first")) 
                    $(this).siblings(".last").attr("tabIndex", 0).focus();
                else
                    $(this).prev().attr("tabIndex",0).focus();
                break;
            }
            case 39 : { // 다음방향키
                $(this).attr("tabIndex",-1).next().focus();
                if($(this).hasClass("last"))
                    $(this).siblings(".first").attr("tabIndex",0).focus();
                else 
                    $(this).next().attr("tabIndex",0).focus();
                break;
            }

        }
    });

    // webAcce btn Active
    function tabActive($target) {
        if(!$body.hasClass("mobile")) {
            $target.addClass("active").attr({"tabIndex" : 0, "aria-selected" : "true"}).siblings().removeClass("active").attr({"tabIndex" : -1, "aria-selected" : "false"});
            $("#"+$target.attr("aria-controls")).addClass("active").attr({"tabIndex" : 0, "aria-hidden" : "false"}).siblings(".tabpanel").removeClass("active").attr({"tabIndex" : -1, "aria-hidden" : "true"});
        }
        else {
            $target.addClass("active").attr({"tabIndex" : 0, "aria-selected" : "true"}).siblings().removeClass("active").attr({"tabIndex" : -1, "aria-selected" : "false"});
            $("#"+$target.attr("aria-controls")).addClass("active").attr({"tabIndex" : 0, "aria-hidden" : "false"}).siblings(".tabpanel").removeClass("active").attr({"tabIndex" : -1, "aria-hidden" : "true"});
        }
        swiperActive();
    }
    
    // webAcce slide btn click event


    // webAcce mouseenter, focus event
    $webAcce.find(".web-slide-area, .swiper-button-prev, .swiper-button-next").on({
       "mouseenter" : function() { //enter
            $webAcce.find(".swiper-button-prev, .swiper-button-next").addClass("active");
        },
       "mouseleave" : function() { // leave
            $webAcce.find(".swiper-button-prev, .swiper-button-next").removeClass("active");
        },
        "focusin" : function() { // focus
            $webAcce.find(".swiper-button-prev, .swiper-button-next").addClass("active");
        },
        "focusout" : function() {
            $webAcce.find(".swiper-button-prev, .swiper-button-next").removeClass("active");
        }
    });

    // webAcce 3D cube swiper

    // aboutMe wheel event
    $aboutMe.on("mousewheel DOMMouseScroll", function(e) {
        clearTimeout(aboutMeTimer);
        if(!$body.hasClass("mobile")) {
            aboutMeTimer = setTimeout(function() {
                if($aboutMe.is(":animated")) return false;
                var delta = e.originalEvent.wheelDelta || e.originalEvent.detail * -1;
                if(delta > 0) {
                    $aboutMe.removeClass("active").stop().fadeOut();
                    $line.eq(0).stop().animate({
                        left : "0%",
                        top : "0%",
                        height : "100%"
                    });
                    $line.eq(1).stop().animate({
                        left : "50%",
                        top : "0%",
                        height : "100%"
                    });
                    $line.eq(2).stop().animate({
                        left : "100%",
                        top : "0%",
                        height : "100%",
                        opacity : 1
                    }, function() {
                        $webAcce.addClass("active").stop().delay(800).fadeIn();
                    });
                    $indicator.eq(3).addClass("active").siblings().removeClass("active");        
                }
            },50);
        }
        else {
            aboutMeTimer = setTimeout(function() {
                if($aboutMe.is(":animated")) return false;
                var delta = e.originalEvent.wheelDelta || e.originalEvent.detail * -1;
                if(delta > 0) {
                    $aboutMe.removeClass("active").stop().fadeOut();
                    $line.eq(0).stop().animate({
                        left : "0%",
                        top : "0%",
                        height : "100%"
                    });
                    $line.eq(1).stop().animate({
                        left : "99.5%",
                        top : "0%",
                        height : "100%"
                    });
                    $line.eq(2).stop().animate({
                        left : "100%",
                        top : "0%",
                        height : "100%",
                        opacity : 0
                    });
                    $webAcce.addClass("active").stop().delay(800).fadeIn();
                    $indicator.eq(3).addClass("active").siblings().removeClass("active");        
                }
            },50);

        }
    });
    // aboutMe .skills-view click event
    $aboutMe.find(".skills-view").on("click", function(e) {
        e.preventDefault();
        if(!$body.hasClass("mobile")) {
            $("#modal-mobile").addClass("active");
            $("#about-modal").addClass("active");
            $(".about-modal-close-btn").addClass("active");
        }
        else {
            $("#modal-mobile").addClass("active");
            $("#about-modal").addClass("active");
            $(".about-modal-close-btn").addClass("active");
        }
    });
    $aboutMe.find(".about-modal-close-btn").on("click", function() {
        $("#modal-mobile").removeClass("active");
        $("#about-modal").removeClass("active");
        $(".about-modal-close-btn").removeClass("active");
    });
});