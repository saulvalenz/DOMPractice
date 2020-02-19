//1. obtener los elementos y guardarlos en variables
var containerCell=document.getElementById("container-cell");
var containerPiece=document.getElementById("container-piece");
var selectedPiece=null;
createBoard();
createPieces();

//2. crear las celdas donde ira la pieza de lado izquierdo.
function createCell(width, height, position){
	var cellElement=document.createElement("div"); 
	cellElement.style.width=width;
	cellElement.style.height=height;
	cellElement.style.border="1px solid black";
	cellElement.style.backgroundColor= "#891252";
	cellElement.onclick=clickCell;
	cellElement.dataset.position=position;
	cellElement.dataset.fill=false;
	return cellElement;
}

//3. crear las celdas donde estaran contenidas de lado derecho.
function createBoard(){
	var width=containerCell.offsetWidth;//toma el ancho de los componentes, sin su margen
	var height=containerCell.offsetHeight;
	width /= 4;
	height /= 4;
	for(var i=0; i<16; i++){
		let cellElement=createCell(width, height, i);
		addCell(cellElement);
	}
}

//4. crear el contorno en cuadrito de lado derecho. 
function createPiece(width, height, piece){
	var cellElement=document.createElement("div");//se crea un div para despues meter algo en ese div en el html
	var pieceElement=document.createElement("img");
	//configurando la celda para la pieza detro del contenedor de piezas(lado derecho).
	cellElement.style.width=width;
	cellElement.style.height=height;
	//configurando la pieza dentro del contenedor de piezas(lado derecho).
	pieceElement.width=width;
	pieceElement.height=height;
	pieceElement.border="1px solid black";
	pieceElement.src=piece.image;
	pieceElement.dataset.position=piece.position;
	pieceElement.dataset.moved=false;
	pieceElement.onclick=clickPiece;
	//para mandar la pieza a la celda - agregar elementos al documento.
	cellElement.appendChild(pieceElement);//esta linea logra que funcione esta madre.
	return cellElement;
}

//5. cargar la imagen en un cuadrito
function createPieces(){
	var width=containerPiece.offsetWidth;
	var height=containerPiece.offsetHeight;
	width /= 4;
	height /= 4;
	var pieces = generatePieceData();
	for(let i=0; i<16; i++){
		let pieceElement = createPiece(width, height, pieces[i]);
		addPiece(pieceElement);
	}
}

//6. 

// agregar celda/contorno.
function addCell(element){
	containerCell.appendChild(element);
}

//agregar una pieza/ llena o con imagen.
function addPiece(element){
	containerPiece.appendChild(element);
}

function addPieceByPosition(element){
	var position=element.dataset.position;
	containerPiece.children[position].appendChild(element);
}

//cargas la imagen
function generatePieceData(){
	//generamos un alista de piezas
	var pieces=[];
	for(let i=0; i<16; i++){
		let piece={image:"img/"+(i+1)+".jpg", position:i};
		pieces.push(piece);
	}
	return pieces;
}

function clickPiece(e){
	var piece=e.target;//accedo al elemento al hacer clic.
	if (piece.dataset.moved=="true"){
		verifyCell(piece.parentElement);
	}
	//piece.dataset.moved=true;
	selectedPiece=piece;//asignar la variable a una que usaremos.
}

function clickCell(e){
	if(e.target.parentElement.dataset.fill=="true"){
		if(selectedPiece){
			let cell=e.target.parentElement;
			verifyCell(cell);
			selectedPiece=null;
		}else{
			console.log("Selecciona una pieza");
		}
	}else{
		e.target.dataset.fill=true;
		e.target.appendChild(selectedPiece);
		selectedPiece=null;
	}
}

function verifyCell(element){
	var fill=element.dataset.fill=="true";//crear una variable para que jale el fill que esta en el metodo de createCell.
	if(fill){
		let piece = element.children[0];
		element.appendChild(selectedPiece);
		addPieceByPosition(piece);
	}else{
		element.dataset.fill=true;
		selectedPiece.dataset.moved=true;
		element.appendChild(selectedPiece);
	}
}