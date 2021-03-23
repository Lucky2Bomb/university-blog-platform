import React, { useEffect, useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import NavbarLayout from '../../layouts/NavbarLayout';
import HeaderLayout from '../../layouts/HeaderLayout';
import { observer } from 'mobx-react-lite';
import NewsPage from '../../components/NewsPage';
import rootStore from '../../store/rootStore';
import { Loading } from './../../components/Loading';
import { getNews } from '../../requests/news/get-news';

const Index = observer(() => {
    const [publications, setPublications] = useState([]);
    const [mainPublications, setMainPublications] = useState(null);
    const [morePublications, setMorePublications] = useState(false);
    const [isDisabledMoreButton, setIsDisabledMoreButton] = useState(false);
    const {
        allCount, currentCount, offset, countSize,
        setAllCount, setOffset,
    } = rootStore.newsStore;
    useEffect(() => {
        getNews(6, 0).then(res => {
            setMainPublications(res.publications);
        });
    }, []);

    useEffect(() => {
        getNews(currentCount, offset).then(res => {
            setAllCount(res.allCount);
            if (publications !== null) {
                setPublications([...publications, ...res.publications]);
            } else {
                setPublications(res.publications);
            }
            setOffset(Number(offset) + Number(countSize));
            if (Number(offset) >= Number(res.allCount)) {
                setIsDisabledMoreButton(true);
            }
        });
    }, [morePublications]);
    return (
    <MainLayout>
        <NavbarLayout>
            <HeaderLayout headerText={"НОВОСТИ"}>

                {publications && mainPublications ? <NewsPage
                    publications={publications}
                    mainPublications={mainPublications}
                    setMorePublications={setMorePublications}
                    morePublications={morePublications}
                    isDisabledMoreButton={isDisabledMoreButton}
                /> : <Loading />}

            </HeaderLayout>
        </NavbarLayout>
    </MainLayout>
    )

});

export default Index;