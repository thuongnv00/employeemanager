import {Component, OnInit} from '@angular/core';
import {Employee} from "./employee";
import {EmployeeService} from "./employee.service";
import {HttpErrorResponse} from "@angular/common/http";
import {NgForm} from "@angular/forms";
//import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'employeemanager'

  public employees: Employee[] = [];

  public editEmployee: Employee;

  constructor(private employeeService: EmployeeService) {
  }

  ngOnInit() {
    this.getEmployees();
  }

  public getEmployees(): void {
    this.employeeService.getEmployees().subscribe({
      next: (response: Employee[]) => {
        this.employees = response
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message)
      }
    });
  }

  public onAddEmployee(addForm: NgForm): void {
    document.getElementById('add-employee-form')?.click();
    this.employeeService.addEmployee(addForm.value).subscribe({
      next:(response : Employee) => {
        console.log(response)
        this.getEmployees()
      },
      error:(error:HttpErrorResponse) => {
        alert(error.message)
      }
    })
  }
  public onUpdateEmployee(employee: Employee): void {
    this.employeeService.updateEmployee(employee).subscribe({
      next:(response : Employee) => {
        console.log(response)
        this.getEmployees()
      },
      error:(error:HttpErrorResponse) => {
        alert(error.message)
      }
    })
  }

  public onOpenModal(employee: Employee  , mode: string): void {
    const container = document.getElementById('main-container') ;
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode == 'delete') {
      button.setAttribute('data-target', '#deleteEmployeeModal');
    }
    if (mode == 'edit') {
      button.setAttribute('data-target', '#updateEmployeeModal');
      this.editEmployee = employee;
    }
    container?.appendChild(button);
    button.click()
  }
  public onOpenAddModal( mode: string): void {
    let container = document.getElementById('navbarSupportedContent');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode == 'add') {
      button.setAttribute('data-target', '#addEmployeeModal');
    }
    container?.appendChild(button);
    button.click();
  }


}
