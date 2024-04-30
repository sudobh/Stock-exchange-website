import React from "react";
import {useNavigate} from "react-router-dom";
import {Form,Button} from "react-bootstrap";
function Login()
{
    return(
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" name="email"/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" name="password"/>
                </Form.Group>
                <Button variant="btn btn-dark" type="submit">
                    Sign In
                </Button>
              </Form>
    );
}

export default Login;