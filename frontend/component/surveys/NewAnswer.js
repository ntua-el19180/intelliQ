import { useRef, useState } from "react";
import classes from './NewAnswer.module.css';
import Axios from "axios";

function NewAnswer (props){
    const [opttxt, setopttxt ]= useState("")
    const [nextqID, setnextqID] = useState(0)
    function cancelHandler(){
        props.onCancel();
    }

    const addAnswer = () => {
        Axios.post('http://localhost:9103/create_answer', {
            nextqID : nextqID, 
            opttxt: opttxt 
        }).then(()=>{
            console.log("success");
        });
    };
    
    const answerInputRef = useRef();
    const nextquestionInputRef = useRef();

    function submitHandler(event) {
        event.preventDefault();

        const enteredAnswer = answerInputRef.current.value;
        const enteredNextQuestion = nextquestionInputRef.current.value;

        const answerData={
            answer: enteredAnswer,
            nextquestion: enteredNextQuestion,
          
        };
    }

    return (
            <form className={classes.form} onSubmit={submitHandler}>
                <div  className={classes.control}>
                    <label htmlFor="answer">If you answer</label>
                    <input type="text" required id="answer" ref={answerInputRef} onChange= {(event) => {setopttxt(event.target.value);}}/>
                </div>
                <div  className={classes.control}>
                    <label htmlFor="nextquestion">jump to question number</label>
                    <input type="number" min="1" step="1" required id="nextquestion" ref={nextquestionInputRef} onChange= {(event) => {setnextqID(event.target.value);}}/>
                </div>
                <div>
                    <button  onClick={addAnswer}>Add this answer</button>
                    <button onClick={cancelHandler}>Remove this answer</button>
                </div>
   
            </form>
       
    );
}

export default NewAnswer;