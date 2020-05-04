//Model class
class Model {
    constructor() {
        this._dictonary = [
            { word: "apple", hint: "fruit, red" },
            { word: "pineApple", hint: "fruit, sour and sweet, yellow inside" },
            { word: "concentrate", hint: "concentrate" },
            { word: "electricity", hint: "is the set of physical phenomena associated with the presence and motion of electric charge." },
            { word: "punch", hint: "punch" },
            { word: "zippy", hint: "zippy" },
            { word: "friend", hint: "friend" },
            { word: "shade", hint: "shade" },
            { word: "disastrous", hint: "disastrous" },
            { word: "tattoo", hint: "a form of body modification where a design is made by inserting ink" }
        ]
        this._hit = 0;
        this._answer = null;
        this._life = 7;
        this._score = 0;
        this._penalty = -1;
        this._award = 1;
    }

    //Generate new word
    generateNewWord(callback) {
        let index = Math.floor(Math.random() * this._dictonary.length);
        this._answer = this._dictonary[index];
        callback(this._answer.word.length, this._answer.hint);
    }

    //Chekc input from alphabet button
    checkInput(args, callback) {
        let hit_indexs = [];
        let found;
        let alive;
        let finish;
        [...this._answer.word].forEach((c, index) => {
            if (c == args) {
                hit_indexs.push(index)
                this._hit++;
            }
        });
        found = (hit_indexs.length == 0 ? false : true);
        this._score += (found ? this._award * hit_indexs.length : this._penalty);
        this._life += (found ? 0 : this._penalty);
        alive = (this._life == 0 ? false : true);
        finish = (this._hit == this._answer.word.length ? true : false);
        callback(found, hit_indexs, alive, finish);
    }

    //score getter
    getScore(callback) {
        callback(this._score);
    }

    //life getter
    getLife(callback) {
        callback(this._life);
    }

    //reset number of char hit
    resetHit(){
        this._hit = 0;
    }

    //reset existing data
    resetData() {
        this._hit = 0;
        this._life = 0;
        this._penalty = -1;
        this._award = 1;
        console.log(
            this._answer.word + " " +
            this._answer.hint + " " +
            this._life + " " +
            this._score)
    }
}

