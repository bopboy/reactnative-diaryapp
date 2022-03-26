import React, { useContext, useEffect, useState } from 'react'
import { Alert } from 'react-native'
import styled from 'styled-components'
import colors from '../colors'
import { useDB } from '../context'
import { AdMobInterstitia, AdMobRewarded } from 'expo-ads-admob'

const View = styled.View`
    background-color: ${colors.bgColor};
    flex: 1;
    padding: 0 30px;
`
const Title = styled.Text`
    color: ${colors.textColor};
    margin: 50px 0;
    text-align: center;
    font-size: 28px;
    font-weight: 500;
`
const TextInput = styled.TextInput`
    background-color: white;
    border-radius: 20px;
    padding: 10px 20px;
    font-size: 18px;
`

const Btn = styled.TouchableOpacity`
    width: 100%;
    margin-top: 30px;
    background-color: ${colors.btnColor};
    padding: 10px 20px;
    align-items: center;
    border-radius: 20px;
`
const BtnText = styled.Text`
    color: white;
    font-weight: 500;
    font-size: 18px;
`
const Emotions = styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 20px;
`
const Emotion = styled.TouchableOpacity`
    background-color: white;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);
    padding: 10px;
    border-radius: 10px;
    border-width: ${props => props.selected ? "1px" : "0px"};
    border-color: rgba(0,0,0,0.5);
`
const EmotionText = styled.Text`
    font-size: 24px;
`
const emotions = ["😀", "😍", "😝", "😎", "🤩", "😡"]
function Write({ navigation: { goBack } }) {
    const realm = useDB()
    const [selectedEmotion, setSelectedEmotion] = useState(null)
    const [feelings, setFeelings] = useState("")
    const onChangeText = (text) => setFeelings(text)
    const onEmotionPress = (face) => setSelectedEmotion(face)
    const onSubmit = async () => {
        if (feelings === "" || selectedEmotion === null) return Alert.alert("Please complete form!!")
        realm.write(() => {
            const feeling = realm.create("Feeling", {
                _id: Date.now(),
                emotion: selectedEmotion,
                message: feelings
            })
        })
        // await AdMobInterstitial.setAdUnitID('ca-app-pub-3940256099942544/1033173712');
        // await AdMobInterstitial.requestAdAsync({ servePersonalizeAds: true })
        // await AdMobInterstitial.showAdAsync();
        await AdMobRewarded.setAdUnitID('ca-app-pub-3940256099942544/8691691433'); // Test ID, Replace with your-admob-unit-id
        await AdMobRewarded.requestAdAsync();
        await AdMobRewarded.showAdAsync();
        // goBack()
    }
    return (
        <View>
            <Title>How do you feel today?</Title>
            <Emotions>
                {emotions.map((emotion, index) => (
                    <Emotion
                        selected={emotion === selectedEmotion}
                        key={index}
                        onPress={() => onEmotionPress(emotion)}
                    >
                        <EmotionText>{emotion}</EmotionText>
                    </Emotion>
                ))}
            </Emotions>
            <TextInput
                returnKeyType="done"
                onSubmitEditing={onSubmit}
                onChangeText={onChangeText}
                value={feelings}
                placeholder="Write your feelings...."
            ></TextInput>
            <Btn onPress={onSubmit}><BtnText>Save</BtnText></Btn>
        </View>
    )
}

export default Write