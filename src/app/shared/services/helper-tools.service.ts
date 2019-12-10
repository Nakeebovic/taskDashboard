import swl, { SweetAlertType } from 'sweetalert2';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
@Injectable({
  providedIn: 'root'
})
export class HelperToolsService {

  constructor(private translate: TranslateService) { }

  showAlertWithTranslation(titleKey, MessageKey, swlType: SweetAlertType) {
    this.translate.get([titleKey, MessageKey]).subscribe(keys => {
      swl(keys[titleKey], keys[MessageKey], swlType);
    }, err => {

    });
  }
  showConfirmAlert(titleKey, MessageKey) {
    return new Promise((resolve, reject) => {
      this.translate.get([titleKey, MessageKey, 'confirm', 'cancel']).subscribe(keys => {
        swl({
          title: keys[titleKey],
          text: keys[MessageKey],
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: keys['confirm'],
          cancelButtonText: keys['cancel']
        }).then((result) => {
          if (result.value) {
            resolve('done');
          } else {
            reject('error');
          }
        })
      }, err => {
        reject(err);
      })
    })
  }
}
