function criarBotao(callBack, label, data = null){
    const botao = document.createElement('button')
    botao.innerHTML = label
    const fn = data ? () => callBack(data) : callBack
    botao.onclick = fn
    return botao
}

const toogle = (id) => {
    const element = document.getElementById(id)
  
    if (element.classList.contains('ocultar')) {
      element.className = 'mostrar'
    } else {
      element.className = 'ocultar'
    }
}