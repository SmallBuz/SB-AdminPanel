import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faUnlockAlt } from "@fortawesome/free-solid-svg-icons";
import {
  Col,
  Row,
  Form,
  Card,
  Button,
  FormCheck,
  Container,
  InputGroup,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Routes } from "../routes";
import BgImage from "../assets/img/illustrations/signin.svg";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { SigninPayload } from "./models/signin";
import { RoleType } from "../core/utils/constants";

const Signin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const history = useHistory();
  let API = process.env.REACT_APP_API_URL;

  const [showMasterMail, setshowMasterMail] = useState(false);
  const handleChanges = (selectedOption: any) => {
    if (selectedOption.target.value === "POS") {
      return setshowMasterMail(true);
    }

    return setshowMasterMail(false);
  };

  async function onSubmit(data: any) {
    let account_type = "";
    data.ac_type === "MASTER"
      ? (account_type = RoleType.MASTER_ACCOUNT)
      : (account_type = RoleType.POS_ACCOUNT);

    let payload: SigninPayload = {
      identifier: data.email,
      password: data.password,
      email_master: data.master_account,
      ac_type: account_type,
    };

    const endpoint = `${API}/Auth/signin`;

    const APIresponse = await axios.post(endpoint, payload, {
      withCredentials: true,
    });
    if (APIresponse) {
      history.push(Routes.DashboardOverview.path);
    }
  }
  return (
    <main>
      <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
        <Container>
          <Row
            className="justify-content-center form-bg-image"
            style={{ backgroundImage: `url(${BgImage})` }}
          >
            <Col
              xs={12}
              className="d-flex align-items-center justify-content-center"
            >
              <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <div className="text-center text-md-center mb-4 mt-md-0">
                  <h3 className="mb-0">Sign in to our platform</h3>
                </div>
                <Form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
                  <Form.Group id="email" className="mb-4">
                    <Form.Label>Your Email</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faEnvelope} />
                      </InputGroup.Text>
                      <Form.Control
                        autoFocus
                        required
                        type="email"
                        placeholder="example@company.com"
                        {...register("email", {
                          required: true,
                          minLength: 5,
                        })}
                        className={`form-control ${
                          errors.email ? "is-invalid" : ""
                        }`}
                      />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group>
                    <Form.Group id="password" className="mb-4">
                      <Form.Label>Your Password</Form.Label>
                      <InputGroup
                        className={` ${errors.password ? "is-invalid" : ""}`}
                      >
                        <InputGroup.Text>
                          <FontAwesomeIcon icon={faUnlockAlt} />
                        </InputGroup.Text>
                        <Form.Control
                          required
                          type="password"
                          placeholder="Password"
                          {...register("password", {
                            required: true,
                            minLength: {
                              value: 8,
                              message:
                                "Password must have at least 8 characters",
                            },
                          })}
                        />
                      </InputGroup>
                      <div className="invalid-feedback">
                        {`${errors.password?.message}`}
                      </div>
                    </Form.Group>
                    {showMasterMail === true && (
                      <Form.Group id="master_account" className="mb-4">
                        <Form.Label>Your Master Account</Form.Label>
                        <InputGroup
                          className={` ${errors.password ? "is-invalid" : ""}`}
                        >
                          <InputGroup.Text>
                            <FontAwesomeIcon icon={faEnvelope} />
                          </InputGroup.Text>
                          <Form.Control
                            required
                            type="email"
                            placeholder="Master Account"
                            {...register("master_account", {
                              required: true,
                              minLength: 5,
                            })}
                          />
                        </InputGroup>
                        <div className="invalid-feedback">
                          {`${errors.password?.message}`}
                        </div>
                      </Form.Group>
                    )}

                    <Form.Group id="ac_type">
                      <Form.Select
                        aria-label="Select role "
                        required
                        {...register("ac_type", {
                          required: true,
                          onChange: handleChanges,
                        })}
                      >
                        <option disabled>Select role account</option>
                        <option value="MASTER">Master</option>
                        <option value="POS">POS</option>
                      </Form.Select>
                    </Form.Group>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <Form.Check type="checkbox">
                        <FormCheck.Input id="defaultCheck5" className="me-2" />
                        <FormCheck.Label
                          htmlFor="defaultCheck5"
                          className="mb-0"
                        >
                          Remember me
                        </FormCheck.Label>
                      </Form.Check>
                      <Card.Link className="small text-end">
                        Lost password?
                      </Card.Link>
                    </div>
                  </Form.Group>
                  <Button variant="primary" type="submit" className="w-100">
                    Sign in
                  </Button>
                </Form>
                {/* 
                     
              <div className="mt-3 mb-4 text-center">
                  <span className="fw-normal">or login with</span>
                </div>
                <div className="d-flex justify-content-center my-4">
                 
                  <Button
                    variant="outline-light"
                    className="btn-icon-only btn-pill text-facebook me-2"
                  >
                    <FontAwesomeIcon icon={faFacebookF} />
                  </Button>
                  <Button
                    variant="outline-light"
                    className="btn-icon-only btn-pill text-twitter me-2"
                  >
                    <FontAwesomeIcon icon={faTwitter} />
                  </Button>
                  <Button
                    variant="outline-light"
                    className="btn-icon-only btn-pil text-dark"
                  >
                    <FontAwesomeIcon icon={faGithub} />
                  </Button>
                </div>     
                   */}

                <div className="d-flex justify-content-center align-items-center mt-4">
                  <span className="fw-normal">
                    Not registered?
                    <Card.Link
                      as={Link}
                      to={Routes.Signup.path}
                      className="fw-bold"
                    >
                      {` Create account `}
                    </Card.Link>
                  </span>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};
export default Signin;
