import { useRef } from "react";
import { useState } from "react";
import Axios from "axios";
import Dropdown from "./Dropdown";
import Card from "../ui/Card";
import classes from './NewQuestion.module.css';
import NewAnswer from "./NewAnswer";
import { stripBasename } from "@remix-run/router";

const options1 =[
    { value: "1", label: "True"},
    { value: "0", label:"False"}
];
const options2 =[
    { value: "profile", label: "Profile"},
    { value: "question", label:"Question"}
];


function NewQuestion (props){

  const [qtext, setQtext ]= useState("")
  const [qID, setQID] = useState(0)
  const [type, setType] = useState("profile")
  const [required, setRequired] = useState(0)


    function cancelHandler(){
        props.onCancel();
    }

    const [    answerThreeIsOpen, setAnswerThreeIsOpen]= useState(false);
    const [    answerFourIsOpen, setAnswerFourIsOpen]= useState(false);
    const [    answerFiveIsOpen, setAnswerFiveIsOpen]= useState(false);
    const [    buttIsOpen, setButtIsOpen]= useState(true);

    function buttonHandler (){
        setButtIsOpen(false);
    } 
   

    function answerThreeHandler(){
        setAnswerThreeIsOpen(true);
    }

    function closeAnswerThreeHandler(){
        setAnswerThreeIsOpen(false);
    }

    function answerFourHandler(){
        setAnswerFourIsOpen(true);
    }

    function closeAnswerFourHandler(){
        setAnswerFourIsOpen(false);
    }

    function answerFiveHandler(){
        setAnswerFiveIsOpen(true);
    }

    function closeAnswerFiveHandler(){
        setAnswerFiveIsOpen(false);
    }



    const questionInputRef = useRef();
    const questionnumberInputRef = useRef();
    
    
    

    function submitHandler(event) {
        event.preventDefault();

        const enteredQuestion = questionInputRef.current.value;
        const enteredQuestionNumber = questionnumberInputRef.current.value;

        const questionData={
            question: enteredQuestion,
            questionnumber: enteredQuestionNumber,
        };
    }

    const addQuestion = () => {
        Axios.post('http://localhost:9103/create_questions', {
            qID : qID, 
            qtext: qtext ,
            type: type,
            required: required
        }).then(()=>{
            console.log("success");
        });
    };

    return (
        <Card>
            <form className={classes.form} onSubmit={submitHandler}>
            <div  className={classes.controlnumber}>

                    <label htmlFor="questionnumber">Add the question's number</label>
                    <input type="number" min="1" step="1" required id="questionnumber" ref={questionnumberInputRef}
                    onChange= {(event) => {setQID(event.target.value);}}/>
            </div>
                <div  className={classes.control}>
                    <label htmlFor="question">Add the question</label>
                    <input type="text" required id="question" ref={questionInputRef}
                    onChange= {(event) => {setQtext(event.target.value);}}/>
                </div>
                
                
                <Dropdown placeHolder="Type" options={options2} onClick = {(event) => {setType(event.target.value);}}/>
                <tr>
                <Dropdown placeHolder="Required" options={options1} onClick = {(event) => {setRequired(event.target.value);}} />
                </tr>
                <NewAnswer/>
                <NewAnswer/>
                {answerThreeIsOpen && <NewAnswer onCancel={closeAnswerThreeHandler}/>}
                {answerFourIsOpen && <NewAnswer onCancel={closeAnswerFourHandler}/>}
                {answerFiveIsOpen && <NewAnswer onCancel={closeAnswerFiveHandler}/>}
                <div className={classes.actionssmaller}>
                    <button onClick={addQuestion}>Add this question</button>
                    <button onClick={cancelHandler}>Remove this question</button>
                </div>
               {buttIsOpen && <button onClick={!answerThreeIsOpen? answerThreeHandler : (answerThreeIsOpen && !answerFourIsOpen) ? answerFourHandler : (answerThreeIsOpen && answerFourIsOpen && !answerFiveIsOpen) ? answerFiveHandler : buttonHandler }>Add more answers</button>}
            </form>
        </Card>
    );
}

export default NewQuestion;