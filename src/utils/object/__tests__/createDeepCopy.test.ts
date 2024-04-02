import { createDeepCopy } from '../utils'

describe('createDeepCopy', () => {
	it('with primitive -> returns primitives', () => {
		expect(createDeepCopy(123)).toEqual(123)
		expect(createDeepCopy('test')).toEqual('test')
		expect(createDeepCopy(true)).toEqual(true)
		expect(createDeepCopy(null)).toEqual(null)
	})

	it('with array -> returns deep copy of array', () => {
		const array = [1, 2, [3, 4]]
		const copy = createDeepCopy(array)
		expect(copy).toEqual(array)
		expect(copy).not.toBe(array)
		expect(copy[2]).not.toBe(array[2])
	})

	it('with object -> returns deep copy of object', () => {
		const object = { a: 1, b: { c: 2, d: 3 } }
		const copy = createDeepCopy(object)
		expect(copy).toEqual(object)
		expect(copy).not.toBe(object)
		expect(copy.b).not.toBe(object.b)
	})

	it('with object with circular references -> returns deep copy of object', () => {
		const object: any = { a: 1 }
		object.self = object
		const copy = createDeepCopy(object)
		expect(copy).toEqual({ a: 1, self: copy })
		expect(copy.self).toBe(copy)
	})

	it('with object with mixed structures -> returns deep copy of object', () => {
		const mixed = { a: [1, { b: 2 }], c: { d: [3, 4], e: 'test' } }
		const copy = createDeepCopy(mixed)
		expect(copy).toEqual(mixed)
		expect(copy).not.toBe(mixed)
		expect(copy.a).not.toBe(mixed.a)
		expect(copy.a[1]).not.toBe(mixed.a[1])
		expect(copy.c).not.toBe(mixed.c)
		expect(copy.c.d).not.toBe(mixed.c.d)
	})
})
