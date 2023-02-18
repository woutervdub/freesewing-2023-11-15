//

import { Design } from '@freesewing/core'
import { data } from '../data.mjs'
// Parts
import { front } from './front.mjs'
import { back } from './back.mjs'
import { frontPocketFacingBack } from './front-pocket-facing-back.mjs'
import { frontPocketFacing } from './front-pocket-facing.mjs'
import { frontPocket } from './front-pocket.mjs'
// Charlie
import { backPocket } from '@freesewing/charlie'
import { backPocketFacing } from '@freesewing/charlie'
import { backPocketInterfacing } from '@freesewing/charlie'
import { backPocketWelt } from '@freesewing/charlie'
import { beltLoops } from '@freesewing/charlie'
import { flyExtension } from '@freesewing/charlie'
import { flyFacing } from '@freesewing/charlie'
import { waistband } from '@freesewing/charlie'
import { waistbandCurved } from '@freesewing/charlie'

// Create new design
const Zander = new Design({
  data,
  parts: [
    front,
    back,
    backPocket,
    backPocketFacing,
    backPocketInterfacing,
    backPocketWelt,
    beltLoops,
    flyExtension,
    flyFacing,
    frontPocket,
    frontPocketFacing,
    frontPocketFacingBack,
    waistband,
    waistbandCurved,
  ],
})

// Named exports
export {
  front,
  back,
  backPocket,
  backPocketFacing,
  backPocketInterfacing,
  backPocketWelt,
  beltLoops,
  flyExtension,
  flyFacing,
  frontPocket,
  frontPocketFacing,
  frontPocketFacingBack,
  waistband,
  waistbandCurved,
  Zander,
}
