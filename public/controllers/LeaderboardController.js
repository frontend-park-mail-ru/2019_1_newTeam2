import {UserModel} from '/models/UserModel.js';
import {Leaderboard} from '/views/Leaderboard/Leaderboard.js';
import bus from '/services/bus.js';


export class LeaderboardController {
    index() {
        this.view = new Leaderboard();
        this.view.render();
        this.users = new UserModel();

        this.rows = 10;
        this.page = 1;

        this.users.getUsers(this.rows, this.page);

        bus.on('prev-page', this._onprevpage, this);
        bus.on('next-page', this._onnextpage, this);
    }

    _onprevpage() {
        this.page = this.page < 2 ? 1 : this.page - 1;
        this.users.getUsers(this.rows, this.page);
    }

    _onnextpage() {
        this.page++;
        this.users.getUsers(this.rows, this.page);
    }

    preventAllEvents() {
        this.view.preventAllEvents();
        bus.off('prev-page', this._onprevpage);
        bus.off('next-page', this._onnextpage);
    }
}