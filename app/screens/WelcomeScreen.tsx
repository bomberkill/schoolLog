/* eslint-disable react-native/no-inline-styles */
import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import {TextStyle, View, ViewStyle } from "react-native"
import {
  Button,
  Screen,
  Text,
} from "../components"
import { colors, spacing, typography } from "../theme"
// import { useSafeAreaInsetsStyle } from "../utils/useSafeAreaInsetsStyle"
import { AppStackScreenProps } from "app/navigators"

// const logo = require("../../assets/images/Designer.png")

interface WelcomeScreenProps extends AppStackScreenProps<"Welcome"> {}

export const WelcomeScreen: FC<WelcomeScreenProps> = observer(function WelcomeScreen({navigation}) {

  // const $bottomContainerInsets = useSafeAreaInsetsStyle(["bottom"])

  return (
    <Screen statusBarStyle="dark" safeAreaEdges={["top", "bottom"]} style={$container} preset="fixed" >
      <View style={$topContainer}>
        <Text
          preset="heading"
          size="xxl"
          style={$welcomeHeading}
          tx="welcomeScreen.welcomeMessage"
        />
        <Text
          style={$description}
          tx="welcomeScreen.description"
        />
        <Button pressedStyle={{backgroundColor: colors.palette.blue200, opacity: 0.8 }} textStyle={$textButton} onPress={()=>navigation.navigate("Auth")} tx="welcomeScreen.textButton" style={$buttonStyle}/>
      </View>
    </Screen>
  )
})

const $container: ViewStyle = {
  flex: 1,
  backgroundColor: colors.background,
  paddingHorizontal: spacing.lg,
  justifyContent: "center",
}

const $topContainer: ViewStyle = {
  
}

const $welcomeHeading: TextStyle = {
  marginVertical: spacing.xxl,
  color: colors.palette.bleu100,
  alignSelf: "center",
}
const $description: TextStyle = {
  marginBottom: spacing.md,
  fontSize: spacing.md,
  fontFamily: typography.fonts.courier.normal,
}
const $buttonStyle: ViewStyle = {
  backgroundColor: colors.palette.blue200,
  borderRadius: spacing.xxs,
  padding: spacing.xxs,
  marginBottom: spacing.sm,
  marginTop: spacing.xxl,
}
const $textButton:TextStyle = {
  color: colors.palette.neutral100,
  fontSize: spacing.md,
  fontWeight: "bold",
}
