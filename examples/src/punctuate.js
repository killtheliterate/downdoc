/**
 * `export default punctuate :: String -> String -> String`
 * 
 * Put something at the end of a string. Probably a punctuation, but whevs yolo.
 *
 * ```js
 * punctuate('!', 'Hi') === 'Hi!'
 * ```
 */
export default (punctuation, message) => message + punctuation

/**
 * `export words String -> Array String`
 *
 * Get all the words from a string.
 *
 * ```js
 * words('hello darkness my old friend') ===
 *   ['hello', 'darkness', 'my', 'old', 'friend']
 * ```
 */
export const words = message => message.split(' ')
