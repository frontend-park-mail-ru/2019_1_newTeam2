import ajax from '../services/ajax.js';

export class AvatarModel {
    uploadAvatar(file) {
        let formData = new FormData();
        formData.append("file", file);
        ajax.uploadAvatar({
            body: formData
        }).then(
            () => {},
            (err) => {console.log(err)}
        );
    }
}
