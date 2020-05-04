class Model {
    constructor() {
        this._count = 0;
        this._data = [];
    }

    // Get id by current count
    getCount() {
        return this._count;
    }

    // Increment count
    incrementCount() {
        this._count++;
    }

    // Extract data from DOM input elements
    extractData(elements, callback, marking_flag) {
        let data = [];
        if (marking_flag == undefined) {
            for (let i = 0; i < elements.length; i++) {
                let inputList = $(elements[i]).find("input");
                let block = {
                    question: inputList[0].value,
                    a: inputList[2].value,
                    b: inputList[4].value,
                    c: inputList[6].value,
                    d: inputList[8].value,
                    answer: $(elements[i]).find("input[type='radio']:checked").val()
                }
                data.push(block);
            }
        } else {
            for (let i = 0; i < elements.length; i++) {
                let block = {
                    answer: $(elements[i]).find("input[type='radio']:checked").val()
                }
                data.push(block);
            }
        }
        callback(data);
    }

    // Compare client answer to key
    compareToAnswerKey(client_answers, callback) {
        let result = [];
        let data = this._data;
        for (let i = 0; i < client_answers.length; i++) {
            let block = {
                selected: client_answers[i].answer,
                key: data[i].answer
            }
            result.push(block);
        }
        callback(result);
    }

    // Save data to local storage
    saveToLocalStorage(data) {
        localStorage.setItem("quizData", JSON.stringify(data));
    }

    // Load data from local storage
    loadFromLocalStorage() {
        this._data = JSON.parse(localStorage.getItem("quizData"));
        return this._data;
    }
}