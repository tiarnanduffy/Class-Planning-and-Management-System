import { RowDataPacket } from "mysql2";

export default interface ConstraintsTable extends RowDataPacket {
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