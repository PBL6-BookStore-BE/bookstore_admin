import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { createPublisherThunk, deletePublisherThunk, editPublisherThunk } from "./action";

const initialState = {
    isLoading: false,
    namePublisher: '',
    isEditing: false,
    editPublisherId: '',
    isModalDelPublisherOpen: false,
    isModalAddOpen: false,
};

export const deletePublisher = createAsyncThunk('publisher/deletePublisher', deletePublisherThunk);
export const createPublisher = createAsyncThunk('publisher/createPublisher', createPublisherThunk);
export const editPublisher = createAsyncThunk('publisher/editPublisher', editPublisherThunk);

const publisherSlice = createSlice({
    name: 'publisher',
    initialState,
    reducers: {
        handleChange : (state, { payload: { name, value } }) => {
            state[name] = value;
        },
        clearValues: (state) => {
            state.namePublisher='';
        },
        setEditPublisher: (state, { payload }) => {
            return { ...state, isEditing: true, ...payload };
        }, 
        toggleModalDelPublisher: (state) => {
            state.isModalDelPublisherOpen = !state.isModalDelPublisherOpen;
        },
        toggleModalAdd: (state) => {
            state.isModalAddOpen = !state.isModalAddOpen;
            state.isEditing = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createPublisher.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createPublisher.fulfilled, (state) => {
                state.isLoading = false;
                toast.success('Publisher Created');
            })
            .addCase(createPublisher.rejected, (state) => {
                state.isLoading = false;
                toast.error('Error');
            })
            .addCase(deletePublisher.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deletePublisher.fulfilled, (state) => {
                state.isLoading = false;
                toast.success('Publisher removed');
                state.isModalDelPublisherOpen = !state.isModalDelPublisherOpen;
            })
            .addCase(deletePublisher.rejected, (state) => {
                state.isLoading = false;
                toast.error('Error');
            })
            .addCase(editPublisher.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(editPublisher.fulfilled, (state) => {
                state.isLoading = false;
                toast.success('Publisher Modified...');
                state.isEditing = !state.isEditing;
            })
            .addCase(editPublisher.rejected, (state) => {
                state.isLoading = false;
                toast.error('Error');
            });
    },
});

export const { handleChange, clearValues, setEditPublisher, toggleModalDelPublisher, toggleModalAdd } = publisherSlice.actions;
export default publisherSlice.reducer;