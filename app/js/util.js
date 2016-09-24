/* global $ */
function generateList (name, div, data) {
  var source = $(name).html()
  var template = Handlebars.compile(source)
  $(div).append(template({objects: data}))
}

function genSchedule (terms, numCourses, data, numYears) {
  numCourses = typeof numCourses !== 'undefined' ? numCourses : 5
  numYears = typeof numYears !== 'undefined' ? numYears : 4

  var width = terms.length
  var $table = $('<table id="mainTable" class="table table-bordered table-condensed"></table>')
  var $body = $('<tbody></tbody>')
  var $head = $('<thead></thead>')

  // Term Header
  var $termRow = $('<tr></tr>')
  for (var i in terms) {
    $termRow.append($('<th colspan="3" class="termLabel">' + terms[i] + '</th>'))
  }
  $head.append($termRow)

  var cell = 0
  for (var row = 0; row < numYears; ++row) {

    // Course Info
    var $courseInfoRow = $('<tr></tr>')
    var $totalCreditsRow = $('<tr></tr>')
    var sepSpan = 3 * width

    for (var i = 0; i < width; ++i) {
      $courseInfoRow.append($('<th class="courseLabel text-center">Course</th>'))
      $courseInfoRow.append($('<th class="courseLabel text-center">Credits</th>'))
      $courseInfoRow.append($('<th class="courseLabel text-center">Grade</th>'))
    /*
     var id = "total-" + (i + 1).toString()
     $totalCreditsRow.append($('<th class="courseLabel text-center">&nbsp;</th>'))
     $totalCreditsRow.append($('<th id="' + id + '" class="courseLabel text-center"></th>'))
     $totalCreditsRow.append($('<th class="courseLabel"></th>'))
     */
    }
    $body.append($courseInfoRow)

    // Courses
    for (var i = 0; i < numCourses; ++i) {
      var $coursesRow = $('<tr></tr>')
      for (var j = 0; j < sepSpan; ++j) {
        if (!data[cell]) {
          $coursesRow.append('<td id="' + cell.toString() + '" class="text-center">&nbsp;</td>')
        } else {
          $coursesRow.append('<td id="' + cell.toString() + '" class="text-center">' + data[cell] + '</td>')
        }
        cell += 1
      }
      $body.append($coursesRow)
    }

    // Course Credits
    // $body.append($totalCreditsRow)

    $table.append($head)
    $table.append($body)
  }
  $table.appendTo($('#schedule-container'))
}

function genSemester (data, numCourses, numYears) {
  genSchedule(['Fall', 'Spring', 'Summer'], numCourses, data, numYears)
}

function genQuarter (data, numCourses, numYears) {
  genSchedule(['Fall', 'Winter', 'Spring', 'Summer'], numCourses, data, numYears)
}

function isNumeric (n) {
  return !isNaN(parseFloat(n)) && isFinite(n)
}
