import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Home from '../../pages/Home';
import Event from '../../pages/Event';
import QuiSommesNous from '../../pages/QuiSommesNous';
import Contact from '../../pages/Contact';


const index = () => {
    return (
    <Router>
        <Switch>
<Route path="/" exact component={Home}/>
<Route path="/event" exact component={Event}/>
<Route path="/qui-sommes-nous" exact component={QuiSommesNous}/>
<Route path = "/contact" exact component={Contact}/>
<Redirect to="/" />
        </Switch>
    </Router>
    );
};

export default index;