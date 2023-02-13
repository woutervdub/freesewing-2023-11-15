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
  }

  return part
}

export const frontPocketFacing = {
  name: 'zoot.frontPocketFacing',
  from: charlieFrontPocketFacing,
  hideDependencies: true,
  draft: draftZootFrontPocketFacing,
}
