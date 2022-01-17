import React, {useEffect, useState, useCallback} from 'react';
import type {Node} from 'react';
import {
    FlatList, Image,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
} from 'react-native';

import {
    Colors,
} from 'react-native/Libraries/NewAppScreen';

import * as axios from 'axios';
import cheerio from "cheerio";

const App: () => Node = () => {
    const isDarkMode = useColorScheme() === 'dark';
    const [news, setNews] = useState([]);
    const [refreshing, setRefreshing] = React.useState(false);

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    const fetchNews = async () => {
        if (!refreshing) {
            // setRefreshing(true);
            const res = await axios.get('http://vnexpress.net')
            // setRefreshing(false);
            const $ = cheerio.load(res.data)
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
    }

    const renderItem = ({item}) => (
        <View style={{
            flexDirection: "row",
            height: 100,
            padding: 20,
            width: '100%',
        }}>
            <Image style={{
                width: 100,
                height: '100%',
                marginRight: 10,
            }}
                   source={{uri: (item.thumbArt || 'https://www.darren-young.com/wp-content/uploads/2015/04/default-placeholder.png')}}/>
            <Text style={{
                height: '100%',
                flex: 1,
            }}>{item.title}</Text>
        </View>
    );

    useEffect(() => {
        fetchNews()
    });

    return (
        <SafeAreaView style={backgroundStyle}>
            <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'}/>

            <FlatList
                data={news}
                renderItem={renderItem}
                keyExtractor={item => item.link}
                refreshing={refreshing}
                onRefresh={fetchNews}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
    },
    highlight: {
        fontWeight: '700',
    },
});

export default App;
