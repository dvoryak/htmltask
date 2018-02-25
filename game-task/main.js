(function(){
    window.addEventListener("load", init, false);
    var score = 0;
    var radius = 50;

    function init() {
        var elem = document.getElementById("ball");
        elem.addEventListener("mousedown", function (e) {
            drag(this, e);
        })
    }

    function drag(elementToDrag, event) {
        // координаты мыши в начале перетаскивания.
        var startX = event.clientX,
            startY = event.clientY;

        // начальные координаты элемента, который будет перемещаться.
        var origX = elementToDrag.offsetLeft,
            origY = elementToDrag.offsetTop;

        // разница между координатами мыши и координатами перетаскиваемого элемента.
        var deltaX = startX - origX,
            deltaY = startY - origY;

        // Регистрация событий mouseup и mousemove
        document.addEventListener("mousemove", moveHandler, true);
        document.addEventListener("mouseup", upHandler, true);

        function moveHandler(e) {
            if (!e) e = window.event;
            // перемещаем элемент с учетом отступа от первоначального клика.
            document.querySelector("#position").innerHTML = "Position : x=" + (e.clientX - deltaX) + " y="
                + (e.clientY - deltaY);

            if(e.clientX ) {
              elementToDrag.style.left = (e.clientX - deltaX) + "px";
              elementToDrag.style.top = (e.clientY - deltaY) + "px";
            }

        }

        function upHandler(e) {
            if (!e) e = window.event;
            console.log("up");
            document.removeEventListener("mouseup", upHandler, true);
            document.removeEventListener("mousemove", moveHandler, true);

            if(e.clientX - deltaX > bX && e.clientX - deltaX < bX + radius &&
                e.clientY - deltaY < bY) {
              score++;
              updateScore();
              initialPosition();
            }
        }

        var bX = document.querySelector("#real_bucket").offsetLeft + document.querySelector("#bucket").offsetLeft;
        var bY = document.querySelector("#real_bucket").offsetTop + document.querySelector("#bucket").offsetTop;


        console.log("x= " + bX);
        console.log("y= " + bY);

        function updateScore() {
          document.querySelector("#scores").innerHTML = "Scores: " + score;
        }

        function initialPosition() {
          document.querySelector("#ball").style.left ="10%";
          document.querySelector("#ball").style.top = "30%";
        }


    }
})()
