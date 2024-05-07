import React from "react"
import {BottomTabScreenProps, createBottomTabNavigator} from "@react-navigation/bottom-tabs"
import {HomeNavigator, ManagementNavigator, AttendanceNavigator} from "app/navigators"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { colors, spacing} from "app/theme"
import { TextStyle, ViewStyle } from "react-native"
import { CompositeScreenProps } from "@react-navigation/native"
import { AppStackParamList, AppStackScreenProps } from "./AppNavigator"
import { CustomTabIcon } from "app/components"
import { translate } from "app/i18n"

export type MainBottomTabNavigatorParamList = {
  ManagementNavigator: undefined
  HomeNavigator: undefined
  AttendanceNavigator: undefined
}

export type MainBottomTabScreenProps<T extends keyof MainBottomTabNavigatorParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<MainBottomTabNavigatorParamList, T>,
    AppStackScreenProps<keyof AppStackParamList>
  >

const Tab = createBottomTabNavigator<MainBottomTabNavigatorParamList>()
export const MainBottomTabNavigator = () => {
  const { bottom } = useSafeAreaInsets()

  return (
    <>
      <Tab.Navigator
        initialRouteName="HomeNavigator"

        screenOptions={{
          tabBarHideOnKeyboard: true,
          tabBarStyle: [$tabBar, {height: bottom + 70, backgroundColor: colors.palette.neutral100}],
          tabBarActiveTintColor: colors.palette.blue200,
          tabBarInactiveTintColor: colors.palette.blue200,
          tabBarLabelStyle: $labelStyle,
          tabBarItemStyle: $itemStyle,
        }}
      >
        <Tab.Screen 
          name="HomeNavigator" 
          component={HomeNavigator}
          options={{
            unmountOnBlur: true,
            tabBarIcon: ({focused})=> (
              <CustomTabIcon iconName="home" isFocused={focused} />
            ),
            tabBarLabel: translate("common.home"),
            headerShown: false,
          }}
        />
        <Tab.Screen 
          name="AttendanceNavigator" 
          component={AttendanceNavigator}
          options={{
            unmountOnBlur: true,
            tabBarIcon: ({focused})=> (
              <CustomTabIcon iconName="attendance" isFocused={focused} />
            ),
            tabBarLabel: translate("common.attendanceBottom"),
            headerShown: false,
          }}
        />
        <Tab.Screen 
          name="ManagementNavigator" 
          component={ManagementNavigator}
          options={{
            unmountOnBlur: true,
            tabBarIcon: ({focused})=> (
              <CustomTabIcon iconName="management" isFocused={focused} />
            ),
            tabBarLabel: translate("ManagementScreen.managementText"),
            headerShown: false,
          }}
        />

      </Tab.Navigator>
    </>
  )
}

const $tabBar: ViewStyle = {
  borderTopColor: colors.palette.neutral100,
}
const $labelStyle: TextStyle = {
  fontWeight: "bold",
  fontSize: spacing.sm,
}
const $itemStyle:ViewStyle = {
  marginHorizontal: spacing.xs,
  marginVertical: spacing.sm,
}