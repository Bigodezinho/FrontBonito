const tabelaCorpoObra = $('#tabela-obras-body')

function handlerlistarObra() {

}

function toogleAlterarObra() {
    toogle('tabela-obras')
    toogle('alterar-obra')
}

function handlerSelecionarObra(obra) {
    toogleAlterarObra()
    const id = document.getElementById('obra-id-alterar')
    const descricao = document.getElementById('obra-descricao-alterar');
    const inicio = document.getElementById('obra-inicio-alterar');
    const final = document.getElementById('obra-final-alterar');
    id.value = obra.id
    descricao.value = obra.descricao;
    inicio.value = obra.inicio
    final.value = obra.final
}

function listarObra() {
    getData('https://localhost:44349/Obra/BuscarTodas').then(obras => {
        tabelaCorpoObra.empty()
        obras.forEach(obra => {
            const linha = document.createElement('tr')
            const id = document.createElement('td')
            const descricao = document.createElement('td')
            const inicio = document.createElement('td')
            const final = document.createElement('td')
            const acoes = document.createElement('td')
            id.innerHTML = obra.id
            descricao.innerHTML = obra.descricao
            inicio.innerHTML = obra.datadeInicio
            final.innerHTML = obra.previsaodeTermino
            // console.log(obra.previsaodeTermino)
            acoes.appendChild(criarBotao(handlerSelecionarObra, 'Alterar Obra', obra))
            // acoes.appendChild(criarBotao(handlerDeleteFuncionario, 'Deletar', funcionario))  
            linha.appendChild(id)
            linha.appendChild(final)
            linha.appendChild(inicio)
            linha.appendChild(descricao)
            linha.appendChild(acoes)
            tabelaCorpoObra.append(linha)

        });
    })
}
listarObra()

function handlerDeleteObra() {
    const idObra = document.getElementById('obra-id-alterar').value
    deleteData(`https://localhost:44349/Obra/DeletarObra?id=${idObra}`).then(() => {
        toogleAlterarObra()
        listarObra()
    })

}

function handlerAlterarObra() {
    const id = document.getElementById('obra-id-alterar').value
    const descricao = document.getElementById('obra-descricao-alterar').value;
    const inicio = document.getElementById('obra-inicio-alterar').value;
    const final = document.getElementById('obra-final-alterar').value;


    const payload = {
        ObraAtualizar: {
            Descricao: descricao,
            DatadeInicio: inicio,
            PrevisaodeTermino: final
        },
        ObraEncontrar: parseInt(id)
    }
    updateData('https://localhost:44349/Obra/atualizar', payload).then(() => {
        toogleAlterarObra()
        listarObra()
    })
}

function handlerSalvarObra() {
    const descricao = document.getElementById('obra-descricao').value;
    const inicio = document.getElementById('obra-inicio').value;
    const final = document.getElementById('obra-final').value;
    console.log(final);

    const payload = {
        SalvarObra: {
            Descricao: descricao,
            DatadeInicio: inicio,
            PrevisaodeTermino: final
        }
    }
    postData('https://localhost:44349/Obra/Salvar', payload).then(obra => {
        const linha = document.createElement('tr')
        const descricao = document.createElement('td')
        const inicio = document.createElement('td')
        const final = document.createElement('td')
        const acoes = document.createElement('td')
        descricao.innerHTML = obra.descricao
        inicio.innerHTML = obra.datadeInicio
        final.innerHTML =  obra.previsaodeTermino
        console.log(obra);      
        linha.appendChild(descricao)
        linha.appendChild(inicio)
        linha.appendChild(final)
        linha.appendChild(acoes)
        tabelaCorpoObra.append(linha)
    })
}







