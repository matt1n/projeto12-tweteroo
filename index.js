import express from "express"
import cors from "cors"

const app = express()
app.use(express.json())
app.use(cors())

const serverUsers = []
const serverTweets = []

app.post("/sign-up", (req,res)=> {
    const {username, avatar} = req.body
    serverUsers.push(req.body)
    res.send("OK")
})

app.get("/sign-up", (req,res)=> {
    res.send(serverUsers)
})



app.post("/tweets", (req,res)=> {
    serverTweets.push(req.body)
    res.send("OK")
})

app.get("/tweets", (req,res)=> {
    const lastTweets = serverTweets.filter((obj, i)=> i >= serverTweets.length-10 && obj)
    const lastTweetsReturn = lastTweets.map((obj,i)=> obj && 
    {username: obj.username,
    avatar: serverUsers.find(objusers=> objusers.username === obj.username).avatar,
    tweet: obj.tweet})
    res.send(lastTweetsReturn)
})


// app.get("/", (req,res)=>{
//     res.send("oi,meu nome não é julia")
// })

// app.get("/sim/:batatinhas", (req,res)=>{
//     res.send(req.params.batatinhas)
// })


app.listen(5000)