const express = require('express')
const cors = require('cors')
const app = express()
const mysql = require('mysql')
// o cors serve para não dar probela na hora de conectarmos o front-end
// com o back-end


const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "R3n@n87BR",
    database: "crudreact",
})



app.use(express.json())
app.use(cors())

app.post("/register", (req, res) =>{
    const { name } = req.body
    const { cost } = req.body
    const { category } = req.body

    let SQL = `
        INSERT INTO games (name, cost, category) VALUES (?,?,?)
    `

    // todas vez que formos mexer com banco de dados SQL
    // devemos utilizar desta forma seja apra inserir, deletar, atualizar
    // ou pegar os dados no banco veremos nas proximas funcionalidades.
    db.query(SQL, [name, cost, category], (err, result) =>{
        console.log(err);
    })
    // lembrando que uma API sempre deve retornar alguma coisa
    // se não nunca irá finalizar uma requisição
    // OBS: aqui poderiamos retornar um token para autenticação de usuario
    // ou outros dados para validaçòes.
    return res.json({message: 'hello world'})
})

app.post("/search", (req,res) =>{
    const {name, cost, category} = req.body

    let SQL = `
        SELECT * FROM games WHERE name=? AND cost=? AND category=?
    `
    db.query(SQL, [name, cost, category], (err, result)=>{
        if(err) console.log(err);
        else res.send(result)
    })
})

app.get("/getCards", (req, res)=>{

    let SQL = `
        SELECT * FROM games
    `

    db.query(SQL,(err, result)=>{
        if(err) console.log(err);
        else{
            return res.send(result)
        }
    })
})

app.put("/edit", (req, res) =>{
    const {id, name, cost, category} = req.body

    let SQL = `
        UPDATE games SET name=?, cost=?, category=? WHERE idgames=?
    `
    db.query(SQL, [name, cost, category, id], (err, result)=>{
        if(err) console.log(err);
        else{
            res.send(result)
        }
    })
})

app.delete('/delete/:id', (req,res)=>{
    // estamos pegando o id no params pois o id foi passado pela url
    // e todo valor passado pela url se torna um parametro que 
    // podemos recebelo no servidor
    const {id} = req.params

    let SQL = `
        DELETE FROM games WHERE idgames=?
    `
    db.query(SQL, [id], (err, result)=>{
        if(err) console.log(err);
        else res.send(result)
    })
})

app.listen(3001, () => {
    console.log('Rodando!!');
})