console.clear()
console.log('************** START *******************')

import express from "express";
import dotenv from 'dotenv';
import ejs from "ejs";
import mongoose from "mongoose"
import CharacterModel from "./models/Character.js"

dotenv.config();
const { APP_LOCALHOST : hostname, APP_PORT: port, APP_DSN: dsn } = process.env;
const app = express();

import { fileURLToPath } from 'url';
import { dirname } from 'path';

mongoose.connect(dsn, {
  "useNewUrlParser": true,
  "useUnifiedTopology": true,
})


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(__dirname + "/public"));

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.get('/', (req, res)=> {

  CharacterModel.find({})
  .then(docs => {
    console.log(docs);
    if(!docs) throw err
    res.render('page/index', {characters: docs});
  })
  .catch(err => {
    console.log("no chararcter");
    res.render('page/index');
  })

})

app.post('/add', (req, res) => {
  console.log(req.body);


  const Character = new CharacterModel({"name": req.body.name})

  Character.save() //retourne un "document"
  .then((doc) => {
      console.log(doc)
      res.render('page/index');
  })
  .catch((err) => {
      console.log(err)
      res.json({"message": "échec de l'insertion"})
  })
})

app.listen(port, () => {
  console.log(`App listening at http://${hostname}:${port}`);
});
