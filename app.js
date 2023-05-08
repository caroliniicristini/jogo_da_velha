const stdin = process.openStdin();

let pound = {
    newGame(){
        pound = {
            ...pound,
            turno : 0,
            jogadorAtual : 'X',
            campo : [1, 2, 3, 4, 5, 6, 7, 8, 9],
            jogoFinalizado:  false
        };
    },
    imprimir(){
        console.log(`
        ${pound.campo[6]} | ${pound.campo[7]} | ${pound.campo[8]}
        ----------
        ${pound.campo[3]} | ${pound.campo[4]} | ${pound.campo[5]}
        ----------
        ${pound.campo[0]} | ${pound.campo[1]} | ${pound.campo[2]}
        `);
    },
    trocarJogador(){
        pound.jogadorAtual = pound.jogadorAtual === 'X' ? 'O' : 'X';
    },
    fazerJogada(posicao){
        if(posicao > 0 && posicao < 10 && typeof pound.campo[posicao - 1] === 'number'){
            pound.campo[posicao - 1] = pound.jogadorAtual;
            pound.turno++;
            return true;
        }
        return false;
    },
    comparar: (a,b , c) => pound.campo[a] === pound.campo[b] && pound.campo[a] === pound.campo[c],
    verificarGanhador(){
        return (
            pound.comparar(0, 1, 2) || 
            pound.comparar(3, 4, 5) || 
            pound.comparar(6, 7, 8) ||
            pound.comparar(0, 3, 6) || 
            pound.comparar(1, 4, 7) || 
            pound.comparar(2, 5, 8) ||
            pound.comparar(0, 4, 8) || 
            pound.comparar(2, 4, 6)
        );
    },
    verificarFimdeJogo(){
        const temGanhador = pound.verificarGanhador();
        if(temGanhador){
            console.clear();
            pound.imprimir();
            pound.trocarJogador();
            console.log(`O ganhador é ${pound.jogadorAtual}`);
            return true;
        }else if(pound.turno >= 9){
            console.clear();
            pound.imprimir();
            console.log('Deu velha!');
            return true;
        }
        return false;
    }
};

pound.newGame();
console.clear();
pound.imprimir();
console.log(`Jogador Atual: ${pound.jogadorAtual}`);

stdin.addListener('data', linha => {
    const posicao = parseInt(linha.toString());

    if(pound.jogoFinalizado || !posicao){
        stdin.pause();
    }else{
        if(pound.fazerJogada(posicao)){
            pound.trocarJogador();
        }
        pound.jogoFinalizado = pound.verificarFimdeJogo();

        if(!pound.jogoFinalizado){
            console.clear();
            pound.imprimir();
            console.log(`O jogador atual é ${pound.jogadorAtual}`);
        }else{
            process.exit();
        }
    }
});
