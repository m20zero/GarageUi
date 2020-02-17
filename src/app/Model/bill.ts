import { BillLine } from "./billline";

export class Bill{
    billId: number;
	saleId: number;
	customerName: string;
	customerPhone: string;
	customerEmail: string;
	billDate: Date;
	billTotal: number;
	discount:number;
	jobId:number;
	jobDescription: string;
    jobTotal: number;
    jobStartDate: Date ;
	jobEndDate: Date ;
	carNo: string ;
	carBrand: string ;
	carModel: string ;
    billLine: BillLine[];
}