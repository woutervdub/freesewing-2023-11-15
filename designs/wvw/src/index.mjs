//

import { Design } from '@freesewing/core'
import { data } from '../data.mjs'
// Parts
import { box } from './box.mjs'
import { part1 } from './part1.mjs'

// Create new design
const Wvw = new Design({
  data,
  parts: [box, part1],
})

// Named exports
export { box, part1, Wvw }
