import { removeEmptyProperties } from '../../helpers/object.helpers'

describe('removeEmptyProperties', () => {
  test.each([
    { name: 'empty', initial: {}, expected: {} },
    {
      name: 'set1',
      initial: { a: null, b: undefined, c: '', d: 1 },
      expected: { d: 1 },
    },
    {
      name: 'set2',
      initial: { a: 1, b: 2, c: 3 },
      expected: { a: 1, b: 2, c: 3 },
    },
    {
      name: 'set2',
      initial: { a: false, b: 'false', c: 0, d: -1, e: [], f: {} },
      expected: { a: false, b: 'false', c: 0, d: -1, e: [], f: {} },
    },
  ])('Removing empty props from set $name', ({ initial, expected }) => {
    const actual = removeEmptyProperties(initial)
    expect(actual).toEqual(expected)
  })
})
