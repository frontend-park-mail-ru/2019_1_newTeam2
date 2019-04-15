import {Profile} from "/views/Profile/Profile.js";
import {UserModel} from "/models/UserModel.js";
import bus from "/services/bus.js";
import {AvatarModel} from "/models/AvatarModel.js";

export class ProfileController {
    index() {
        this.avatar = new AvatarModel();
        this.view = new Profile();
        this.view.render();
        this.user = new UserModel();
        this.user.getSelf();
        bus.on('user-upload-avatar', this.avatar.uploadAvatar);
        this._onedituser = (data) => {
            this.user.updateUser(data.id, data);
        };
        bus.on('edit-user', this._onedituser);
    }

    preventAllEvents() {
        this.view.preventAllEvents();
        bus.off('user-upload-avatar', this.avatar.uploadAvatar);
        bus.off('edit-user', this._onedituser);
    }
}