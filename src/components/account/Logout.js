import React, { Component } from "react";
import { Redirect } from "react-router";
import { doLogout } from "modules/accountReducer";
import { connect } from "react-redux";

class Logout extends Component {
  componentDidMount() {
    this.props.doLogout();
  }

  render() {
    return <Redirect to="/" />;
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
    doLogout: () => dispatch(doLogout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
