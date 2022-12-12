import {
  View,
  Text,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  PanResponder,
  Animated,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {FlatList} from 'react-native-gesture-handler';
const {width, height} = Dimensions.get('screen');
import Ionicons from 'react-native-vector-icons/Ionicons';

const Movements = [
  {text: 'Move X by 50'},
  {text: 'Move Y by 50'},
  {text: 'Rotate 360'},
  {text: 'go to (0,0)'},
  {text: 'Move X=50,Y=50'},
  {text: 'Go to random position'},
  {text: 'Say Hello'},
  {text: 'Say Hello for 1 sec'},
  {text: 'Increase Size'},
  {text: 'Decrease Size'},
  {text: 'Repeat'},
];

const DragBtn = props => {
  const position = useRef(new Animated.ValueXY()).current;

  const panResponder = React.useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: (evt, gestureState) => true,
        onPanResponderMove: (evt, gestureState) => {
          position.setValue({x: gestureState.dx, y: gestureState.dy});
        },
        onPanResponderRelease: (evt, gestureState) => {
          if (gestureState.dx > width / 3) {
            const newAction = [...props.action];
            newAction.push(props.index);
            props.setAction(newAction);
          }
          position.setValue({x: 0, y: 0});
        },
      }),
    [props?.action],
  );

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[
        {position: 'absolute', transform: position.getTranslateTransform()},
      ]}>
      {props.children}
    </Animated.View>
  );
};

const Code = ({navigation}) => {
  const [action, setAction] = useState([]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        flexDirection: 'row',
      }}>
      <View
        style={{
          width: width / 2,
          backgroundColor: 'red',
          height: '100%',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontSize: 16,
            textAlign: 'center',
            marginTop: 8,
            fontWeight: '600',
            color: 'white',
          }}>
          Code
        </Text>

        {Movements.map((item, index) => {
          return (
            <DragBtn
              key={index}
              setAction={setAction}
              action={action}
              index={index}>
              <View
                style={{
                  width: width / 2 - 32,
                  height: 32,
                  backgroundColor: 'white',
                  marginVertical: 8,
                  justifyContent: 'center',
                  alignItems: 'center',
                  top: (index + 1) * 48,
                }}>
                <Text
                  style={{width: '80%', textAlign: 'center'}}
                  numberOfLines={2}>
                  {item.text}
                </Text>
              </View>
            </DragBtn>
          );
        })}

        <Ionicons
          suppressHighlighting
          onPress={() => navigation.goBack()}
          name="arrow-back-circle"
          size={36}
          color="white"
          style={{position: 'absolute', bottom: 16, left: 16}}
        />
      </View>
      <View
        style={{
          width: width / 2,
          backgroundColor: 'green',
          height: '100%',
          zIndex: -1,
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontSize: 16,
            textAlign: 'center',
            marginTop: 8,
            fontWeight: '600',
            marginBottom: 20,
            color: 'white',
          }}>
          Action
        </Text>
        <FlatList
          data={action}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => {
            return (
              <View
                key={index}
                style={{
                  width: width / 2 - 32,
                  height: 32,
                  backgroundColor: 'white',
                  marginVertical: 8,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{width: '80%', textAlign: 'center'}}
                  numberOfLines={2}>
                  {Movements[item].text}
                </Text>
              </View>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Code;
