import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
// import RaisedButton from "material-ui/RaisedButton";
import AppBar from "material-ui/AppBar";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import axios from "axios";
import { lifecycle } from "recompose";
import { Snackbar } from "material-ui";

class EmailLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailId: "",
      Listing: [],
      opensnackbar: false,
      EmailAct: "",
      data: []
    };
  }
  handleClick = event => {
    var apiBaseUrl = "http://surya-interview.appspot.com";
    //To be done:check for empty values before hitting submit
    var self = this;
    var payload = {
      emailId: this.state.emailId
    };
    axios
      .post(apiBaseUrl + "/list", payload)
      .then(function(response) {
        console.log(response);

        if (response.status == 200) {
          //   var Listing = [];
          var data = [];
          for (var i = 0; i < response.data.items.length; i++) {
            let Listing = {
              email: response.data.items[i].emailId,
              firstName: response.data.items[i].firstName,
              lastName: response.data.items[i].lastName
            };
            data.push(Listing);
            console.log("respn", response.data.items[i].firstName);
            console.log("respn", response.data.items[i].lastName);
            console.log("respn", response.data.items[i].emailId);
            console.log(data);
            if (i === response.data.items.length - 1) {
              console.log("aaaaaaaaaaaaa");
              self.setState({
                data: data
              });
            }
            // Listing.push(response.data.items[i].emailId);
          }

          //   //  console.log("registration successfull");
          //   //   var loginscreen = [];
          //   //   loginscreen.push(<Login parentContext={this} />);
          //   //   var loginmessage = "Not Registered yet.Go to registration";
          //   self.props.parentContext.setState({
          //     // Listing: Listing,
          //     Listing: data,
          //     opensnackbar: true,
          //     EmailAct: "Successfull"
          //     //   //     loginscreen: loginscreen,
          //     //   //     loginmessage: loginmessage,
          //     //   //     buttonLabel: "Register",
          //     //   //     isLogin: true
          //   });
          console.log("response=============");
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  };
  //   componentWillReceiveProps(nextprops) {
  //     console.log("***********", nextprops.data.items.emailId);
  //   }

  //   dataRes = () => {
  //     let str = [];
  //     this.state.data.map((items, index) => {
  //       let a = (
  //         <div key={index}>
  //           <span>{items.emailId}</span>
  //         </div>
  //       );
  //       str.push(a);
  //     });
  //     // str = str.push(a);
  //     return str;
  //   };
  render() {
    // let re = "";
    // re = this.state.data.map((items, index) => {
    //   return (
    //     <div key={index}>
    //       <span>{items.emailId}</span>
    //     </div>
    //   );
    // });
    // console.log(re);
    // console.log("re");

    return (
      <div>
        <MuiThemeProvider>
          <AppBar title="Email Id" />
          <p>Email Login</p>
          <TextField
            hintText="Enter your Email Id"
            floatingLabelText="Email Id"
            onChange={(event, newValue) => this.setState({ emailId: newValue })}
          />
          <br />
          <RaisedButton
            label="Submit"
            primary={true}
            style={style}
            onClick={event => this.handleClick(event)}
          />
          {this.state.data.map((items, index) => {
            return (
              <div key={index}>
                <span>{items.email}</span>&nbsp;&nbsp;&nbsp;
                <span>{items.firstName}</span>&nbsp;&nbsp;&nbsp;
                <span>{items.lastName}</span>
              </div>
            );
          })}
          {/* <div>
            {this.state.Listing.map(function(items, key) {
              return items;
            })}
          </div> */}
          {/* {re} */}
          {/* <table>
            <tbody>{a}</tbody>
          </table> */}
          <Snackbar
            open={this.state.opensnackbar}
            message={this.state.EmailAct}
            type="primary"
          />
        </MuiThemeProvider>
      </div>
    );
  }
}
const style = {
  margin: 15
};

export default EmailLogin;
