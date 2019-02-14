import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import { bindActionCreators } from "redux";

import React, { Component } from "react";
import * as employeeListDetails from "../src/actions/login";
import { connect, Provider } from "react-redux";
import axios from "axios";

function mapStateToProps(store) {
  // console.log("---sot", store);
  return {
    employeeList: store.login.employeeList //store.reducer.reducername
  };
}

function mapDispatchToProps(dispatch) {
  // return { actions: bindActionCreators(loadboardAct, dispatch) };
  let actions = bindActionCreators({ employeeListDetails });
  return { ...actions, dispatch };
}

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      EmailId: "",
      username: "",
      password: "",
      data: [],
      Listing: []
    };
  }
  handleClick(event) {}

  componentDidMount() {
    var data = [];
    data.push(data);
    this.props.dispatch(employeeListDetails.getEmployee(data));
  }
  componentWillReceiveProps(nextprops) {
    console.log("----------", nextprops.employeeList.results);
    var data = [];
    var self = this;
    if (nextprops.employeeList.code === 200) {
      // this.setState({
      //   username: "durgaprasad",
      //   password: "durgaprs"
      // });
      console.log("success", nextprops.employeeList.code);
    }
    var self = this;
    if (nextprops.employeeList.results) {
      // console.log("emaiilllll", nextprops.employeeList.results[1].EmailId);
      for (var i = 0; i < nextprops.employeeList.results.length; i++) {
        // console.log("testtttttttt");
        // this.setState({
        //   EmailId: nextprops.employeeList.results[i].EmailId,
        //   UserName: nextprops.employeeList.results[i].UserName
        // });
        // this.setState({
        //   username: "durgaprasad",
        //   password: "durgaprs"
        // });
        let Listing = {
          email: nextprops.employeeList.results[i].EmailId,
          UserName: nextprops.employeeList.results[i].UserName
        };

        // lastName: nextprops.employeeList.results[i].lastName
        data.push(Listing);
        // console.log("respn", nextprops.employeeList.results[i].UserName);
        // console.log("dttttttt", Listing);
        console.log("Emaild", nextprops.employeeList.results[i].UserName);
        self.setState({
          data: data
        });
      }
    }
    console.log(
      "respn=============",
      nextprops.employeeList.results
        ? nextprops.employeeList.results[1].EmailId
        : ""
    );
  }

  render() {
    // var { data } = this.state;
    // console.log("datttttttttt", data);
    return (
      <div>
        <MuiThemeProvider>
          <div>
            <AppBar title="Login" />
            <TextField
              hintText="Enter your Username"
              floatingLabelText="Username"
              onChange={(event, newValue) =>
                this.setState({ username: newValue })
              }
              value={this.state.username}
            />
            <br />
            <TextField
              type="password"
              hintText="Enter your Password"
              floatingLabelText="Password"
              onChange={(event, newValue) =>
                this.setState({ password: newValue })
              }
            />
            <br />
            <RaisedButton
              label="Submit"
              primary={true}
              style={style}
              onClick={event => this.handleClick(event)}
            />

            <ul>
              {this.state.data.map((items, index) => {
                return (
                  <div key={index}>
                    <span>{items.email}</span>&nbsp;&nbsp;&nbsp;
                    <span>{items.UserName}</span>&nbsp;&nbsp;&nbsp;
                    {/* <span>{items.lastName}</span> */}
                  </div>
                );
              })}
            </ul>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}
const style = {
  margin: 15
};
// export default Login;
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
