import { makeAutoObservable } from "mobx"
import {
  Classroom, 
  Attendance, 
  Course,
  Student, 
  Timetable,
  AttendanceSchedule,
} from "app/types/dataTypes"

class DataStore {
   classrooms: Classroom[] = [
      { id: "classroom_1", name: "Ingénierie Logicielle", description: "Classe pour les étudiants en génie logiciel" },
      { id: "classroom_2", name: "Réseaux et Sécurité", description: "Classe pour les étudiants en réseaux et sécurité informatique" },
      { id: "classroom_3", name: "Intelligence Artificielle", description: "Classe pour les étudiants en intelligence artificielle" },
      { id: "classroom_4", name: "Développement Web", description: "Classe pour les étudiants en développement web et mobile" },
      { id: "classroom_5", name: "Cloud Computing", description: "Classe pour les étudiants en cloud computing" },
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
      { id: "course_1", name: "Algorithmique", credit: 3 },
      { id: "course_2", name: "Base de données", credit: 4 },
      { id: "course_3", name: "Systèmes d'exploitation", credit: 3 },
      { id: "course_4", name: "Programmation avancée", credit: 3 },
      { id: "course_5", name: "Analyse de données", credit: 3 },
      { id: "course_6", name: "Développement mobile", credit: 4 },
      { id: "course_7", name: "Réseaux informatiques", credit: 3 },
      { id: "course_8", name: "Intelligence artificielle", credit: 4 },
      { id: "course_9", name: "Cybersécurité", credit: 3 },
      { id: "course_10", name: "Ingénierie logicielle", credit: 3 },
      { id: "course_11", name: "Cloud computing", credit: 4 },
      { id: "course_12", name: "Architecture des ordinateurs", credit: 3 },
      { id: "course_13", name: "Développement web", credit: 4 },
      { id: "course_14", name: "Mathématiques appliquées", credit: 3 },
      { id: "course_15", name: "Langages de programmation", credit: 3 },
      { id: "course_16", name: "Génie logiciel", credit: 4 },
      { id: "course_17", name: "Analyse des réseaux sociaux", credit: 3 },
      { id: "course_18", name: "Traitement du signal", credit: 3 },
      { id: "course_19", name: "Robotique", credit: 4 },
      { id: "course_20", name: "Technologies émergentes", credit: 3 },
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
              { id: "schedule_4", courseId: "course_8", startTime: "2023-04-10T15:00:00Z", endTime: "2023-04-10T19:00:00Z" },
              // Ajoutez d'autres cours pour le lundi...
            ],
          },
          {
            day: "tuesday",
            coursesSchedule: [
              { id: "schedule_3", courseId: "course_11", startTime: "2023-04-10T08:00:00Z", endTime: "2023-04-10T10:00:00Z" },
              { id: "schedule_4", courseId: "course_12", startTime: "2023-04-10T10:00:00Z", endTime: "2023-04-10T12:00:00Z" },
              { id: "schedule_5", courseId: "course_14", startTime: "2023-04-10T12:30:00Z", endTime: "2023-04-10T22:30:00Z" },
              // Ajoutez d'autres cours pour le mardi...
            ],
          },
          {
            day: "wednesday",
            coursesSchedule: [
              { id: "schedule_3", courseId: "course_20", startTime: "2023-04-10T08:00:00Z", endTime: "2023-04-10T10:00:00Z" },
              { id: "schedule_4", courseId: "course_6", startTime: "2023-04-10T10:00:00Z", endTime: "2023-04-10T12:00:00Z" },
              { id: "schedule_5", courseId: "course_10", startTime: "2023-04-10T12:30:00Z", endTime: "2023-04-10T19:30:00Z" },
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
              { id: "schedule_6", courseId: "course_6", startTime: "2023-04-10T12:00:00Z", endTime: "2023-04-10T18:00:00Z" },
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
              { id: "schedule_5", courseId: "course_17", startTime: "2023-04-10T12:30:00Z", endTime: "2023-04-10T17:30:00Z" },
              // Ajoutez d'autres cours pour le mardi...
            ],
          },
          {
            day: "saturday",
            coursesSchedule: [
              { id: "schedule_3", courseId: "course_2", startTime: "2023-04-10T08:00:00Z", endTime: "2023-04-10T10:00:00Z" },
              { id: "schedule_4", courseId: "course_5", startTime: "2023-04-10T10:00:00Z", endTime: "2023-04-10T12:00:00Z" },
              { id: "schedule_5", courseId: "course_17", startTime: "2023-04-10T12:30:00Z", endTime: "2023-04-10T17:30:00Z" },
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
  addClassroom(classroom: Classroom) {
     this.classrooms.push(classroom);
  }

  addCourse(course: Course) {
   this.courses.push(course);
  }

  addStudent(student: Student) {
   this.students.push(student);
  }

//   addCourseSchedule(courseSchedule: CourseSchedule) {
//    this.courseSchedules.push(courseSchedule);
//   }

//   addDaySchedule(daySchedule: DaySchedule) {
//    this.daySchedules.push(daySchedule);
//   }

  addTimetable(timetable: Timetable) {
   this.timeTables.push(timetable);
  }

  addAttendanceSchedule(classroomId: string, date: string, attendanceSchedule: AttendanceSchedule) {
    const attendance = this.attendances.find(item => item.classroomId === classroomId);
    if (attendance) {
        attendance.classroomCall.find(att=> att.date === date)?.courses.push(attendanceSchedule);
    }
  }

  addAttendance(attendance: Attendance) {
    this.attendances.push(attendance);
  }
 
  // Ajoutez d'autres méthodes pour manipuler les données selon les besoins de votre application
 }
 
 export default new DataStore();