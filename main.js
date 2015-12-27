'use strict';
const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
var configuration = require('./configuration');
var ipc = require("electron").ipcMain;

var mainWindow = null;
var settingsWindow = null;
var scheduleWindow = null;

app.on('ready', function () {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 500,
        resizable: false,
        overlayScrollbars: true,
        fullscreen: false
    });

    settingsWindow = new BrowserWindow({
        width: 800,
        height: 500,
        resizable: false,
        overlayScrollbars: true,
        fullscreen: false,
        show: false,
        frame: false
    });

    mainWindow.loadURL('file://' + __dirname + '/app/index.html');
    mainWindow.on('closed', function() {
        mainWindow = null;
        if (scheduleWindow !== null) {
            scheduleWindow.close();
        }
        if (settingsWindow !== null) {
            settingsWindow.close();
        }
    });

    settingsWindow.loadURL('file://' + __dirname + '/app/settings.html');
    settingsWindow.on('closed', function() {
        settingsWindow = null;
    });
});

app.on('window-all-closed', function () {
    app.quit();
});

ipc.on('close-main-window', function () {
    app.quit();
});

ipc.on('open-settings-window', function () {
    settingsWindow.setBounds(mainWindow.getBounds());
    mainWindow.hide();
    settingsWindow.show();
    mainWindow.reload();
});

ipc.on('back-main-window', function () {
    mainWindow.setBounds(settingsWindow.getBounds());
    settingsWindow.hide();
    mainWindow.show();
    settingsWindow.reload();
});

ipc.on('reload-main-window', function () {
    mainWindow.reload();
});

ipc.on('open-schedule-window', function () {
    createSchedule();
    mainWindow.hide();
    scheduleWindow.show();
    mainWindow.reload();
});


function createSchedule() {
    scheduleWindow = new BrowserWindow({
        width: 1176,
        height: 652,
        resizable: false,
        fullscreen: false,
        show: false
    });
    scheduleWindow.loadURL('file://' + __dirname + '/app/schedule.html');
    scheduleWindow.on('closed', function() {
        scheduleWindow = null;
        if (mainWindow !== null) {
            mainWindow.show();
        }
    });
}