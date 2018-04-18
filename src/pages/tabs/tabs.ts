import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { ProfilePage } from '../profile/profile';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  profile = ProfilePage;
  gallery = AboutPage;
  chats = ContactPage;

  constructor() {

  }
}
