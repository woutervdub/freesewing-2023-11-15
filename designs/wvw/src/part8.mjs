import { pluginBundle } from '@freesewing/plugin-bundle'
import { part11 } from './part11.mjs'
import { convertPoints } from './pointsUtil.mjs'

function draftPart8({
  options,
  Point,
  Path,
  points,
  paths,
  Snippet,
  snippets,
  complete,
  sa,
  store,
  paperless,
  macro,
  part,
}) {
  console.log('part8')
  const textAttribute = 'text-xs center'
  const sizeFactor = 1

  // points.point0 = new Point( 225.57,222.136 )
  // points.point0Cp1 = new Point( 225.928,235.555 )
  // points.point1Cp2 = new Point( 264.302,250.708 )
  // points.point1 = new Point( 274.623,250.688 )
  // points.point1Cp1 = new Point( 289.574,250.659 )
  // points.point2Cp2 = new Point( 297.542,248.601 )
  // points.point2 = new Point( 305.861,248.56 )
  // points.point2Cp1 = new Point( 314.761,248.518 )
  // points.point3Cp2 = new Point( 327.104,250.959 )
  // points.point3 = new Point( 335.043,253.913 )
  // points.point3Cp1 = new Point( 338.984,255.379 )
  // points.point4Cp2 = new Point( 348.36,266.659 )
  // points.point4 = new Point( 356.735,268.669 )
  // points.point5 = new Point( 360.626,213.732 )
  // points.point6 = new Point( 225.521,214.039 )
  // points.point6Cp1 = new Point( 225.521,214.039 )
  // points.point7Cp2 = new Point( 225.624,217.327 )
  // points.point7 = new Point( 225.57,222.136 )

  points.point0 = new Point(0, 0)
  points.point0Cp1 = points.point0.shift(271.5282081165893, 13.423774618191423 * sizeFactor)
  points.point1 = points.point0.shift(329.79784303240206, 56.7574974166409 * sizeFactor)
  points.point1Cp1 = points.point1.shift(0.11113474162861184, 14.951028125182583 * sizeFactor)
  points.point1Cp2 = points.point1.shift(180.11102743493262, 10.32101937794903 * sizeFactor)
  points.point2 = points.point0.shift(341.7834753138606, 84.52734739124374 * sizeFactor)
  points.point2Cp1 = points.point2.shift(0.270382570357072, 8.900099100571891 * sizeFactor)
  points.point2Cp2 = points.point2.shift(180.28237864410448, 8.319101033164598 * sizeFactor)
  points.point3 = points.point0.shift(343.81344080631544, 113.99173416524552 * sizeFactor)
  points.point3Cp1 = points.point3.shift(339.59546305762336, 4.204834955143868 * sizeFactor)
  points.point3Cp2 = points.point3.shift(159.590412018152, 8.47076366096944 * sizeFactor)
  points.point4 = points.point0.shift(340.4669995939806, 139.17462884448446 * sizeFactor)
  points.point4Cp2 = points.point4.shift(166.50426671920425, 8.612823288562234 * sizeFactor)
  points.point5 = points.point0.shift(3.560698409188234, 135.3172211952344 * sizeFactor)

  points.point6 = points.point0.shift(90.34672828513591, 8.097148263432018 * sizeFactor)
  points.point6Cp1 = points.point6.shift(0, 0 * sizeFactor)
  // points.point7 = points.point0.shift( 0, 0 *sizeFactor );
  // points.point7Cp2 = points.point7.shift( 89.35665584015415, 4.809303171978241 *sizeFactor );
  points.point0Cp2 = points.point0.shift(89.35665584015415, 4.809303171978241 * sizeFactor)

  points.point5 = points.point5.shift(0, (points.point4.dist(points.point5) / 3) * sizeFactor)
  points.point5Cp2 = points.point5.shift(270, (points.point4.dist(points.point5) / 3) * sizeFactor)

  macro('mirror', {
    mirror: [points.point5, points.point6],
    points: [
      points.point0,
      points.point0Cp1,
      points.point0Cp2,
      points.point1Cp2,
      points.point1,
      points.point1Cp1,
      points.point2Cp2,
      points.point2,
      points.point2Cp1,
      points.point3Cp2,
      points.point3,
      points.point3Cp1,
      points.point4Cp2,
      points.point4,
      points.point4,
      points.point5Cp2,
      points.point5,
      points.point6Cp1,
      points.point6,
    ],
    prefix: 'm',
  })

  paths.bottomJaw = new Path()
    .move(points.point6)
    .curve(points.point6Cp1, points.point0Cp2, points.point0)
    .curve(points.point0Cp1, points.point1Cp2, points.point1)
    .curve(points.point1Cp1, points.point2Cp2, points.point2)
    .curve(points.point2Cp1, points.point3Cp2, points.point3)
    .curve(points.point3Cp1, points.point4Cp2, points.point4)
    .setText('Jaw Bottom', textAttribute)
    .addClass('hidden')

  points.point4 = points.point4.shift(0, store.get('bottomJaw') - paths.bottomJaw.length())
  paths.seam = new Path()
    .move(points.point0)
    .curve(points.point0Cp1, points.point1Cp2, points.point1)
    .curve(points.point1Cp1, points.point2Cp2, points.point2)
    .curve(points.point2Cp1, points.point3Cp2, points.point3)
    .curve(points.point3Cp1, points.point4Cp2, points.point4)
    .curve(points.point4, points.point5Cp2, points.point5)
    .curve(points.mPoint5Cp2, points.mPoint4, points.mPoint4)
    .curve(points.mPoint4Cp2, points.mPoint3Cp1, points.mPoint3)
    .curve(points.mPoint3Cp2, points.mPoint2Cp1, points.mPoint2)
    .curve(points.mPoint2Cp2, points.mPoint1Cp1, points.mPoint1)
    .curve(points.mPoint1Cp2, points.mPoint0Cp1, points.mPoint0)
    .curve(points.mPoint0Cp2, points.mPoint6Cp1, points.point6)
    .curve(points.point6Cp1, points.point0Cp2, points.point0)
    .close()

  console.log({ bjCalc: paths.bottomJaw.length() })
  console.log({ bottomJaw: store.get('bottomJaw') })

  store.set(
    'backOfLowerJaw',
    new Path().move(points.point4).curve(points.point4, points.point5Cp2, points.point5).length()
  )
  console.log({ bolj: store.get('backOfLowerJaw') })

  console.log({ points: JSON.parse(JSON.stringify(points)) })
  // console.log({ paths: JSON.parse(JSON.stringify(paths)) })
  // convertPoints(points)

  // Complete?
  if (complete) {
    points.title = points.point6.shiftFractionTowards(points.point5, 0.5)
    macro('title', {
      nr: 8,
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

export const part8 = {
  name: 'part8',
  after: part11,
  options: {
    size: { pct: 50, min: 10, max: 100, menu: 'fit' },
  },
  plugins: [pluginBundle],
  draft: draftPart8,
}
