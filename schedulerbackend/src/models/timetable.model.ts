import { RowDataPacket } from "mysql2";

export default interface Timetable extends RowDataPacket {
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
