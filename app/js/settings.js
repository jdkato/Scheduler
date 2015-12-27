var ipc = require('electron').ipcRenderer;
var remote = require('remote');
var configuration = require('../configuration');

var backBtnEl = document.querySelector('#backBtn');
var saveBtnEl = document.querySelector('#saveBtn');
var deleteBtnEl = document.querySelector('#deleteBtn');

var schools = Object.keys(configuration.getSettings('main'));
generateList('#template-schools', '#schools', schools);

$(document).ready(function () {
    $('#deleteBtn').hide();
    $('.list-group-item').click(function () {
        var name = $.trim($(this).text());
        var data = configuration.readSettings(name, 'main');
        $('#schoolNameInput').val(name);
        $('#classStandingInput').val(data['classCutoff']);
        $('#GPAConstantInput').val(JSON.stringify(data['grading']));
        $('#honorsInput').val(JSON.stringify(data['honorCutoffs']));
        if (data['format'] == 'Semester') {
            $('select>option:eq(1)').prop('selected', true);
        } else {
            $('select>option:eq(0)').prop('selected', true);
        }
        $('#deleteBtn').show();
    });
});

deleteBtnEl.addEventListener('click', function () {
    var name = $.trim($('#schoolNameInput').val());
    configuration.clearSetting(name, 'main');
});

backBtnEl.addEventListener('click', function () {
    ipc.send('back-main-window');
});

var submitted = false;
saveBtnEl.addEventListener('click', function () {
    $('#form').validator().on('submit', function (e) {
        if (e.isDefaultPrevented() && !submitted) {
            return;
        } else {
            submitted = true;
            var name = $.trim($('#schoolNameInput').val());
            var input = {};
            input['format'] = $('#sel1').find(':selected').text();
            input['grading'] = JSON.parse($('#GPAConstantInput').val());
            input['classCutoff'] = $('#classStandingInput').val();
            input['honorCutoffs'] = JSON.parse($('#honorsInput').val());
            configuration.saveSettings(name, input, 'main');
            ipc.send('back-main-window');
        }
    })
});