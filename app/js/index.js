var ipc = require('electron').ipcRenderer;
var remote = require('remote');
var configuration = require('../configuration');

var scheduleEl = document.querySelector('#close-schedule');
var openEl = document.querySelector('#open-schedule');
var settingsEl = document.querySelector('#settings');
var prefEl = document.querySelector('#savePref');
var prefBtn = document.querySelector('#preferences');

var wasButton = false;
var submitted = false;
var schools = Object.keys(configuration.getSettings('main'));
var schedules = configuration.readSettings('main', 'sche');

generateList('#template-schedules', '#schedules', schedules);
generateList('#template-schools', '#schools', schools);

$(document).ready(function () {
    $('.deleteBtn').click(function () {
        wasButton = true;
    });
    $('.list-group-item').click(function () {
        var name = $(this).find('h4').text();
        var schedules = configuration.readSettings('main', 'sche');
        for (var i = 0, len = schedules.length; i < len; ++i) {
            if (schedules[i]['name'] == name) {
                if (wasButton) {
                    schedules.splice(i, 1);
                    configuration.saveSettings('main', schedules, 'sche');
                    wasButton = false;
                    ipc.send('reload-main-window');
                } else {
                    configuration.saveSettings('current', i, 'sche');
                    ipc.send('open-schedule-window');
                }
                return;
            }
        }
    });
});

scheduleEl.addEventListener('click', function () {
    ipc.send('reload-main-window');
});

prefBtn.addEventListener('click', function () {
    var options = configuration.readSettings('options', 'opt');
    $('.optionCheck').each(function () {
        var id = $(this).attr('id');
        if (options[id]) {
            $('#' + id).prop('checked', true);
        }
    });
});

prefEl.addEventListener('click', function () {
    var options = {};
    $('.optionCheck').each(function () {
        options[$(this).attr('id')] = $(this).is(':checked');
    });
    configuration.saveSettings('options', options, 'opt');
    $('#prefModal').modal('hide');
});

settingsEl.addEventListener('click', function () {
    ipc.send('open-settings-window');
});

openEl.addEventListener('click', function () {
    $('#form').validator().on('submit', function (e) {
        if (e.isDefaultPrevented() && !submitted) {
            return;
        } else {
            submitted = true;
            var input = {};
            var schedules = configuration.readSettings('main', 'sche');
            input['name'] = $.trim($('#scheduleName').val());
            input['school'] = $('#sel2').find(':selected').text();
            input['majors'] = $('#majorPrefixInput').val().split(',');
            input['minors'] = $('#minorPrefixInput').val().split(',');
            input['years'] = $('#yearsInput').val();
            input['data'] = [];
            input['metrics'] = {};
            schedules.push(input);
            configuration.saveSettings('main', schedules, 'sche');
            configuration.saveSettings('current', schedules.length - 1, 'sche');
            ipc.send('open-schedule-window');
        }
    })
});


