const express = require('express')
const router = express.Router();
const bodyParser = require('body-parser');
const { Diary } = require("../models/Diary");

/* GET. */
router.get('/find', function(req, res, next) {
    // 전체 데이터 가져오기
    Diary.find().then( (diaries) => {
        res.json(diaries)
    }).catch( (err) => {
        console.log(err);
        next(err)
    });
});

router.post('/findOwn', function(req, res, next) {
    console.log(req.body.data.user_id);
    // 전체 데이터 가져오기
    Diary.find().where('user_id').equals(req.body.data.user_id).sort({date: -1}).then( (diaries) => {
        res.json(diaries)
    }).catch( (err) => {
        console.log(err);
        next(err)
    });
});

/* POST*/
router.post('/save', function(req, res) {
    console.log(req.body);
    // 데이터 저장
    var newDiary = new Diary(req.body.data);
    newDiary.save(function(error, data){
        if(error){
            console.log(error);
            return res.json({status: 'fail', error})
        }else{
            console.log('Saved!')
            return res.json({status: 'success'})
        }
    });
});

/* POST*/
router.post('/saveTemp', function(req, res) {
    console.log(req.body);
    // 데이터 저장
    var newDiary = new Diary(req.body.data);
    newDiary.save(function(error, data){
        if(error){
            console.log(error);
            return res.json({status: 'fail', error})
        }else{
            console.log('Saved!')
            return res.json({status: 'success'})
        }
    });
});

//작동하는지 확인 안해봄
router.post('/findOne/', function(req, res, next) {
    console.log(req.body);
    // 특정 아이디값 가져오기
    Diary.findOne({_id:req.body.id}, function(error,diary){
        console.log('--- Read one ---');
        if(error){
            console.log(error);
        }else{
            console.log(diary);
        }
    });
});

router.post('/findPublic', function(req, res, next) {
    // 전체 데이터 가져오기
    Diary.find().where('disclosure').equals('public').sort({date: -1}).then( (diaries) => {
        console.log(diaries);
        res.json(diaries)
    }).catch( (err) => {
        console.log(err);
        next(err)
    });
});

// //작동하는지 확인 안해봄
// router.post('/modify/', function(req, res, next) {
//     console.log(req.body);
//     // 특정아이디 수정하기
//     Diary.findById({_id:req.body.id}, function(error,diary){
//         console.log('--- Update(PUT) ---');
//         if(error){
//             console.log(error);
//         }else{
//             diary.title = '--modified--';
//             diary.save(function(error,modified_diary){
//                 if(error){
//                     console.log(error);
//                 }else{
//                     console.log(modified_diary);
//                 }
//             });
//         }
//     });
// });

router.post('/modify', function(req, res, next) {
    const diary = req.body.data;
    console.log(diary);
    // 데이터 수정
    Diary.findOneAndUpdate({_id: diary._id}, {$set:{user_id:diary.user_id, date:diary.date, title:diary.title, content:diary.content, disclosure:diary.disclosure}}, function(error, data){
        console.log('--- UPDATE ---');
        if(error){
            console.log(error);
        }
        console.log('--- updated ---');
        Diary.findOne({_id: diary._id}, function(error,diary){
            console.log('--- Read one ---');
            if(error){
                console.log(error);
            }else{
                console.log(diary);
                return res.json(diary)
            }
        });
        // return res.json({status: 'fail'})
    });
});

//작동하는지 확인 안해봄
router.post('/delete/', function(req, res, next) {
    console.log(req.body);
    // 삭제
    Diary.deleteOne({_id: req.body.data.id}, function(error,output){
        console.log('--- Delete ---');
        if(error){
            console.log(error);
        }

        /* ( SINCE DELETE OPERATION IS IDEMPOTENT, NO NEED TO SPECIFY )
            어떤 과정을 반복적으로 수행 하여도 결과가 동일하다. 삭제한 데이터를 다시 삭제하더라도, 존재하지 않는 데이터를 제거요청 하더라도 오류가 아니기 때문에
            이부분에 대한 처리는 필요없다. 그냥 삭제 된것으로 처리
            */
        console.log('--- deleted ---');
        return res.json({status: 'success'})
    });
});

module.exports = router;