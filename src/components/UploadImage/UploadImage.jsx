import { LinkIcon } from '@chakra-ui/icons';
import { Box, Button, Input } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addImageBook } from '../../store/cases/book/slice';
import ImagePreview from './ImagePreview';

const UploadImage = () => {
    const dispatch = useDispatch();
    const { addBook } = useSelector((store) => store.book);
    const onFileChange = (event) => {
        const target = event.target;
        console.log(target.files[0]);
        if (target.files && target.files?.length > 0) {
            const uploadedFileName = target.files[0].name.replace(/[^\w\-.]/g, '');
            const reader = new FileReader();
            console.log(reader);
            reader.onload = () => {
                dispatch(addImageBook({ src: reader.result, filename: uploadedFileName, files: target.files[0] }));
            }
            reader.readAsDataURL(target.files[0]);
        }
    };
    return (
        <Box display='flex'>
            <label htmlFor="upload-image">
                <Button
                    as="span"
                    type="button"
                    style={{ cursor: "pointer" }}
                >
                    <LinkIcon />
                </Button>
                <Input id="upload-image" hidden type="file" accept="image/x-png,image/gif,image/jpeg" onChange={onFileChange} />
            </label>
            {addBook.list_img.map((img) => (
                <ImagePreview key={img.filename} value={img.src}/>
            ))}
        </Box>
    );
};

export default UploadImage;