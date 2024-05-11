import { makeAutoObservable } from "mobx"
import {
  Classroom, 
  Attendance, 
  Course,
  Student, 
  Timetable,
  AttendanceSchedule,
} from "app/types/dataTypes"
import AsyncStorage from "@react-native-async-storage/async-storage"

class DataStore {
  classrooms: Classroom[] = [
    { id: "classroom_1", name: "Software Engineering", description: "Class for students in software engineering" },
    { id: "classroom_2", name: "Networks and Security", description: "Class for students in computer networks and security" },
    { id: "classroom_3", name: "Artificial Intelligence", description: "Class for students in artificial intelligence" },
    { id: "classroom_4", name: "Web Development", description: "Class for students in web and mobile development" },
    { id: "classroom_5", name: "Cloud Computing", description: "Class for students in cloud computing" },
  ];

  students: Student[] = [
      { id: "student_1", name: "Alice", gender: "female", photo: undefined, classroomId: "classroom_1" },
      { id: "student_2", name: "Bob", gender: "male", photo: undefined, classroomId: "classroom_1" },
      { id: "student_3", name: "Charlie", gender: "male", photo: undefined, classroomId: "classroom_1" },
      { id: "student_4", name: "Diana", gender: "female", photo: undefined, classroomId: "classroom_1" },
      { id: "student_5", name: "Eva", gender: "female", photo: undefined, classroomId: "classroom_1" },
      { id: "student_6", name: "Frank", gender: "male", photo: undefined, classroomId: "classroom_2" },
      { id: "student_7", name: "Grace", gender: "female", photo: undefined, classroomId: "classroom_2" },
      { id: "student_8", name: "Henry", gender: "male", photo: undefined, classroomId: "classroom_2" },
      { id: "student_9", name: "Ivy", gender: "female", photo: undefined, classroomId: "classroom_2" },
      { id: "student_10", name: "Jack", gender: "male", photo: undefined, classroomId: "classroom_2" },
      { id: "student_11", name: "Kate", gender: "female", photo: undefined, classroomId: "classroom_3" },
      { id: "student_12", name: "Leo", gender: "male", photo: undefined, classroomId: "classroom_3" },
      { id: "student_13", name: "Mia", gender: "female", photo: undefined, classroomId: "classroom_3" },
      { id: "student_14", name: "Noah", gender: "male", photo: undefined, classroomId: "classroom_3" },
      { id: "student_15", name: "Olivia", gender: "female", photo: undefined, classroomId: "classroom_3" },
      { id: "student_16", name: "Peter", gender: "male", photo: undefined, classroomId: "classroom_4" },
      { id: "student_17", name: "Quinn", gender: "female", photo: undefined, classroomId: "classroom_4" },
      { id: "student_18", name: "Ryan", gender: "male", photo: undefined, classroomId: "classroom_4" },
      { id: "student_19", name: "Sophia", gender: "female", photo: undefined, classroomId: "classroom_4" },
      { id: "student_20", name: "Tyler", gender: "male", photo: undefined, classroomId: "classroom_4" },
  ];

  courses: Course[] = [
    { id: "course_1", name: "Algorithmics", credit: 3 },
    { id: "course_2", name: "Database", credit: 4 },
    { id: "course_3", name: "Operating Systems", credit: 3 },
    { id: "course_4", name: "Advanced Programming", credit: 3 },
    { id: "course_5", name: "Data Analysis", credit: 3 },
    { id: "course_6", name: "Mobile Development", credit: 4 },
    { id: "course_7", name: "Computer Networks", credit: 3 },
    { id: "course_8", name: "Artificial Intelligence", credit: 4 },
    { id: "course_9", name: "Cybersecurity", credit: 3 },
    { id: "course_10", name: "Software Engineering", credit: 3 },
    { id: "course_11", name: "Cloud Computing", credit: 4 },
    { id: "course_12", name: "Computer Architecture", credit: 3 },
    { id: "course_13", name: "Web Development", credit: 4 },
    { id: "course_14", name: "Applied Mathematics", credit: 3 },
    { id: "course_15", name: "Programming Languages", credit: 3 },
    { id: "course_16", name: "Software Engineering", credit: 4 },
    { id: "course_17", name: "Social Network Analysis", credit: 3 },
    { id: "course_18", name: "Signal Processing", credit: 3 },
    { id: "course_19", name: "Robotics", credit: 4 },
    { id: "course_20", name: "Emerging Technologies", credit: 3 },
  ];

  timeTables: Timetable[] = [
      {
        id: "timetable_1",
        classroomId: "classroom_1",
        daySchedule: [
          {
            day: "monday",
            coursesSchedule: [
              { id: "schedule_1", courseId: "course_1", startTime: "2023-04-10T08:00:00Z", endTime: "2023-04-10T10:00:00Z" },
              { id: "schedule_2", courseId: "course_5", startTime: "2023-04-10T10:00:00Z", endTime: "2023-04-10T12:00:00Z" },
              { id: "schedule_3", courseId: "course_7", startTime: "2023-04-10T12:30:00Z", endTime: "2023-04-10T14:30:00Z" },
              { id: "schedule_4", courseId: "course_8", startTime: "2023-04-10T15:00:00Z", endTime: "2023-04-10T17:00:00Z" },
              // Ajoutez d'autres cours pour le lundi...
            ],
          },
          {
            day: "tuesday",
            coursesSchedule: [
              { id: "schedule_3", courseId: "course_11", startTime: "2023-04-10T08:00:00Z", endTime: "2023-04-10T10:00:00Z" },
              { id: "schedule_4", courseId: "course_12", startTime: "2023-04-10T10:00:00Z", endTime: "2023-04-10T12:00:00Z" },
              { id: "schedule_5", courseId: "course_14", startTime: "2023-04-10T12:30:00Z", endTime: "2023-04-10T4:30:00Z" },
              // Ajoutez d'autres cours pour le mardi...
            ],
          },
          {
            day: "wednesday",
            coursesSchedule: [
              { id: "schedule_3", courseId: "course_20", startTime: "2023-04-10T08:00:00Z", endTime: "2023-04-10T10:00:00Z" },
              { id: "schedule_4", courseId: "course_6", startTime: "2023-04-10T10:00:00Z", endTime: "2023-04-10T12:00:00Z" },
              { id: "schedule_5", courseId: "course_10", startTime: "2023-04-10T12:30:00Z", endTime: "2023-04-10T14:30:00Z" },
              // Ajoutez d'autres cours pour le mardi...
            ],
          },
          // Ajoutez d'autres jours pour la première classe...
        ],
      },
      {
        id: "timetable_2",
        classroomId: "classroom_2",
        daySchedule: [
          {
            day: "monday",
            coursesSchedule: [
              { id: "schedule_5", courseId: "course_5", startTime: "2023-04-10T08:00:00Z", endTime: "2023-04-10T10:00:00Z" },
              { id: "schedule_6", courseId: "course_6", startTime: "2023-04-10T12:00:00Z", endTime: "2023-04-10T14:00:00Z" },
              // Ajoutez d'autres cours pour le lundi de la deuxième classe...
            ],
          },
          {
            day: "tuesday",
            coursesSchedule: [
              { id: "schedule_7", courseId: "course_7", startTime: "2023-04-10T08:00:00Z", endTime: "2023-04-10T10:00:00Z" },
              { id: "schedule_8", courseId: "course_8", startTime: "2023-04-10T12:00:00Z", endTime: "2023-04-10T14:00:00Z" },
              // Ajoutez d'autres cours pour le mardi de la deuxième classe...
            ],
          },
          {
            day: "thursday",
            coursesSchedule: [
              { id: "schedule_3", courseId: "course_16", startTime: "2023-04-10T08:00:00Z", endTime: "2023-04-10T10:00:00Z" },
              { id: "schedule_4", courseId: "course_19", startTime: "2023-04-10T10:00:00Z", endTime: "2023-04-10T12:00:00Z" },
              { id: "schedule_5", courseId: "course_14", startTime: "2023-04-10T12:30:00Z", endTime: "2023-04-10T14:30:00Z" },
              // Ajoutez d'autres cours pour le mardi...
            ],
          },
          {
            day: "friday",
            coursesSchedule: [
              { id: "schedule_3", courseId: "course_2", startTime: "2023-04-10T08:00:00Z", endTime: "2023-04-10T10:00:00Z" },
              { id: "schedule_4", courseId: "course_5", startTime: "2023-04-10T10:00:00Z", endTime: "2023-04-10T12:00:00Z" },
              { id: "schedule_5", courseId: "course_17", startTime: "2023-04-10T12:30:00Z", endTime: "2023-04-10T14:30:00Z" },
              // Ajoutez d'autres cours pour le mardi...
            ],
          },
          {
            day: "saturday",
            coursesSchedule: [
              { id: "schedule_3", courseId: "course_2", startTime: "2023-04-10T08:00:00Z", endTime: "2023-04-10T10:00:00Z" },
              { id: "schedule_4", courseId: "course_5", startTime: "2023-04-10T10:00:00Z", endTime: "2023-04-10T12:00:00Z" },
              { id: "schedule_5", courseId: "course_17", startTime: "2023-04-10T12:30:00Z", endTime: "2023-04-10T14:30:00Z" },
              // Ajoutez d'autres cours pour le mardi...
            ],
          },
          // Ajoutez d'autres jours pour la deuxième classe...
        ],
      },
      // Ajoutez d'autres emplois de temps pour d'autres salles de classe si nécessaire...
  ];

  attendances: Attendance[] = [];
 
  constructor() {
    makeAutoObservable(this);
  }
 
  // Exemple de méthode pour ajouter une salle de classe
  // addClassroom(classroom: Classroom) {
  //   this.classrooms.push(classroom);
  // }
  async addClassroom (classroom: Classroom) {
    try {
       const classroomsData = await AsyncStorage.getItem('@classrooms');
       const classrooms = classroomsData ? JSON.parse(classroomsData) : [];
       classrooms.push(classroom);
       await AsyncStorage.setItem('@classrooms', JSON.stringify(classrooms));
    } catch (error) {
       console.error('Erreur lors de l\'ajout de la salle de classe :', error);
    }
   };
   
   // Récupérer toutes les salles de classe
  async getClassrooms (): Promise<Classroom[]> {
  try {
      const classroomsData = await AsyncStorage.getItem('@classrooms');
      return classroomsData ? JSON.parse(classroomsData) : [];
  } catch (error) {
      console.error('Erreur lors de la récupération des salles de classe :', error);
      return [];
  }
  };

  // addCourse(course: Course) {
  //  this.courses.push(course);
  // }
  async addStudent (student: Student)  {
    try {
       const studentsData = await AsyncStorage.getItem('@students');
       const students = studentsData ? JSON.parse(studentsData) : [];
       students.push(student);
       await AsyncStorage.setItem('@students', JSON.stringify(students));
    } catch (error) {
       console.error('Erreur lors de l\'ajout de l\'étudiant :', error);
    }
   };
   
   // Récupérer tous les étudiants
  async getStudents (): Promise<Student[]> {
  try {
      const studentsData = await AsyncStorage.getItem('@students');
      return studentsData ? JSON.parse(studentsData) : [];
  } catch (error) {
      console.error('Erreur lors de la récupération des étudiants :', error);
      return [];
  }
  };

  // addStudent(student: Student) {
  //  this.students.push(student);
  // }
  async addCourse (course: Course) {
    try {
       const coursesData = await AsyncStorage.getItem('@courses');
       const courses = coursesData ? JSON.parse(coursesData) : [];
       courses.push(course);
       await AsyncStorage.setItem('@courses', JSON.stringify(courses));
    } catch (error) {
       console.error('Erreur lors de l\'ajout du cours :', error);
    }
   };
   
   // Récupérer tous les cours
  async getCourses (): Promise<Course[]> {
  try {
      const coursesData = await AsyncStorage.getItem('@courses');
      return coursesData ? JSON.parse(coursesData) : [];
  } catch (error) {
      console.error('Erreur lors de la récupération des cours :', error);
      return [];
  }
  };
   

//   addCourseSchedule(courseSchedule: CourseSchedule) {
//    this.courseSchedules.push(courseSchedule);
//   }

//   addDaySchedule(daySchedule: DaySchedule) {
//    this.daySchedules.push(daySchedule);
//   }

  // addTimetable(timetable: Timetable) {
  //  this.timeTables.push(timetable);
  // }
  async addTimetable (timetable: Timetable) {
    try {
      const timeTablesData = await AsyncStorage.getItem('@timeTables');
      const timeTables = timeTablesData ? JSON.parse(timeTablesData) : [];
      timeTables.push(timetable);
      await AsyncStorage.setItem('@timeTables', JSON.stringify(timeTables));
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'emploi de temps :', error);
    }
  };
   
   // Récupérer tous les emplois de temps
  async getTimeTables (): Promise<Timetable[]> {
    try {
      const timeTablesData = await AsyncStorage.getItem('@timeTables');
      return timeTablesData ? JSON.parse(timeTablesData) : [];
    } catch (error) {
      console.error('Erreur lors de la récupération des emplois de temps :', error);
      return [];
    }
  };

  // addAttendanceSchedule(classroomId: string, date: string, attendanceSchedule: AttendanceSchedule) {
  //   const attendance = this.attendances.find(item => item.classroomId === classroomId);
  //   if (attendance) {
  //       attendance.classroomCall.find(att=> att.date === date)?.courses.push(attendanceSchedule);
  //   }
  // }
  async addAttendanceSchedule(classroomId: string, date: string, attendanceSchedule: AttendanceSchedule) {
    try {
       // Récupérer toutes les présences
       const attendancesData = await AsyncStorage.getItem('@attendances');
       const attendances = attendancesData ? JSON.parse(attendancesData) : [];
   
       // Trouver l'attendance correspondant à classroomId
       const attendanceIndex = attendances.findIndex((item: Attendance) => item.classroomId === classroomId);
       if (attendanceIndex !== -1) {
         // Trouver l'appel de classe correspondant à la date
         const classroomCallIndex = attendances[attendanceIndex].classroomCall.findIndex((call) => call.date === date);
         if (classroomCallIndex !== -1) {
           // Ajouter le attendanceSchedule à la liste des cours de cet appel de classe
           attendances[attendanceIndex].classroomCall[classroomCallIndex].courses.push(attendanceSchedule);
   
           // Stocker les attendances mises à jour dans AsyncStorage
           await AsyncStorage.setItem('@attendances', JSON.stringify(attendances));
           console.error('Aucun appel de classe trouvé pour la date spécifiée.');
         } else {
           console.error('Aucun appel de classe trouvé pour la date spécifiée.');
         }
       } else {
         console.error('Aucune présence trouvée pour le classroomId spécifié.');
       }
    } catch (error) {
       console.error('Erreur lors de l\'ajout du schedule de présence :', error);
    }
   }

  // addAttendance(attendance: Attendance) {
  //   this.attendances.push(attendance);
  // }
  async addAttendance (attendance: Attendance) {
    try {
       const attendancesData = await AsyncStorage.getItem('@attendances');
       const attendances = attendancesData ? JSON.parse(attendancesData) : [];
       attendances.push(attendance);
       await AsyncStorage.setItem('@attendances', JSON.stringify(attendances));
    } catch (error) {
       console.error('Erreur lors de l\'ajout de la présence :', error);
    }
   };
   
   // Récupérer toutes les présences
   async getAttendances (): Promise<Attendance[]> {
    try {
       const attendancesData = await AsyncStorage.getItem('@attendances');
       return attendancesData ? JSON.parse(attendancesData) : [];
    } catch (error) {
       console.error('Erreur lors de la récupération des présences :', error);
       return [];
    }
   };
  // Ajoutez d'autres méthodes pour manipuler les données selon les besoins de votre application
 }
 
 export default new DataStore();