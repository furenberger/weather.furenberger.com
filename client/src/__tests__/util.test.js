import { getStateFlag, isZipCode, getWeather } from '../util'

it('the state flag', async () => {
  const data = await getStateFlag("Wisconsin");
  expect(data).toBe('http://flags.ox3.in/svg/us/wi.svg');
});

it('good zip', () => {
  const data = isZipCode(53005);
  expect(data).toBe(true);
});

it('bad zip', () => {
  const data = isZipCode('53');
  expect(data).toBe(false);
});

it('get weather', async () => {
  const weather = {
    city: "city",
    temperature: "9",
    icon: `http://openweathermap.org/img/wn/04d@2x.png`,
    iconName: "clouds",
    description: "desc",
    details: [
      {
        value: "1000000",
        label: "High Temperature",
      },
    ],
  };

  const data = await getWeather(53005);
  expect(data).toMatchObject(weather);
});


