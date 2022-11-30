import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { createCateThunk, deleteCateThunk, editCateThunk} from "./action";

const initialState = {
    isLoading: false,
    nameCate: '',
    isEditing: false,
    editCateId: '',
    isModalDelOpen: false,
    isModalAddOpen: false,
};

export const createCate = createAsyncThunk('categories/createCate', createCateThunk);
export const deleteCate = createAsyncThunk('category/deleteCate', deleteCateThunk);
export const editCate = createAsyncThunk('category/editCate', editCateThunk);

const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        handleChange : (state, { payload: { name, value } }) => {
            state[name] = value;
        },
        clearValues: (state) => {
            state.nameCate='';
        },
        setEditCate: (state, { payload }) => {
            return { ...state, isEditing: true, ...payload };
        }, 
        toggleModalDel: (state) => {
            state.isModalDelOpen = !state.isModalDelOpen;
        },
        toggleModalAdd: (state) => {
            state.isModalAddOpen = !state.isModalAddOpen;
            state.isEditing = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createCate.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createCate.fulfilled, (state) => {
                state.isLoading = false;
                toast.success('Category Created');
            })
            .addCase(createCate.rejected, (state) => {
                state.isLoading = false;
                toast.error('Error');
            })
            .addCase(deleteCate.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteCate.fulfilled, (state) => {
                state.isLoading = false;
                toast.success('Category removed');
                state.isModalDelOpen = !state.isModalDelOpen;
            })
            .addCase(deleteCate.rejected, (state) => {
                state.isLoading = false;
                toast.error('Error');
            })
            .addCase(editCate.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(editCate.fulfilled, (state) => {
                state.isLoading = false;
                toast.success('Category Modified...');
                state.isEditing = !state.isEditing;
            })
            .addCase(editCate.rejected, (state) => {
                state.isLoading = false;
                toast.error('Error');
            });
    },
});

export const { handleChange, clearValues, setEditCate, toggleModalDel, toggleModalAdd } = categorySlice.actions;
export default categorySlice.reducer;