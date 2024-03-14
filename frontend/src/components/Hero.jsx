import { Container, Card, Button, Form, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import FormContainer from "../components/FormContainer";
import { useSelector } from "react-redux";
import { useState } from "react";

const Hero = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const [title, setTitle] = useState("");
  const [key, setKey] = useState("");
  const [desc, setDesc] = useState("")

  const createKeyHandler = async (e) => {
    e.preventDefault();
  }

  return (
    <div className=" py-5">
      <FormContainer>
        <h6>Create a key to securely store and share.</h6>

        <Form onSubmit={createKeyHandler}>

          {/* Key Title */}
          <Form.Group className="my-2" controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" placeholder="Enter Title" value={title} onChange={(e) => setTitle(e.target.value)}>
            </Form.Control>
          </Form.Group>

          {/* Enter Key */}
          <Form.Group className="my-2" controlId="key">
            <Form.Label>Key</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Key"
              value={key}
              onChange={(e) => setKey(e.target.value)}
            ></Form.Control>
          </Form.Group>

          {/* Description */}
          <Form.Group className="my-2" controlId="desc">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Description"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type="submit" variant="primary" className="mt-3">
            Create Key
          </Button>
        </Form>
      </FormContainer>
    </div>
  );
};

export default Hero;
