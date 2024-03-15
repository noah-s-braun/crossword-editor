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
let typingDirection = 'horizontal';
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
        if(this.content == 'filled') { $(`#${this.id}`).addClass('filled') }
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
                const box = new Box(i, j, this.DataArray[i][j]);
                array.push(box);
            }
            this.BoxesArray.push(array);
        }
    }

    render() {
        this.canvas.css('grid-template-columns', `repeat(${this.width}, 1fr)`);
        this.populate(this.data);
        for(let i = 0; i < this.width; i++) {
            const Strip = $('<div>');
            for(let j = 0; j < this.width; j++) {
                const strip = $(`<div id="${i}-${j}" class="box"></div>`);
                Strip.append(strip);
            }
            this.canvas.append(Strip);
        }
    }

}

const CrosswordData = [  
    ["a", "b", "c", "d", "e"],
    ["f", "g", "h", "i", "j"],
    ["k", "l", "m", "n", "o"],
    ["p", "q", "r", "s", "t"],
    ["u", "v", "w", "x", "y"]
];
const CrosswordWidth = 5;
crossword = new Crossword('crossword-canvas', CrosswordWidth, CrosswordData);
crossword.render();
crossword.initialize();

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
        $('.focus').text(thisLetter);
        changeFocus(typingDirection);
    } else {
        changeFocus(typingDirection, -1);
        $('.focus').text('');
    }
})
//add change direction functionality
$('.box').on('dblclick', function() {
    typingDirection = 'vertical';
    console.log('changed');
})

function changeFocus(method = 'click', direction = 1) {
    $('.focus').removeClass('focus');
    if(method == 'horizontal') {
        focus.column+=direction;
    }
    if(method == 'vertical') {
        focus.row+=direction;
    }
    $(`#${focus.column}-${focus.row}`).addClass('focus');
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