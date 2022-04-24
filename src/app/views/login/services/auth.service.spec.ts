import { TestBed } from '@angular/core/testing'

import { AuthService } from './auth.service'
import {USERNAME_TOKEN, USERS_URL_TOKEN} from "../../../app.module";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('AuthService', () => {
  let service: AuthService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{
        provide: USERS_URL_TOKEN,
        useValue: ''
      }, { provide: USERNAME_TOKEN, useValue: '' }]
    })
    service = TestBed.inject(AuthService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
