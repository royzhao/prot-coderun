/**
 * Created by Administrator on 2015/4/21.
 */
angular.module('Image')
    .service('sharedProperties', function () {
        var image = {};
        var create = false;
        var edit = false;
        return {
            createImages: function (value) {
                create = true;
                image = value;
            },
            editImages: function (value) {
                edit = true;
                image = value;
            },
            getImage: function () {
                return image;
            },
            isCreate:function() {
                return create;
            },
            isEdit:function() {
                return edit;
            },
            imageCreated: function() {
                image = {};
                create = false;
            },
            imageEdited: function() {
                image = {};
                edit = false;
            }
        };
    })