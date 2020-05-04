class Model {
    constructor() {
        this._count = 0;
        this._data = [];
        this._db = firebase.database().ref("Quiz/");
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
                let level =
                    $(elements[i]).find("input[type='checkbox']:checked").val() == undefined ? "Hard" : "Easy"
                let block = {
                    question: inputList[0].value,
                    a: inputList[2].value,
                    b: inputList[4].value,
                    c: inputList[6].value,
                    d: inputList[8].value,
                    answer: $(elements[i]).find("input[type='radio']:checked").val(),
                    difficulty: level
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
    saveToDB(data) {
        // localStorage.setItem("quizData", JSON.stringify(data));
        this._db.set(data);
    }

    // Load data from local storage
    loadFromDB(callback) {
        if (callback != undefined) {
            this._db.on('value', (snapshot) => {
                var blocks = [];
                snapshot.forEach(function (childSnapshot) {
                    let data = childSnapshot.val();
                    data.answer = parseInt(data.answer);
                    blocks.push(data);
                });
                this._data = blocks;
                callback(blocks);
            });
        }
    }
}