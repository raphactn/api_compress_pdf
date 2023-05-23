
# API de Compressão de PDF

Esta API permite comprimir arquivos PDF usando o Ghostscript. Ela aceita um arquivo PDF como entrada, comprime o arquivo e retorna o arquivo PDF comprimido.





## Instalação

1 - Faça o download e instalação do GhostScript. https://ghostscript.com/releases/gsdnld.html

2 - Certifique-se de ter o Node.js instalado na sua máquina.

3 - Faça o clone deste repositório para o seu ambiente local.

4 - Instale as dependências do projeto executando o seguinte comando no terminal:


```bash
 npm install
```
    
## Uso/Exemplos

Inicie o servidor da API executando o seguinte comando:

```javascript
npm start
```
O servidor será iniciado na porta especificada (padrão: 8080).

Envie uma solicitação POST para a rota /compress, fornecendo um arquivo PDF para compressão.
## Exemplo de solicitação usando cURL:

```javascript
curl -X POST -F "file=@/caminho/do/arquivo.pdf" http://localhost:8080/compress
```



## Exemplo de resposta bem-sucedida:

```json
{
  "result": "base64_encoded_compressed_pdf"
}
``` 

## Exemplo de resposta de erro:

```json
{
  "error": "Erro ao comprimir arquivo"
}

``` 


## Licença

Este projeto está licenciado sob a licença MIT. Consulte o arquivo LICENSE para obter mais informações.

