QUnit.test('Empty string isNumeric test', function (assert) {
    assert.notOk(isNumeric(""), 'Empty string is not numeric');
});

QUnit.test('null isNumeric test', function (assert) {
    assert.notOk(isNumeric(null), 'null is not numeric');
});

QUnit.test('Non-number character isNumeric test', function (assert) {
    assert.notOk(isNumeric("$"), 'Non-number character is not numeric');
});

QUnit.test('undefined isNumeric test', function (assert) {
    assert.notOk(isNumeric(undefined), 'undefined is not numeric');
});

QUnit.test('integer isNumeric test', function (assert) {
    assert.ok(isNumeric(4), 'An integer is numeric');
});

QUnit.test('float isNumeric test', function (assert) {
    assert.ok(isNumeric(0.23), 'A float is numeric');
});