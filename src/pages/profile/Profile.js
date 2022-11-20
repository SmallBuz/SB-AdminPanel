import { useEffect, useCallback } from "react";
import { Col, Row, Card, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useErrorStatus } from "../../core/api-handler/api-handler";
const Profile = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const { setErrorStatusCode } = useErrorStatus();

  const fetchData = useCallback(async () => {
    let API = process.env.REACT_APP_API_URL;
    try {
      const APIresponse = await axios.get(`${API}/Auth/profile`, {
        withCredentials: true,
      });
      if (APIresponse) {
        setValue("firstname", APIresponse["data"]["firstName"]);

        setValue("middlename", APIresponse["data"]["middleName"]);
        setValue("lastname", APIresponse["data"]["lastName"]);
        setValue("mothername", APIresponse["data"]["motherName"]);
        setValue("email", APIresponse["data"]["userAuth"]["email"]);
      }
    } catch (error) {
      console.log(error);
      if (error.response) {
        setErrorStatusCode(error.response.status);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
      console.log(error.config);
    }
  }, [setValue, setErrorStatusCode]);
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  async function onSubmit(data) {
    let API = process.env.REACT_APP_API_URL;
    let payload = {
      firstName: data.firstname,
      middleName: data.middlename,
      lastName: data.lastname,
      motherName: data.mothername,
      email: data.email,
    };

    const APIresponse = await axios.post(`${API}/Auth/updateprofile`, payload, {
      withCredentials: true,
    });

    if (APIresponse) {
      window.location.reload();
    }
  }
  return (
    <>
      <Row>
        <Col xs={12} xl={8}>
          <Card border="light" className="bg-white shadow-sm mb-4">
            <Card.Body>
              <h5 className="mb-4">My Information</h5>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Row>
                  <Col md={6} className="mb-3">
                    <Form.Group id="firstname">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Enter your first name"
                        {...register("firstname", {
                          required: true,
                        })}
                        className={`form-control ${
                          errors.firstname ? "is-invalid" : ""
                        }`}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6} className="mb-3">
                    <Form.Group id="middleName">
                      <Form.Label>Middle Name</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Enter your middle name"
                        {...register("middlename", {
                          required: true,
                        })}
                        className={`form-control ${
                          errors.middleName ? "is-invalid" : ""
                        }`}
                      />
                      <div className="invalid-feedback">
                        {errors.middleName?.message}
                      </div>
                    </Form.Group>
                  </Col>
                  <Col md={6} className="mb-3">
                    <Form.Group id="middleName">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        disabled
                        required
                        type="email"
                        placeholder="example@company.com"
                        {...register("email", {
                          required: true,
                          minLength: 5,
                        })}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6} className="mb-3">
                    <Form.Group id="lastname">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Enter your last name"
                        {...register("lastname", {
                          required: true,
                        })}
                        className={`form-control ${
                          errors.lastname ? "is-invalid" : ""
                        }`}
                      />
                      <div className="invalid-feedback">
                        {errors.lastname?.message}
                      </div>
                    </Form.Group>
                  </Col>

                  <Col md={6} className="mb-3">
                    <Form.Group id="mothername">
                      <Form.Label>Mother Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter your mother name"
                        {...register("mothername", {})}
                        className={`form-control ${
                          errors.mothername ? "is-invalid" : ""
                        }`}
                      />
                      <div className="invalid-feedback">
                        {errors.mothername?.message}
                      </div>
                    </Form.Group>
                  </Col>
                </Row>

                <div className="mt-3">
                  <Button variant="primary" type="submit">
                    Update Profile
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};
export default Profile;
