import {React,Fragment,Component} from "react"
import {Route,Switch} from "react-router-dom"
import Home from "../Components/Home";
import Question from "../Components/Question";
import Quiz from "../Components/Quiz";

class AllRroutes extends Component {
    render() {
        return (
            <Fragment>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/question" component={Question}/>
                    <Route exact path="/quiz" component={Quiz}/>
                </Switch>
            </Fragment>
        );
    }
}

export default AllRroutes;