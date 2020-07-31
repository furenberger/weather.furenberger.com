export const stateFill = {
  id: "state-fill",
  type: "fill",
  source: "states",
  layout: {},
  paint: {
    "fill-color": "#3f51b5",
    "fill-opacity": [
      "case",
      ["boolean", ["feature-state", "hover"], false],
      0.5,
      0,
    ],
  },
};

export const stateBorders = {
  id: "state-borders",
  type: "line",
  source: "states",
  layout: {},
  paint: {
    "line-color": "#3f51b5",
    "line-width": 1,
  },
};
