import {
  Modules,
  Courses,
  Buildings,
  Timetables,
  ModuleTimetables,
  Rooms,
  Users,
  Classtypes,
  Succeeded,
  Failed,
  Suggestion,
  Reason,
  Schedule,
  ConstraintsTable,
  ModuleOrder,
  ClassOrder
} from './definitions';

interface CourseData {
  course_name: string;
  school: string;
  qualification: string;
  years: number;
  building_id: string;
}

interface UpdatedCourseData {
  course_name: string;
  school: string;
  qualification: string;
  years: number;
  building_id: number;
  course_id: number;
}

interface BuildingData {
  building_name: string;
  school: string;
}

interface UpdatedBuildingData {
  building_name: string;
  school: string;
  building_id: number;
}

interface LecturerUserData {
  firstname: string;
  lastname: string;
  ss_number: number;
}

interface UpdatedLecturerUserData {
  firstname: string;
  lastname: string;
  ss_number: number;
  user_id: number;
}

interface ModuleData {
  course_id: number;
  module_name: string;
  module_code: string;
  module_year: number;
  user_id: number;
  enrolled_students: number;
  capacity: number;
  sub_lecturer_id: number;
}

interface UpdatedModuleData {
  course_id: number;
  module_name: string;
  module_code: string;
  module_year: number;
  user_id: number;
  enrolled_students: number;
  capacity: number;
  classtype_id: number;
  module_id: number;
  sub_lecturer_id: number;
}

interface ClasstypeData {
  num_lectures: number;
  lecture_facility: string | null;
  num_tutorials: number;
  tutorial_facility: string | null;
  num_practicals: number;
  practical_facility: string | null;
  num_labs: number;
  lab_facility: string | null;
  num_advisories: number;
  advisory_facility: string | null;
}

interface RoomData {
  room_name: string;
  building_id: number;
  capacity: number;
  facility: string | null;
}

interface UpdatedRoomData {
  room_name: string;
  building_id: number;
  capacity: number;
  facility: string | null;
  room_id: number;
}

interface StudentUserData {
  firstname: string;
  lastname: string;
  course_id: number;
  course_year: number;
  ss_number: number;
}

interface UpdatedStudentUserData {
  firstname: string;
  lastname: string;
  course_id: number;
  course_year: number;
  ss_number: number;
  user_id: number;
}

interface Constraints {
  traversalOrder: string;
  moduleOrder: String[];
  classOrder: String[];
  lecRoomLeeway: string;
  tutRoomLeeway: string;
  praRoomLeeway: string;
  labRoomLeeway: string;
  advRoomLeeway: string;
  lecStuLeeway: string;
  tutStuLeeway: string;
  praStuLeeway: string;
  labStuLeeway: string;
  advStuLeeway: string;
  lecClassesPerDay: string;
  tutClassesPerDay: string;
  praClassesPerDay: string;
  labClassesPerDay: string;
  advClassesPerDay: string;
  useSubLecturer: boolean;
}

interface TimetableAndScheduleID {
  timetable: Timetables;
  schedule_id: number
}

export async function getBuildings(): Promise<Buildings[]> {
  const response = await fetch('http://localhost:8080/api/building',
    { cache: 'no-store' }
  );
  const buildings = response.json();

  return buildings;
}

export async function getCourses(): Promise<Courses[]> {
  const response = await fetch('http://localhost:8080/api/course',
    { cache: 'no-store' }
  );
  const courses = response.json();

  return courses;
}

export async function getModules(): Promise<Modules[]> {
  const response = await fetch('http://localhost:8080/api/module',
    { cache: 'no-store' }
  );
  const modules = response.json();

  return modules;
}

export async function getModulesByCourseId(course_id: number): Promise<Modules[]> {
  const response = await fetch(`http://localhost:8080/api/module/course/${course_id}`,
    { cache: 'no-store' }
  );
  const modules = response.json();

  return modules;
}

export async function getRooms(): Promise<Rooms[]> {
  const response = await fetch('http://localhost:8080/api/room',
    { cache: 'no-store' }
  );
  const modules = response.json();

  return modules;
}

export async function getScheduleRows(): Promise<Schedule[]> {
  const response = await fetch('http://localhost:8080/api/scheduletables/schedule/'
  );
  const scheduleRows = response.json();

  return scheduleRows;
}

export async function getRoomsByBuildingID(building_id: number): Promise<Rooms[]> {
  const response = await fetch(`http://localhost:8080/api/room/building/${building_id}`,
    { cache: 'no-store' }
  );
  const modules = response.json();

  return modules;
}

export async function getStudentUsers(): Promise<Users[]> {
  const response = await fetch('http://localhost:8080/api/user/student',
    { cache: 'no-store' }
  );
  const students = response.json();

  return students;
}

export async function getLecturerUsers(): Promise<Users[]> {
  const response = await fetch('http://localhost:8080/api/user/lecturer',
    { cache: 'no-store' }
  );
  const students = response.json();

  return students;
}

export async function getBuildingByID(building_id: number): Promise<Buildings> {
  const response = await fetch(`http://localhost:8080/api/building/${building_id}`,
    { cache: 'no-store' }
  );
  const buildings = response.json();

  return buildings;
}

export async function getBuildingIDByCourseID(course_id: number): Promise<string> {
  const response = await fetch(`http://localhost:8080/api/building/course/${course_id}`,
    { cache: 'no-store' }
  );
  const building_id = response.json();

  return building_id;
}

export async function getCourseByID(course_id: number): Promise<Courses> {
  const response = await fetch(`http://localhost:8080/api/course/${course_id}`,
    { cache: 'no-store' }
  );
  const courses = response.json();

  return courses;
}

export async function getModuleByID(module_id: number): Promise<Modules> {
  const response = await fetch(`http://localhost:8080/api/module/${module_id}`,
    { cache: 'no-store' }
  );
  const modules = response.json();

  return modules;
}

export async function getRoomByID(room_id: number): Promise<Rooms> {
  const response = await fetch(`http://localhost:8080/api/room/${room_id}`,
    { cache: 'no-store' }
  );
  const rooms = response.json();

  return rooms;
}

export async function getUserByID(user_id: number): Promise<Users> {
  const response = await fetch(`http://localhost:8080/api/user/${user_id}`,
    { cache: 'no-store' }
  );
  const user = response.json();

  return user;
}

export async function getTimetableByID(timetable_id: number): Promise<Timetables> {
  const response = await fetch(`http://localhost:8080/api/timetable/${timetable_id}`,
    {
      cache: 'no-store'
    }
  );
  const timetable = response.json();

  return timetable;
}

export async function getModulesByStudentID(student_id: number): Promise<number[]> {
  const response = await fetch(`http://localhost:8080/api/modulesToStudents/${student_id}`,
    {
      cache: 'no-store'
    }
  );
  const module_ids = response.json();

  return module_ids;
}


export async function getModulesByStudentUserID(user_id: number): Promise<number[]> {
  const response = await fetch(`http://localhost:8080/api/modulesToStudentUsers/${user_id}`,
    {
      cache: 'no-store'
    }
  );
  const module_ids = response.json();

  return module_ids;
}

export async function getClasstypeByID(classtype_id: number): Promise<Classtypes> {
  const response = await fetch(`http://localhost:8080/api/classtype/${classtype_id}`,
    {
      cache: 'no-store'
    }
  );
  const classtype = response.json();

  return classtype;
}

export async function getClasstypes(): Promise<Classtypes[]> {
  const response = await fetch(`http://localhost:8080/api/classtype/`,
    {
      cache: 'no-store'
    }
  );

  const classtypes = response.json();

  return classtypes;
}

export async function getClasstypeByModuleID(module_id: number): Promise<Classtypes> {
  const response = await fetch(`http://localhost:8080/api/classtype/module_id/${module_id}`,
    {
      cache: 'no-store'
    }
  );
  const classtype = response.json();

  return classtype;
}

export async function doSchedule(course_id: number, constraints: Constraints): Promise<TimetableAndScheduleID> {
  const response = await fetch(`http://localhost:8080/api/schedule/${course_id}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(constraints),
      cache: 'no-store'
    });
  if (!response.ok) {
    console.error(`Failed to create schedule. Status: ${response.status}`);
    const errorMessage = await response.text();
    console.error(`Server error message: ${errorMessage}`);
  }
  const data = await response.json();
  return data;
}

export async function createBuilding(building: BuildingData): Promise<Buildings> {
  const response = await fetch('http://localhost:8080/api/building',
    {
      cache: 'no-store',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(building),
    }
  );
  if (!response.ok) {
    throw new Error('Failed to create building. Status');
  }
  const createdBuilding = await response.json();
  return createdBuilding;
}

export async function updateBuilding(building: UpdatedBuildingData): Promise<Buildings> {
  const response = await fetch(`http://localhost:8080/api/building/${building.building_id}`, {
    cache: 'no-store',
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(building),
  }

  );
  if (!response.ok) {
    console.error(`Failed to update building. Status: ${response.status}`);
    const errorMessage = await response.text();
    console.error(`Server error message: ${errorMessage}`);

    throw new Error('Failed to update building');
  }
  const createdBuilding = await response.json();
  return createdBuilding;
}

export async function deleteBuilding(building_id: number): Promise<number> {
  const response = await fetch(`http://localhost:8080/api/building/${building_id}`,
    {
      method: 'DELETE',
      cache: 'no-store'
    }
  );
  const deleteBuilding = response.json();

  return deleteBuilding;
}

export async function createCourse(course: CourseData): Promise<Courses> {
  const response = await fetch('http://localhost:8080/api/course', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
    body: JSON.stringify(course),
  });

  if (!response.ok) {
    throw new Error('Failed to create course');
  }
  const createdCourse = await response.json();
  return createdCourse;
}

export async function updateCourse(course: UpdatedCourseData): Promise<Courses> {
  const response = await fetch(`http://localhost:8080/api/course/${course.course_id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
    body: JSON.stringify(course),
  }
  );
  if (!response.ok) {
    console.error(`Failed to update course. Status: ${response.status}`);
    const errorMessage = await response.text();
    console.error(`Server error message: ${errorMessage}`);

    throw new Error('Failed to update course');
  }
  const createdCourse = await response.json();
  return createdCourse;
}

export async function deleteCourse(course_id: number): Promise<number> {
  const response = await fetch(`http://localhost:8080/api/course/${course_id}`,
    {
      method: 'DELETE',
      cache: 'no-store'
    }
  );
  const deleteCourse = response.json();

  return deleteCourse;
}

export async function deleteLecturer(lecturer_id: number): Promise<number> {
  const response = await fetch(`http://localhost:8080/api/lecturer/${lecturer_id}`,
    {
      method: 'DELETE',
      cache: 'no-store',
    }
  );
  const deleteLecturer = response.json();

  return deleteLecturer;
}

// As, in create-module you create both the module and set the class type details the database call is done within the same function.
// moduleAndClassData interface used to send the data within the same JSON body
export async function createModule2(moduleAndClassData: { module: ModuleData, classtype: ClasstypeData }): Promise<Modules> {
  const response = await fetch('http://localhost:8080/api/module/createwithclass',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
      body: JSON.stringify(moduleAndClassData),
    }
  );
  if (!response.ok) {
    throw new Error('Failed to create module. Status');
  }
  const createdModule = await response.json();
  return createdModule;
}

export async function createClasstype(classtype: ClasstypeData): Promise<Classtypes> {
  const response = await fetch('http://localhost:8080/api/classtype',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(classtype),
    }
  );
  if (!response.ok) {
    throw new Error('Failed to create classtype. Status');
  }
  const createdClasstype = await response.json();
  return createdClasstype;
}

// Again, create module and class done within same page
// moduleAndClassData interface used to send the data within the same JSON body
export async function updateModule(moduleAndClassData: { module: UpdatedModuleData, classtype: ClasstypeData }): Promise<Modules> {
  const response = await fetch(`http://localhost:8080/api/module/updatewithclass/${moduleAndClassData.module.module_id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
    body: JSON.stringify(moduleAndClassData),
  }

  );

  if (!response.ok) {
    console.error(`Failed to update module. Status: ${response.status}`);
    const errorMessage = await response.text();
    console.error(`Server error message: ${errorMessage}`);

    throw new Error('Failed to update module');
  }
  const createdModule = await response.json();
  return createdModule;
}

export async function deleteModule(module_id: number): Promise<number> {
  const response = await fetch(`http://localhost:8080/api/module/${module_id}`,
    {
      method: 'DELETE',
      cache: 'no-store'
    }
  );
  const deleteModule = response.json();

  return deleteModule;
}


export async function createRoom(room: RoomData): Promise<Rooms> {
  const response = await fetch('http://localhost:8080/api/room',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(room),
      cache: 'no-store',
    }
  );
  if (!response.ok) {
    throw new Error('Failed to create module. Status');
  }
  const createdRoom = await response.json();
  return createdRoom;
}

export async function updateRoom(room: UpdatedRoomData): Promise<Rooms> {
  const response = await fetch(`http://localhost:8080/api/room/${room.room_id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
    body: JSON.stringify(room),
  }
  );
  if (!response.ok) {
    console.error(`Failed to update room. Status: ${response.status}`);
    const errorMessage = await response.text();
    console.error(`Server error message: ${errorMessage}`);

    throw new Error('Failed to update module');
  }
  const createdRoom = await response.json();
  return createdRoom;
}

export async function deleteRoom(room_id: number): Promise<number> {
  const response = await fetch(`http://localhost:8080/api/room/${room_id}`,
    {
      method: 'DELETE',
      cache: 'no-store',
    }
  );
  const deletedRoom = response.json();

  return deletedRoom;
}


export async function deleteStudent(student_id: number): Promise<number> {
  const response = await fetch(`http://localhost:8080/api/student/${student_id}`,
    {
      method: 'DELETE',
      cache: 'no-store'
    }
  );
  const deleteStudent = response.json();

  return deleteStudent;
}

export async function reserveSlot(slot: string): Promise<number> {
  const response = await fetch(`http://localhost:8080/api/timetable/${slot}`,
    {
      method: 'PUT',
      cache: 'no-store'
    }
  );
  const updatedTimetable = response.json();

  return updatedTimetable;
}

export async function getTimetables(): Promise<Timetables[]> {
  const response = await fetch('http://localhost:8080/api/timetable', { cache: 'no-store' });
  const rooms = response.json();

  return rooms;
}

export async function getModuleTimetables(): Promise<ModuleTimetables[]> {
  const response = await fetch('http://localhost:8080/api/moduleTimetables', { cache: 'no-store' });
  const moduleTimetables = response.json();

  return moduleTimetables;
}

export async function getScheduleRow(schedule_id: number): Promise<Schedule> {
  const response = await fetch(`http://localhost:8080/api/scheduletables/schedule/${schedule_id}`,
  {
    cache: 'no-store'
  }
  );
  
  const rows = response.json();

  return rows;
}

export async function getSucceededRows(schedule_id: number): Promise<Succeeded[]> {
  const response = await fetch(`http://localhost:8080/api/scheduletables/succeeded/${schedule_id}`, {
    cache: 'no-store'
  });
  const rows = response.json();

  return rows;
}
export async function getFailedRows(schedule_id: number): Promise<Failed[]> {
  const response = await fetch(`http://localhost:8080/api/scheduletables/failed/${schedule_id}`, {
    cache: 'no-store'
  });
  const rows = response.json();

  return rows;
}
export async function getSuggestionRows(schedule_id: number): Promise<Suggestion[]> {
  const response = await fetch(`http://localhost:8080/api/scheduletables/suggestion/${schedule_id}`,  {
    cache: 'no-store'
  });
  const rows = response.json();

  return rows;
}
export async function getReasonRows(schedule_id: number): Promise<Reason[]> {
  const response = await fetch(`http://localhost:8080/api/scheduletables/reason/${schedule_id}`,  {
    cache: 'no-store'
  });
  const rows = response.json();

  return rows;
}

export async function getConstraintsTable(schedule_id: number): Promise<ConstraintsTable> {
  const response = await fetch(`http://localhost:8080/api/constraints/constraints/${schedule_id}`,  {
    cache: 'no-store'
  });
  const rows = response.json();

  return rows;
}

export async function getModuleOrders(constraints_id: number): Promise<ModuleOrder[]> {
  const response = await fetch(`http://localhost:8080/api/constraints/moduleorder/${constraints_id}`,  {
    cache: 'no-store'
  });
  const rows = response.json();

  return rows;
}

export async function getClassOrders(constraints_id: number): Promise<ClassOrder[]> {
  const response = await fetch(`http://localhost:8080/api/constraints/classorder/${constraints_id}`,  {
    cache: 'no-store'
  });
  const rows = response.json();

  return rows;
}

export async function resetTimetables(): Promise<number> {
  const response = await fetch('http://localhost:8080/api/timetable/reset',
    {
      method: 'PUT',
      cache: 'no-store'
    });
  const resetTimetables = response.json();
  return resetTimetables;
}

export async function selectModulesForStudent(module_ids: number[], student_id: number): Promise<void> {

  const response = await fetch(`http://localhost:8080/api/modulesToStudents`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ module_ids, student_id }),
  });

  if (!response.ok) {
    console.error('Failed to select modules for student.');
  }
}

export async function selectModulesForStudentUser(module_ids: number[], user_id: number): Promise<void> {
  const response = await fetch(`http://localhost:8080/api/modulesToStudentUsers`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ module_ids, user_id }),
  });

  if (!response.ok) {
    console.error('Failed to select modules for user.');
  }
}


export async function createLecturerUser(lecturer: LecturerUserData): Promise<Users> {
  const response = await fetch('http://localhost:8080/api/user/lecturer',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(lecturer),
      cache: 'no-store',
    }
  );
  if (!response.ok) {
    throw new Error('Failed to create lecturer. Status');
  }
  const createdLecturer = await response.json();
  return createdLecturer;
}

export async function updateLecturerUser(lecturer: UpdatedLecturerUserData): Promise<Users> {
  const response = await fetch(`http://localhost:8080/api/user/${lecturer.user_id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(lecturer),
    cache: 'no-store',
  }

  );
  if (!response.ok) {
    console.error(`Failed to update lecturer. Status: ${response.status}`);
    const errorMessage = await response.text();
    console.error(`Server error message: ${errorMessage}`);

    throw new Error('Failed to update lecturers');
  }
  const createdLecturer = await response.json();
  return createdLecturer;
}


export async function createStudentUser(student: StudentUserData): Promise<Users> {
  const response = await fetch('http://localhost:8080/api/user/student',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(student),
      cache: 'no-store',
    }
  );
  if (!response.ok) {
    throw new Error('Failed to create student. Status');
  }
  const createdStudent = await response.json();
  return createdStudent;
}


export async function updateStudentUser(student: UpdatedStudentUserData): Promise<Users> {
  const response = await fetch(`http://localhost:8080/api/user/${student.user_id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(student),
    cache: 'no-store',
  }

  );
  if (!response.ok) {
    console.error(`Failed to update student. Status: ${response.status}`);
    const errorMessage = await response.text();
    console.error(`Server error message: ${errorMessage}`);

    throw new Error('Failed to update students');
  }
  const createdStudent = await response.json();
  return createdStudent;
}

export async function deleteUser(user_id: number): Promise<number> {
  const response = await fetch(`http://localhost:8080/api/user/${user_id}`,
    {
      method: 'DELETE'
    }
  );
  const deleteStudent = response.json();

  return deleteStudent;
}


