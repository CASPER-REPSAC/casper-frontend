import React, { Component } from "react";
import { getPost, getDataByURL } from "modules/api";
import { ErrorNotFound } from "components/extern/404/ErrorNotFound";

const STATUS = {
  loading: "loading",
  undefined: "undefined",
  founded: "founded",
  error: "error",
};

export default class PostDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      post: null,
      status: STATUS.loading,
    };
  }
  componentDidMount() {
    this.receivePost(this.state.id);
  }
  async receivePost(post_id) {
    try {
      const received_post = await getPost(post_id);
      const author_url = received_post.data.author;
      const received_author = await getDataByURL(author_url);
      received_post.data.author = received_author.data.email;
      this.setState({ post: received_post.data, status: STATUS.founded });
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        this.setState({ post: null, status: STATUS.undefined });
      } else {
        this.setState({ post: null, status: STATUS.error });
      }
    }
  }

  render() {
    return (
      <>
        {this.state.status === STATUS.loading ? (
          <p>Loading...</p>
        ) : this.state.status === STATUS.undefined ? (
          <ErrorNotFound />
        ) : this.state.status === STATUS.error ? (
          <p>Error</p>
        ) : (
          <div className="post">
            <div className="post__header">
              <h1>{this.state.post.title}</h1>
              <p className="post__header__meta">
                <span className="author">{this.state.post.author}</span>
                <span className="created">{this.state.post.created}</span>
                <span className="read_count">
                  조회 수 : {this.state.post.viewer_num}
                </span>
              </p>
            </div>
            <div className="post__body">
              <p>{this.state.post.content}</p>
            </div>
          </div>
        )}
      </>
    );
  }
}
