import {Controller} from 'Controllers/Controller.js';
import {Profile} from 'Views/Profile/Profile.js';
import {UserModel} from 'Models/UserModel.js';
import {AvatarModel} from 'Models/AvatarModel.js';

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

    _onuseruploadavatar(data) {
        this.avatar.uploadAvatar(data);
    }

    _onedituser(data) {
        this.user.updateUser(data.id, data);
        this.user.getSelf();
    }
}