import { VStack, Heading } from "@chakra-ui/react";
import ModalDelete from '../../components/ModalDelete/ModalDelete'
import FormAddPublisher from '../../components/FormAddPublisher/FormAddPublisher';
import PublisherContainer from '../../components/PublisherContainer/PublisherContainer';
import { toggleModalAdd } from "../../store/cases/publisher/slice";
import { useDispatch, useSelector } from "react-redux";
import SearchAdmin from "../../components/SearchAdmin/SearchAdmin";
import { listPublishers } from "../../store/cases/getAll/action";
import { useCallback, useEffect } from "react";

const Publisher = () => {
    const dispatch = useDispatch();
    const { publishers } = useSelector((state) => state.getAll);

    const loadPublisher = useCallback(async () => {
        try {
        dispatch(listPublishers());
        } catch (error) {
        console.log(error);
        }
    }, [dispatch]);
    
    useEffect(() => {
        loadPublisher();
    }, [loadPublisher]);
  return (
    <div >
        <VStack align='flex-start' spacing={8} >
            <Heading color='#8D28AD' size='lg'>Publisher</Heading>
            <SearchAdmin 
                phInput='Search by publishers name'
                phSelect='Publisher'
                nameSelect='searchInSelect'
                nameInput='search'
                list={publishers.dataInSelect}
                button='+ Add Publisher'
                modalAdd={toggleModalAdd()}
                valueInput={publishers.search}
                valueSelect={publishers.searchInSelect}
            />
            <PublisherContainer />
        </VStack>
        <FormAddPublisher/>
        <ModalDelete />
    </div>
  )
}

export default Publisher