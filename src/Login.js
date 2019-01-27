import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import React, { Component } from "react";
import axios from "axios";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      success: false,
      message: "",
      colour: "green",
      name: null
    };
  }

  handleClick(event) {
    var apiBaseUrl = "http://localhost:4000/api/";
    var self = this;

    var payload = {
      email: this.state.username,
      password: this.state.password
    };
    if (this.state.username !== "" && this.state.password !== "") {
      axios
        .post(apiBaseUrl + "login", payload)

        .then(function(response) {
          console.log(response);
          if (response.data.code == 200) {
            console.log("Login successfull");
            self.setState({
              success: true,
              message: "Login Successfull",
              colour: "green"
            });
            //  var uploadScreen=[];
            //  uploadScreen.push(<UploadScreen appContext={self.props.appContext}/>)
            //  self.props.appContext.setState({loginPage:[],uploadScreen:uploadScreen})
            // alert("Login Successfull");
          } else if (response.data.code == 204) {
            console.log("Username password do not match");
            // alert("username password do not match");
            self.setState({
              success: true,
              message: "username password do not match",
              colour: "red"
            });
          } else {
            console.log("Username does not exists");
            // alert("Username does not exist");
            self.setState({
              success: true,
              message: "Username does not exists",
              colour: "red"
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });

      console.log("-----------");
    } else {
      console.log("else came");
    }
  }

  render() {
    return (
      <div>
        <form>
          <MuiThemeProvider>
            <div>
              <AppBar title="Login" />

              <TextField
                errorText={
                  this.state.username.length > 0
                    ? ""
                    : "Please Enter the username"
                }
                required={true}
                hintText="Enter your Username"
                floatingLabelText="Username"
                onChange={(event, newValue) =>
                  this.setState({ username: newValue }, () => {
                    console.log("new value", newValue);
                  })
                }
              />
              <br />
              <TextField
                errorText={
                  this.state.password.length > 0
                    ? ""
                    : "Please Enter the Password"
                }
                required={true}
                type="password"
                hintText="Enter your Password"
                floatingLabelText="Password"
                onChange={(event, newValue) =>
                  this.setState({ password: newValue }, () => {
                    console.log("pass", this.state.password);
                  })
                }
              />
              <br />
              <RaisedButton
                label="Submit"
                primary={true}
                style={style}
                onClick={event => this.handleClick(event)}
              />
            </div>
            {this.state.success ? (
              <div
                style={{
                  background: this.state.colour,
                  width: "45vh",
                  textalign: "center",
                  height: "5vh",
                  borderradius: "10px",
                  color: "white",
                  bottom: "0px"
                }}
              >
                <span>{this.state.message}</span>{" "}
              </div>
            ) : (
              ""
            )}
          </MuiThemeProvider>
        </form>
      </div>
    );
  }
}
const style = {
  margin: 15
};
export default Login;
