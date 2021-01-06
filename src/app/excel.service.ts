import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';


@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor() { }

  public exportAsExcelFile2(json: any[], Name1, excelFileName: string): void {
    /*
    let worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    let workbook: XLSX.WorkBook = { Sheets: { data: worksheet}, SheetNames: ['Iniciadas'] };
    */
   const worksheet1 = XLSX.utils.aoa_to_sheet(json);
   const workbook = XLSX.utils.book_new();
   XLSX.utils.book_append_sheet(workbook, worksheet1, Name1);
   let excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
   setTimeout(() => {
      this.saveAsExcelFile(excelBuffer, excelFileName);
    }, 1500);
  }

  public exportAsExcelFile(json: any[], json1: any[], Name1, Name2, excelFileName: string): void {
    /*
    let worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    let workbook: XLSX.WorkBook = { Sheets: { data: worksheet}, SheetNames: ['Iniciadas'] };
    */
   const worksheet1 = XLSX.utils.aoa_to_sheet(json);
   const worksheet2 = XLSX.utils.aoa_to_sheet(json1);
   const workbook = XLSX.utils.book_new();
   XLSX.utils.book_append_sheet(workbook, worksheet1, Name1);
   XLSX.utils.book_append_sheet(workbook, worksheet2, Name2);
   let excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
   setTimeout(() => {
      this.saveAsExcelFile(excelBuffer, excelFileName);
    }, 1500);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
     const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
     FileSaver.saveAs(data, fileName + '_export_' + new  Date().getTime() + EXCEL_EXTENSION);
  }

  }
