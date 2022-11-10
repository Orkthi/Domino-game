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
    constructor(pile, table){    
        this.hand = [];
        this.pile = pile;
        this.table = table;
        this.score = 0;
    }
    print_hand(){ // imprime cada peça da mão do jogador no terminal, e a posição em que ela está

        for(var i = 0; i < this.hand.length; i++){
            console.log("Piece "+i+": "+this.hand[i].string());
        }
        
    }
    draw_piece(quantity = 1){ // compra uma peça da pilha inicial
        for(var i = 0; i < quantity; i++){
            this.hand.push(this.pile.pop())
        }
    }
    check_empty(){
        if(this.hand.length == 0){
            return true;
        } else {
            return false;
        }
    }
    set_right(hand_position){ // joga uma peça escolhida da mão do jogador na ponta direita da sequencia da mesa

        if(test_empty(this.table)){
            var piece = remove_piece(this.hand, hand_position);
            this.table.push(piece);
            return 1;
        } else if((this.table[this.table.length-1].value_right) == (this.hand[hand_position].value_left)) {
            var piece = remove_piece(this.hand, hand_position)
            this.table.push(piece);
            return 1;
        } else if((this.table[this.table.length-1].value_right) == (this.hand[hand_position].value_right)) {
            var piece = remove_piece(this.hand, hand_position)
            piece.rotate();
            this.table.push(piece);
            return 1;
        } else {
            console.log('not empty or incompatible');
            return 0;
        }
    }
    set_left(hand_position){ // joga uma peça escolhida da mão do jogador na ponta esquerda da sequencia da mesa se possivel (é escolhida pela numeração mostrada no method print_hand())

        if(test_empty(this.table)){
            var piece = remove_piece(this.hand, hand_position);
            this.table.unshift(piece);
            return 1;
        } else if((this.table[0].value_left) == (this.hand[hand_position].value_right)) {
            var piece = remove_piece(this.hand, hand_position);
            this.table.unshift(piece);
            return 1;
        } else if((this.table[0].value_left) == (this.hand[hand_position].value_left)) {
            var piece = remove_piece(this.hand, hand_position);
            piece.rotate();
            this.table.unshift(piece);
            return 1;
        } else {
            console.log('not empty or incompatible');
            return 0;
        }
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
    
    let last = ((pile.length)-1)

    for(let i = 0; i <= last; i++){
        console.log("Piece "+i+":"+pile[i].string())
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
        player.hand.push(tmp)
    }
    
}

function remove_piece(pile, position){ // remove uma peça de um grupo de peças (contagem começa do 1, não do 0)
    console.log("[removing piece "+(position)+"]")
    return pile.splice((position), 1)[0]
}

function test_empty(pile){ // verifica se tem peças na mesa
    
    return Boolean(!(pile.length))
}

function game_match(){ // controla a partida... (W.I.P)
    
}

////////////////////////////////////////
// Main:
////////////////////////////////////////

let player_hand_size = 7 // quantidade inicial de peças

let pile = [] // objeto que representa a pilha de compra
let table = [] // objeto que representa o grupo de peças na mesa

let player1 = new player(pile, table) // objeto que representa o jogador
let player2 = new player(pile, table) // objeto que representa o BOT

table.value_tail_right = function(){

}

console.log("[generate pile]")
generate_pile(pile) 

console.log("[shuffle pile]")
shuffle_pile(pile)

console.log("[draw pieces]")
player1.draw_piece(player_hand_size)
// draw_piece(pile, player1, player_hand_size)

// console.log("[print player hand]");
player1.print_hand();



