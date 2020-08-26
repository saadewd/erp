import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import PrivateRoute from "./routing/PrivateRoute";
import { store, persistor } from "./store";
import setAuthToken from "./utils/setAuthToken";
import { loadUser } from "./_actions/auth";
import Login from "./component/Forms/signup/login";
import Dashboard from "./component/Dashboard/Dashboard";
import { PersistGate } from "redux-persist/integration/react";
import "./App.css";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  // useEffect(() => {
  //   store.dispatch(loadUser());
  // }, []);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <div className="App">
            <Switch>
              <Route exact path="/" component={Login} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
            </Switch>
          </div>
        </Router>
      </PersistGate>
    </Provider>
  );
};

export default App;
