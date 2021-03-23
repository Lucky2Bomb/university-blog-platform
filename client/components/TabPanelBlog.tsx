import React, { useState, useEffect } from 'react';
import { useInput } from './../hooks/useInput';
import { Input, TextField, Grid, Button } from '@material-ui/core';
import TextEditor from './TextEditor';
import { sendPublication } from '../requests/news/send-publication';
import Router from 'next/router';
import FileUpload from './FileUpload';
import { observer } from 'mobx-react-lite';
import rootStore from '../store/rootStore';

interface TabPanelBlogProps {
    text: any;
    header: any;
}

const TabPanelBlog: React.FC<TabPanelBlogProps> = observer(({ text, header }) => {
    const [picture, setPicture] = useState(null);
    const [file, setFile] = useState(null);
    const [isDisabledButtons, setIsDisabledButtons] = useState(false);
    const [isDisablePictureButton, setIsDisablePictureButton] = useState(false);
    const [isDisableFileButton, setIsDisableFileButton] = useState(false);
    const { goUpdateProfile } = rootStore.myProfile;

    const send = () => {
        const formData = new FormData();
        formData.append("header", header.value);
        formData.append("text", text.value.split('\n').join('\\n'));
        formData.append("picture", picture);
        formData.append("file", file);
        setIsDisabledButtons(true);
        sendPublication(formData, localStorage.getItem("token")).then(() => {
            Router.reload();
        }).finally(() => {
            setIsDisabledButtons(false);
            goUpdateProfile();
        });
    }

    useEffect(() => {
        if (picture) {
            setIsDisablePictureButton(true);
        }
        if (file) {
            setIsDisableFileButton(true);
        }
    }, [file, picture]);
    return (
        <Grid direction="column" gap={2} container>

            <Grid>
                <Grid container direction="row" gap={2} marginBottom="16px">
                    <FileUpload setFile={setPicture} accept="image/*">
                        <Button variant="outlined" disabled={isDisabledButtons || isDisablePictureButton}>Прикрепить изображение (до 5 мб)</Button>
                    </FileUpload>
                    <FileUpload setFile={setFile} accept="*">
                        <Button variant="outlined" disabled={isDisabledButtons || isDisableFileButton}>Прикрепить файл (до 15 мб)</Button>
                    </FileUpload>
                </Grid>
                <TextEditor text={text} header={header} rows={12} />
                <Grid container justifyContent="flex-end" direction="row" marginTop="16px">
                    <Button variant="contained" onClick={send}>Отправить</Button>
                </Grid>
            </Grid>

        </Grid>
    )
});

export default TabPanelBlog;