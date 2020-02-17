import { Inventory } from "./inventory";
import { SaleData } from "./saledata";

export class Sale{
	billed: boolean;
    saleId: number;
    customerName: string ="";
    customerPhone: string="";
    customerEmail: string="";
	saleDate: Date;
	saleTotal: number = 0;
	discount: number = 0;
	jobId: number;
	saleData: SaleData[];
}

	