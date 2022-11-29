import { Image } from '@chakra-ui/react';

function ImagePreview({ value }) {
//   if (isLoading) {
//     return (
//       <Spinner speed=".3s" fontSize="44px" />
//     );
//   }

  return (
    <Image src={value} maxW="44px" maxH="44px" ml="10px" />
  );
}

export default ImagePreview;
