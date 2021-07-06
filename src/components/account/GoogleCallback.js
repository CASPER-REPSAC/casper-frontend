import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

const API_AUTH_URL = "http://localhost:8000/accounts/google/callback/";
const USER_URL = "http://localhost:8000/accounts/user/";

export default class GoogleCallback extends Component {
  constructor() {
    super();
    this.state = { email: "" };
  }

  componentDidMount() {
    const search_with_code = this.props.location.search;
    this.getUserWithSearch(search_with_code);
  }

  async getAccessToken(search) {
    return await axios.get(API_AUTH_URL + search);
  }

  async getUserInfo(access_token) {
    return await axios({
      method: "GET",
      url: USER_URL,
      headers: {
        Authorization: "Bearer " + access_token,
      },
    });
  }

  async getUserWithSearch(search) {
    const received_tokens = await this.getAccessToken(search);
    const received_user_info = await this.getUserInfo(
      received_tokens.data.access_token
    );
    console.log(received_user_info);
    this.setState({ email: received_user_info.data.email });
    return received_user_info.data;
  }

  render() {
    return <Redirect to="/" />;
  }
}
