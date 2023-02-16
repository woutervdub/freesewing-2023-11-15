import { frontPocketFacing as charlieFrontPocketFacing } from '@freesewing/charlie'

function draftZootFrontPocketFacing({
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
  for (let id in snippets) delete snippets[id]

  if (complete) {
    macro('sprinkle', {
      snippet: 'notch',
      on: ['facingDirection', 'slantTop', 'slantCurveEnd'],
    })
    if (sa) {
      points.slantMeetsSide = paths.sa.intersects(
        new Path()
          .move(points.slantTop)
          .line(points.slantTop.shiftOutwards(points.slantCurveStart, 200))
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
  name: 'zoot.frontPocketFacing',
  from: charlieFrontPocketFacing,
  hideDependencies: true,
  draft: draftZootFrontPocketFacing,
}
