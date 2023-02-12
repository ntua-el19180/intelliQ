import React, { useState } from "react";
import classes from './Participate.module.css';
import Axios from "axios";
function  ParticipatePage() {
  const [showMessage, setShowMessage] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
 

  const questions = [
    {
      text: "What is your age?",
      options: [
        { id: 0, text: "<30"},
        { id: 1, text: "30-50" },
        { id: 2, text: "50-70" },
        { id: 3, text: ">70" },
      ],
    },
    {
      text: "What is your marital status?",
      options: [
        { id: 0, text: "Married"},
        { id: 1, text: "Single"},
        { id: 2, text: "Widowed" },
        { id: 3, text: "Divorced"},
      ],
    },
    {
      text: "What is the main current source of income of the household?",
      options: [
        { id: 0, text: "No income"},
        { id: 1, text: "Casual labor"},
        { id: 2, text: "Permanent job"},
        { id: 3, text: "Other"},
      ],
    },
    {
      text: "Do you have any children living with you?",
      options: [
        { id: 0, text: "Yes"},
        { id: 1, text: "No"},
      ],
    },
    {
      text: "How old are they?",
      options: [
        { id: 0, text: ">=6"},
        { id: 1, text: "<6"},
      ],
    },
    {
      text: "Who takes care of them?",
      options: [
        { id: 0, text: "Parents"},
        { id: 1, text: "Mother"},
        { id: 2, text: "Father"},
        { id: 3, text: "Other"},
      ],
    },
  ];

  // Helper Functions

  /* A possible answer was clicked */
  const optionClicked = (isCorrect) => {
    // Increment the score
   
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowMessage(true);
    }
  };


  const [questionnaireTitlesList, setQuestionnaireTitlesList] = useState([]);
  const getQuestionnairesTitles = () => {
    Axios.get('http://localhost:9103/get_questionnaireTitle', {
  }).then((response)=>{
      setQuestionnaireTitlesList(response.data)
  });
  };
  /* Resets the game back to default */
  const restartGame = () => {
    
    setCurrentQuestion(0);
    setShowMessage(false);
  };

  return (
    <div className="App">
      {getQuestionnairesTitles}
      {questionnaireTitlesList.map((val,key) =>{
        
        return <div className={classes.list}> 
          <div className={classes.title1}> {val.questionnaireTitle} </div>
          </div>
     })}
      <h1> {questionnaireTitlesList} </h1>

     

      {showMessage ? (
        /* 4. Final Results */
        <div className="final-results">
          <h1>Thank you for the participation!</h1>
          <button className={classes.button1} onClick={() => restartGame()}>Redo the survey</button>
        </div>
      ) : (
        /* 5. Question Card  */
        <div className={classes.questioncard}>
          {/* Current Question  */}
          <h2>
            Question: {currentQuestion + 1} out of {questions.length}
          </h2>
          <h3 className={classes.questiontext1}>{questions[currentQuestion].text}</h3>

          {/* List of possible answers  */}
          <ul className={classes.ul1}>
            {questions[currentQuestion].options.map((option) => {
              return (
                <li className={classes.li1}
                  key={option.id}
                  onClick={() => optionClicked()}
                >
                  {option.text}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
  }
  
  export default ParticipatePage;
