import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

    messageControl = new FormControl('');
    asciiMessage :string = "";
    asciiCypherText : string ="";


  ngOnInit() {
    this.messageControl.valueChanges.subscribe(val => {
      this.convertToAsciiTriple();
    });
  }


  convertToAsciiTriple () : void {
  console.log(this.messageControl.value.length);
  this.asciiMessage = "";
  let message = this.messageControl.value;
        for(let i = 0; i<message.length; i++){
            if (message.charCodeAt(i)<100) {
                this.asciiMessage+="0";
            }
            this.asciiMessage+=message.charCodeAt(i);
        }
        console.log(this.asciiMessage);
  }

}
