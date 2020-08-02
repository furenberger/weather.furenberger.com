import { stateFill, stateBorders } from "../map-styles";

describe("map styles", () => {
  it("it should export a state fill", () => {
    expect(stateFill).toEqual(
      expect.objectContaining({
        id: "state-fill",
        type: "fill",
        source: "states",
        layout: expect.any(Object),
        paint: expect.any(Object)
      })
    );
  });

  it("it should export a state borders", () => {
    expect(stateBorders).toEqual(
      expect.objectContaining({
        id: "state-borders",
        type: "line",
        source: "states",
        layout: expect.any(Object),
        paint: expect.any(Object)
      })
    );
  });
});
