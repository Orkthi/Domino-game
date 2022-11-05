////////////////////////////////////////
// classes:
////////////////////////////////////////

// classe das peças
class piece{
    constructor(value_left, value_right){        
        this.value_left = value_left;
        this.value_right = value_right;
    }
    string(){
        return "["+this.value_left+"|"+this.value_right+"]";
    }
    rotate(){
        let temp = this.value_left;
        this.value_left = this.value_right;
        this.value_right = temp;
    }
}

class player{
    constructor(){
        this.hand = [];

    }
    
}

////////////////////////////////////////
// functions:
////////////////////////////////////////

function generate_pile(pile){ // (QUEBRADA! precisa refazer)
    let k = 0
    for(let i = 0; i <= 6; i++){
        for(let j = 0; j <= 6; j++){
            pile[k] = new piece(i,j)
            k++
        }
    }
}

function print_pile(pile){ // imprime no console as peças de grupo de peças
    let last = (pile.length - 1)

    for(let i = 0; i <= last; i++){
        console.log("Piece " + (i+1) + ":" + pile[i].string())
    }
}

function shuffle_pile(pile){

    let last = (pile.length - 1)
    
    for(let i = last; i > 0; i--){
        
        let j = Math.floor(Math.random() * (i + 1)); // numero aleatorio
        
        let temp = pile[i];
        pile[i] = pile[j];
        pile[j] = temp;
    }
}

function draw_piece(pile, player, quantity = 1){ // passa uma peça da pilha de compra para o jogador (ou BOT)
    
    for(let i = quantity; i > 0; i--){
        let tmp = pile.pop()
        player.push(tmp)
    }
    
}

function remove_piece(pile, position){ // remove uma peça de um grupo de peças (contagem começa do 1, não do 0)
    console.log("[removing piece "+position+"]")
    return pile.splice((position-1), 1)[0]
}

function rotate_piece(piece){

    let tmp = piece.value_left 
    piece.value_left = piece.value_right
    piece.value_right = tmp   
}

function test_pile_empty(pile){ // verifica se tem peças na mesa
    
    return Boolean(!(pile.length))
}

/* need to do:

play_piece_left(table, piece)
play_piece_right(table, piece)

value_tail_left(table, player, position)
value_tail_right(table)



*/


function value_tail_right(table){ // retorna o numero na ponta direita da sequencia de peças da mesa

    // essa função só funciona se o array não está vazio

    if(test_pile_empty == true){ // detecção de erro
        console.log("[array vazio]")
        return -1
    } else {
        let last = (table.length) - 1
        let piece = table[last]   
        let value = piece.value_right

        return value
    }
}


function set_tail_right(table,player,hand_position){ // coloca uma peça na ponta direita da sequencia da mesa

    let position = (hand_position)-1
    let piece = player[position]

    if(test_pile_empty(table) == true){
    
        remove_piece(player,position)
        table.push(piece)
    
    } else if (value_tail_right(table) == piece.value_left) {
        
        remove_piece(player,position)
        table.push(piece)

    } else if (value_tail_right(table) == piece.value_right) {
        
        rotate_piece(piece)
        remove_piece(player,position)
        table.push(piece)
        
    } else {
        console.log("error")
    }
}

/* function check_value_right(table){ // retorna o valor da ponta direita da de peças na mesa

    if(table.length <= 0){
    
        return
    
    } else {
    
        let last = ((table.length)-1)
        return table[last].value_right
    
    }
}

function compatibility_test_right(piece, tail){
    
    if(tail.value_right == piece.value_left){
    
        return 1 // peça encaixa
    
    } else if(tail.value_right == piece.value_right) {
        
        return 2 // peça precisa de rotação

    } else {

        return 0 // peça não encaixa
    
    }
}

function set_tail_right(table, player, position){ // colocar peça a direita das peças da mesa
    
    let piece = player[position-1]

    if(test_pile_empty(table)){
    
        remove_piece(player, position)
        table.push(piece)
        
    } else if(compatibility_test_right(piece, ) == 1) {
        
        remove_piece(player, position)
        table.push(piece)
        
    } else if(compatibility_test_right(piece) == 2) {

        rotate_piece(piece)

        remove_piece(player, position)
        table.push(piece)
    
    } else {

        console.log("[Incompatible]")
    
    }
} */

////////////////////////////////////////
// Main:
////////////////////////////////////////

let player_hand_size = 7 // quantidade inicial de peças

let draw_pile = [] // objeto que representa a pilha de compra
let player1 = [] // objeto que representa o jogador
let table = [] // objeto que representa o grupo de peças na mesa

console.log("[generate pile]")
generate_pile(draw_pile) 

console.log("[shuffle pile]")
shuffle_pile(draw_pile)

console.log("[draw pieces]")
draw_piece(draw_pile, player1, player_hand_size)

console.log("[print player hand]")
print_pile(player1)

// (...)    
