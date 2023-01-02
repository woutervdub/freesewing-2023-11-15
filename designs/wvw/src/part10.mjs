import { pluginBundle } from '@freesewing/plugin-bundle'
import { convertPoints } from './pointsUtil.mjs'

function draftPart10({
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
  console.log('part10')
  const textAttribute = 'text-xs center'
  const sizeFactor = 1

  // points.point0 = new Point( 376.653,-242.561 )
  // points.point1 = new Point( 376.653,-176.415  )
  // points.point1Cp1 = new Point( 376.653,-176.415 )
  // points.point2Cp2 = new Point( 336.966,-176.415 )
  // points.point2 = new Point( 336.966,-209.488 )
  // points.point2Cp1 = new Point( 336.966,-242.561 )
  // points.point3Cp2 = new Point( 376.653,-242.561 )
  // points.point3 = new Point( 376.653,-242.561 )

  points.point0 = new Point(0, 0)
  points.point1 = points.point0.shift(270, 66.14600000000002 * sizeFactor)
  points.point1Cp1 = points.point1.shift(0, 0 * sizeFactor)
  points.point2 = points.point0.shift(219.80599709691597, 51.66121657491237 * sizeFactor)
  points.point2Cp1 = points.point2.shift(90, 33.07300000000001 * sizeFactor)
  points.point2Cp2 = points.point2.shift(270, 33.07300000000001 * sizeFactor)
  // points.point3 = points.point0.shift( 0, 0 *sizeFactor );
  // points.point3Cp2 = points.point3.shift( 0, 0 *sizeFactor );
  points.point0Cp2 = points.point0.shift(0, 0 * sizeFactor)

  paths.seam = new Path()
    .move(points.point0)
    .line(points.point1)
    .curve(points.point1Cp1, points.point2Cp2, points.point2)
    // .curve( points.point2Cp1,points.point3Cp2,points.point3 )
    .curve(points.point2Cp1, points.point0Cp2, points.point0)
    .close()

  console.log({ points: JSON.parse(JSON.stringify(points)) })
  console.log({ paths: JSON.parse(JSON.stringify(paths)) })

  convertPoints(points)

  // Complete?
  if (complete) {
    points.title = points.point0.shiftFractionTowards(points.point2, 0.75)
    macro('title', {
      nr: 10,
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

export const part10 = {
  name: 'part10',
  options: {
    size: { pct: 50, min: 10, max: 100, menu: 'fit' },
  },
  plugins: [pluginBundle],
  draft: draftPart10,
}
