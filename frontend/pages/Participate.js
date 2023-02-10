import React, { useState } from "react";
import classes from './Participate.module.css';

function  ParticipatePage() {
  const [showMessage, setShowMessage] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
 

  const questions = [
    {
      text: "Do you like sports?",
      options: [
        { id: 0, text: "Yes"},
        { id: 1, text: "No" },
      ],
    },
    {
      text: "What sport do you prefer?",
      options: [
        { id: 0, text: "Football"},
        { id: 1, text: "Basketball"},
        { id: 2, text: "Volleyball" },
        { id: 3, text: "Karate"},
      ],
    },
    {
      text: "What team do you support?",
      options: [
        { id: 0, text: "Aek "},
        { id: 1, text: "Paok"},
        { id: 2, text: "Olympiakos"},
        { id: 3, text: "Panathinaikos"},
      ],
    },
    {
      text: "How many hours do you play sports per week?",
      options: [
        { id: 0, text: "0-2"},
        { id: 1, text: "3-5"},
        { id: 2, text: "5-8"},
        { id: 3, text: "More"},
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

  /* Resets the game back to default */
  const restartGame = () => {
    
    setCurrentQuestion(0);
    setShowMessage(false);
  };

  return (
    <div className="App">
      {/* 1. Header  */}
      <h1>Sports survey</h1>

     

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