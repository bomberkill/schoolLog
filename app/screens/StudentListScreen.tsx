/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { Image, ImageStyle, ScrollView, StatusBar, TextStyle, View, ViewStyle } from 'react-native';
import { ManagementNavigatorParamList } from 'app/navigators';
import { Button, Icon, Text } from 'app/components';
import { colors, spacing, typography } from 'app/theme';
import { translate } from 'app/i18n';
import dataStore from 'app/data/data'; // Assurez-vous que le chemin est correct
import { Appbar } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Student } from 'app/types/dataTypes';

interface StudentListScreenProps extends NativeStackScreenProps<ManagementNavigatorParamList,"StudentList"> {}

export const StudentListScreen: React.FC<StudentListScreenProps> = ({ navigation }) => {
  const [students, setStudents] = useState<Student[]>([]);
  useEffect(() => {
    const loadStudents = async () => {
      const loadedStudents = await dataStore.getStudents();
      setStudents(loadedStudents);
    };
    loadStudents()
  }, [students]);
 return (
    <View style={$root}>
      <StatusBar barStyle="dark-content"/>
      <Appbar.Header>
        <Appbar.BackAction color={colors.palette.blue200} onPress={() => navigation.goBack()} />
        <Appbar.Content title={translate("ManagementScreen.studentList")} color={colors.palette.blue200} titleStyle={{fontFamily: typography.primary.semiBold}} />
      </Appbar.Header>
      <ScrollView style={$container}>
        {students && students.length > 0 ? (
          <>
            {students.map((student, index) => {
              const image = student.photo === undefined ? student.gender === "male" ? require("../../assets/images/boy1.jpg") :
              require("../../assets/images/girl1.jpg") : {uri: student.photo}
              return (
                <View style={$itemStyle} key={index}>
                  <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                    <Image 
                      source={image} 
                      style={$studentPhoto}
                    />
                    <View>
                    <Text style={$nameStyle} text={student.name}/>
                    <Text style={$descriptionStyle} text={translate(`CreateStudent.${student.gender}`)}/>
                    </View>
                  </View>
                  <Icon icon="delete" size={20} color={colors.error}/>
                </View>
              )
            })}
          </>
        ) : (
          <View style={$emptyStyle}>
            <Icon icon="empty" size={200}/>
            <Text style={$emptyText} tx="ManagementScreen.emptyStud"/>
          </View>
        )}
        <Button 
          pressedStyle={{backgroundColor: colors.palette.blue200, opacity: 0.8 }} 
          textStyle={$textButton} 
          tx="ManagementScreen.addStudent" 
          style={$buttonStyle}
          onPress={()=>navigation.navigate("CreateStudent")}
        />
      </ScrollView>
    </View>
 );
};

const $root: ViewStyle = {
 flex: 1,
 backgroundColor: colors.background,
};

const $container: ViewStyle = {
 paddingHorizontal: spacing.md,
};

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
};

const $descriptionStyle: TextStyle = {
 fontSize: spacing.sm,
};

const $nameStyle: TextStyle = {
 fontSize: spacing.md,
 fontFamily: typography.primary.semiBold,
};

const $emptyStyle:ViewStyle = {
 alignItems: "center",
 marginVertical: spacing.lg,
};

const $emptyText:TextStyle = {
 fontSize: spacing.lg,
 fontWeight: "500",
 marginVertical: spacing.xs,
 fontFamily: typography.primary.semiBold,
};

const $buttonStyle: ViewStyle = {
 backgroundColor: colors.palette.blue200,
 borderRadius: spacing.xxs,
 padding: spacing.xxs,
 marginBottom: spacing.sm,
 marginTop: spacing.xxxl,
};

const $textButton:TextStyle = {
 color: colors.palette.neutral100,
 fontSize: spacing.md,
 fontWeight: "bold",
};
const $studentPhoto: ImageStyle = {
  width: 50,
  height: 50,
  borderRadius: 25,
  marginRight: spacing.sm,
};