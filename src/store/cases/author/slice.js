import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { createAuthorThunk, deleteAuthorThunk, editAuthorThunk } from "./action";

const initialState = {
    isLoading: false,
    nameAuthor: '',
    description: '',
    isEditing: false,
    editAuthorId: '',
    isModalDelAuthorOpen: false,
    isModalAddOpen: false,
};

export const deleteAuthor = createAsyncThunk('author/deleteAuthor', deleteAuthorThunk);
export const createAuthor = createAsyncThunk('author/createAuthor', createAuthorThunk);
export const editAuthor = createAsyncThunk('author/editAuthor', editAuthorThunk);

const authorSlice = createSlice({
    name: 'author',
    initialState,
    reducers: {
        handleChange : (state, { payload: { name, value } }) => {
            state[name] = value;
        },
        clearValues: (state) => {
            state.nameAuthor='';
            state.description='';
        },
        setEditAuthor: (state, { payload }) => {
            return { ...state, isEditing: true, ...payload };
        }, 
        toggleModalDelAuthor: (state) => {
            state.isModalDelAuthorOpen = !state.isModalDelAuthorOpen;
        },
        toggleModalAdd: (state) => {
            state.isModalAddOpen = !state.isModalAddOpen;
            state.isEditing = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createAuthor.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createAuthor.fulfilled, (state) => {
                state.isLoading = false;
                toast.success('Author Created');
            })
            .addCase(createAuthor.rejected, (state) => {
                state.isLoading = false;
                toast.error('Error');
            })
            .addCase(deleteAuthor.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteAuthor.fulfilled, (state) => {
                state.isLoading = false;
                toast.success('Author removed');
                state.isModalDelAuthorOpen = !state.isModalDelAuthorOpen;
            })
            .addCase(deleteAuthor.rejected, (state) => {
                state.isLoading = false;
                toast.error('Error');
            })
            .addCase(editAuthor.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(editAuthor.fulfilled, (state) => {
                state.isLoading = false;
                toast.success('Category Modified...');
                state.isEditing = !state.isEditing;
            })
            .addCase(editAuthor.rejected, (state) => {
                state.isLoading = false;
                toast.error('Error');
            });
    },
});

export const { handleChange, clearValues, setEditAuthor, toggleModalDelAuthor, toggleModalAdd } = authorSlice.actions;
export default authorSlice.reducer;