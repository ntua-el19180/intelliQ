const express = require('express');
const router = express.Router();
const questionnaires = [
    {
        "questionnaireID": "0",
        "questionnaireTitle": "My first research questionnaire",
        "questions": [
        {
        "qID ": "P00",
        "qtext": "Ποιο είναι το mail σας;",
        "required": "FALSE",
        "type": "profile",
        "options": [
        {
        "optID": "P00TXT",
        "opttxt": "<open string>",
        "nextqID": "P01"
        }
        ]
        },
        {
        "qID ": "P01",
        "qtext": "Ποια είναι η ηλικία σας;",
        "required": "TRUE",
        "type": "profile",
        "options": [
        {
        "optID": "P01A1",
        "opttxt": "<30",
        "nextqID": "Q01"
        },
        {
        "optID": "P01A2",
        "opttxt": "30-50",
        "nextqID": "Q01"
        },
        {
        "optID": "P01A3",
        "opttxt": "50-70",
        "nextqID": "Q01"
        },
        {
        "optID": "P01A4",
        "opttxt": ">70",
        "nextqID": "Q01"
        }
        ]
        },
        {
        "qID ": "Q01",
        "qtext": "Ποιο είναι το αγαπημένο σας χρώμα;",
        "required": "TRUE",
        "type": "question",
        "options": [
        {
        "optID": "Q01A1",
        "opttxt": "Πράσινο",
        "nextqID": "Q02"
        },
       
       {
        "optID": "Q01A2"
       ,
        "opttxt":"Κόκκινο"
       ,
        "nextqID": "Q02"
        },
       
       {
        "optID": "Q01A3"
       ,
        "opttxt":"Κίτρινο"
       ,
        "nextqID": "Q02"
       
       }
       
       ]
        },
       
       {
        "qID ": "Q02"
       ,
        "qtext":
       "Ασχολείστε με το ποδόσφαιρο;"
       ,
        "required": "TRUE"
       ,
        "type": "question"
       ,
        "options": [
       
       {
        "optID": "Q02A1"
       ,
        "opttxt":"Ναι"
       ,
        "nextqID": "Q03"
        },
       
       {
        "optID": "Q02A2"
       ,
        "opttxt":"Οχι"
       ,
        "nextqID": "Q04"
       
       }
       
       ]
        },
       
       {
        "qID ": "Q03"
       ,
        "qtext":
       "Τι ομάδα είστε;"
       ,
        "required": "TRUE"
       ,
        "type": "question"
       ,
        "options": [
       
       {
        "optID": "Q03A1"
       ,
        "opttxt":
       "Παναθηναϊκός",
        "nextqID": "Q04"
        },
       
       {
        "optID": "Q03A2"
       ,
        "opttxt":
       "Ολυμπιακός "
       ,
        "nextqID": "Q04"
        },
       
       {
        "optID": "Q03A3"
       ,
        "opttxt":"ΑΕΚ",
        "nextqID": "Q04"
       
       }
       
       ]
        },
       
       {
        "qID ": "Q04"
       ,
        "qtext":
       "Έχετε ζήσει σε νησί;"
       ,
        "required": "TRUE"
       ,
        "type": "question"
       ,
        "options": [
       
       {
        "optID": "Q04A1"
       ,
        "opttxt":"Ναι",
        "nextqID": "Q05"
        },
        {
        "optID": "Q04A2",
        "opttxt": "Οχι",
        "nextqID": "Q06"
        }
        ]
        },
        {
        "qID ": "Q05",
        "qtext": "Με δεδομένο ότι απαντήσατε [*Q04A1] στην ερώτηση [*Q04]: Ποια η σχέση σας με το θαλάσσιο σκι;",
        "required": "TRUE",
        "type": "question",
        "options": [
        {
        "optID": "Q05A1",
        "opttxt": "Καμία",
        "nextqID": "Q07"
        },
        {
        "optID": "Q05A2",
        "opttxt": "Μικρή",
        "nextqID": "Q07"
        },
        {
        "optID": "Q05A3",
        "opttxt": "Μεγάλη",
        "nextqID": "Q07"
        }
        ]
        }
        ]
       }
]
router.get('/',(req,res)=>{
    console.log(questionnaires);
    res.send(questionnaires);
});

router.post('/',async function (req,res){
//push questionnaire
    const questionnaire = req.body;
    questionnaires.push(questionnaire);
    res.send('Questionnaire with id ${questionnaire.questionnaireID} added to the database');
});

module.exports = router;