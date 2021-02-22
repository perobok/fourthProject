function urlValidation(formText) {
    console.log("::: Running URL validation :::", formText);

    if (formText.length == 0) {
        alert("Please enter url!!!")
    }

    function isValidURL(formText) {
        var rules = new RegExp('^((https?:)?\\/\\/)?' + // protocol
            '(?:\\S+(?::\\S*)?@)?' + // authentication
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locater
        if (!rules.test(formText)) {
            alert("Please enter valid URL adress. For exsample: http://www.google.com!!!")
        } else {
            console.log("All good URL");
        }
    }
    isValidURL(formText);
}

export { urlValidation }
/*
 */