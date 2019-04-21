import React, { Component } from "react";

import "./App.css";
import SmurfForm from "./components/SmurfForm";
import Smurfs from "./components/Smurfs";
import { Route, NavLink, withRouter } from "react-router-dom";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: []
    };
  }
  // add any needed code to ensure that the smurfs collection exists on state and it has data coming from the server
  // Notice what your map function is looping over and returning inside of Smurfs.
  // You'll need to make sure you have the right properties on state and pass them down to props.

  componentDidMount() {
    // console.log("CDM is running");
    axios
      .get(`http://localhost:3333/smurfs`)
      .then(response => {
        console.log("cdm", response);
        this.setState({
          smurfs: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (this.state.smurfs !== prevState) {
  //     axios
  //       .get(`http://localhost:3333/smurfs`)
  //       .then(response => {
  //         console.log("cdm", response);
  //         this.setState({
  //           smurfs: response.data
  //         });
  //       })
  //       .catch(error => {
  //         console.log(error);
  //       });
  //   }
  // }

  postSmurf = smurf => {
    console.log(this.props.history);
    axios
      .post(`http://localhost:3333/smurfs`, smurf)
      .then(response => {
        console.log(response);
        this.setState({
          smurfs: response.data
        });
        this.props.history.push("/");
      })
      .catch(error => {
        console.log(error);
        this.props.history.push("/");
      });
  };

  // resetVillage = data => {
  //   this.setState;
  // };

  render() {
    return (
      <div className="App">
        <div className="navlink">
          <NavLink to="/">Smurfs</NavLink>
          <NavLink to="/smurf-form"> Smurf Form</NavLink>
        </div>
        <Route
          exact
          path="/"
          render={props => (
            <Smurfs
              {...props}
              smurfs={this.state.smurfs}
              postSmurf={this.postSmurf}
            />
          )}
        />
        <Route
          path="/smurf-form"
          render={props => <SmurfForm {...props} postSmurf={this.postSmurf} />}
        />
      </div>
    );
  }
}

export default withRouter(App);
