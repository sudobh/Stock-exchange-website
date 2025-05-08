import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navibar from "../components/Navbar";
import { Form, Button, Container, Row, Col, Alert, Spinner } from "react-bootstrap";
import axios from "axios";
import styles from './LoginPage.module.css';

function LoginPage() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [validated, setValidated] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;

        if (!form.checkValidity()) {
            e.stopPropagation();
            setValidated(true);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await axios.post('http://localhost:3001/signin', {
                email: formData.email,
                password: formData.password
            });

            localStorage.setItem('token', response.data.token);
            localStorage.setItem('username', response.data.username);
            localStorage.setItem('uid', response.data.id);

            setError({ variant: 'success', message: 'Login successful! Redirecting...' });
            setTimeout(() => navigate('/dashboard'), 1500);

        } catch (err) {
            console.error("Login error:", err);
            const errorMsg = err.response?.data?.message ||
                            "Invalid email or password. Please try again.";
            setError({ variant: 'danger', message: errorMsg });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.loginPage}>
            <Navibar />

            <Container className={styles.loginContainer}>
                <Row className="justify-content-center">
                    {/* Adjusted xl value here */}
                    <Col md={8} lg={6} xl={6}>
                        <div className={styles.loginCard}>
                            <h2 className="text-center mb-3">Sign In</h2>

                            {error && (
                                <Alert variant={error.variant} className="mt-3">
                                    {error.message}
                                </Alert>
                            )}

                            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="formEmail">
                                    <Form.Label className={styles.formLabel}>Email Address</Form.Label>
                                    <Form.Control
                                        className={styles.formControl}
                                        type="email"
                                        placeholder="Enter your email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        autoFocus
                                    />
                                    <Form.Control.Feedback type="invalid" className={styles.invalidFeedback}>
                                        Please provide a valid email.
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formPassword">
                                    <Form.Label className={styles.formLabel}>Password</Form.Label>
                                    <Form.Control
                                        className={styles.formControl}
                                        type="password"
                                        placeholder="Enter your password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        minLength={6}
                                    />
                                    <Form.Control.Feedback type="invalid" className={styles.invalidFeedback}>
                                        Password must be at least 6 characters.
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <div className="d-grid mb-2">
                                    <Button
                                        variant="primary"
                                        type="submit"
                                        disabled={loading}
                                        className={styles.loginButton}
                                    >
                                        {loading ? (
                                            <>
                                                <Spinner
                                                    as="span"
                                                    animation="border"
                                                    size="sm"
                                                    role="status"
                                                    aria-hidden="true"
                                                    className="me-2"
                                                />
                                                Signing In...
                                            </>
                                        ) : 'Sign In'}
                                    </Button>
                                </div>

                                <div className="text-center mt-2">
                                    <Link to="/forgot-password" className={styles.link}>
                                        Forgot password?
                                    </Link>
                                    <p className="mt-2 text-muted">
                                        Don't have an account?{' '}
                                        <Link to="/signup" className={styles.link}>
                                            Sign up here
                                        </Link>
                                    </p>
                                </div>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>

            
        </div>
    );
}

export default LoginPage;