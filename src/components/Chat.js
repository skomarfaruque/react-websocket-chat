import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import "bootstrap/dist/css/bootstrap.css";
import { ListGroup, ListGroupItem } from "reactstrap";
import "../style.css";
const axios = require("axios");

class Chat extends React.Component {
  ws = new WebSocket("ws://localhost:5000/chat/");
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      message: "",
    };
  }
  componentWillMount() {
    document.title = "Login";
  }
  async componentDidMount() {
    this.ws.onopen = (websocket) => {
      // on connecting, do nothing but log it to the console
      console.log("connected");
      const data = JSON.stringify({
        MessageType: "JOIN",
        sender: this.props.token.token,
        receiver: this.props.match.params.id,
        MessageContentType: "TEXT",
        content: "",
      });
      this.ws.send(data);
    };

    this.ws.onmessage = (evt) => {
      console.log("received message", evt.data);
    };
    console.log("logged", this.props.token);
    console.log("receiver", this.props.match.params.id);
    const { data } = await axios({
      method: "get",
      url: "http://localhost:5000/users",
    });
    this.setState({ users: data.data });
    console.log(this.state);
  }
  sendMsg = () => {
    console.log(this.ws);
    const sender = this.props.token;
    console.log("ss", sender);
    const data = JSON.stringify({
      MessageType: "CHAT",
      sender: this.props.token.token,
      receiver: this.props.match.params.id,
      MessageContentType: "TEXT",
      content: this.state.message,
    });
    this.ws.send(data);
  };

  login = async () => {
    const { data } = await axios({
      method: "get",
      url: "http://localhost:5000/users",
    });
    this.props.history.push("/home");
    console.log(data);
  };
  setMsg = (e) => {
    this.setState({ message: e.target.value });
  };

  handleReset(e) {
    e.preventDefault();

    this.refs.form.resetFields();
  }

  bindEmail = (e) => {
    this.setState({ email: e.target.value });
    console.log(this.state);
  };

  bindPassword = (e) => {
    this.setState({ password: e.target.value });
    console.log(this.state);
  };
  alertClicked = (receiver) => {
    console.log(receiver);
  };

  render() {
    return (
      <div class="container">
        <h3 class=" text-center">Messaging</h3>
        <div class="messaging">
          <div class="inbox_msg">
            <div class="inbox_people">
              <div class="headind_srch">
                <div class="recent_heading">
                  <h4>Recent</h4>
                </div>
                <div class="srch_bar">
                  <div class="stylish-input-group">
                    <input
                      type="text"
                      class="search-bar"
                      placeholder="Search"
                    />
                    <span class="input-group-addon">
                      <button type="button">
                        {" "}
                        <i class="fa fa-search" aria-hidden="true"></i>{" "}
                      </button>
                    </span>
                  </div>
                </div>
              </div>
              <div class="inbox_chat">
                <div class="chat_list active_chat">
                  <div class="chat_people">
                    <div class="chat_img">
                      {" "}
                      <img
                        src="https://ptetutorials.com/images/user-profile.png"
                        alt="sunil"
                      />{" "}
                    </div>
                    <div class="chat_ib">
                      <h5>
                        Sunil Rajput <span class="chat_date">Dec 25</span>
                      </h5>
                      <p>
                        Test, which is a new approach to have all solutions
                        astrology under one roof.
                      </p>
                    </div>
                  </div>
                </div>
                <div class="chat_list">
                  <div class="chat_people">
                    <div class="chat_img">
                      {" "}
                      <img
                        src="https://ptetutorials.com/images/user-profile.png"
                        alt="sunil"
                      />{" "}
                    </div>
                    <div class="chat_ib">
                      <h5>
                        Sunil Rajput <span class="chat_date">Dec 25</span>
                      </h5>
                      <p>
                        Test, which is a new approach to have all solutions
                        astrology under one roof.
                      </p>
                    </div>
                  </div>
                </div>
                <div class="chat_list">
                  <div class="chat_people">
                    <div class="chat_img">
                      {" "}
                      <img
                        src="https://ptetutorials.com/images/user-profile.png"
                        alt="sunil"
                      />{" "}
                    </div>
                    <div class="chat_ib">
                      <h5>
                        Sunil Rajput <span class="chat_date">Dec 25</span>
                      </h5>
                      <p>
                        Test, which is a new approach to have all solutions
                        astrology under one roof.
                      </p>
                    </div>
                  </div>
                </div>
                <div class="chat_list">
                  <div class="chat_people">
                    <div class="chat_img">
                      {" "}
                      <img
                        src="https://ptetutorials.com/images/user-profile.png"
                        alt="sunil"
                      />{" "}
                    </div>
                    <div class="chat_ib">
                      <h5>
                        Sunil Rajput <span class="chat_date">Dec 25</span>
                      </h5>
                      <p>
                        Test, which is a new approach to have all solutions
                        astrology under one roof.
                      </p>
                    </div>
                  </div>
                </div>
                <div class="chat_list">
                  <div class="chat_people">
                    <div class="chat_img">
                      {" "}
                      <img
                        src="https://ptetutorials.com/images/user-profile.png"
                        alt="sunil"
                      />{" "}
                    </div>
                    <div class="chat_ib">
                      <h5>
                        Sunil Rajput <span class="chat_date">Dec 25</span>
                      </h5>
                      <p>
                        Test, which is a new approach to have all solutions
                        astrology under one roof.
                      </p>
                    </div>
                  </div>
                </div>
                <div class="chat_list">
                  <div class="chat_people">
                    <div class="chat_img">
                      {" "}
                      <img
                        src="https://ptetutorials.com/images/user-profile.png"
                        alt="sunil"
                      />{" "}
                    </div>
                    <div class="chat_ib">
                      <h5>
                        Sunil Rajput <span class="chat_date">Dec 25</span>
                      </h5>
                      <p>
                        Test, which is a new approach to have all solutions
                        astrology under one roof.
                      </p>
                    </div>
                  </div>
                </div>
                <div class="chat_list">
                  <div class="chat_people">
                    <div class="chat_img">
                      {" "}
                      <img
                        src="https://ptetutorials.com/images/user-profile.png"
                        alt="sunil"
                      />{" "}
                    </div>
                    <div class="chat_ib">
                      <h5>
                        Sunil Rajput <span class="chat_date">Dec 25</span>
                      </h5>
                      <p>
                        Test, which is a new approach to have all solutions
                        astrology under one roof.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="mesgs">
              <div class="msg_history">
                <div class="incoming_msg">
                  <div class="incoming_msg_img">
                    {" "}
                    <img
                      src="https://ptetutorials.com/images/user-profile.png"
                      alt="sunil"
                    />{" "}
                  </div>
                  <div class="received_msg">
                    <div class="received_withd_msg">
                      <p>Test which is a new approach to have all solutions</p>
                      <span class="time_date"> 11:01 AM | June 9</span>
                    </div>
                  </div>
                </div>
                <div class="outgoing_msg">
                  <div class="sent_msg">
                    <p>Test which is a new approach to have all solutions</p>
                    <span class="time_date"> 11:01 AM | June 9</span>{" "}
                  </div>
                </div>
                <div class="incoming_msg">
                  <div class="incoming_msg_img">
                    {" "}
                    <img
                      src="https://ptetutorials.com/images/user-profile.png"
                      alt="sunil"
                    />{" "}
                  </div>
                  <div class="received_msg">
                    <div class="received_withd_msg">
                      <p>Test, which is a new approach to have</p>
                      <span class="time_date"> 11:01 AM | Yesterday</span>
                    </div>
                  </div>
                </div>
                <div class="outgoing_msg">
                  <div class="sent_msg">
                    <p>Apollo University, Delhi, India Test</p>
                    <span class="time_date"> 11:01 AM | Today</span>{" "}
                  </div>
                </div>
                <div class="incoming_msg">
                  <div class="incoming_msg_img">
                    {" "}
                    <img
                      src="https://ptetutorials.com/images/user-profile.png"
                      alt="sunil"
                    />{" "}
                  </div>
                  <div class="received_msg">
                    <div class="received_withd_msg">
                      <p>
                        We work directly with our designers and suppliers, and
                        sell direct to you, which means quality, exclusive
                        products, at a price anyone can afford.
                      </p>
                      <span class="time_date"> 11:01 AM | Today</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="type_msg">
                <div class="input_msg_write">
                  <input
                    type="text"
                    class="write_msg"
                    placeholder="Type a message"
                    onChange={(e) => this.setMsg(e)}
                  />
                  <button
                    class="msg_send_btn"
                    type="button"
                    onClick={() => this.sendMsg()}
                  >
                    <i class="fa fa-paper-plane-o" aria-hidden="true"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  token: state.auth.token,
});

const mapDispatchToProps = (dispatch) => ({
  login: (token) => dispatch({ type: "Store", token }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
// export default Login
