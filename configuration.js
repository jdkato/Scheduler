var nconf = require('nconf');

var scheConf = new nconf.Provider();
var mainConf = new nconf.Provider();
var optConf = new nconf.Provider();
var name2Conf = {"sche" : scheConf, "main": mainConf, "opt": optConf};

scheConf.file({file: './app/schedules.json'});
mainConf.file({file: './app/schools.json'});
optConf.file({file: './app/options.json'});

function saveSettings(settingKey, settingValue, file) {
    var conf = name2Conf[file];
    conf.set(settingKey, settingValue);
    conf.save();
}

function readSettings(settingKey, file) {
    var conf = name2Conf[file];
    conf.load();
    return conf.get(settingKey);
}

function getSettings(file) {
    var conf = name2Conf[file];
    conf.load();
    return conf.get();
}

function clearSetting(key, file) {
    var conf = name2Conf[file];
    conf.load();
    conf.clear(key);
    conf.save();
}

module.exports = {
    saveSettings: saveSettings,
    readSettings: readSettings,
    getSettings: getSettings,
    clearSetting: clearSetting
};
