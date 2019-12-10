import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SharedData } from '../sharedClass';

@Injectable({
  providedIn: 'root'
})
export class AdminsService {

  constructor(private httpClient: HttpClient) { }
  getAdmins(offset, role_id, status) {
    let URL = `${SharedData.BASE_URL}/admin`;
    return this.httpClient.get(URL, { params: { offset: offset, role_id: role_id, status: status } });
  }
  createNewAdmin(AdminData) {
    let URL = `${SharedData.BASE_URL}/admin/create`;
    return this.httpClient.post(URL, AdminData);
  }
  deleteAdmin(admin_id) {
    let URL = `${SharedData.BASE_URL}/admin/remove`;
    return this.httpClient.post(URL, { id: admin_id });
  }
  changeAdminStatus(admin_id, status) {
    let URL = `${SharedData.BASE_URL}/admin/status/change`;
    return this.httpClient.post(URL, { id: admin_id, status: status });
  }
  editAdmin(AdminData) {
    let URL = `${SharedData.BASE_URL}/admin/edit`;
    return this.httpClient.post(URL, AdminData);
  }
  getAdminByid(id) {
    let URL = `${SharedData.BASE_URL}/admin/${id}`;
    return this.httpClient.get(URL);
  }

  // setting methods
  getSettingData() {
    let URL = `${SharedData.BASE_URL}/setting`;
    return this.httpClient.get(URL);
  }
  updateSettngData(SettingData) {
    let URL = `${SharedData.BASE_URL}/setting/update`;
    return this.httpClient.post(URL, SettingData);
  }
  getPolicesData() {
    let URL = `${SharedData.BASE_URL}/policy`;
    return this.httpClient.get(URL);
  }
  updatePolicesData(PolicesData) {
    let URL = `${SharedData.BASE_URL}/policy/update`;
    return this.httpClient.post(URL, PolicesData);
  }
  gettransData(offset, id) {
    let URL = `${SharedData.BASE_URL}/trans`;
    return this.httpClient.get(URL , {params:{offset , id}});
  }
  updatetransData(transData) {
    let URL = `${SharedData.BASE_URL}/trans/edit`;
    return this.httpClient.post(URL, transData);
  }
  createtransData(transData) {
    let URL = `${SharedData.BASE_URL}/trans/create`;
    return this.httpClient.post(URL, transData);
  }
  removetransData(transData) {
    console.log(transData)
    let URL = `${SharedData.BASE_URL}/trans/remove`;
    return this.httpClient.post(URL,{id :transData} );
  }


  adminSearch(word){
    let URL = `${SharedData.BASE_URL}/adminSearch`;
    return this.httpClient.post(URL , {word : word});
  }
}
