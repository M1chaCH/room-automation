import { Component } from '@angular/core';
import {RoomAutomationService} from "../../services/room-automation.service";
import {MessageDistributorService} from "../../services/message-distributor.service";

@Component({
  selector: 'app-home.page',
  templateUrl: './home.page.component.html',
  styleUrls: ['./home.page.component.scss']
})
export class HomePageComponent {

  constructor(
    private automationService: RoomAutomationService,
    private messageDistributor: MessageDistributorService,
  ) { }

  clicked() {
    this.automationService.toggleRoom().subscribe(response => {
      const power: string = response.on ? "on" : "off";
      if(response.success)
        this.messageDistributor.pushMessage("INFO", "powered room " + power);
      else
        this.messageDistributor.pushMessage("ERROR", "powered room " + power + " WITH ERRORS");
    });
  }
}
