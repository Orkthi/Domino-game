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
const empty = 0; 

////////////////////////////////////////



////////////////////////////////////////
// classes:
////////////////////////////////////////

// classe das peças
class Piece {
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
    check_can_play_left(){ // verifica se pode jogar na ponta esquerda da mesa.
        if(!table.length){
            return 1; // pode jogar, mesa vazia.
        } else if(table[0] == this.value[right]) {
            return 2; // pode jogar, valor compativel.
        } else if(table[0] == this.value[left]) {
            return 3; // pode jogar, valor compativel, mas tem que girar.
        }
    }
    check_can_play_right(){ // verifica se pode jogar na ponta direita da mesa.
        let last = ((table.length)-1);

        if(!table.length){
            return 1; // pode jogar, mesa vazia
        } else if(table[last] == this.value[left]) {
            return 2; // pode jogar, valor compativel
        } else if(table[last] == this.value[right]) {
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
        console.log(">>>> [Printing Hand] <<<<");
        for(var i = 0; i < this.hand.length; i++){
            console.log("Piece "+i+": "+this.hand[i].string());
        }
    }
    print_playables() {

        console.log(">>>> [Printing Playables] <<<<");
        
        let piece;

        for(var i = 0; i < this.hand.length; i++){
            
            piece = this.hand[i];

            if(piece.playable[left] || piece.playable[right]) {
            
                console.log("Piece "+i+": "+piece.string()+" {Playable}.");
                
                if(piece.playable[left]) {
                    console.log("left: yes.");
                } else {
                    console.log("left: no.");
                }
                if(piece.playable[right]) {
                    console.log("right: yes.");
                } else {
                    console.log("right: no.");
                }
            }
        }
    }
    draw_piece(quantity = 1) { // compra uma peça da pilha inicial
        
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
    check_empty() {
        if(this.hand.length == 0){
            return true;
        } else {
            return false;
        }
    }
    set_right(hand_position) { // joga uma peça escolhida da mão do jogador na ponta direita da sequencia da mesa

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
    set_left(hand_position) { // joga uma peça escolhida da mão do jogador na ponta esquerda da sequencia da mesa se possivel (é escolhida pela numeração mostrada no method print_hand())

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
    check_can_play() { // retorna quantas peças que estão na mão do jogador que ele pode jogar na hora

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
    reset_score() {
        this.score = 0;
    }
}

////////////////////////////////////////



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
    console.log("[removing piece "+(position)+"]");
    return pile.splice((position), 1)[0];
}

function test_empty(pile){ // verifica se tem peças na mesa

    return Boolean(!(pile.length));
}

function going_first(){

    // (temp) precisa retornar objeto do jogador vencedor
    let winner_position = (-1);
    let mirrored = new Array(2);
    let highest_value = new Array(2);
    let highest_position = new Array(2);

    // inicializando as variaveis
    
    mirrored[human] = false;
    mirrored[bot] = false;
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

    
    if((mirrored[human] === true) && (mirrored[bot] === true)) { // se ambos tiverem peça espelhada, quem tiver a de maior valor, ganha.
        if(highest_value[human] > highest_value[bot]){
            winner = player_list[human];
            winner_position = highest_position[human];
            console.log("first: human");
            
        } else if(highest_value[bot] > highest_value[human]) {
            winner = player_list[bot];
            winner_position = highest_position[bot];
            console.log("first: bot");
        } else { // error testing 1.
            console.log("ERROR:1");
        }
    } else if((mirrored[human] === true) && (mirrored[bot] === false)) { // se somente o human tiver a espelhada, o human ganha.
        winner = player_list[human];
        winner_position = highest_position[human];
        console.log("first: human");
    } else if((mirrored[bot] === true) && (mirrored[human] === false)){ // se somente o bot tiver a espelhada, o bot ganha.
        winner = player_list[bot];
        winner_position = highest_position[bot];
        console.log("first: bot");
    } else if((mirrored[human] === false) && (mirrored[bot] === false)){ // se nenhum que tiver peça espelhada, vão ser comparadas as não-espelhadas
        
        // reiniciando array que guarda maiores valores.
        highest_value[human] = (-1);
        highest_value[bot] = (-1);

        for(let i = 0; i < player_list.length; i++){ // itera por cada jogador
            for(let j = 0; j < player_list[i].hand.length; j++){ // itera por cada peça na mão do jogador
                if(((player_list[i].hand[j].sum()) > (highest_value[i]))){  // compara com o ultimo valor.
                    highest_position[i] = j;
                    highest_value[i] = player_list[i].hand[j].sum();
                }
            }
        }

        
        if(highest_value[human] > highest_value[bot]){ // se o human tiver a peça não-espelhada de maior soma de valores, então human ganha.
            winner = player_list[human];
            winner_position = highest_position[human];
            console.log("first: human");
        } else if(highest_value[bot] > highest_value[human]){ // se o bot tiver a peça não-espelhada de maior soma de valores, então bot ganha.
            winner = player_list[bot];
            winner_position = highest_position[bot];
            console.log("first: bot");
        } else { // error testing 2.
            console.log("ERROR:2"); 
        }
    } else { // (Somente para debugging)
        console.log("fatal-error!!!");
        console.log(mirrored[human]);
        console.log(mirrored[bot]);
        console.log(highest_value[human]);
        console.log(highest_value[bot]);
        console.log(highest_position[human]);
        console.log(highest_position[bot]);
        console.log(winner_position);
    }
    
    

    // o jogador que ganhar só poderá jogar a peça ganhadora no primeiro turno do jogo.
    for(let i = 0; i < winner.hand.length; i++){ // itera por todas as peças na mão do jogador.
        for(let j = 0; j < winner.hand[i].playable.length; j++){ 
            winner.hand[i].playable[j] = no; // marca como não jogavel em ambos os lados da mesa.
        }
    }

    for(let i = 0; i < winner.hand[winner_position].playable.length; i++){ // marca somente a peça ganhadora como jogavel.
        winner.hand[winner_position].playable[i] = yes;
    }
    


    return winner;
}

function change_player() {
    if(current_player === player_list[human]){
        console.log("changing to: bot");
        return player_list[bot];
    } else {
        console.log("changing to: human");
        return player_list[human];
    }
}

function ask_play() {
    
}

////////////////////////////////////////



////////////////////////////////////////
// Main:
////////////////////////////////////////


    let hand_size = 7; // quantidade inicial de peças    
    let table = []; // objeto que representa o grupo de peças na mesa
    let shop = []; // objeto que representa a pilha de compra
    let player_list = new Array(2);
    let current_player;

    // criando players
    player_list[human] = new Player(); // objeto que representa o jogador
    player_list[bot] = new Player(); // objeto que representa o BOT

    generate_pile(shop);
    shuffle_pile(shop);

    //comprando peças    
    player_list[human].draw_piece(hand_size); 
    player_list[bot].draw_piece(hand_size);

    // mostrando peças na mão
    for(let all of player_list){
        console.log(">>>> [Printing Hand] <<<<");
        all.print_hand();
    }

    // decidindo qual jogador joga primeiro.
    current_player = going_first();

    // (...)

    // mudando de jogador.
    current_player = change_player();

    // breakpoint!

    // (to-do) criar Função para mudar o turno de jogadores. change_player()                            {Pronto!}
    // (to-do) Metodo na Classe Player para verificar se o jogador está com a mão vazia. check_empty()  {Pronto!}
    // (to-do) Metodo na Classe Player para mostrar peças jogaveis.  Player.print_playables()           {Proximo}
    // (to-do) criar Função para perguntar qual peça jogar. ask_play()
    // (to-do) Função para verificar se os jogadores estão com as mãos vazias.
    // (to-do) criar mecanica para verificar se ambos os jogadores ainda podem podem jogar.
    // (to-do) calcular quantidade de pontos para o que ganha. score_calculation()
    
////////////////////////////////////////