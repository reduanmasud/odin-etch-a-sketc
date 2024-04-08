const BOARD_WRAPPER = document.querySelector("#board");

const CONTROLS = {
    color: () => document.querySelector("#cell_color").value ?? "#000000",
    clickToDraw: () => document.querySelector("#click_to_draw").checked, 
}

let board = createBoard({
    row: 16,
    column: 16,
    cellHeight: "50px",
    cellWidth: "50px",
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
            cell.style.height = cellHeight || "50px";
            cell.style.width = cellWidth || "50px";
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
