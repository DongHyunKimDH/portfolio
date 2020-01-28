$(document).ready(function () {
    var $intro = $("#intro");
    var $contents = $("#contents");
    var $project = $("#project");
    var $webAcce = $("#webAcce");
    var $aboutMe = $("#aboutMe");

    var $FillDiv = $("#intro .fillbg");
    var $IntroTxt = $("#intro .txt-ani").children();
    var introArray = new Array($IntroTxt.size());
    var $line = $("#fixed-line").children();
    var $indicator = $("#indicator").children();
    
    var articleLength = $("#cnt-wrap article").length;
    var winWidth;
    var ContentsWidth;
    
    var resizeTimer = 0;
    var introTimer = 0;
    var contentsTimer = 0;
    var projectTimer = 0;
    var webAcceTimer = 0;
    var aboutMeTimer = 0;

    var scrollX = 0;
    var $mainBlack = "#333435";
    var $mainBlue = "#7ec6c5";
    var $mainRed = "#cb6586";
    // Intro
    function introAni() {
        // line1, 2 최초 위치 저장
        var lineOffset = [];
        lineOffset[0] = [$("#fixed-line").children().eq(0).offset().left,$("#fixed-line").children().eq(0).offset().top];
        lineOffset[1] = [$("#fixed-line").children().eq(1).offset().left,$("#fixed-line").children().eq(1).offset().top];

        //  배경색 채우기
        $FillDiv.eq(0).stop().animate({width: "50vw"}, 200);
        $FillDiv.eq(1).stop().delay(180).animate({width: "50vw"}, 200);
        $FillDiv.eq(3).stop().delay(350).animate({height: "50vh"}, 200);
        $FillDiv.eq(2).stop().delay(650).animate({width: "50vw"}, 200, function () {
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
            $indicator.eq(0).addClass("active");
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
        $line.eq(0).stop().delay(4000).animate({
            left : "523px",
            height : "500px"
        });
        $line.eq(1).stop().delay(4000).animate({
            left : "1391px",
            height : "500px"
        });    
        console.log(lineOffset[0],lineOffset[1]);
    }
    introAni();
    
    // resize width()
    $(window).on("resize", function() {
        winWidth = $(window).width();
        ContentsWidth = $("#contents .hor").outerWidth();
        console.log(ContentsWidth);
    });
    $(window).trigger("resize");
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
    })
    // indicator
    $indicator.on("click",function() {
        var target = $($(this).attr("href"));
        $("#cnt-wrap article").stop().fadeOut();
        target.stop().fadeIn();
        $(this).addClass("active").siblings().removeClass("active");
            if($(this).index() == 0) introAni();
    });

    // intro wheel event
    $intro.on("mousewheel DOMMouseScroll", function(e) {
        clearTimeout(introTimer);
        introTimer = setTimeout(function () {
            if($intro.is(":animated")) return false;
            var delta = e.originalEvent.wheelDelta || e.originalEvent.detail * -1;
            if (delta < 0) {
                $intro.stop().fadeOut();
                $line.eq(0).stop().animate({
                    left : "24%",
                    top : "300px",
                    height : "520px"
                });
                $line.eq(1).stop().animate({
                    left : "53.5%",
                    top : "191px",
                    height : "620px"
                });
                $line.eq(2).stop().animate({
                    left : "85%",
                    top : "270px",
                    height : "510px",
                    opacity : 1
                });
                $line.eq(3).stop().animate({
                    left : "117%",
                    top : "240px",
                    height : "570px",
                    opacity : 1
                }, function() {
                    $contents.stop().delay(800).fadeIn();
                });
                $indicator.eq(0).removeClass("active").next().addClass("active");
            }
        });
    });

    // contents wheel event
    $contents.on("mousewheel DOMMouseScroll", function(e) {
        clearTimeout(contentsTimer);
        contentsTimer = setTimeout(function() {
            if($contents.is(":animated")) return false;
            var delta = e.originalEvent.wheelDelta || e.originalEvent.detail * -1;
            if(delta > 0 && articleLength > 0) { // 휠 올릴때
                $("#contents .hor, .deco-line").stop().animate({marginLeft : scrollX+=120},50,"easeOutCubic",function() {
                    if(scrollX > 0) {
                        $(this).stop().animate({marginLeft : 0}, function() {
                            $contents.find(".prev-txt").addClass("active");
                            if(scrollX == 0 && $contents.find(".prev-txt").hasClass("active")) {
                                $contents.stop().fadeOut();
                                $line.eq(0).stop().animate({
                                    marginLeft : "0px",
                                    left : "27.28%",
                                    top : "210px",
                                    height : "500px"
                                })
                                $line.eq(1).stop().animate({
                                    marginLeft : "0px",
                                    left : "75%",
                                    top : "210px",
                                    height : "500px"
                                })
                                $(".deco-line3, .deco-line4").css("opacity", 0);
                                $contents.prev().stop().delay(800).fadeIn();
                                $indicator.eq(0).addClass("active").siblings().removeClass("active");
    
                            }
                        });
                        setTimeout(function() {
                            scrollX = 0;
                        },50);
                        setTimeout(function() {
                            $contents.find(".prev-txt").removeClass("active");
                        },3000)
                    }
                });
            }
            else if(delta < 0) { // 휠내릴때
                ContentsWidth = $("#contents .hor").outerWidth();
                $("#contents .hor, .deco-line").stop().animate({marginLeft : scrollX-=120},50,"easeOutCubic",function() {
                    if(scrollX <= ($(document).width() - (winWidth*0.5))*-1) {
                        $contents.find(".next-txt").addClass("active");
                        $(this).stop().animate({marginLeft : ($(document).width() - (winWidth*0.5))*-1});
                        setTimeout(function() {
                            scrollX = ($(document).width() - (winWidth*0.5))*-1;
                        },50);
                        setTimeout(function() {
                            $contents.find(".next-txt").removeClass("active");
                        },3000)
                        if(scrollX <= ($(document).width() - (winWidth*0.5))*-1 && ($contents.find(".next-txt").hasClass("active"))) {
                            $contents.stop().fadeOut();
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
                            $project.stop().delay(800).fadeIn();
                            $indicator.eq(2).addClass("active").siblings().removeClass("active");
                        }
                    }
                });
            }
        },30);
    });
    
    // project wheel event
    $project.on("mousewheel DOMMouseScroll", function(e) {
        clearTimeout(projectTimer);
        projectTimer = setTimeout(function() {
            if($project.is(":animated")) return false;
            var delta = e.originalEvent.wheelDelta || e.originalEvent.detail * -1;
            if(delta > 0) {
                $project.stop().fadeOut();
                $line.eq(0).stop().animate({
                    left : "24%",
                    top : "300px",
                    height : "520px"
                });
                $line.eq(1).stop().animate({
                    left : "53.5%",
                    top : "191px",
                    height : "620px"
                });
                $line.eq(2).stop().animate({
                    left : "85%",
                    top : "270px",
                    height : "510px",
                    opacity : 1
                });
                $line.eq(3).stop().animate({
                    left : "117%",
                    top : "240px",
                    height : "570px",
                    opacity : 1
                }, function() {
                    $contents.stop().delay(800).fadeIn();
                    $indicator.eq(1).addClass("active").siblings().removeClass("active");
                });

            }
            else if(delta < 0) {
                $project.stop().fadeOut();
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
                    $webAcce.stop().delay(800).fadeIn();
                });
                $indicator.eq(3).addClass("active").siblings().removeClass("active");

            }
        });
    })
    // project click event
    $project.find(".modal-btn").on("click", function() {
        var btnIdx = $(this).index(); // 1 ~ 4
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
        
    })
    // webAcce wheel event
    $webAcce.on("mousewheel DOMMouseScroll", function(e) {
        clearTimeout(webAcceTimer);
        webAcceTimer = setTimeout(function () {
            if($webAcce.is(":animated")) return false;
            var delta = e.originalEvent.wheelDelta || e.originalEvent.detail * -1;
            if(delta > 0) {
                $webAcce.stop().fadeOut();
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
                    $project.stop().fadeIn();
                });
                $indicator.eq(2).addClass("active").siblings().removeClass("active");

            }
            else if(delta < 0) {
                $webAcce.stop().fadeOut();
                $line.eq(0).stop().animate({
                    left : "24.3%",
                    top : "24%",
                    height : "480px"
                });
                $line.eq(1).stop().animate({
                    left : "53.9%",
                    top : "10%",
                    height : "720px"
                });
                $line.eq(2).stop().animate({
                    left : "83.4%",
                    top : "24%",
                    height : "480px"
                }, function() {
                    $aboutMe.stop().delay(800).fadeIn();
                });
                $line.eq(3).stop().fadeOut();
                $indicator.eq(4).addClass("active").siblings().removeClass("active");
            }
        });
    })

    // aboutMe wheel event
    $aboutMe.on("mousewheel DOMMouseScroll", function(e) {
        clearTimeout(aboutMeTimer);
        aboutMeTimer = setTimeout(function() {
            if($aboutMe.is(":animated")) return false;
            var delta = e.originalEvent.wheelDelta || e.originalEvent.detail * -1;
            if(delta > 0) {
                $aboutMe.stop().fadeOut();
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
                    $webAcce.stop().delay(800).fadeIn();
                });
                $indicator.eq(3).addClass("active").siblings().removeClass("active");
            }
        });
    })
});