import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import AppRouter, {history} from "./routers/AppRouter";
import configureStore from './store/configureStore';
import { startSetExpense } from "./actions/expenses";
import 'normalize.css/normalize.css';
import "./styles/styles.scss";
import 'react-dates/lib/css/_datepicker.css';
import {auth} from './firebase/firebase';
import {onAuthStateChanged} from 'firebase/auth';
import {login, logout} from './actions/auth';
import LoadingPage from './components/LoadingPage';

const store = configureStore();

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
    
)

let hasRendered = false;
const renderApp = () =>{
    if(!hasRendered){
        ReactDOM.render(jsx, document.getElementById("app"));
        hasRendered = true;
    }
}

ReactDOM.render(<LoadingPage/>, document.getElementById("app"));


onAuthStateChanged(auth,(user) => {
    if(user){
        store.dispatch(login(user.uid))
        store.dispatch(startSetExpense()).then(()=>{
            renderApp();
            if (history.location.pathname == '/'){
                history.push('/dashboard');
                
            }
        })
    }else{
        store.dispatch(logout())
        renderApp();
        history.push('/');
        
    }
})

