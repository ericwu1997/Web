let controller;

$(document).ready(function () {
    var scripts = [
        "./js/controller/game_logic.js",
        "./js/model/model.js",
        "./js/view/view.js"
    ]
    loadScript(scripts[0], function () {
        loadScript(scripts[1], function () {
            loadScript(scripts[2], function () {
                controller = new Controller("#root");
                controller.dispatch("START");
            })
        })
    })
});

//Load scripts
function loadScript(url, callback) {
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    script.onreadystatechange = callback;
    script.onload = callback;
    head.appendChild(script);
}