import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import axios from "axios";
import Login from "./Login";
import { Snackbar } from "material-ui";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      errorMessage: ""
    };
  }
  handleClick(event) {
    var apiBaseUrl = "http://localhost:4000/api/";
    console.log(
      "values",
      this.state.first_name,
      this.state.last_name,
      this.state.email,
      this.state.password
    );
    //To be done:check for empty values before hitting submit
    var self = this;
    var payload = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      password: this.state.password
    };
    axios
      .post(apiBaseUrl + "/register", payload)
      .then(function(response) {
        console.log(response);
        if (response.data.code == 200) {
          //  console.log("registration successfull");
          var loginscreen = [];
          loginscreen.push(<Login parentContext={this} />);
          var loginmessage = "Not Registered yet.Go to registration";
          self.props.parentContext.setState({
            loginscreen: loginscreen,
            loginmessage: loginmessage,
            buttonLabel: "Register",
            isLogin: true
          });
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  handleChange() {
    if (this.state.first_name.length == "") {
      this.setState({
        errorMessage: "please fill name"
      });
      return false;
    }
  }
  render() {
    let toottipPop = "kb-tt-err kb-tt-err-hover ";
    return (
      <div>
        <MuiThemeProvider>
          <div>
            <AppBar title="Register" />
            <TextField
              hintText="Enter your First Name"
              floatingLabelText="First Name"
              onChange={(event, newValue) =>
                this.setState({ first_name: newValue })
              }
            />
            {/* <Snackbar
              message={"please fill the first name"}
              open={true}
              onChange={() => this.handleChange()}
            /> */}

            <span onChange={() => this.handleChange()}>
              {this.state.errorMessage}
            </span>

            <br />
            <TextField
              hintText="Enter your Last Name"
              floatingLabelText="Last Name"
              onChange={(event, newValue) =>
                this.setState({ last_name: newValue })
              }
            />
            <br />
            <TextField
              hintText="Enter your Email"
              type="email"
              floatingLabelText="Email"
              onChange={(event, newValue) => this.setState({ email: newValue })}
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
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}
const style = {
  margin: 15
};

// class Register extends Component {
//     constructor(props){
//       super(props);
//       this.state={
//         name:'',
//         email:'',
//         password:''
//       }
//     }
//     handleClick(event){
//       var apiBaseUrl = "https://mk-api.herokuapp.com/resume/auth";
//       console.log("values",this.state.name,this.state.email,this.state.password);
//       //To be done:check for empty values before hitting submit
//       var self = this;
//       var payload={
//       "name": this.state.name,
//       "email":this.state.email,
//       "password":this.state.password
//       }
//       axios.post(apiBaseUrl+'/register', payload)
//     //  .then(function (response) {
//     //    console.log(response);
//     //    if(response.data.code == 200){
//     //     //  console.log("registration successfull");
//     //      var loginscreen=[];
//     //      loginscreen.push(<Login parentContext={this}/>);
//     //      var loginmessage = "Not Registered yet.Go to registration";
//     //      self.props.parentContext.setState({loginscreen:loginscreen,
//     //      loginmessage:loginmessage,
//     //      buttonLabel:"Register",
//     //      isLogin:true
//     //       });
//     //    }
//     //  })
//      .catch(function (error) {
//        console.log(error);
//      });
//     }
//     render() {
//       return (
//         <div>
//           <MuiThemeProvider>
//             <div>
//             <AppBar
//                title="Register"
//              />
//              {/* <TextField
//                hintText="Enter your First Name"
//                floatingLabelText="First Name"
//                onChange = {(event,newValue) => this.setState({first_name:newValue})}
//                /> */}
//              <br/>
//              <TextField
//                hintText="Enter your Name"
//                floatingLabelText="Name"
//                onChange = {(event,newValue) => this.setState({last_name:newValue})}
//                />
//              <br/>
//              <TextField
//                hintText="Enter your Email"
//                type="email"
//                floatingLabelText="Email"
//                onChange = {(event,newValue) => this.setState({email:newValue})}
//                />
//              <br/>
//              <TextField
//                type = "password"
//                hintText="Enter your Password"
//                floatingLabelText="Password"
//                onChange = {(event,newValue) => this.setState({password:newValue})}
//                />
//              <br/>
//              <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
//             </div>
//            </MuiThemeProvider>
//         </div>
//       );
//     }
//   }
//   const style = {
//     margin: 15,
//   };
export default Register;
