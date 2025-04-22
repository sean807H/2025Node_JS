const express = require('express');
const db = require('../db');

const router = express.Router();

// app2에서 use로 travel를 묶었기때문에 경로를 지워도 된다.
// 전체 게시글 목록 보여주는 페이지
router.get('/', async (req, res) => {
  try {
    const _query = 'SELECT * FROM travellist';
    const [results] = await db.query(_query);
    const travelList = results;
    res.render('travel', { travelList });
  } catch (err) {
    console.error('데이터베이스 쿼리 실패', err);
    res.status(500).send('Internal Server Error');
  }
});

// 여행지 추가를 보여주는 페이지
router.get('/add', (req, res) => {
  res.render('addTravel');
})

// 여행지 추가
router.post('/', async (req, res) => {
  const { name } = req.body;
  try {
    const _query = 'INSERT INTO travellist (name) VALUES (?)';
    await db.query(_query, [name]);
    // 경로 이동
    res.redirect('/travel')
  } catch (err) {
    console.error('데이터베이스 쿼리 실패: ', err);
    res.status(500).send('Internal Server Error');
  }
})

// 게시글의 내용을 읽기
router.get('/:id', async (req, res) => {
  const travelId = req.params.id;
  try {
    const _query = 'SELECT * FROM travellist WHERE id = ?';
    const [results] = await db.query(_query, [travelId]);
    const travel = results[0];
    res.render('travelDetail', { travel })
  } catch (err) {
    console.error('데이터베이스 쿼리 실패: ', err);
    res.status(500).send('Internal Server Error');
  }
});

// 게시글 수정 페이지
router.get('/:id/edit', async (req, res) => {
  const travelId = req.params.id;
  try {
    const _query = 'SELECT * FROM travellist WHERE id = ?';
    const [results] = await db.query(_query, [travelId])
    const travel = results[0];
    res.render('editTravel', { travel })
  } catch (err) {
    console.error('데이터베이스 쿼리 실패: ', err);
    res.status(500).send('Internal Server Error');
  }
})

// 게시글 수정
router.put('/:id', async (req, res) => {
  const { name } = req.body;
  const travelId = req.params.id;
  try {
    const _query = 'UPDATE travellist SET name = ? WHERE id = ?';
    await db.query(_query, [name, travelId]);
    res.render('updateSuccess')
  } catch (err) {
    console.error('데이터베이스 쿼리 실패: ', err);
    res.status(500).send('Internal Server Error');
  }
});

// 게시글 삭제
router.delete('/:id', async (req, res) => {
  const travelId = req.params.id;
  try {
    const _query = 'DELETE FROM travellist WHERE id = ?';
    await db.query(_query, [travelId]);
    res.render('deleteSuccess')
  } catch (err) {
    console.err('데이터베이스 쿼리 실패', err);
    res.status(500).send('Internal Server Error');
  }
})

// 이런 순서으로 하는게 유지보수하기가 편하다.
module.exports = router;