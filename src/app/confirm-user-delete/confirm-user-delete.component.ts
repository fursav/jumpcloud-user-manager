import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-user-delete',
  templateUrl: './confirm-user-delete.component.html',
  styleUrls: ['./confirm-user-delete.component.css']
})
export class ConfirmUserDeleteComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: ConfirmUserDeleteData) { }

  ngOnInit(): void {
  }

}

interface ConfirmUserDeleteData {
  count: number;
}