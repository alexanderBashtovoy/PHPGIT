/**
 * Created by SHOOROOP on 07.03.2016.
 */
var bookApp = angular.module('bookApp',[]);

$(document).ready(function(){
    $(function () {

        $('#inputForm').validate({
            highlight: function (element, errorClass) {
                $(element).addClass("invalidElem");
            },
            unhighlight: function (element, errorClass) {
                $(element).removeClass("invalidElem");
            },
            errorElement: "div",
            errorClass: "errorMsg"
        });

        $.validator.addClassRules({
            inputValidation: {
                required: true,
            }
        })

        $('input').addClass("inputValidation").change(function (e) {
            $('#inputForm').validate().element($(e.target));
        });

        $('#login').each(function (index, elem) {
            $(elem).rules("add", {
                required: true,
                messages: {
                    required: "Поле обязательно к заполнению",
                }
            });
        });
    });
});

