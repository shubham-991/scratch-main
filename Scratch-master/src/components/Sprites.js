import {View, Text, Image, TouchableOpacity, Animated} from 'react-native';
import React, {useEffect} from 'react';
import {sprite} from '../../asset';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Sprites = ({
  isSelected,
  setCurrentSprite,
  index,
  navigation,
  allSprites,
  setAllSprites,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => setCurrentSprite(index)}
      style={{
        height: '90%',
        backgroundColor: isSelected ? 'pink' : '#F88379',
        width: 112,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        marginHorizontal: 8,
      }}>
      <Text style={{position: 'absolute', top: 16, left: 16, fontSize: 16}}>
        {index}
      </Text>
      <Image
        source={sprite}
        style={{width: 56, height: 56, resizeMode: 'contain'}}
      />
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Code', {});
        }}
        activeOpacity={0.8}
        style={{
          backgroundColor: 'lightgrey',
          width: 112,
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          height: 32,
          bottom: 0,
        }}>
        <Text>Add Action</Text>
      </TouchableOpacity>
      <AntDesign
        suppressHighlighting
        onPress={() => {
          let newSp = [...allSprites];
          newSp.splice(index, 1);
          setAllSprites(newSp);
        }}
        name="delete"
        size={24}
        color="red"
        style={{position: 'absolute', top: 0, right: 0}}
      />
    </TouchableOpacity>
  );
};

export default Sprites;
