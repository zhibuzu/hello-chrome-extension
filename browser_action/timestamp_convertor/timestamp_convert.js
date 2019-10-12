/*日期时间标准格式与时间戳的转换*/
!function ($) {
    // 时间标准格式转时间戳(毫秒)
    // 时间标准格式示例：1. 2016/12/13 00:01:10  2. 2016-12-13 00:01:10 3. 2016-12-13 00:01
    $.timestamp = $.timestamp || function (date) {
        return date ? new Date(date + '+08:00').getTime() : new Date().getTime();
    };

    // 时间戳转时间标准格式
    // option.time （毫秒）
    $.date = $.date || function (time, format) {
        var option = time;

        if (typeof time === typeof 1) {
            option = {
                time: time,
                format: format
            };
        }

        option = $.extend({
            time: new Date().getTime(),
            format: '%Y-%m-%d %H:%M:%S'
        }, option);

        var replaceObj = {
            '%Y': 'getFullYear',
            '%m': 'getMonth',
            '%d': 'getDate',
            '%H': 'getHours',
            '%M': 'getMinutes',
            '%S': 'getSeconds'
        };

        var d = new Date(parseInt(option.time));

        for (var i in replaceObj) {
            if (replaceObj.hasOwnProperty(i)) {
                var method = replaceObj[i], item;
                if ('%m' === i) {
                    item = d[method]() + 1;
                } else {
                    item = d[method]();
                }

                // 一位数前面补0
                item = item < 10 ? '0' + item : item;

                option.format = option.format.replace(i, item);
            }
        }

        return option.format;
    };
}(jQuery);
