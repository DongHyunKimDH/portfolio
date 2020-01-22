$(document).ready(function () {
    var $FillDiv = $("#intro .fillbg");
    var $IntroTxt = $("#intro .txt-ani").children();
    var introArray = new Array($IntroTxt.size());
    var $line = $("#fixed-line").children();
    var wheelTimer = 0;
    var articleLength = $("#cnt-wrap article").length;
    var $ContentsWidth = $("#contents").outerWidth(true);
    var $mainBlack = "#333435";
    var $mainBlue = "#7ec6c5";
    var $mainRed = "#cb6586";
    var $gray = "#aaaaaa";
    var $black = "#333333";
    console.log($ContentsWidth);
    // Intro
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
    });

    setTimeout(function() { // Fade된 글자색 바꾸기
        $IntroTxt.css({
            color : $black
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

    //
    $("#intro").on("mousewheel DOMMouseScroll", function(e) {
        clearTimeout(wheelTimer);
        wheelTimer = setTimeout(function () {
            if($("#intro").is(":animated")) return false;
            var delta = e.originalEvent.wheelDelta || e.originalEvent.detail * -1;
            if(delta > 0 ) {

            }
            else if (delta < 0) {
                $("#intro").stop().fadeOut();
                $("#cnt-wrap").css("overflow","visible");
                $line.eq(0).stop().animate({
                    left : "467px",
                    top : "300px",
                    height : "520px"
                });
                $line.eq(1).stop().animate({
                    left : "1034px",
                    top : "191px",
                    height : "620px"
                });
                $line.eq(2).stop().animate({
                    left : "1635px",
                    top : "270px",
                    height : "510px"
                });
                $line.eq(3).stop().animate({
                    left : "2246px",
                    top : "240px",
                    height : "570px"
                }, function() {
                    $("#contents").stop().fadeIn();
                });
            }
        });
    });
    
});