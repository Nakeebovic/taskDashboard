import { Injectable } from '@angular/core';
import { SharedData } from '../sharedClass';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CouponService {
  constructor(private http :HttpClient) { }
  getAllpromo(offset) {
    let URL = `${SharedData.BASE_URL}/promo`;
    return this.http.get(URL, { params: { offset} });
  }
  createNewpromo(promoData) {
    let URL = `${SharedData.BASE_URL}/promo/create`;
    return this.http.post(URL, promoData);
  }
  editpromo(promoData) {
    let URL = `${SharedData.BASE_URL}/promo/edit`;
    return this.http.post(URL, promoData);
  }
  removepromo(promo_id) {
    let URL = `${SharedData.BASE_URL}/promo/remove`;
    return this.http.post(URL, { id: promo_id });
  }
  getpromoById(id) {
    let URL = `${SharedData.BASE_URL}/promo/${id}`;
    return this.http.get(URL);
  }

}
