const express = require("express");
const app = express();
const http = require('http');
const port = 9103;
const questionsRouter = require("./routes/questions");
const healthcheckRouter = require("./routes/healthcheck");
const questionnareupdRouter = require('./routes/questionnaire_upd');
var mysql = require("mysql")
const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'intelliq',
  multipleStatements: true
})
const cors = require('cors');
app.use(cors());

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.json({ message: "ok" });
});
app.use("/intelliq_api/questions", questionsRouter);
app.use("/intelliq_api/healthcheck", healthcheckRouter);
app.use("/intelliq_api/questionnaire_upd", questionnareupdRouter);

/* frontend apis */
app.post("/create_questions", (req,res) => {
  const qtext = req.body.qtext;
  const qID = req.body.qID;
  const type = req.body.type;
  const required = req.body.required;

  con.query('INSERT INTO questions (qtext, qID, type, required, questionnaireID) VALUES (?,?, ?, ?, 1)',
   [qtext, qID, type, required], 
   (err, res) => {
      if(err) {
        console.log(err)
      } else{
        res.json({"status":"OK"})
      }
    }
   );
});

app.get('/get_questionnaires', (req,res) => {
  const creatorID = req.body.creatorID;

  con.query('SELECT questionnaire.questionnaireID, questionnaire.questionnaireTitle, questions.qID, questions.qtext,  options.opttxt, options.nextqID FROM questionnaire inner join questions on questions.questionnaireID = questionnaire.questionnaireID inner join options on options.qID = questions.qID where questionnaire.creatorID = 0' , 
  (err,result) => {
    if (err){
    console.log(err);
  } else{
    res.send(result);
  }
})
}); 

app.get('/get_questionnaireTitle', (req,res) => {

  con.query('SELECT questionnaire.questionnaireTitle FROM questionnaire' , 
  (err,result) => {
    if (err){
    console.log(err);
  } else{
    res.send(result);
  }
})
}); 

app.post("/create_answer", (req,res) => {
  const opttxt = req.body.opttxt;
  const nextqID = req.body.nextqID;
 

  con.query('INSERT INTO options (opttxt, nextqID, optID) VALUES (?,?, 4)',
   [opttxt, nextqID], 
   (err, res) => {
      if(err) {
        console.log(err)
      } else{
        res.json({"status":"OK"})
      }
    }
   );
});

app.post("/create_questionnaire", (req,res) => {
  const questionnaireTitle = req.body.questionnaireTitle;
  const creatorID = req.body.creatorID;
 

  con.query('INSERT INTO questionnaire (questionnaireTitle, creatorID, questionnaireID) VALUES (?,?,1)',
   [questionnaireTitle, creatorID], 
   (err, res) => {
      if(err) {
        console.log(err)
      } else{
        res.json({"status":"OK"})
      }
    }
   );
});
/* end of frontent apis */


app.post('/intelliq_api/resetall', (req, res) => {
  //const delid = req.params.id;
  con.query('SET FOREIGN_KEY_CHECKS=0;TRUNCATE TABLE creator;TRUNCATE TABLE options;TRUNCATE TABLE participants;TRUNCATE TABLE questionnaire;TRUNCATE TABLE questionnaireparticipant;TRUNCATE TABLE questions;', (err, result) =>{
      if(err)
  {
      res.json({"status":"failed", "reason":"failed to truncate tables"})
      console.log(err)
  }else{
      res.json({"status":"OK"})
      console.log(result)
  }
  })
})


app.post('/intelliq_api/resetq/:id', (req, res) => {
  const delid = req.params.id;
  con.query('delete from answers where questionnaireID = ?', delid, (err, result) =>{
      if(err)
  {
      res.json({"status":"failed", "reason":"failed to delete options"})
      console.log(err)
  }else{
      res.json({"status":"OK"})
      console.log(result)
  }
  })
})

app.post('/intelliq_api/resetq1/:id', (req, res) => {
  const delid = req.params.id;
  con.query('Update options set participant_id = NULL where questionnaireID = ?', delid, (err, result) =>{
      if(err)
  {
      res.json({"status":"failed", "reason":"failed to delete options"})
      console.log(err)
  }else{
      res.json({"status":"OK"})
      console.log(result)
  }
  })
})

app.get('/intelliq_api/question/:questionnaireID/:questionID', (req, res) => {
  const question_id = req.params.questionID;
  const questionnaire_id = req.params.questionnaireID;
  con.query('SELECT questionnaire.questionnaireID, questions.qID, questions.qtext, questions.required, questions.type, options.optID, options.opttxt, options.nextqID FROM questionnaire inner join questions on questions.questionnaireID = questionnaire.questionnaireID inner join options on options.qID = questions.qID where options.qID = ? and questionnaire.questionnaireID = ?', [question_id, questionnaire_id], function(err, result){
      if(err)
      {
          console.log(err)
      }else{
          res.json(result)
      }
  })
})

app.get('/intelliq_api/questionnaire/:questionnaireID', (req, res) => {

  const questionnaire_id = req.params.questionnaireID;
  con.query('SELECT questionnaire.questionnaireID, questions.qID, questions.qtext, questions.required, questions.type, options.optID, options.opttxt, options.nextqID FROM questionnaire inner join questions on questions.questionnaireID = questionnaire.questionnaireID inner join options on options.qID = questions.qID where questionnaire.questionnaireID = ?',  questionnaire_id, function(err, result){
      if(err)
      {
          console.log(err)
      }else{
          res.json(result)
      }
  })
})

app.post('/intelliq_api/doanswer/:questionnaireID/:questionID/:session/:optionID', (req, res) => {
  const question_id = req.params.questionID;
  const questionnaire_id = req.params.questionnaireID;
  const session_id = req.params.session;
  const option_id = req.params.optionID;
  con.query('INSERT INTO intelliq.`answers` (session, qID, optID, questionnaireID) VALUES (?, ?, ?, ?);', [session_id, question_id, option_id, questionnaire_id], function(err, result){
      if(err)
      {
          console.log(err)
      }else{
          res.json(result)
      }
  })
})


app.get('/intelliq_api/getsessionanswers/:questionnaireID/:session', (req, res) => {
  const session_id = req.params.session;
  const questionnaire_id = req.params.questionnaireID;
  con.query('SELECT answers.questionnaireID, answers.session, answers.qID, answers.optID as ans FROM answers where answers.questionnaireID = ? and answers.session = ?', [questionnaire_id, session_id], function(err, result){
      if(err)
      {
          console.log(err)
      }else{
          res.json(result)
      }
  })
})

app.get('/intelliq_api/getquestionanswers/:questionnaireID/:questionID', (req, res) => {
  const question_id = req.params.questionID;
  const questionnaire_id = req.params.questionnaireID;
  con.query('SELECT answers.questionnaireID, answers.qID, answers.session, answers.optID as ans FROM answers where answers.questionnaireID = ? and answers.qID = ?', [questionnaire_id, question_id], function(err, result){
      if(err)
      {
          console.log(err)
      }else{
          res.json(result)
      }
  })
})


/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
