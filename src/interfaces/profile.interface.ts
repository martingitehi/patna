interface Profile {
  about: string;
  avatar_url: string;
  career: string;
  contact: Contact;
  dob: Date;
  fullname: string;
  gender: string;
  health: Health;
  interests: Interests;
  lifestyle: Lifestyle;
  location: string;
  nationality: string;
  physique: Physique;
  promo_code: string;
  relationships: Relationships;
  social: Social;
  username: string;
}

interface Social {
  fb: string;
  instagram: string;
}

interface Relationships {
  family: Family;
  goal: string;
  status: string;
}

interface Family {
  has_kids: string;
  no_of_kids: number;
}

interface Physique {
  complexion: string;
  height: number;
  weight: number;
}

interface Lifestyle {
  drinks: string;
  smokes: string;
}

interface Interests {
  others: string[];
  sex: string;
}

interface Health {
  disability: Disability;
  hiv_status: Hivstatus;
}

interface Hivstatus {
  last_tested: string;
  status: string;
}

interface Disability {
  disability_type: string;
  is_disabled: string;
}

interface Contact {
  email: string;
  mobile: string;
}