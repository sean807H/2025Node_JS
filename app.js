// http 모듈을 불러옵니다.
const http = require('http');

// 서버를 생성합니다.
const server = http.createServer((req, res) => {    // 함수안에 함수 = 콜백함수(CallBack) - 어떤 이벤트가 발생한 후, 수행될 함수를 의미

// HTTP 헤더 설정
res.writeHead(200, { 'Content-Type': 'text/plain' });   // 200대 성공/MIME



// 응답 본문을 보냅니다.
res.end('Hello, World!\n');
});

// 기존 8080 포트를 3000으로 변경
server.listen(3000, () => {
    console.log('서버가 http://localhost:3000 에서 실행 중입니다.');
  });
  
// Domain Name Service

// express 모듈을 불러옵니다.
const express = require('express');

// express 애플리케이션을 생성합니다.
const app = express();

// 루트 경로 ("/")에 대한 GET 요청을 처리합니다.
app.get('/', (req, res) => {
  res.send('Hello, World!');  // 응답 본문으로 'Hello, World!'를 보냅니다.
});

// 3000 포트에서 서버를 실행합니다.
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});

  
