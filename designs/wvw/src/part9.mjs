import { pluginBundle } from '@freesewing/plugin-bundle'
import { convertPoints } from './pointsUtil.mjs'

function draftPart9({
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
  console.log('part9')
  const textAttribute = 'text-xs center'
  const sizeFactor = 1

  // points.point0 = new Point( 442.424,368.585 )
  // points.point0Cp1 = new Point( 442.27,332.865 )
  // points.point1Cp2 = new Point( 429.309,335.288 )
  // points.point1 = new Point( 412.893,348.006 )
  // points.point1Cp1 = new Point( 412.739,358.383 )
  // points.point2Cp2 = new Point( 423.342,364.975 )
  // points.point2 = new Point( 442.424,368.585 )

  points.point0 = new Point(0, 0)
  points.point0Cp1 = points.point0.shift(90.24701834761159, 35.72033196934203 * sizeFactor)
  points.point1 = points.point0.shift(145.12886642320197, 35.99409954423086 * sizeFactor)
  points.point1Cp1 = points.point1.shift(269.14976367331803, 10.378142656564334 * sizeFactor)
  points.point1Cp2 = points.point1.shift(37.7660886486214, 20.766140228747393 * sizeFactor)
  // points.point2 = points.point0.shift( 0, 0 *sizeFactor );
  // points.point2Cp2 = points.point2.shift( 169.2871903668775, 19.42047435054045 *sizeFactor );
  points.point0Cp2 = points.point0.shift(169.2871903668775, 19.42047435054045 * sizeFactor)

  paths.seam = new Path()
    .move(points.point0)
    .curve(points.point0Cp1, points.point1Cp2, points.point1)
    // .curve( points.point1Cp1,points.point2Cp2,points.point2 )
    .curve(points.point1Cp1, points.point0Cp2, points.point0)
    .close()

  // console.log({ points: JSON.parse(JSON.stringify(points)) })
  // console.log({ paths: JSON.parse(JSON.stringify(paths)) })
  // convertPoints(points)

  // Complete?
  if (complete) {
    points.title = points.point1.shiftFractionTowards(points.point0, 0.5)
    macro('title', {
      nr: 9,
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

export const part9 = {
  name: 'part9',
  options: {
    size: { pct: 50, min: 10, max: 100, menu: 'fit' },
  },
  plugins: [pluginBundle],
  draft: draftPart9,
}
