// import { frontPocketFacing as charlieFrontPocketFacing } from '@freesewing/charlie'
// import { front } from '../../charlie/src/front.mjs'
import { frontPocket } from './front-pocket.mjs'

function draftZanderFrontPocketFacing({
  points,
  Point,
  paths,
  Path,
  complete,
  macro,
  snippets,
  sa,
  part,
}) {
  // Clean up
  for (const id in paths) delete paths[id]
  for (const id in snippets) delete snippets[id]

  points.anchor = points.pocketFacingTop.clone()

  paths.seam = new Path()
    .move(points.pocketFacingTop)
    .line(points.slantTop)
    .line(points.slantCurveStart)
    .join(
      new Path()
        .move(points.slantCurveStart)
        .curve(points.slantCurveCp1, points.slantCurveCp2, points.slantCurveEnd)
        .curve(points.pocketbagBottomCp1, points.pocketbagBottomCp2, points.pocketbagBottom)
        .split(points.pocketFacingBottom)
        .shift()
    )
    .line(points.pocketFacingTop)
    .close()
    .attr('class', 'fabric', true)

  if (complete) {
    points.titleAnchor = points.slantBottomNotch.shiftFractionTowards(points.anchor, 0.35)
    macro('title', {
      at: points.titleAnchor,
      nr: 8,
      title: 'frontPocketBagFacing',
      rotation: 90,
      scale: 0.6,
    })
    const glDecreaseX = (points.anchor.x - points.slantTop.x) / 2
    macro('grainline', {
      from: new Point(points.slantTop.x + glDecreaseX, points.slantTop.y),
      to: new Point(points.slantTop.x + glDecreaseX, points.facingDirection.y),
    })
    macro('sprinkle', {
      snippet: 'notch',
      on: ['facingDirection', 'slantTop', 'slantCurveEnd'],
    })

    if (sa) {
      paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa', true)
      points.slantMeetsSide = paths.sa.intersects(
        new Path()
          .move(points.slantTop)
          .line(points.slantTop.shiftOutwards(points.slantMeetsSide, 200))
      )[0]
      paths.sewing = new Path()
        .move(points.slantMeetsSide)
        .line(points.slantTop)
        .addText('sewAlong')
    }
  }

  return part
}

export const frontPocketFacing = {
  name: 'zander.frontPocketFacing',
  from: frontPocket,
  // from: charlieFrontPocketFacing,
  // after: front,
  // hideDependencies: true,
  draft: draftZanderFrontPocketFacing,
}
