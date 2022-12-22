import { Icon } from '@chakra-ui/react';
import React from 'react';

const PrintIcon = (props) => {
  return (
    <Icon stroke="currentColor" fill={props.fill ? props.fill : "none"} stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height={props.height ? props.height : "1em"} width={props.width ? props.width : "1em"}><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></Icon>
  );
};

export default PrintIcon;