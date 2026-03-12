const express = require('express');
const cors = require('cors')
const app = express()
const pool = require('./database/db')

app.use(express.json())
app.use(cors())

const PORT = 3000

app.listen(PORT, () => {
    console.log("Servidor encendido en el puerto " + PORT)
})

app.get('/items', async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM items")
        res.json(result.rows)
    } catch (error) {
        console.error("Error en la consulta POST /items: " + error)
        res.status(500).json({
            error: error.code,
            message: error.message
        })
    }
    
})

app.post('/items', async (req, res) => {
    try {
        const { name, price } = req.body
        const values = [name, price]
        const result = await pool.query("INSERT INTO items (name, price) VALUES ($1, $2)", values)

        res.send("Producto agregado con éxito")

    } catch (error) {
        console.error("Error en la consulta POST /items: " + error)
        res.status(500).json({
            error: error.code,
            message: error.message
        })
    }
})

app.get("/items/:id", async (req, res) => {
    const { id } = req.params
    const result = await pool.query("SELECT * FROM items WHERE id = $1", [id])
    res.json(result.rows)
})

app.put('/items/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { name, price } = req.body
        const values = [name, price, id]

        const result = await pool.query("UPDATE items SET name = $1, price = $2 WHERE id = $3", values)
        res.send("Producto actualizado con éxito")
    } catch (error) {
        console.error("Error en la consulta POST /items: " + error)
        res.status(500).json({
            error: error.code,
            message: error.message
        })
    }
    
})

app.delete('/items', async (req, res) => {
    
})