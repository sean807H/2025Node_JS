const express = require('express');

const router = express.Router();

// 루트 경로 ("/")에 대한 GET 요청을 처리합니다.
router.get('/', (req, res) => {
  res.send('get swag');
});

router.post('/', (req, res) => {
  res.send(req.body);
});

router.post('/:person', (req, res) => {
  res.send(req.params.person);
});

module.exports = router;