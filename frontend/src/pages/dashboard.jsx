import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Navibar from '../components/Navbar';
import Foot from '../components/Footer';
import styles from './dashboard.module.css';

function Dashboard() {
    const CompanyData = [
        {
            cname: "Bira",
            cprice: "160",
            cnum: 10,
        },
        {
            cname: "GKN Driveline",
            cprice: "160",
            cnum: 10,
        },
        {
            cname: "Mohan Meakin",
            cprice: "160",
            cnum: 10,
        }
    ];

    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const uid = localStorage.getItem('uid');
        if (token && uid) {
            axios.get(`http://localhost:3001/api/user/${uid}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(response => {
                setUserData(response.data);
            })
            .catch(error => {
                setError(error.response ? error.response.data : "Error fetching data");
            });
        } else {
            setError("No token found. Please log in.");
        }
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.dashboardContainer}>
            <Navibar />
            <Container className={`mt-5 pt-4 ${styles.container}`}>
                <Row>
                    <Col>
                        <Card className={`mb-4 ${styles.card}`}>
                            <Card.Header>User Details</Card.Header>
                            <Card.Body>
                                <Card.Text><strong>Username:</strong> {userData.username}</Card.Text>
                                <Card.Text><strong>Email:</strong> {userData.email}</Card.Text>
                                <Card.Text><strong>Demat Number:</strong> {userData.demat}</Card.Text>
                                <Card.Text><strong>Member Since:</strong> {new Date(userData.created_at).toLocaleDateString()}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    {CompanyData.map((data, index) => (
                        <Col key={index} xs={12} md={4}>
                            <Card className={`mb-4 ${styles.card}`}>
                                <Card.Body>
                                    <Card.Title>{data.cname}</Card.Title>
                                    <Card.Text>
                                        Current Price: ₹{data.cprice}
                                    </Card.Text>
                                    <Card.Text>
                                        Number: {data.cnum}
                                    </Card.Text>
                                    <Button variant="outline-light">
                                        Sell
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
            <Foot />
        </div>
    );
}

export default Dashboard;