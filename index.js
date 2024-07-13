// Chamar o Express para o projeto
const express = require('express')

// Chamar o Mysql para o projeto
const mysql = require('mysql')

// Chamar o body-parser para o projeto
const bodyParser = require('body-parser')

// Chamar o PATH para o projeto (dependencia do Express)
const path = require('path')

// Trazer o Express() para uma variavel - Exemplo da caixa*
const app = express()

// ...

// Configurar o MySQL para realizar uma conexão
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'catalogo_712'
})

// Realizar a conexão com o Banco MySQL (manter o xampp ligado)
db.connect((err) => {
    if (err) {
        throw err
    }
    console.log('Conectado ao banco de Dados')
})

// Configurar o body-parser para lidar com dados de formularios
app.use(bodyParser.urlencoded({ extended: false }))
/* NOTA: .urlencoded() nao é obrigatório, é utilizado para 
reduzir o volume de dados retornados. */

// Configurar o EJS como Engine para Templates (paginas do site)
app.set('view engine', 'ejs')

// Configurar a pasta public para arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')))

// Configurar os arquivos CSS do BootStrap para rota padrão
app.use('/css', express.static(path.join(__dirname,
    'node_modules/bootstrap/dist/css')))

// Configurar os arquivos JS do BootStrap para rota padrão
app.use('/js', express.static(path.join(__dirname,
    'node_modules/bootstrap/dist/js')))

// Criar rota com o formulario
app.get('/add_product', (req, res) => {
    res.render('add_product')
})

// Coleta do formulario
app.post('/add_product', (req, res) => {

    // Consumindo o atr. "name" do Formulario e salvando nas variaveis.
    const { name, quantity, price } = req.body

    // Condição para 'filtrar' caso algo esteja errado no envio do formulario
    if (!name || !quantity || !price) {
        return res.status(400).send('Todos os campos são obrigatórios')
    }

    // Configuração de coleta do DB
    const sql = 'INSERT INTO products (nome, quantity, price) VALUES (?, ?, ?)'

    // Consulta ao banco de dados enviando os dados
    db.query(sql, [name, quantity, price], (err, result) => {
        if (err) {
            throw err
        }
        console.log('adicionado com sucesso: ', result)
        res.redirect('products')
    })
})



app.get('/products', (req, res) => {
    let sql = 'SELECT * FROM products'

    db.query(sql, (err, result) => {
        if (err) {
            throw err
        }
        res.render('list_product', { prod: result })
    })
})

// FUNCAO DE DELEÇÃO
app.get('/delete_product/:id', (req, res) => {
    const {id} = req.params
    let sql = 'DELETE FROM products WHERE  id = ?'
    db.query(sql, [id], (err, result) => {
        if (err) {
            throw err
        }
        console.log('Produto deletado com sucesso' , result)
        res.redirect('/products')
    })
})


// FUNCAO DE EDIÇÃO
app.get('/edit_product/:id', (req, res) => {
    const {id} = req.params
    let sql =  'SELECT * FROM products WHERE id = ?'
    db.query(sql, [id], (err, result) => {
        if (err) {
            throw err
        }
        res.render('edit_product' , {product: result[0]})
    })
})

app.post('/edit_product/:id' , (req, res) => {
    const {id} = req.params
    const {name, quantity, price} = req.body
    let sql = 'UPDATE products SET nome = ?, quantity = ?, price = ? WHERE id = ?'

    db.query(sql, [name, quantity, price, id], (err, result) =>{
        if (err) {
            throw err
        }

        console.log('Produto atualizado com sucesso', result)
        res.redirect('/products')
    })
})


app.listen(3000, () => {
    console.log('Servidor aberto')
})

// A partir desse pode-se iniciar a criação de arquivo EJS

// pasta views e arquivos com extensao ejs. Example: add_products.ejs and list_products.ejs





























// Chamar o Express epara o projeto
// const express = require('express')

// const sql = require('mysql')

// const bodyParser = require('body-parser')

// const path = require('path')

// // Trazer o Express() para uma variavel
// const app = express()

// // Configurar o MySql para realizar 
// const db = mysql.creatConnector({
//     host: 'localhost',
//     user: 'root',
//     passeword: '',
//     database: 'catalogo_712'
// })

// // Realizar a conexão com o Banco MySQL (manter o xamp ligado)
// db.connect((err) => {
//     if(err){
//         throw err
//     }
//     console.log('Conectado ao banco de Dados')
// })

// // Configurar o body-parser para lidar com dados de formulários
// app.use(bodyParser.urlencoded({ extended: false }))
// // NOTA: 


// // Configurar a EJS como Engine para Templates (Páginas do site)
// app.set('view engine', 'ejs')

// // Configurar pasta public para arquivos estáticos. Após a criação, crie a pasta public => css e js
// // Path determina as rotas padrãos dos elementos
// app.use(express.static(path.join(__dirname, 'public')))

// // Configurar os arquivos CSS do BootStrap para rota padrão
// app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')))


// // Configurar os arquivos JS do Bootstrap para rota padrão
// app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')))



// // Criar rota com o Formulário
// app.get('/add_product', (req, res) => {
//     res.render('add_product')
// })

// // Coleta do Formulário
// app.post('/add_product', (req, res) => {
//     const {name, quantity, price} = req.body
//     // Condição para 'filtrar' caso algo esteja errado no envio do formulário
//     if(!name || !quantity || !price) {
//         return res.status(400) .send('Todos os campos são obrigatórios!')
//     }
//     // Configuração de coleta do DB
//     const sql = 'INSERT INTO products (nome, quantity, price) VALUES (?,?,?)'
//     db.query(sql, [name, quantity, price], (err, result) => {
//         if(err) {
//             throw err
//         }
//         res.redirect('products')
//     })
// })



