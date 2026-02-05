import { useEffect, useState } from "react";
import Search from "../Search/Search";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { Container } from "react-bootstrap";
import {
  CardBody,
  CardSubtitle,
  CardText,
  CardTitle,
  Col,
  Row,
  Card,
} from "reactstrap";

const Article = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState(posts);
  const [postTotal, setPostsTotal] = useState(posts.length);
  const [authors, setAuthor] = useState(posts);

  // useEffect(() => {
  // // sideffect: contoh untuk pengambilan data
  // console.log("Komponen untuk pengambilan data");

  // return ()=> {
  //   //cleanup: membersihkan efek
  //   console.log("Membersihkan sebelum kompoen dilepas");

  // }
  // setFilteredPosts(posts);
  // setPostsTotal(posts.length)
  // }, [filteredPosts])
  // efek berjalan jika data pada array berubah, jika array kosong
  // maka hanya berjalan sekali saat komponen pertama kali dibuat(mount)

  useEffect(() => {
    const fetData = async () => {
      try {
        const postsRespone = await axios.get(
          "https://jsonplaceholder.typicode.com/posts",
        );

        const userResponse = await axios.get(
          "https://jsonplaceholder.typicode.com/users",
        );

        console.log(userResponse);

        setFilteredPosts(postsRespone.data);
        setPostsTotal(postsRespone.data.length);
        setPosts(postsRespone.data);
        setAuthor(userResponse.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetData();
  }, []);

  const onChangeSearch = (searchTerm) => {
    const filteredData = posts.filter((post) => {
      return post.title.toLowerCase().includes(searchTerm.toLowerCase());
    });

    setFilteredPosts(filteredData);
    setPostsTotal(filteredData.length);
  };

  return (
    <div>
      <Container className="mt-4">
        <Row className="mb-3">
          <Col>
            <Search totalPost={postTotal} onSearchChange={onChangeSearch} />
          </Col>
        </Row>

        <Row>
          {filteredPosts.map((post, index) => {
            const author = authors.find((user) => user.id == post.userId);

            return (
              <Col md="6" lg="4" className="mb-4" key={post.id}>
                <Card
                  body
                  color="light"
                  outline
                  className="h-100 w-100 shadow-sm"
                  style={{
                    width: "18rem",
                  }}
                >
                  <CardBody>
                    <CardTitle tag="h5">
                      <NavLink to={`/posts/${post.id}`}>{post.title}</NavLink>
                    </CardTitle>

                    <CardText>
                      Author: <b>{author ? author.name : "Unknown"}</b>
                    </CardText>
                  </CardBody>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </div>
  );
};

export default Article;
