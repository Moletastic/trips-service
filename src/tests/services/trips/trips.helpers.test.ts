import { getBoundingBoxByReadings, getOverspeedByReadings } from "../../../services/trips/trips.helpers"
import { boundingBoxes, tripsReading } from "../../fixtures/trip.fixtures"

describe('getOverspeedByReadings()', () => {
  test.each([
    { name: 'api', readings: tripsReading.api, expected: 1 },
    { name: 'set1', readings: tripsReading.set1, expected: 2 },
    { name: 'empty', readings: tripsReading.empty, expected: 0 },
  ])('Getting overspeed from $name set', ({ readings, expected }) => {
    const actual = getOverspeedByReadings(readings)
    expect(actual).toBe(expected)
  })
})

describe('getBoundingBoxByReadings()', () => {
  test.each([
    { name: 'api', readings: tripsReading.api, expected: boundingBoxes.api, expectedLength: 4 },
    { name: 'empty', readings: tripsReading.empty, expected: boundingBoxes.empty, expectedLength: 0 },
  ])('Getting boundingbox from $name set', ({ readings, expected, expectedLength }) => {
    const actual = getBoundingBoxByReadings(readings)
    expect(actual).toHaveLength(expectedLength)
    actual.forEach((location, i) => expect(location).toEqual(expected[i]))
  })
})
