/* eslint-disable react-native/no-inline-styles */
import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { ScrollView, StatusBar, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { ManagementNavigatorParamList } from "app/navigators"
import { Button, Icon, Text } from "app/components"
import { colors, spacing, typography } from "app/theme"
import { Appbar } from "react-native-paper"
import { translate } from "app/i18n"
import dataStore from "app/data/data"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import Toast from "react-native-toast-message"
import { Classroom, Timetable } from "app/types/dataTypes"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface ClassroomListScreenProps extends NativeStackScreenProps<ManagementNavigatorParamList,"ClassroomList"> {}

export const ClassroomListScreen: FC<ClassroomListScreenProps> = observer(function ClassroomListScreen({navigation}) {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  const [classrooms, setClassrooms] = useState<Classroom[]>([]);
  const [timetables, setTimetables] = useState<Timetable[]>([]);
  useEffect(() => {
    const loadClassrooms = async () => {
      const loadedClassrooms = await dataStore.getClassrooms();
      setClassrooms(loadedClassrooms);
    };
    const loadTimetables = async () => {
      const loadedTimetables = await dataStore.getTimeTables();
      setTimetables(loadedTimetables);
    };
    loadClassrooms();
    loadTimetables()
 }, [classrooms]);

  return (
    <View style={$root}>
      <StatusBar barStyle="dark-content"/>
      <Appbar.Header>
        <Appbar.BackAction color={colors.palette.blue200} onPress={() => navigation.navigate('Management')} />
        <Appbar.Content title={translate("ManagementScreen.classroomList")} color={colors.palette.blue200} titleStyle={{fontFamily: typography.primary.semiBold}} />
      </Appbar.Header>
      <ScrollView style={$container}>
        {classrooms && classrooms.length > 0 ? (
          <>
            {classrooms.map((classroom, index)=> (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={()=>{
                  if(timetables && timetables.find(existing=> existing.classroomId === classroom.id)) {
                    Toast.show({
                      type: 'info',
                      position: 'bottom',
                      text1: translate("common.sorry"),
                      text2: translate("CreateTimetable.existingTimetable"),
                    });
                  }else {
                    navigation.navigate("CreateTimetable", {classroomId: classroom.id})
                    // Toast.show({
                    //   type: 'info',
                    //   position: 'bottom',
                    //   text1: translate("common.sorry"),
                    //   text2: "create timtable screen is not ready",
                    // });
                  }
                }}
                style={$itemStyle}
                key={index}
              >
                <View style={{flex: 9}}>
                  <Text style={$nameStyle} text={classroom.name}/>
                  <Text style={$despcritionStyle} text={classroom.description}/>
                </View>
                <View style={{flex: 1, display: "flex", flexDirection: "row", justifyContent: "flex-end"}}>
                  <Icon icon="delete" size={20} color={colors.error}/>
                </View>
              </TouchableOpacity>
            ))}
          </>
        ) :(
          <View style={$emptyStyle}>
            <Icon icon="empty" size={200}/>
            <Text style={$emptyText} tx="ManagementScreen.emptyClass"/>
          </View>
        )}
        <Button 
          pressedStyle={{backgroundColor: colors.palette.blue200, opacity: 0.8 }} 
          textStyle={$textButton} 
          tx="ManagementScreen.addClass" 
          style={$buttonStyle}
          onPress={()=>{
            navigation.navigate("CreateClassroom")
            // Toast.show({
            //   type: 'info',
            //   position: 'bottom',
            //   text1: translate("common.sorry"),
            //   text2: "create classroom screen is not ready",
            // });
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