import { Injectable } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { addDoc, collection, DocumentReference } from '@firebase/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Employee } from '../model/employee';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private employeesCollection = collection(this.firestore, 'employees');
  employees$: BehaviorSubject<readonly Employee[]> = new BehaviorSubject<
    readonly Employee[]
  >([]);

  constructor(private firestore: Firestore) {
    this.getEmployees().subscribe({
      next: (employees) => {
        this.employees$.next(employees);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  get $(): Observable<readonly Employee[]> {
    return this.employees$;
  }

  getEmployees(): Observable<Employee[]> {
    const employeeRef = collection(this.firestore, 'employees');
    return collectionData(employeeRef, { idField: 'id' }).pipe(
      map((employees: any[]) => employees.map(emp => ({
        ...emp,
        dateOfBirth: emp['dateOfBirth'] ? emp['dateOfBirth'].toDate() : null
      })))
    );    
  }
  

  async addEmployee(employee: Employee): Promise<DocumentReference> {
    try {
      const data = {
        ...employee,
      };

      const docRef = await addDoc(this.employeesCollection, data);
      console.log('Document written with ID: ', docRef.id);
      return docRef;
    } catch (e) {
      console.error('Error adding document: ', e);
      throw e;
    }
  }
}
