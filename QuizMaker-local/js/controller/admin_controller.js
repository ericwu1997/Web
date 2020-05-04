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
    // General Control 
    INIT_GUI: function (instance, args) {
        let view = instance._view;

        view.createQuizForm(() => {
            instance.dispatch("SAVE_DATA");
        });
        instance.dispatch("ADD_BLOCK");
        view.createSaveButton();
        view.createAddButton(() => {
            instance.dispatch("ADD_BLOCK");
        });
    },

    // View related
    ADD_BLOCK: function (instance, args) {
        let model = instance._model;
        let view = instance._view;
        model.incrementCount();
        view.createQuizBlock("block" + model.getCount(), args);
    },

    // Model related
    SAVE_DATA: function (instance, args) {
        let model = instance._model;
        let view = instance._view;
        view.getQuizBlocks((elements) => {
            model.extractData(elements, (data) => {
                model.saveToLocalStorage(data);
                view.showSnackBar("Data Saved");
            });
        });
    }
}


