import React, { useCallback, useEffect } from "react";
import { Col, Row, Card, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Routes } from "../../../routes";
import { UpdateRequest } from "../../models/device_edit";

const DeviceEditPage = (props: any) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();
  let API = process.env.REACT_APP_API_URL;
  const history = useHistory();
  const device_id = props.match.params.id;

  const fetchData = useCallback(async () => {
    let API = process.env.REACT_APP_API_URL;
    const APIresponse = await axios.post(
      `${API}/userDevice/getOneDevice`,
      {
        userDeviceName: device_id,
      },

      {
        withCredentials: true,
      }
    );
    if (APIresponse) {
      const dataRes = APIresponse.data;

      setValue("devicename", dataRes["userName"]);
      setValue("password", dataRes["userPassword"]);
      setValue("confirmpassword", dataRes["userPassword"]);
    }
  }, [setValue, device_id]);
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  async function onSubmit(data: any) {
    let payload: UpdateRequest = {
      deviceName: data.devicename,
      userPassword: data.password,
      device_uuid: device_id,
    };
    
    if (data.password === data.confirmpassword) {
      const APIresponse = await axios.post(
        `${API}/userDevice/updateOneDevice`,
        payload,
        {
          withCredentials: true,
        }
      );
      if (APIresponse) {
        
        history.replace(Routes.DashboardOverview.path);
      }
    }
  }

  async function onDelete() {
    let payload = {
      device_uuid: device_id,
    };

    const APIresponse = await axios.post(
      `${API}/POSDevice/removeOnePOSDevice`,
      payload,
      {
        withCredentials: true,
      }
    );
    if (APIresponse) {
      console.log(APIresponse);
      history.replace(Routes.DashboardOverview.path);
    }
  }
  return (
    <>
      <Row>
        <Col xs={12} xl={8}>
          <Card border="light" className="bg-white shadow-sm mb-4">
            <Card.Body>
              <h5 className="mb-4"> Device information</h5>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Row>
                  <Col md={6} className="mb-3">
                    <Form.Group id="devicename">
                      <Form.Label>Device Name</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Enter your device name"
                        {...register("devicename", {
                          required: true,
                          minLength: 5,
                        })}
                        className={`form-control ${
                          errors.devicename ? "is-invalid" : ""
                        }`}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6} className="mb-3">
                    <Form.Group id="password">
                      <Form.Label>Device Password</Form.Label>
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
                    Update Device
                  </Button>
                </div>
                <div className="mt-3">
                  <Button
                    variant="danger"
                    type="submit"
                    onClick={handleSubmit(onDelete)}
                  >
                    Delete
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
export default DeviceEditPage;
