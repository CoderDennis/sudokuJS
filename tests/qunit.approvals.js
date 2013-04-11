var approve = function (actual, fileName, message) {
    if (message == undefined) {
        message = "Text should match file contents";
    }

    $.get(fileName)
        .done(function (fileText) {
            equal(actual, fileText, message);
            start();
        })
        .fail(function () {
            ok(false, "Error reading file " + fileName);
            start();
        });

};