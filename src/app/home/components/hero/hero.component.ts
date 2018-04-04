import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-hero',
  template: `<div>
                <img [src]="imgSrc"  /> 
            </div>`,
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit {
  public imgSrc :  string ="https://www.metmuseum.org/toah/images/hb/hb_1983.406.jpg";

  constructor() { }

  ngOnInit() { }


}
