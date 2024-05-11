/* eslint-disable react-native/no-inline-styles */
import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { Image, ImageStyle, ScrollView, StatusBar, TextStyle, View, ViewStyle } from "react-native"
import { AttendanceNavigatorParamList } from "app/navigators"
import { translate } from "app/i18n"
import { colors, spacing, typography } from "app/theme"
import { Appbar } from "react-native-paper"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { Attendance, Classroom, Course, Student} from "app/types/dataTypes"
import dataStore from "app/data/data"
import { Dropdown, Icon, Text } from "app/components"
import Spinner from "react-native-loading-spinner-overlay"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface AttendanceListScreenProps extends NativeStackScreenProps<AttendanceNavigatorParamList,"AttendanceList"> {}

export const AttendanceListScreen: FC<AttendanceListScreenProps> = observer(function AttendanceListScreen({route}) {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  const [attendances, setAttendances] = useState<Attendance[]>([])
  const [students, setStudents] = useState<Student[]>([])
  const [courses , setCourses] = useState<Course[]>([])
  const [classrooms, setClassrooms] = useState<Classroom[]>([])
  const [isChecking, setIsChecking] = useState(false)
  const [firstClassroomId, setFirstClassroomId] = useState<string>("");
  const [selectedClassroom, setSelectedClassroom] = useState<string>("")
  const [selectedDate, setSelectedDate] = useState<string>("")

  const loadStudents = async () => {
    const loadedStudents = await dataStore.getStudents();
    setStudents(loadedStudents);
  };
  const loadClassrooms = async () => {
    const loadedClassrooms = await dataStore.getClassrooms();
    setClassrooms(loadedClassrooms);
  };
  const loadCourses = async () => {
    const loadedCourses = await dataStore.getCourses();
    setCourses(loadedCourses);
  };
  const loadAttendances = async () => {
    const loadedAttendances = await dataStore.getAttendances();
    setAttendances(loadedAttendances);
  };
  useEffect(() => {
    const getData = () => {
      setIsChecking(true)
      loadStudents()
      loadAttendances()
      loadClassrooms()
      loadCourses()
      setIsChecking(false)
    }
    getData()
  }, [courses]);
  useEffect(() => {
    if (route.params?.classroomId) {
      setFirstClassroomId(route.params.classroomId);
    }else if (attendances?.length > 0) {
      setFirstClassroomId(attendances[0].classroomId);
    }
  }, [attendances]);
  useEffect(() => {
    if (firstClassroomId) {
      setSelectedClassroom(firstClassroomId);
    }
  }, [firstClassroomId]);
  const filteredClassrooms = classrooms.filter(classroom => 
    attendances.some(attendance => attendance.classroomId === classroom.id)
  );
  const filteredAttendances = attendances.filter(attendance => 
    classrooms.some(classroom => attendance.classroomId === classroom.id)
  );
  useEffect(()=> {
    if(route.params?.date) {
      setSelectedDate(route.params.date)
    } else if(filteredAttendances.length > 0) {
      setSelectedDate(filteredAttendances.find(attendance=> attendance.classroomId === selectedClassroom)?.classroomCall[0].date ?? "")
    }
  })
  return (
    <View style={$root}>
      <StatusBar barStyle="light-content"/>
      <Spinner visible={isChecking} />
      <Appbar.Header style={{backgroundColor: colors.palette.blue200}}>
        {/* <Appbar.BackAction color={colors.palette.blue200} onPress={() => navigation.navigate('Management')} /> */}
        <Appbar.Content title={translate("attendanceList.headerText")} color={colors.palette.neutral100} titleStyle={{fontFamily: typography.primary.semiBold, alignSelf: "center"}} />
      </Appbar.Header>
        <ScrollView style={$container}>
          {attendances && attendances.length > 0 ? (
            <>
              <Text style={{fontFamily: typography.primary.semiBold}}>{translate("attendanceList.selClass")}</Text>
              <Dropdown
                items={filteredClassrooms.map(classroom => ({label: classroom.name, value: classroom.id}))}
                value={selectedClassroom}
                onChangeText={(id)=> setSelectedClassroom(id)}
              />
              <Text style={{fontFamily: typography.primary.semiBold, marginTop: spacing.xs}}>{translate("attendanceList.selDate")}</Text>
              <Dropdown
                items={(filteredAttendances.find(att=> att.classroomId === selectedClassroom)?.classroomCall.map(day => ({label: day.date, value: day.date})) || [])}
                value={selectedDate}
                style={{display: "flex",justifyContent: "center", alignItems: "center"}}
                onChangeText={(date)=> setSelectedDate(date)}
              />
              {attendances.find(att=> att.classroomId === selectedClassroom)?.classroomCall.find(call=> call.date === selectedDate)?.courses.map((item, index)=> (
                <View key={index}>
                  <Text style={{fontFamily: typography.primary.semiBold, marginTop: spacing.sm}}>{translate("attendanceList.course")} {courses.find(course=> course.id === item.courseId)?.name}</Text>
                  {item.attendance.map((attendance, key)=> {
                    const student = students.find(student=> student.id === attendance.studentId)
                    const image = student?.photo === undefined ? student?.gender === "male" ? require("../../assets/images/boy1.jpg") :
                      require("../../assets/images/girl1.jpg") : {uri: student.photo}
                    return (
                      <View style={$studentContainer} key={key}>
                        <View style={{display: "flex", flexDirection: "row"}}>
                          <Image
                            source={image} 
                            style={$studentPhoto}
                          />
                          <View style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start", marginLeft: spacing.xs}}>
                            <Text style={$studentName}>{students.find(student=> student.id === attendance.studentId)?.name}</Text>
                            <Text style={$studentGender}>{translate(`CreateStudent.${students.find(student=> student.id === attendance.studentId)?.gender || `female`}`)}</Text>
                          </View>
                        </View>
                        <View 
                          style={[$attendanceButton, 
                          {backgroundColor: attendance.call === "absent" ? colors.palette.angry500 : colors.palette.success}]}
                        >
                          <Text style={$attendanceButtonText}>{attendance.call === "absent" ? "Absent" : "Present"}</Text>
                        </View>
                      </View>
                    )
                  })}
                </View>
              ))}
            </>
          ) : (
            <View style={$emptyStyle}>
              <Icon icon="empty" size={200}/>
              <Text style={$emptyText} tx="attendanceList.noHistory"/>
          </View>
          )}
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
}
const $emptyStyle:ViewStyle = {
  alignItems: "center",
  marginVertical: spacing.xxxl,
}
const $emptyText:TextStyle = {
  fontSize: spacing.lg,
  fontWeight: "500",
  marginVertical: spacing.xs,
  fontFamily: typography.primary.semiBold,
  textAlign: "center",
}
const $studentPhoto: ImageStyle = {
  width: 50,
  height: 50,
  borderRadius: 25,
  marginRight: spacing.sm,
 };
 const $attendanceButton: ViewStyle = {
  paddingHorizontal: spacing.sm,
  paddingVertical: spacing.xs,
  borderRadius: spacing.xs,
 };
 
 const $attendanceButtonText: TextStyle = {
  color: colors.palette.neutral100,
  fontSize: spacing.sm,
  fontFamily: typography.primary.semiBold,
 };
 const $studentName: TextStyle = {
  fontSize: spacing.md,
  fontFamily: typography.primary.semiBold,
 };
 
 const $studentGender: TextStyle = {
  fontSize: spacing.md,
  fontFamily: typography.primary.normal,
 };
 const $studentContainer: ViewStyle = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  paddingHorizontal: spacing.sm,
  paddingVertical: spacing.lg,
  marginVertical: spacing.xs,
  borderRadius: spacing.xs,
  borderWidth: 1,
  borderColor: colors.palette.gray,
 };