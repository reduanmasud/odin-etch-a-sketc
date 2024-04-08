const BOARD_WRAPPER = document.querySelector("#board");

const CONTROLS = {
    color: () => {
        
        if(CONTROLS.multiColorEnabled())
        {
            const backgroundColors = [
                "#FF5733", // Orange
                "#C70039", // Red
                "#900C3F", // Dark Red
                "#FFC300", // Yellow
                "#FF5733", // Orange
                "#FFC300", // Yellow
                "#DAF7A6", // Light Green
                "#4CAF50", // Green
                "#2196F3", // Blue
                "#9B59B6", // Purple
                "#F39C12", // Orange
                "#8E44AD", // Purple
                "#E74C3C", // Red
                "#2C3E50", // Dark Blue
                "#16A085", // Teal
                "#F1C40F", // Bright Yellow
            ];
            
            
            const randomColor = backgroundColors[Math.floor(Math.random() * backgroundColors.length)];
            return randomColor;
            
        }
        else
        {
           return document.querySelector("#cell_color").value ?? "#000000"
        }
    
    
    },
    clickToDraw: () => document.querySelector("#click_to_draw").checked,
    multiColorEnabled: () => document.querySelector("#multi_color").checked,

}

let board = createBoard({
    row: 16,
    column: 16,
    cellHeight: 600,
    cellWidth: 600,
});

displayBoard({
    selector: "#board",
    board: board,
})





/**
 * Creates a board composed of cells with customizable properties.
 * @param {Object} options - The options object containing board and cell properties.
 * @param {number} options.row - The number of rows in the board.
 * @param {number} options.column - The number of columns in the board.
 * @param {number} options.cellHeight - The height of each cell in pixels.
 * @param {number} options.cellWidth - The width of each cell in pixels.
 * @param {string} options.cellBackground - The background color of each cell.
 * @param {string} options.cellClass - the class of each cell.
 * @param {Object} options.cellProperties - the cellProperties contains all the properties of a cell
 */
function createBoard({row, column, cellHeight, cellWidth, cellBackground, cellClass, cellProperties = {}}) {
    let board = [];

    for(let i = 0; i < row; i++)
    {
        let rowArray = [];

        for(let j = 0; j < column; j++)
        {
            let cell = document.createElement("div");
            cell.style.height = `${cellHeight / column - 1}px` || "50px";
            cell.style.width = `${cellWidth / row -1}px` || "50px";
            if(cellClass) cell.setAttribute("class", cellClass);

            Object.assign(cell.dataset, {row: i, collumn: j}, cellProperties);

            rowArray.push(cell);
        }

        board.push(rowArray);

    }

    return board;

}

/**
 * 
 * @param {Object} options - The option object contains the necessery arguments to display a board
 * @param {string} selectior - The selector string where the board will append
 * @param {Array} board - the pointer | board array
 * @param {string} rowClass - the class of each row
 */
function displayBoard({selector, board = [], rowClass})
{
    let root = document.querySelector(selector);
    let drag = false;
    board.forEach( ( row ) => {
        
        let rowWrapper = document.createElement("div", { className : rowClass } );

        row.forEach( (cell) => {
            rowWrapper.appendChild(cell);
            
                window.onmousedown = (e) => {
                    drag = true;

                }
                cell.onmouseover = (e)=>{
                    
                    if(CONTROLS.clickToDraw())
                    {
                        if(drag) e.target.style.backgroundColor = CONTROLS.color();
                    } else {
                        e.target.style.backgroundColor = CONTROLS.color();
                    }
                        
                    
                }
                window.onmouseup = (e) => {
                    drag = false;
                    console.log("MOUSEUP")
                }
            
            
        })

        root.appendChild(rowWrapper);

    })   


}
