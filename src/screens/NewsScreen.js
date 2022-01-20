import React, {useEffect} from 'react';
import {StyleSheet, View, ActivityIndicator, useWindowDimensions, SafeAreaView, ScrollView} from 'react-native';
import * as axios from "axios";
import cheerio from "cheerio";
import RenderHtml from 'react-native-render-html';

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

const NewsScreen = ({navigation, route}) => {
    const {item} = route.params
    const [isFetching, setIsFetching] = React.useState(false);
    const [content, setContent] = React.useState(null);
    const {width} = useWindowDimensions();

    const fetchNewsContent = async () => {
        if (!item?.link) return
        setIsFetching(true);
        let res
        try {
            res = await axios.get(item.link)
        } catch (e) {
            console.log(e);
        }
        setIsFetching(false);
        if (res?.data) {
            const $ = cheerio.load(res?.data)
            $('ul.breadcrumb').remove()
            const _content = $('.container .sidebar-1').html().trim()
            setContent(_content)
        }
    }

    useEffect(() => {
        fetchNewsContent()
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
            <View style={{
                flexDirection: "column",
                height: '100%',
                padding: 10,
                width: '100%',
            }}>
                <ScrollView>
                    <RenderHtml
                        style={{
                            height: 300,
                            width: '100%',
                        }}
                        contentWidth={width}
                        source={{html: content}}
                    />
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

export default NewsScreen;