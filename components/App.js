import Home from './Home';
import Query from './Query';
import Result from './Result';
import Message from './Message';
import Loading from './Loading';
import React from 'react';
import NavHeader from './NavHeader';
//import Query from './Query';
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Switch
} from 'react-router-dom';

const App = () => { 
    return(
        <div className="container">
            <Router>
                <div>
                    <NavHeader />
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route exact path="/query" component={Query}/>
                        <Route path="/query/result" component={Result}/>
                        <Route render={(match) => {return (<p>Not Found!</p>)} }/>
                    </Switch>
                    <Message />
                    <Loading />
                </div>
            </Router>
        </div>
    );

}
export default App;