let controller;

$(document).ready(function () {
    let scripts = [
        "./js/controller/admin_controller.js",
        "./js/model/model.js",
        "./js/view/view.js",
        "./js/util/quiz_form.js"
    ]
    loadScript(scripts, () => {
        controller = new Controller("#root");
        controller.dispatch("INIT_GUI");
    });
});



function loadScript(urls, callback) {
    let url_arry = urls;
    if (url_arry.length != 0) {
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url_arry.pop();
        script.onload = (value) => {
            loadScript(url_arry, callback);
        };
        head.appendChild(script);
    } else {
        callback();
    }
}
