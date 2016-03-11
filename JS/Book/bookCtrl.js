/**
 * Created by SHOOROOP on 07.03.2016.
 */
'use strict';

bookApp.controller('bookController', function ($scope, $log, bookService) {
    $scope.records = [];

    $scope.init = function ()
    {
        var login = $.cookie('login');

        if(login && $.cookie('token'))
        {
            $scope.login = login;
            $scope.logining = true;
        }
        else
        {
            $scope.logining = false;
        }

        bookService.getRecords(function (records) {
            //$(document.body).html(records);
            //if(records == null )
            $scope.records = records;
            //$log.info($scope.records);
        });
    };

    $scope.modalSubmit = function () {
        switch ($scope.title) {
            case "Добавить сообщение":
                bookService.addMessage(function (records) {
                    if (records != null && records != "") {
                        $scope.records = records;
                        $scope.title = "";
                        $("#myModal").modal('hide');
                        //location.reload();
                    }
                    else {
                        $scope.error = "Ошибка";
                    }

                }, $scope.login, $scope.message);
                location.reload();
                break;
        }
    }

    $scope.onAddMessage = function () {
        if ($scope.logining) {

        }
        else {
            $scope.loginPlaceholder = "Назовите себя";
        }

        $scope.title = "Добавить сообщение";
        $scope.submit = "Отправить";
        $scope.show = true;
        $("#myModal").modal('show');
    }
});