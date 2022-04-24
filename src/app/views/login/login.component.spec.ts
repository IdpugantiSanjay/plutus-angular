import { ComponentFixture, TestBed } from '@angular/core/testing'

import { LoginComponent } from './login.component'
import { AuthService } from './services/auth.service'
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {RouterTestingModule} from "@angular/router/testing";
import {LoginFormComponent} from "../../components/forms/login-form/login-form.component";

describe('LoginComponent', () => {
  let component: LoginComponent
  let fixture: ComponentFixture<LoginComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule],
      declarations: [LoginComponent, LoginFormComponent],
      providers: [
        FormBuilder,
        {
          provide: AuthService,
          useValue: {
            login: () => {},
          },
        },
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(LoginComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
