//Obteniendo elementos de HTML.
var cellContainer = document.getElementById("container-cell");
var pieceContainer = document.getElementById("container-piece");
var dialogElement=document.getElementById("dialog");
var selectedPiece = null;
document.onkeypress=keyPress;

createBoard();
createPieces();

//Creating cells
function createBoard() {
    var width = cellContainer.offsetWidth;
    var height = cellContainer.offsetHeight;

    //dividir grid en 4 x 4
    width = width / 4;
    height = height / 4;

    for(var i = 0;i < 16;i++) {
        let cellElement = createCell(width, height, i);
        addCell(cellElement);
    }
}

function createCell(width, height, position) {
    cellElement = document.createElement("div");
    cellElement.style.width = width;
    cellElement.style.height = height;
    cellElement.style.border = "1px solid black";
    cellElement.style.backgroungColor = "yellow";
    cellElement.onclick = clickCell;
    cellElement.dataset.position=position;

    return cellElement;
}

function addCell(element) {
    cellContainer.appendChild(element);
}

//Creating pieces
function createPieces(){
    var width = pieceContainer.offsetWidth;
    var height = pieceContainer.offsetHeight;
    width /= 4;
    height /= 4;
    var pieces = generatePieceData();

    for(let i = 0;i < 16; i++){
            let pieceElement = createPiece(width, height, pieces[i]);  
            addPiece(pieceElement);
    }

}

function generatePieceData() {
    //Generamos una lista de piezas con su path y posición.
    var pieces = [];

    for (let i = 0; i <16; i++){
            let piece = {
                image: "img/"+(i+1)+".jpg",
                position: [i]
            };
            pieces.push(piece);
        }
        return pieces;
    }
    
function createPiece(width, height, piece) {

    var cellElement = document.createElement("div");
    var pieceElement = document.createElement("img");
    //Configutando la celda para la pieza
    cellElement.style.width = width;
    cellElement.style.height = height;


    //Configurando la pieza dentro del contenedor peizas
    pieceElement.width = width;
    pieceElement.height = height;
    pieceElement.style.border = "1px solid black";
    pieceElement.src = piece.image;
    pieceElement.onclick = clickPiece;
    pieceElement.dataset.position=piece.position;
    //Mandar la pieza dentro de la celda
    cellElement.appendChild(pieceElement);

    //Retornando el cellElement
    return cellElement;
}

function addPiece(element) {
    pieceContainer.appendChild(element);
}


//Pieces event
function clickPiece(e) {
    var piece = e.target;
    selectedPiece = piece;
}   

//Cell event
function clickCell(e) {
    if(selectedPiece) {
        let cell = e.target;
        cell.appendChild(selectedPiece);
    }else {
        console.log("Seleccione una pieza.");
    }
}

function keyPress(ke){
    console.log("pulsaste e");
    if(ke.keyCode==101 || ke.keyCode == 69){
        let result=evaluateBoard();
        showDialog(result);
    }
}

function evaluateBoard(){
    var cells=cellContainer.children;
    for(cell of cells){
        let piece = cell.children[0];
        if(piece.dataset.position != cell.dataset.position){
            return false;
        }
    }
    return true;
}

function showDialog(result){
    var imgElement=dialogElement.children[0];
    var textContent=dialogElement.children[1];
    if(result){
        //imgElement.src="img/imagenganastes.jpg";
        textContent.innerText="Ganastes";
    }else{
        //img.src="img/imagenperdistes.jpg";
        textContent.innerText="Perdistes";
    }
    //dialogElement.classList.add("dialog-show");
    dialogElement.style.display="block";
    returnPieces();
}

function returnPieces(){
    let cells = cellContainer.children;
    let cellPieces= pieceContainer.children;
    for(cell of cells){
        let position=cell.dataset.position;
        let piece=cell.children[0];
        cellPieces[position].appendChild(piece);
    }
}