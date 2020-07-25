import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { connect } from "react-redux";

class Logout extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    this.props.removeAll();
    this.props.logOut();
    this.props.history.push("/");
  }

  render() {
    return <div>x</div>;
  }
}
const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.token,
});

const mapDispatchToProps = (dispatch) => ({
  logOut: (token) => dispatch({ type: "Logout", token }),
  removeAll: (index) => dispatch({ type: "removeAll", index }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
// export default Login
