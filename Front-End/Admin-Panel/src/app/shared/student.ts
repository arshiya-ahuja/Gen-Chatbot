import { StaticInjector } from '@angular/core/src/di/injector';

export interface Student {
    rollNo: string;
    firstName: string;
    middleName?: string;
    lastName: string;
    email?: string;
    mobile?: string;
    password?: string
}
