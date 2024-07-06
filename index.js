// Chamar o Express epara o projeto
const express = require('express')

const sql = require('mysql')

const bodyParser = require('body-parser')

const path = require('path')

// Trazer o Express() para uma variavel
const app = express()

// Configurar o MySql para realizar 
const db = mysql.creatConnector({
    host: 'localhost',
    user: 'root',
    passeword: '',
    database: 'catalogo_712'
})

// Realizar a conexão com o Banco MySQL (manter o xamp ligado)
db.connect((err) => {
    if(err){
        throw err
    }
    console.log('Conectado ao banco de Dados')
})

// Configurar o body-parser para lidar com dados de formulários
app.use(bodyParser.urlencoded({ extended: false }))
// NOTA: 


// Configurar a EJS como Engine para Templates (Páginas do site)
app.set('view engine', 'ejs')

// Configurar pasta public para arquivos estáticos. Após a criação, crie a pasta public => css e js
// Path determina as rotas padrãos dos elementos
app.use(express.static(path.join(__dirname, 'public')))

// Configurar os arquivos CSS do BootStrap para rota padrão
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')))


// Configurar os arquivos JS do Bootstrap para rota padrão
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')))



// Criar rota com o Formulário


// Coleta do Formulário
app.post('/add_product', (req, res) => {
    const {name, quantity, price} = req.body
    if(!name || !quantity || !price) {
        return res.status(400) .send('Todos os campos são obrigatórios!')
    }
    // Configuração de coleta do DB
    const sql = 'INSERT INTO products (nome, quantity, price) VALUES (?,?,?)'
    db.query(sql, [name, quantity, price], (err, result) => {
        if(err) {
            throw err
        }
        res.redirect('products')
    })
})