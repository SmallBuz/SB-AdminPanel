import React, { useCallback, useEffect } from "react";
import { Col, Row, Card, Form } from "@themesberg/react-bootstrap";
import { useForm } from "react-hook-form";
import axios from "axios";

export default (props) => {
  const {
    register,
    setValue,
    formState: { errors },
  } = useForm();

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
      setValue("devicename", dataRes["userName"]);
    }
  }, [setValue, device_id]);
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <Row>
        <Col xs={12} xl={8}>
          <Card border="light" className="bg-white shadow-sm mb-4">
            <Card.Body>
              <h5 className="mb-4">Device information</h5>
              <Form>
                <Row>
                  <Col md={6} className="mb-3">
                    <Form.Group id="devicename">
                      <Form.Label>Device Name</Form.Label>
                      <Form.Control
                        required
                        disabled
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
                        disabled
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
                        {errors.password?.message}
                      </div>
                    </Form.Group>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};
