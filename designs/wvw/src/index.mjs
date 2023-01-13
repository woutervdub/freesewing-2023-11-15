//

import { Design } from '@freesewing/core'
import { data } from '../data.mjs'
// Parts
// import { box } from './box.mjs'
import { part1 } from './part1.mjs'
import { part2 } from './part2.mjs'
import { part3 } from './part3.mjs'
import { part4 } from './part4.mjs'
import { part5 } from './part5.mjs'
import { part6 } from './part6.mjs'
import { part7 } from './part7.mjs'
import { part8 } from './part8.mjs'
import { part9 } from './part9.mjs'
import { part10 } from './part10.mjs'
import { part11 } from './part11.mjs'
import { part12 } from './part12.mjs'
import { part13 } from './part13.mjs'

// Create new design
const Wvw = new Design({
  data,
  parts: [
    part1,
    part2,
    part3,
    part4,
    part5,
    part6,
    part7,
    part8,
    part9,
    part10,
    part11,
    part12,
    part13,
  ],
  // parts: [part10],
})

// Named exports
export {
  part1,
  part2,
  part3,
  part4,
  part5,
  part6,
  part7,
  part8,
  part9,
  part10,
  part11,
  part12,
  part13,
  Wvw,
}
// export { part10, Wvw }
