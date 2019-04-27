import {Controller} from '/controllers/Controller.js';
import {Profile} from '/views/Profile/Profile.js';
import {UserModel} from '/models/UserModel.js';
import {AvatarModel} from '/models/AvatarModel.js';

export class ProfileController extends Controller {
    index() {
        this.avatar = new AvatarModel();
        this.view = new Profile();
        this.view.render();
        this.user = new UserModel();
        this.user.getSelf();
        
        this.listeners = new Set ([
            ['user-upload-avatar', this._onuseruploadavatar],
            ['edit-user', this._onedituser],
        ]);

        super.subscribeAll();
    }

    _onuseruploadavatar() {
        this.avatar.uploadAvatar;
    }

    _onedituser(data) {
        this.user.updateUser(data.id, data);
    }
}