export interface Classroom {
  id: string,
  name: string,
  description?: string
}

export interface Student {
  id: string
  name: string,
  gender: "male" | "female",
  photo: string | undefined,
  classroomId: string,
}

export interface Course {
  id: string,
  name: string,
  credit: number,
}
export interface DaySchedule  {
  day: "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday",
  coursesSchedule: {
    id: string
    courseId:string,
    startTime: string,
    endTime: string,
  }[],
}
export interface CourseSchedule {
  id: string
  courseId:string,
  startTime: string,
  endTime: string,
}

export interface Timetable {
  id: string,
  classroomId: string,
  daySchedule: DaySchedule[]
}

// export interface DaySchedule {
//   id: string,
//   day: "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday",
//   courses: string[], // prend les ids des coursesSchedule
// } 

// export interface Timetable {
//   id: string,
//   classroomId: string,
//   timeTable: string[], // prend les id des CourseSchedule
// }
export interface AttendanceSchedule {
  courseScheduleId: string,
  courseId: string,
  attendance: {
    studentId:string, 
    call: "present" | "absent"
  }[]
}

export interface Attendance {
  id: string,
  classroomId: string,
  classroomCall: {
    date: string,
    day: "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday",
    courses: {
      courseScheduleId: string,
      courseId: string,
      attendance: {
        studentId:string, 
        call: "present" | "absent"
      }[]
    }[]
  }[]
}