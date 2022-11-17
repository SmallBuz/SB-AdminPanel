import React, { useEffect, useCallback, useState } from "react";
import { useErrorStatus } from "../core/api-handler/api-handler";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCog, faSearch } from "@fortawesome/free-solid-svg-icons";
import {
  Col,
  Row,
  Form,
  Button,
  ButtonGroup,
  InputGroup,
  Dropdown,
} from "react-bootstrap";

import { OrdersTable } from "../components/Tables";
import fakedatatrans1 from "../data/fakedatatrans1";

const OrdersPage = () => {
  const [userArchives, setuserArchives] = useState<any>([]);
  const { setErrorStatusCode } = useErrorStatus();
  const [usePage] = useState(1);
  const fetchData = useCallback(async () => {
    let API = process.env.REACT_APP_API_URL;
    try {
      const APIresponse = await axios.get(
        `${API}/userArchives/GetAllUserArchives?page=${usePage}`,
        {
          withCredentials: true,
        }
      );
      if (APIresponse) {
        console.log(APIresponse.data);
        setuserArchives(APIresponse.data);
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
      <div className="table-settings mb-4">
        <Row className="justify-content-between align-items-center">
          <Col xs={8} md={6} lg={3} xl={4}>
            <InputGroup>
              <InputGroup.Text>
                <FontAwesomeIcon icon={faSearch} />
              </InputGroup.Text>
              <Form.Control type="text" placeholder="Search" />
            </InputGroup>
          </Col>
          <Col xs={4} md={2} xl={1} className="ps-md-0 text-end">
            <Dropdown as={ButtonGroup}>
              <Dropdown.Toggle
                split
                as={Button}
                variant="link"
                className="text-dark m-0 p-0"
              >
                <span className="icon icon-sm icon-gray">
                  <FontAwesomeIcon icon={faCog} />
                </span>
              </Dropdown.Toggle>
              <Dropdown.Menu className="dropdown-menu-xs dropdown-menu-right">
                <Dropdown.Item className="fw-bold text-dark">
                  Show
                </Dropdown.Item>
                <Dropdown.Item className="d-flex fw-bold">
                  10{" "}
                  <span className="icon icon-small ms-auto">
                    <FontAwesomeIcon icon={faCheck} />
                  </span>
                </Dropdown.Item>
                <Dropdown.Item className="fw-bold">20</Dropdown.Item>
                <Dropdown.Item className="fw-bold">30</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
      </div>
      {userArchives?.archives?.length > 0 ? (
        <OrdersTable componentDataSource={fakedatatrans1} />
      ) : (
        "No se encontraron registros"
      )}
    </>
  );
};
export default OrdersPage;
