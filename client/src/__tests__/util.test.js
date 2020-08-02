import { getStateFlag } from '../util'

it('the state flag', async () => {
  const data = await getStateFlag("Wisconsin");
  expect(data).toBe('http://flags.ox3.in/svg/us/wi.svg');
});
