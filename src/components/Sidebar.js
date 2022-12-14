import React, { useState } from "react";
import SimpleBar from "simplebar-react";
import { useLocation } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCog,
  faHandHoldingUsd,
  faSignOutAlt,
  faTable,
  faChartPie,
  faTimes,
  faInbox,
} from "@fortawesome/free-solid-svg-icons";
import {
  Nav,
  Badge,
  Image,
  Button,
  Dropdown,
  Accordion,
  Navbar,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Routes } from "../routes";
import CompanyLogo from "../assets/img/technologies/company-logo.svg";
import ProfilePicture from "../assets/img/team/profile-picture-3.jpg";
import { RoleType } from "../core/utils/constants";
const SideBarComponent = (props = {}) => {
  const location = useLocation();
  const { pathname } = location;
  const [show, setShow] = useState(false);
  const showClass = show ? "show" : "";
  const role = useSelector((state) => state.stateRole.role);
  const username = useSelector((state) => state.stateRole.username);
  const onCollapse = () => setShow(!show);

  const CollapsableNavItem = (props) => {
    const { eventKey, title, icon, children = null } = props;
    const defaultKey = pathname.indexOf(eventKey) !== -1 ? eventKey : "";

    return (
      <Accordion as={Nav.Item} defaultActiveKey={defaultKey}>
        <Accordion.Item eventKey={eventKey}>
          <Accordion.Button
            as={Nav.Link}
            className="d-flex justify-content-between align-items-center"
          >
            <span>
              <span className="sidebar-icon">
                <FontAwesomeIcon icon={icon} />{" "}
              </span>
              <span className="sidebar-text">{title}</span>
            </span>
          </Accordion.Button>
          <Accordion.Body className="multi-level">
            <Nav className="flex-column">{children}</Nav>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    );
  };

  const NavItem = (props) => {
    const {
      title,
      link,
      external,
      target,
      icon,
      image,
      badgeText,
      badgeBg = "secondary",
      badgeColor = "primary",
    } = props;
    const classNames = badgeText
      ? "d-flex justify-content-start align-items-center justify-content-between"
      : "";
    const navItemClassName = link === pathname ? "active" : "";
    const linkProps = external ? { href: link } : { as: Link, to: link };
    return (
      <Nav.Item className={navItemClassName} onClick={() => setShow(false)}>
        <Nav.Link {...linkProps} target={target} className={classNames}>
          <span className={image === CompanyLogo ? "image-center" : ""}>
            {icon ? (
              <span className="sidebar-icon ">
                <FontAwesomeIcon icon={icon} />{" "}
              </span>
            ) : null}
            {image ? (
              <Image
                src={image}
                width={150}
                height={150}
                className="sidebar-icon svg-icon "
              />
            ) : null}

            <span className="sidebar-text">{title}</span>
          </span>
          {badgeText ? (
            <Badge
              pill
              bg={badgeBg}
              text={badgeColor}
              className="badge-md notification-count ms-2"
            >
              {badgeText}
            </Badge>
          ) : null}
        </Nav.Link>
      </Nav.Item>
    );
  };

  return (
    <>
      <Navbar
        expand={false}
        collapseOnSelect
        variant="dark"
        className="bg-custom-style px-4 d-md-none"
      >
        <Navbar.Brand className="me-lg-5">
          <Image
            src={CompanyLogo}
            width={100}
            height={100}
            className="navbar-brand-light"
          />
        </Navbar.Brand>
        <Navbar.Toggle
          as={Button}
          aria-controls="main-navbar"
          onClick={onCollapse}
        >
          <span className="navbar-toggler-icon" />
        </Navbar.Toggle>
      </Navbar>
      <CSSTransition timeout={300} in={show} classNames="sidebar-transition">
        <SimpleBar
          className={`collapse ${showClass} sidebar d-md-block bg-custom-style text-white`}
        >
          <div className="sidebar-inner px-4 pt-3">
            <div className="user-card d-flex d-md-none align-items-center justify-content-between justify-content-md-center pb-4">
              <div className="d-flex align-items-center">
                <div className="user-avatar lg-avatar me-4">
                  <Image
                    src={ProfilePicture}
                    className="card-img-top rounded-circle border-white"
                  />
                </div>
                <div className="d-block">
                  <h6>Hi, {username}</h6>
                  <Button
                    as={Link}
                    variant="secondary"
                    size="xs"
                    to={Routes.Signin.path}
                    className="text-dark"
                  >
                    <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />{" "}
                    Sign Out
                  </Button>
                </div>
              </div>
              <Nav.Link
                className="collapse-close d-md-none"
                onClick={onCollapse}
              >
                <FontAwesomeIcon icon={faTimes} />
              </Nav.Link>
            </div>

            {role === RoleType.POS_ACCOUNT && (
              <Nav className="flex-column pt-5 pt-md-0 ">
                <Image
                  width={200}
                  height={200}
                  src={CompanyLogo}
                  className="card-img-top rounded-circle border-white"
                />
                <NavItem
                  title="Overview"
                  link={Routes.DashboardOverview.path}
                  icon={faChartPie}
                />
                <CollapsableNavItem
                  eventKey="orders/"
                  title="Order Manager"
                  icon={faTable}
                >
                  <NavItem
                    title="Overview"
                    link={Routes.Orders.path}
                    icon={faInbox}
                  />
                </CollapsableNavItem>
                <NavItem
                  title="Local Transactions"
                  icon={faHandHoldingUsd}
                  link={Routes.Transactions.path}
                />
                <NavItem
                  title="Device Settings"
                  icon={faCog}
                  link={Routes.Settings.path}
                />

                <Dropdown.Divider className="my-3 border-indigo" />
              </Nav>
            )}

            {role === RoleType.MASTER_ACCOUNT && (
              <Nav className="flex-column pt-5 pt-md-0 ">
                <Image
                  width={200}
                  height={200}
                  src={CompanyLogo}
                  className="card-img-top rounded-circle border-white"
                />
                <NavItem
                  title="Overview"
                  link={Routes.DashboardOverview.path}
                  icon={faChartPie}
                />
                <NavItem
                  title="POS Transactions"
                  icon={faHandHoldingUsd}
                  link={Routes.Transactions.path}
                />
                <NavItem
                  title="POS Settings"
                  icon={faCog}
                  link={Routes.settingsPos.path}
                />

                <Dropdown.Divider className="my-3 border-indigo" />
              </Nav>
            )}
          </div>
        </SimpleBar>
      </CSSTransition>
    </>
  );
};
export default SideBarComponent;
