from selenium
import selenium.common.exceptions as erros
from os import path
from platform import system

dir_path = path.dirname(path.realpath(__file__))


if system() == 'Linux':
    chrome = selenium.webdriver.Chrome(
        executable_path=dir_path + '/drivers/linux/chromedriver')
elif system() == 'Windows':
  chrome = selenium.webdriver.Chrome(
      executable_path=dir_path + '/drivers/windows/chromedriver')


chrome.get('http://localhost:8090/esus')

try:
  botoes_tela_inicial = chrome.find_element_by_xpath(
      '//div[@peid="EsusCdsMainViewImpl"]/div/div[7]/div')
  botoes_tela_inicial.click

except erros.NoSuchElementException:
  print('Não encontrado :(')
