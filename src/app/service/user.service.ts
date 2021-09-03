import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUserList() {
    return this.http.get<{ results: SystemUser[] }>(API_URL + '/systemusers').toPromise();
  }

  getUser(id: string) {
    return this.http.get<SystemUser>(API_URL + "/systemusers/" + id).toPromise();
  }

  addUser(user: SystemUser) {
    return this.http.post<SystemUser>(API_URL + '/systemusers', user).toPromise();
  }

  updateUser(user: SystemUser) {
    return this.http.put<SystemUser>(API_URL + '/systemusers/' + user.id, user).toPromise();

  }

  deleteUser(userId: string) {
    return this.http.delete<SystemUser>(API_URL + '/systemusers/' + userId).toPromise();
  }

}

export interface SystemUser {
  account_locked: boolean;
  account_locked_date: null;
  activated: boolean;
  addresses: {
    type: 'work' | 'home';
    country: string;
    locality: string;
    poBox: string;
    postalCode: string;
    region: string;
    streetAddress: string;
  }[];
  allow_public_key: boolean;
  attributes: [],
  company: string;
  costCenter: string;
  department: string;
  description: string;
  disableDeviceMaxLoginAttempts: boolean;
  displayname: string;
  email: string;
  employeeIdentifier: string;
  employeeType: string;
  enable_managed_uid: boolean;
  enable_user_portal_multifactor: boolean;
  external_dn: string;
  external_source_type: string;
  externally_managed: boolean;
  firstname: string;
  jobTitle: string;
  lastname: string;
  ldap_binding_user: boolean;
  location: string;
  managedAppleId: string;
  manager: null;
  mfa: {
    exclusion: boolean;
    configured: boolean
  };
  middlename: string;
  password_never_expires: boolean;
  passwordless_sudo: boolean;
  phoneNumbers: {
    number: string;
    type: string;
  }[];
  samba_service_user: boolean;
  ssh_keys: [];
  state?: string;
  sudo: boolean;
  suspended: boolean;
  systemUsername?: string;
  unix_guid?: number;
  unix_uid?: number;
  username: string;
  created?: string;
  password_expired: boolean;
  totp_enabled: boolean;
  _id?: string;
  id?: string;
}
