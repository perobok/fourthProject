import { formText } from '../client/js/urlValidaton'

describe("Testing if proper url was entered", () => {
    const urlTest = "http://www.randompassages.com/";
    const falseInput = "pero34";


    test("TRUE", () => {
        const resultTrue = validURL(urlTest);
        expect(resultTrue).toBe(true);
        const resultFalse = validURL(falseInput);
        expect(resultFalse).toBe(false);
    });
});