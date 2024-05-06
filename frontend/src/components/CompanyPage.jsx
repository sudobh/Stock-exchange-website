import React from "react";
import Navibar from "../components/Navbar";
import Foot from "../components/Footer";
import Minus from "../assets/minus.png";
import Plus from "../assets/plus.png";
import { useParams } from 'react-router-dom';
import { Container,Row,Col, Button,Image } from "react-bootstrap";
function Company()
{
    const { cname, ccap, cprice, cpe, cimg } = useParams();
    const [count,setCount]=React.useState(0);
    const incCount=()=>{
        setCount(count+1);
    }
    const decCount=()=>{
        if(count>0)
        setCount(count-1);
    }
    return(
        <div>
        <Navibar />
        <Container>
            <Row>
                <Col>
                    <h3>{cname}</h3>
                    <Row>
                        <Col md={6}>
                        <Row><h5>Cap: &#x20B9;{ccap}</h5></Row>
                        <Row><h5>Current Price: &#x20B9;{cprice}</h5></Row>
                        <Row><h5>P/E: {cpe}</h5></Row>
                        </Col>
                        <Col md={6}>
                        <Container>
                        <Row>
                            <Col xs={1} className="text-center">
                                <Button onClick={decCount}><Image style={{height:"10px",width:"10px"}} src={Minus}/></Button>
                            </Col>
                            <Col xs={2} className="text-center">
                                <h5>{count}</h5>
                            </Col>
                            <Col xs={1} className="text-center">
                                <Button onClick={incCount}><Image style={{height:"10px",width:"10px"}} src={Plus}/></Button>
                            </Col>
                    
                        </Row>
                        </Container>
                        <Row>
                            <h5>Total Investment: &#x20B9;{count*cprice}</h5>
                        </Row>
                        <Row>
                            <h5>Stamp Duty(0.015%): &#x20B9;{0.00015*(count*cprice)}</h5>
                        </Row>
                        <Row>
                            <h5>Transaction fee: &#x20B9;</h5>
                        </Row>
                        <Row>
                            <h5>Total Price: &#x20B9;{(0.00015*(count*cprice))+(count*cprice)}</h5>
                        </Row>
                        <Row>
                        <Col xs={4}>
                        <Button variant="outline-dark">Invest</Button>
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