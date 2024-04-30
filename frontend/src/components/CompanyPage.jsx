import React from "react";
import Navibar from "../components/Navbar";
import Foot from "../components/Footer";
import Minus from "../assets/minus.png";
import Plus from "../assets/plus.png";
import { Container,Row,Col, Button,Image } from "react-bootstrap";
function Company()
{
    const [count,setCount]=React.useState(0);
    const incCount=()=>{
        setCount(count+1);
    }
    const decCount=()=>{
        setCount(count-1);
    }
    return(
        <div>
        <Navibar />
        <Container>
            <Row>
                <Col>
                    <h3>Company Name</h3>
                    <Row>
                        <Col md={6}>
                        <Row><h5>Price/Share: &#x20B9;1000</h5></Row>
                        <Row><h5>Type: Industrial</h5></Row>
                        <Row><h5>Face Value: &#x20B9;1</h5></Row>
                        <Row><h5>ISIN No.: 0000000000</h5></Row>
                        </Col>
                        <Col md={6}>
                        <Row>
                            <Col>
                                <Button onClick={incCount}><Image style={{height:"10px",width:"10px"}} src={Minus}/></Button><h5>{count}</h5><Button onClick={decCount}><Image style={{height:"10px",width:"10px"}} src={Plus}/></Button>
                            </Col>
                        </Row>
                        <Row>
                            <h5>Total Investment:</h5>
                        </Row>
                        <Row>
                            <h5>Stamp Duty(0.015%): </h5>
                        </Row>
                        <Row>
                            <h5>Transaction fee: </h5>
                        </Row>
                        <Row>
                            <h5>Total Price: </h5>
                        </Row>
                        <Row>
                        <Button variant="outline-dark">Invest</Button>
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