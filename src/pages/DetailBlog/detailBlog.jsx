import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Col,
  Container,
  Row,
  Card,
  CardBody,
  CardTitle,
  CardText,
  ListGroupItem,
  ListGroup,
} from "reactstrap";

const DetailBlog = () => {
  const [post, setPost] = useState("");
  const [comments, setComments] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postRespone = await axios.get(`
                    https://jsonplaceholder.typicode.com/posts/${id}`);

        const commentsResponse = await axios.get(
          "https://jsonplaceholder.typicode.com/comments",
        );

        setComments(commentsResponse.data);
        setPost(postRespone.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);
  return (
    <div>
      <Container className="mt-4 mb-5">
        <Row className="justify-content-center">
          <Col md="8">
            <Card className="mb-4 shadow-sm">
              <CardBody>
                <CardTitle tag="h3">{post.title}</CardTitle>

                <CardText>{post.body}</CardText>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <h4>Komentar</h4>
        <ListGroup>
          {comments
            .filter((comment) => comment.postId === Number(id))
            .map((comment) => (
              <ListGroupItem key={comment.id} className="mb-2">
                <b>{comment.name}</b>
                <p className="text-muted small">{comment.email}</p>
                <p>{comment.body}</p>
              </ListGroupItem>
            ))}
        </ListGroup>
      </Container>
    </div>
  );
};

export default DetailBlog;
