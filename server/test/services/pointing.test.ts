import app from '../../src/app';

describe('\'pointing\' service', () => {
  it('registered the service', () => {
    const service = app.service('pointing');
    expect(service).toBeTruthy();
  });
});
