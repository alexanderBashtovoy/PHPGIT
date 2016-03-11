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
            case "Вход":
                bookService.enter(function (result) {
                    if (result) {
                        $scope.title = "";
                        $scope.logining = true;
                        $("#myModal").modal('hide');
                    }
                    else {
                        $scope.logining = false;
                        $scope.error = "Ошибка входа";
                    }

                }, $scope.login, $scope.password);
                break;
        }
    }

    $scope.onEnter = function () {
        $scope.loginPlaceholder = "Логин";
        $scope.title = "Вход";
        $scope.submit = "Войти";
        $scope.show = false;
        $("#myModal").modal('show');
    }
});