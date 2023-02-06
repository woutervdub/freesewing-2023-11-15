import { frontPocket } from './front-pocket.mjs'
// import { frontPocket } from '@freesewing/charlie'

function draftZootFrontPocketFacingBack({
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
  for (let id in paths) delete paths[id]
  for (let id in snippets) delete snippets[id]

  // Anchor for sampling/grid
  points.anchor = points.pocketFacingTop.clone()

  paths.seam = new Path()
    .move(points.pocketFacingTop)
    .line(points.slantTop)
    .line(points.styleWaistOut)
    ._curve(points.slantCurveCp2, points.slantCurveEnd)
    .join(
      new Path()
        .move(points.slantCurveEnd)
        .curve(points.pocketbagBottomCp1, points.pocketbagBottomCp2, points.pocketbagBottom)
        .split(points.pocketFacingBottom)
        .shift()
    )
    .line(points.pocketFacingTop)
    .close()
    .attr('class', 'fabric', true)

  if (complete) {
    points.titleAnchor = points.slantBottomNotch.shift(0, 10)
    macro('title', {
      at: points.titleAnchor,
      nr: 12,
      title: 'frontPocketBagFacing',
    })
    macro('grainline', {
      from: points.slantTop,
      to: new Point(points.slantTop.x, points.facingDirection.y),
    })
    macro('sprinkle', {
      snippet: 'notch',
      on: ['facingDirection', 'slantTop', 'slantTopNotch', 'slantBottomNotch'],
    })

    if (sa) paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa', true)
  }

  return part
}

export const frontPocketFacingBack = {
  name: 'zoot.frontPocketFacingBack',
  from: frontPocket,
  draft: draftZootFrontPocketFacingBack,
}
