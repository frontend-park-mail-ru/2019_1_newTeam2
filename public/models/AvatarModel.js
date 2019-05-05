import ajax from 'Services/ajax.js';

export class AvatarModel {
    uploadAvatar(file) {
        let formData = new FormData();
        formData.append('file', file);
        ajax.uploadAvatar({
            body: formData
        })
            .then(() => {
            })
            .catch(() => {
                // TODO(gleensande): обработка ошибки
                console.log('ошибка при загрузке аватара');
            });
    }
}
