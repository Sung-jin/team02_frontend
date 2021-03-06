import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { MainView, Header, SideBar, LoginPopup, HTML_TEST, Enrolment } from "./containers";

const mapStateToProps = state => {
  return {};
};
const mapDispatchToProps = dispatch => ({});

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={MainView} />
          <Route exact path="/header" component={Header} />
          <Route exact path="/sidebar" component={SideBar} />
          <Route exact path="/popup" component={LoginPopup} />
          <Route exact path="/enrolment" component={Enrolment} />

          <Route exact path="/test" component={HTML_TEST} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
