import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navibar from "../components/Navbar";
import { Form, Button, Container, Row, Col, Alert, Spinner } from "react-bootstrap";
import axios from "axios";
import styles from './LoginPage.module.css'; 

function SignupPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        d_mat: '',
        password: '',
        cpassword: ''
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

        if (formData.password !== formData.cpassword) {
            setError({ variant: 'danger', message: 'Passwords do not match' });
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await axios.post('http://localhost:3001/signup', {
                username: formData.name,
                email: formData.email,
                demat: parseInt(formData.d_mat),
                password: formData.password
            });

            localStorage.setItem('token', response.data.token);
            localStorage.setItem('username', response.data.username);
            localStorage.setItem('uid', response.data.id);

            setError({ variant: 'success', message: 'Registration successful! Redirecting...' });
            setTimeout(() => navigate('/dashboard'), 1500);
            
        } catch (err) {
            console.error("Signup error:", err);
            const errorMsg = err.response?.data?.message || 
                            "Registration failed. Please try again.";
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
                    <Col md={10} lg={8} xl={6}>
                        <div className={styles.loginCard}>
                            <h2 className="text-center mb-4">Create Your Account</h2>
                            
                            {error && (
                                <Alert variant={error.variant} className="mt-3">
                                    {error.message}
                                </Alert>
                            )}

                            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="formName">
                                    <Form.Label className={styles.formLabel}>Full Name</Form.Label>
                                    <Form.Control
                                        className={styles.formControl}
                                        type="text"
                                        placeholder="Enter your name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        autoFocus
                                    />
                                    <Form.Control.Feedback type="invalid" className={styles.invalidFeedback}>
                                        Please provide your name.
                                    </Form.Control.Feedback>
                                </Form.Group>

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
                                    />
                                    <Form.Control.Feedback type="invalid" className={styles.invalidFeedback}>
                                        Please provide a valid email.
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formDmat">
                                    <Form.Label className={styles.formLabel}>DMAT Account Number</Form.Label>
                                    <Form.Control
                                        className={styles.formControl}
                                        type="text"
                                        placeholder="Enter your D-MAT account number"
                                        name="d_mat"
                                        value={formData.d_mat}
                                        onChange={handleChange}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid" className={styles.invalidFeedback}>
                                        Please provide your D-MAT account number.
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formPassword">
                                    <Form.Label className={styles.formLabel}>Password</Form.Label>
                                    <Form.Control
                                        className={styles.formControl}
                                        type="password"
                                        placeholder="Enter password"
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

                                <Form.Group className="mb-4" controlId="formCPassword">
                                    <Form.Label className={styles.formLabel}>Confirm Password</Form.Label>
                                    <Form.Control
                                        className={styles.formControl}
                                        type="password"
                                        placeholder="Confirm password"
                                        name="cpassword"
                                        value={formData.cpassword}
                                        onChange={handleChange}
                                        required
                                        minLength={6}
                                    />
                                    <Form.Control.Feedback type="invalid" className={styles.invalidFeedback}>
                                        Please confirm your password.
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <div className="d-grid mb-3">
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
                                                Registering...
                                            </>
                                        ) : 'Sign Up'}
                                    </Button>
                                </div>

                                <div className="text-center">
                                    <p className="mt-3 text-muted">
                                        Already have an account?{' '}
                                        <Link to="/login" className={styles.link}>
                                            Sign in here
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

export default SignupPage;