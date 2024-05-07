/* eslint-disable react-native/no-inline-styles */
import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { StatusBar, TextStyle, TouchableHighlight, View, ViewStyle } from "react-native"
import {  ManagementNavigatorParamList } from "app/navigators"
import { Icon, Screen, Text } from "app/components"
import { colors, spacing, typography } from "app/theme"
import { translate } from "app/i18n"
import { Appbar } from "react-native-paper"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface ManagementScreenProps extends NativeStackScreenProps <ManagementNavigatorParamList,"Management"> {}

export const ManagementScreen: FC<ManagementScreenProps> = observer(function ManagementScreen({navigation}) {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={$root} preset="scroll">
      <StatusBar barStyle="light-content" />
      <Appbar.Header style={{backgroundColor: colors.palette.blue200}}>
        {/* <Appbar.BackAction color={colors.palette.blue200} onPress={() => navigation.goBack()} /> */}
        <Appbar.Content title={translate("ManagementScreen.managementText")} color={colors.palette.neutral100} titleStyle={{fontFamily: typography.primary.semiBold, alignSelf: "center"}} />
      </Appbar.Header>
      <View style={$container}>
        <TouchableHighlight underlayColor={colors.palette.gray} onPress={()=>navigation.navigate("ClassroomList")} style={$itemStyle}>
          <>
            <Icon icon="classroom" size={30} color={colors.palette.blue200}/>
            <Text tx="ManagementScreen.classroomLabel" style={$text}/>
          </>
        </TouchableHighlight>
        <TouchableHighlight underlayColor={colors.palette.gray}  onPress={()=>navigation.navigate("CourseList")} style={$itemStyle}>
          <>
            <Icon icon="course" size={30} color={colors.palette.blue200}/>
            <Text tx="ManagementScreen.courseLabel" style={$text}/>
          </>
        </TouchableHighlight>
        <TouchableHighlight underlayColor={colors.palette.gray} onPress={()=>navigation.navigate("StudentList")} style={$itemStyle}>
          <>
            <Icon icon="student" size={30} color={colors.palette.blue200}/>
            <Text tx="ManagementScreen.studentLabel" style={$text}/>
          </>
        </TouchableHighlight>
      </View>
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}
const $container: ViewStyle = {
  paddingHorizontal: spacing.lg,
  justifyContent: "center",
  marginVertical: spacing.xs,

}
const $itemStyle: ViewStyle = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  paddingHorizontal: spacing.sm,
  paddingVertical: spacing.lg,
  marginVertical: spacing.xs,
  borderRadius: spacing.xs,
  borderWidth: 1,
  borderColor: colors.palette.overlay20,
  backgroundColor: colors.palette.neutral100,
}

const $text: TextStyle = {
  fontSize: spacing.lg,
  marginLeft: spacing.sm,
  color: colors.palette.blue200,
  fontFamily: typography.primary.semiBold,
}

