/* eslint-disable react-native/no-inline-styles */
import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { ScrollView, StatusBar, Switch, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { ManagementNavigatorParamList } from "app/navigators"
import { Button, CourseForm, Icon, Text } from "app/components"
import { colors, spacing, typography } from "app/theme"
import { Appbar } from "react-native-paper"
import { translate } from "app/i18n"
import Toast from "react-native-toast-message"
import dataStore from "app/data/data"
import { Course, Timetable } from "app/types/dataTypes"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface CreateTimetableScreenProps extends NativeStackScreenProps<ManagementNavigatorParamList,"CreateTimetable"> {}

interface DaySchedule  {
  day: "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday",
  coursesSchedule: {
    id: string
    courseId:string,
    startTime: string,
    endTime: string,
  }[],
}
export const CreateTimetableScreen: FC<CreateTimetableScreenProps> = observer(function CreateTimetableScreen({navigation, route}) {
  
  const [courses, setCourses] = useState<Course[]>([])
  const [timetables, setTimetables] = useState<Timetable[]>([])
  
  useEffect(() => {
    const loadCourses = async () => {
      const loadedCourses = await dataStore.getCourses();
      if (loadedCourses.length <= 0) {
        navigation.goBack()
        Toast.show({
          type: 'info',
          position: 'bottom',
          text1: translate("common.error"),
          text2: translate("CreateTimetable.errorNoCourse"),
        });
      }else {
        setCourses(loadedCourses);
      }
    };
    const loadTimetables = async () => {
      const loadedTimetables = await dataStore.getTimeTables();
      setTimetables(loadedTimetables);
    };
    loadCourses()
    loadTimetables()
  }, [timetables]);
 const prevIndex = timetables.length > 0 ? 
    Number(timetables[timetables.length - 1].id.split("_")[1]) : 0;
    const newId = `timetable_${prevIndex + 1}`;
  const timetable:Timetable = {
    id: newId,
    classroomId: route.params.classroomId ,
    daySchedule: []
  };
  interface dayParam {
    // day: "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday",
    dayData: DaySchedule
    state: boolean
  }
  interface scheduleData {
    courseId:string,
    startTime: string,
    endTime: string,
  }
  const [daysOfWeek, setDaysOfWeek] = useState<dayParam[]>([
    { 
      dayData: {
        day:"monday",
        coursesSchedule: []
      },
      state: false 
    },
    { 
      dayData: {
        day:"tuesday",
        coursesSchedule: []
      },
      state: false 
    }, { 
      dayData: {
        day:"wednesday",
        coursesSchedule: []
      },
      state: false 
    }, { 
      dayData: {
        day:"thursday",
        coursesSchedule: []
      },
      state: false 
    }, { 
      dayData: {
        day:"friday",
        coursesSchedule: []
      },
      state: false 
    }, { 
      dayData: {
        day:"saturday",
        coursesSchedule: []
      },
      state: false 
    }, { 
      dayData: {
        day:"sunday",
        coursesSchedule: []
      },
      state: false 
    },
  ])

  //  useEffect(()=> {
  //   console.log("day active ",daysOfWeek)
  //  }, [daysOfWeek])
   useEffect(()=> {
    console.log(" dataStore timetables", timetables[1]?.daySchedule.map(item=> item.coursesSchedule.map(it=> it.courseId)));
    console.log("dataStore timetables length", timetables.length);
   }, [])
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <View style={$root}>
      <StatusBar barStyle="dark-content"/>
      <Appbar.Header>
        <Appbar.BackAction color={colors.palette.blue200} onPress={() => navigation.goBack()} />
        <Appbar.Content title={translate("CreateTimetable.title")} color={colors.palette.blue200} titleStyle={{ fontFamily: typography.primary.semiBold }} />
      </Appbar.Header>
      <ScrollView style={$viewContainer}>
        {daysOfWeek.map((day, index) => {
          const [isVisible, setIsVisible] = useState(false)
          const [courseForms, setCourseForms] = useState([0]);
          const addCourseSchedule = (newSchedule: scheduleData) => {
            const isTimeSlotOccupied = day.dayData.coursesSchedule.some(existingCourse => {
              // Convertir les heures de début et de fin en objets Date pour une comparaison plus précise
              const newStartTime = new Date(newSchedule.startTime);
              const newEndTime = new Date(newSchedule.endTime);
              const existingStartTime = new Date(existingCourse.startTime);
              const existingEndTime = new Date(existingCourse.endTime);
          
              // Vérifier si les intervalles se chevauchent
              return (
                newStartTime < existingEndTime && existingStartTime < newEndTime ||
                newStartTime < existingStartTime && existingStartTime < newEndTime ||
                newStartTime < existingEndTime && existingEndTime < newEndTime ||
                newStartTime < existingStartTime && existingEndTime < newEndTime
              );
           });
            // Si le créneau horaire est déjà occupé, ne pas ajouter le nouveau programme
            if (isTimeSlotOccupied) {
              console.log("Le créneau horaire est déjà occupé.");
              // Vous pouvez afficher un message d'erreur ou gérer cette situation comme vous le souhaitez
              Toast.show({
                type: 'error',
                position: 'bottom',
                text1: translate("common.error"),
                text2: translate("CreateTimetable.slotOccupied"),
              });
              return;
            }
            const prevIndex = day.dayData.coursesSchedule.length > 0 ? 
              Number(day.dayData.coursesSchedule[day.dayData.coursesSchedule.length - 1].id.split("_")[1]) : 0;

            // Générez le nouvel identifiant unique en incrémentant l'index précédent
            const newId = `schedule_${prevIndex + 1}`;
            const updateDayOfWeek = [...daysOfWeek]
            const foundDay = updateDayOfWeek.find(data => data.dayData.day === day.dayData.day);
            if (foundDay) {
              foundDay.dayData.coursesSchedule.push({
                id: newId,
                courseId: newSchedule.courseId,
                endTime: newSchedule.endTime,
                startTime: newSchedule.startTime
              });
            }
            setDaysOfWeek(updateDayOfWeek)
          }

          const addCourseForm = () => {
            setCourseForms(prevForms => [...prevForms, prevForms.length]);
          };
          
          const deleteCourseForm = (id: number, formData?: any) => {
            const updateDayOfWeek = [...daysOfWeek]
            const actualDay = updateDayOfWeek.find(data => data.dayData.day === day.dayData.day)
            if (actualDay) {
              actualDay.dayData.coursesSchedule = actualDay.dayData.coursesSchedule.filter(schedule =>!( schedule.courseId === formData.courseId && 
                schedule.startTime === formData.startTime && schedule.endTime === formData.endTime ))
            }
            setDaysOfWeek(updateDayOfWeek)
            setCourseForms(prevForms => prevForms.filter(formId => formId !== id));
          };
          return (
            <View key={index}>
              <View 
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between"
                }}>
                <Text style={$dayStyle} text={translate(`CreateTimetable.dayOfWeek.${day.dayData.day}`)}/>
                <Switch
                  value={day.state}
                  trackColor={{false: colors.palette.gray, true: colors.palette.blue200}}
                  thumbColor={colors.palette.angry100}
                  onValueChange={(newValue) => {
                    setDaysOfWeek(prev => prev.map(item => 
                      item.dayData.day === day.dayData.day ? { ...item, state: newValue } : item
                    ));
                  }}
                />
              </View>
              <TouchableOpacity activeOpacity={0.7} disabled={!day.state} style={[$dayView, { opacity: day.state ? 1 : 0.5}]} onPress={()=>setIsVisible(!isVisible) }>
                <Text style={$dayStyle} tx="CreateTimetable.form.title"/>
                <Icon icon={isVisible? "caretLeft" : "caretRight"} />
              </TouchableOpacity>
                {isVisible && day.state && (
                  <>
                    {courseForms?.map((id)=> (
                      <CourseForm 
                        onFormSubmit={(formData)=>{
                          addCourseSchedule(formData)
                          console.log("daySchedule state",day.dayData.coursesSchedule)
                          console.log("isday active" , day.state)
                        }} 
                        key={id} 
                        courses={courses} 
                        onDelete={(formData)=> {
                          deleteCourseForm(id, formData)
                          console.log("daySchedule state",day.dayData.coursesSchedule)
                        }}
                      />
                    ))}
                    <TouchableOpacity onPress={addCourseForm} style={$delView}>
                      <Text style={$text}>{translate("CreateTimetable.addProgram")}</Text>
                    </TouchableOpacity>
                  </>
                )}
            </View>
          )
        })}
        <Button
          pressedStyle={{ backgroundColor: colors.palette.blue200, opacity: 0.8 }}
          textStyle={$textButton}
          tx="common.saveButton"
          style={$buttonStyle}
          onPress={async () =>{
            console.log(daysOfWeek)
            const onlyDaySchedule: DaySchedule[] = []
            daysOfWeek.filter(day => day.state === true && day.dayData.coursesSchedule.length > 0)
              .map((item)=> onlyDaySchedule.push(item.dayData))
            if (onlyDaySchedule.length > 0) {
              console.log("debut push");
              onlyDaySchedule.map(day => timetable.daySchedule.push(day))
              console.log("dataStore timetables avant", timetables.map((timetable) => console.log(timetable.daySchedule) ));
              if(timetables.some(existing=> existing.classroomId === timetable.classroomId)) {
                Toast.show({
                  type: 'info',
                  position: 'bottom',
                  text1: translate("common.sorry"),
                  text2: translate("CreateTimetable.existingTimetable"),
                });
              }else {
                await dataStore.addTimetable(timetable);
                console.log("fin push");
                console.log("dataStore timetables apres", timetables.map((timetable) => console.log(timetable.daySchedule) ));
                navigation.navigate("Management")
                Toast.show({
                  type: 'success',
                  position: 'bottom',
                  text1: translate("common.success"),
                  text2: translate("CreateClassroom.successMessage"),
                });
              }
            } else {
              Toast.show({
                type: 'info',
                position: 'bottom',
                text1: translate("common.error"),
                text2: translate("CreateTimetable.errorNoSchedule"),
              });
           }
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
const $viewContainer: ViewStyle = {
  paddingHorizontal: spacing.md,
  // paddingTop: spacing.lg,
  paddingVertical: spacing.sm,
 };
 const $dayStyle: TextStyle = {
  textAlign: "center",
  fontFamily: typography.primary.semiBold,
  fontSize: spacing.md
 };
 const $dayView: ViewStyle = {
  height: 50,
  padding: spacing.xs,
  marginVertical: spacing.sm,
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: colors.palette.overlay20,
  borderRadius: spacing.xs,
 }
 const $delView:ViewStyle = {
  marginVertical: spacing.xs,
  borderColor: colors.palette.overlay20,
  borderWidth: 0.5,
  height: 60,
  alignItems: "center",
  justifyContent: "center",
  width: "60%",
  alignSelf: "center",
  borderRadius: 5,
  backgroundColor: colors.palette.neutral100
}
const $text: TextStyle = {
  fontFamily: typography.primary.semiBold,
  color: colors.palette.blue200,
  textAlign: "center",
}
const $buttonStyle: ViewStyle = {
  backgroundColor: colors.palette.blue200,
  borderRadius: spacing.xxs,
  padding: spacing.xxs,
  marginBottom: spacing.xxl,
  marginTop: spacing.xxl,
 };
 
 const $textButton: TextStyle = {
  color: colors.palette.neutral100,
  fontSize: spacing.md,
  fontWeight: "bold",
 };
