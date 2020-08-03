import { rest } from "msw";

const handlers = [
  rest.get("/stateData", (req, res, ctx) => {
    return res(
      ctx.json({
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: [[[-80.519, 40.6388]]],
        },
        properties: {
          STATE_ID: "54",
          STATE_NAME: "West Virginia",
        },
        id: 54,
      })
    );
  }),
  rest.get("/stateAbbreviation/:stateName", (req, res, ctx) => {
    const { stateName } = req.params;
    const abbrev = stateName.substring(0,2).toLowerCase();
    return res(
      ctx.json({
        STATE_ABBREV: abbrev,
      })
    );
  }),
];

export { handlers };
