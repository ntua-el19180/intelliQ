import SurveyItem from "./SurveyItem.js";
import classes from "./SurveysList.module.css";

function SurveysList(props){
    return <ul className={classes.list}>
        {props.surveys.map(survey => 
            (<SurveyItem 
            key={survey.id} 
            id={survey.id}  
            title={survey.title}
            q1= {survey.q1}
            a11= {survey.a11}
            a12= {survey.a12}
            nq11= {survey.nq11}
            nq12= {survey.nq12}
            q2= {survey.q2}
            a21= {survey.a21}
            a22= {survey.a22}
            nq21= {survey.nq21}
            nq22= {survey.nq22}
            />
             ))}
    </ul>
}
export default SurveysList;