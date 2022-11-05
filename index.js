import express from "express"
import cors from "cors"

const app = express()
app.use(express.json())
app.use(cors())

const serverUsers = []

app.post("/sign-up", (req,res)=> {
    const {username, avatar} = req.body
    serverUsers.push(req.body)
    res.send("OK")
})
app.get("/sign-up", (req,res)=> {
    res.send(serverUsers)
})

// app.get("/", (req,res)=>{
//     res.send("oi,meu nome não é julia")
// })

// app.get("/sim/:batatinhas", (req,res)=>{
//     res.send(req.params.batatinhas)
// })


app.listen(5000)