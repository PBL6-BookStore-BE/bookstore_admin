import { Icon } from "@chakra-ui/react";

function PrevRightIcon(props) {
  return (
    <Icon
      height="24px"
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <path
        d="M19 12H5"
        stroke="#8D28AD"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        
      />
      <path
        d="M12 5L5 12L12 19"
        stroke="#8D28AD"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
}

export default PrevRightIcon;
