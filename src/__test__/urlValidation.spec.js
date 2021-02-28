import { urlValidation } from '../client/js/urlValidation'

describe("Testing if proper url was entered", () => {
    const urlTest = "http://www.randompassages.com/";
    const falseInput = "pero34";


    test("TRUE", () => {
        const resultTrue = urlValidation(urlTest);
        expect(resultTrue).toBe(true);
        const resultFalse = urlValidation(falseInput);
        expect(resultFalse).toBe(false);
    });
});