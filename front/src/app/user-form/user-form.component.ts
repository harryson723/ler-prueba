import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RequestService } from '../services/request.service';
import { CommunicationService } from '../services/comunication.service';

@Component({
  selector: 'user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
  imports: [ReactiveFormsModule],
})
export class UserFormComponent {
  public form = signal<FormGroup>(
    new FormGroup({
      nombre: new FormControl(''),
      correo: new FormControl(''),
      edad: new FormControl(0),
    })
  );

  constructor(
    private requestService: RequestService,
    private communicationService: CommunicationService
  ) {}

  createUser(e: any) {
    e.preventDefault();
    console.log({
      name: this.form().get('nombre'),
      email: this.form().get('correo'),
      age: this.form().get('edad'),
    });
    this.requestService
      .post('data/', {
        name: this.form().get('nombre')?.value,
        email: this.form().get('correo')?.value,
        age: this.form().get('edad')?.value,
      })
      .subscribe({
        next: (res) => {
          this.communicationService.notifyUserCreated(res);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }
}
