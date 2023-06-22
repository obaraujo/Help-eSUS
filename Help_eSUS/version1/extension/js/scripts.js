function digitarSentenca(sentenca, elemento) {
  const keys = sentenca.split('')
  keys.forEach((key) => {
    document.dispatchEvent(new KeyboardEvent('keydown',{
      key:`${key}`,
      keyCode:key.charCodeAt(0),
      which: key.charCodeAt(0),
      code: "KeyE",
      altKey: false,
      ctrlKey: false,
      shiftKey: false,
      metaKey: false,
      bubbles: false
    }));
    document.dispatchEvent(new KeyboardEvent('keyup',{
      key:`${key}`,
      keyCode:key.charCodeAt(0),
      which: key.charCodeAt(0),
      code: "KeyE",
      altKey: false,
      ctrlKey: false,
      shiftKey: false,
      metaKey: false,
      bubbles: false
    }));

  })
}


// Toda vez que o url for moodificado
window.addEventListener('popstate', () => {
  const urlAtual = window.location.href.split('/')

  if (urlAtual.indexOf('detail') >= 0) {
    document.querySelectorAll("*").forEach(div => div.style.fontFamily = 'sans-serif')
    // adiconando os elementos necessários
    const localInputNome = document.querySelector('[peid="FichaVisitaDomiciliarChildForm.cpfCns"]')
    const inputNome = '<label for="nome" style="position: absolute; font-family: Lato !important; font-size: 12px !important; font-weight: bold !important; line-height: 1.2 !important; color: rgb(119, 119, 119) !important; top: 5px; left: 210px;" id="lNome">Nome / apelido</label> <input nome list="datalist" type="text" size="20" id="nome" style="position: absolute; margin: 0px; top: 21px; left: 210px; width: 192px; height: 18px;" maxlength="30" class=" x-form-text x-form-field"><datalist id="datalist" for="nome"></datalist>'
    localInputNome.parentNode.insertAdjacentHTML('afterbegin', inputNome)
    localInputNome.parentElement.children[4].remove()
    localInputNome.parentNode.insertAdjacentHTML('afterbegin', '<div qxselectable="on" style="position: absolute;left: 420px;top: 15px;width: 348px; height: 30px;"><div qxselectable="on" style="position: absolute; z-index: 10; overflow: hidden; font-family: Lato !important; font-size: 12px !important; line-height: 1.2 !important; color: rgb(119, 119, 119) !important; left: 0px; top: 0px; width: 448px; height: 30px;" >Para visita periódica ou visita domiciliar para controle vetorial usar o CPF / CNS do Responsável Familiar.</div></div>')

    const botoes = `<button class="bCadastrar botaoEXT" id="cadatrar" type="button">Cadastrar</button>`
    const localBotoes = document.querySelector('[peid="FichaVisitaDomiciliarDetailChildViewImpl.Cancelar"]').parentNode.parentNode.parentNode;
    localBotoes.insertAdjacentHTML('afterbegin', botoes)

    // Carregando áreas de dados
    const campoNome = document.querySelector('[peid="FichaVisitaDomiciliarChildForm.cpfCns"]')
    const campoCNS = document.querySelector('[peid = "FichaVisitaDomiciliarChildForm.cpfCns"]')
    const campoDN = document.querySelector('[peid = "FichaVisitaDomiciliarChildForm.dataNascimento"]')
    const campoMotivoVisita = document.querySelector('[peid="FichaVisitaDomiciliarChildForm.motivoVisitaDbEnum"]').querySelectorAll('input')
    const labelMovivoVisita = document.querySelector('[peid="FichaVisitaDomiciliarChildForm.motivoVisitaDbEnum"]').querySelectorAll('label')
    const campoSexo = document.querySelector('[peid="FichaVisitaDomiciliarChildForm.sexo"]').querySelectorAll('input')


    // coleta de dados
    const btCadastro = document.querySelector('button.bCadastrar')
    btCadastro.addEventListener('click', () => {
      const nome = campoNome.parentElement.children[2].value
      const cns = campoCNS.querySelector('input').value
      const dataNascimento = campoDN.querySelector('input').value

      let sexo;
      if (campoSexo[0].checked) {
        sexo = 'Feminino'
      } else if (campoSexo[1].checked) {
        sexo = 'Masculino'
      }

      campoSexo.forEach((campo) => {
        campo.addEventListener('change', () => {
          document.querySelector('[peid="FieldSetPanel.sexo"]').querySelector('div').removeAttribute('semPreencher')
        })
      })

      const motivosVisita = []

      campoMotivoVisita.forEach((campo, index) => {
          if (campo.checked) {
            motivosVisita.push(labelMovivoVisita[index].innerText.replace(' / ', '_'))
          }
      })

      motivosVisita.length > 0 ? delete motivosVisita[motivosVisita.indexOf('Sem dados')] : motivosVisita.push('Sem dados')


      //se os campos não forem preenchidos
      if (!nome || !cns || !dataNascimento || !sexo) {
        if (!nome) campoNome.parentElement.children[1].setAttribute('semPreencher', true)
        if (!cns) campoCNS.querySelector('label').setAttribute('semPreencher', true)
        if (!dataNascimento) campoDN.querySelector('label').setAttribute('semPreencher', true)
        if (!sexo) document.querySelector('[peid="FieldSetPanel.sexo"]').querySelector('div').setAttribute('semPreencher', true)
        alert('Preencha os campos que estão faltando!')

        campoNome.parentElement.children[2].addEventListener('change', (c) => {
          campoNome.parentElement.children[1].removeAttribute('semPreencher')
        })
        campoCNS.querySelector('input').addEventListener('change', () => {
          campoCNS.querySelector('label').removeAttribute('semPreencher')
        })
        campoDN.querySelector('input').addEventListener('change', (c) => {
          campoDN.querySelector('label').removeAttribute('semPreencher')
        })
        campoMotivoVisita.forEach((campo, index) => {
          if (campo.checked) {
            motivosVisita.push(labelMovivoVisita[index].innerText.replace(' / ', '_'))
          }
        })
      } else {

        // Organizando os dados e enviando
        const url = `http://localhost:20002/${nome}/${cns}/${dataNascimento.split('/').join('-')}/${sexo}/${motivosVisita}`

        const xhttp = new XMLHttpRequest()
        xhttp.open('GET', url, true)
        xhttp.onreadystatechange = () => {
          if (xhttp.readyState == 4 && xhttp.status == 200) {
            const resposta = xhttp.responseText
            if (resposta == "true") {
              alert(`Cadastro de ${nome} realizado com sucesso!!!`)
            } else {
              alert('Não foi possivel realizar o cadastro:( \n Por favor tente novamente, ou entre em contato com o desenvolvedor!')
            }
          }
        }
        xhttp.send()
      }
    })

    // pegando os dados do arquivo JSON para preenchimento
    const url = 'http://localhost:20002/cadastros'
    const xhttp2 = new XMLHttpRequest()
    xhttp2.open('GET', url, true)
    xhttp2.onreadystatechange = () => {
      if (xhttp2.readyState == 4 && xhttp2.status == 200) {
        const dados = JSON.parse(xhttp2.responseText)

        // organizando os dados na página para aparecer na pesquisa
        const cns = Object.entries(dados)
        cns.forEach(([cns, dados]) => {
          const datalist = localInputNome.parentNode.querySelector('datalist')
          const option = `<option value="${dados.Nome}" id="${cns}">${cns} | ${dados.Data_de_nascimento}</option>`
          datalist.insertAdjacentHTML('afterbegin', option)
        })

        // campo da pesquisa
        const campoName = document.querySelector('[nome]')

        // toda vez que o campo for preenchido
        campoName.addEventListener('change', () => {

          // campo nome alterado, dados zerados
          campoCNS.querySelector('input').value = ''
          campoDN.querySelector('input').value = ''
          campoDN.querySelector('input').classList.remove('x-form-invalido')
          campoCNS.querySelector('input').classList.remove('x-form-invalido')
          campoSexo[1].checked = false;
          campoSexo[0].checked = false
          campoMotivoVisita.forEach((campo) => {
            campo.checked = false
          })

          // verifica se o nome preenchido já foi cadastrado, se sim carrega os dados e preeche a ficha com os dados
          if (!!campoName.parentNode.querySelector(`[value="${campoName.value}"]`)) {
            btCadastro.className = 'bAtualizar botaoEXT'
            btCadastro.innerHTML = 'Atualizar'
            const option = campoName.parentNode.querySelector(`[value="${campoName.value}"]`)
            const dado = dados[option.id]

            const turno = document.querySelector('[peid="FichaVisitaDomiciliarChildForm.turno"]')
            turno.querySelector('input').click()

            const desfecho = document.querySelector('[peid="FichaVisitaDomiciliarChildForm.desfechoDbEnum"]')
            desfecho.querySelector('input').click()

            campoCNS.querySelector('input').value = ''
            campoCNS.querySelector('input').classList.add('x-form-invalido')
            campoDN.querySelector('input').value = ''

            const campoMA = document.querySelector('[peid="FichaVisitaDomiciliarChildForm.microArea"]').querySelector('input')
            navigator.clipboard.writeText('18')
            campoMA.focus()
            digitarSentenca('18', campoMA)

            campoMA.addEventListener('change', () => {
              navigator.clipboard.writeText(dado.CNS)
              if (campoCNS.querySelector('input').value != '') campoCNS.querySelector('input').classList.remove('x-form-invalido')
              campoCNS.querySelector('input').addEventListener('change', () => {
                navigator.clipboard.writeText(dado.Data_de_nascimento)
                campoDN.querySelector('input').classList.add('x-form-invalido')
              })
            })
            if (campoDN.querySelector('input').value != '') campoDN.querySelector('input').classList.remove('x-form-invalido')

            dado.Sexo == 'Masculino' ? campoSexo[1].click() : campoSexo[0].click()
            campoMotivoVisita.forEach((campo, index) => {
              dado.Motivo_da_Visita.forEach(motivo => {
                if (labelMovivoVisita[index].innerText == motivo.replace('_', ' / ')) {
                  campo.click()
                }
              })
            })
          } else {
            btCadastro.className = 'bCadastrar botaoEXT'
            btCadastro.innerHTML = 'Cadastrar'
          }
        })
      }
    }
    xhttp2.send()
  }
})
