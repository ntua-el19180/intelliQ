import { useRef } from "react";
import { useState } from "react";
import Card from "../ui/Card";
import classes from './NewSurveyForm.module.css';
import NewQuestion from "./NewQuestion";
import Axios from "axios";



function NewSurveyForm (){
    const [    quest2IsOpen, setQuest2IsOpen]= useState(false);
    const [    quest3IsOpen, setQuest3IsOpen]= useState(false);
    const [    quest4IsOpen, setQuest4IsOpen]= useState(false);
    const [    quest5IsOpen, setQuest5IsOpen]= useState(false);
    const [    quest6IsOpen, setQuest6IsOpen]= useState(false);
    const [    quest7IsOpen, setQuest7IsOpen]= useState(false);
    const [    quest8IsOpen, setQuest8IsOpen]= useState(false);
    const [    quest9IsOpen, setQuest9IsOpen]= useState(false);
   
    const [questionnaireTitle, setquestionnaireTitle]= useState("")
    const [creatorID, setcreatorID] = useState(0)
    const titleInputRef = useRef();
    const nameInputRef = useRef();

    const addQuestionnaire = () => {
        Axios.post('http://localhost:9103/create_questionnaire', {
            questionnaireTitle : questionnaireTitle, 
            creatorID: creatorID 
        }).then(()=>{
            console.log("success");
        });
    };
   
    const [ buttIsOpen, setButtIsOpen]= useState(true);

    function buttonHandler (){
        setButtIsOpen(false);
    } 
    function quest2Handler(){
        setQuest2IsOpen(true);
    }

    function closeQuest2Handler(){
        setQuest2IsOpen(false);
    }
    function quest3Handler(){
        setQuest3IsOpen(true);
    }

    function closeQuest3Handler(){
        setQuest3IsOpen(false);
    }
    function quest4Handler(){
        setQuest4IsOpen(true);
    }

    function closeQuest4Handler(){
        setQuest4IsOpen(false);
    }
    function quest5Handler(){
        setQuest5IsOpen(true);
    }

    function closeQuest5Handler(){
        setQuest5IsOpen(false);
    }
    function quest6Handler(){
        setQuest6IsOpen(true);
    }

    function closeQuest6Handler(){
        setQuest6IsOpen(false);
    }
    function quest7Handler(){
        setQuest7IsOpen(true);
    }

    function closeQuest7Handler(){
        setQuest7IsOpen(false);
    }
    function quest8Handler(){
        setQuest8IsOpen(true);
    }

    function closeQuest8Handler(){
        setQuest8IsOpen(false);
    }
    function quest9Handler(){
        setQuest9IsOpen(true);
    }

    function closeQuest9Handler(){
        setQuest9IsOpen(false);
    }
   
    function submitHandler(event) {
       
        event.preventDefault();

        const enteredTitle = titleInputRef.current.value;
        const enteredName = nameInputRef.current.value;

        const surveyData={
            title: enteredTitle,
            name: enteredName
          
        };
    }

    return (
        <Card>
            <form className={classes.form} onSubmit={submitHandler}>
                <div  className={classes.control}>
                    <label htmlFor="title">Survey Title</label>
                    <input type="text" required id="title" ref={titleInputRef} onChange= {(event) => {setquestionnaireTitle(event.target.value);}}/>
                </div>
                <div  className={classes.control}>
                    <label htmlFor="name">Creator's ID</label>
                    <input type="number" min="0" step="1" required id="name" ref={nameInputRef} onChange= {(event) => {setcreatorID(event.target.value);}}/>
                </div>
                <div>
                    <NewQuestion/>
                    {quest2IsOpen && <NewQuestion onCancel={closeQuest2Handler}/>}
                    {quest3IsOpen && <NewQuestion onCancel={closeQuest3Handler}/>}
                    {quest4IsOpen && <NewQuestion onCancel={closeQuest4Handler}/>}
                    {quest5IsOpen && <NewQuestion onCancel={closeQuest5Handler}/>}
                    {quest6IsOpen && <NewQuestion onCancel={closeQuest6Handler}/>}
                    {quest7IsOpen && <NewQuestion onCancel={closeQuest7Handler}/>}
                    {quest8IsOpen && <NewQuestion onCancel={closeQuest8Handler}/>}
                    {quest9IsOpen && <NewQuestion onCancel={closeQuest9Handler}/>}
                  
                </div>
                <div className={classes.actions}>
                    <button onClick={!quest2IsOpen? quest2Handler: !quest3IsOpen? quest3Handler : !quest4IsOpen? quest4Handler : !quest5IsOpen? quest5Handler : !quest6IsOpen? quest6Handler: !quest7IsOpen? quest7Handler : !quest8IsOpen? quest8Handler : !quest9IsOpen? quest9Handler : buttonHandler}>Add more questions</button>
                </div>
                <div className={classes.actions}>
                    <button onClick={addQuestionnaire}>Done</button>
                </div>
            </form>
        </Card>
    );
}

export default NewSurveyForm;