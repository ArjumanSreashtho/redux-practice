import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import routePath from "../../../constants/routePath";
import authService from "../../../services/authService";

const Login = () => {

  const navigator = useNavigate();

  const [formData, setFormData] = useState({});

  const handleChange = (event) => {
    const { target: { name, value } } = event;
    formData[name] = value;
    setFormData({...formData});
  }

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      await authService.login(formData);
      navigator(routePath.HOME);
    }
    catch(error) {
      toast.error(error.response?.data.message);
    }
  }

  return (
    <Form className="component-margin component-border" onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicUsername">
        <Form.Label className="fw-bold" style={{fontSize: "20px"}}>Username</Form.Label>
        <Form.Control 
          type="text" 
          placeholder="Enter username" 
          name="username" 
          value={formData.username || ''} 
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label className="fw-bold" style={{fontSize: "20px"}}>Password</Form.Label>
        <Form.Control 
          type="password" 
          placeholder="Enter password" 
          name="password" 
          value={formData.password || ''} 
          onChange={handleChange}
        />
      </Form.Group>
      
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  )
}

export default Login;