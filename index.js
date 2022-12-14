import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

const serverUsers = [];
const serverTweets = [];

app.post("/sign-up", (req, res) => {
  const { username, avatar } = req.body;

  if (!username || !avatar) {
    res.status(400).send("Todos os campos são obrigatórios!");
    return;
  }

  serverUsers.push(req.body);
  res.status(201).send("OK");
});

app.post("/tweets", (req, res) => {
  const { tweet } = req.body;
  const username = req.headers.user;

  if (!username || !tweet) {
    res.status(400).send("Todos os campos são obrigatórios!");
    return;
  }

  const tweetsReturn = {
    username,
    tweet,
  };

  serverTweets.push(tweetsReturn);
  res.status(201).send("OK");
});

app.get("/tweets", (req, res) => {
  const page = parseInt(req.query.page);
  if (page < 1) {
    res.status(400).send("Informe uma página válida!");
    return;
  }
  if (page > 1) {
    const lastTweets = serverTweets.filter(
      (obj, i) =>
        i >= serverTweets.length - page * 10 &&
        i <= serverTweets.length - (page * 10 - 9)
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
    return;
  }
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

app.get("/tweets/:username", (req, res) => {
  const username = req.params.username;
  const userTweets = serverTweets.filter((obj) => obj.username === username);
  const userTweetsReturn = userTweets
    .map(
      (obj) =>
        obj && {
          username: obj.username,
          avatar: serverUsers.find(
            (objUsers) => objUsers.username === obj.username
          ).avatar,
          tweet: obj.tweet,
        }
    )
    .reverse();
  res.send(userTweetsReturn);
});

app.listen(5000);
