import { Translations } from "./en"

const fr: Translations = {
  common: {
    ok: "OK !",
    cancel: "Annuler",
    back: "Retour",
    home: "Accueil",
    info: "info",
    saveButton: "Enregistrer",
    error: "Erreur",
    success: "Succès",
    sorry: "Désole",
    attendance: "Presence",
    attendanceBottom: "fiche de presence",
  },
  welcomeScreen: {
    postscript:
      "psst  — Ce n'est probablement pas à quoi ressemble votre application. (À moins que votre designer ne vous ait donné ces écrans, dans ce cas, mettez la en prod !)",
    readyForLaunch: "Votre application, presque prête pour le lancement !",
    exciting: "(ohh, c'est excitant !)",
    textButton: "Suivant",
    description: "SchoolLog est une application qui facilite le gestion de opérations academiques et permet aux données stockées de faire une analyse de l'evolution des enseignements",
    welcomeMessage: "Bienvenue !",
  },
  errorScreen: {
    title: "Quelque chose s'est mal passé !",
    friendlySubtitle:
      "C'est l'écran que vos utilisateurs verront en production lorsqu'une erreur sera lancée. Vous voudrez personnaliser ce message (situé dans `app/i18n/fr.ts`) et probablement aussi la mise en page (`app/screens/ErrorScreen`). Si vous voulez le supprimer complètement, vérifiez `app/app.tsx` pour le composant <ErrorBoundary>.",
    reset: "RÉINITIALISER L'APPLICATION",
  },
  emptyStateComponent: {
    generic: {
      heading: "Si vide... si triste",
      content:
        "Aucune donnée trouvée pour le moment. Essayez de cliquer sur le bouton pour rafraîchir ou recharger l'application.",
      button: "Essayons à nouveau",
    },
  },
  ManagementScreen: {
    addClass: "Ajouter une classe",
    addCourse: "Ajouter un cours",
    addStudent: "Ajouter un étudiant",
    courseLabel: "Cours",
    classroomLabel: "Classes",
    studentLabel: "Etudiants",
    managementText: "Gestion",
    classroomList: "Liste des classes",
    studentList: "Liste des etudiants",
    courseList: "Liste des cours",
    emptyClass: "Aucune classe trouvée",
    emptyStud: "Aucun etudiant trouvé",
    emptyCourse: "Aucun cours trouvé",
  },
  CreateClassroom: {
    className: "Nom de la classe",
    classDescription: "Description de la classe",
    descriptionPlaceholder: "Votre description",
    successMessage: "Enregistrement réussi",
    validation: {
      name: "Le nom de la classe est requise",
    }
  },
  CreateCourse: {
    courseCredit: "Credit",
    credit: "Nombre de credit: ",
    courseName: "Nom",
    validation: {
      name: "Le nom de cours est requis",
      credit: "le nombre de credit est requis",
    },
  },
  CreateStudent: {
    studentName: "Nom",
    studentClassroom: "Classe",
    studentGender: "Genre :",
    studentphoto: "Photo",
    errorNoClassroom: "Vous devez avoir au moins une classe pour ajouter un etudiant",
    male: "Homme",
    female: "Femme",
    dropdownPlaceholder: "Choisir...",
    validation: {
      name: "Le nom de l'étudiant est requis",
      sex: "Le genre de l'etudiant est requis",
      photo: "La photo de l'étudiant est requise",
      classroom: "La classe de l'étudiant est requise"
    }
  },
  CreateTimetable: {
    title: "Creer un emploi de temps",
    errorNoCourse: "Vous devez avoir au moins un cours pour créer un emploi de temps",
    errorNoSchedule: "Vous devez programmer au moins un jour de la semaine",
    delProgram: "Supprimer ce programme",
    addProgram: "Ajouter un programme",
    saveProgram: "Conserver ce programme",
    savedProgram: "Programme inmodifiable",
    slotOccupied: "Ce créneau horaire est deja occupé",
    existingTimetable: "cette classe a déjà un emploi de temps",
    dayOfWeek: {
      monday: "Lundi",
      tuesday: "Mardi",
      wednesday: "Mercredi",
      thursday: "Jeudi",
      friday: "Vendredi",
      saturday: "Samedi",
      sunday: "Dimanche",
    },
    validation: {
      course: "Programme requis",
      startTime: "Heure de depart requise",
      endTime: "Heure de fin requise",
      isAfter: "L'heure de fin doit etre supérieure à l'heure de depart"
    },
    form: {
      startTime: "Heure de début",
      endTime: "Heure de fin",
      course: "Programme",
      title: "Programme de cours",
    }
  },
  home: {
    ongoing: "en cours",
    noTimetable: "Aucun emploi de temps trouvé",
    noSchedule: "Aucun cours programmé",
    attendanceUnAuth: "L'appel ne s'effectue que sur les programmes en cours",
    callError: "vous devez appeler tous les etudiants",
    callDone: "L'appel a déjà été effectuée sur ce programme",
  },
  attendanceList: {
    headerText: "Historique de presence",
    noHistory: "Historique vide",
    course: "Cours:",
    classroom: "Classe:",
    selClass: "Choisissez la classe:",
    selDay: "Choisissez le jour:",
    selDate: "Choisissez la date:",
  },
  Auth: {
    noBiometric: "Cet appareil ne prend pas en charge l'authentification biometrique.",
    title: "Deverouiller votre application pour pouvoir l'utiliser",
    useWeakBio: "Utiliser le moyen de verouillage actuel de l'appareil",
    useStrongBio: "Ajouter un moyen d'authentifiation biometrique",
    header: "Authentification",
  },
  setPinStep1: {
    Title: "Sécurisez vos données en ajoutant un code PIN de 4 chiffres",
    header: "Ajouter un code PIN",
  },
  setPinStep2: {
    Title: "Confirmer votre code PIN",
  },
}

export default fr
