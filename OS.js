const tabelaCorpoOS = $('#tabela-os-body')

function handlerlistarOS() {

}

function toogleAlterarOS() {
    toogle('tabela-os')
    toogle('alterar-os')
}

function handlerSelecionarOS(os) {
    toogleAlterarOS()
    const id = document.getElementById('os-id-alterar')
    const valorObra = document.getElementById('valor-obra-alterar').value;
    const idCliente = document.getElementById('idCliente-alterar').value;
    const idFuncionario = document.getElementById('idFuncionario-alterar').value;
    const idObra = document.getElementById('idObra-alterar').value;
    id.value = os.ordemDeServico
    valorObra.value = os.valorDaObra;
    idCliente.value = os.idCliente
    idFuncionario.value = os.idFuncionario
    idObra.value = os.idObra
}

function listarOS() {
    getData('https://localhost:44349/OS/BuscarTodas').then(oss => {
        tabelaCorpoOS.empty()
        oss.forEach(os => {
            const linha = document.createElement('tr')

            const ordemDeServico = document.createElement('td')
            const valordaObra = document.createElement('td')
            const descricaoDaObra = document.createElement('td')
            const nomeCliente = document.createElement('td')
            const nomeFuncionario = document.createElement('td')
            const dataDeInicio = document.createElement('td')
            const previsaoDeTermino = document.createElement('td')

            const acoes = document.createElement('td')

            ordemDeServico.innerHTML = os.ordemDeServico
            valordaObra.innerHTML = os.valordaObra
            descricaoDaObra.innerHTML = os.descricaoDaObra
            nomeCliente.innerHTML = os.nomeCliente
            nomeFuncionario.innerHTML = os.nomeFuncionario
            dataDeInicio.innerHTML = os.dataDeInicio
            previsaoDeTermino.innerHTML = os.previsaoDeTermino

            acoes.appendChild(criarBotao(handlerSelecionarOS, 'Alterar OS', os))
            linha.appendChild(ordemDeServico)
            linha.appendChild(valordaObra)
            linha.appendChild(descricaoDaObra)
            linha.appendChild(nomeCliente)
            linha.appendChild(nomeFuncionario)
            linha.appendChild(dataDeInicio)
            linha.appendChild(previsaoDeTermino)

            linha.appendChild(acoes)
            tabelaCorpoOS.append(linha)

        });
    })
}
listarOS()

function handlerDeleteOS() {
    const idOS = document.getElementById('os-id-alterar').value
    deleteData('https://localhost:44349/OS/DeletarOS?id=' + idOS).then(() => {
        toogleAlterarOS()
        listarOS()
    })

}

function handlerAlterarOS() {
    const id = document.getElementById('os-id-alterar').value;
    const valorObra = document.getElementById('valor-obra-alterar').value;
    const idCliente = document.getElementById('idCliente-alterar').value;
    const idFuncionario = document.getElementById('idFuncionario-alterar').value;
    const idObra = document.getElementById('idObra-alterar').value;


    const payload = {
        
        OSatualizar: {
            ValorDaObra: parseInt(valorObra),
            IdCliente:  parseInt(idCliente),
            IdFuncionario:  parseInt(idFuncionario),
            IdObra:  parseInt(idObra)
        },
        OSencontrar: parseInt(id)
    }
    console.log(payload)
    updateData('https://localhost:44349/OS/AtualizarValor', payload).then(() => {
        toogleAlterarOS()
        listarOS()
    })
}

function handlerSalvarOS() {
    const valorObra = document.getElementById('valor-obra').value;
    const idCliente = document.getElementById('idCliente').value;
    const idFuncionario = document.getElementById('idFuncionario').value;
    const idObra = document.getElementById('idObra').value;

    const payload = {
        ParametrosOs: {
            ValordaObra: parseInt(valorObra),
            IdCliente: parseInt(idCliente),
            IdFuncionario: parseInt(idFuncionario),
            IdObra: parseInt(idObra)
        }
    }
    console.log(payload);
    postData('https://localhost:44349/OS/SalvarOS', payload).then(os => {
        const linha = document.createElement('tr')
        const valorObra = document.createElement('td')
        const idCliente = document.createElement('td')
        const idFuncionario = document.createElement('td')
        const idObra = document.createElement('td')
        const acoes = document.createElement('td')
        valorObra.innerHTML = os.valorObra
        idCliente.innerHTML = os.idCliente
        idFuncionario.innerHTML = os.idFuncionario
        idObra.innerHTML =  os.idObra    
        linha.appendChild(valorObra)
        linha.appendChild(idCliente)
        linha.appendChild(idFuncionario)
        linha.appendChild(idObra)
        linha.appendChild(acoes)
        tabelaCorpoOS.append(linha)
    })
}







