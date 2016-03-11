/**
 * Created by SHOOROOP on 07.03.2016.
 */
bookApp.factory('bookService', function ($http, $log) {

    return{
        getRecords: function (callback) {
            $http({
                method: "POST",
                url: "PHP/records.php",
                data:{
                    command: "getRecords"
                }
            }).success(function (records, status, headers, config) {
                var reg = /\[.*\]/;
                var tru = reg.test(records);

                if(tru)
                {
                    records = reg.exec(records)[0];
                    records = $.parseJSON(records);
                }

                callback(records);
            })
        },
        registration: function (callback, login, password) {
            $http({
                method: "POST",
                url: "PHP/records.php",
                data: {
                    command: "registration",
                    login: login,
                    password: password
                }
            }).success(function (token, status, headers, config) {
                var reg = /\d{6}$/;
                var tru = reg.test(token);

                if (tru) {
                    token = reg.exec(token)[0];
                    token = $.parseJSON(token);
                }

                callback(token);
            })
        },
    }
});