const fs = require('fs')
const bancoDados = __dirname + '/data/bancoDados.json'

function newPessoa(dados, cns) {
  fs.readFile(bancoDados, 'utf-8', (erro, cadastros) => {
    const pessoas = JSON.parse(cadastros)
    pessoas[cns] = dados

    fs.writeFile(bancoDados, JSON.stringify(pessoas, null, '\t'), (err) => {
      console.log(err || `${dados.Nome} foi salvo(a)! \nSistema atualmente com ${Object.keys(pessoas).length} cadastros`)
    })
  })
}

function getNumeroCadastros() {
  fs.readFile(bancoDados, 'utf-8', (erro, cadastros) => {
    const num = Object.keys(JSON.parse(cadastros)).length
    console.log(`O sistema possui ${num} cadastros!`)
  })
}
module.exports = { newPessoa, getNumeroCadastros }