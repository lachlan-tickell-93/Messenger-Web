import * as React from 'react';
import { useEffect } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import "../styles/main.scss"

import { conversationState } from './state/stores/ConversationStore';

import Header from './layout/Header'; 
import Footer from './layout/Footer'; 

import HomePage from './views/HomePage'; 
import SignInPage from './views/SignInPage'; 
import { SignInPageRoute, HomePageRoute } from './routing/routes';
import { ProtectedRoute } from './routing/protectedRoute';

export default function App() {
    const [userLoadAttempt, setUserLoadAttempt] = React.useState(false);

    // Attempt to get the user on initial app load
    useEffect(() => {
        conversationState.getUser().then(() => {
            setUserLoadAttempt(true);
          });
      }, []);
      
    if(userLoadAttempt) {
        return (
            <div className="app-container">
                <Header title="TITLE GOES HERE"/>
    
                <BrowserRouter>
                    <div id="page-wrapper">
                        <main>
                            <Switch>
                                <Route exact path={SignInPageRoute} component={SignInPage} />
                                <ProtectedRoute exact={true} path={HomePageRoute} component={HomePage} />
                            </Switch>
                        </main>
                    </div>
                </BrowserRouter>
    
                <Footer title="FOOTER"/>
                
            </div>
        );
    } else {
        return (<div>Loading...</div>);
    }
}