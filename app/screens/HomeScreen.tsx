/* eslint-disable react-native/no-inline-styles */
import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { ScrollView, StatusBar, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { HomeNavigatorParamList } from "app/navigators"
import { Dropdown, Icon, Text } from "app/components"
import { colors, spacing, typography } from "app/theme"
import { Appbar } from "react-native-paper"
import { translate } from "app/i18n"
import dataStore from "app/data/data"
import Toast from "react-native-toast-message"
import { Attendance, Classroom, Course, Timetable } from "app/types/dataTypes"
import I18n from "i18n-js"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import Spinner from "react-native-loading-spinner-overlay"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface HomeScreenProps extends NativeStackScreenProps <HomeNavigatorParamList, "HomeScreen"> {}

export const HomeScreen: FC<HomeScreenProps> = observer(function HomeScreen({navigation}) {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  
  // Pull in navigation via hook
  // const navigation = useNavigation()
  const [timetables, setTimeTables] = useState<Timetable[]>([])
  const [classrooms, setClassrooms] = useState<Classroom[]>([])
  const [courses, setCourses] = useState<Course[]>([])
  const [isChecking, setIsChecking] = useState(false)
  const [attendances, setAttendances] = useState<Attendance[]>([])
  const [firstClassroomId, setFirstClassroomId] = useState<string>("");
  const [selectedClassroom, setSelectedClassroom] = useState<string>("")
  const [selectedDay, setSelectedDay] = useState<string>("");
  const loadTimetables = async () => {
    const loadedTimeTables = await dataStore.getTimeTables();
    setTimeTables(loadedTimeTables);
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
    setIsChecking(true)
    const getData = () => {
      console.log('start', isChecking)
      loadAttendances()
      loadClassrooms()
      loadTimetables()
      loadCourses()
    }
    getData()
    setIsChecking(false)
    console.log('end', isChecking)
  }, []);

  useEffect(() => {
    if (timetables.length > 0) {
      setFirstClassroomId(timetables[0].classroomId);
    }
  }, [timetables]);

  useEffect(() => {
      if (firstClassroomId) {
        setSelectedClassroom(firstClassroomId);
      }
  }, [firstClassroomId]);
  const filteredClassrooms = classrooms.filter(classroom => 
    timetables.some(timetable => timetable.classroomId === classroom.id)
  );
  const filteredtimetables = timetables.filter(timetable => 
    classrooms.some(classroom => timetable.classroomId === classroom.id)
  );
  const dayNameRegex = /^(\w+)/
  const currentLongDay = new Date().toLocaleString("en-US",{weekday: "long"})
    .toLowerCase() 
  const dayMatch = currentLongDay.match(dayNameRegex)
  let currentDay: "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday" ;
if (dayMatch) {
  currentDay = dayMatch[1] as "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday";
}
  useEffect(() => {
    const selectedTimetable = timetables.find(timetable => timetable.classroomId === selectedClassroom);
    // console.log("currentDay", currentDay)
    if (selectedTimetable) {
      const daysProgrammed = selectedTimetable.daySchedule.map(schedule => schedule.day);
      if (daysProgrammed.includes(currentDay)) {
        setSelectedDay(currentDay);
      } else {
        const nextDayProgrammed = daysProgrammed.find(day => daysProgrammed.indexOf(day) > daysProgrammed.indexOf(currentDay));
        setSelectedDay(nextDayProgrammed || daysProgrammed[0]); // Utiliser le premier jour programmé si aucun jour n'est trouvé après le jour actuel
      }
    }
  }, [selectedClassroom, timetables]);
  function isProgramInProgress(startTime: string, endTime: string, day: string): boolean {
    const now = new Date();
    const start = new Date(startTime);
    const end = new Date(endTime);
    const LongNow = new Date().toLocaleString("en-US",{weekday: "long"}).toLowerCase()
    const nowMatch = LongNow.match(dayNameRegex)
    // console.log("day", day, "now", nowMatch[0])
  
    // Convertir les heures en minutes pour la comparaison
    if(nowMatch && nowMatch[0] === day) {
      const nowInMinutes = now.getHours() * 60 + now.getMinutes();
      const startInMinutes = start.getHours() * 60 + start.getMinutes();
      const endInMinutes = end.getHours() * 60 + end.getMinutes();
    
      return nowInMinutes >= startInMinutes && nowInMinutes <= endInMinutes;
    }
    return false
  }
  const dayOfWeekTranslations = {
    monday: translate("CreateTimetable.dayOfWeek.monday"),
    tuesday: translate("CreateTimetable.dayOfWeek.tuesday"),
    wednesday: translate("CreateTimetable.dayOfWeek.wednesday"),
    thursday: translate("CreateTimetable.dayOfWeek.thursday"),
    friday: translate("CreateTimetable.dayOfWeek.friday"),
    saturday: translate("CreateTimetable.dayOfWeek.saturday"),
    sunday: translate("CreateTimetable.dayOfWeek.sunday"),
  };
   

  return (
    <View style={$root}>
      <StatusBar barStyle="light-content"/>
      <Spinner color={colors.errorBackground} visible={isChecking} />
      <Appbar.Header style={{backgroundColor: colors.palette.blue200}}>
      {/* <Appbar.BackAction color={colors.palette.blue200} onPress={() => navigation.goBack()} /> */}
      <Appbar.Content title={translate("common.home")} color={colors.palette.neutral100} titleStyle={{fontFamily: typography.primary.semiBold, alignSelf: "center"}} />
    </Appbar.Header>
    <ScrollView style={$container}>
      {timetables && timetables.length > 0 ? (
        <>
          {/* <Text style={{fontFamily: typography.primary.semiBold}}>{translate("attendanceList.selClass")}</Text> */}
          <Dropdown 
            items={filteredClassrooms.map(classroom => ({label: classroom.name, value: classroom.id}))}
            value={selectedClassroom}
            onChangeText={(id)=> setSelectedClassroom(id)}
          />
          {/* <Text style={{fontFamily: typography.primary.semiBold, marginTop: spacing.xs}}>{translate("attendanceList.selDay")}</Text> */}
          <Dropdown
            items={["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"].map(day => ({label: dayOfWeekTranslations[day as keyof typeof dayOfWeekTranslations], value: day}))}
            value={selectedDay}
            style={{display: "flex",justifyContent: "center", alignItems: "center"}}
            onChangeText={(day)=> setSelectedDay(day)}
          />
          {selectedDay && selectedClassroom && filteredtimetables.map((table, key) => table.classroomId === selectedClassroom && (
            <View key={key}>
              {table.daySchedule.some(day => day.day === selectedDay) ? (
                table.daySchedule.map((day, keys) => day.day === selectedDay && (
                  <View key={keys}>
                    {day.coursesSchedule.length > 0 ? 
                      day.coursesSchedule.map((schedule, index)=> (
                        <View key={index}>
                          <TouchableOpacity
                            onPress={() => {
                              if (isProgramInProgress(schedule.startTime, schedule.endTime, day.day)) {
                                const existingAttendance = attendances.find(item=> 
                                  item.classroomId === selectedClassroom)
                                if (existingAttendance) {
                                  const existingAttendanceSchedule = existingAttendance.classroomCall.find(item=> item.date === new Date().toLocaleDateString())?.courses.find(item=> item.courseScheduleId === schedule.id)
                                  if (existingAttendanceSchedule) {
                                    navigation.navigate("AttendanceNavigator", {classroomId: selectedClassroom, date: new Date().toLocaleDateString()})
                                    Toast.show({
                                      type: 'info',
                                      position: 'bottom',
                                      text1: translate("common.info"),
                                      text2: translate("home.callDone"),
                                    });
                                  }
                                } else {
                                  navigation.navigate("CourseAttendance", {
                                    classroomId: selectedClassroom,
                                    courseSchedule: schedule,
                                    day: selectedDay,
                                  });
                                }
                              } else {
                                 Toast.show({
                                   type: 'info',
                                   position: 'bottom',
                                   text1: translate("common.error"),
                                   text2: translate("home.attendanceUnAuth"),
                                 });
                              }
                             }}
                            activeOpacity={0.7} 
                            style={[$itemStyle,
                            {backgroundColor: isProgramInProgress(schedule.startTime, schedule.endTime, day.day) ? colors.palette.success200 : undefined }]} 
                          >
                            <View>
                              <Text 
                                style={$nameStyle} 
                                text={courses.find(course => course.id === schedule.courseId)?.name}
                              />
                              <Text style={$nameStyle}>{new Date(schedule.startTime).toLocaleTimeString(I18n.currentLocale(),{hour: "2-digit", minute: "2-digit", hour12: false})} - 
                              {new Date(schedule.endTime).toLocaleTimeString(I18n.currentLocale(),{hour: "2-digit", minute: "2-digit", hour12: false})}</Text>
                            </View>
                            {isProgramInProgress(schedule.startTime, schedule.endTime, day.day) && 
                            <View>
                              <Text style={{color: colors.palette.success, fontFamily: typography.primary.semiBold}} tx="home.ongoing"/>
                            </View>
                            }
                          </TouchableOpacity>
                        </View>
                      ))
                    : 
                      <>
                      {isChecking !== true && (
                        <View style={$emptyStyle}>
                          <Icon icon="noSchedule" size={200}/>
                          <Text style={$emptyText} tx="home.noSchedule"/>
                        </View>
                      )}
                      </>
                    }
                  </View>
                )
                )
              )
              :
                <View style={$emptyStyle}>
                  <Icon icon="noSchedule" size={200}/>
                  <Text style={$emptyText} tx="home.noSchedule"/>
                </View>
              }
            </View>
          )
          )}
        </>
      ) : (
        <View style={$emptyStyle}>
          <Icon icon="empty" size={200}/>
          <Text style={$emptyText} tx="home.noTimetable"/>
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

const $container:ViewStyle = {
  paddingHorizontal: spacing.md,
  paddingTop: - spacing.sm,
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
const $itemStyle:ViewStyle = {
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
}
const $nameStyle: TextStyle = {
  fontSize: spacing.md,
  fontFamily: typography.primary.semiBold,
}