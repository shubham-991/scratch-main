import {
  View,
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  Animated,
} from 'react-native';
import React, {useRef, useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Sprites from '../components/Sprites';
import SpriteItem from '../components/SpriteItem';

const {width, height} = Dimensions.get('screen');

const tSprite = {
  x: 0,
  y: 0,
  actions: [],
  play: false,
};

const Home = ({navigation}) => {
  const [currentSprite, setCurrentSprite] = useState(0);
  const [allSprites, setAllSprites] = useState([
    {
      x: 0,
      y: 0,
      actions: [],
      play: false,
    },
  ]);
  const [currentCoords, setCoords] = useState({x: 0, y: 0});

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
      }}>
      <StatusBar barStyle={'light-content'} />

      <View
        style={{
          width: width,
          height: '70%',
          backgroundColor: 'white',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <View
          style={{
            width: '96%',
            height: '96%',
            backgroundColor: 'white',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 0,
            },
            shadowOpacity: 0.5,
            shadowRadius: 5,
            elevation: 8,
            justifyContent: 'space-evenly',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          {allSprites.map((item, index) => {
            return (
              <SpriteItem
                item={item}
                play={item.play}
                key={index}
                isSelected={index === currentSprite}
                index={index}
                setCoords={setCoords}
              />
            );
          })}
        </View>
      </View>
      <View
        style={{
          width: width,
          height: '8%',
          backgroundColor: 'white',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: '96%',
            height: '94%',
            backgroundColor: 'white',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 0,
            },
            shadowOpacity: 0.5,
            shadowRadius: 5,
            elevation: 8,
            justifyContent: 'space-evenly',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text>X:{currentCoords.x.toPrecision(4)}</Text>
          <Text>Y:{currentCoords.y.toPrecision(4)}</Text>
          <Text>Sprite: {currentSprite}</Text>
          <Ionicons
            name="ios-reload-circle-sharp"
            size={28}
            color="lightgrey"
          />
          <AntDesign name="play" size={24} color="lightgrey" />
        </View>
      </View>
      <View
        style={{
          width: width,
          height: '22%',
          backgroundColor: 'white',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: '97%',
            height: '90%',
            backgroundColor: 'white',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 0,
            },
            shadowOpacity: 0.5,
            shadowRadius: 5,
            elevation: 8,
          }}>
          <ScrollView
            style={{height: '100%'}}
            horizontal
            contentContainerStyle={{
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'white',
            }}
            showsHorizontalScrollIndicator={false}>
            {Array(allSprites.length)
              .fill(0)
              .map((item, index) => {
                return (
                  <Sprites
                    allSprites={allSprites}
                    navigation={navigation}
                    key={index}
                    isSelected={index === currentSprite}
                    setCurrentSprite={setCurrentSprite}
                    index={index}
                    setAllSprites={setAllSprites}
                  />
                );
              })}
            {allSprites.length < 4 && (
              <Ionicons
                suppressHighlighting
                onPress={() => {
                  const newSp = [...allSprites];
                  newSp.push(tSprite);
                  setAllSprites(newSp);
                }}
                name="add-circle"
                size={48}
                color="lightgrey"
                style={{marginLeft: 32}}
              />
            )}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;
