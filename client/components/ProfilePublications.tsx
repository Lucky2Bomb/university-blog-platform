import React, { useEffect, useState } from 'react';
import { getUserPublications } from '../requests/user/get-user-publications';
import { Loading } from './Loading';
import { IPublication } from '../types/Publication';
import { ProfilePublicationCard } from './ProfilePublicationCard';
import config from '../config';
import { Button, Grid } from '@material-ui/core';
import { getNewsFeed } from '../requests/user/get-news-feed';

interface ProfilePublicationsProps {
    userId?: number[];
    isMyProfile?: boolean;
    isNewsFeed?: boolean;
}

export const ProfilePublications: React.FC<ProfilePublicationsProps> = ({ userId, isMyProfile = true, isNewsFeed = false }) => {
    const [publications, setPublications] = useState([]);
    const [allCount, setAllCount] = useState(11);
    const [currentCount, setCurrentCount] = useState(10);
    const [offset, setOffset] = useState(0);
    const [isDisabledMoreButton, setIsDisabledMoreButton] = useState(false);

    let publicationCards;
    const setPageData = (item) => {
        setPublications([...publications, ...item.publications]);
        setAllCount(item.allCount);
        setCurrentCount(item.currentCount);
        setOffset(item.offset + currentCount);
        if (offset >= allCount) {
            setIsDisabledMoreButton(true);
        }
    }

    const getMore = () => {
        if (isNewsFeed) {
            getNewsFeed(userId[0], currentCount, offset).then((item) => {
                setPageData(item);
            })
        } else {
            getUserPublications(currentCount, offset, userId).then((item) => {
                setPageData(item);
            });
        }
    }

    useEffect(() => {
        getMore();
    }, []);

    if (publications) {
        publicationCards = publications.map((publication: IPublication) => <ProfilePublicationCard
            href={`http://localhost:3000/news/${publication.id}`}
            datetime={new Date(publication.createdAt)}
            header={publication.header}
            text={publication.text.length < 200 ? publication.text : `${publication.text.substring(0, 200)}...`}
            imageUrl={`${config.serverURL}/${publication.pictureUrl ? publication.pictureUrl : config.noImage}`}
            fileUrl={publication.fileUrl ? `${config.serverURL}/${publication.fileUrl}` : ""}
            publicationId={Number(publication.id)}
            key={`000${publication.id}`}
            isMyProfile={isMyProfile}
            author={publication.author}
            userId={Number(publication.userId)}
        />);
    }

    if (!publications) {
        return <Loading />
    }
    return (
        <div>
            {publicationCards}
            <Grid container justifyContent="center">
                <Button disabled={isDisabledMoreButton} onClick={getMore}>Загрузить больше</Button>
            </Grid>
        </div>
    )
}
