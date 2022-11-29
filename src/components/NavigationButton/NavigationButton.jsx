import { TriangleUpIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import React from "react";
import './NavigationButton.css';

const NavigationButton = ({ onClick, isOpen }) => {
  return (
    <Button
      onClick={onClick}
      colorScheme="purple"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      transition='all 500ms'
    >
      <span>Menu</span>
      <TriangleUpIcon w={2} h={2} marginLeft="10px" transition='transform 500ms' className={`${isOpen ? 'rotate' : ''}`} />
    </Button>
  );
};

export default NavigationButton;