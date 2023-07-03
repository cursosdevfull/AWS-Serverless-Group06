import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Auth } from 'aws-amplify';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  fg: FormGroup;

  constructor() {
    this.fg = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {}

  register() {
    const { email, password } = this.fg.value;
    Auth.signUp({
      username: email,
      password,
      attributes: {
        email,
      },
    })
      .then((response) => {
        console.log(response);
      })
      .catch(console.log);
  }
}
