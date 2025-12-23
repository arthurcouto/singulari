export interface StudentInfo {
  name: string;
  dateOfBirth: string;
  phone: string;
  age: string;
  parentGuardians: string;
  incomingSchool: string;
  studentAddress: string;
  nativeLanguage: string;
  currentSchool: string;
  gender: string;
  studentId: string;
  classification: string;
}

export interface IEPTeamMember {
  title: string;
  participant: string;
  date: string;
}

export interface LearnerProfile {
  studentName: string;
  parentName: string;
  favoriteSubject: string;
  leastFavoriteSubject: string;
  loveWhenTeacher: string;
  wantToLearn: string;
  wouldLikeToDo: string;
  childStrengths: string;
  childNeedsHelp: string;
  wouldLikeChildTo: string;
  teachersToKnow: string;
}

export interface TeacherEvaluation {
  subject: string;
  teacher: string;
  date: string;
  evaluation: string;
}

export interface StrengthsLimitations {
  strengths: string[];
  limitations: string[];
}

export interface AcademicGoal {
  subject: string;
  goal: string;
  measurable: string;
  attainable: string;
  relevant: string;
  timeBased: string;
}

export interface ProgressChecklist {
  items: string[];
  frequency: string;
  reportingChannel: string;
  attachments: { name: string; url: string }[];
}

export interface Service {
  service: string;
  location: string;
  frequency: string;
  beginning: string;
}

export interface RelatedServices {
  specialEducation: Service[];
  supplementary: Service[];
  transportation: Service[];
}

export interface EnvironmentalModification {
  location: string;
  purpose: string;
  shared: string;
}

export interface SupplementaryAids {
  environmentalModifications: EnvironmentalModification[];
  specialEquipment: string[];
  comprehensionStrategies: string[];
  behaviorStrategies: string[];
}

export interface Participation {
  frequency: string;
  assistance: string;
}

export interface ProceduralSafeguards {
  representative1Name: string;
  representative1Title: string;
  representative1Contact: string;
  representative2Name: string;
  representative2Title: string;
  representative2Contact: string;
}

export interface InformedConsent {
  parent1Name: string;
  parent1Date: string;
  parent2Name: string;
  parent2Date: string;
  agreed: boolean;
}

export interface IEPData {
  schoolYear: string;
  schoolName: string;
  schoolLocation: string;
  studentInfo: StudentInfo;
  teamMembers: IEPTeamMember[];
  learnerProfile: LearnerProfile;
  teacherEvaluations: TeacherEvaluation[];
  strengthsLimitations: StrengthsLimitations;
  academicGoals: AcademicGoal[];
  progressChecklist: ProgressChecklist;
  relatedServices: RelatedServices;
  supplementaryAids: SupplementaryAids;
  participation: Participation;
  proceduralSafeguards: ProceduralSafeguards;
  informedConsent: InformedConsent;
}

export const defaultIEPData: IEPData = {
  schoolYear: '',
  schoolName: '',
  schoolLocation: '',
  studentInfo: {
    name: '',
    dateOfBirth: '',
    phone: '',
    age: '',
    parentGuardians: '',
    incomingSchool: '',
    studentAddress: '',
    nativeLanguage: '',
    currentSchool: '',
    gender: '',
    studentId: '',
    classification: '',
  },
  teamMembers: [
    { title: '', participant: '', date: '' },
  ],
  learnerProfile: {
    studentName: '',
    parentName: '',
    favoriteSubject: '',
    leastFavoriteSubject: '',
    loveWhenTeacher: '',
    wantToLearn: '',
    wouldLikeToDo: '',
    childStrengths: '',
    childNeedsHelp: '',
    wouldLikeChildTo: '',
    teachersToKnow: '',
  },
  teacherEvaluations: [
    { subject: 'Português', teacher: '', date: '', evaluation: '' },
    { subject: 'Matemática', teacher: '', date: '', evaluation: '' },
    { subject: 'História', teacher: '', date: '', evaluation: '' },
    { subject: 'Ciências', teacher: '', date: '', evaluation: '' },
  ],
  strengthsLimitations: {
    strengths: ['', '', '', ''],
    limitations: ['', '', '', ''],
  },
  academicGoals: [
    { subject: 'Português', goal: '', measurable: '', attainable: '', relevant: '', timeBased: '' },
  ],
  progressChecklist: {
    items: [''],
    frequency: '',
    reportingChannel: '',
    attachments: [],
  },
  relatedServices: {
    specialEducation: [
      { service: '', location: '', frequency: '', beginning: '' },
    ],
    supplementary: [
      { service: '', location: '', frequency: '', beginning: '' },
    ],
    transportation: [
      { service: '', location: '', frequency: '', beginning: '' },
    ],
  },
  supplementaryAids: {
    environmentalModifications: [
      { location: '', purpose: '', shared: '' },
    ],
    specialEquipment: [''],
    comprehensionStrategies: [''],
    behaviorStrategies: [''],
  },
  participation: {
    frequency: '',
    assistance: '',
  },
  proceduralSafeguards: {
    representative1Name: '',
    representative1Title: '',
    representative1Contact: '',
    representative2Name: '',
    representative2Title: '',
    representative2Contact: '',
  },
  informedConsent: {
    parent1Name: '',
    parent1Date: '',
    parent2Name: '',
    parent2Date: '',
    agreed: false,
  },
};
