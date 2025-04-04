const express = require('express');
// bodyParser 는 express 에 내장되어있음.
const bodyParser = require('body-parser')

const app = express();

const port = 2007;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.post('/submit',(req,res) => {
    const {name, year} = req.body;
    res.send(`Name: ${name}, Year: ${year}`)
})

app.listen(port, ()=>{
    console.log(`http://localhost:${port} 에서 실행 중입니다.`);
})