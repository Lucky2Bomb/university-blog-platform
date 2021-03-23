import React, { useEffect, useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import NavbarLayout from '../../layouts/NavbarLayout';
import HeaderLayout from '../../layouts/HeaderLayout';
import { observer } from 'mobx-react-lite';
import TextEditor from '../../components/TextEditor';
import { useInput } from '../../hooks/useInput';
import FileUpload from '../../components/FileUpload';
import { Button, Grid } from '@material-ui/core';
import { sendPublication } from '../../requests/news/send-publication';
import Router from 'next/router';

const Create = observer(() => {
    const [picture, setPicture] = useState(null);
    const [file, setFile] = useState(null);
    const [isDisabledButtons, setIsDisabledButtons] = useState(false);
    const [isDisablePictureButton, setIsDisablePictureButton] = useState(false);
    const [isDisableFileButton, setIsDisableFileButton] = useState(false);
    const header = useInput("");
    const text = useInput("");
    const send = () => {
        const formData = new FormData();
        formData.append("header", header.value);
        formData.append("text", text.value.split('\n').join('\\n'));
        formData.append("picture", picture);
        formData.append("file", file);
        setIsDisabledButtons(true);
        sendPublication(formData, localStorage.getItem("token")).finally(() => {
            setIsDisabledButtons(false);
            Router.push("/news");
        });
    }

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            Router.push("/login");
        }
    }, [])

    useEffect(() => {
        if (picture) {
            setIsDisablePictureButton(true);
        }
        if (file) {
            setIsDisableFileButton(true);
        }
    }, [file, picture]);

    return (
        <MainLayout>
            <NavbarLayout>
                <HeaderLayout headerText={"НОВАЯ ПУБЛИКАЦИЯ"}>
                    <Grid container direction="row" paddingTop="20px" gap={2}>
                        <FileUpload setFile={setPicture} accept="image/*">
                            <Button variant="outlined" disabled={isDisabledButtons || isDisablePictureButton}>Загрузить изображение (до 5 мб)</Button>
                        </FileUpload>
                        <FileUpload setFile={setFile} accept="*">
                            <Button variant="outlined" disabled={isDisabledButtons || isDisableFileButton}>Загрузить файл (до 15 мб)</Button>
                        </FileUpload>
                        <TextEditor header={header} text={text} />
                        <Grid container justifyContent="flex-end" paddingTop="16px">
                            <Button variant="contained" disabled={isDisabledButtons} onClick={send}>Отправить</Button>
                        </Grid>
                    </Grid>
                </HeaderLayout>
            </NavbarLayout>
        </MainLayout>
    )

});

export default Create;