var CURR_SCHE_EXPECTED = {
    'name': 'Math + CS',
    'school': 'Portland State University',
    'majors': [
        'Mth'
    ],
    'minors': [
        'CS'
    ],
    'data': [
        'Mth 251',
        '4',
        'A',
        'CH 222',
        '4',
        'A',
        'Mth 252',
        '4',
        'A',
        null,
        null,
        null,
        'CH 221',
        '4',
        'A',
        'CH 228',
        '1',
        'P',
        'STAT 243',
        '4',
        'A',
        '',
        null,
        null,
        'WR 121',
        '4',
        'A-',
        '',
        '',
        '',
        'CH 223',
        '4',
        'B-',
        null,
        null,
        null,
        'CH 284',
        '1',
        'P',
        '  ',
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        'CH 227',
        '1',
        'P',
        null,
        null,
        null,
        '',
        null,
        null,
        '',
        null,
        null,
        'Mth 261',
        '4',
        'A-',
        'Mth 253',
        '4',
        'A',
        'Mth 256',
        '4',
        'A-',
        null,
        null,
        null,
        'CS 161',
        '4',
        'P',
        'STAT 244',
        '4',
        'A',
        'CS 163',
        '4',
        'A',
        null,
        '',
        null,
        '*CIS 122',
        '4',
        'A',
        'CS 162',
        '4',
        'A',
        'CS 106',
        '4',
        'A',
        null,
        null,
        null,
        '',
        '',
        '',
        '*CIS 133J',
        '4',
        'A',
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        '',
        null,
        '',
        '',
        null,
        null,
        '',
        null,
        null,
        null,
        null,
        'STAT 451',
        '4',
        'A-',
        'PHL 324',
        '4',
        'A',
        '*CS 261',
        '4',
        'A',
        '*CAS 206',
        '4',
        'A',
        'Mth 344',
        '4',
        'P',
        'EC 314',
        '4',
        'P',
        '*CIS 277T',
        '4',
        'P',
        '*CS 201',
        '4',
        'A',
        'Mth 254',
        '4',
        'A-',
        '*CS 250',
        '4',
        'A',
        '*CS 251',
        '4',
        'A',
        '*CIS 133N',
        '4',
        'A',
        null,
        null,
        null,
        '*CIS 195P',
        '4',
        'A',
        '*CS 140U',
        '4',
        'A',
        '*CIS 133U',
        '4',
        'A',
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        'Mth 451',
        '4',
        'A',
        'CS 486',
        '4',
        'N\/A',
        '',
        null,
        null,
        null,
        null,
        null,
        'CS 300',
        '4',
        'A',
        'Mth 452',
        '3',
        'N\/A',
        null,
        null,
        null,
        null,
        null,
        null,
        'UNST 239',
        '4',
        'A',
        'CS 410',
        '3',
        'N\/A',
        '',
        null,
        null,
        null,
        null,
        null,
        '*CIS 133W',
        '4',
        'A',
        'PSY 300',
        '4',
        'N\/A'
    ],
    'metrics': {
        'totalGPA': '3.907',
        'totalCredits': 147,
        'institutionalGPA': '3.851',
        'majorGPA': [
            '3.859'
        ],
        'minorGPA': [
            '4.000'
        ],
        'class': 'Senior',
        'honors': 'Magna cum laude'
    }
};

var SCHOOL = {
    'format': 'Quarter',
    'grading': {
        'A': 4, 'A-': 3.67, 'B+': 3.33, 'B': 3, 'B-': 2.67, 'C+': 2.33, 'C': 2, 'C-': 1.67, 'D+': 1.33, 'D': 1,
        'D-': 0.67, 'F': 0, 'P': 0},
    'classCutoff': '45',
    'honorCutoffs': {'Summa cum laude': 3.9, 'Magna cum laude': 3.8, 'Cum laude': 3.67}
};

var DATA_BY_PREFIX_EXPECTED = {
    'Mth': {'qualityCredits': 28, 'qualityPoints': 108.03999999999999, 'credits': 32},
    'CH': {'qualityCredits': 12, 'qualityPoints': 42.68, 'credits': 15},
    'STAT': {'qualityCredits': 12, 'qualityPoints': 46.68, 'credits': 12},
    'WR': {'qualityCredits': 4, 'qualityPoints': 14.68, 'credits': 4},
    'CS': {'qualityCredits': 16, 'qualityPoints': 64, 'credits': 20},
    '*CIS': {'qualityCredits': 24, 'qualityPoints': 96, 'credits': 28},
    'PHL': {'qualityCredits': 4, 'qualityPoints': 16, 'credits': 4},
    '*CS': {'qualityCredits': 20, 'qualityPoints': 80, 'credits': 20},
    '*CAS': {'qualityCredits': 4, 'qualityPoints': 16, 'credits': 4},
    'EC': {'qualityCredits': 0, 'qualityPoints': 0, 'credits': 4},
    'UNST': {'qualityCredits': 4, 'qualityPoints': 16, 'credits': 4}
};

QUnit.test('updatePrefixData test', function (assert) {
    var prefixData = updatePrefixData(CURR_SCHE_EXPECTED, SCHOOL['grading']);
    assert.deepEqual(prefixData, DATA_BY_PREFIX_EXPECTED, 'Prefix data matches');
});

QUnit.test('majorGPAs test', function (assert) {
    var prefixData = updatePrefixData(CURR_SCHE_EXPECTED, SCHOOL['grading']);
    var majorGPAs = updatePrefixGPA(CURR_SCHE_EXPECTED['majors'], prefixData);
    assert.deepEqual(majorGPAs, CURR_SCHE_EXPECTED['metrics']['majorGPA'], 'Major GPA matches');
});

QUnit.test('minorGPAs test', function (assert) {
    var prefixData = updatePrefixData(CURR_SCHE_EXPECTED, SCHOOL['grading']);
    var minorGPAs = updatePrefixGPA(CURR_SCHE_EXPECTED['minors'], prefixData);
    assert.deepEqual(minorGPAs, CURR_SCHE_EXPECTED['metrics']['minorGPA'], 'Minor GPA matches');
});

QUnit.test('classStanding test', function (assert) {
    var classStanding = updateClass(CURR_SCHE_EXPECTED['metrics']['totalCredits'], SCHOOL['classCutoff']);
    assert.equal(classStanding, CURR_SCHE_EXPECTED['metrics']['class'], 'Class standing matches');
});

QUnit.test('honors test', function (assert) {
    var honors = updateHonors(CURR_SCHE_EXPECTED['metrics']['institutionalGPA'], SCHOOL['honorCutoffs']);
    assert.equal(honors, CURR_SCHE_EXPECTED['metrics']['honors'], 'Latin honors matches');
});

QUnit.test('totalGPA test', function (assert) {
    var prefixData = updatePrefixData(CURR_SCHE_EXPECTED, SCHOOL['grading']);
    var gpa = updateTotalGPA(prefixData);
    assert.equal(gpa, CURR_SCHE_EXPECTED['metrics']['totalGPA'], 'Total GPA matches');
});

QUnit.test('institutionalGPA test', function (assert) {
    var prefixData = updatePrefixData(CURR_SCHE_EXPECTED, SCHOOL['grading']);
    var gpa = updateInstitutionalGPA(prefixData);
    assert.equal(gpa, CURR_SCHE_EXPECTED['metrics']['institutionalGPA'], 'Institutional GPA matches');
});

QUnit.test('totalCredits test', function (assert) {
    var prefixData = updatePrefixData(CURR_SCHE_EXPECTED, SCHOOL['grading']);
    var credits = updateTotalCredits(prefixData);
    assert.equal(credits, CURR_SCHE_EXPECTED['metrics']['totalCredits'], 'Institutional GPA matches');
});

QUnit.test('calc gpa test', function (assert) {
    var mthAndStat = calc(['mth', 'stat'], 'GPA', CURR_SCHE_EXPECTED, SCHOOL);
    assert.equal(mthAndStat, 3.868, 'Mth and STAT gpa matches');
});

QUnit.test('calc credits test', function (assert) {
    var wrCredits = calc(['wr'], 'credits', CURR_SCHE_EXPECTED, SCHOOL);
    assert.equal(wrCredits, 4, 'Mth and STAT gpa matches');
});