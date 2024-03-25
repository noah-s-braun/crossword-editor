/* Places I store the BOXES
1. As <div>'s in the DOM with id of 'column-row'
2. As box class instances in crossword.BoxesArray, 
accessed through crossword.BoxesArray[column][row]
*/

let focus = {
    row: 0,
    column: 0
};
let key = 'A';
let typeDirection = 'horizontal';
//Box class
class Box {
    
    constructor(row, column, content) {
        this.row = row;
        this.column = column;
        this.content = content;
        this.id = `${row}-${column}`;
        this.box = $(`#${this.id}`);
    }
    
    render() {
        let html = $(`<div id="${this.id}" class="box"></div>`);
        return html
    }
    
    update() {
        if(this.content == '') { $(`#${this.id}`).addClass('filled') }
    }
    
}

class Crossword {

    constructor(canvasId, width, data = '') {
        this.canvas = $(`#${canvasId}`);
        this.width = width;
        this.data = data;
        this.DataArray = [];
        this.BoxesArray = [];
    }

    populate(data) {
        if(data == '') return;
        for(let i = 0; i < this.width; i++) {
            const array = [];
            for(let j = 0; j < this.width; j++) {
                array.push(data[i][j]);
            }
            this.DataArray.push(array);
        }
    }

    initialize() {
        for(let i = 0; i < this.width; i++) {
            const array = [];
            for(let j = 0; j < this.width; j++) {
                const box = new Box(i, j, this.data[i][j]);
                array.push(box);
            }
            this.BoxesArray.push(array);
        }
    }

    render(letters = false) {
        this.canvas.css('grid-template-columns', `repeat(${this.width}, 1fr)`);
        // this.populate(this.data);
        for(let i = 0; i < this.width; i++) {
            const newColumn = $('<div>');
            for(let j = 0; j < this.width; j++) {
                let filled = '';
                let content = this.data[j][i];
                if(content == '') { filled = 'filled'; }
                if(content != '' && letters == false) { content = ''; }
                const newBox = $(
                    `<div id="${i}-${j}" class="box ${filled}">
                        <span class='hint-number'>1</span>
                        <span class='box-content'>${content}</span>
                    </div>`);
                newColumn.append(newBox);
            }
            this.canvas.append(newColumn);
        }
    }

}

const CrosswordData = [  
    ['J', 'O', 'L', 'T', ''],
    ['A', 'N', 'E', 'W', ''],
    ['Y', 'O', 'G', 'I', 'S'],
    ['', 'F', 'A', 'C', 'E'],
    ['', 'F', 'L', 'E', 'X']
];
const CrosswordKey = [
    {
        word: 'JAY',
        hint: 'Crested woodland bird',
        start: [0, 0],
        direction: 'vertical'
    },
    {
        word: 'ONOFF',
        hint: 'Powering switch',
        start: [0, 1],
        direction: 'vertical'
    },
    {
        word: 'LEGAL',
        hint: 'Judge-y?',
        start: [0, 2],
        direction: 'vertical'
    },
    {
        word: 'TWICE',
        hint: 'How many times someone is allowed to serve as U.S. president',
        start: [0, 3],
        direction: 'vertical'
    },
    {
        word: 'SEX',
        hint: 'What the Victorian euphemisms "amorous congress" and "taking a flyer" meant',
        start: [2, 4],
        direction: 'vertical'
    },
    {
        word: 'JOLT',
        hint: 'Sudden burst of electricity',
        start: [0, 0],
        direction: 'horizontal'
    },
    {
        word: 'ANEW',
        hint: 'All over again',
        start: [1, 0],
        direction: 'horizontal'
    },
    {
        word: 'YOGIS',
        hint: 'Meditation teachers',
        start: [2, 0],
        direction: 'horizontal'
    },
    {
        word: 'FACE',
        hint: 'Part of the body that\'s altered by a Snapchat filter, often',
        start: [3, 1],
        direction: 'horizontal'
    },
    {
        word: 'FLEX',
        hint: 'Show off one\'s muscles',
        start: [4, 1],
        direction: 'horizontal'
    },
];
const crosswordTranslated = [
    [
        {
            content: 'J',
            filled: false,
            number: 1,
            hintHorizontal: 'Sudden burst of electricity',
            hintVertical: 'Crested woodland bird'
        },
        {
            content: 'O',
            filled: false,
            number: 2,
            hintHorizontal: 'Sudden burst of electricity',
            hintVertical: 'Powering switch'
        }, 
        {
            content: 'L',
            filled: false,
            number: 3,
            hintHorizontal: 'Sudden burst of electricity',
            hintVertical: 'Judge-y?'
        }, 
        {
            content: 'T',
            filled: false,
            number: 4,
            hintHorizontal: 'Sudden burst of electricity',
            hintVertical: 'How many times someone is allowed to serve as U.S. president'
        }, 
        {
            content: '',
            filled: true,
            number: '',
            hintHorizontal: '',
            hintVertical: ''
        }, 
    ],
    [
        {
            content: 'A',
            filled: false,
            number: 5,
            hintHorizontal: 'All over again',
            hintVertical: 'Crested woodland bird'
        }, 
        {
            content: 'N',
            filled: false,
            number: '',
            hintHorizontal: 'All over again',
            hintVertical: 'Powering switch'
        }, 
        {
            content: 'E',
            filled: false,
            number: '',
            hintHorizontal: 'All over again',
            hintVertical: 'Judge-y?'
        }, 
        {
            content: 'W',
            filled: false,
            number: '',
            hintHorizontal: 'All over again',
            hintVertical: 'How many times someone is allowed to serve as U.S. president'
        }, 
        {
            content: '',
            filled: true,
            number: '',
            hintHorizontal: '',
            hintVertical: ''
        }, 
    ],
    [

    ],
    [

    ],
    [

    ]
]

//translate crossword key into crossword data
function translateKey(key, crosswordWidth) {
    if(key == '') { return console.log('Error: Please provide crossword key.') }
    const bigArray = [];
    //construct array
    for(let i = 0; i < crosswordWidth; i++) {
        const littleArray = [];
        for(let j = 0; j < crosswordWidth; j++) {
            const boxInfo = {
                content: '',
                filled: false,
                number: '',
                hintHorizontal: '',
                hintVertical: ''
            };
            littleArray.push(boxInfo);
        }
        bigArray.push(littleArray);
    }

    for(let i = 0; i < key.length; i++) {
        const start = key[i].start;
        let currentBox = bigArray[start[0]][start[1]];
        //fill array with letters
        if(key[i].direction == 'horizontal') {
            const letters = key[i].word.split('');
            const hint = key[i].hint;
            for(let j = 0; j < letters.length; j++) {
                // console.log(start);
                currentBox.content = letters[j];
                currentBox.hintHorizontal = hint;
                // console.log(letters[j]);
                currentBox = bigArray[start[0]][start[1] + j + 1];
            }
        }
        //fill array with hint numbers
        console.log(`Operating on box[${start[0]}][${start[1]}]`);
        currentBox = bigArray[start[0]][start[1]];
        if(currentBox.number == '') { currentBox.number = i + 1; }
    }
    console.log(bigArray);
}

translateKey(CrosswordKey, 5);

const CrosswordWidth = 5;
const crossword = new Crossword('crossword-canvas', CrosswordWidth, CrosswordData);
crossword.render(false);
crossword.initialize();
changeFocus();

//Tools
let Tool = 'Type';
function blackoutTool() {
    $('.box').on('mousedown', function() {
        const id = $(this).attr('id');
        const id180 = rotate180(id);
        $(this).toggleClass('filled');
        if(id != id180) { $(`#${id180}`).toggleClass('filled'); }
    })
}

function getColumn(id){
    const nums = id.split('-');
    const column = parseInt(nums[0]);
    return column
}

function getRow(id){
    const nums = id.split('-');
    const row = parseInt(nums[1]);
    return row
}

function typeTool() {
    $('.box').on('click', function() {
        const thisId = $(this).attr('id');
        focus.row = getRow(thisId);
        focus.column = getColumn(thisId);
        changeFocus();
    })
}

//add key typing ONCE
$('.key').on('click', function() {
    thisLetter = $(this).text();
    if(thisLetter != 'Back') {
        $('.focus .box-content').text(thisLetter);
        changeFocus(typeDirection);
    } else {
        changeFocus(typeDirection, -1);
        $('.focus .box-content').text('');
    }
})

//add change direction functionality
$('.box').on('dblclick', function() {
    typeDirection = 'vertical';
    console.log('changed');
})

//change type direction
$('.type-direction').on('click', function() {
    $('.type-direction').removeClass('active');
    $(this).addClass('active');
    typeDirection = $(this).attr('id');
})
function changeTypeDirection(newDirection) {
    typeDirection = newDirection;
    $('.type-direction').removeClass('active');
    $(`#${newDirection}`).addClass('active');
}

//Change focus
function changeFocus(method = 'click', direction = 1) {
    $('.focus').removeClass('focus');
    if(method == 'horizontal') {
        focus.column+=direction;
    }
    if(method == 'vertical') {
        focus.row+=direction;
    }
    //Focus bounding
    if(focus.column == CrosswordWidth) { 
        focus.column = 0; 
        if(focus.row == CrosswordWidth - 1) {
            focus.row = 0;
            changeTypeDirection('vertical');
        } else {
            focus.row++;
        }
    }
    if(focus.row == CrosswordWidth) { 
        focus.row = 0;
        if(focus.column == CrosswordWidth - 1) {
            focus.column = 0;
            changeTypeDirection('horizontal');
        } else {
            focus.column++;
        } 
    }
    if(focus.column == -1) { 
        focus.column = CrosswordWidth - 1; 
        if(focus.row == 0) {
            focus.row = CrosswordWidth - 1;
            changeTypeDirection('vertical');
        } else {
            focus.row--;
        }
    }
    if(focus.row == -1) { 
        focus.row = CrosswordWidth - 1;
        if(focus.column == 0) {
            focus.column = CrosswordWidth - 1;
            changeTypeDirection('horizontal');
        } else {
            focus.column--;
        }
    }


    $(`#${focus.column}-${focus.row}`).addClass('focus');
    if($('.focus').hasClass('filled')) { changeFocus(method, direction); }
}

function changeTool() {
    if (Tool == 'Blackout') {
        $('.box').off();
        blackoutTool();
    }
    if(Tool == 'Type') {
        $('.box').off();
        typeTool();
    }
}
changeTool();


function rotate180(id) {
    const nums = id.split('-');
    let column = parseInt(nums[0]);
    let row = parseInt(nums[1]);
    row = CrosswordWidth - row - 1;
    column = CrosswordWidth - column - 1;
    return `${column}-${row}`
}

//Toolbar
$('.tool').on('click', function() {
    $('.tool').removeClass('active');
    $('.box').removeClass('focus');
    $(this).addClass('active');
    Tool = $(this).text();
    console.log(Tool);
    changeTool();
})

// KEYBOARD

//Key animations
// $('.key').on('mousedown', function() {
//     $(this).addClass('pressing');
// })
// $('.key').on('mouseup', function() {
//     $(this).removeClass('pressing');
// })

//Keyboard functioning
$('.key').on('click', function() {
    thisLetter = $(this).text();
    key = thisLetter;
    console.log(key);
})