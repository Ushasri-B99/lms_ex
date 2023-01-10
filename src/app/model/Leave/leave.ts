import { User } from "../User1/user";

export interface Leave {
//['username', 'leaveReason','fromDate','toDate','createdAt','adminRemark','status','leaveType','noOfDays','lop']; -->
username:string | undefined;
    leaveId: number | undefined;
    leaveReason: number | undefined;
    fromDate: Date | undefined;
    toDate: Date | undefined;
    createdAt: Date | undefined;
    adminRemark: string | undefined;
    status: string | undefined;
    leaveType: string | undefined;
    noOfDays: number | undefined;
    lop: number | undefined;
    //userRef : User
}
