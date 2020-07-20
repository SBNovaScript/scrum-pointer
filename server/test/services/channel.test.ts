import app from '../../src/app';

describe('\'channel\' service', () => {
  it('registered the service', () => {
    const service = app.service('channel');
    expect(service).toBeTruthy();
  });
});
