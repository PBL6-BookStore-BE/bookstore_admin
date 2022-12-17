import { TriangleDownIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { UserIcon } from "../icons";
import "./AccountButton.css";

const AccountButton = ({ username, props }) => {
  return (
    <Menu>
      <MenuButton as={Button} colorScheme="purple" variant="outline" {...props}>
        <Flex justifyContent="space-between" alignItems="center">
          <UserIcon />
          <p className="name-account">{username}</p>
          <TriangleDownIcon color="purple" w={2} h={2} />
        </Flex>
      </MenuButton>
      <MenuList>
        <MenuItem>
          <Link to="/logout" className="link-button">Log out</Link>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default AccountButton;
