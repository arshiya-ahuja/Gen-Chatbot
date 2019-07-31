import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StudentService } from '../../services/student.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-student-signin',
  templateUrl: './student-signin.component.html',
  styleUrls: ['./student-signin.component.css']
})
export class StudentSigninComponent implements OnInit {
  login: FormGroup;
  message: string;
  public data: any = [];
  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.createStudentForm();
  }

  createStudentForm() {
    this.login = this.fb.group({
      email: ['', Validators.compose([Validators.minLength(5), Validators.maxLength(45)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(20)])]
    });

  }


  submitData() {
    debugger;
    this.studentService.logIn(this.login.value)
      .subscribe(res => {
        this.data = res
        console.log("my response is", res);
        sessionStorage.setItem('token', res.token);
        debugger;
        sessionStorage.setItem('user', res.user.roletype);
        if (res) {
          this.toastr.success('Login Sucessfully');
          this.router.navigate(['/company/dashboard']);
        }
        else {
          this.router.navigate(['/signin']);
          this.toastr.error(res.msg);
        }
      });
  }

}
