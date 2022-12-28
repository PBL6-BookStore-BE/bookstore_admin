import React, { useCallback, useEffect } from 'react'
import { VStack, Heading} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { listAuthors } from "../../store/cases/getAll/action"
import { toggleModalAdd } from '../../store/cases/author/slice';
import ModalDelete from '../../components/ModalDelete/ModalDelete';
import FormAddAuthor from '../../components/FormAddAuthor/FormAddAuthor'
import SearchAdmin from '../../components/SearchAdmin/SearchAdmin';
import AuthorContainer from '../../components/AuthorContainer/AuthorContainer';

const Author = () => {
    const dispatch = useDispatch();
    const { authors} = useSelector((state) => state.getAll);
    const loadAuthor = useCallback(async () => {
      try {
        dispatch(listAuthors());
      } catch (error) {
        console.log(error);
      }
    }, [dispatch]);

    useEffect(() => {
        loadAuthor();
    }, [loadAuthor]);

  return (
    <div>
        <VStack align='flex-start' spacing={8}>
            <Heading color='#8D28AD' size='lg'>Author</Heading>
            <SearchAdmin 
              phInput='Search by author name'
              phSelect='Author'
              nameSelect='searchInSelect'
              nameInput='search'
              list={authors.dataInSelect}
              button='+ Add Author'
              modalAdd={toggleModalAdd()}
              valueInput={authors.search}
              valueSelect={authors.searchInSelect}
            />
            <AuthorContainer />

        </VStack>
        <FormAddAuthor/>
        <ModalDelete />
    </div>
  )
}

export default Author