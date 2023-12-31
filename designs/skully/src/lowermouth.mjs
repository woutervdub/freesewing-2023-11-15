import { pluginBundle } from '@freesewing/plugin-bundle'
import { cheek } from './cheek.mjs'
import { head1 } from './head1.mjs'
import { uppermouth } from './uppermouth.mjs'
import { convertPoints } from './pointsUtil.mjs'

function draftLowermouth({
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
  console.log('lowermouth')
  const textAttribute = 'text-xs center'
  const sizeFactor = store.get('sizeFactor')

  points.point0 = new Point(0, 0)
  points.point6 = points.point0.shift(0.11139916029446559, 128.58224303534288 * sizeFactor)
  points.point6Cp2 = points.point6.shift(269.8182450112891, 5.359026963917993 * sizeFactor)
  points.point5 = points.point0.shift(328.14341716244707, 120.52788940738986 * sizeFactor)
  points.point5Cp1 = points.point5.shift(29.114015378370315, 25.571930803128662 * sizeFactor)
  points.point4 = points.point0.shift(317.9233666855834, 95.68080416154534 * sizeFactor)
  points.point4Cp2 = points.point4.shift(178.12857030706965, 15.433231709528583 * sizeFactor)
  points.point3 = points.point0.shift(312.29520434983914, 55.53156468171955 * sizeFactor)
  points.point3Cp2 = points.point3.shift(90, 6.745097849549684 * sizeFactor)
  points.point3Cp1 = points.point3.shift(270, 23.140963009347697 * sizeFactor)
  points.point2 = points.point0.shift(312.62624217423604, 44.01273783803957 * sizeFactor)
  points.point2Cp1 = points.point2.shift(358.24231642721344, 5.05337768230318 * sizeFactor)
  points.point1 = points.point0.shift(270, 32.77328218228992 * sizeFactor)

  points.point1 = points.point1.shift(
    90,
    points.point0.dist(points.point1) - store.get('mouthWidth') / 2
  )
  points.point2 = points.point2.shift(
    90,
    points.point0.dist(points.point1) - store.get('mouthWidth') / 2
  )
  points.point2Cp1 = points.point2.shift(358.24231642721344, 5.05337768230318 * sizeFactor)
  points.point3 = points.point3.shift(
    90,
    points.point0.dist(points.point1) - store.get('mouthWidth') / 2
  )
  points.point3Cp1 = points.point3.shift(270, 23.140963009347697 * sizeFactor)
  points.point3Cp2 = points.point3.shift(90, 6.745097849549684 * sizeFactor)
  points.point4 = points.point4.shift(
    90,
    points.point0.dist(points.point1) - store.get('mouthWidth') / 2
  )
  points.point4Cp2 = points.point4.shift(178.12857030706965, 15.433231709528583 * sizeFactor)

  points.point5 = points.point4.shift(
    0,
    store.get('upperJaw') -
      new Path()
        .move(points.point1)
        .line(points.point2)
        .curve(points.point2Cp1, points.point3Cp2, points.point3)
        .curve(points.point3Cp1, points.point4Cp2, points.point4)
        .length()
  )
  points.point5Cp1 = points.point5.shift(0, 9 * sizeFactor)

  points.point6 = new Point(points.point5.x, points.point0.y).shift(0, points.point5.x * 0.2)
  points.point6Cp2 = points.point6.shift(270, 5 * sizeFactor)

  points.pointM1 = points.point0.shift(180, store.get('mouthWidth') / 2)
  points.pointM1Cp1 = points.pointM1.shift(270, 33.0746752291626 * sizeFactor)

  paths.backOfUpperJaw = new Path()
    .move(points.point5)
    .curve(points.point5Cp1, points.point6Cp2, points.point6)
    .setText('21', textAttribute)
    .addClass('hidden')

  points.lowerJaw = paths.backOfUpperJaw.shiftAlong(store.get('upperJawToLowerJaw'))
  var ljAngle = points.lowerJaw.angle(
    paths.backOfUpperJaw.shiftAlong(store.get('upperJawToLowerJaw') + 1)
  )

  store.set('halfOfBack', paths.backOfUpperJaw.length() - store.get('upperJawToLowerJaw'))

  points.point2ToLowerJaw = points.point2.shift(0, points.point2.dist(points.lowerJaw) / 2)
  points.lowerJawToPoint2 = points.lowerJaw.shift(
    ljAngle + 90,
    points.point2.dist(points.lowerJaw) / 3
  )

  macro('mirror', {
    mirror: [points.pointM1, points.point6],
    points: [
      points.point0,
      points.lowerJaw,
      points.lowerJawToPoint2,
      points.point2ToLowerJaw,
      points.pointM1Cp1,
      points.point1,
      points.point2,
      points.point2Cp1,
      points.point3,
      points.point3Cp1,
      points.point3Cp2,
      points.point4,
      points.point4Cp2,
      points.point5,
      points.point5Cp1,
      points.point6Cp2,
    ],
    prefix: 'm',
  })
  console.log({ points: JSON.parse(JSON.stringify(points)) })

  paths.upperJaw1 = new Path()
    .move(points.point1)
    .line(points.point2)
    .curve(points.point2Cp1, points.point3Cp2, points.point3)
    .curve(points.point3Cp1, points.point4Cp2, points.point4)
    .line(points.point5)
    .setText('upperJaw' + ' (16)', textAttribute)
    .addClass('hidden')

  paths.upperJaw2 = new Path()
    .move(points.mPoint5)
    .line(points.mPoint4)
    .curve(points.mPoint4Cp2, points.mPoint3Cp1, points.mPoint3)
    .curve(points.mPoint3Cp2, points.mPoint2Cp1, points.mPoint2)
    .line(points.mPoint1)
    .setText('upperJaw' + ' (16)', textAttribute)
    .addClass('hidden')

  paths.front1 = new Path()
    .move(points.mPoint1)
    .curve_(points.mPointM1Cp1, points.pointM1)
    .setText('(16)', textAttribute)
    .addClass('hidden')

  paths.front2 = new Path()
    .move(points.pointM1)
    .curve_(points.pointM1Cp1, points.point1)
    .setText('(16)', textAttribute)
    .addClass('hidden')

  paths.backOfUpperJaw.curve(points.mPoint6Cp2, points.mPoint5Cp1, points.mPoint5)

  paths.seam = new Path()
    .move(points.point1)
    .join(paths.upperJaw1)
    .join(paths.backOfUpperJaw)
    .join(paths.upperJaw2)
    .join(paths.front1)
    .join(paths.front2)
    .close()

  paths.backOfMouth = new Path()
    .move(points.mPoint1)
    .line(points.point1)
    .setText('backOfMouth' + ' (11)', textAttribute)
    .setClass('dashed')

  paths.lowerJaw1 = new Path()
    .move(points.point2)
    .curve(points.point2ToLowerJaw, points.lowerJawToPoint2, points.lowerJaw)
    .setText('lowerJaw' + ' (14)', textAttribute)
    .setClass('dashed')
  paths.lowerJaw2 = new Path()
    .move(points.mPoint2)
    .curve(points.mPoint2ToLowerJaw, points.mLowerJawToPoint2, points.mLowerJaw)
    .setText('lowerJaw' + ' (14)', textAttribute)
    .setClass('dashed')

  store.set('lowerJaw', paths.lowerJaw1.length() + points.point1.dist(points.point2))

  // Complete?
  if (complete) {
    points.title = points.pointM1.shiftFractionTowards(points.point6, 0.5)
    macro('title', {
      nr: 7,
      at: points.title,
      scale: 0.5,
      title: 'lowerMouth',
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

export const lowermouth = {
  name: 'lowermouth',
  after: [cheek, head1, uppermouth],
  plugins: [pluginBundle],
  draft: draftLowermouth,
}
