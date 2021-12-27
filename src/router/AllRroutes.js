import {React,Fragment,Component} from "react"
import {Route,Switch} from "react-router-dom"
import Home from "../Components/Home";
import Question from "../Components/Question";
import Quiz from "../Components/Quiz";
import VersionList from "../Components/version/versionListComponents";
import ClassList from "../Components/classes/classListComponent";
import SubjectList from "../Components/subject/subjectListComponent";
class AllRroutes extends Component {
    render() {
        return (
            <Fragment>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/question" component={Question}/>
                    <Route exact path="/quiz" component={Quiz}/>
                    <Route exact path="/version-list" component={VersionList}/>
                    <Route exact path="/class-list" component={ClassList} />
                    <Route exact path="/subject-list" component={SubjectList} />
                </Switch>
            </Fragment>
        );
    }
}

export default AllRroutes;