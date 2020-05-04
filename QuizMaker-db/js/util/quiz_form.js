class QuizForm {
    constructor() {
        this._MAX_CHOICE = 4;
        this._ASCII_A = 65;
    }

    createEmptyBlock(root, id) {
        let container = this._createQuestionContainer();
        container.setAttribute("id", id);
        container.appendChild(this._createHeaderSection());
        container.appendChild(this._createRadioButtonField(id));
        container.appendChild(this._createRemoveButton(id));

        let btn_div = document.createElement("div")
        btn_div.setAttribute('class', 'onoffswitch')
        btn_div.innerHTML = ' <div class="onoffswitch">' +
            '<input type="checkbox" name="onoffswitch_' + id + '"' +
            'class="onoffswitch-checkbox" id="switch_' + id +
            '" value="Hard" checked><label class="onoffswitch-label" for="switch_' + id +
            '"><span class="onoffswitch-inner"></span>' +
            '<span class="onoffswitch-switch"></span></label></div>'

        let level_checkbox = this._createLevelCheckBox(id);

        container.appendChild(level_checkbox);

        $(root).append(container);
    }

    createBlockFromData(root, id, data) {
        let container = this._createQuestionContainer();
        container.setAttribute("id", id);
        container.appendChild(this._createHeaderSection(data, id));
        container.appendChild(this._createRadioButtonField(id, data));
        container.appendChild(this._createDifficultyTag(data.difficulty));
        $(root).append(container);
    }

    _createQuestionContainer() {
        let container = document.createElement("div");
        container.setAttribute("class", "container");
        return container;
    }

    _createHeaderSection(data, id) {
        let header = document.createElement("div");

        if (data == undefined) {
            let label = document.createElement("LABEL");
            label.setAttribute("for", "question");
            label.appendChild(document.createTextNode("Question Text *"));

            let input = document.createElement("input");
            input.setAttribute("type", "text");
            input.setAttribute("class", "form-control");
            input.setAttribute("required", "true");
            input.setAttribute("placeholder", "enter here");

            header.appendChild(label);
            header.appendChild(input);
        } else {
            let label = document.createElement("LABEL");
            label.innerHTML = "Q." + id + ": " + data.question;
            header.appendChild(label);
        }
        return header;
    }

    _createRadioButtonField(id, data) {
        let fieldSet = document.createElement("fieldset");
        fieldSet.setAttribute("class", "form-group");

        if (data == undefined) {

            let label = document.createElement("label");
            label.appendChild(document.createTextNode("Answers *"));

            fieldSet.appendChild(label);

            for (let i = 0; i < this._MAX_CHOICE; i++) {
                let choiceDiv = document.createElement("div");
                choiceDiv.setAttribute("class", "form-check");

                let choiceLabel = document.createElement("LABEL");
                choiceLabel.setAttribute("class", "form-check-label");

                let radio = document.createElement("input");
                radio.setAttribute("type", "radio");
                radio.setAttribute("required", "true");
                radio.setAttribute("class", "form-check-input");
                radio.setAttribute("name", id);
                radio.setAttribute("value", i);
                radio.setAttribute("id", id + ".c" + (i + 1));

                let choice = document.createElement("input");
                choice.setAttribute("type", "text");
                choice.setAttribute("required", "true");
                choice.setAttribute("class", "form-control")
                choice.setAttribute("id", id + ".c" + (i + 1) + ".text");
                choice.setAttribute("placeholder", "choice " +
                    String.fromCharCode(i + this._ASCII_A).toUpperCase());

                choiceLabel.appendChild(radio);
                choiceLabel.appendChild(choice);
                choiceDiv.appendChild(choiceLabel);
                fieldSet.appendChild(choiceDiv);
            }
        } else {
            let label = document.createElement("label");
            let choice_keys = ['a', 'b', 'c', 'd'];

            label.appendChild(document.createTextNode("Choose one that apply"));

            fieldSet.appendChild(label);

            for (let i = 0; i < this._MAX_CHOICE; i++) {
                let choiceDiv = document.createElement("div");
                choiceDiv.setAttribute("class", "form-check");

                let radio = document.createElement("input");
                radio.setAttribute("type", "radio");
                radio.setAttribute("required", "true");
                radio.setAttribute("class", "form-check-input");
                radio.setAttribute("name", id);
                radio.setAttribute("value", i);
                radio.setAttribute("id", id + ".c" + (i + 1));

                let choiceLabel = document.createElement("LABEL");
                choiceLabel.setAttribute("class", "form-check-label");
                choiceLabel.appendChild(radio);
                choiceLabel.innerHTML += data[choice_keys[i]];

                choiceDiv.appendChild(choiceLabel);
                fieldSet.appendChild(choiceDiv);
            }

        }

        return fieldSet;
    }

    _createRemoveButton(blockId) {
        let remove = document.createElement('input');
        remove.setAttribute("type", "button");
        remove.setAttribute("class", "btn btn-danger remove");
        remove.setAttribute("value", "X");
        remove.onclick = () => {
            $("#" + blockId).remove();
        }
        return remove;
    }

    _createDifficultyTag(difficulty) {
        let tag = document.createElement('div');
        if (difficulty == "Easy") {
            tag.setAttribute('class', 'difficulty-tag-easy');
        } else {
            tag.setAttribute('class', 'difficulty-tag-hard');
        }
        tag.innerHTML = difficulty;
        return tag;
    }

    _createLevelCheckBox(id) {
        let btn_div = document.createElement('div');
        btn_div.setAttribute('class', 'onoffswitch');

        let checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');
        checkbox.setAttribute('name', 'onoffswitch_' + id);
        checkbox.setAttribute('class', 'onoffswitch-checkbox');
        checkbox.setAttribute('id', 'onoffswitch_' + id);
        checkbox.setAttribute('value', "Easy");
        checkbox.setAttribute('checked', 'checked');

        let label = document.createElement('label');
        label.setAttribute('class', 'onoffswitch-label');
        label.setAttribute('for', 'onoffswitch_' + id);
        label.innerHTML = '<span class="onoffswitch-inner"></span>' +
            '<span class="onoffswitch-switch"></span>';

        btn_div.appendChild(checkbox);
        btn_div.appendChild(label);

        return btn_div;
    }
}