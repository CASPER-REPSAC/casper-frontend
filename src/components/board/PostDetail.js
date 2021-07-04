import React, { Component } from "react";
import { getPost } from "modules/api";

export default class PostDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      post: [],
    };
  }
  componentDidMount() {
    this.receivePost();
  }
  async receivePost() {
    const received_post = await getPost(this.state.id);
    this.setState({ post: received_post.data });
  }
  render() {
    const { author, content, created, title, viewer_num } = this.state.post;
    return (
      <div className="post">
        <div className="post__header">
          <h1>{title}</h1>
          <p className="post__header__meta">
            <span className="author">{author}</span>
            <span className="created">{created}</span>
            <span className="read_count">조회 수 : {viewer_num}</span>
          </p>
        </div>
        <div className="post__body">
          <p>{content}</p>
        </div>
      </div>
    );
  }
}
