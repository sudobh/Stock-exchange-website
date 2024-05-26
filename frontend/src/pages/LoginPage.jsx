import React from "react";
import { useNavigate } from "react-router-dom";
import Navibar from "../components/Navbar";
import Foot from "../components/Footer";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import axios from "axios";

function Login() {
    const [values, setValues] = React.useState({
        email: '',
        password: ''
    });

    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/signin', {
                email: values.email,
                password: values.password
            });

            // Assuming the token is in the response data
            const token = response.data.token;
            localStorage.setItem('token', token);
            alert("login successful");
            function delay(ms) {
                return new Promise(resolve => setTimeout(resolve, ms));
            }
            await delay(1000);

            // Navigate to another page or show a success message
            navigate('/'); // Change this to your desired route
        } catch (error) {
            console.error("There was an error logging in:", error);
            alert("Invalid email or password. Please try again.");
        }
    };

    return (
        <div>
            <Navibar />

            <Container>
                <Row className="d-flex justify-content-center">
                    <Col md={6} className="bg-dark-subtle mt-3 rounded align-items-center">
                        <Form className="m-3" onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" name="email" required onChange={handleChange} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" name="password" required onChange={handleChange} />
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
