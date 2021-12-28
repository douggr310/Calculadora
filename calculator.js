// agora é que fica divertido! Vou começar estabelecendo algumas constantes que será necessárias no meu código. Elas interagem com o display da nossa calculadora, lá no arquivo html.

const elemento_input = document.querySelector('.input');
const elemento_output_operacao = document.querySelector(".operacao .valor");
const elemento_output_resultado = document.querySelector(".resultado .valor");

// agora vou criar os botções da calculadora. Faço um array com os atributos que cada um deve ter, isolados por bloco. 
// Serão 5 linhas com 4 colunas. O array recebe os botões na ordem da esquerda para a direita, de cima para baixo. Copiei a ordem de uma calculadora velha aqui de casa.

let botoes_calculadora = [ 
    {
        name : "delete",
        symbol : "⌫",
        formula : false,
        type : "key"
    },{
        name : "limpar",
        symbol : "C",
        formula : false,
        type : "key"
    },{
        name : "porcento",
        symbol : "%",
        formula : "/100",
        type : "numero"
    },{
        name : "divisao",
        symbol : "÷",
        formula : "/",
        type : "operador"
    },{
        name : "7",
        symbol : 7,
        formula : 7,
        type : "numero"
    },{
        name : "8",
        symbol : 8,
        formula : 8,
        type : "numero"
    },{
        name : "9",
        symbol : 9,
        formula : 9,
        type : "numero"
    },{
        name : "multiplicacao",
        symbol : "×",
        formula : "*",
        type : "operador"
    },{
        name : "4",
        symbol : 4,
        formula : 4,
        type : "numero"
    },{
        name : "5",
        symbol : 5,
        formula : 5,
        type : "numero"
    },{
        name : "6",
        symbol : 6,
        formula : 6,
        type : "numero"
    },{
        name : "adicao",
        symbol : "+",
        formula : "+",
        type : "operador"
    },,{
        name : "1",
        symbol : 1,
        formula : 1,
        type : "numero"
    },{
        name : "2",
        symbol : 2,
        formula : 2,
        type : "numero"
    },{
        name : "3",
        symbol : 3,
        formula : 3,
        type : "numero"
    },{
        name : "subtracao",
        symbol : "–",
        formula : "-",
        type : "operador"
    },{
        name : "0",
        symbol : 0,
        formula : 0,
        type : "numero"
    },{
        name : "ponto",
        symbol : ".",
        formula : ".",
        type : "numero"
    },{
        name : "calcular",
        symbol : "=",
        formula : "=",
        type : "calcular"
    }
];

// agora uma variavel para reter os dados que o cliente coloca na calculadora, para depois realizarmos o calculo.

let dados = {
    operacao : [],
    resultado : [],
};

// Agora vou fazer uma função para criar os botões. Idéia de um indiano, vi nun tutorial, achei o maximo. A princiío faria na mão, mas é muito melhor assim. Me fez pensar melhor logicamente, usar o algoritimo mais efetivamente.
function criarBotoes(){
    const bts_por_linha = 4;
    let add_bts = 0;

    botoes_calculadora.forEach( (button, index) => {
        if( add_bts % bts_por_linha == 0 ){
            elemento_input.innerHTML += `<div class="linha"></div>`;
        }
        
        const linha = document.querySelector(".linha:last-child");
        linha.innerHTML += `<button id="${button.name}">
                            ${button.symbol}
                          </button>`;

        add_bts++;
    });
}
// agora temos que fazer o programa entender qual botão esta sendo acionado. para isso vamos criar um evento no pad inteiro da calculador e puxar de la as informações que estão sendo passadas e comparar com a nossa array de botões. aplicando uma função sobre isso logo após.
criarBotoes();

elemento_input.addEventListener("click", event => { 
    const botao_alvo = event.target;

    botoes_calculadora.forEach( button => {
        if( button.name == botao_alvo.id ) calculador(button);
    });
    
});
// esse é o cérebro de nossa calculadora. 
function calculador( button ){
    if( button.type == "operador" ){
        dados.operacao.push(button.symbol);
        dados.resultado.push(button.formula);
    }
    else if( button.type == "numero" ){
        dados.operacao.push(button.symbol);
        dados.resultado.push(button.formula);
    }
    else if( button.type == "key" ){
        if( button.name == "limpar" ){
            dados.operacao = [];
            dados.resultado = [];
            atualizarResultado(0);
        }
        else if( button.name == "delete" ){
            dados.resultado.pop();
            dados.operacao.pop();            
        }
    }
    else if( button.type == "calcular" ){
        
        let result_joined = dados.resultado.join('');

        dados.operacao = [];
        dados.resultado = [];

        let result_final;
        try {
            result_final = eval(result_joined); 
        } catch (error) {
            if (error instanceof SyntaxError) {
                result_final = "Syntax Error!"
                atualizarResultado( result_final );
                return;
            }
        }


        result_final = formatResult(result_final);


        dados.operacao.push(result_final);
        dados.resultado.push(result_final);
        

        atualizarResultado( result_final );

        return;
    }

    atualizarOperacao( dados.operacao.join('') );
}

// agora as funções para a exibição correta no display da nossa calculadora.

function atualizarOperacao(operacao){
    elemento_output_operacao.innerHTML = operacao;
}

function atualizarResultado(resultado){
    elemento_output_resultado.innerHTML = resultado;
}

function digitCounter(number){
    return number.toString().length;
}

function isFloat(number){
    return number % 1 != 0;
}

const max_numero_caracteres = 10;
const precisao_output = 5;

function formatResult( result ){
    if( digitCounter(result) > max_numero_caracteres){
        if( isFloat(result) ){
            const result_int = parseInt(result);
            const result_int_length = digitCounter(result_int);

            if( result_int_length > max_numero_caracteres ){
                return result.toPrecision(precisao_output);
            }else{
                const num_digits_after_point = max_numero_caracteres - result_int_length;
                return result.toFixed(num_digits_after_point);
            }
        }else{
            return result.toPrecision(precisao_output);
        }
    }else{
        return result;
    }
}
