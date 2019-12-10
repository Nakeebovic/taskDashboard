import { Component, OnInit, ViewChild } from '@angular/core';
import LocationPicker from "location-picker";
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { SharedData } from 'app/shared/sharedClass';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete/ngx-google-places-autocomplete.directive';

@Component({
  selector: 'app-pick-point',
  templateUrl: './pick-point.component.html',
  styleUrls: ['./pick-point.component.scss']
})

export class PickPointComponent implements OnInit {
  @ViewChild("places") places : GooglePlaceDirective;

  lp: LocationPicker;
  options = {
    types: [],
    // componentRestrictions: { country: 'UA' }
  }
  constructor(public bsModalRef: BsModalRef) { }
  ngOnInit() {
    this.lp = new LocationPicker('map', {
      setCurrentPosition: true, // You can omit this, defaults to true
    });
  }
  onSaveClicked() {
    SharedData.SelectedPoint = this.lp.getMarkerPosition();
    this.bsModalRef.hide();
  }
  handleAddressChange(event){
    console.log(event);
    this.lp.setLocation(event.geometry.location.lat() , event.geometry.location.lng())
  }
}
