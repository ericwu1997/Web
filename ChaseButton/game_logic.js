
// Client window width and height
var widow_height = window.innerWidth;
var widnow_width = window.innerHeight;
var blue_current_position = { x: 0, y: 0 };
var red_current_position = { x: 0, y: 0 };
var blue_btn;
var red_btn;
var score_text;
var score = 0;

function test() {
    console.log("Tesitng");
}

window.addEventListener('resize', function() {
    widow_height = window.innerWidth;
    widnow_width = window.innerHeight;
}, true);

document.addEventListener("DOMContentLoaded", function () {
    blue_btn = document.getElementById("primary_btn");
    red_btn = document.getElementById("danger_btn");
    score_text = document.getElementById("score");
    setInterval(function () {
        animate_btn(blue_btn);
    }, 1200);
    setInterval(function () {
        animate_btn(red_btn);
    }, 1200);
});

function plus() {
    score += 1;
    score_text.innerHTML = "<span style='color:#CC9520'><b>" + score + "</span></b>";
}

function minus() {
    score -= 1;
    score_text.innerHTML = "<span style='color:#CC9520'><b>" + score + "</span></b>";
}

function generate_new_position() {
    var new_height = Math.abs(Math.floor(Math.random() * widow_height) - 100);
    var new_width = Math.abs(Math.floor(Math.random() * widnow_width) - 100);
    return { x: new_height, y: new_width };
}

function animate_btn(button) {
    var id = button.id;
    var current_position;
    var new_position = generate_new_position();
    if (id == "primary_btn") {
        current_position = { x: blue_current_position.x, y: blue_current_position.y };
        blue_current_position.x = new_position.x;
        blue_current_position.y = new_position.y;
    } else {
        current_position = { x: red_current_position.x, y: red_current_position.y };
        red_current_position.x = new_position.x;
        red_current_position.y = new_position.y;
    }
    button.animate([
        {
            transform: "translate("
                + current_position.x + "px, " + current_position.y + "px)"
        },
        {
            transform: "translate("
                + new_position.x + "px, " + new_position.y + "px)"
        }
    ], { duration: 1000, easing: "linear", fill: "forwards" });
}
