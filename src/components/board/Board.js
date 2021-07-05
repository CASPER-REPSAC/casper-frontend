import React from "react";
import { getCategory, getDataByURL } from "modules/api";
import { Link } from "react-router-dom";
import { Table, Pagination, Nav } from "react-bootstrap";

const CATEGORY_MAP = {
  notice: 1,
  free: 2,
};

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board_name: this.props.location.pathname.replace("/board/", ""),
      posts: [],
    };
  }
  componentDidMount() {
    this.receivePosts(this.state.board_name);
  }
  componentDidUpdate() {
    const board_name_in_path = this.props.location.pathname.replace(
      "/board/",
      ""
    );
    if (this.state.board_name !== board_name_in_path) {
      this.setState({
        board_name: board_name_in_path,
      });
      this.receivePosts(board_name_in_path);
    }
  }

  async receivePosts(board_name) {
    let posts = [];
    const received_category = await getCategory(CATEGORY_MAP[board_name]);
    for (let post_url of received_category.data.posts) {
      const received_post = await getDataByURL(post_url);
      const author_url = received_post.data.author;
      const received_author = await getDataByURL(author_url);
      received_post.data.author = received_author.data.email;
      posts = posts.concat(received_post.data);
    }
    this.setState({ posts: posts });
  }

  render() {
    return (
      <>
        <Nav
          variant="tabs"
          defaultActiveKey={"/board/" + this.state.board_name}
        >
          <Nav.Item>
            <Nav.Link href="/board/notice">공지사항</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/board/free">자유게시판</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link disabled href="#">
              사진첩
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link disabled href="#">
              블로그
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link disabled href="#">
              준회원 게시판
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link disabled href="#">
              정회원 게시판
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link disabled href="#">
              졸업생 게시판
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <div className="sub">
          <div className="sub__title">
            <h1>{this.state.board_name}</h1>
          </div>
        </div>
        <div className="board">
          <div className="board__list">
            <Table hover size="sm">
              <thead>
                <tr>
                  <th>
                    <span>번호</span>
                  </th>
                  <th>
                    <span>제목</span>
                  </th>
                  <th>
                    <span>글쓴이</span>
                  </th>
                  <th>
                    <span>날짜</span>
                  </th>
                  <th>
                    <span>조회 수</span>
                  </th>
                </tr>
              </thead>
              {this.state.posts.length !== 0 ? (
                <tbody>
                  {this.state.posts.map((post) => (
                    <tr key={post.id}>
                      <td className="no">{post.id}</td>
                      <td className="title">
                        <Link
                          to={"/board/" + this.state.board_name + "/" + post.id}
                        >
                          {post.title}
                        </Link>
                      </td>
                      <td className="author">
                        <a href=".">{post.author}</a>
                      </td>
                      <td className="time">
                        {post.created_date.slice(0, 10).replaceAll("-", ".")}
                      </td>
                      <td className="readNum">{post.viewer_num}</td>
                    </tr>
                  ))}
                </tbody>
              ) : (
                <tbody></tbody>
              )}
            </Table>
          </div>
          <div className="board__footer">
            <Pagination size="sm">
              <Pagination.Item key={1} active={true} activeLabel="">
                {1}
              </Pagination.Item>
              <Pagination.Item key={2} active={false}>
                {2}
              </Pagination.Item>
              <Pagination.Item key={3} active={false}>
                {3}
              </Pagination.Item>
            </Pagination>
          </div>
        </div>
      </>
    );
  }
}

export default Board;
