import SurveysList from "../component/surveys/SurveysList";
import { useRef, useState } from "react";
import Axios from "axios";
import { calculateNewValue } from "@testing-library/user-event/dist/utils";
import classes from "./Mysurveys.module.css";

const DUMMY_DATA = [
    {
        id: 's1',
        title: 'This is a first survey',
        q1: "Do you like fashion?",
        a11: "Yes",
        a12: "No",
        nq11: "2",
        nq12: "3",
        q2: "What do you prefer?",
        a21: "Pants",
        a22: "Skirts",
        nq21: "3",
        nq22: "4"
      },
      {
        id: 's2',
        title: 'This is a second survey',
        q1: "Do you like football?",
        a11: "Yes",
        a12: "No",
        nq11: "2",
        nq12: "3",
        q2: "What do you prefer?",
        a21: "Aek",
        a22: "Osfp",
        nq21: "3",
        nq22: "4"
      },
];

function MysurveysPage() {
  const [creatorID, setCreatorID ]= useState(0)
  const [questionnaireList, setQuestionnaireList] = useState([]);
  const getQuestionnaires = () => {
    Axios.get('http://localhost:9103/get_questionnaires', {
  }).then((response)=>{
      setQuestionnaireList(response.data)
  });
  };
  const getCreatorID = () => {
    Axios.post('http://localhost:9103/get_questionnaires', {
        creatorID: creatorID
    }).then(()=>{
        console.log("success");
    });
};

const Both = () => {
  getCreatorID();
  getQuestionnaires();
};
  const creatorInputRef = useRef();

    return <section>
        <h1>My surveys</h1>
        <div>
                    <label htmlFor="CreatorID">Choose your Creator ID number:  </label>
                    <input type="number" min= "0" step ="1" required id="CreatorID" onChange= {(event) => {setCreatorID(event.target.value);}}  ref={creatorInputRef}/>
        </div>
        <button onClick={Both}>View Surveys</button>
       {questionnaireList.map((val,key) =>{
        
          return <div className={classes.list}> 
            <div className={classes.title1}> {val.questionnaireTitle} </div>
            <div className={classes.question}>{val.qtext}</div>
            <div className={classes.answer}>{val.opttxt}</div> 
            </div>
       })}
       <SurveysList surveys= {[]}/> 
    </section>;
  }
  
  export default MysurveysPage;