const MaxPieces = 4;

let piecesPlaced = 0;


// =============== //
// Peça Horizontal //
// =============== //

(function criaHorizontal(){

    let l1 = document.querySelector('#createHDiv');

    // ============ //
    // Rodar função //
    // ============ //

    l1.addEventListener('click', function criaHorizontal(){
    
        // ============= //
        // Criando a div //
        // ============= //

        let cHDiv = document.createElement('div');

        // ========= //
        // Atributos //
        // ========= //

        cHDiv.classList.add('horizontalPiece');
        // cDiv.id.add('piece01')

        // ========== //
        // Posicionar //
        // ========== //

        let containerEl = document.querySelector('#table');
        containerEl.appendChild (cHDiv);

        piecesPlaced++;
        console.log(piecesPlaced);

    })
}()) 
    
// ============= //
// Peça Vertical //
// ============= //

(function criaVertical(){

    let l2 = document.querySelector('#createVDiv');

    // ============ //
    // Rodar função //
    // ============ //

    l2.addEventListener('click', function criaVertical(){

        // ============= //
        // Criando a div //
        // ============= //

        let cVDiv = document.createElement('div');

        // ========= //
        // Atributos //
        // ========= //

        cVDiv.classList.add('verticalPiece');
        // cDiv.id.add('piece01')

        // ========== //
        // Posicionar //
        // ========== //

        let containerEl = document.querySelector('#table');
        containerEl.appendChild (cVDiv);

        piecesPlaced++;
        console.log(piecesPlaced);
    })
}())

