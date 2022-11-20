import React from "react";
import { Col, Row, Card } from "react-bootstrap";
import axios from "axios";

import { useEffect, useCallback, useState } from "react";
import { POSDevicesTable } from "../../../components/Tables";
import { useErrorStatus } from "../../../core/api-handler/api-handler";

const POSListPage = () => {
  const [userDevices, setUserDevices] = useState<any>([]);
  const { setErrorStatusCode } = useErrorStatus();
  const [usePage, setUsePage] = useState(1);
  const fetchData = useCallback(async () => {
    let API = process.env.REACT_APP_API_URL;
    try {
      const APIresponse = await axios.get(
        `${API}/POSDevice/getAllPOSDevices?page=${usePage}`,
        {
          withCredentials: true,
        }
      );
      if (APIresponse) {
        setUserDevices(APIresponse.data);
      }
    } catch (error: any) {
      if (error.response) {
        setErrorStatusCode(error.response.status);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
      console.log(error.config);
    }
  }, [setErrorStatusCode, usePage]);
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <Row>
        <Col xs={12}  md={12} lg={12}>
          <Card border="light" className="bg-white shadow-sm mb-4">
            <Card.Body>
              <h5 className="mb-4">POS List</h5>
              {userDevices.users?.length > 0 ? (
                <POSDevicesTable
                  componentDataSource={userDevices?.users}
                  length={userDevices?.users?.length}
                  lengthtotal={userDevices?.itemCount}
                  actualPage={usePage}
                  setPage={setUsePage}
                />
              ) : (
                "No se encontraron registros"
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};
export default POSListPage;
