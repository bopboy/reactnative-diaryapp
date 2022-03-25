import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import colors from '../colors'
import { Ionicons } from '@expo/vector-icons'
import { useDB } from '../context'
import { FlatList } from 'react-native'

const View = styled.View`
    flex: 1;
    padding: 0 30px;
    padding-top: 30px;
    background-color: ${colors.bgColor};
`
const Title = styled.Text`
    color: ${colors.textColor};
    font-size: 38px;
    margin-bottom: 50px;
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
        feelings.addListener(() => {
            const feelings = realm.objects("Feeling")
            setFeelings(feelings)
        })
        return () => { feelings.removeAllListeners() }
    }, [])
    // useEffect(() => {
    //     const feelings = realm.objects("Feeling")
    //     // const happy = feelings.filtered("emotion = '😀'")
    //     // console.log(happy)
    // }, [])
    console.log(feelings)
    return (
        <View>
            <Title>My Journal</Title>
            <FlatList
                data={feelings}
                contentContainerStyle={{ paddingVertical: 10 }}
                ItemSeparatorComponent={Separator}
                keyExtractor={feeling => feeling._id + ""}
                renderItem={({ item }) => (
                    <Record>
                        <Emotion>{item.emotion}</Emotion>
                        <Message>{item.message}</Message>
                    </Record>
                )}
            />
            <Btn onPress={() => navigate("Write")}>
                <Ionicons name="add" color="white" size={40} />
            </Btn>
        </View>
    )
}

export default Home