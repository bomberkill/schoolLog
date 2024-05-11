/* eslint-disable react-native/no-inline-styles */
import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { TextStyle, View, ViewStyle, Image, StatusBar, ScrollView } from "react-native"
import { ManagementNavigatorParamList } from "app/navigators"
import { Button, Dropdown, Text, TextField } from "app/components"
import dataStore from "app/data/data"
import { translate } from "app/i18n"
import Toast from "react-native-toast-message"
import * as Yup from "yup"
import { spacing, colors, typography } from "app/theme"
import { Formik, FormikHelpers} from "formik"
import { Appbar, RadioButton } from "react-native-paper"
import { MediaType, launchImageLibrary } from 'react-native-image-picker'
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { Classroom, Student } from "app/types/dataTypes"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface CreateStudentScreenProps extends NativeStackScreenProps<ManagementNavigatorParamList,"CreateStudent"> {}

export const CreateStudentScreen: FC<CreateStudentScreenProps> = observer(function CreateStudentScreen({navigation}) {

  const [classrooms, setClassrooms] = useState<Classroom[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);



  useEffect(() => {
    const loadClassrooms = async () => {
      const loadedClassrooms = await dataStore.getClassrooms();
      if (loadedClassrooms.length <= 0) {
        navigation.goBack()
        Toast.show({
          type: 'info',
          position: 'bottom',
          text1: translate("common.error"),
          text2: translate("CreateStudent.errorNoClassroom"),
        });
       }else {
         setClassrooms(loadedClassrooms);
       }
    };
    loadClassrooms()
  }, []);
 
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()

 const validation = Yup.object().shape({
    name: Yup.string().required(translate("CreateStudent.validation.name")),
    gender: Yup.string().required(translate("CreateStudent.validation.sex")),
    photo: Yup.mixed().required(translate("CreateStudent.validation.photo")),
    classroomId: Yup.string().required(translate("CreateStudent.validation.classroom")),
 });

 const initialValues = {
    name: '',
    gender: '',
    photo: undefined,
    classroomId: '',
 };

 const handleImagePicker = (setFieldValue: FormikHelpers<Student>['setFieldValue']) => {
  const options = {
     mediaType: "photo" as MediaType,
     includeBase64: false,
     maxHeight: 2000,
     maxWidth: 2000,
  };
 
  launchImageLibrary(options, (response) => {
     if (response.didCancel) {
       console.log('User cancelled image picker');
     } else if (response.errorCode) {
       console.log('Image picker error: ', response.errorCode);
     } else {
       setSelectedImage(response.assets?.[0]?.uri);
       console.log("uri", response.assets?.[0]?.uri)
       setFieldValue("photo", response.assets?.[0]?.uri)
     }
  });
 };
 

  return (
    <View style={$root}>
      <StatusBar barStyle="dark-content"/>
      <Appbar.Header>
        <Appbar.BackAction color={colors.palette.blue200} onPress={() => navigation.navigate("Management")} />
        <Appbar.Content title={translate("ManagementScreen.addStudent")} color={colors.palette.blue200} titleStyle={{ fontFamily: typography.primary.semiBold }} />
      </Appbar.Header>
      <ScrollView>
        <Formik
          initialValues={initialValues}
          validationSchema={validation}
          onSubmit={async (values, { resetForm }) => {
            console.log('submit button')
            const newId = `st${String(dataStore.courses.length + 1).padStart(3, '0')}`;
            const newStudent: Student = {
              id: newId, // Générer un nouvel ID
              gender: values.gender as "male" | "female",
              classroomId: values.classroomId,
              name: values.name,
              photo: values.photo
            };
            await dataStore.addStudent(newStudent);
            console.log('Étudiant ajouté :', newStudent);
            resetForm();
            navigation.navigate("StudentList");
            Toast.show({
              type: 'success',
              position: 'bottom',
              text1: translate("common.success"),
              text2: translate("CreateClassroom.successMessage"),
            });
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
            <View style={$viewContainer}>
              <TextField
                containerStyle={$inputStyle}
                labelTx="CreateStudent.studentName"
                onChangeText={handleChange('name')}
                value={values.name}
                onBlur={handleBlur('name')}
                error={touched.name && errors.name ? errors.name : undefined}
              />

              <Dropdown
                // containerStyle={$inputStyle}
                labelTx={translate("CreateStudent.studentClassroom")}
                items={classrooms.map(classroom => ({ label: classroom.name, value: classroom.id }))}
                onChangeText={handleChange('classroomId')}
                onBlur={()=>handleBlur('classroomId')}
                value={values.classroomId}
                error={touched.classroomId && errors.classroomId ? errors.classroomId : undefined}
              />
              <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: spacing.xs }}>
                <Text style={{fontFamily: typography.primary.semiBold}}>{translate("CreateStudent.studentGender")}</Text>
                <RadioButton.Group
                  onValueChange={(newValue) => setFieldValue('gender', newValue)}
                  value={values.gender}
                >
                  <View style={{ flexDirection: 'row' }}>
                  <RadioButton.Item   label={translate("CreateStudent.male")} value="male" />
                  <RadioButton.Item label={translate("CreateStudent.female")} value="female" />
                  </View>
                </RadioButton.Group>
              </View>
                {errors.gender && touched.gender && <Text style={[$errorText, {marginTop: - spacing.lg,}]}>{errors.gender}</Text>}
              {/* <TouchableOpacity style={{ marginVertical: spacing.xs }} onPress={handleImagePicker}>
                <Text>{translate("CreateStudent.studentphoto")}</Text>
                {image !== null ? 
                  <Image source={image} style={{ width: 100, height: 100 }} /> 
                : <View style={{ width: 100, height: 100, backgroundColor: colors.palette.overlay50 }}>
                    <Text>Aucune photo chargée</Text>
                  </View>
                }
              </TouchableOpacity> */}
              <Button style={{marginTop: spacing.lg}} text="Choisir une photo" onPress={() =>handleImagePicker(setFieldValue)} />
              {selectedImage && (
                  <View style={{marginTop: spacing.md}}>
                    <Image source={{ uri: selectedImage }} style={{ borderRadius: spacing.sm, width: "100%", height: 200 }} />
                  </View>
              )}
              {errors.photo && touched.photo && <Text style={$errorText}>{errors.photo}</Text>}

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
      </ScrollView>
    </View>
  )
})

const $root: ViewStyle = {
  flex: 1,
  backgroundColor: colors.background,
}
 
 const $inputStyle: ViewStyle = {
  marginVertical: spacing.xs,
 };
 
 const $viewContainer: ViewStyle = {
  paddingHorizontal: spacing.md,
  // paddingTop: spacing.lg,
 };
 
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
 const $errorText:TextStyle = {
  color: 'red',
  fontFamily: typography.primary.semiBold,
}