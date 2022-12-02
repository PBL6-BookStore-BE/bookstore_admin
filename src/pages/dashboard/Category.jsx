import FormAddCate from '../../components/FormAddCate/FormAddCate'
import ModalDelete from '../../components/ModalDelete/ModalDelete';
import CategoriesContainer from '../../components/CategoriesContainer/CategoriesContainer';
import { Heading, VStack } from '@chakra-ui/react';
import SearchAdmin from '../../components/SearchAdmin/SearchAdmin';
import { toggleModalAdd } from '../../store/cases/category/slice';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect } from 'react';
import { listCategories } from '../../store/cases/getAll/action';

const Category = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.getAll);
  
  const loadCategory = useCallback(async () => {
    try {
      dispatch(listCategories());
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);
  
  useEffect(() => {
    loadCategory();
  }, [loadCategory]);

  return (
    <div>
        <VStack align='flex-start' spacing={8}>
            <Heading color='#8D28AD' size='lg'>Category</Heading>
            <SearchAdmin 
              phInput='Search by category type'
              phSelect='Category'
              nameSelect='searchInSelect'
              nameInput='search'
              list={categories.dataInSelect}
              button='+ Add Category'
              modalAdd={toggleModalAdd()}
              valueInput={categories.search}
              valueSelect={categories.searchInSelect}
            />
            <CategoriesContainer />
        </VStack>
        <FormAddCate/>
        <ModalDelete />
    </div>
  )
}

export default Category