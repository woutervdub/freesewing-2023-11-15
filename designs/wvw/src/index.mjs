//

import { Design } from '@freesewing/core'
import { data } from '../data.mjs'
// Parts
// import { box } from './box.mjs'
import { cheek } from './cheek.mjs'
import { forehead } from './forehead.mjs'
import { head1 } from './head1.mjs'
import { head2 } from './head2.mjs'
import { head3 } from './head3.mjs'
import { lowermouth } from './lowermouth.mjs'
import { cheekbone } from './cheekbone.mjs'
import { jawfloor } from './jawfloor.mjs'
import { eye } from './eye.mjs'
import { uppermouth } from './uppermouth.mjs'
import { lowerjaw } from './lowerjaw.mjs'
// import { part12 } from './part12.mjs'
import { nose } from './nose.mjs'

// Create new design
const Wvw = new Design({
  data,
  parts: [
    cheek,
    forehead,
    head1,
    head2,
    head3,
    lowermouth,
    cheekbone,
    jawfloor,
    eye,
    uppermouth,
    lowerjaw,
    // part12,
    nose,
  ],
})

// Named exports
export {
  cheek,
  forehead,
  head1,
  head2,
  head3,
  lowermouth,
  cheekbone,
  jawfloor,
  eye,
  uppermouth,
  lowerjaw,
  // part12,
  nose,
  Wvw,
}
