import React from "react";
import Navibar from "../components/Navbar";
import Foot from "../components/Footer";
import Minus from "../assets/minus.png";
import Plus from "../assets/plus.png";
import { useLocation } from 'react-router-dom';
import { Container,Row,Col, Button,Image } from "react-bootstrap";
import axios from "axios";
function Company()
{
    const location = useLocation();
    const companyData = location.state?.company; // Access the passed data
    const [count,setCount]=React.useState(0);
    const incCount=()=>{
        setCount(count+1);
    }
    const decCount=()=>{
        if(count>0)
        setCount(count-1);
    }
    const handleInvest = async () => {
        const investmentData = {
            quantity: count,
            price: parseInt(companyData.cprice),
            userId: localStorage.getItem("uid"),
            companyId : "clwnljmzd0001kod8mp9zmvnw"
        };

        try {
            const token = localStorage.getItem("token")
            const response = await axios.post('http://localhost:3001/api/buystocks', investmentData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.status === 201) {
                alert("Investment successful");
            } else {
                alert(`Failed to invest: ${response.statusText}`);
            }
        } catch (error) {
            alert(`Error: ${error.message}`);
        }
    };

    return(
        <div>
        <Navibar />
        <Container className="justify-content-center">
            <Row className="bg-dark-subtle m-3 rounded align-items-center">
                <Col>
                    <h3>{companyData.cname}</h3>
                    <Row className="d-flex justify-content-center">
                        <Col md={6} className="align-items-center">
                        <Row><h5>Cap: &#x20B9;{companyData.ccap}</h5></Row>
                        <Row><h5>Current Price: &#x20B9;{companyData.cprice}</h5></Row>
                        <Row><h5>P/E: {companyData.cpe}</h5></Row>
                        </Col>
                        <Col md={6} className="align-items-center">
                        <Container>
                        <Row>
                            <Col xs={1} className="text-center">
                                <Button variant="outline-light" onClick={decCount}><Image style={{height:"10px",width:"10px"}} src={Minus}/></Button>
                            </Col>
                            <Col xs={2} className="text-center">
                                <h5>{count}</h5>
                            </Col>
                            <Col xs={1} className="text-center">
                                <Button variant="outline-light" onClick={incCount}><Image style={{height:"10px",width:"10px"}} src={Plus}/></Button>
                            </Col>
                    
                        </Row>
                        </Container>
                        <Row>
                            <h5>Total Investment: &#x20B9;{count*companyData.cprice}</h5>
                        </Row>
                        <Row>
                            <h5>Stamp Duty(0.015%): &#x20B9;{0.00015*(count*companyData.cprice)}</h5>
                        </Row>
                        <Row>
                            <h5>Transaction fee: &#x20B9;</h5>
                        </Row>
                        <Row>
                            <h5>Total Price: &#x20B9;{(0.00015*(count*companyData.cprice))+(count*companyData.cprice)}</h5>
                        </Row>
                        <Row>
                        <Col xs={4} className="mb-2">
                        <Button variant="outline-dark" onClick={handleInvest}>Invest</Button>
                        </Col>
                        </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>

        <Foot />
        </div>
    );
}

export default Company;