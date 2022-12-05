////////////////////////////////////////
// classes:
////////////////////////////////////////

// classe das peças
class Piece{
    constructor(value_left, value_right){

        this.value = new Array(2);
        this.value[left] = value_left;
        this.value[right] = value_right;
        this.playable = new Array(2);
        this.playable[right] = no;
        this.playable[left] = no;

    }
    string(){ // (W.I.P)
        return "["+this.value[left]+"|"+this.value[right]+"]";
    }
    rotate(){
        let temp = this.value[left];
        this.value[left] = this.value[right];
        this.value[right] = temp;    
    }
    is_mirror(){ // (W.I.P)
        if(this.value[left] == this.value[right]){
            return true;
        } else {
            return false;
        }
    }
    sum(){
        return (this.value[left] + this.value[right]);
    }
    check_can_play_left(){ // (W.I.P)
        if(!table.length){
            return 1; // pode jogar, mesa vazia
        } else if(table[0] == this.value[right]) {
            return 2; // pode jogar, valor compativel
        } else if(table[0] == this.value[left]) {
            return 3; // pode jogar, valor compativel, mas tem que girar.
        }
    }
    check_can_play_right(){ // (W.I.P)
        let last = ((table.length)-1);

        if(!table.length){
            return 1; // pode jogar, mesa vazia
        } else if(table[last] == this.value[left]){
            return 2; // pode jogar, valor compativel
        } else if(table[last] == this.value[right]){
            return 3; // pode jogar, valor compativel, mas tem que girar.
        }
    }
    update_can_play(){ // (W.I.P)
        if(this.check_can_play_left){
            this.can_play_left = true;
        } else {
            this.can_play_left = false;
        }

        if(this.check_can_play_right){
            this.can_play_right = true;
        } else {
            this.can_play_right = false;
        }
    }
}

class Player{
    constructor(){
        this.hand = [];
        this.score = 0;
        this.can_play;
    }
    print_hand(){ // imprime cada peça da mão do jogador no terminal, e a posição em que ela está
        for(var i = 0; i < this.hand.length; i++){
            console.log("Piece "+i+": "+this.hand[i].string());
        }
    }
    draw_piece(quantity = 1){ // compra uma peça da pilha inicial
        
        if(quantity <= shop.length){
            for(var i = 0; i < quantity; i++){
                this.hand.push(shop.pop());
            }
            return true;
        } else {
            console.log("error: not enough pieces!");
            return false;
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

        if(test_empty(table)){
            var piece = remove_piece(this.hand, hand_position);
            table.push(piece);
            return 1;
        } else if((table[table.length-1].value_right) == (this.hand[hand_position].value_left)) {
            var piece = remove_piece(this.hand, hand_position)
            table.push(piece);
            return 1;
        } else if((table[table.length-1].value_right) == (this.hand[hand_position].value_right)) {
            var piece = remove_piece(this.hand, hand_position)
            piece.rotate();
            table.push(piece);
            return 1;
        } else {
            console.log('not empty or incompatible');
            return 0;
        }
    }
    set_left(hand_position){ // joga uma peça escolhida da mão do jogador na ponta esquerda da sequencia da mesa se possivel (é escolhida pela numeração mostrada no method print_hand())

        if(test_empty(table)){
            var piece = remove_piece(this.hand, hand_position);
            table.unshift(piece);
            return 1;
        } else if((table[0].value_left) == (this.hand[hand_position].value_right)) {
            var piece = remove_piece(this.hand, hand_position);
            table.unshift(piece);
            return 1;
        } else if((table[0].value_left) == (this.hand[hand_position].value_left)) {
            var piece = remove_piece(this.hand, hand_position);
            piece.rotate();
            table.unshift(piece);
            return 1;
        } else {
            console.log('not empty or incompatible');
            return 0;
        }
    }
    check_can_play(){ // retorna quantas peças que estão na mão do jogador que ele pode jogar na hora

        let how_many = 0;
        
        for(let i = 0; i < this.hand.length; i++){
            if(this.check_fit_left(i)){
                how_many++;
            }
            if(this.check_fit_right(i)){
                how_many++;
            }
        }

        // compra peça se não puder jogar
        // passa o turno se não puder jogar ou comprar

        return how_many;
        
    }
}

////////////////////////////////////////
// functions:
////////////////////////////////////////

function generate_pile(pile){ // gera a pilha inicial de peças.
    for(let i = 0; i <= 6; i++){
        pile.push(new Piece(i,i));
    }
    for(let i = 0; i <= 6; i++){
        for(let j = i; j <= 6; j++){
           
            if(!(i === j)){
                pile.push(new Piece(i,j));
            }
            

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

function going_first(){

    // (temp) precisa retornar objeto do jogador vencedor
    let winner;
    let winner_position;
    let mirrored = new Array(2);
    let highest_value = new Array(2);
    let highest_position = new Array(2);

    // inicializando as variaveis
    highest_value[human] = (-1);
    highest_value[bot] = (-1);


    // testando peças espelhadas
    for(let i = 0; i < player_list.length; i++){ // itera por cada jogador
        for(let j = 0; j < player_list[i].hand.length; j++){ // itera por cada peça na mão do jogador
            if((player_list[i].hand[j].is_mirror()) && ((player_list[i].hand[j].value[left]) > (highest_value[i]))){  // verifica se é espelhado, soma dois valores, compara com o ultimo valor.
                highest_position[i] = j;
                highest_value[i] = player_list[i].hand[j].value[left];
                mirrored[i] = true;
            }
        }
    }
    // se ambos tiverem peça espelhada, quem tiver a de maior valor, ganha.
    if((mirrored[human] === true) && (mirrored[bot] === true)){
        if(highest_value[human] > highest_value[bot]){
            winner = player_list[human];
            winner_position = highest_position[human];
            
        }
        if(highest_value[bot] > highest_value[human]){
            winner = player_list[bot];
            winner_position = highest_position[bot];
        }
    }
    // se somente o human tiver a espelhada, o human ganha.
    if((mirrored[human] === true) && (mirrored[bot] === false)){
        winner = player_list[human];
        winner_position = highest_position[human];
    }
    // se somente o bot tiver a espelhada, o bot ganha.
    if((mirrored[human] === false) && (mirrored[bot] === true)){
        winner = player_list[bot];
        winner_position = highest_position[bot];
    }
    // se nenhum que tiver peça espelhada, vão ser comparadas as não-espelhadas
    if((mirrored[human] === false) && (mirrored[bot] === false)){
        // reiniciando array que guarda maiores valores.
        highest_value[human] = (-1);
        highest_value[bot] = (-1);

        for(let i = 0; i < player_list.length; i++){ // itera por cada jogador
            for(let j = 0; j < player_list[i].hand.length; j++){ // itera por cada peça na mão do jogador
                if(((player_list[i].hand[j].sum()) > (highest_value[i]))){  // compara com o ultimo valor.
                    highest_position[i] = j;
                    highest_value[i] = player_list[i].hand[j].sum();
                    mirrored[i] = true;
                }
            }
        }

        // se o human tiver a peça não-espelhada de maior soma de valores, então human ganha.
        if(highest_value[human] > highest_value[bot]){
            winner = player_list[human];
            winner_position = highest_position[human];
        }
        // se o bot tiver a peça não-espelhada de maior soma de valores, então bot ganha.
        if(highest_value[highest_value[bot] > highest_value[human]]){
            winner = player_list[bot];
            winner_position = highest_position[bot];
        }
    }
    
    // o jogador que ganhar só poderá jogar a peça ganhadora no primeiro turno do jogo.
    
    for(let i = 0; i < winner.hand.length; i++){ // itera por todas as peças na mão do jogador.
        for(let j = 0; j < winner.hand[i].playable.length; j++){ 
            winner.hand[i].playable[j] = no; // marca como não jogavel em ambos os lados da mesa.
        }
    }

    for(let i = 0; i < winner.hand[winner_position].playable.length; i++){
        winner.hand[winner_position].playable[i] = yes;
    }
    


    return winner;
}

////////////////////////////////////////
// Consts:
////////////////////////////////////////

const left = 0;
const right = 1;
const human = 0;
const bot = 1;
const no = 0;
const yes = 1;
const yes_rotate = 2;

////////////////////////////////////////

////////////////////////////////////////
// Main:
////////////////////////////////////////

    let hand_size = 7; // quantidade inicial de peças
    
    let table = []; // objeto que representa o grupo de peças na mesa
    let shop = []; // objeto que representa a pilha de compra
    
    generate_pile(shop);
    shuffle_pile(shop);

    let player_list = new Array(2);
    
    // criando players
    player_list[human] = new Player(); // objeto que representa o jogador
    player_list[bot] = new Player(); // objeto que representa o BOT

    //comprando peças
    
    player_list[human].draw_piece(hand_size); 
    player_list[bot].draw_piece(hand_size);



    
    for(let all of player_list){
        console.log(">>>> [Printing Hand] <<<<");
        all.print_hand();
    }


    
    // decidindo qual jogador joga primeiro.
    let current_player = going_first();


    // breakpoint!

    // (to-do) criar mecanica para perguntar qual peça jogar.
    // (to-do) criar mecanica para o turno de jogadores.
    // (to-do) criar mecanica para verificar se algum jogador está com a mão vazia.
    // (to-do) criar mecanica para verificar se ambos os jogadores ainda podem podem jogar.
    // () calcular quantidade de pontos para o que ganha.   score_calculation()
    

////////////////////////////////////////