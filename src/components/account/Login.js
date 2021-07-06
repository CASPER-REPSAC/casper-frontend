import React, { Component } from "react";

const CLIENT_ID =
  "865696858907-0v6o2rum364umjbc9g0esk4286m7gpas.apps.googleusercontent.com";
const REDIRECT_URI = "http://localhost:3000/account/google/callback";
const SCOPE = "https://www.googleapis.com/auth/userinfo.email";
const AUTH_URI =
  "https://accounts.google.com/o/oauth2/v2/auth?client_id=" +
  CLIENT_ID +
  "&response_type=code&redirect_uri=" +
  REDIRECT_URI +
  "&scope=" +
  SCOPE;

export default class Login extends Component {
  componentDidMount() {
    window.location = AUTH_URI;
  }
  render() {
    return <section>Redirectiong...</section>;
  }
}
