import { Box } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { LogoIcon } from "../components/icons";
import "./LayoutAuthentication.css";
import PropTypes from "prop-types";

const LayoutAuthentication = (props) => {
  const { children, heading = "" } = props;
  return (
    <div className="auth-layout">
      <img
        src="./static-data/Ellipse.png"
        alt="ellipse"
        className="ellipse-bg"
      />
      <Link to="/" className="image-logo">
        <LogoIcon />
      </Link>
      <Box w="100%" maxW="556px" bg="white" borderRadius="md" className="box">
        <h1 className="auth-layout-header">{heading}</h1>
        {children}
      </Box>
    </div>
  );
};

LayoutAuthentication.propTypes = {
    heading: PropTypes.string,
    children: PropTypes.node,
};

export default LayoutAuthentication;
