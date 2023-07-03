import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Auth } from 'aws-amplify';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css'],
})
export class ConfirmComponent implements OnInit {
  fg: FormGroup;

  constructor() {
    this.fg = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      code: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {}

  confirm() {
    const { email, code } = this.fg.value;

    Auth.confirmSignUp(email, code)
      .then((response) => {
        console.log(response);
      })
      .catch(console.log);
  }
}
