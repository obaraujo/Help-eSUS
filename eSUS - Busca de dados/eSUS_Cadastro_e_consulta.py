from pickle import dump, load
from os import makedirs
from os import path


def cadastro():
    """
    Aqui os valores da variaveis serão armazenadas nos aquivos correspodentes, através do PICKLE
    """
    """
    Verifica de existe o diretório 'Cadastros'
    """
    if not path.isdir('./Cadastros/'): #Se não existe o diretório
        makedirs('./Cadastros/') #Função para criar o diretorio, importado do módulo OS
    try:
        dado = open(f'./Cadastros/dados_pessoas.pck', 'rb')
    except (OSError, IOError) as error:
        dump('Cadastros: ', open(f'./Cadastros/dados_pessoas.pck', 'wb'))

    """
    Pega o primeiro dado - Nome
    """
    nomes = str(input('-> Digite o nome da pessoa: ')).upper().strip() #Linha de entrada, onde é digitado o nome
    if nomes == '': #Condição para sair do programa
        exit() #Fecha o programa
    dado = str(load(open(f'./Cadastros/dados_pessoas.pck', 'rb'))).split(' ')
    indice = 0
    while nomes != dado[indice]:
        indice += 1
        if indice == len(dado) - 1:
            indice = 0
            break
        while nomes == dado[indice]:
            indice = 0
            print('Nome já cadastrado! Tente novamente!!! \n ') 
            nomes = str(input('-> Nome do titular do cartão: ')).upper()

    """
    Pega o segundo dado - Número do cartão do SUS
    """
    cartao = str(input('-> Digite o número do cartão do SUS (sem pontuação!): ')) #Linha de entrada, onde é digitado o número
    if cartao == '': #Condição para sair do programa
        exit() #Sai do programa
    while len(cartao) != 15: #Enquanto o tamanha do numero digitado, isso é, o tamanho de caracteris for diferente de 15
        print('Cartão invalido!') #Messagem
        cartao = str(input('-> Digite o número do cartão do SUS novamente: ')) #Pede para digitar o número novamente
    indice = 0
    while  cartao != dado[indice]:
        indice += 1
        if indice == len(dado) - 1:
            indice = 0
            break
        while cartao == dado[indice]:
            indice = 0
            print('Cartão já cadastrado! Tente novamente!!! \n ') 
            cartao = str(input('-> Digite o número do cartão do SUS novamente: '))

    """
    Pega o terceiro dado - Data de nascimento
    """
    nascimento = str(input('-> Digite a data de nascimento (No formato: dia/mes/ano): ')) #Linha de entrada, onde é digitado a data de nascimento
    if nascimento == '': #Condição para fechar o programa
        exit() #Sai do programa
    while (nascimento[2] != '/') and (nascimento[4] != '/') and (len(nascimento) != 10): #Vê se a data de nascimento é válida
        print('Data de nascimento fora do formato dia/mês/ano') #Imprime informções
        nascimento = str(input('-> Digite a data de nascimento novamente!(No formato: dia/mes/ano): ')) #Pede novamente o dado
        if nascimento == '': #Condição para fechar o programa
            exit() #Sai do programa
    
    """
    Pega o quarto dado - Tipo de doença
    """
    doenca = str(input('-> Digite a doença (se não tiver digite ND): ')).upper().strip() #Linha de entrada, onde será digitado o tipo da doença
    if doenca == '':#Condição para fechar o programa
        exit() #Sai do programa

    """
    Manipulação do dados para armazenamento
    """
    arquivo = load(open(f'./Cadastros/dados_pessoas.pck', 'rb'))
    dados = (f'{arquivo} {nomes} {cartao} {nascimento} {doenca}')
    """
    Armazenando os dados
    """
    dump(dados, open(f'./Cadastros/dados_pessoas.pck', 'wb'))

    """
    Messagem de sucesso!
    """
    print('Cadastro realizado!!! :)')


def consulta():
    """
    Aqui será aberto o aquivo, e os valores serão armazenados na variavel
    """

    n = str(input('-> Nome do titular do cartão: ')).upper().strip()
    if n == '':
        exit()
    dados = str(load(open(f'./Cadastros/dados_pessoas.pck', 'rb'))).split(' ')
    indice = 0
    while n != dados[indice]:
        indice += 1
        if indice == len(dados) - 1:
            print('Nome incorreto ou não cadastrado! \n ')
            p = str(input('Para cadastrar digite - 1, para tentar novamente - 2 \n       -> '))
            if p == '':
                exit()
            while p != '1' and p != '2':
                p = str(input('Opição incorreta! \n Para cadastrar digite - 1, para tentar novamente - 2 \n       -> '))
                if p == '':
                    exit()
            if p == '1':
                enfeite(str('Cadastro dos dados').upper())
                cadastro()
            elif p == '2':
                n = str(input('Nome do titular do cartão: ')).upper()
                indice = 0
    

    """
    Através do print será imprimido os valores organizados numa tabela
    """

    print('__' * 45)
    print('NOME                |' ' Nº do cartão do SUS ' "|" ' Data de nascimento ' "|" ' Doença')
    print('-' * 19, '|', '-' * 19, '|', '-' * 18, '|', '-' * 20)
    print(dados[indice], ' ' * ((19 - len(dados[indice])) - 1), '| ', dados[indice + 1], ' ' * ((18 - len(dados[indice + 1])) - 1), '|  ', dados[indice + 2], ' ' * ((16 - len(dados[indice + 2])) - 1), '|', dados[indice + 3])
    print('__' * 45)
    print('\n')


def enfeite(h):
    print('==' * 50)
    print(f' /////////////////////////////   {h}   \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\')
    print('==' * 50)


def inicio():
    print(' ViniProg, facilitando sua vida ')
    print(' Desenvolvido por: Vinícius Brandão de Araújo.')
    print('                      Seja bem vindo(a)!')
    print('     Programa desenvlvido por Vinícius Brandão, todos os direitos reservados!')
    print('')
    print('==' * 50)
    print('                ESUS - Cadastramento e consulta dos dados')
    print('==' * 50, '\n')
    print('=' * 34)
    print('||      O que você deseja?      ||')
    print('=' * 34)
    print('|  -> Digite "1" para Cadastro   |')
    print('-' * 34)
    print('|  -> Digite "2" para Consulta   |')
    print('-' * 34)
    print('|  -> Digite "3" para Sair       |')
    print('-' * 34)
    escolha = input('-> Digite sua escolha: ')
    print('')

    while escolha != '1' and escolha != '2' and escolha != '3':
        escolha = input('Escolha errada:(! Digite novamente: ')

    print('A qualquer momento você pode clicar no ENTER sem digitar nada para sair do programa')

    if int(escolha) == 1:
        enfeite(str('Cadastro de dados').upper())

    while int(escolha) == 1:
        cadastro()

    if int(escolha) == 2:
        enfeite(str('Consulta dos dados').upper())

    while int(escolha) == 2:
        consulta()

    if int(escolha) == 3:
        exit()


inicio()
