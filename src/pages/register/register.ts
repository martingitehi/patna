import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseService } from '../../providers/db.service';
import { LocalService } from '../../providers/local.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  profile: Profile
  registerForm: FormGroup;
  constructor(public navCtrl: NavController,
    private dbRef: DatabaseService,
    private formBuilder: FormBuilder,
    private local: LocalService) {
    this.profile = {} as Profile

    this.registerForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      username: ['', Validators.compose([Validators.required, Validators.maxLength(15), Validators.minLength(4)])],
      lifestyle_drinks: Validators.compose([Validators.required]),
      lifestyle_smokes: Validators.compose([Validators.required]),
      relationships_status: Validators.compose([Validators.required]),
      interests_sex: Validators.compose([Validators.required]),
      fullname: ['', Validators.compose([Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      location: ['', Validators.compose([Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      mobile: ['', Validators.compose([Validators.minLength(10), Validators.maxLength(10)])],
      about: ['', Validators.compose([Validators.pattern('[a-zA-Z ]*'), Validators.required,Validators.maxLength(500), Validators.minLength(10)])],
    });
  }
  
  saveProfile() {
    this.dbRef.saveProfile(this.profile).then(res => {
      this.local.presentToast(res.message, 'top', false, 3000)
    }).catch(e => this.local.presentToast(e.message, 'top', false, 3000))
  }

}
