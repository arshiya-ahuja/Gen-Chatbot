import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { StudentService } from '../services/student.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-knowledgebase',
  templateUrl: './knowledgebase.component.html',
  styleUrls: ['./knowledgebase.component.css']
})
export class KnowledgebaseComponent implements OnInit {

  public createKnowledgeBase: FormGroup;
  knowledge: any = [];
  constructor(private fb: FormBuilder, private studentservice: StudentService, private toastr: ToastrService) { }

  @Input('mode') mode: string;
  ngOnInit() {
  }


  createKnowldgeBase() {
    this.createKnowledgeBase = this.fb.group({
      displayName: ['']
    });
  }

  createKb() {
    this.studentservice.createKnowledgeBase(this.createKnowledgeBase.value)
      .subscribe(res => {
        this.knowledge = res;
        console.log('my kb', this.knowledge);
        if (res) {
          this.toastr.success("KnowledgeBase Created Sucessfully");
        }
      })



  }




}
