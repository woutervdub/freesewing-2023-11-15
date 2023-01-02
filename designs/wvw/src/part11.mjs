import { pluginBundle } from '@freesewing/plugin-bundle'
import { convertPoints } from './pointsUtil.mjs'

function draftPart11({
  options,
  Point,
  Path,
  points,
  paths,
  Snippet,
  snippets,
  complete,
  sa,
  paperless,
  macro,
  part,
}) {
  console.log('part11')
  const textAttribute = 'text-xs center'
  const sizeFactor = 1

  // points.point0 = new Point( 153.999,380.842 )
  // points.point0Cp1 = new Point( 111.588,380.119 )
  // points.point1Cp2 = new Point( 102.796,398.185 )
  // points.point1 = new Point( -1.72734,425.254 )
  // points.point1Cp1 = new Point( 50.4992,440.02 )
  // points.point2Cp2 = new Point( 98.0439,454.206 )
  // points.point2 = new Point( 153.999,452.847 )

  points.point0 = new Point(0, 0)
  points.point0Cp1 = points.point0.shift(179.02334685861777, 42.41716221059584 * sizeFactor)
  points.point1 = points.point0.shift(195.9177576536095, 161.93553876093907 * sizeFactor)
  points.point1Cp1 = points.point1.shift(344.2128205180245, 54.27380801428622 * sizeFactor)
  points.point1Cp2 = points.point1.shift(14.519227894249555, 107.97156739510454 * sizeFactor)
  points.point2 = points.point0.shift(270, 72.005 * sizeFactor)
  points.point2Cp2 = points.point2.shift(181.39128800754833, 55.97160080799905 * sizeFactor)

  paths.seam = new Path()
    .move(points.point0)
    .curve(points.point0Cp1, points.point1Cp2, points.point1)
    .curve(points.point1Cp1, points.point2Cp2, points.point2)
    .close()

  console.log({ points: JSON.parse(JSON.stringify(points)) })
  console.log({ paths: JSON.parse(JSON.stringify(paths)) })

  convertPoints(points)

  // Complete?
  if (complete) {
    points.title = points.point1.shiftFractionTowards(points.point2, 0.65)
    macro('title', {
      nr: 11,
      at: points.title,
      scale: 0.5,
      // title: 'pants',
    })
    // points.logo = points.topLeft.shiftFractionTowards(points.bottomRight, 0.5)
    // snippets.logo = new Snippet('logo', points.logo)
    // points.text = points.logo
    //   .shift(-90, w / 8)
    //   .attr('data-text', 'hello')
    //   .attr('data-text-class', 'center')

    if (sa) {
      paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')
    }
  }

  // Paperless?
  if (paperless) {
    macro('hd', {
      from: points.bottomLeft,
      to: points.bottomRight,
      y: points.bottomLeft.y + sa + 15,
    })
    macro('vd', {
      from: points.bottomRight,
      to: points.topRight,
      x: points.topRight.x + sa + 15,
    })
  }

  return part
}

export const part11 = {
  name: 'part11',
  options: {
    size: { pct: 50, min: 10, max: 100, menu: 'fit' },
  },
  plugins: [pluginBundle],
  draft: draftPart11,
}
