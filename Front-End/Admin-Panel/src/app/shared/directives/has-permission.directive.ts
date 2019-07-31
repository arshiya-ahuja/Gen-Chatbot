import { Directive, TemplateRef, ViewContainerRef, Input } from '@angular/core';
import { NgIfContext } from '@angular/common';
import { StudentService } from '../../services/student.service';

@Directive({
  selector: '[appHasPermission]'
})
export class HasPermissionDirective {

  constructor(
    private templateRef: TemplateRef<NgIfContext>,	private viewContainer: ViewContainerRef , private studentservice:StudentService) { }
    @Input('appHasPermission') set appHasPermission(condition: string) {  
      const type = sessionStorage.getItem('user');
      if(type === condition || condition=='all'  )
      {
        this.viewContainer.createEmbeddedView(this.templateRef);
      }
      else {
        this.viewContainer.clear();
      }
    }

}
