import { keys } from '../src/server/testing';

test('checking if the username is included', () => {
    expect(keys('API_USERNAME_GEODATA')).not.toBe('');
});