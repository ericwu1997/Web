class View {
    // Default constructor 
    constructor(root_view) {
        this._root_view = root_view;
    }

    // Update "Life" text view display
    updateLifeTextView(life) {
        document.getElementById("lifeTextView").innerHTML = "Life: " + life;
    }

    // Update "Score" text view display
    updateScoreTextView(score) {
        document.getElementById("scoreTextView").innerHTML = "Score: " + score;
    }

    // Update "Hint" text view display
    updateHintTextView(hint) {
        document.getElementById("hintTextView").innerHTML = "Hint: " + hint;
    }

    // Empty out existing word placeholder, create new place holders base on the word length
    updateWordPlaceHolder(length) {
        $("#wordPlaceHolder").empty();
        let placeholder = document.getElementById("wordPlaceHolder");
        for (let i = 0; i < length; i++) {
            let node = document.createElement("h1");
            node.appendChild(document.createTextNode("_"));
            placeholder.appendChild(node);
        }
    }

    // Update word place holders with hitted characters {indexs} 
    updateWordTextView(char, hitted_indexs) {
        let holder = document.getElementById("wordPlaceHolder");
        hitted_indexs.forEach((index) => {
            holder.childNodes[index].innerHTML = char;
        });
    }

    // Append "Life" text view to root view 
    createLifeTextView() {
        let lifeTextView = document.createElement("p");
        lifeTextView.setAttribute("id", "lifeTextView");
        lifeTextView.setAttribute("class", "states");
        lifeTextView.appendChild(document.createTextNode("Life: 7"));
        $(this._root_view).append(lifeTextView);
    }

    // Append "Score" text view to root vie
    createScoreTextView() {
        let scoreTextView = document.createElement("p");
        scoreTextView.setAttribute("id", "scoreTextView");
        scoreTextView.setAttribute("class", "states");
        scoreTextView.appendChild(document.createTextNode("Score: 0"));
        $(this._root_view).append(scoreTextView);
    }

    // Append "hint" text view to root view 
    createHintTextView(hint) {
        let hintTextView = document.createElement("p");
        hintTextView.setAttribute("id", "hintTextView");
        hintTextView.setAttribute("class", "hint_container");
        hintTextView.appendChild(document.createTextNode("Hint: " + hint))
        $(this._root_view).append(hintTextView);
    }

    // Word placeholders container, append low_dahs base on word length
    createWordPlaceHolder(length) {
        let placeholder = document.createElement("div");
        placeholder.setAttribute("id", "wordPlaceHolder");
        placeholder.setAttribute("class", "flex-box")
        for (let i = 0; i < length; i++) {
            let node = document.createElement("h1");
            node.appendChild(document.createTextNode("_"));
            placeholder.appendChild(node);
        }
        $(this._root_view).append(placeholder);
    }

    // Append alphabet button to root view 
    createAlphabetButton(onClickEvent) {
        let A_ASCII = 65;
        let aphatbet_count = 26;
        let container = document.createElement("div");
        container.setAttribute("id", "buttonContainer");
        container.setAttribute("class", "btn_container")
        for (let i = A_ASCII; i < aphatbet_count + A_ASCII; i++) {
            const char = String.fromCharCode(i);
            let node = document.createElement("input");
            node.setAttribute("id", "btn_" + char.toLowerCase())
            node.setAttribute("value", char);
            node.setAttribute("type", "button");
            node.setAttribute("class", "btn btn-primary alph");
            node.onclick = function () { onClickEvent(char.toLowerCase()) };
            container.appendChild(node);
        }
        $(this._root_view).append(container);
    }

    // Append "Restart" button to root view 
    createRestartButton(onClickEvent) {
        let restartButton = document.createElement('input');
        restartButton.setAttribute("id", "restartBtn");
        restartButton.setAttribute("type", "button");
        restartButton.setAttribute("value", "restart");
        restartButton.setAttribute("class", "btn btn-warning restart_btn");
        restartButton.onclick = function () { onClickEvent() };
        $(this._root_view).append(restartButton);
    }

    //Disable button with id {id}
    disableButton(id) {
        document.getElementById(id).disabled = true;
    }

    //Enable all alphabet button
    enableAllAlphButton() {
        $('.alph').removeAttr('disabled');
    }

    //Append snakc bar (invisible)
    createSnackBar() {
        let snackbar = document.createElement('div');
        snackbar.setAttribute("id", "snackbar");
        $(this._root_view).append(snackbar);
    }

    //Show snack bar for 1.5 sec
    showSnackBar(msg) {
        let x = document.getElementById("snackbar");
        x.innerHTML = msg;
        x.className = "show";
        setTimeout(function () { x.className = x.className.replace("show", ""); }, 1500);
    }
}