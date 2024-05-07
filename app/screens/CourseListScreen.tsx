/* eslint-disable react-native/no-inline-styles */
import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ScrollView, StatusBar, TextStyle, View, ViewStyle } from "react-native"
import { ManagementNavigatorParamList } from "app/navigators"
import { Button, Icon, Text } from "app/components"
import { translate } from "app/i18n"
import { colors, typography, spacing } from "app/theme"
import { Appbar } from "react-native-paper"
import dataStore from "app/data/data"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface CourseListScreenProps extends NativeStackScreenProps<ManagementNavigatorParamList,"CourseList"> {}

export const CourseListScreen: FC<CourseListScreenProps> = observer(function CourseListScreen({navigation}) {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <View style={$root}>
      <StatusBar barStyle="dark-content"/>
      <Appbar.Header>
        <Appbar.BackAction color={colors.palette.blue200} onPress={() => navigation.goBack()} />
        <Appbar.Content title={translate("ManagementScreen.courseList")} color={colors.palette.blue200} titleStyle={{fontFamily: typography.primary.semiBold}} />
      </Appbar.Header>
      <ScrollView style={$container}>
        {dataStore.classrooms.length > 0 ? (
          <>
            {dataStore.courses.map((course, index)=> (
              <View style={$itemStyle} key={index}>
                <View>
                  <Text style={$nameStyle} text={course.name}/>
                  <Text style={$despcritionStyle}>{translate("CreateCourse.credit")}{course.credit}</Text>
                </View>
                  <Icon icon="delete" size={20} color={colors.error}/>
              </View>
            ))}
          </>
        ) :(
          <View style={$emptyStyle}>
            <Icon icon="empty" size={200}/>
            <Text style={$emptyText} tx="ManagementScreen.emptyCourse"/>
          </View>
        )}
        <Button 
          pressedStyle={{backgroundColor: colors.palette.blue200, opacity: 0.8 }} 
          textStyle={$textButton} 
          tx="ManagementScreen.addCourse" 
          style={$buttonStyle}
          onPress={()=>{
            console.log(dataStore.courses)
            navigation.navigate("CreateCourse")
          }}
        />
      </ScrollView>
    </View>
  )
})

const $root: ViewStyle = {
  flex: 1,
  backgroundColor: colors.background,
}
const $container: ViewStyle = {
  paddingHorizontal: spacing.md,
  // justifyContent: "center",
  // alignItems: "center",
}
const $itemStyle:ViewStyle = {
  display: "flex",
  flexDirection: "row",
  paddingHorizontal: spacing.sm,
  paddingVertical: spacing.lg,
  alignItems: "center",
  justifyContent: "space-between",
  marginVertical: spacing.xs,
  borderRadius: spacing.xs,
  borderWidth: 1,
  borderColor: colors.palette.gray,
}
const $despcritionStyle: TextStyle = {
  fontSize: spacing.sm,
}
const $nameStyle: TextStyle = {
  fontSize: spacing.md,
  fontFamily: typography.primary.semiBold,
}
const $emptyStyle:ViewStyle = {
  alignItems: "center",
  marginVertical: spacing.lg,
}
const $emptyText:TextStyle = {
  fontSize: spacing.lg,
  fontWeight: "500",
  marginVertical: spacing.xs,
  fontFamily: typography.primary.semiBold,
}
const $buttonStyle: ViewStyle = {
  backgroundColor: colors.palette.blue200,
  borderRadius: spacing.xxs,
  padding: spacing.xxs,
  marginBottom: spacing.sm,
  marginTop: spacing.xxxl,
  // alignSelf: "flex-end",
}
const $textButton:TextStyle = {
  color: colors.palette.neutral100,
  fontSize: spacing.md,
  fontWeight: "bold",
}
