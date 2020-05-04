class Controller {
    constructor(root_view) {
        this._view = new View(root_view);
        this._model = new Model();
    }
    dispatch(action, args) {
        return this._actions[action](this, args);
    }
}

Controller.prototype._actions = {
    // General Control 
    INIT_GUI: function (instance, args) {
        let view = instance._view;
        let data = instance.dispatch("QUERY_DATA");

        view.createQuizForm(() => {
            instance.dispatch("MARK_ANSWER");
        });
        instance.dispatch("DATA_TO_BLOCK", data);
        view.createSubmitButton();
    },

    // View related
    DATA_TO_BLOCK: function (instance, args) {
        if (args != null) {
            for (let i = 0; i < args.length; i++) {
                instance.dispatch("ADD_BLOCK", args[i]);
            }
        } else {
            view.showSnackBar("Sorry, no quiz data found");
        }
    },

    ADD_BLOCK: function (instance, args) {
        let model = instance._model;
        let view = instance._view;
        model.incrementCount();
        view.createQuizBlock(model.getCount(), args);
    },

    HIGHLIGHT_RESULTS: function (instance, args) {
        let view = instance._view;
        return view.highLight(args);
    },

    // Model related
    QUERY_DATA: function (instance, args) {
        let model = instance._model;
        let data = model.loadFromLocalStorage();
        return data;
    },

    MARK_ANSWER: function (instance, args) {
        let model = instance._model;
        let view = instance._view;
        let marking_flag = 1;
        view.getQuizBlocks((elements) => {
            model.extractData(elements, (client_answers) => {
                model.compareToAnswerKey(client_answers, (result) => {
                    let mark = instance.dispatch("HIGHLIGHT_RESULTS", result);
                    view.removeSubmitButton();
                    view.showSnackBar("You got " + Math.trunc(mark.correct / mark.total * 100) + "%", 1);
                });
            }, marking_flag);
        });
    }
}


