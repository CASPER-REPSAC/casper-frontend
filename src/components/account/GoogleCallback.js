import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { doLogin } from "modules/accountReducer";
import { connect } from "react-redux";

import { API_SERVER_URL } from "modules/api";

const API_AUTH_URL = API_SERVER_URL + "/accounts/google/callback/";
const USER_URL = API_SERVER_URL + "/accounts/user/";

class GoogleCallback extends Component {
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
    this.props.doLogin({
      user: received_user_info.data,
      access_token: received_tokens.data.access_token,
    });
    return received_user_info.data;
  }

  render() {
    return <Redirect to="/board" />;
  }
}

const mapStateToProps = ({ accountReducer }) => {
  return {
    isLogin: accountReducer.isLogin,
    user: accountReducer.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    doLogin: (user_with_token) => dispatch(doLogin(user_with_token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GoogleCallback);
