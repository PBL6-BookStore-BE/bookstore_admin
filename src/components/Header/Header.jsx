import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AccountButton from "../AccountButton/AccountButton";
import BookLogo from "../common/BookLogo";
import { CartIcon } from "../icons";
import NavBar from "../NavBar/NavBar";
import NavigationButton from "../NavigationButton/NavigationButton";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);

  return (
    <Box paddingTop="20px">
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        marginBottom="16px"
        className="container"
      >
        <Link w="176px" h="45px" to="/">
          <BookLogo />
        </Link>
        <NavigationButton
          onClick={() => setIsOpen((prevState) => !prevState)}
          isOpen={isOpen}
        />
        <InputGroup w="500px">
          <Input pr="4.5rem" type="text" placeholder="Find books here..." />
          <InputRightElement children={<SearchIcon color="#A4A4A4" />} />
        </InputGroup>
        <Link to="/checkout">
          <IconButton
            colorScheme="none"
            aria-label="Cart"
            icon={<CartIcon />}
          />
        </Link>
        {user ? (
          <AccountButton username={user} />
        ) : (
          <Flex alignItems="center">
            <Button variant="link">
              <Link to="/login">Sign in</Link>
            </Button>
            <Button colorScheme="purple" ml={6}>
              <Link to="/register">Create Account</Link>
            </Button>
          </Flex>
        )}
      </Box>
      {isOpen && <NavBar />}
    </Box>
  );
};

export default Header;
