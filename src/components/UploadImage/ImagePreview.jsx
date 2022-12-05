import { Image } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { removeImage } from '../../store/cases/book/slice';

function ImagePreview({ value, src }) {
//   if (isLoading) {
//     return (
//       <Spinner speed=".3s" fontSize="44px" />
//     );
//   }
  const dispatch = useDispatch();
  const handleRemove = (event) => {
    dispatch(removeImage(event.target.currentSrc));
  }
  if (value !== undefined) {
    return (
      <Image src={value} maxW="44px" maxH="44px" ml="10px" onClick={handleRemove} />
    );
  } else {
    return (
      <Image src={src} maxW="44px" maxH="44px" ml="10px" onClick={handleRemove} />
    );
  }
}

export default ImagePreview;
