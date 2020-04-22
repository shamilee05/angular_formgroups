import { Component, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
 
@Component({
 selector: 'app-form-group',
 templateUrl: 'formgroup.component.html',
 styleUrls: ['formgroup.component.css'],
})
export class FormGroupDemoComponent implements AfterViewInit {
 usrNameChanges: string;
 usrNameStatus: string;
 formSubmitted = false;
 profiles = [
   { name: 'Machine Learning', shortName: 'ml' },
   { name: 'Internet of Things', shortName: 'iot' },
   { name: 'Thermodynamics', shortName: 'thd' },
 ];
 userForm = new FormGroup({
   name: new FormControl('', [Validators.required, Validators.maxLength(10)]),
   rollno: new FormControl('', Validators.required),
   profile: new FormControl(this.profiles[1].shortName),
   users: new FormArray([new FormControl('Shamilee'), new FormControl()]),
 });
 get userName(): any {
   return this.userForm.get('name');
 }
 ngAfterViewInit(): void {
   this.userForm
     .get('name')
     .valueChanges.subscribe((data) => (this.usrNameChanges = data));
   this.userForm
     .get('name')
     .statusChanges.subscribe((data) => (this.usrNameStatus = data));
 }
 onFormSubmit(): void {
   this.formSubmitted = true;
   if (this.userForm.valid) {
     this.logData();
     this.resetForm();
   } else {
     this.formSubmitted = false;
   }
 }
 resetForm() {
   this.userForm.reset();
 }
 setDefaultValue() {
   this.userForm.patchValue({
     name: 'Shamilee',
     profile: this.profiles[2].shortName,
     rollno: '1611046',
   });
 }
 setRollno() {
   this.userForm.get('rollno').setValue('1611046');
 }
 get users(): FormArray {
   return this.userForm.get('users') as FormArray;
 }
 addUserField() {
   this.users.push(new FormControl());
 }
 deleteUserField(index: number) {
   this.users.removeAt(index);
 }
 logData() {
   console.log('Name:' + this.userForm.get('name').value);
   console.log('Roll number:' + this.userForm.get('rollno').value);
   console.log('Gender:' + this.userForm.get('gender').value);
   console.log('Course:' + this.userForm.get('profile').value);
 
   //Iterate FormArray
   for (let i = 0; i < this.users.length; i++) {
     console.log(this.users.at(i).value);
   }
   // Gives complete FormArray data
   console.log(this.users.value);
   //Checks FormArray validation
   console.log(this.users.valid);
   // Gives Complete form data
   console.log(this.userForm.value);
   // checks Complete form validation
   console.log(this.userForm.valid);
 }
}
