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

        this.value = new Array();
        this.value[left] = value_left;
        this.value[right] = value_right;
        
        this.playable = new Array();
        this.playable[left] = no;
        this.playable[right] = no;

    }
    string(){ // (W.I.P)
        return "["+this.value[left]+"|"+this.value[right]+"]";
    }
    rotate(){
        let temp = this.value[left];
        this.value[left] = this.value[right];
        this.value[right] = temp;    

        this.update_playable();
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
    /*check_can_play_left(){ // (obsoleta) verifica se pode jogar na ponta esquerda da mesa.
        let first = 0;

        if((table[first] === this.value[right]) || (!table.length)) {
            return yes; // pode jogar, valor compativel.
        } else if(table[first] === this.value[left]) {
            return yes_rotate; // pode jogar, valor compativel, mas tem que girar.
        } else {
            return no;
        }
    }*/
    /*check_can_play_right(){ // (obsoleta) verifica se pode jogar na ponta direita da mesa.
        let last = ((table.length)-1);

        if((table[last] === this.value[right]) || (!table.length)) {
            return yes; // pode jogar, valor compativel.
        } else if(table[last] === this.value[left]) {
            return yes_rotate; // pode jogar, valor compativel, mas tem que girar.
        } else {
            return no;
        }
    }*/
    /*check_playable(side){ // (obsoleta)
        
        if(hand_is_empty(table)){
            return yes;
        }
        
        if(side === left){
            
            const first = 0;

            if((table[first].value[left] === this.value[right])) {
                return yes; // pode jogar, valor compativel.
            } else if(table[first] === this.value[left]) {
                return yes_rotate; // pode jogar, valor compativel, mas tem que girar.
            } else {
                return no;
            }

        } else if(side === right) {

            const last = ((table.length)-1);

            if(table.length === empty){
                return yes;
            }
            if((table[last] === this.value[left])) {
                return yes; // pode jogar, valor compativel.
            } else if(table[last] === this.value[right]) {
                return yes_rotate; // pode jogar, valor compativel, mas tem que girar.
            } else {
                return no; // valores incompativeis em ambos os lados.
            }

        }
    }*/
    check_playable(side) { // verifica se a peça é jogavel
        
        let piece = this;

        if(side === left) {
            const first = 0;

            if((table[first].value[left]) === (piece.value[right])) {
                return yes;
            } else if ((table[first].value[left]) === (piece.value[left])) {
                return yes_rotate;
            } else {
                return no;
            }

        } else if(side === right) {
            const last = ((table.length)-1);

            if((table[last].value[right]) === (piece.value[left])) {
                return yes;
            } else if((table[last].value[right]) === (piece.value[right])) {
                return yes_rotate;
            } else {
                return no;
            }
        }
    }
    update_playable() { // atualiza o status se peça é jogavel
        this.playable[left] = this.check_playable(left);
        this.playable[right] = this.check_playable(right);
    }
}

class Player {
    constructor(name = "generic"){
        this.name = name;
        this.hand = [];
        this.score = 0;
        this.can_play;
    }
    draw_piece(quantity = 1) { // compra uma peça da pilha inicial
        
        if(quantity <= shop.length){
            for(var i = 0; i < quantity; i++){
                var piece = shop.pop();                
                this.hand.push(piece);
            }
            return piece.string();
        } else {
            console.log("error: not enough pieces!");
            return false;
        }
    }
    print_hand() { // imprime cada peça da mão do jogador no terminal, e a posição em que ela está
        console.log("------------------------------");
        console.log(">>>> [Printing Hand"+this.name+"] <<<<");
        for(var i = 0; i < this.hand.length; i++){
            console.log("Piece "+i+": "+this.hand[i].string());
        }
        console.log("------------------------------");
    }
    print_playables() { // imprime cada peça da mão do jogador que podem ser jogadas na hora
        console.log("------------------------------");
        console.log(">>>> [Printing-Playables: "+this.name+"] <<<<");
        
        let piece;

        for(var i = 0; i < this.hand.length; i++){
            
            piece = this.hand[i];

            if(piece.playable[left] === yes || piece.playable[right] === yes) {
            
                console.log("Piece "+i+": "+piece.string()+" {Playable}.");
                
                if(piece.playable[left] === yes) {
                    console.log("left: yes.");
                } else if(piece.playable[left] === yes_rotate) {
                    console.log("left: yes_rotate.");
                } else {
                    console.log("left: no.");
                }
                if(piece.playable[right] === yes) {
                    console.log("right: yes.");
                } else if(piece.playable[right] === yes_rotate) {
                    console.log("right: yes_rotate.");
                } else {
                    console.log("right: no.");
                }
            }
        }
        // console.log("------------------------------");
    }
    print_hand_playables() { // imprime cada peça da mão do jogador que podem ser jogadas na hora
        console.log("------------------------------");
        console.log(">>>> [Printing-Playables: "+this.name+"] <<<<");
        
        let piece;

        for(var i = 0; i < this.hand.length; i++){
            
            piece = this.hand[i];
            
            if(piece.playable[left] >= yes || piece.playable[right] >= yes){
                console.log(">> Piece "+i+": "+piece.string()+" {Playable}");

                switch (piece.playable[left]) {
                    case yes:
                        console.log("left: yes.");    
                        break;
                    case yes_rotate:
                        console.log("left: yes_rotate.");
                        break;
                    case no:
                        console.log("left: no.");
                        break;
                    default:
                        console.log("left: Error.");
                        break;
                } switch (piece.playable[right]) {
                    case yes:
                        console.log("right: yes.");    
                        break;
                    case yes_rotate:
                        console.log("right: yes_rotate.");
                        break;
                    case no:
                        console.log("right: no.");
                        break;
                    default:
                        console.log("right: Error.");
                        break;
                }
            } else {
                console.log("> Piece "+i+": "+piece.string());
                console.log("left: no.");
                console.log("right: no.");
            }
        } 
        console.log("------------------------------");
    }
    update_playables() { // 
        // console.log("------------------------------");
        console.log(">>>> [Updating-Playables: "+this.name+"] <<<<");
        for(let i = 0; i < this.hand.length; i++) {
            this.hand[i].update_playable();
        }
        // console.log("------------------------------");
        this.update_can_play();
    }
    update_can_play() { //
        
        let player = this;

        // iterar por todas as peças.
        for(let i = 0; i < player.hand.length; i++){
            for(let j = 0; j < player.hand[i].playable.length; j++){
                if((player.hand[i].playable[j] === yes) || (player.hand[i].playable[j] === yes_rotate)) { // se uma achada como jogavel, retornar true.
                    player.can_play = true;
                    return true;
                }
            }
        }

        // caso não retornar falso.
        player.can_play = false;
        return false;
    }
    
    hand_is_empty() {
        if(this.hand.length == 0){
            return true;
        } else {
            return false;
        }
    }
    play_piece(position, side = right) {
        if(this.hand[position].playable[side] === yes_rotate) {
            this.hand[position].rotate();
        }

        if(this.hand[position].playable[side] === yes) {
            if(side == left) { // jogar na ponta esquerda da mesa
                // this.set_left(position);
                var piece = remove_piece(this.hand, position);
                table.unshift(piece);
                return true;
            } else if(side == right) { // jogar na ponta direita da mesa
                // this.set_right(position);
                var piece = remove_piece(this.hand, position);
                console.log("[Playing Piece "+position+"]");
                table.push(piece);
                return true;
            } else {
                console.log("error: invalid play!");
                return false;
            }
        }
        else{
            console.log("unexpected error: Player.play_piece()");
            return false;
        }
    }
    hand_sum() {
        let player = this;
        let total = 0;

        for(let i = 0; i < player.hand.length; i++){
            total += player.hand[i].sum();
        }

        return total;
    }
    /* set_left(hand_position) { // (obsoleta) joga uma peça escolhida da mão do jogador na ponta esquerda da sequencia da mesa se possivel (é escolhida pela numeração mostrada no method print_hand())

        if(hand_is_empty(table)){
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
    } */
    /* set_right(hand_position) { //(obsoleta)joga uma peça escolhida da mão do jogador na ponta direita da sequencia da mesa

        if(hand_is_empty(table)){
            var piece = remove_piece(this.hand, hand_position);
            console.log("[Playing Piece "+hand_position+"]");
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
    } */
    /* check_can_play() { // (obsoleta) retorna quantas peças que estão na mão do jogador que ele pode jogar na hora

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
        
    } */
    reset_score() {
        this.score = 0;
    }
    reset_hand() {
        let player = this;
        player.hand = new Array();
        return true;
    }
    add_score(points) {
        this.score += points;
    }
    
}

////////////////////////////////////////

////////////////////////////////////////
// functions:
////////////////////////////////////////

function generate_pile(pile) { // gera a pilha inicial de peças.
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
function print_pile(pile) { // imprime no console as peças de grupo de peças
    
    let last = ((pile.length)-1)

    for(let i = 0; i <= last; i++){
        console.log("Piece "+i+":"+pile[i].string())
    }

}
function print_shop() {
    console.log("--------------------------");
    console.log(">>>> [Printing-Shop] <<<<");
    print_pile(shop);
    console.log("--------------------------");
}
function print_table() {
    console.log("--------------------------");
    console.log(">>>> [Printing-Table] <<<<");
    print_pile(table);

    let first = 0;
    let last = table.length-1;
    let tail = [table[first].value[left], table[last].value[right]];
    console.log("Left: "+tail[left]+" Right: "+tail[right]);

    console.log("--------------------------");
}
function shuffle_pile(pile) {

    let last = (pile.length - 1)
    
    for(let i = last; i > 0; i--){
        
        let j = Math.floor(Math.random() * (i + 1)); // numero aleatorio
        
        let temp = pile[i];
        pile[i] = pile[j];
        pile[j] = temp;
    }
}
function draw_piece(pile, player, quantity = 1) { // passa uma peça da pilha de compra para o jogador (ou BOT)
    
    for(let i = quantity; i > 0; i--){
        let tmp = pile.pop()
        player.hand.push(tmp)
    }
    
}
function remove_piece(pile, position) { // remove uma peça de um grupo de peças (contagem começa do 1, não do 0)
    // console.log("[removing piece "+(position)+"]");
    return pile.splice((position), 1)[0];
}
function check_empty(pile) { // verifica se tem peças na mesa

    return Boolean(!(pile.length));
}
function going_first() {

    // (temp) precisa retornar objeto do jogador vencedor
    let winner_position = (-1);
    let mirrored = new Array();
    let highest_value = new Array();
    let highest_position = new Array();

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
            
        } else if(highest_value[bot] > highest_value[human]) {
            winner = player_list[bot];
            winner_position = highest_position[bot];
        } else { // error testing 1.
            console.log("ERROR:1");
        }
    } else if((mirrored[human] === true) && (mirrored[bot] === false)) { // se somente o human tiver a espelhada, o human ganha.
        winner = player_list[human];
        winner_position = highest_position[human];
    } else if((mirrored[bot] === true) && (mirrored[human] === false)){ // se somente o bot tiver a espelhada, o bot ganha.
        winner = player_list[bot];
        winner_position = highest_position[bot];
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
        } else if(highest_value[bot] > highest_value[human]){ // se o bot tiver a peça não-espelhada de maior soma de valores, então bot ganha.
            winner = player_list[bot];
            winner_position = highest_position[bot];
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
    
    console.log("First: "+winner.name);

    return winner;
}
/* function change_player() {
    if(current_player === player_list[human]){
        console.log("--------------------------");
        console.log("[changing to: "+player_list[bot].name+"]");
        console.log("--------------------------");
        current_player = player_list[bot];
        console.log("--------------------------");
    } else {
        console.log("--------------------------");
        console.log("changing to: "+player_list[human].name);
        current_player = player_list[human];
        console.log("--------------------------");
    }
    current_player.update_playables();
    current_player.update_can_play();
} */
function change_player() {
    
    let next;
    
    if(current_player === player_list[human]){
        next = player_list[bot];
    } else {
        next = player_list[human];
    }

    // console.log("--------------------------");
    console.log("changing to: "+next.name+"");
    current_player = next;
    // console.log("--------------------------");

    current_player.update_playables();
}
function ask_play(position, side) {
    console.log("Chosen: "+position+" Side: "+ side);
    current_player.play_piece(position, side); 
    current_player.update_playables();
    return true;
}
function ask_play_prompt() {
    
    let position;
    let side = right;
    
    position = prompt("which piece: ");

    if(table.length) {
        side = prompt("which side:\n0: Left\n1: Right");
    }
    
    ask_play(position, side);
    
    return true;
}
function bot_play(){
    
    for(let position = 0; (position < player_list[bot].hand.length); position++){
        for(let side = 0; (side < player_list[bot].hand[position].playable.length); side++){
            if(player_list[bot].hand[position].playable[side]){
                ask_play(position, side);
                return true;
            }
        }
    }

}
function check_shop_empty() {
    if(shop.length === empty){
        return true;
    } else {
        return false;
    }
}
function match_over() {
    
    let over = false;

    if(player_list[human].hand_is_empty()) {
        var winner = player_list[human];
        var loser = player_list[bot];
        over = true;
        console.log("hand-empty: "+winner.name);
    } else if(player_list[bot].hand_is_empty()) {
        var winner = player_list[bot];
        var loser = player_list[human];
        over = true;
        console.log("hand-empty: "+winner.name);

    } else if((player_list[human].can_play === false) && (player_list[bot].can_play === false)) {
        // test who wins...
        if((player_list[human].hand.length) < (player_list[bot].hand.length)) {
            // human win.
            var winner = player_list[human];
            var loser = player_list[bot];
            over = true;
        } else if((player_list[bot].hand.length) < (player_list[human].hand.length)) {
            // bot win.
            var winner = player_list[bot];
            var loser = player_list[human];
            over = true;
        } else {
            // console.log("bodge 1: match_over()  (FUCK!!!)"); // quantidade de peças iguais
            
            if((player_list[human].hand_sum()) < (player_list[bot].hand_sum())) {
                var winner = player_list[human];
                var loser = player_list[bot];
                over = true;
            } else if ((player_list[bot].hand_sum()) < (player_list[human].hand_sum())) {
                var winner = player_list[bot];
                var loser = player_list[human];
                over = true;
            } else {
                console.log("IMPOSSIBLE!!!");
            }
        }
    } else {
        console.log(">>> Next-Turn <<<");
    }

    if(over) {
        let points = loser.hand_sum();
        winner.add_score(points);
        console.log("=========================================");
        console.log(">>>> Match-Winner: ["+winner.name+"] <<<<");
        console.log("added points: "+points);
        console.log("=========================================");
        return true;
    } else {
        return false;
    } 
}
function game_over(){
    for(let player of player_list){
        if(player.score >= 100){
            console.log(">>> Winner: "+player.name+" <<<");
            return true;
        } else {
            console.log(">>> Next-Game <<<");
            return false;
        }
    }          
}

function restart(){

    let answer;
    do {
        answer = prompt("Play againg?\n1: yes\n0: no");
    }while(answer < 0 || answer > 1);

    return answer;
    
}

////////////////////////////////////////

////////////////////////////////////////
// Main:
////////////////////////////////////////

    // declaração

    let hand_size; // quantidade inicial de peças
    let player_name;
    let player_list;
    let table; // objeto que representa o grupo de peças na mesa
    let shop; // objeto que representa a pilha de compra
    let current_player;

    hand_size = 7; // quantidade inicial de peças
    player_name = "GB";
    
    // criando players.
    player_list = new Array();
    player_list[human] = new Player(player_name); // objeto que representa o jogador
    player_list[bot] = new Player("bot"); // objeto que representa o BOT

    do {
        do {
            
            for(let player of player_list){
                player.reset_score();
                player.reset_hand();
                player.can_play = false;
            }

            table = new Array();
            shop = new Array();

            // gerando as peças do shop.
            generate_pile(shop);
            shuffle_pile(shop);
    
            //comprando peças.
            player_list[human].draw_piece(hand_size); 
            player_list[bot].draw_piece(hand_size);
    
            // decidindo qual jogador joga primeiro.
            current_player = going_first();
            
            // começando a primeira jogada.
            // mostra quais peças podem ser jogadas atualmente.
            current_player.print_hand_playables();
            
            // pergunta qual peça o jogador quer jogar.
            switch(current_player) {
                case player_list[human]:
                    ask_play_prompt();
                    break;
                case player_list[bot]:
                    bot_play();
                    break;
            }
            
            // mostrar a mesa com a peça jogada.
            print_table();
    
    
            do { // gameplay loop da partida.
    
                // mudar de jogador (automaticamente atualiza as peças que podem ser jogadas para o jogador seguinte).
                change_player();
        
                // se não tive peças jogaveis & o shop não estiver vazio, comprar peça.
                while(current_player.can_play === false) {
                    if(check_shop_empty() === false) { // verifica se ainda tem peças para comprar
                        
                        let drawn = current_player.draw_piece(1); // compra peça
                        console.log("Can't Play | piece-drawn: "+drawn);
                        current_player.update_playables();
                    } else { 
                        // console.log("------------------------------");
                        console.log("[shop-empty, draw]");
                        // console.log("------------------------------");
                        break; // sai do loop se não houverem mais peças para compras
                    }
                }
        
                if(current_player.can_play) {
                    print_table();
                    // mostra quais peças podem ser jogadas.
                    current_player.print_hand_playables();
                    // pergunta qual peça o jogador quer jogar.
                    
                    switch(current_player) {
                        case player_list[human]:
                            ask_play_prompt();
                            break;
                        case player_list[bot]:
                            bot_play();
                            break;
                    }
                    
                    // ask_play_prompt(); // (...) (switch-case)   
                    // mostrar a mesa com a peça jogada.
                    print_table();
                }
        
            } while(match_over() === false);
        }while(game_over() === false);
    }while(restart());

    console.log("[Game-Over]");

    // (to-do) criar Função para mudar o turno de jogadores. change_player()                                    {Pronto!}
    // (to-do) Metodo na Classe Player para mostrar peças jogaveis.  Player.print_playables()                   {Pronto!}
    // (to-do) criar Função para perguntar qual peça jogar. ask_play()                                          {Pronto!}
    // (to-do) Metodo na Classe Player para verificar se o jogador está com a mão vazia. Player.check_empty()   {Pronto!}
    // (to-do) criar Função "check_shop_empty()".                                                               {Pronto!}
    // (to-do) criar mecanica para verificar se ambos os jogadores ainda podem podem jogar. 
    // (to-do) calcular quantidade de pontos para o que ganha. score_calculation()
    
////////////////////////////////////////