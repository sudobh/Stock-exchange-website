import React from "react";
import {useNavigate} from "react-router-dom";
import Navibar from "../components/Navbar";
import Foot from "../components/Footer";
import {Form, Button, Container, Row, Col} from "react-bootstrap";
function Login()
{

    return(
        <div>
        <Navibar />
        
        <Container>
        <Row className="d-flex justify-content-center" >
            <Col md={6} className="bg-dark-subtle mt-3 rounded align-items-center">
                <Form className="m-3">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" name="email" required />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" name="password" required />
                    </Form.Group>
                    <Button variant="btn btn-dark" type="submit">
                        Sign In
                    </Button>
                </Form>
              </Col>
            </Row>
        </Container>

        <Foot />
        </div>
    );
}

export default Login;