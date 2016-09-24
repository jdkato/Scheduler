/* global $, isNumeric, genSemester, genQuarter, generateList */
if (typeof require !== 'undefined') {
  var configuration = require('../configuration')
  var SCHE_IDX = configuration.readSettings('current', 'sche')
  var SCHEDULES = configuration.readSettings('main', 'sche')
  var CURR_SCHE = SCHEDULES[SCHE_IDX]
  var SCHOOL = configuration.getSettings('main')[CURR_SCHE['school']]
}

$('#commandInput').keyup(function (event) {
  if (event.keyCode === 13) {
    var input = $('#commandInput')
    var command = input.val().split(' ')
    var action = command.shift().toLowerCase()
    if (action === 'gpa') {
      input.val(calc(command, 'GPA', CURR_SCHE, SCHOOL))
    } else if (action === 'credits') {
      input.val(calc(command, 'Credits', CURR_SCHE, SCHOOL))
    }
    input.select()
  }
})

$.fn.stateChange = function () {
  $(this).find('td').on('change', function (evt) {}).on('validate', function (evt, value) {
    CURR_SCHE['data'][$(this).attr('id')] = value
    var prefixData = updatePrefixData(CURR_SCHE, SCHOOL['grading'])
    CURR_SCHE['metrics']['majorGPA'] = updatePrefixGPA(CURR_SCHE['majors'], prefixData)
    CURR_SCHE['metrics']['minorGPA'] = updatePrefixGPA(CURR_SCHE['minors'], prefixData)
    CURR_SCHE['metrics']['totalGPA'] = updateTotalGPA(prefixData)
    CURR_SCHE['metrics']['institutionalGPA'] = updateInstitutionalGPA(prefixData)
    CURR_SCHE['metrics']['totalCredits'] = updateTotalCredits(prefixData)
    CURR_SCHE['metrics']['class'] = updateClass(CURR_SCHE['metrics']['totalCredits'], SCHOOL['classCutoff'])
    CURR_SCHE['metrics']['honors'] = updateHonors(CURR_SCHE['metrics']['institutionalGPA'], SCHOOL['honorCutoffs'])
    updateDisplayMetrics()
    SCHEDULES[SCHE_IDX] = CURR_SCHE
    configuration.saveSettings('main', SCHEDULES, 'sche')
    return true
  })
  return this
}

function updateTotalGPA (prefixData) {
  var qualityPoints = 0
  var qualityCredits = 0
  for (var prefix in prefixData) {
    qualityPoints += prefixData[prefix]['qualityPoints']
    qualityCredits += prefixData[prefix]['qualityCredits']
  }
  return (qualityPoints / qualityCredits).toFixed(3)
}

function updateInstitutionalGPA (prefixData) {
  var iQualityPoints = 0
  var iQualityCredits = 0
  for (var prefix in prefixData) {
    if (prefix.charAt(0) !== '*') {
      iQualityPoints += prefixData[prefix]['qualityPoints']
      iQualityCredits += prefixData[prefix]['qualityCredits']
    }
  }
  return (iQualityPoints / iQualityCredits).toFixed(3)
}

function updateTotalCredits (prefixData) {
  var credits = 0
  for (var prefix in prefixData) {
    credits += prefixData[prefix]['credits']
  }
  return credits
}

function updatePrefixGPA (data, prefixData) {
  var GPAs = []
  var prefix
  for (var idx in data) {
    prefix = data[idx]
    GPAs.push((prefixData[prefix]['qualityPoints'] / prefixData[prefix]['qualityCredits']).toFixed(3))
  }
  return GPAs
}

function updateClass (totalCredits, classCutoff) {
  if (totalCredits < classCutoff) {
    return 'Freshman'
  } else if (totalCredits < classCutoff * 2) {
    return 'Sophomore'
  } else if (totalCredits < classCutoff * 3) {
    return 'Junior'
  } else {
    return 'Senior'
  }
}

function updateHonors (iGPA, honorCutoffs) {
  if (iGPA > honorCutoffs['Summa cum laude']) {
    return 'Summa cum laude'
  } else if (iGPA > honorCutoffs['Magna cum laude']) {
    return 'Magna cum laude'
  } else if (iGPA > honorCutoffs['Cum laude']) {
    return 'Cum laude'
  }
}

function updateDisplayMetrics () {
  var metrics = CURR_SCHE['metrics']
  for (var key in metrics) {
    if (key === 'majorGPA' || key === 'minorGPA') {
      for (var idx in metrics[key]) {
        $('#' + key + '-' + idx.toString()).val(metrics[key][idx])
      }
    } else {
      $('#' + key + 'Input').val(metrics[key])
    }
  }
}

function updatePrefixData (schedule, gradingScheme) {
  var data = {}
  var grade = 0
  var credit = 0
  var prefix = null

  for (var i = 0, len = schedule['data'].length; i < len; i += 3) {
    grade = Number(gradingScheme[schedule['data'][i + 2]])
    credit = Number(schedule['data'][i + 1])
    if (schedule['data'][i] && isNumeric(credit) && isNumeric(grade)) {
      prefix = schedule['data'][i].split(' ')[0]
      if (prefix in data) {
        if (grade) {
          data[prefix]['qualityCredits'] += credit
          data[prefix]['qualityPoints'] += (credit * grade)
        }
        data[prefix]['credits'] += credit
      } else {
        var prefixData = {}
        prefixData['qualityCredits'] = grade === 0 ? 0 : credit
        prefixData['qualityPoints'] = (credit * grade)
        prefixData['credits'] = credit
        data[prefix] = prefixData
      }
    }
  }
  return data
}

function calc (args, option, schedule, school) {
  var grade = 0
  var credit = 0
  var prefix = null
  var tQualityCredits = 0
  var tGrades = 0
  var tCredits = 0

  for (var i = 0, len = schedule['data'].length; i < len; i += 3) {
    grade = Number(school['grading'][schedule['data'][i + 2]])
    credit = Number(schedule['data'][i + 1])
    if (schedule['data'][i] && isNumeric(credit) && isNumeric(grade)) {
      prefix = schedule['data'][i].split(' ')[0].toLowerCase()
      if (args.length === 0 || args.some(function (x) {
        return x.toLowerCase() === prefix
      })) {
        if (grade !== 0) {
          tGrades += (credit * grade)
          tQualityCredits += credit
        }
        tCredits += credit
      }
    }
  }
  if (option === 'GPA') {
    return (tGrades / tQualityCredits).toFixed(3)
  } else {
    return tCredits
  }
}

function initSchedule () {
  var options = configuration.readSettings('options', 'opt')
  var data = []

  // Generate schedule with stored data
  if (SCHOOL['format'] === 'Semester') {
    genSemester(CURR_SCHE['data'])
  } else {
    genQuarter(CURR_SCHE['data'])
  }

  // Load stored calculations
  generateList('#template-majors', '#metrics', CURR_SCHE['majors'])
  generateList('#template-minors', '#metrics', CURR_SCHE['minors'])
  updateDisplayMetrics()

  // User display preferences
  for (var opt in options) {
    if (!options[opt]) {
      if (opt === 'majorGPA' || opt === 'minorGPA') {
        if (opt === 'majorGPA') {
          data = CURR_SCHE['majors']
        } else {
          data = CURR_SCHE['minors']
        }
        for (var idx in data) {
          $('#' + opt + '-' + idx + '-div').remove()
        }
      } else {
        $('#' + opt).remove()
      }
    }
  }
}
