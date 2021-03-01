import { handleSubmit } from '../__mocks__/formHandler';


describe('Test mockAPI', () => {
    test('the API should send json response', () => {
        const res = handleSubmit()
        expect(res).toBeDefined();
    });
});