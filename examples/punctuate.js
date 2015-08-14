/**
 * Put something at the end of a string. Probably a punctuation, but whevs yolo.
 *
 * ```js
 * punctuate('!', 'Hi') === 'Hi!'
 * ```
 *
 * @summary String -> String -> String
 */
export const punctuate = (punctuation, message) => message + punctuation

/**
 * Get all the words from a string.
 *
 * ```js
 * words('hello darkness my old friend') ===
 *   ['hello', 'darkness', 'my', 'old', 'friend']
 * ```
 *
 * @summary String -> Array String
 */
export const words = message => message.split(' ')
