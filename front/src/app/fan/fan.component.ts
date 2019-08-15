import { Component, OnInit } from '@angular/core';
import {FanService} from "./fan.service";

@Component({
  selector: 'app-fan',
  templateUrl: './fan.component.html',
  styleUrls: ['./fan.component.scss']
})
export class FanComponent implements OnInit {
  public fans: any;
  constructor(private fanService: FanService) { }

  ngOnInit() {
    this.fanService.list().subscribe(result => {
      this.fans = result;
      console.log(this.fans);
    })
  }

}
