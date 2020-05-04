//Controller class
class Controller {
    constructor(root_view) {
        this._view = new View(root_view);
        this._model = new Model();
    }
    dispatch(action, args) {
        this._actions[action](this, args);
    }
}

Controller.prototype._actions = {
    //Game control
    START: function (instance, args) {
        instance.dispatch("FETCH_NEW_WORD");
        instance.dispatch("INIT_GUI");
    },
    RESTART: function (instance, args) {
        let view = instance._view;
        let model = instance._model;
        model.resetData();
        model.generateNewWord((length, hint) => {
            view.updateWordPlaceHolder(length);
            view.updateHintTextView(hint);
        });
        view.enableAllAlphButton();
        instance.dispatch("UPDATE_LIFE");
    },
    CONTINUE: function (instance, args) {
        let view = instance._view;
        let model = instance._model;
        model.generateNewWord((length, hint) => {
            view.updateWordPlaceHolder(length);
            view.updateHintTextView(hint);
        });
        model.resetHit();
        view.enableAllAlphButton();
    },

    //View related
    INIT_GUI: function (instance, args) {
        let view = instance._view;
        let model = instance._model;
        view.createLifeTextView();
        view.createScoreTextView();
        view.createAlphabetButton((input) => {
            instance.dispatch("CHECK_INPUT", input);
        });
        view.createRestartButton(() => {
            instance.dispatch("RESTART");
        });
        view.createSnackBar();
    },
    UPDATE_WORD_PLACEHOLDER: function (instance, args) {
        let view = instance._view;
        let char = args.char;
        let hit_indexs = args.index;
        hit_indexs.forEach(index => {
            view.updateWordTextView(char, hit_indexs);
        });
        view.disableButton("btn_" + char);
    },
    UPDATE_SCORE: function (instance, args) {
        let view = instance._view;
        let model = instance._model;
        model.getScore((score) => {
            view.updateScoreTextView(score);
        })
    },
    UPDATE_LIFE: function (instance, args) {
        let view = instance._view;
        let model = instance._model;
        model.getLife((life) => {
            view.updateLifeTextView(life);
        })
    },

    //Model related
    RESET_DATA: function (instance, args) {
        let model = instance._model;
        model.resetData();
    },
    FETCH_NEW_WORD: function (instance, args) {
        let view = instance._view;
        let model = instance._model;
        model.generateNewWord((length, hint) => {
            view.createWordPlaceHolder(length);
            view.createHintTextView(hint);
        });
    },
    CHECK_INPUT: function (instance, args) {
        let model = instance._model;
        let view = instance._view;
        model.checkInput(args, (found, hit_indexs, alive, finish) => {
            if (found) {
                instance.dispatch("UPDATE_WORD_PLACEHOLDER",
                    { char: args, index: hit_indexs });
            } else {
                instance.dispatch("UPDATE_LIFE");
            }
            instance.dispatch("UPDATE_SCORE");
            if (finish) {
                view.showSnackBar("Finished, Next Challenge");
                instance.dispatch("CONTINUE");
            } else {
                if (!alive) {
                    view.showSnackBar("Lost");
                }
            }
        });
    }
};
