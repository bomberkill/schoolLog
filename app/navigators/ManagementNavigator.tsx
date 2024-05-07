import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import {
  ManagementScreen,
  ClassroomDetailsScreen,
  ClassroomListScreen,
  StudentListScreen,
  CourseListScreen,
  CreateClassroomScreen,
  CreateCourseScreen,
  CreateStudentScreen,
  CreateTimetableScreen
} from "app/screens"

export type ManagementNavigatorParamList = {
  Management: undefined
  ClassroomDetails: undefined
  ClassroomList: undefined
  StudentList: undefined
  CourseList: undefined
  CreateCourse: undefined
	CreateStudent: undefined
	CreateClassroom: undefined
	CreateTimetable: {
    classroomId: string,
  }
}


const Stack = createNativeStackNavigator<ManagementNavigatorParamList>()
export const ManagementNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Management" component={ManagementScreen} />
      <Stack.Screen name="ClassroomDetails" component={ClassroomDetailsScreen} />
      <Stack.Screen name="ClassroomList" component={ClassroomListScreen} />
      <Stack.Screen name="StudentList" component={StudentListScreen} />
      <Stack.Screen name="CourseList" component={CourseListScreen} />
      <Stack.Screen name="CreateCourse" component={CreateCourseScreen} />
      <Stack.Screen name="CreateClassroom" component={CreateClassroomScreen} />
      <Stack.Screen name="CreateStudent" component={CreateStudentScreen} />
      <Stack.Screen name="CreateTimetable" component={CreateTimetableScreen} />
    </Stack.Navigator>
  )
}
