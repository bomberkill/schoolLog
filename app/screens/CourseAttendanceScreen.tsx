/* eslint-disable react-native/no-inline-styles */
import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { Image, ImageStyle, ScrollView, StatusBar, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { HomeNavigatorParamList } from "app/navigators"
import { Button, Icon, Text } from "app/components"
import { translate } from "app/i18n"
import { colors, spacing, typography } from "app/theme"
import { Appbar } from "react-native-paper"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import dataStore from "app/data/data"
import { Attendance, Classroom, Course, Student } from "app/types/dataTypes"
import Toast from "react-native-toast-message"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface CourseAttendanceScreenProps extends NativeStackScreenProps<HomeNavigatorParamList,"CourseAttendance"> {}

export const CourseAttendanceScreen: FC<CourseAttendanceScreenProps> = observer(function CourseAttendanceScreen({navigation, route}) {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  interface callParam {
    studentId: string,
    call: "present" | "absent" | undefined,
    isPresent: boolean,
    isAbsent: boolean,
  }
  interface callData {
    studentId: string;
    call: "present" | "absent";
  }
  const [classrooms, setClassrooms] = useState<Classroom[]>([])
  const [courses, setCourses] = useState<Course[]>([])
  const [attendances, setAttendances] = useState<Attendance[]>([])
  const [courseName, setCourseName] = useState<string>("")
  const [classroomName, setClassroomName] = useState<string>("")
  const [students, setStudents] = useState<Student[]>([])
  const [allStudents, setAllStudents] = useState<Student[]>([])
  
  const [calls, setCalls] = useState<callParam[]>([]);
  useEffect(() => {
    const loadClassrooms = async () => {
      const loadedClassrooms = await dataStore.getClassrooms();
      setClassrooms(loadedClassrooms);
    };
    const loadCourses = async () => {
      const loadedCourses = await dataStore.getCourses();
      setCourses(loadedCourses);
    };
    const loadStudents = async () => {
      const loadedStudents = await dataStore.getStudents();
      setAllStudents(loadedStudents);
    };
    const loadAttendances = async () => {
      const loadedAttendances = await dataStore.getAttendances();
      setAttendances(loadedAttendances);
    };
    loadAttendances()
    loadClassrooms()
    loadCourses()
    loadStudents()
  }, []);
  useEffect(()=> {
    setCourseName(courses.find(course => course.id === route.params.courseSchedule.courseId)?.name ?? "")
    setClassroomName(classrooms.find(classe => classe.id === route.params.classroomId)?.name ?? "")
    setStudents(allStudents.filter(student => student.classroomId === route.params.classroomId))
    setCalls(allStudents.filter(student => student.classroomId === route.params.classroomId)
    .map(student=> ({
      studentId: student.id,
      call: undefined,
      isPresent: false,
      isAbsent: false
    }))
    )
  }, [courses, allStudents, classrooms])
  
  const prevIndex = attendances.length > 0 ? 
    Number(attendances[attendances.length - 1].id.split("_")[1]) : 0;
    const newId = `attendance_${prevIndex + 1}`;
  const attendance: Attendance = {
    id: newId,
    classroomId: route.params.classroomId,
    classroomCall: [{
      date: new Date().toLocaleDateString(),
      day: route.params.day,
      courses: [{
        courseScheduleId: route.params.courseSchedule.id,
        courseId: route.params.courseSchedule.courseId,
        attendance: []
      }]
    }]
  }
  const markAttendance = (studentId: string, call: "present" | "absent") => {
    setCalls(prevCalls => prevCalls.map(item =>{
      if(item.studentId === studentId) {
        return {
          ...item,
          call,
          isPresent: call === "absent",
          isAbsent: call === "present",
        }
      }
      return item
    }))
    console.log(`Student ${studentId} marked as ${call}`);
  };
  const HandleSubmit = async() => {
    if(calls.some(call=> call.call === undefined)) {
      Toast.show({
        type: 'info',
        position: 'bottom',
        text1: translate("common.error"),
        text2: translate("home.callError"),
      });
    } else {
      const existingAttendance = attendances.find(item=> 
        item.classroomId === route.params.classroomId)
      if (existingAttendance) {
         const existingAttendanceSchedule = existingAttendance.classroomCall.find(item=> item.date === new Date().toLocaleDateString())?.courses.find(item=> item.courseScheduleId === route.params.courseSchedule.id)
        if(existingAttendanceSchedule) {
          Toast.show({
            type: 'info',
            position: 'bottom',
            text1: translate("common.error"),
            text2: translate("home.callDone"),
          });
        }else {
          const currentAttendance: callData[] = []
          calls.map(call=> currentAttendance.push({studentId: call.studentId, call: call.call as "present" | "absent"}))
          const filteredAttendance = currentAttendance.filter(item => item.call !== undefined);
          await dataStore.addAttendanceSchedule(
            route.params.classroomId, new Date().toLocaleDateString(),
            {courseScheduleId: route.params.courseSchedule.id, courseId: route.params.courseSchedule.courseId, attendance: filteredAttendance})
          Toast.show({
            type: 'success',
            position: 'bottom',
            text1: translate("common.success"),
            text2: translate("CreateClassroom.successMessage"),
          });
          console.log("dataStore.Attendance", attendances)
        }
      }else {
        const currentAttendance: callData[] = []
        calls.map(call=> currentAttendance.push({studentId: call.studentId, call: call.call as "present" | "absent"}))
        const course = attendance.classroomCall.find(item=> item.date === new Date().toLocaleDateString())?.courses.find(course => course.courseScheduleId === route.params.courseSchedule.id);
        if (course) {
          const filteredAttendance = currentAttendance.filter(item => item.call !== undefined);
          course.attendance = filteredAttendance;
          console.log("attendance", attendance)
          await dataStore.addAttendance(attendance)
          Toast.show({
            type: 'success',
            position: 'bottom',
            text1: translate("common.success"),
            text2: translate("CreateClassroom.successMessage"),
          });
          console.log("dataStore.Attendance", attendances)
        } else {
          // Handle the case where the course is not found
          console.error("Course not found");
        }
      }
    }
  }

  return (
    <View style={$root}>
      <StatusBar barStyle="light-content"/>
      <Appbar.Header style={{backgroundColor: colors.palette.blue200}}>
      <Appbar.BackAction color={colors.palette.neutral100} onPress={() => navigation.goBack()} />
      <Appbar.Content title={translate("common.attendance")} color={colors.palette.neutral100} titleStyle={{fontFamily: typography.primary.semiBold, alignSelf: "flex-start"}} />
    </Appbar.Header>
    <ScrollView style={$container}>
      {students.length > 0 ? (
        <>
          <Text style={{fontFamily: typography.primary.semiBold}}>{translate("attendanceList.classroom")} {classroomName}</Text>
          <Text style={{fontFamily: typography.primary.semiBold}}>{translate("attendanceList.course")} {courseName}</Text>
          {students.map((student, index) => {
            const image = student.photo === undefined ? student.gender === "male" ? require("../../assets/images/boy1.jpg") :
              require("../../assets/images/girl1.jpg") : {uri: student.photo}
            return (
              <>
                <View key={index}  style={$studentContainer}>
                  <Image 
                    source={image} 
                    style={$studentPhoto}
                  />
                  <View style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start"}}>
                    <Text numberOfLines={2} ellipsizeMode="tail" style={$studentName}>{student.name}</Text>
                    <Text style={$studentGender}>{translate(`CreateStudent.${student.gender}`)}</Text>
                  </View>
                  <View style={$attendanceOptions}>
                    <TouchableOpacity activeOpacity={0.7} disabled={calls.find(call=> call.studentId === student.id)?.isAbsent} onPress={() => markAttendance(student.id, "present")} 
                      style={[$attendanceButton, 
                        {backgroundColor: calls.find(call=> call.studentId === student.id)?.isPresent ? colors.errorBackground : colors.palette.success}]}
                    >
                      <Text style={[$attendanceButtonText, {color : calls.find(call=> call.studentId === student.id)?.isPresent ? colors.palette.neutral700 : colors.palette.neutral100}]}>Present</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.7} disabled={calls.find(call=> call.studentId === student.id)?.isPresent} onPress={() => markAttendance(student.id, "absent")} 
                      style={[$attendanceButton, 
                        {backgroundColor: calls.find(call=> call.studentId === student.id)?.isAbsent ? colors.errorBackground : colors.palette.angry500}]}
                    >
                      <Text style={[$attendanceButtonText, {color : calls.find(call=> call.studentId === student.id)?.isAbsent ? colors.palette.neutral700 : colors.palette.neutral100}]}>Absent</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            )
          })
          }
        </>
      )
      : (
        <View style={$emptyStyle}>
          <Icon icon="noSchedule" size={200}/>
          <Text style={$emptyText} tx="home.noSchedule"/>
        </View>
      )}
      <Button
          pressedStyle={{ backgroundColor: colors.palette.blue200, opacity: 0.8 }}
          textStyle={$textButton}
          tx="common.saveButton"
          style={$buttonStyle}
          onPress={HandleSubmit}
        />
    </ScrollView>
    </View>
  )
})

const $root: ViewStyle = {
  flex: 1,
  backgroundColor: colors.background,
}

const $container:ViewStyle = {
  paddingHorizontal: spacing.md,
  paddingVertical: spacing.sm,
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
  textAlign: "center",
}
const $textButton: TextStyle = {
  color: colors.palette.neutral100,
  fontSize: spacing.md,
  fontWeight: "bold",
 };
 const $buttonStyle: ViewStyle = {
  backgroundColor: colors.palette.blue200,
  borderRadius: spacing.xxs,
  padding: spacing.xxs,
  marginBottom: spacing.xxl,
  marginTop: spacing.xxl,
 };
const $studentContainer: ViewStyle = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-around",
  paddingHorizontal: spacing.sm,
  paddingVertical: spacing.lg,
  marginVertical: spacing.xs,
  borderRadius: spacing.xs,
  borderWidth: 1,
  borderColor: colors.palette.gray,
 };
 
 const $studentPhoto: ImageStyle = {
  width: 50,
  height: 50,
  borderRadius: 25,
  marginRight: spacing.sm,
 };
 
 const $studentName: TextStyle = {
  fontSize: spacing.md,
  fontFamily: typography.primary.semiBold,
 };
 
 const $studentGender: TextStyle = {
  fontSize: spacing.md,
  fontFamily: typography.primary.normal,
 };
 
 const $attendanceOptions: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  width: "50%",
 };
 
 const $attendanceButton: ViewStyle = {
  paddingHorizontal: spacing.sm,
  paddingVertical: spacing.xs,
  borderRadius: spacing.xs,
 };
 
 const $attendanceButtonText: TextStyle = {
  // color: colors.palette.neutral100,
  fontSize: spacing.sm,
  fontFamily: typography.primary.semiBold,
 };