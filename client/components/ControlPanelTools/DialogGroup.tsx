import * as React from 'react';
import { Grid, IconButton, Tooltip, Select, InputLabel, MenuItem, Dialog, DialogTitle, DialogContent, Button, DialogContentText, DialogActions, TextField } from '@material-ui/core';

import { observer } from 'mobx-react-lite';
import rootStore from '../../store/rootStore';
import { createGroup } from '../../requests/group/create-group';
import { IGroup } from '../../types/University';
import { editGroup } from '../../requests/group/edit-group';


interface DialogCreateGroupProps {
    open: any;
    setOpen(value: any): void;
    group?: IGroup;
}

export const DialogCreateGroup: React.FC<DialogCreateGroupProps> = observer(({ open, setOpen, group = null }) => {

    const dateGroup = new Date(group === null ? null : group.startDateTraining);

    const [nameGroup, setNameGroup] = React.useState(group === null ? "" : group.name);
    const [disabledButtonSend, setDisabledButtonSend] = React.useState(group === null);
    const [numberSemestersTraining, setNumberSemestersTraining] = React.useState(group === null ? 8 : group.numberSemestersTraining);
    const [startStudy, setStartStudy] = React.useState(group === null ? 1 : dateGroup.getMonth() < 8 ? 1 : 2);
    const [startYear, setStartYear] = React.useState(group === null ? 2021 : dateGroup.getFullYear());

    const [selectUniversityName, setSelectUniversityName] = React.useState(group === null ? "" : group.universityName);
    const [selectFacultyName, setSelectFacultyName] = React.useState(group === null ? "" : group.facultyName);
    const [selectSpecialtyName, setSelectSpecialtyName] = React.useState(group === null ? "" : group.specialtyName);

    const { universities, faculties, specialties } = rootStore.universityStore;

    const menuItemUniversities = universities.map(university => <MenuItem key={`create_group_university_${university.name}`} value={university.name}>{university.name}</MenuItem>);
    const menuItemFaculties = faculties.map(faculty => <MenuItem key={`create_group_faculty_${faculty.name}`} value={faculty.name}>{faculty.name}</MenuItem>);
    const menuItemSpecialties = specialties.map(specialty => <MenuItem key={`create_group_specialty_${specialty.name}`} value={specialty.name}>{specialty.name}</MenuItem>);

    const handleClose = () => {
        setOpen(false);
    };

    React.useEffect(() => {
        if(Boolean(group)) {
            setNameGroup(group.name);
            setNumberSemestersTraining(group.numberSemestersTraining);
            setStartStudy(dateGroup.getMonth() < 8 ? 1 : 2);
            setStartYear(dateGroup.getFullYear());
            setSelectUniversityName(group.universityName);
            setSelectFacultyName(group.facultyName)
            setSelectSpecialtyName(group.specialtyName);
        } else {
            setNameGroup("");
            setNumberSemestersTraining(8);
            setStartStudy(1);
            setStartYear(2021);
            setSelectUniversityName("");
            setSelectFacultyName("")
            setSelectSpecialtyName("");
        }
    }, [group]);

    const sendNewGrouphandle = () => {
        createGroup(nameGroup,
            new Date(startYear, Number(startStudy) === 2 ? 8 : 0, 1, 17, 0).toString(),
            Number(numberSemestersTraining),
            selectUniversityName,
            selectFacultyName,
            selectSpecialtyName,
            localStorage.getItem("token"))
        // .finally(() => {
        //     Router.reload()
        // });
        setOpen(false);
    }

    const sendEditGrouphandle = () => {
        editGroup(group.id, nameGroup,
            new Date(startYear, Number(startStudy) === 2 ? 8 : 0, 1, 17, 0).toString(),
            Number(numberSemestersTraining),
            selectUniversityName,
            selectFacultyName,
            selectSpecialtyName,
            localStorage.getItem("token"))
        // .finally(() => {
        //     Router.reload()
        // });
        setOpen(false);
    }


    const setSelectUniversityNameChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setSelectUniversityName(event.target.value as string);
    };

    const setSelectFacultyNameChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setSelectFacultyName(event.target.value as string);
    };

    const setSelectSpecialtyNameChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setSelectSpecialtyName(event.target.value as string);
    };



    const nameGroupChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setNameGroup(event.target.value as string);
    };

    const numberSemestersTrainingChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setNumberSemestersTraining(event.target.value as number);
    };

    const startYearChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setStartYear(event.target.value as number);
    };

    const startStudyChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setStartStudy(event.target.value as number);
    };

    React.useEffect(() => {
        if (nameGroup.length > 0 &&
            typeof Number(startStudy) === "number" &&
            typeof Number(startYear) === "number" &&
            typeof Number(numberSemestersTraining) === "number" &&
            selectUniversityName, selectFacultyName, selectSpecialtyName
        ) {
            setDisabledButtonSend(false);
        } else {
            setDisabledButtonSend(true);

        }
    },
        [nameGroup, startStudy, startYear, numberSemestersTraining, selectUniversityName, selectFacultyName, selectSpecialtyName]);
    return (

        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Создание группы</DialogTitle>
            <DialogContent>
                <Grid container direction="column" gap={2}>
                    <Grid item>
                        <TextField label="Название группы" fullWidth value={nameGroup} onChange={nameGroupChange} />
                    </Grid>
                    <Grid item container alignItems="center">
                        <Grid item xs={12}><InputLabel>Начало обучения</InputLabel></Grid>
                        <Grid item xs={6}>
                            <Select
                                id="demo-simple-select-outlined"
                                value={startStudy}
                                onChange={startStudyChange}
                                label="Age"
                            >
                                <MenuItem value={1}>Весна</MenuItem>
                                <MenuItem value={2}>Осень</MenuItem>
                            </Select>
                        </Grid>

                        <Grid item xs={6}>
                            <TextField
                                label="Год начала обучения"
                                type="number"
                                value={startYear}
                                onChange={startYearChange}
                                fullWidth
                                InputProps={{ inputProps: { min: 1900, max: 2100 } }}
                            />
                        </Grid>

                    </Grid>
                    <Grid item>
                        <TextField
                            label="Количество семестров"
                            type="number"
                            value={numberSemestersTraining}
                            onChange={numberSemestersTrainingChange}
                            fullWidth
                            InputProps={{ inputProps: { min: 1, max: 40 } }}
                        />
                    </Grid>


                    <Grid item>
                        <Select
                            fullWidth
                            value={selectUniversityName}
                            onChange={setSelectUniversityNameChange}
                            label="Университет"
                        >
                            {menuItemUniversities}
                        </Select>
                    </Grid>


                    <Grid item>
                        <Select
                            fullWidth
                            value={selectFacultyName}
                            onChange={setSelectFacultyNameChange}
                            label="Факультет"
                        >
                            {menuItemFaculties}
                        </Select>
                    </Grid>


                    <Grid item>
                        <Select
                            fullWidth
                            value={selectSpecialtyName}
                            onChange={setSelectSpecialtyNameChange}
                            label="Специальность"
                        >
                            {menuItemSpecialties}
                        </Select>
                    </Grid>
                </Grid>
                {/* <DialogContentText>
                </DialogContentText> */}
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" onClick={handleClose}>Отмена</Button>
                {group === null ? <Button variant="contained" disabled={disabledButtonSend} onClick={sendNewGrouphandle}>Создать</Button> :
                    <Button variant="contained" onClick={sendEditGrouphandle}>Изменить</Button>}
            </DialogActions>
        </Dialog>

    )
});