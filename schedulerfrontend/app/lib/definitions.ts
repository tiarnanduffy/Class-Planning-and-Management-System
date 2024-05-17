// This file contains type definitions for the data.
// It describes the shape of the data, and what data type each property should accept.
export type Buildings = {
  building_id: number;
  building_name: string;
  school: string;
}

export type Courses = {
  course_id: number;
  course_name: string;
  school: string;
  qualification: string;
  years: number;
  building_id: number;
  pending_id: number;
  scheduled: boolean;
};

export type Pending = {
  pending_id: number;
  pending_list: string;
}

export type Users = {
  user_id: number,
  user_type: string,
  firstname: string,
  lastname: string,
  course_id: number,
  course_year: number,
  ss_number: number,
  timetable_id: number
}

export type CourseAdmin = {
  course_admin_id?: number;
  user_type?: string;
  firstname?: string;
  lastname?: string;
}

export type Modules = {
  module_id: number;
  course_id: number;
  module_name: string;
  module_code: string;
  module_year: number;
  user_id: number;
  timetable_id: number;
  enrolled_students: number;
  capacity: number;
  classtype_id: number;
  sub_lecturer_id: number;
};

export type ModuleTimetables = {
  module_id: number;
  module_name: string;
  timetable_id: number;
  m9: string;
  m10: string;
  m11: string;
  m12: string;
  m13: string;
  m14: string;
  m15: string;
  m16: string;
  t9: string;
  t10: string;
  t11: string;
  t12: string;
  t13: string;
  t14: string;
  t15: string;
  t16: string;
  w9: string;
  w10: string;
  w11: string;
  w12: string;
  w13: string;
  w14: string;
  w15: string;
  w16: string;
  th9: string;
  th10: string;
  th11: string;
  th12: string;
  th13: string;
  th14: string;
  th15: string;
  th16: string;
  f9: string;
  f10: string;
  f11: string;
  f12: string;
  f13: string;
  f14: string;
  f15: string;
  f16: string;
}

export type ModulesToStudents = {
  module_id: number;
  student_id: number;
}

export type Rooms = {
  room_id: number;
  room_name: string;
  building_id: number;
  capacity: number;
  facility: string;
  timetable_id: number;
}

export type SystemAdmin = {
  system_admin_id: number;
  user_type: string;
  firstname: string;
  lastname: string;
}

export type Timetables = {
  timetable_id: number;
  m9: string;
  m10: string;
  m11: string;
  m12: string;
  m13: string;
  m14: string;
  m15: string;
  m16: string;
  t9: string;
  t10: string;
  t11: string;
  t12: string;
  t13: string;
  t14: string;
  t15: string;
  t16: string;
  w9: string;
  w10: string;
  w11: string;
  w12: string;
  w13: string;
  w14: string;
  w15: string;
  w16: string;
  th9: string;
  th10: string;
  th11: string;
  th12: string;
  th13: string;
  th14: string;
  th15: string;
  th16: string;
  f9: string;
  f10: string;
  f11: string;
  f12: string;
  f13: string;
  f14: string;
  f15: string;
  f16: string;
}

export type Classtypes = {
  classtype_id: number;
  num_lectures: number;
  lecture_facility: string;
  num_tutorials: number;
  tutorial_facility: string;
  num_practicals: number;
  practical_facility: string;
  num_labs: number;
  lab_facility: string;
  num_advisories: number;
  advisory_facility: string;
}

export type Constraints = {
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

export type ConstraintsTable = {
  constraints_id: number;
  schedule_id: number;
  traversal_order: string;
  module_order_type: string;
  lec_room_leeway: string;
  tut_room_leeway: string;
  pra_room_leeway: string;
  lab_room_leeway: string;
  adv_room_leeway: string;
  lec_stu_leeway: string;
  tut_stu_leeway: string;
  pra_stu_leeway: string;
  lab_stu_leeway: string;
  adv_stu_leeway: string;
  lec_classes_per_day: string;
  tut_classes_per_day: string;
  pra_classes_per_day: string;
  lab_classes_per_day: string;
  adv_classes_per_day: string;
  use_sub_lecturer: boolean;
}

export type Schedule = {
  schedule_id: number;
  datetime: Date;
  status: string;
  course_id: number;
}

export type Succeeded = {
  succeeded_id: number;
  schedule_id: number;
  module_id: number;
  user_id: number;
  room_id: number;
  classtype: string;
  slot: string;
}

export type Failed = {
  failed_id: number;
  schedule_id: number;
	module_id: number;
	classtype: string;
  class_num: string;
}

export type Suggestion = {
  suggestion_id: number;
  schedule_id: number;
	constraint_type: string;
	slots: string;
	required_leeway: number;
}

export type Reason = {
  reason_id:  number;
  schedule_id: number;
	reason: string;
  module_id: number;
  classtype: string
}

export type ConstraintsKey = keyof ConstraintsTable;

export type ModuleOrder = {
  moduleorder_id: number;
  constraints_id: number;
  module_id: number;
}

export type ClassOrder = {
  classorder_id: number;
  constraints_id: number;
  class_name: string;
}