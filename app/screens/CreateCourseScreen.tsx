/* eslint-disable react-native/no-inline-styles */
import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { TextStyle, View, ViewStyle } from "react-native"
import { ManagementNavigatorParamList } from "app/navigators"
import { Button, Screen, TextField } from "app/components"
import dataStore from "app/data/data"
import { translate } from "app/i18n"
import * as Yup from "yup"
import Toast from "react-native-toast-message"
import { Appbar } from "react-native-paper"
import { colors, spacing, typography } from "app/theme"
import { Formik } from "formik"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { Course } from "app/types/dataTypes"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface CreateCourseScreenProps extends NativeStackScreenProps<ManagementNavigatorParamList,"CreateCourse"> {}

export const CreateCourseScreen: FC<CreateCourseScreenProps> = observer(function CreateCourseScreen({navigation}) {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
//   const handleSubmit = (values, { resetForm }) => {
//     const newId = `cr${String(dataStore.courses.length + 1).padStart(3, '0')}`;
//     const newCourse = {
//       id: newId,
//       ...values,
//     };
//     dataStore.addClass(newCourse);
//     console.log('Course ajouté :', newCourse);
//     resetForm();
//     navigation.navigate("CourseList");
//     Toast.show({
//       type: 'success',
//       position: 'bottom',
//       text1: translate("common.success"),
//       text2: translate("CreateClassroom.successMessage"),
//     });
//  };

 const validation = Yup.object().shape({
    name: Yup.string().required(translate("CreateCourse.validation.name")),
    credit: Yup.number().required(translate("CreateCourse.validation.credit")),
 });

 const initialValues = {
    name: '',
    credit: '',
 };
  return (
    <Screen statusBarStyle="dark" style={$root} preset="scroll">
      <Appbar.Header>
        <Appbar.BackAction color={colors.palette.blue200} onPress={() => navigation.goBack()} />
        <Appbar.Content title={translate("ManagementScreen.addCourse")} color={colors.palette.blue200} titleStyle={{ fontFamily: typography.primary.semiBold }} />
      </Appbar.Header>
      <Formik
        initialValues={initialValues}
        validationSchema={validation}
        onSubmit={(values, { resetForm }) => {
          const newId = `cr${String(dataStore.courses.length + 1).padStart(3, '0')}`;
          const newCourse: Course = {
            id: newId,
            credit: parseInt(values.credit),
            name: values.name
          };
          dataStore.addCourse(newCourse);
          console.log('Course ajouté :', newCourse);
          resetForm();
          navigation.navigate("CourseList");
          Toast.show({
            type: 'success',
            position: 'bottom',
            text1: translate("common.success"),
            text2: translate("CreateClassroom.successMessage"),
          });
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View style={$container}>
            <TextField
              containerStyle={$inputStyle}
              labelTx="CreateCourse.courseName"
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              value={values.name}
              error={touched.name && errors.name ? errors.name : undefined}
            />
            <TextField
              containerStyle={$inputStyle}
              keyboardType="numeric"
              labelTx="CreateCourse.courseCredit"
              onChangeText={handleChange('credit')}
              onBlur={handleBlur('credit')}
              value={values.credit}
              error={touched.credit && errors.credit ? errors.credit : undefined} 
            />
            <Button
              pressedStyle={{ backgroundColor: colors.palette.blue200, opacity: 0.8 }}
              textStyle={$textButton}
              tx="common.saveButton"
              style={$buttonStyle}
              onPress={() => handleSubmit()}
            />
          </View>
        )}
      </Formik>
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
 };
 
 const $inputStyle: ViewStyle = {
  marginVertical: spacing.xs,
 };
 
 const $container: ViewStyle = {
  paddingHorizontal: spacing.md,
  paddingTop: spacing.lg,
 };
 
 const $buttonStyle: ViewStyle = {
  backgroundColor: colors.palette.blue200,
  borderRadius: spacing.xxs,
  padding: spacing.xxs,
  marginBottom: spacing.sm,
  marginTop: spacing.xxxl,
 };
 
 const $textButton: TextStyle = {
  color: colors.palette.neutral100,
  fontSize: spacing.md,
  fontWeight: "bold",
 };
 
