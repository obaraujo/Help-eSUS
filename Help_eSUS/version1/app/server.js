const express = require('express')
const app = express()
const baseDados = require('./database')
const cors = require('cors')

function dataBR(data) {
  return data.split('-').join('/')
}

app.use(cors())

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8090');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Pega-Dados');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.get('/', (req, res, next) => {
  res.sendFile(__dirname + '/index.html')
})

app.get('/:nome/:cns/:dn/:sexo/:mv', (req, res, next) => {
  const dados = {
    Nome: req.params.nome,
    CNS: req.params.cns,
    Data_de_nascimento: dataBR(req.params.dn),
    Sexo: req.params.sexo,
    Motivo_da_Visita: req.params.mv.split(',')
  }
  try {
    baseDados.newPessoa(dados, req.params.cns)
    res.send('true')
  } catch (e) {
    console.log(e)
    res.send( `false ${e}`)
  } finally {

  }
  //res.send('<script>window.onload = () => window.close()</script>')
})

app.get('/cadastros', (req, res, next) => {
  res.sendFile(__dirname + '/data/bancoDados.json')
})

app.listen(20002, () => {
  console.log(`Servidor rodando na porta 2002!`)
  baseDados.getNumeroCadastros()
})