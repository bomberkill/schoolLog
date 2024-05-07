import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle, Animated } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, spacing, typography } from "app/theme"
import { Text } from "app/components/Text"
import { Icon, IconTypes } from "./Icon"

export interface CustomTabIconProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  isFocused: boolean,
  iconName: IconTypes,
}

/**
 * Describe your component here
 */
export const CustomTabIcon = observer(function CustomTabIcon(props: CustomTabIconProps) {
  const { style, isFocused, iconName } = props
  const $styles = [$container, style]
  const animation = React.useRef(new Animated.Value(0)).current

  React.useEffect(()=> {
    if(isFocused) {
      Animated.timing(animation, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true
      }).start()
    }else {
      Animated.timing(animation, {
        duration: 1000,
        toValue: 1,
        useNativeDriver: true,
      }).start()
    }
  },[animation, isFocused])
  // const $circleStyle: ViewStyle = {
  //   transform: [{ translateY: animation.interpolate({ inputRange: [0, 1], outputRange: [20, -20] }) }]
  // };
  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [20, -20],
  });
  const $circleStyle: ViewStyle = {
    transform: [{ translateY }] as any
  };

  return (
    <View style={$styles}>
      {isFocused ?
        <Animated.View style={[$circle, $circleStyle]}>
          <Icon color={colors.palette.neutral100} icon={iconName} size={20} />
        </Animated.View>
        :
        <Icon color={colors.palette.blue200} icon={iconName} size={20} />
      }
    </View>
  )
})

const $container: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
}

const $circle: ViewStyle = {
  position: 'absolute',
  bottom: -23,
  justifyContent: "center",
  alignItems: "center",
  width: 60,
  height: 60,
  borderRadius: 30,
  backgroundColor: colors.palette.blue200,
  marginBottom: -8,
}
