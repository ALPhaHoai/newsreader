import React from 'react';
import {Image, Text, TouchableHighlight, View} from 'react-native';

const NewsCard = (props) => {
    const {item, onPressNewsCard} = props
    return (
        <TouchableHighlight onPress={() => onPressNewsCard(item)} underlayColor="white">
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
        </TouchableHighlight>
    );
}

export default NewsCard;