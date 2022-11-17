import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBoxOpen,
  faCartArrowDown,
  faChartPie,
  faChevronDown,
  faClipboard,
  faPlus,
  faRocket,
  faStore,
} from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Button, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Routes } from "../routes";
import DeviceList from "./deviceManager/DeviceList";

export default () => {
  return (
    <>
      <div className="d-flex  flex-wrap flex-md-nowrap align-items-center py-4">
        <Dropdown>
          <Dropdown.Toggle
            as={Button}
            variant="secondary"
            className="text-dark me-2"
          >
            <FontAwesomeIcon icon={faPlus} className="me-2" />
            <span>New</span>
          </Dropdown.Toggle>
          <Dropdown.Menu className="dashboard-dropdown dropdown-menu-left mt-2">
            <Dropdown.Item>
              <Button as={Link} to={Routes.addDevice.path}>
                <FontAwesomeIcon icon={faBoxOpen} className="me-2" />
                {"Add Devices"}
              </Button>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <div className="d-flex">
          <Dropdown>
            <Dropdown.Toggle as={Button} variant="primary">
              <FontAwesomeIcon icon={faClipboard} className="me-2" />
              {"Reports"}
              <span className="icon icon-small ms-1">
                <FontAwesomeIcon icon={faChevronDown} />
              </span>
            </Dropdown.Toggle>
            <Dropdown.Menu className="dashboard-dropdown dropdown-menu-left mt-1">
              <Dropdown.Item>
                <FontAwesomeIcon icon={faBoxOpen} className="me-2" />
                {"Products"}
              </Dropdown.Item>
              <Dropdown.Item>
                <FontAwesomeIcon icon={faStore} className="me-2" />
                {"Customers"}
              </Dropdown.Item>
              <Dropdown.Item>
                <FontAwesomeIcon icon={faCartArrowDown} className="me-2" />
                {"Orders"}
              </Dropdown.Item>
              <Dropdown.Item>
                <FontAwesomeIcon icon={faChartPie} className="me-2" />
                {"Console"}
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item>
                <FontAwesomeIcon
                  icon={faRocket}
                  className="text-success me-2"
                />
                {"All Reports"}
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      <Row>
        <Col xs={12}>
          <DeviceList />
        </Col>
      </Row>
    </>
  );
};
