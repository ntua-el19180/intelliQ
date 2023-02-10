const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT * FROM questions LIMIT ${offset},${config.listPerPage}`
  );
  const questionnaire = await db.query(
    'SELECT * FROM questionnaire'
  );
  const questions = helper.emptyOrRows(rows);
 

  return {
    questionnaire,
    questions
  }
}


async function create(question){
  const result = await db.query(
    `INSERT INTO questions 
    (qID, qtext) 
    VALUES 
    (${question.qID}, ${question.qtext})`
  );

  let message = 'Error in creating question';

  if (result.affectedRows) {
    message = ' Question created successfully';
  }

  return {message};
}

  module.exports = {
    getMultiple
  }


