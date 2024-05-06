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
                        <Row>
                            
                                <Button onClick={decCount}><Image style={{height:"10px",width:"10px"}} src={Minus}/></Button><h5>{count}</h5><Button onClick={incCount}><Image style={{height:"10px",width:"10px"}} src={Plus}/></Button>
                
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