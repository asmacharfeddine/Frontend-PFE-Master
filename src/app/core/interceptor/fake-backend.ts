import { Injectable, OnInit } from '@angular/core';
import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { User } from '../models/user';
import { Role } from '../models/role';
import { UserService } from 'app/admin/structure/human-resource/user.service';
import { User as HumanResouceUser } from 'app/admin/structure/human-resource/user.model';
const users: User[] = [
  {
    id: 1,
    img: 'assets/images/user/admin.jpeg',
    username: 'admin@hospital.org',
    password: 'admin@123',
    firstName: 'Liam',
    lastName: 'Johnson',
    role: Role.Admin,
    token: 'admin-token',
  },
 /* {
    id: 2,
    img: 'assets/images/user/doctorr.jpg',
    username: 'doctor@hospital.org',
    password: 'doctor@123',
    firstName: 'Ashton',
    lastName: 'Cox',
    role: Role.Doctor,
    token: 'doctor-token',
  },*/
  {
    id: 3,
    img: 'assets/images/user/patient.jpg',
    username: 'patient@hospital.org',
    password: 'patient@123',
    firstName: 'Cara',
    lastName: 'Stevens',
    role: Role.Patient,
    token: 'patient-token',
  },
  {
    id: 4,
    img: 'assets/images/user/nurse.jpeg',
    username: 'staff@hospital.org',
    password: 'staff@123',
    firstName: 'Cara',
    lastName: 'Stevens',
    role: Role.Staff,
    token: 'staff-token',
  },
  {
    id: 5,
    img: 'assets/images/user/femaleDoc.jpg',
    username: 'abir@hospital.org',
    password: 'abir@123',
    firstName: 'Abir',
    lastName: 'Hassine',
    role: Role.Doctor,
    token: 'doctor-token',
  },
  {
    id: 6,
    img: 'assets/images/user/doctorr.jpg',
    username: 'anes@hospital.org',
    password: 'anes@123',
    firstName: 'Anes',
    lastName: 'Charfeddine',
    role: Role.Doctor,
    token: 'doctor-token',
  },

   {
    id: 7,
    img: 'assets/images/user/nurse.jpeg',
    username: 'maissa@hospital.org',
    password: 'maissa@123',
    firstName: 'Maissa',
    lastName: 'Frej',
    role: Role.Staff,
    token: 'staff-token',
  },

   {
    id: 8,
    img: 'assets/images/user/maleNurse.jpg',
    username: 'hedi@hospital.org',
    password: 'hedi@123',
    firstName: 'Hedi',
    lastName: 'Mabrouk',
    role: Role.Staff,
    token: 'staff-token',
  },
  {
    id: 9,
    img: 'assets/images/user/asma.jpg',
    username: 'asma@hospital.org',
    password: 'asma@123',
    firstName: 'Asma',
    lastName: 'Charfeddine',
    role: Role.Doctor,
    token: 'doctor-token',
  },
  {
    id: 10,
    img: 'assets/images/user/mohamed.jpg',
    username: 'mohamed@hospital.org',
    password: 'mohamed@123',
    firstName: 'Mohamed',
    lastName: 'Charfeddine',
    role: Role.Staff,
    token: 'staff-token',
  },

];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor, OnInit {

  usersList: HumanResouceUser[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    console.log(this.usersList)
  }

  getUsersList(): void{
    this.userService.getUsers().subscribe((users) => {
      this.usersList = users;
    });
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = request;
    // wrap in delayed observable to simulate server api call
    return of(null).pipe(mergeMap(handleRoute));

    function handleRoute() {
      switch (true) {
        case url.endsWith('/authenticate') && method === 'POST':
          return authenticate();
        default:
          // pass through any requests not handled above
          return next.handle(request);
      }
    }

    // route functions

    function authenticate() {
      const { username, password } = body;
      const user = users.find(
        (x) => x.username === username && x.password === password
      );
      if (!user) {
        return error('Username or password is incorrect');
      }
      return ok({
        id: user.id,
        img: user.img,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        token: user.token,
      });
    }

    // helper functions

    function ok(body?: {
      id: number;
      img: string;
      username: string;
      firstName: string;
      lastName: string;
      role: Role;
      token: string;
    }) {
      return of(new HttpResponse({ status: 200, body }));
    }

    function error(message: string) {
      return throwError({ error: { message } });
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    function unauthorized() {
      return throwError({ status: 401, error: { message: 'Unauthorised' } });
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    function isLoggedIn() {
      return headers.get('Authorization') === 'Bearer fake-jwt-token';
    }
  }
}

export const fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true,
};
