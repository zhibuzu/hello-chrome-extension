$(function () {
            var currentTimestampMS = $.timestamp();
            var currentDatetime = $.date(currentTimestampMS, "%Y-%m-%d %H:%M:%S");
            console.log('currentTimeStamp: ' + currentTimestampMS + ' MS');
            console.log('currentDatetime: ' + currentDatetime);

            var js_timestamp = document.getElementById('js_timestamp');
            var js_datetime = document.getElementById('js_datetime');
            var js_timestamp_o = document.getElementById('js_timestamp_o');
            var js_datetime_o = document.getElementById('js_datetime_o');

            // initialize
            js_timestamp.value = Math.floor(currentTimestampMS / 1000);
            js_datetime_o.value = currentDatetime;

            // convert
            var js_convert_timestamp_btn = document.getElementById('js_convert_timestamp');
            var js_convert_datetime_btn = document.getElementById('js_convert_datetime');
            var js_timestamp_unit = document.getElementById('js_timestamp_unit');
            var js_timestamp_unit_o = document.getElementById('js_timestamp_unit_o');
            // convert to datetime
            $("#js_convert_timestamp").click(function(e) {
                console.log('js_timestamp.value: ' + js_timestamp.value);
                let timestamp_ms = js_timestamp_unit.value == 's' ? js_timestamp.value * 1000 : js_timestamp.value * 1;
                console.log('timestamp_ms: ' + timestamp_ms);
                let converted_datetime = $.date(timestamp_ms, "%Y-%m-%d %H:%M:%S");
                console.log('converted_datetime: ' + converted_datetime);
                js_datetime.value = converted_datetime;
            });

            // convert to timestamp
            $('#js_convert_datetime').click(function(e) {
                let datetime_str = js_datetime_o.value;
                console.log('datetime_str: ' + datetime_str);
                let converted_timestamp_ms = $.timestamp(datetime_str);
                console.log('converted_timestamp: ' + converted_timestamp_ms);
                let converted_timestamp_value = js_timestamp_unit_o.value == 's' ? Math.floor(converted_timestamp_ms / 1000) : converted_timestamp_ms;
                console.log('converted_timestamp_value: ' + converted_timestamp_value);
                js_timestamp_o.value = converted_timestamp_value;
            });

            // setting page language
            let setting_page_lang = function () {
                chrome.storage.sync.get('language_env', function(data) {
                    let language_env = data.language_env;
                    console.log(data.language_env);
                    document.getElementById('js_language_selector').value = language_env;
                    $("[translate_id]").each(function (index, item) {
                        let translate_id = $(item).attr('translate_id');
                        console.log(translate_id);
                        let translate_dest = language_dict[language_env][translate_id];
                        console.log(translate_dest);
                        item.textContent = translate_dest;
                    });
                });
            };
            setting_page_lang(); // init page
            // set && get language_env
            $('#js_language_selector').change(function(e) {
                let lang_env = e.target.value;
                chrome.storage.sync.set({language_env: lang_env}, function() {
                    setting_page_lang();
                });
            });

            // selected when focus
            $(js_datetime).focus(function(e) {
                e.target.select();
            });

            $(js_timestamp_o).focus(function(e) {
                e.target.select();
            });
        });
