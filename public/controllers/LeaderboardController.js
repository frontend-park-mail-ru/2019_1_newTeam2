import {Controller} from 'Controllers/Controller.js';
import {UserModel} from 'Models/UserModel.js';
import {Leaderboard} from 'Views/Leaderboard/Leaderboard.js';


export class LeaderboardController extends Controller {
    index() {
        this.view = new Leaderboard();
        this.view.render();
        this.users = new UserModel();

        this.rows = 10;
        this.page = 1;

        this.users.getUsers(this.rows, this.page);

        this.listeners = new Set ([
            ['prev-page', this._onprevpage],
            ['next-page', this._onnextpage],
        ]);

        super.subscribeAll();
    }

    _onprevpage() {
        this.page = this.page < 2 ? 1 : this.page - 1;
        this.users.getUsers(this.rows, this.page);
    }

    _onnextpage() {
        this.page++;
        this.users.getUsers(this.rows, this.page);
    }
}