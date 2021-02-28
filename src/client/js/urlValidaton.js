function urlValidation(formText) {
    console.log("::: Running URL validation :::", formText);
    var rules = new RegExp('^((https?:)?\\/\\/)?' + // protocol
        '(?:\\S+(?::\\S*)?@)?' + // authentication
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locater
    if ((!rules.test(formText))) {
        alert("Please enter valid url!!!")
    } else {
        console.log("All good URL")
    }

}

export { urlValidation }