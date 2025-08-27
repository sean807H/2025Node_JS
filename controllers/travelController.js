
const Travel = require('../models/Travel');


// app2에서 use로 travel를 묶었기때문에 경로를 지워도 된다.
// 전체 게시글 목록 보여주는 페이지
const travelController = {
  getTravelList: async (req, res) => {
    try {
      const travelList = await Travel.findAll();
      res.render('travel', { travelList });
    } catch (err) {
      console.error('데이터베이스 쿼리 실패', err);
      res.status(500).send('Internal Server Error');
    }
  },


  // 여행지 추가를 보여주는 페이지
  getAddTravelForm: (req, res) => {
    res.render('addTravel');
  },

  // 여행지 추가
  addTravel: async (req, res) => {
    const { name } = req.body;
    try {
      await Travel.create({ name });
      // 경로 이동
      res.redirect('/travel')
    } catch (err) {
      console.error('데이터베이스 쿼리 실패: ', err);
      res.status(500).send('Internal Server Error');
    }
  },

  // 게시글의 내용을 읽기
  getTravelDetail: async (req, res) => {
    const travelId = req.params.id;
    try {
      const travel = await Travel.findByPk(travelId)
      if (!travel) {
        res.status(404).send('게시글이 존재하지 않습니다.')
        return;
      }
      res.render('travelDetail', { travel })
    } catch (err) {
      console.error('데이터베이스 쿼리 실패: ', err);
      res.status(500).send('Internal Server Error');
    }
  },

  // 게시글 수정 페이지
  getEditTravelForm: async (req, res) => {
    const travelId = req.params.id;
    try {
      const travel = await Travel.findByPk(travelId);
      if (!travel) {
        res.status(404).send('게시글이 존재하지 않습니다.')
        return;
      }
      res.render('editTravel', { travel })
    } catch (err) {
      console.error('데이터베이스 쿼리 실패: ', err);
      res.status(500).send('Internal Server Error');
    }
  },

  // 게시글 수정
  updateTravel: async (req, res) => {
    const { name } = req.body;
    const travelId = req.params.id;
    try {
      const travel = await Travel.findByPk(travelId);
      if (!travel) {
        res.status(404).send('게시글이 존재하지 않습니다.')
        return;
      }
      await travel.update({ name });
      res.render('updateSuccess')
    } catch (err) {
      console.error('데이터베이스 쿼리 실패: ', err);
      res.status(500).send('Internal Server Error');
    }
  },

  // 게시글 삭제
  deleteTravel: async (req, res) => {
    const travelId = req.params.id;
    try {
      const travel = await Travel.findByPk(travelId);
      if (!travel) {
        res.status(404).send('게시글이 존재하지 않습니다.')
        return;
      }
      await travel.destroy();
      res.render('deleteSuccess')
    } catch (err) {
      console.err('데이터베이스 쿼리 실패', err);
      res.status(500).send('Internal Server Error');
    }
  },
}

// 이런 순서으로 하는게 유지보수하기가 편하다.
module.exports = travelController;