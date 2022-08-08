let textarea = document.querySelectorAll(".texto-textarea");
const btnCodificar = document.getElementById("codificarBtn");
const btnDecodificar = document.getElementById("decodificarBtn");
const copiarTextoCodificado = document.getElementById("copiar-texto-codificar");
const copiarTextoDecodificado = document.getElementById("copiar-texto-decodificar");

btnCodificar.addEventListener('click', codificar);
btnDecodificar.addEventListener('click', decodificar);

function codificar(event) {
    event.preventDefault();
    mostrarMensagem(valueTextarea(textarea[0]), 0, 'codificar');
    limparCampo();
}

function decodificar(event) {
    event.preventDefault();
    mostrarMensagem(valueTextarea(textarea[1]), 1, 'decodificar');
    limparCampo();
}

function valueTextarea(textarea) {
    return textarea.value;
}

function codificarTexto(mensagem) {
    const mensagemLowerCase = mensagem.toLowerCase();
    const mensagemDecodificada = [];
    const mensagemRecortada = mensagemLowerCase.split('');
    mensagemRecortada.forEach((mensagem) => {
        switch(mensagem) {
            case 'e':
                mensagemDecodificada.push('enter');
            break;
            case 'i':
                mensagemDecodificada.push('imes');
            break;
            case 'a':
                mensagemDecodificada.push('ai');
            break;
            case 'o':
                mensagemDecodificada.push('ober');
            break;
            case 'u':
                mensagemDecodificada.push('ufat');
            break;
            default: 
            mensagemDecodificada.push(mensagem);
        }
    })

    return mensagemDecodificada.join("").normalize('NFD').replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, '');
}

function decodificarTexto(mensagem) {
    for(let count = 0; count < mensagem.length; count++) {
        mensagem = mensagem.replace('enter', 'e');
        mensagem = mensagem.replace('imes', 'i');
        mensagem = mensagem.replace('ai', 'a');
        mensagem = mensagem.replace('ober', 'o');
        mensagem = mensagem.replace('ufat', 'u');
    }

    return mensagem.normalize('NFD').replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, '');
}

let mostrarMensagemP = document.querySelectorAll(".campo-resultado-mensagem");

function mostrarMensagem(mensagem, indice, escolhaMensagem) {
    if(mensagem == '') {
        return mostrarMensagemP[indice].innerHTML = 'Não há mensagens codificadas!';
    } else {
        if(escolhaMensagem == 'codificar') {
            return mostrarMensagemP[indice].innerHTML = codificarTexto(mensagem);
        } else {
            return mostrarMensagemP[indice].innerHTML = decodificarTexto(mensagem);
        }
    }
}

function copiarTexto(event) {
    const hasClassbntCopiar0 = event.target.classList.contains('textoCopiado0')
    const textoCopiadoPopUp = document.querySelectorAll(".texto-copiado");

    if(hasClassbntCopiar0) {
        textoCopiadoPopUp[0].classList.add("texto-copiado-ativo");
        navigator.clipboard.writeText(mostrarMensagemP[0].innerHTML);
    } else {
        textoCopiadoPopUp[1].classList.add("texto-copiado-ativo");
        navigator.clipboard.writeText(mostrarMensagemP[1].innerHTML);
    }

    setInterval(() => {
        textoCopiadoPopUp[0].classList.remove("texto-copiado-ativo");
        textoCopiadoPopUp[1].classList.remove("texto-copiado-ativo");
    }, 3000);
}

function limparCampo() {
    textarea.forEach((textarea)=> {
        textarea.value = '';
    })
}

copiarTextoCodificado.addEventListener('click', copiarTexto);
copiarTextoDecodificado.addEventListener('click', copiarTexto);