import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-encrypt',
  templateUrl: './encrypt.component.html',
  styleUrls: ['./encrypt.component.css']
})
export class EncryptComponent implements OnInit {

  constructor() { }
  p = new FormControl('');
  q = new FormControl('');
  e = new FormControl('');
  e_msg : string;
  e_valid : boolean = false;
  n : number = null;
  phi : number = null;
  d : number = null;

  @Input() asciiMessage : string;
  cypherText : string;



  ngOnInit() {
    this.q.valueChanges.subscribe(val => {
      if (this.p.value*1>0&&this.q.value*1>0) {
        this.calcPhi();
        this.calcN();
      };
    });

    this.p.valueChanges.subscribe(val => {
    if (this.p.value*1>0&&this.q.value*1>0) {
        this.calcPhi();
        this.calcN();
      };
    });

    this.e.valueChanges.subscribe(val => {
      if (this.p.value*1>0&&this.q.value*1>0) {
        if(this.recursivegGT(val, this.phi) != 1) {
            this.e_msg = val + " and " + this.phi + " are NOT relatively prime.";
            this.e_valid = false;
        }
        else {
            this.e_msg = val + " and " + this.phi + " are relatively prime.";
            this.e_valid = true;
        }
      }
    });
  }

  calcPhi() : void {
    this.phi=(this.p.value*1-1)*(this.q.value*1-1);
  };

  calcN() : void {
    this.n=this.p.value*1*this.q.value*1;
  };

  recursivegGT(a : number, b : number) : number{
        if (b == 0) {
            return a;
        }
        if (a < b) {
            return this.recursivegGT(b, a);
        }
        return this.recursivegGT(b, a % b);
  }

  toAsciiTriple (fragment : number) : string {
          let asciiTriple = "";
          if (fragment<100) {
              asciiTriple+="0";
          }
          return asciiTriple+=fragment;
  }

  privateKey () : void {
    let _d : number = 0;
    let z : number = 0;
    let _e = this.e.value;
    let _phi = this.phi;
    while (z!=1 && _d<1000) {
      z = (_d*parseInt(_e))%_phi;
      _d++;
      }
    this.d = _d;
    }


  encrypt () : void {
  if (this.n > 0 && this.phi> 0 && this.e.value*1 > 0) {
    this.cypherText="";
    var v : number;
      let l = 0;
      while (l<this.asciiMessage.length) {
        v = parseInt(this.asciiMessage.substring(l, l+3));
        let _c = Math.pow(v, this.e.value)%this.n;
        if (_c<10) {
          this.cypherText+="00";
        }
        else if (_c<100) {
          this.cypherText+="0";
        }
        this.cypherText+=_c;
      l+=3;
      }
    }
  }

}
