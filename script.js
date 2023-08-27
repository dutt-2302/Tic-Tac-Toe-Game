const gameContainer = document.getElementById("game-container");
const reset = document.getElementById("reset");

var flag = true;
var hash = {};
var allFilled = 0;

gameContainer.addEventListener("click", (e) => {
    console.log(typeof (e.target.dataset.index))

    const [row, col] = e.target.dataset.index.split("-").map((val) => { return parseInt(val) });
    console.log(row, col)

    if (!hash[e.target.dataset.index]) {
        if (flag) {
            hash[e.target.dataset.index] = "X";
            e.target.classList.add("cell-X");
        }
        else {
            hash[e.target.dataset.index] = "O";
            e.target.classList.add("cell-O");
        }

        flag = !flag;
        allFilled++;

        let res = checkWin();

        if (allFilled === 9 || res.includes("Win")) {
            document.getElementById('win').innerText = res;
            gameContainer.style.pointerEvents = "none";
        }
    }
})

reset.addEventListener("click", (e) => {
    const cells = document.querySelectorAll(".cell");

    cells.forEach((cell) => {
        if (cell.classList.contains("cell-O")) {
            cell.classList.remove("cell-O");
        }
        else {
            cell.classList.remove("cell-X");
        }

    })

    allFilled = 0;
    flag = true;
    hash = {};
    document.getElementById("win").innerText = "";
    gameContainer.style.pointerEvents = "auto";
})

function checkWin() {
    // rows
    for (let i = 0; i < 3; i++) {
        let set = new Set();
        let player = "";
        for (let j = 0; j < 3; j++) {
            let key = `${i}-${j}`;
            set.add(hash[key]);
            player = hash[key]
        }

        if (set.size === 1 && player) {
            return `Player ${player} Win Game`;
        }
    }

    // columns
    for (let j = 0; j < 3; j++) {
        let set = new Set();
        let player = "";
        for (let i = 0; i < 3; i++) {
            let key = `${i}-${j}`;
            set.add(hash[key]);
            player = hash[key];
        }

        if (set.size === 1 && player) {
            return `Player ${player} Win Game`;
        }
    }

    // diagonal
    let i = 0, j = 0;
    let set = new Set();
    let player = "";

    while (i < 3 && j < 3) {
        let key = `${i}-${j}`;
        set.add(hash[key]);
        player = hash[key];
        i++; j++;
    }
    if (set.size === 1 && player) {
        return `Player ${player} Win Game`;
    }

    //anti-diagonal
    i = 0, j = 2;
    set.clear();
    player = "";

    while (i < 3 && j >= 0) {
        let key = `${i}-${j}`;
        set.add(hash[key]);
        player = hash[key];
        i++; j--;
    }
    if (set.size === 1 && player) {
        return `Player ${player} Win Game`;
    }

    return "Game Draw";
}