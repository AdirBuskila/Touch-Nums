gNums = createNums(16)
gLength = gNums.length
gCurrNum = 1
gClasses = ['pentagon', 'hexagon', 'heptagon', 'octagon', 'nonagon', 'decagon', 'circle', 'ellipse', 'triangle', 'rhombus', 'trapezoid', 'parallelogram', 'bevel', 'rabbet', 'sign-left', 'sign-right', 'chevron-left', 'chevron-right']
var currTime = 0
var mil = 0.1
var gGameInterval
var gameSound = new Audio("sound/GameTheme.mp3");
var gBestTime = Infinity

function init() {
    createBoard()
}

function createNums(length) {
    var nums = []
    for (var i = 1; i < length + 1; i++) {
        nums.push(i)
    }
    nums = shuffle(nums)
    return nums
}

function playGame() {
    gGameInterval = setInterval(startTimer, 100);
    gameSound.play()
    showImg()
}

function createBoard() {
    //make a copy of curr gNums so pop() wont change it
    var gNumsData = gNums.slice()
    var length = Math.sqrt(gLength)
    var str = ''
    for (var i = 0; i < length; i++) {
        str += '<tr>'
        for (var j = 0; j < length; j++) {
            var randIdx = getRandomIntInclusive(0, gClasses.length - 1)
            str += `<td style="background-color:${getRandomColor()}" class="shape-outer ${gClasses[randIdx]}" onclick="cellClicked(this,${gNumsData.pop()})">${gNums.pop()}</td>`
        }
        str += '</tr>'
    }
    var elBoard = document.querySelector('.board')
    elBoard.innerHTML = str
}

function cellClicked(elCell, value) {
    //check if cell clicked is current num
    if (value === gCurrNum) {
        // check if its the first one
        if (value === 1) {
            playGame()
                //check if its the last one
        } else if (value === gLength) {
            win()

        }
        elCell.classList.add('pressed')
        gCurrNum++
        // if not current num, reset
    } else {
        restGame()

    }
}

function restGame() {
    var elMsg = document.querySelector('.msg')
    var time = document.querySelector('.time')
    var cells = document.querySelectorAll('table .pressed')
        //reset classes
    for (var i = 0; i < cells.length; i++) {
        var currCell = cells[i]
        currCell.classList.remove('pressed')
    }
    //reset board
    gCurrNum = 1
    gNums = createNums(gLength)
    createBoard()
        //reset timer
    currTime = 0
    time.innerText = ''
    clearInterval(gGameInterval)
        // reset sound
    gameSound.pause()
    gameSound = new Audio("sound/GameTheme.mp3");
    //hide patrick
    hideImg()
        // clear text
    elMsg.innerText = ''

}

function win() {
    //stop time
    clearInterval(gGameInterval)
    var elRoot = document.querySelector('.root')
    var elTime = document.querySelector('.time')
    var elMsg = document.querySelector('.msg')
    var elMsg1 = document.querySelector('.msg1')
        //add gif
    var str = '<img class="img1" src="img/you-did-it.gif"><img src="img/you-did-it.gif">'
        //check if the time is less
    if (gBestTime > currTime) {
        gBestTime = currTime
    }
    elRoot.innerHTML = str
        //show current time
    elMsg.innerText = `Wow!, You did In: ${elTime.innerText}`
        //show best time
    elMsg1.innerText = `Best Time:${gBestTime}`
}

function startTimer() {
    var time = document.querySelector('.time')
    currTime = currTime + mil
        //making the time into a string
    var strTime = currTime.toString();
    //slicing it to the wanted length and changing it back to a number
    currTime = Number(strTime.slice(0, 5));
    time.innerText = ('Time:' + currTime);
}

function showImg() {
    var elRoot = document.querySelector('.root')
    var str = '<img class="img1" src="img/root.gif"><img src="img/root.gif">'
    elRoot.innerHTML = str
}

function hideImg() {
    var elRoot = document.querySelector('.root')
    var str = ''
    elRoot.innerHTML = str
}

function easy() {
    gNums = createNums(16)
    gLength = gNums.length
    restGame()
}

function medium() {
    gNums = createNums(25)
    gLength = gNums.length
    restGame()
}

function hard() {
    gNums = createNums(36)
    gLength = gNums.length
    restGame()
}

function shuffle(items) {
    var randIdx, keep;
    for (var i = items.length - 1; i > 0; i--) {
        randIdx = getRandomInt(0, items.length);
        randIdx = getRandomInt(0, i + 1);

        keep = items[i];
        items[i] = items[randIdx];
        items[randIdx] = keep;
    }
    return items;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}