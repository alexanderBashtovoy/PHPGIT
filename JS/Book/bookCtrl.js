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
            case "Регистрация":
                bookService.registration(function (token) {
                    if (token != null && token != "") {
                        $scope.title = "";
                        //$("#modalTitle").html("");
                        //$("#submit").html("");
                        $scope.logining = true;
                        $("#myModal").modal('hide');
                    }
                    else {
                        $scope.logining = false;
                        $scope.error = "Ошибка";
                    }

                }, $scope.login, $scope.password);
                break;
        }

    }

    $scope.onReg = function () {
        $scope.loginPlaceholder = "Логин";
        $scope.title = "Регистрация";
        $scope.submit = "Зарегистрироваться";
        $scope.show = false;
        $("#myModal").modal('show');
    }

    $scope.onLogOut = function () {
        bookService.logOut(function (result) {
            if (result) {
                $scope.logining = false;
                $scope.login = "";
                $scope.password = "";
            }
            else {
                $scope.error = "Ошибка";
            }

        }, $scope.login);
    }
});