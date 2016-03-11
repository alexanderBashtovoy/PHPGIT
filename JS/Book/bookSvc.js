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
        }
    }
});