import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";

@Component({
  selector: 'app-reactiveForms',
  templateUrl: './reactive-forms.cp.html',
  styleUrls: ['./reactive-forms.cp.css']
})
export class ReactiveFormsCp implements OnInit {
  genders = ['male', 'female'];

  signupForm: FormGroup;
  forbiddenUsername = ['chris', 'Anna'];

  ngOnInit(): void {

    this.signupForm = new FormGroup({
      // nested form group
      'userData': new FormGroup({
        'username': new FormControl(null, [
          Validators.required,
          // passing the custom validation function by binding it using this keyword so that Angular
          // know to which class (object) this method belongs to
          this.forbiddenNames.bind(this)]),
        'email': new FormControl(
          null, [Validators.required, Validators.email],

          // async validator. Note: we dont need call bind because we are not using 'this.' in the method
          this.forbiddenEmails
        ),
      }),
      'gender': new FormControl('male'),
      // an array of form controls
      'hobbies': new FormArray([])
    })

    //listen to form values changes

    // this.signupForm.valueChanges.subscribe(
    //   (value)=>{
    //     console.log(value)
    // })

    // listen to form status changes
    this.signupForm.statusChanges.subscribe(
      (value)=>{
        console.log(value)
      })


    // pre setting the values of the entire form
    this.signupForm.setValue({
      'userData':{
        'username': 'adam',
        'email': 'adam@test.com',
      },
      'gender': 'male',
      'hobbies': []
    })


    // preseting only a specific value
    this.signupForm.patchValue({
      'userData':{
        'username': 'Anna',

      }})
  }

  onSubmit() {
    console.log(this.signupForm)
  }

  onAddHobbies() {

    // create a new form control
    const control = new FormControl(null, Validators.required);

    // push the form controll to FormArray
    (<FormArray>this.signupForm.get('hobbies')).push(control)
  }

  // this is used to retrieve hobbies array in template
  getControls() {
    return (<FormArray>this.signupForm.get('hobbies')).controls;
  }

  // Custom validation function that checks if a userName cannot be used
  // [s: string]: boolean  is a typeScript return type signature which is key-value pair where the key is string and
  // the value is boolean
  forbiddenNames(control: FormControl): { [s: string]: boolean } {
    // search for a match of a username that was passed by the Angular validator mechanism
    if (this.forbiddenUsername.indexOf(control.value) !== -1) {
      // return an object with same  return signature  [s: string]: boolean setting the value to true
      return {'nameIsForbidden': true}
    }
    // we must return null if our condition above fails that's how Angular validation works for custom
    // validation function
    return null
  }

  // async validator

  forbiddenEmails(control: FormControl): Promise<any> | Observable<any>{


    const promise = new Promise<any>((resolve, reject)=>{
      setTimeout(()=>{
        if (control.value === 'test@test.com'){
          resolve({'emailIsForbidden':true})
        }else{
          resolve(null)
        }
      },1500)
    })

    return promise

  }
}
