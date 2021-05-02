import "./styles.css";
import {
  Redirect,
  Route,
  Router,
  Switch,
  BrowserRouter
} from "react-router-dom";
import { Login } from "./components/Login/index";
import { Customers } from "./components/Customers/index";
import { SingleCustomer } from "./components/Customers/SingleCustomer";
import { history } from "./history";
import { Provider } from "react-redux";
import { store } from "./store";
import React from "react";

const RenderRoutes: React.FC<{}> = () => (
  <Switch>
    <Route path="/login" component={Login}></Route>
    <Route path="/customers" component={Customers}></Route>
    <Route path="/adduser" component={SingleCustomer}></Route>
    <Route path="/edituser/:id" component={SingleCustomer}></Route>
    <Route exact path="/" render={() => <Redirect to="/login" />} />
  </Switch>
);

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <RenderRoutes />
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
