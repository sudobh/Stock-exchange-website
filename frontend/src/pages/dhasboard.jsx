import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card } from 'react-bootstrap';
import Navibar from '../components/Navbar';
import Foot from '../components/Footer';

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
        const uid = localStorage.getItem("uid");
        if (token) {
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
        <>
            <Navibar />
            <Container className="mt-5">
                <Row>
                    <Col>
                    {CompanyData.map((data) =>{
                        <Card>
                                <Card.Body>
                                    <Card.Title>{data.cname}</Card.Title>
                                    <Card.Text>
                                        Current Price: ₹{data.cprice}
                                    </Card.Text>
                                    <Card.Text>
                                        Number: {data.cnum}
                                    </Card.Text>
                                    <Card.Text>
                                        <button variant="outline-dark">
                                            Sell
                                        </button>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                    })}
                    </Col>
                </Row>
            </Container>
            <Foot />
        </>
    );
}

export default Dashboard;
