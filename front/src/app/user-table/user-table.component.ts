import { Component, OnInit } from '@angular/core';
import { RequestService } from '../services/request.service';
import { Observable, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { CommunicationService } from '../services/comunication.service';

@Component({
  selector: 'user-table',
  imports: [CommonModule],
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss'],
})
export class UserTableComponent implements OnInit {
  public users$!: Observable<any>;

  constructor(
    private requestService: RequestService,
    private communicationService: CommunicationService
  ) {}

  ngOnInit(): void {
    this.getAll();
    this.communicationService.userCreated$.subscribe((user) => this.getAll());
  }

  getAll() {
    this.requestService.get('data/').subscribe({
      next: (res: any) => {
        if (res.data && res.data.length > 0) {
          this.users$ = of(res.data);
        }
        console.log(res);
      },
      error: (err) => console.log(err),
    });
  }
}
