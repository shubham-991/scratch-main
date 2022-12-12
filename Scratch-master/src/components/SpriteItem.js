import {View, Text, Image, Animated, PanResponder} from 'react-native';
import React, {Component, useEffect, useRef, useState} from 'react';
import {sprite} from '../../asset';

// UNSAFE_componentWillMount() {
//   this._val = {x: 0, y: 0};
//   this.state.pan.addListener(value => (this._val = value));

//   this.panResponder = PanResponder.create({
//     onStartShouldSetPanResponder: (e, gesture) => true,
// onPanResponderGrant: (e, gesture) => {
//   this.state.pan.setOffset({
//     x: this._val.x,
//     y: this._val.y,
//   });
//   this.props.setCoords({x: this._val.x, y: this._val.y});
//   this.state.pan.setValue({x: 0, y: 0});
// },
// onPanResponderMove: Animated.event(
//   [null, {dx: this.state.pan.x, dy: this.state.pan.y}],
//   {useNativeDriver: false},
// ),
//     onPanResponderRelease: (e, gesture) => {
//       // if (this.isDropArea(gesture)) {
//       // }
//       // Animated.timing(this.state.opacity, {
//       //   toValue: 0,
//       //   duration: 1000,
//       //   useNativeDriver: true,
//       // }).start(() =>
//       //   this.setState({
//       //     showDraggable: false,
//       //   }),
//       // );
//     },
//     onPanResponderEnd: (e, gesture) => {},
//   });
// }

const Movements = [
  {text: 'Move X by 50'},
  {text: 'Move Y by 50'},
  {text: 'Rotate 360'},
  {text: 'go to (0,0)'},
  // {text: 'Move X=50,Y=50'},
  // {text: 'Go to random position'},
  // {text: 'Say Hello'},
  // {text: 'Say Hello for 1 sec'},
  // {text: 'Increase Size'},
  // {text: 'Decrease Size'},
  // {text: 'Repeat'},
];

const SpriteItem = props => {
  const [positionX, setPositionX] = useState(new Animated.Value(0));
  const [positionY, setPositionY] = useState(new Animated.Value(0));
  const rotate = useRef(new Animated.Value(0)).current;
  const positionXY = useRef(new Animated.ValueXY({x: 0, y: 0})).current;
  const position = useRef(new Animated.ValueXY({x: 0, y: 0})).current;
  // const scale = useRef(new Animated.Value()).current;
  // const opacity = useRef(new Animated.Value()).current;

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const anime = [
    (positionX, positionY, rotate) =>
      Animated.timing(positionX, {
        toValue: parseInt(JSON.stringify(positionX)) + 50,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        // setPositionX(parseInt(JSON.stringify(positionX)) + 50);
        // setPositionY(parseInt(JSON.stringify(positionY)) + 50);
      }),
    (positionX, positionY, rotate) =>
      Animated.timing(positionY, {
        toValue: parseInt(JSON.stringify(positionY)) + 50,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        // setPositionX(parseInt(JSON.stringify(positionX)) + 50);
        // setPositionY(parseInt(JSON.stringify(positionY)) + 50);
      }),
    (positionX, positionY, rotate) =>
      Animated.timing(rotate, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        console.log(positionX, positionY);
      }),
    (positionX, positionY, rotate) =>
      Animated.parallel([
        Animated.timing(positionX, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(positionY, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start(() => {
        // setPositionX(parseInt(JSON.stringify(positionX)) + 50);
        // setPositionY(parseInt(JSON.stringify(positionY)) + 50);
      }),
    (positionX, positionY, rotate) =>
      Animated.parallel([
        Animated.timing(positionX, {
          toValue: parseInt(JSON.stringify(positionX)) + 50,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(positionY, {
          toValue: parseInt(JSON.stringify(positionY)) + 50,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start(() => {
        // setPositionX(parseInt(JSON.stringify(positionX)) + 50);
        // setPositionY(parseInt(JSON.stringify(positionY)) + 50);
        console.log(1);
      }),
  ];

  const execute = () => {
    props.item.actions.map((item, index) => {
      anime[item](positionX, positionY, rotate);
    });
  };

  useEffect(() => {
    if (props.item && props.play) {
      execute();
    }
  }, []);

  const panResponder = React.useMemo(() =>
    PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderGrant: (e, gestureState) => {
        position.setValue({x: gestureState.dx, y: gestureState.dy});
      },
      onPanResponderMove: Animated.event(
        [null, {dx: position.x, dy: position.y}],
        {useNativeDriver: false},
      ),
      onPanResponderRelease: (evt, gestureState) => {
        // position.setValue({x: 0, y: 0});
        props.setCoords({x: gestureState.dx, y: gestureState.dy});
      },
    }),
  );

  const renderDraggable = () => {
    const pan = props.isSelected ? panResponder.panHandlers : {};

    return (
      <View style={{position: 'absolute'}}>
        <Animated.View
          {...pan}
          style={{
            // transform: [
            //   {translateX: positionX},
            //   {translateY: positionY},
            //   {
            //     rotate: rotate.interpolate({
            //       inputRange: [0, 1],
            //       outputRange: ['0deg', '360deg'],
            //       extrapolate: 'clamp',
            //     }),
            //   },
            // ],
            transform: position.getTranslateTransform(),
          }}>
          <Image
            source={sprite}
            style={{width: 56, height: 56, resizeMode: 'contain'}}
          />
        </Animated.View>
      </View>
    );
  };

  return (
    <View style={{width: '20%', alignItems: 'center'}}>
      {renderDraggable()}
    </View>
  );
};

export default SpriteItem;
