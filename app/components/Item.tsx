import * as React from "react"
import { StyleProp, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, spacing, typography } from "app/theme"
import { Text } from "app/components/Text"
import { Title } from "react-native-paper"
import { AutoImage } from "./AutoImage"
import { Icon } from "./Icon"
import { IconProps } from "react-native-paper/lib/typescript/components/MaterialCommunityIcon"

export interface ItemProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  image?: "classroom" | "course" | "student"
  title: string
  description?: string
  navigation?: ()=> void
}

/**
 * Describe your component here
 */
export const Item = observer(function Item(props: ItemProps) {
  const { style, title, image, navigation } = props
  const $styles = [$container, style]

  return (
    <TouchableOpacity onPress={()=>navigation() } style={$styles}>
      {/* <View >
        <Icon icon={image} maxWidth={30}/>
        <Text style={$text}>{title}</Text>
        <Icon icon="caretRight" size={20}/>
      </View> */}
    </TouchableOpacity>
  )
})

const $container: ViewStyle = {
  justifyContent: "center",
  marginVertical: spacing.xs,
  paddingVertical: spacing.xs,
  paddingHorizontal: spacing.xxs,
  borderRadius: spacing.xxxs
}

// const $text: TextStyle = {
//   fontFamily: typography.primary.normal,
//   fontSize: 14,
//   fontWeight: "bold",
//   color: colors.palette.blue200,
// }
