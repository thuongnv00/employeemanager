import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Employee} from "./employee";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  private apiServerUrl = environment.apiBaseUrl;

  public getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]> (`${this.apiServerUrl}/employee/all`);
  }

  public addEmployee(employee:Employee): Observable<Employee> {
    return this.http.post<Employee> (`${this.apiServerUrl}/employee/add`,employee);
  }

  public updateEmployee(employee:Employee): Observable<Employee> {
    return this.http.put<Employee> (`${this.apiServerUrl}/employee/update`,employee);
  }

  public deleteEmployees(employeeId:number): Observable<void> {
    return this.http.delete<void> (`${this.apiServerUrl}/employee/delete/${employeeId}`);
  }
}
