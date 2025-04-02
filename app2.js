const express = require('express')
const path = require('path')
const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = 2007;

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect( err => {
    if(err){
        console.log('MYSQL 연결 실패 : ',err);
        return;
    }
    console.log('MYSQL 연결 성공');
    
})

app.set('view engine','ejs')

// __dirname : 현재 파일이 속해있는 디렉토리의 절대경로
// path.join : 운영체제에 맞추어 경로지정자(/혹은 \)를 설정해준다
app.set('views', path.join(__dirname, 'views'))
// console.log(__dirname + '\\views');

// const travelList = ['뉴욕','파리','우리집','싱가포르']

app.get('/travel',(req,res)=>{
    const _query = 'SELECT * FROM travellist';
    db.query(_query, (err, results) => {
        if(err){
            console.error('데이터베이스 쿼리 실패: ',err);
            res.status(500).send('Internal Server Error');
            return;
        }
        const travelList = results;
        res.render('travel',{travelList})
    });
})

app.listen(port, () => {
    console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
  });