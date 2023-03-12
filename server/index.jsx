require('dotenv').config()
const express = require('express')
const app = express()
const http = require('http').Server(app)
const PORT = process.env.PORT || 3001

app.use(express.json())
app.use(express.urlencoded({
	extended:false
}))

app.get('/', (req, res)=>{
	res.status(200).json({status:true})
})

const server = http.listen(PORT, ()=>{
	console.log(`server listening on port ${PORT}`)
})
