const express = require('express');

const app = express();

const port = 2007;

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.post('/submit',(req,res) => {
    const {name, year} = req.body;
    res.send(`Name: ${name}, Year: ${year}`)
})

app.listen(port, ()=>{
    console.log(`http://localhost:${port} 에서 실행 중입니다.`);
})