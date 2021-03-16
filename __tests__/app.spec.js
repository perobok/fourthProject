import { geoData } from '../src/client/js/app';

describe('Test API exist', () => {
    test('the API should send json response', () => {
        const res = geoData()
        expect(res).toBeDefined();
    });
});