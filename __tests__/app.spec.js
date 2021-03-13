import { geoData } from '../src/client/js/app';

test('check if entered date is higher than today', () => {
    expect(geoData('2021-3-2', '2021-2-25')).toBeGreaterThanOrEqual(Date());
});