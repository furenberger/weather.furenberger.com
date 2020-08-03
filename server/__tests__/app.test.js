const axios = require('axios');
const request = require('supertest');
const app = require('../app');

beforeEach(() => {
  jest.resetModules();
});

jest.mock('axios');

// mock the bunyan
jest.mock('../util/logger', () => ({
  child: () => ({
    trace: () => {},
    info: () => {},
    error: () => {},
  })
}));

describe('app endpoints', () => {
  it('get state abbreviation for wisconsin - success', async() => {
    const expectedResult = { STATE_ABBREV: 'WI' };

    await request(app)
      .get('/stateAbbreviation/Wisconsin')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200)
      .then(res => {
        expect(res.body).toEqual(expectedResult);
      });
  });

  it('get state abbreviation for wisconsin - fail', async() => {
    await request(app)
      .get('/stateAbbreviation/12345')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(422)
      .then(res => {
        expect(res.body.errors[0].msg).toEqual('Invalid value');
      });
  });

  it('get state data success', async() => {
    await request(app)
      .get('/stateData')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200);
  });

  it('get weather data - success', async() => {
    const mockData = {
      weather: [
        {
          id: 800,
          main: 'Clear',
          description: 'clear sky',
          icon: '01d'
        }
      ]
    };

    axios.mockResolvedValue({
      data: mockData
    });

    await request(app)
      .get('/weather/53005')
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .then(res => {
        expect(res.body).toMatchObject(mockData);
      });
  });

  it('get weather data - fail', async() => {
    const mockData = {
      weather: [
        {
          id: 800,
          main: 'Clear',
          description: 'clear sky',
          icon: '01d'
        }
      ]
    };

    axios.mockResolvedValue({
      data: mockData
    });

    await request(app)
      .get('/weather/niner')
      .expect(422)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(422)
      .then(res => {
        expect(res.body.errors[0].msg).toEqual('Invalid value');
      });
  });
});
