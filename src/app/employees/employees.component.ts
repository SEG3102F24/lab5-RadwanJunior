import { Component, inject } from '@angular/core';
import { EmployeeService } from '../service/employee.service';
import { RouterLink } from '@angular/router';
import { NgFor, AsyncPipe, DatePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Employee } from '../model/employee';  // Ensure you have the Employee model imported

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
  standalone: true,
  imports: [RouterLink, NgFor, AsyncPipe, DatePipe],
})
export class EmployeesComponent {
  // Observable that will hold the employees data
  employees$: Observable<Employee[]>;

  // Inject EmployeeService
  private employeeService: EmployeeService = inject(EmployeeService);

  constructor() {
    // Get the employees data when the component is created
    this.employees$ = this.employeeService.getEmployees();
  }
}
