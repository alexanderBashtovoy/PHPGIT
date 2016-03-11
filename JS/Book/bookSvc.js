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
        logOut: function (callback, login) {
            $http({
                method: "POST",
                url: "PHP/records.php",
                data: {
                    command: "LogOut",
                    login: login,
                }
            }).success(function (result, status, headers, config) {
                var reg = /.$/;
                var tru = reg.test(result);

                if (tru) {
                    result = reg.exec(result)[0];
                    result = $.parseJSON(result);
                }

                callback(result);
            })
        }
    }
});