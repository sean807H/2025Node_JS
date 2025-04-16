const express = require('express');
const db = require('../db');

const router = express.Router();

// app2에서 use로 travel를 묶었기때문에 경로를 지워도 된다.
// 전체 게시글 목록 보여주는 페이지
router.get('/', (req, res) => {
  const _query = 'SELECT * FROM travellist';
  db.query(_query, (err, results) => {
    if (err) {
      console.error('데이터베이스 쿼리 실패', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    const travelList = results;
    res.render('travel', { travelList });
  });
});

// 여행지 추가를 보여주는 페이지
router.get('/add', (req, res) => {
  res.render('addTravel');
})

// 여행지 추가
router.post('/', (req, res) => {
  const { name } = req.body;
  const _query = 'INSERT INTO travellist (name) VALUES (?)';
  db.query(_query, [name], (err, results) => {
    if (err) {
      console.error('데이터베이스 쿼리 실패: ', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    // 경로 이동
    res.redirect('/travel')
  });
})

// 게시글의 내용을 읽기
router.get('/:id', (req, res) => {
  const { name } = req.body;
  const travelId = req.params.id;
  const _query = 'SELECT * FROM travellist WHERE id = ?';
  db.query(_query, [travelId], (err, results) => {
    if (err) {
      console.error('데이터베이스 쿼리 실패: ', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    const travel = results[0];
    res.render('travelDetail', { travel })
  });
})

// 게시글 수정 페이지
router.get('/:id/edit', (req, res) => {
  const { name } = req.body;
  const travelId = req.params.id;
  const _query = 'SELECT * FROM travellist WHERE id = ?';
  db.query(_query, [travelId], (err, results) => {
    if (err) {
      console.error('데이터베이스 쿼리 실패: ', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    const travel = results[0];
    res.render('editTravel', { travel })
  });
})

// 게시글 수정
router.put('/:id', (req, res) => {
  const { name } = req.body;
  const travelId = req.params.id;
  const _query = 'UPDATE travellist SET name = ? WHERE id = ?';
  db.query(_query, [name, travelId], (err, results) => {
    if (err) {
      console.error('데이터베이스 쿼리 실패: ', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.render('updateSuccess')
  });
})

// 게시글 삭제
router.delete('/:id', (req, res) => {
  const travelId = req.params.id;
  const _query = 'DELETE FROM travellist WHERE id = ?';
  db.query(_query, [travelId], (err, results) => {
    if (err) {
      console.err('데이터베이스 쿼리 실패', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.render('deleteSuccess');
  })
})

// 이런 순서으로 하는게 유지보수하기가 편하다.
module.exports = router;