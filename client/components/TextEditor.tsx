import React, { useState } from 'react';
import styles from '../styles/TextEditor.module.scss';
import { useInput } from './../hooks/useInput';
import { Input, TextField, Grid } from '@material-ui/core';

interface TextEditorProps {
    header: any;
    text: any;
    rows?: number;
}

const TextEditor: React.FC<TextEditorProps> = ({ text, header, rows = 16 }) => {
    return (
        <Grid direction="column" gap={2} container>
            <Grid>
                <TextField
                    id="outlined-multiline-flexible"
                    label="Заголовок"
                    fullWidth
                    {...header}
                />
            </Grid>

            <Grid>
                <TextField
                    id="outlined-multiline-flexible"
                    label="Текст"
                    rows={rows}
                    fullWidth
                    multiline
                    {...text}
                />
            </Grid>

        </Grid>
    )
}

export default TextEditor;