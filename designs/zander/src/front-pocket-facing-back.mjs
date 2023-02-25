import { frontPocket } from './front-pocket.mjs'
// import { frontPocket } from '@freesewing/charlie'

function draftZanderFrontPocketFacingBack({
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
    points.titleAnchor = points.slantBottomNotch.shiftFractionTowards(points.anchor, 0.35)
    macro('title', {
      at: points.titleAnchor,
      nr: 12,
      title: 'frontPocketBagFacingBack',
      rotation: 90,
      scale: 0.6,
    })
    macro('grainline', {
      from: points.slantTop,
      to: new Point(points.slantTop.x, points.facingDirection.y),
    })
    macro('sprinkle', {
      snippet: 'notch',
      on: ['facingDirection', 'slantTop', 'slantCurveEnd'],
    })

    if (sa) paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa', true)
  }

  return part
}

export const frontPocketFacingBack = {
  name: 'zander.frontPocketFacingBack',
  from: frontPocket,
  // hideDependencies: true,
  draft: draftZanderFrontPocketFacingBack,
}
