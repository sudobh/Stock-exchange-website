import React from "react";
import {useNavigate} from "react-router-dom";
import Navibar from "../components/Navbar";
import Foot from "../components/Footer";
import {Form,Button, Container, Row, Col} from "react-bootstrap";
import axios from "axios";
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
                try {
                    const response = await axios.post('http://localhost:3001/signup', {
                        username: values.name,
                        email: values.email,
                        demat: parseInt(values.d_mat),
                        password: values.password
                    });
    
                    // Assuming the token is in the response data
                    const token = response.data.token;
                    localStorage.setItem('token', token);
    
                    // Navigate to another page or show a success message
                    navigate('/'); // Change this to your desired route
                } catch (error) {
                    console.error("There was an error submitting the form:", error);
                    alert("An error occurred while signing up. Please try again.");
                }
                
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