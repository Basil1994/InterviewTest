import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-heroes-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})


export class ListComponent implements OnInit {

  Hero: any = [];
  hero: any = null;
  showUpdates = false;

  constructor(
    public restApi: ApiService,
    public actRoute: ActivatedRoute,
    public router: Router
  ) { }

  getRandomColor2() {
    let length = 6;
    const chars = '0123456789ABCDEF';
    let hex = '#';
    while (length--) { hex += chars[(Math.random() * 16) | 0]; }
    return hex;
  }

  getRandomColor() {
    const color = Math.floor(0x1000000 * Math.random()).toString(16);
    return '#' + ('000000' + color).slice(-6);
  }

  ngOnInit() {
    this.loadHeroes();
  }

  loadHeroes() {
    return this.restApi.getHeroes().subscribe((data: {}) => {
      this.Hero = data;
    });
  }


  evolveHero(name) {
    if (window.confirm('Are you sure, you want to evolve?')) {
      this.restApi.evolveHero(name, this.Hero).subscribe(data => {
        console.log(data);
        this.hero = data;
        this.showUpdates = true;
        this.router.navigate(['/list']);
      });
    }
  }

  deleteHero(id) {
    if (window.confirm('Are you sure, you want to delete?')) {
      this.restApi.deleteHero(id).subscribe(data => {
        this.loadHeroes();
      });
    }
  }

}
