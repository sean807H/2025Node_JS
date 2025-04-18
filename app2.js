const express = require('express')
const path = require('path')
const methodOverride = require('method-override')
const travelRouters = require('./routes/travel')

const app = express();
const port = 2007;

app.use(methodOverride('_method'));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs')

// __dirname : 현재 파일이 속해있는 디렉토리의 절대경로
// path.join : 운영체제에 맞추어 경로지정자(/혹은 \)를 설정해준다
app.set('views', path.join(__dirname, 'views'))
// console.log(__dirname + '\\views');

// const travelList = ['뉴욕','파리','우리집','싱가포르']

// get, post 대신에 다 쓸수있는 use
app.use('/travel', travelRouters);

app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});