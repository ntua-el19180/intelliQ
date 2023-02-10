import { Link } from 'react-router-dom';

import classes from './MainNavigation.module.css';

function MainNavigation (){
    return (
    <header className={classes.header}>
        <div className={classes.logo}>intelliQ</div>
        <nav>
            <ul>
                <li>
                    <Link to ="/">My Surveys</Link>
                </li>
                <li>
                    <Link to ="/new-survey">Create New Survey</Link>
                </li>
                <li>
                    <Link to ="/participate">Participate in a Survey</Link>
                </li>
            </ul>
        </nav>
    </header>
    );
}
export default MainNavigation;