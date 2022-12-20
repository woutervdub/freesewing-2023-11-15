//

import { Design } from '@freesewing/core'
import { data } from '../data.mjs'
// Parts
import { box } from './box.mjs'
import { part1 } from './part1.mjs'
import { part2 } from './part2.mjs'
import { part3 } from './part3.mjs'
import { part4 } from './part4.mjs'

// Create new design
const Wvw = new Design({
  data,
  parts: [box, part1, part2, part3, part4],
})

// Named exports
export { box, part1, part2, part3, part4, Wvw }
