import ajax from '../services/ajax.js';

export class AvatarModel {
    uploadAvatar(file) {
        console.log('here');
        let formData = new FormData();
        formData.append("file", file);
        ajax.uploadAvatar({
            body: formData
        })
        .then((res) => {
        })
        .catch((err) => {
            console.log(err)
        })
    }
}
