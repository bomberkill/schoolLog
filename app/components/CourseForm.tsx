import * as React from "react"
import { StyleProp, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, spacing, typography } from "app/theme"
import { Text } from "app/components/Text"
import { Formik } from 'formik';
import * as Yup from 'yup';
import DateTimePicker from '@react-native-community/datetimepicker';
import I18n from "i18n-js"
import { TextField } from "./TextField"
import { translate } from "app/i18n"
import { Course } from "app/types/dataTypes"
import { Dropdown } from "./Dropdown"


export interface CourseFormProps {
  /**
   * An optional style override useful for padding & margin.
   *
   */
  courses: Course[]
  onDelete: (formData: any) => void;
  style?: StyleProp<ViewStyle>
  onFormSubmit: (formData: any) => void;
}

/**
 * Describe your component here
 */
export const CourseForm = observer(function CourseForm(props: CourseFormProps) {
  const { style, courses, onDelete, onFormSubmit } = props
  const $styles = [$container, style]

  const [showStartPicker, setShowStartPicker] = React.useState(false);
  const [showEndPicker, setShowEndPicker] = React.useState(false);
  const [isEditable, setIsEditable] = React.useState(true);
  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date())

 const [courseInitialVal, setCourseInitialVal] = React.useState({
  courseId: '',
  startTime: null,
  endTime: null
})

const courseValidation = Yup.object().shape({
  courseId: Yup.string()
       .required(translate("CreateTimetable.validation.course")),
  startTime: Yup.date()
     .required(translate("CreateTimetable.validation.startTime")),
  endTime: Yup.date()
     .required(translate("CreateTimetable.validation.endTime"))
     .min(Yup.ref('startTime'), translate("CreateTimetable.validation.isAfter")),
 });

 const onChangeStart = (event, selectedDate) => {
  const currentDate = selectedDate || startDate;
  setShowStartPicker(false);
  setStartDate(currentDate);
};

const onChangeEnd = (event, selectedDate) => {
  const currentDate = selectedDate || endDate;
  setShowEndPicker(false);
  setEndDate(currentDate);
};

  return (
    <View style={$styles}>
      <Formik 
        initialValues={courseInitialVal}
        validationSchema={courseValidation}
        onSubmit={(values)=> {
          setCourseInitialVal(values)
          onFormSubmit(values)
          console.log("courseForm values",values)
          setIsEditable(false)
        }}
      >
        {({handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue})=> (

          <View style={{opacity: isEditable ? 1 : 0.7}}>
            <Dropdown
              items={courses.map(course => ({ label: course.name, value: course.id }))}
              labelTx={translate("CreateTimetable.form.course")}
              value={values.courseId}
              onChangeText={handleChange('courseId')}
              error={touched.courseId && errors.courseId}
              onBlur={handleBlur('courseId')}
              disabled={!isEditable}
            />
              <TouchableOpacity disabled={!isEditable} activeOpacity={0.7} onPress={()=> setShowStartPicker(true)}>
                {showStartPicker && (
                  <DateTimePicker
                    value={startDate}
                    mode="time"
                    display="spinner"
                    onChange={(event, selectedDate) =>{
                      onChangeStart(event, selectedDate)
                      setFieldValue("startTime", selectedDate)
                    }}
                  />
                )}
                <TextField
                  labelTx="CreateTimetable.form.startTime"
                  editable={false}
                  value={ values.startTime?.toLocaleTimeString(I18n.currentLocale(), {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  })}
                  onBlur={handleBlur('startTime')}
                  error={touched.startTime && errors.startTime }
                  onChangeText={handleChange('startTime')}
                  placeholder= "HH : MM"
                />
              </TouchableOpacity>
              <TouchableOpacity disabled={!isEditable} activeOpacity={0.7} onPress={()=> setShowEndPicker(true)}>
                {showEndPicker && (
                  <DateTimePicker
                    value={endDate}
                    mode="time"
                    display="spinner"
                    onChange={(event, selectedDate) =>{
                      onChangeEnd(event, selectedDate)
                      setFieldValue("endTime", selectedDate)
                    }}
                    disabled={isEditable}
                  />
                )}
                <TextField
                  labelTx="CreateTimetable.form.endTime"
                  editable={false}
                  value={values.endTime?.toLocaleTimeString(I18n.currentLocale(), {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  })}
                  onBlur={handleBlur('endTime')}
                  // error={touched.endTime && errors.endTime }
                  onChangeText={handleChange('endTime')}
                  placeholder= "HH : MM"
                  error={touched.endTime && errors.endTime }
                />
                {/* {touched.endTime && errors.endTime && <Text style={{ color: 'red' }}>{errors.endTime}</Text>} */}
              </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7} style={$saveView} onPress={()=>{
              handleSubmit()
              console.log("button save courseForm")
              }}>
              <Text style={[$text, { color: colors.palette.neutral100}]}>{isEditable ? translate("CreateTimetable.saveProgram"): translate("CreateTimetable.savedProgram")}</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
      <TouchableOpacity activeOpacity={0.7} style={$delView} onPress={() =>onDelete(courseInitialVal)}>
        <Text style={$text}>{translate("CreateTimetable.delProgram")}</Text>
      </TouchableOpacity>
    </View>
  )
})

const $container: ViewStyle = {
  justifyContent: "center",
}

const $text: TextStyle = {
  fontFamily: typography.primary.semiBold,
  color: colors.palette.angry500,
  textAlign: "center",
}
const $delView:ViewStyle = {
  marginVertical: spacing.xs,
  // borderColor: colors.palette.overlay20,
  // borderWidth: 0.5,
  height: 60,
  alignItems: "center",
  justifyContent: "center",
  width: "50%",
  alignSelf: "flex-end",
  borderRadius: 5,
  backgroundColor: colors.palette.angry100
}
const $saveView:ViewStyle = {
  marginVertical: spacing.xs,
  // borderColor: colors.palette.overlay20,
  // borderWidth: 0.5,
  height: 60,
  alignItems: "center",
  justifyContent: "center",
  width: "50%",
  alignSelf: "flex-end",
  borderRadius: 5,
  backgroundColor: colors.palette.success
}
