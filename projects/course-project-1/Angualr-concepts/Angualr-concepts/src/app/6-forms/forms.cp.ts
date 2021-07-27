import {Component, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-forms',
  templateUrl: './forms.cp.html',
  styleUrls: ['./forms.cp.css']
})


export class FormsCp {

  @ViewChild('formRef') singupForm: NgForm

  submitted = false
  defaultQuestion = 'pet'
  answer: string;
  genders = ['male', 'female']
  user= {
    username:'',
    email:'',
    secretQuestion: '',
    answer: '',
    gender:'',
  }

  suggestUserName() {
    const suggestedName = 'Superuser';

    // sets the entire form values
    // this.singupForm.setValue({
    //   userData:{
    //     username:suggestedName,
    //     email:''
    //   },
    //   secret:'per',
    //   questionAnswer: '',
    //   gender:'male'
    // })

    // sets a specific value
    this.singupForm.form.patchValue({
      userData: {
        username:suggestedName
      }
    })
  }

  // onSubmit(form: NgForm){
  //
  //
  //   console.log(form)
  // }


  onSubmit() {

    this.submitted = true
    this.user.username = this.singupForm.value.userData.username
    this.user.email= this.singupForm.value.userData.email
    this.user.answer = this.singupForm.value.questionAnswer
    this.user.gender = this.singupForm.value.gender
    this.user.secretQuestion = this.singupForm.value.secret

    // reset the entire form including it's valid state
    this.singupForm.reset()
  }
}
