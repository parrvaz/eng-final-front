import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import Forms from "./components/forms";
import FormDetails from "./components/formDetails";
import Response from "./components/response";
import Area from "./components/area";
import FormsCC from "./components/formsCC";

import "./App.css";
import "antd/dist/antd.css";

class App extends Component {
  render() {
    return (
      <div>
        <div className="content">
          <Switch>
            <Route path="/controlCenter/forms/:id/:area" component={Area} />
            <Route path="/fieldAgent/forms/:id" component={FormDetails} />
            <Route
              path="/fieldAgent/forms"
              render={(props) => <Forms {...props} />}
            />
            <Route path="/controlCenter/forms/:id" component={Response} />
            <Route
              path="/controlCenter/forms"
              render={(props) => <FormsCC {...props} />}
            />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
