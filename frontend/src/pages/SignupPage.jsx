import React from "react";
import {useNavigate} from "react-router-dom";
import Navibar from "../components/Navbar";
import Foot from "../components/Footer";
import {Form,Button, Container, Row, Col} from "react-bootstrap";
function Signup()
{
    const[values,setValues]=React.useState({
        name:'',
        email:'',
        d_mat:'',
        password:'',
        cpassword:''
      });

      const handleChange=(event)=>{
        setValues({...values,[event.target.name]:event.target.value})
      }
        const navigate=useNavigate();
        const handleSubmit=async (event)=>{
            event.preventDefault();
            if (values.password !== values.cpassword) {
                alert("Password and confirm password do not match");
            } else {
                // Passwords match, submit the form or perform any other action
                // For example, you can send the form data to an API
                console.log("Form submitted:", values);
            }
        }
    return(
        <div>
        <Navibar />

    <Container>
        <Row className="d-flex justify-content-center" >
            <Col md={6} className="bg-dark-subtle mt-3 rounded align-items-center">
                <Form className="m-3" onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" >
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter name" name="name" required onChange={handleChange}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" name="email" required onChange={handleChange}/>
                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Label>DMAT Account Number</Form.Label>
                        <Form.Control type="text" placeholder="Enter yout D-MAT account no." name="d_mat" required onChange={handleChange}/>
                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" name="password" required onChange={handleChange}/>
                    </Form.Group>
                    
                    <Form.Group className="mb-3" >
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" placeholder="Confirm Password" name="cpassword" required onChange={handleChange}/>
                    </Form.Group>
                    <Button variant="btn btn-dark" type="submit">
                        Sign Up
                    </Button>
                </Form>
            </Col>
        </Row>
     </Container>

     <Foot />
        </div>
    );
}

export default Signup;