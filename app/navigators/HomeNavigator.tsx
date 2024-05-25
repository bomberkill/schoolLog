import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import {
  HomeScreen,
  CourseAttendanceScreen,
} from "app/screens"
import { CourseSchedule } from "app/types/dataTypes"
import { AttendanceNavigator } from "./AttendanceNavigator"

export type HomeNavigatorParamList = {
	CourseAttendance: {
    classroomId: string,
    day: "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday",
    courseSchedule: CourseSchedule
  },
  AttendanceNavigator: {
    classroomId?: string,
    date?: string,
    courseScheduleId?: string,
  }
	HomeScreen: undefined
}

const Stack = createNativeStackNavigator<HomeNavigatorParamList>()
export const HomeNavigator = () => {
  return (
    <Stack.Navigator  initialRouteName="HomeScreen" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="CourseAttendance" component={CourseAttendanceScreen} />
      <Stack.Screen name="AttendanceNavigator" component={AttendanceNavigator} />
    </Stack.Navigator>
  )
}
