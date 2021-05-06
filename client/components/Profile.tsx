import React, { useState, useEffect } from 'react';
import { Grid, Button, Box, Tabs, Tab } from '@material-ui/core';
import styles from '../styles/Profile.module.scss';
import { IProfile, profileImageType } from '../types/Profile';
import config from '../config';
import { ProfileCard } from './ProfileCard';
import { TabPanel } from './TabPanel';
import TabPanelBlog from './TabPanelBlog';
import { useInput } from '../hooks/useInput';
import { ProfilePublications } from './ProfilePublications';
import { ProfileInfo } from './ProfileInfo';
import { ProfileSettings } from './ProfileSettings';
import rootStore from '../store/rootStore';
import { uploadImage } from '../requests/user/upload-image';
import { ProfileBackground } from './ProfileBackground';
import { ProfileSubscriptions } from './ProfileSubscriptions';

interface ProfileProps {
    profile: IProfile;
    isMyProfile: boolean;
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export const Profile: React.FC<ProfileProps> = ({ profile, isMyProfile }) => {
    const [value, setValue] = useState(0);
    const header = useInput("");
    const text = useInput("");

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    return (
        <Grid container>
            <Grid item container xs={12}>
                <ProfileBackground profile={profile} isMyProfile={isMyProfile} />
            </Grid>
            <Grid
                item
                xs={12}
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
            >
                <ProfileCard profile={profile} isMyProfile={isMyProfile} />
                <Grid item xs={3}></Grid>
                <Grid item xs={9}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="Блог" {...a11yProps(0)} />
                            <Tab label="Профиль" {...a11yProps(1)} />
                            <Tab label="Подписчики" {...a11yProps(2)} />
                            <Tab label="Читаемые" {...a11yProps(3)} />
                            <Tab label="Лента новостей" {...a11yProps(4)} />
                            {isMyProfile && <Tab label="Настройки" {...a11yProps(5)} />}
                        </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                        {isMyProfile && <TabPanelBlog text={text} header={header} />}
                        <ProfilePublications userId={[profile.id]} isMyProfile={isMyProfile} />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <ProfileInfo profile={profile} />
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <ProfileSubscriptions profile={profile}/>
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                        <ProfileSubscriptions profile={profile} isSubscribers={true}/>
                    </TabPanel>
                    <TabPanel value={value} index={4}>
                        <ProfilePublications userId={[profile.id]} isMyProfile={false} isNewsFeed={true}/>
                    </TabPanel>
                    {isMyProfile && <TabPanel value={value} index={5}>
                        <ProfileSettings profile={profile} />
                    </TabPanel>}
                </Grid>
            </Grid>
        </Grid>
    )
}
