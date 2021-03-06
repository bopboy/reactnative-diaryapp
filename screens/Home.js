import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import colors from '../colors'
import { Ionicons } from '@expo/vector-icons'
import { useDB } from '../context'
import { FlatList, TouchableOpacity, LayoutAnimation, UIManager, Platform } from 'react-native'
import { AdMobBanner } from 'expo-ads-admob'

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true)
}

const View = styled.View`
    flex: 1;
    align-items: center;
    padding: 0 30px;
    padding-top: 30px;
    background-color: ${colors.bgColor};
`
const Title = styled.Text`
    color: ${colors.textColor};
    font-size: 38px;
    font-weight: 500;
    width: 100%;
`
const Btn = styled.TouchableOpacity`
    position: absolute;
    bottom: 25px;
    right: 25px;
    height: 80px;
    width: 80px;
    border-radius: 40px;
    justify-content: center;
    align-items: center;
    background-color: ${colors.btnColor};
    /* elevation: 5; */
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.4);
`
const BtnText = styled.Text`
    color: white;
`
const Record = styled.View`
    background-color: ${colors.cardColor};
    flex-direction: row;
    align-items: center;
    padding: 10px 20px;
    border-radius: 10px;
`
const Emotion = styled.Text`
    font-size: 24px;
    margin-right: 10px;
`
const Message = styled.Text`
    font-size: 18px;
`
const Separator = styled.View`
    height: 10px;
`

function Home({ navigation: { navigate } }) {
    const realm = useDB()
    const [feelings, setFeelings] = useState([])
    useEffect(() => {
        const feelings = realm.objects("Feeling")
        setFeelings(feelings)
        feelings.addListener((feelings, changes) => {
            // LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
            LayoutAnimation.linear()
            setFeelings(feelings.sorted("_id", true))
        })
        return () => { feelings.removeAllListeners() }
    }, [])
    const onPress = (id) => {
        realm.write(() => {
            const feeling = realm.objectForPrimaryKey("Feeling", id)
            realm.delete(feeling)
        })
    }
    return (
        <View>
            <Title>My Journal</Title>
            <AdMobBanner
                style={{ backgroundColor: "red" }}
                bannerSize='fullBanner'
                adUnitID='ca-app-pub-3940256099942544/6300978111'
            />
            <FlatList
                style={{ marginVertical: 50, width: "100%" }}
                data={feelings}
                contentContainerStyle={{ paddingVertical: 10 }}
                ItemSeparatorComponent={Separator}
                keyExtractor={feeling => feeling._id + ""}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => onPress(item._id)}>
                        <Record>
                            <Emotion>{item.emotion}</Emotion>
                            <Message>{item.message}</Message>
                        </Record>
                    </TouchableOpacity>
                )}
            />
            <Btn onPress={() => navigate("Write")}>
                <Ionicons name="add" color="white" size={40} />
            </Btn>
        </View>
    )
}

export default Home