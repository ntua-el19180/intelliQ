import classes from './SurveyItem.module.css';
import Card from '../ui/Card';

function SurveyItem (props){
    return (
    <li className={classes.item}>
        <Card>
        <div className={classes.content}>
           <h3>{props.title}</h3>
           <p> {props.q1}</p>
           <p>If you answer {props.a11} jump to question number {props.nq11}</p>
           <p>If you answer {props.a12} jump to question number {props.nq12}</p>
           <p> {props.q2}</p>
           <p>If you answer {props.a21} jump to question number {props.nq21}</p>
           <p>If you answer {props.a22} jump to question number {props.nq22}</p>
        </div>
        <div className={classes.actions}>
            <button>View full survey</button>
        </div>
        </Card>
    </li>
    );
}

export default SurveyItem;