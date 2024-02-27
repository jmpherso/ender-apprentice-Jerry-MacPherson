import { sharedStoresTodo } from './shared-stores-todo';

describe('sharedStoresTodo', () => {
  it('should work', () => {
    expect(sharedStoresTodo()).toEqual('shared-stores-todo');
  });
});
