import { computeDataError } from "../computeDataError";
import { setResponseError } from "../setResponseError";

jest.mock("../setResponseError");

describe.each([
  [
    {
      status: 404,
      json: jest.fn().mockResolvedValue({ errorMessage: "Not found" }),
    },
    { errorMessage: "Not found", status: 404 },
    "Error message",
  ],
  [
    {
      status: 500,
      json: jest.fn().mockRejectedValue(new Error("Internal Server Error")),
    },
    { anomaly: { label: "Erreur: Problème technique ! Contacter votre support" }, status: 500 },
    "Error message",
  ],
])("computeDataError", (response, expectedResponse, expectedReturnValue) => {
  test("appelle setResponseError avec les données de la réponse si response.json() est OK", async () => {
    setResponseError.mockReturnValueOnce(expectedReturnValue);
    const result = await computeDataError(response);
    expect(setResponseError).toHaveBeenCalledWith({
      response: expectedResponse,
    });
    expect(result).toBe(expectedReturnValue);
  });
});