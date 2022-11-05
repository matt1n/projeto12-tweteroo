import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

const serverUsers = [];
const serverTweets = [];

app.post("/sign-up", (req, res) => {
  const{username, avatar} = req.body
    
  if (!username || !avatar){
    res.status(400).send("Todos os campos são obrigatórios!")
    return
  }

  serverUsers.push(req.body);
  res.status(201).send("OK");
});

app.post("/tweets", (req, res) => {
    const{username, tweet} = req.body
    
    if (!username || !tweet){
      res.status(400).send("Todos os campos são obrigatórios!")
      return
    }
  
    serverTweets.push(req.body);
  res.status(201).send("OK");
});

app.get("/tweets", (req, res) => {
  const lastTweets = serverTweets.filter(
    (obj, i) => i >= serverTweets.length - 10 && obj
  );
  const lastTweetsReturn = lastTweets
    .map(
      (obj, i) =>
        obj && {
          username: obj.username,
          avatar: serverUsers.find(
            (objUsers) => objUsers.username === obj.username
          ).avatar,
          tweet: obj.tweet,
        }
    )
    .reverse();
  res.send(lastTweetsReturn);
});

app.listen(5000);
