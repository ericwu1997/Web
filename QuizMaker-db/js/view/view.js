class View {
    // Default constructor 
    constructor(root_view) {
        this._root_view = root_view;
        this._form_id = "quizForm";
        this._form = new QuizForm();
    }

    // Create quiz form
    createQuizForm(onSumbitEvent) {
        let form = document.createElement("form");
        form.setAttribute("id", this._form_id);
        form.onsubmit = (e) => {
            e.preventDefault();
            onSumbitEvent();
        };
        this.createSnackBar();
        $(this._root_view).append(form);
    }

    // Create quiz block
    createQuizBlock(id, data) {
        let form = this._form;
        if (data == undefined) {
            form.createEmptyBlock("#" + this._form_id, id);
        } else {
            form.createBlockFromData("#" + this._form_id, id, data);
        }
    }

    // Create save button
    createSaveButton(onClickEvent) {
        let save = document.createElement("input");
        save.setAttribute("class", "btn btn-dark save");
        save.setAttribute("value", "Save");
        save.setAttribute("type", "submit");
        $("#" + this._form_id).append(save);
    }

    // Create add button
    createAddButton(onClickEvent) {
        let add = document.createElement("input");
        add.setAttribute("type", "button");
        add.setAttribute("class", "btn btn-dark add");
        add.setAttribute("value", "Add");
        add.onclick = onClickEvent;
        $("#" + this._form_id).append(add);
    }

    // Create submit button
    createSubmitButton(onClickEvent) {
        let submit = document.createElement("input");
        submit.setAttribute("id", "submitAnswer");
        submit.setAttribute("type", "submit");
        submit.setAttribute("class", "btn btn-dark submit");
        submit.setAttribute("value", "Submit");
        submit.onclick = onClickEvent;
        $("#" + this._form_id).append(submit);
    }

    // Remove submit button
    removeSubmitButton() {
        $("#submitAnswer").remove();
    }

    // Retrieve quiz blocks
    getQuizBlocks(callback) {
        let elements = $('.container');
        if (callback != undefined) {
            callback(elements);
        } else {
            return elements;
        }
    }

    // Hight light 
    highLight(result) {
        let blocks = this.getQuizBlocks();
        let _total = blocks.length;
        let _correct = 0;
        for (let i = 0; i < _total; i++) {
            let labelList = $(blocks[i]).find("LABEL");
            let selected = parseInt(result[i].selected) + 2;
            let key = parseInt(result[i].key) + 2;
            labelList[selected].className += " red";
            labelList[key].className += " green";
            if (selected == key) {
                _correct++;
            } else {
                labelList[selected].innerHTML += " (wrong)";
            }
        }
        let mark = {
            total: _total,
            correct: _correct
        }
        return mark;
    }

    // Creat snack bar
    createSnackBar() {
        let snackbar = document.createElement('div');
        snackbar.setAttribute("id", "snackbar");
        $(this._root_view).append(snackbar);
    }

    // Show snack bar
    showSnackBar(msg, flag) {
        let x = document.getElementById("snackbar");
        x.innerHTML = msg;
        if (flag == undefined) {
            x.className = "show";
            setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
        } else {
            x.className = "show_stay";
        }
    }
}