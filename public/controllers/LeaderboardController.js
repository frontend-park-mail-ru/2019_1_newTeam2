import {UserModel} from "../models/UserModel.js";
import {Leaderboard} from "../views/Leaderboard/Leaderboard.js";
import bus from "../services/bus.js";


export class LeaderboardController {
    index({rows = 10, page = 1}) {
        this.users = new UserModel();
        this.users.getUsers(rows, page);
        this.view = new Leaderboard();
        this.view.render();

        this._onprevpage = () => {
            page = page < 2 ? 1 : page - 1;
            this.users.getUsers(rows, page);
        };
        bus.on('prev-page', this._onprevpage);

        this._onnextpage = () => {
            page++;
            this.users.getUsers(rows, page);
        };
        bus.on('next-page', this._onnextpage);
    }

    preventAllEvents() {
        this.view.preventAllEvents();
        bus.off('prev-page', this._onprevpage);
        bus.off('next-page', this._onnextpage);
    }
}