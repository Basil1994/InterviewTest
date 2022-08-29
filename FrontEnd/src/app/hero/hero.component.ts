import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit {
  id = this.actRoute.snapshot.params['id'];
  heroData: any = {};

  constructor(
    public restApi: ApiService,
    public actRoute: ActivatedRoute,
    public router: Router
  ) {
  }

  ngOnInit() {
    this.restApi.getHero(this.id).subscribe((data: {}) => {
      this.heroData = data;
    });
  }

  evolveHero() {
    if (window.confirm('continue to evolve?')) {
      this.restApi.evolveHero(this.id, this.heroData).subscribe(data => {
        this.router.navigate(['/list']);
      });
    }
  }
}
