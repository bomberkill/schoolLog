/* eslint-disable react-native/no-inline-styles */
import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { StatusBar, TextStyle, View, ViewStyle } from "react-native"
import { ManagementNavigatorParamList } from "app/navigators"
import { Button, Screen, TextField } from "app/components"
import { Appbar } from "react-native-paper"
import { colors, spacing, typography } from "app/theme"
import { translate } from "app/i18n"
import * as Yup from "yup"
import { Formik } from "formik"
import dataStore from "app/data/data"
import Toast from "react-native-toast-message"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface CreateClassroomScreenProps extends NativeStackScreenProps<ManagementNavigatorParamList,"CreateClassroom"> {}

export const CreateClassroomScreen: FC<CreateClassroomScreenProps> = observer(function CreateClassroomScreen({navigation}) {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
 const validation = Yup.object().shape({
    name: Yup.string().required(translate("CreateClassroom.validation.name")),
    description: Yup.string(),
 })
  const initialValues = {
    name: '',
    description: '',
  };

  return (
    <Screen style={$root} preset="scroll">
      <StatusBar barStyle="dark-content"/>
      <Appbar.Header>
        <Appbar.BackAction color={colors.palette.blue200} onPress={() => navigation.goBack()} />
        <Appbar.Content title={translate("ManagementScreen.addClass")} color={colors.palette.blue200} titleStyle={{fontFamily: typography.primary.semiBold}} />
      </Appbar.Header>
      <Formik
        initialValues={initialValues}
        validationSchema={validation}
        onSubmit={async (values, {resetForm}) => {
          const newId = `cl${String(dataStore.classrooms.length + 1).padStart(3, '0')}`
          const newClassroom = {
            id: newId, // Générer un nouvel ID
            ...values,
          };
          await dataStore.addClassroom(newClassroom);
          console.log('Classroom ajouté :', newClassroom);
          resetForm()
          navigation.navigate("ClassroomList");
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
            labelTx="CreateClassroom.className"
            onChangeText={handleChange('name')}
            onBlur={handleBlur('name')}
            value={values.name}
            error={touched.name && errors.name ? errors.name : undefined}
          />
          <TextField
            containerStyle={$inputStyle}
            numberOfLines={4}
            labelTx="CreateClassroom.classDescription"
            placeholderTx="CreateClassroom.descriptionPlaceholder"
            multiline
            onChangeText={handleChange('description')}
            onBlur={handleBlur('description')}
            value={values.description}
            error={touched.description && errors.description ? errors.description : undefined}
          />
          <Button
            pressedStyle={{backgroundColor: colors.palette.blue200, opacity: 0.8 }}
            textStyle={$textButton}
            tx="common.saveButton"
            style={$buttonStyle}
            onPress={()=>handleSubmit()}
          />
        </View>
        )}
      </Formik>
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}
const $inputStyle: ViewStyle = {
  marginVertical: spacing.xs,
 }
 const $container: ViewStyle = {
  paddingHorizontal: spacing.md,
  paddingTop: spacing.lg,
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