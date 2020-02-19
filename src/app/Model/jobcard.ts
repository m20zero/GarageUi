import { Task } from "./task";

export class JobCard{
    jobId: number;
	jobStartDate: Date;
	jobEndDate: Date;
    carNo: string="";
    carBrand: string="";
    carModel: string="";
    carFuelType: string="";
	carKM: number;
	carChasisNo: string="";
	carEngineNo: string="";
	carFuel: number;
	customerName: string="";
	customerPhone: string="";
	customerEmail: string="";
	customerAddress: string="";
	jobStatus: string="";
    total: number=0;
    task: Task[]=[];
}