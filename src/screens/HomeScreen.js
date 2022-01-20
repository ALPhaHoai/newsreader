import React, {useEffect, useState} from 'react';
import {
    ActivityIndicator,
    FlatList,
    SafeAreaView, StyleSheet, View
} from 'react-native';
import * as axios from "axios";
import cheerio from "cheerio";
import NewsCard from "../components/NewsCard";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center"
    },
    horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
    }
});

const HomeScreen = ({navigation}) => {
    const [news, setNews] = useState([]);
    const [refreshing, setRefreshing] = React.useState(false);
    const [isFetching, setIsFetching] = React.useState(true);

    const onPressNewsCard = (item) => {
        navigation.navigate('News', {item})
    }

    const fetchNews = async () => {
        setRefreshing(true);
        let res
        try {
            res = await axios.get('http://vnexpress.net')
        } catch (e) {
        }
        setRefreshing(false);
        if (!res?.data) return
        const $ = cheerio.load(res?.data)
        const _news = []
        $('.title-news > a[data-medium]').each(function (index, el) {
            el = $(el)
            let parents = el.parents('.title-news');
            const description = parents.siblings('.description').text().trim()
            const thumbArt = parents.siblings('.thumb-art').find('picture img').data('src')
            let title = el.text().trim().replace('\n', '');
            let link = el.attr('href');
            if (title.length > 10 && link.length > 20 && link.endsWith('.html')) {
                _news.push({
                    id: index,
                    title: title,
                    link: link,
                    description: description,
                    thumbArt: thumbArt,
                })
            }
        })
        setNews(oldNews => {
            const newNews = oldNews.splice()
            for (let i = 0; i < _news.length; i++) {
                if (!newNews.some(n => n.link === _news[i].link)) {
                    newNews.unshift(_news[i])
                }
            }
            return newNews
        })
    }

    const renderItem = ({item}) => (
        <NewsCard item={item} onPressNewsCard={onPressNewsCard}/>
    );

    useEffect(() => {
        (async () => {
            await fetchNews()
            setIsFetching(false)
        })()
    }, []);

    if (isFetching) {
        return (
            <SafeAreaView style={[styles.container, styles.horizontal]}>
                <View style={[styles.container, styles.horizontal]}>
                    <ActivityIndicator/>
                </View>
            </SafeAreaView>
        )
    }

    return (
        <SafeAreaView>
            <FlatList
                data={news}
                renderItem={renderItem}
                keyExtractor={item => item.link}
                refreshing={refreshing}
                onRefresh={fetchNews}
            />
        </SafeAreaView>
    );
}

export default HomeScreen;