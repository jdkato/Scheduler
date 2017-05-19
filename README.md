# scheduler [![Build Status](https://travis-ci.org/jdkato/Scheduler.svg?branch=master)](https://travis-ci.org/jdkato/Scheduler) [![license](https://img.shields.io/github/license/mashape/apistatus.svg?maxAge=2592000)](https://github.com/jdkato/Scheduler/blob/master/LICENSE)

This is an [Electron](http://electron.atom.io/)-based application designed to act as a course planner with the ability to perform various GPA- and credit-related calculations.

![](https://raw.githubusercontent.com/jdkato/scheduler/master/screenshots/main-screen.png)

# Installation

###### Download

```bash
$ git clone https://github.com/jdkato/scheduler.git && cd scheduler
```

###### Install Dependencies & Run

```bash
$ npm i && npm start
```

###### Build a Standalone Application (OS X only)

```bash
$ npm run build
```

# Usage

### Adding a school

![](https://raw.githubusercontent.com/jdkato/scheduler/master/screenshots/schools.png)

In order to accurately perform its calculations, the application needs to know some information about the associated school.

### Creating a new schedule

![](https://raw.githubusercontent.com/jdkato/scheduler/master/screenshots/new-schedule.png)

Once you have entered information for a school, you can create a new schedule. The major and minor prefixes are used to determine their respective GPAs.

### Adding classes

![](https://raw.githubusercontent.com/jdkato/scheduler/master/screenshots/schedule.png)

As you add courses, credits and grades, the various calculations (these can be disabled within the preferences) will update automatically. Course prefixes starting with "*" are treated as transfer credits.

### Using commands

There are currently two commands available:

|  Command  |             Arguments            |                      Returns                      |
|:---------:|:--------------------------------:|:-------------------------------------------------:|
| `credits` | space-delimited list of prefixes | number of credits earned in the specified courses |
|   `gpa`   | space-delimited list of prefixes |        GPA earned in the specified courses        |

e.g.,

```bash
gpa mth stat => 3.868
```

# Running Tests

```bash
$ npm test
```

# License

The MIT License.
