import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router , Route, Switch} from "react-router-dom";

import HeaderComponent from './components/HeaderComponent/HeaderComponent'
import DoctorDetail from './components/DoctorDetail/DoctorDetail';
import DoctorTiming from './components/DoctorTiming/DoctorTiming';
import PageNotFoundComponent from './components/PageNotFound/PageNotFoundComponent';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <Fragment>
                <Router>
					<header id="mainHeader">
						<HeaderComponent/>
					</header>
					{/* <ToastContainer /> */}
					<main id="mainDiv" className="container">
						<Switch>
							<Route path="/" exact component={DoctorDetail} />
							<Route path="/edit-doctor-info" exact component={DoctorDetail} />
							<Route path="/edit-doctor-timing" exact component={DoctorTiming} />
							<Route path="**" component={PageNotFoundComponent} />
						</Switch>
					</main>
				</Router>
            </Fragment>
         );
    }
}
 
export default App;