import React from "react";
import { Col, Row, Card, Form, Button, InputGroup } from "react-bootstrap";
import { useForm } from "react-hook-form";
import axios from "axios";
import { RoleType } from "../../../core/utils/constants";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Routes } from "../../../routes";
import { useHistory } from "react-router-dom";
const POS = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const history = useHistory();
  let API = process.env.REACT_APP_API_URL;
  const userInfo = useSelector((state: RootState) => state.stateRole);
  async function onSubmit(data: any) {
    let payload = {
      firstName: data.emailPOS,
      lastName: data.emailPOS,
      email: data.emailPOS,
      password: data.password,
      role: RoleType.POS_ACCOUNT,
      uuid_master: userInfo.uuid,
    };

    if (data.password === data.confirmpassword) {
      const APIresponse = await axios.post(`${API}/Auth/signup`, payload, {
        withCredentials: true,
      });
      if (APIresponse) {
        history.push(Routes.DashboardOverview.path);
       
      }
    }
  }
  return (
    <>
      <Row>
        <Col xs={12} xl={8}>
          <Card border="light" className="bg-white shadow-sm mb-4">
            <Card.Body>
              <h5 className="mb-4"> General POS information</h5>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Row>
                  <Col md={6} className="mb-3">
                    <Form.Group id="emailPOS">
                      <Form.Label>POS Email</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FontAwesomeIcon icon={faEnvelope} />
                        </InputGroup.Text>
                        <Form.Control
                          required
                          type="text"
                          placeholder="Enter your POS email"
                          {...register("emailPOS", {
                            required: true,
                            minLength: 5,
                          })}
                          className={`form-control ${
                            errors.emailPOS ? "is-invalid" : ""
                          }`}
                        />
                      </InputGroup>
                    </Form.Group>
                  </Col>
                  <Col md={6} className="mb-3">
                    <Form.Group id="password">
                      <Form.Label>POS Password</Form.Label>
                      <Form.Control
                        required
                        type="password"
                        placeholder="Enter your device password"
                        {...register("password", {
                          required: true,
                          minLength: {
                            value: 8,
                            message: "Password must have at least 8 characters",
                          },
                        })}
                        className={`form-control ${
                          errors.password ? "is-invalid" : ""
                        }`}
                      />
                      <div className="invalid-feedback">
                        {`${errors.password?.message}`}
                      </div>
                    </Form.Group>
                  </Col>
                  <Col md={6} className="mb-3">
                    <Form.Group id="confirmpassword">
                      <Form.Label>Confirm Password</Form.Label>
                      <Form.Control
                        required
                        type="password"
                        placeholder="Confirm password"
                        {...register("confirmpassword", {
                          required: true,
                          minLength: {
                            value: 8,
                            message: "Password must have at least 8 characters",
                          },
                          validate: (val) => {
                            if (watch("password") !== val) {
                              return "Your passwords dont match";
                            }
                          },
                        })}
                        className={`form-control ${
                          errors.confirmpassword ? "is-invalid" : ""
                        }`}
                      />
                      <div className="invalid-feedback">
                        {`${errors.confirmpassword?.message}`}
                      </div>
                    </Form.Group>
                  </Col>
                </Row>

                <div className="mt-3">
                  <Button variant="primary" type="submit">
                    Save All
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
export default POS;
