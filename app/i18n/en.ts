const en = {
  common: {
    ok: "OK!",
    cancel: "Cancel",
    back: "Back",
    home: "Home",
    info: "info",
    saveButton: "Save",
    error: "Error",
    success: "Success",
    sorry: "Sorry",
    attendance: "Attendance",
    attendanceBottom: "Call",
  },
  welcomeScreen: {
    postscript:
      "psst  — This probably isn't what your app looks like. (Unless your designer handed you these screens, and in that case, ship it!)",
    readyForLaunch: "Your app, almost ready for launch!",
    exciting: "(ohh, this is exciting!)",
    textButton: "Next",
    description: "SchoolLog is an application that facilitates the management of academic operations and allows stored data to analyze the evolution of teaching",
    welcomeMessage: "Hello there !",
  },
  errorScreen: {
    title: "Something went wrong!",
    friendlySubtitle:
      "This is the screen that your users will see in production when an error is thrown. You'll want to customize this message (located in `app/i18n/en.ts`) and probably the layout as well (`app/screens/ErrorScreen`). If you want to remove this entirely, check `app/app.tsx` for the <ErrorBoundary> component.",
    reset: "RESET APP",
  },
  emptyStateComponent: {
    generic: {
      heading: "So empty... so sad",
      content: "No data found yet. Try clicking the button to refresh or reload the app.",
      button: "Let's try this again",
    },
  },
  ManagementScreen: {
    addClass: "Add classroom",
    addCourse: "Add course",
    addStudent: "Add student",
    courseLabel: "Courses",
    classroomLabel: "Classrooms",
    studentLabel: "Students",
    managementText: "Management",
    classroomList: "Classrooms list",
    studentList: "Students list",
    courseList: "Courses List",
    emptyClass: "No class found",
    emptyStud: "no student found",
    emptyCourse: "no course found",
  },
  CreateClassroom: {
    className: "Classroom name",
    classDescription: "Classroom description",
    descriptionPlaceholder: "Your description",
    successMessage: "Success record",
    validation: {
      name: "Classroom name is required",
    }
  },
  CreateCourse: {
    courseCredit: "Credit",
    credit: "Number of credit: ",
    courseName: "Name",
    validation: {
      name: "Course name is required",
      credit: "Credit number is required",
    },
  },
  CreateStudent: {
    studentName: "Name",
    studentClassroom: "Classroom",
    studentGender: "Gender :",
    studentphoto: "Photo",
    errorNoClassroom: "You must have at least one classroom to add a student",
    male: "Male",
    female: "Female",
    dropdownPlaceholder: "Select classroom",
    validation: {
      name: "Student name is required",
      sex: "Student gender is required",
      photo: "Student image is required",
      classroom: "Student classroom is required",
    }
  },
  CreateTimetable: {
    title: "Create a timetable",
    errorNoCourse: "You must at least on course to add timetable",
    errorNoSchedule: "You must schedule at least on day of a week",
    delProgram: "Delete this program",
    addProgram: "Add a program",
    saveProgram: "Save program",
    savedProgram: "Program saved and unmodifiable",
    slotOccupied: "This time slot is already occupied",
    existingTimetable: "This classroom already have a timetable",
    dayOfWeek: {
      monday: "Monday",
      tuesday: "Tuesday",
      wednesday: "Wednesday",
      thursday: "Thursday",
      friday: "Friday",
      saturday: "Saturday",
      sunday: "Sunday",
    },
    validation: {
      course: "Program is required",
      startTime: "Start is time required",
      endTime: "End time is required",
      isAfter: "End time must be greater than start time",
    },
    form: {
      startTime: "Start time",
      endTime: "End time",
      course: "Program",
      title: "Courses schedule",
    }
  },
  home: {
    ongoing: "ongoing",
    noTimetable: "No timetable found",
    noSchedule: "No schedule found",
    attendanceUnAuth: "Attendance is only authorized on ongoing schedules",
    callError: "You must call all students",
    callDone: "Attendance was already done for this schedule",
  },
  attendanceList: {
    headerText: "Calls history",
    noHistory: "Empty history",
    course: "Course:",
    classroom: "classroom:",
    selClass: "Select classroom:",
    selDay: "Select the day:",
    selDate: "Select the date:",
  }
}

export default en
export type Translations = typeof en
