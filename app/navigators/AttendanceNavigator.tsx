import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import {
  AttendanceListScreen
} from "app/screens"

export type AttendanceNavigatorParamList = {
  AttendanceList: {
    classroomId?: string,
    date?: string,
    courseScheduleId?: string,
  }
}

const Stack = createNativeStackNavigator<AttendanceNavigatorParamList>()
export const AttendanceNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AttendanceList" component={AttendanceListScreen} />
    </Stack.Navigator>
  )
}
