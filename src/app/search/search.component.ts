import {Component, OnInit} from '@angular/core';
import {
    ActivatedRoute,
    Routes,
    Router
} from '@angular/router';

import {SpotifyService} from '../spotify.service';
@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css'],
    providers: [SpotifyService]
})
export class SearchComponent implements OnInit {

    query: string;
    results: Object;

    constructor(private spotify: SpotifyService,
                private router: Router,
                private route: ActivatedRoute) {
        this.route.queryParams.subscribe(params => {this.query = params['query'] || '';})
    }

    ngOnInit() {
        this.search();
    }

    submit(query: string): void {
        this.router.navigate(['search'], {queryParams: {query: query}}).then(_ => this.search())
    }

    search(): void {
        console.log('search', this.query);
        if (!this.query) {
            return;
        }
        this.spotify.searchByTrack(this.query).subscribe((res: any) => this.renderResults(res));
    }

    renderResults(res: any): void {
        this.results = null;
        if (res && res.tracks && res.tracks.items) {
            this.results = res.tracks.items;
        }
    }

}