import { Form, Button } from "react-bootstrap";

const Registration = () => {

  

  return (
    <Form className="component-margin component-border">
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label className="fw-bold" style={{fontSize: "20px"}}>Name</Form.Label>
        <Form.Control type="text" placeholder="Enter name" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicUsername">
        <Form.Label className="fw-bold" style={{fontSize: "20px"}}>Username</Form.Label>
        <Form.Control type="text" placeholder="Enter username" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label className="fw-bold" style={{fontSize: "20px"}}>Password</Form.Label>
        <Form.Control type="password" placeholder="Enter password" />
      </Form.Group>
      
      <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
        <Form.Label className="fw-bold" style={{fontSize: "20px"}}>Confirm Password</Form.Label>
        <Form.Control type="password" placeholder="Enter confirm password" />
      </Form.Group>
      
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  )
}

export default Registration;