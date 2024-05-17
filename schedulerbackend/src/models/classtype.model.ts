import { RowDataPacket } from "mysql2";

export default interface Classtype extends RowDataPacket {
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
