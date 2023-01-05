import { pluginBundle } from '@freesewing/plugin-bundle'
import { part1 } from './part1.mjs'
import { convertPoints } from './pointsUtil.mjs'

function draftPart2({
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
  console.log('part2')
  const textAttribute = 'text-xs center'
  const sizeFactor = 1

  // points.point0 = new Point(385.139, 100.78)
  // points.point0Cp1 = new Point(346.941, 96.7207)
  // points.point1Cp2 = new Point(294.608, 90.8007)
  // points.point1 = new Point(259.744, 67.3497)
  // points.point2 = new Point(273.326, 50.4987)
  // points.point2Cp1 = new Point(294.988, 59.1517)
  // points.point3Cp2 = new Point(317.297, 63.6377)
  // points.point3 = new Point(343.105, 67.8147)
  // points.point3Cp1 = new Point(325.625, 56.3887)
  // points.point4Cp2 = new Point(308.101, 45.4167)
  // points.point4 = new Point(291.966, 20.0327)
  // points.point4Cp1 = new Point(301.277, 18.1667)
  // points.point5Cp2 = new Point(308.669, 15.7217)
  // points.point5 = new Point(328.777, 22.1577)
  // points.point6 = new Point(336.631, 13.2977)
  // points.point6Cp1 = new Point(343.05, 21.1147)
  // points.point7Cp2 = new Point(352.348, 16.7007)
  // points.point7 = new Point(358.579, 12.9827)
  // points.point7Cp1 = new Point(366.2, 8.43567)
  // points.point8Cp2 = new Point(370.234, 3.44567)
  // points.point8 = new Point(366.288, -2.29033)
  // points.point9 = new Point(374.068, -4.20033)
  // points.point9Cp1 = new Point(386.895, 5.72967)
  // points.point10Cp2 = new Point(390.427, 63.4867)
  // points.point10 = new Point(385.139, 100.78)

  points.point0 = new Point(0, 0)
  points.point0Cp1 = points.point0.shift(173.93394659874477, 38.41308527689494 * sizeFactor)
  points.point1 = points.point0.shift(165.07215199461328, 129.7747702101221 * sizeFactor)
  points.point1Cp2 = points.point1.shift(326.0735557262152, 42.01723333347876 * sizeFactor)
  // points.point2 = points.point0.shift(155.78697928223406, 122.59835275683763 * sizeFactor)
  points.point2 = points.point1.shift(47, 21.64317271104222 * sizeFactor)
  points.point2Cp1 = points.point2.shift(338.225501502238, 23.326308173390814 * sizeFactor)
  points.point3 = points.point0.shift(141.89456943097056, 53.41879968784397 * sizeFactor)
  points.point3Cp1 = points.point3.shift(146.82890730505153, 20.883100248765764 * sizeFactor)
  points.point3Cp2 = points.point3.shift(170.8064552671208, 26.143836615921536 * sizeFactor)
  points.point4 = points.point0.shift(139.08654154364726, 123.293691591622 * sizeFactor)
  points.point4Cp1 = points.point4.shift(11.332414862960503, 9.496140110592282 * sizeFactor)
  points.point4Cp2 = points.point4.shift(302.44153405115503, 30.077993300750627 * sizeFactor)
  points.point5 = points.point0.shift(125.6356187763194, 96.73748550220851 * sizeFactor)
  points.point5Cp2 = points.point5.shift(162.2516064465369, 21.11288137606992 * sizeFactor)
  // points.point6 = points.point0.shift(119.0078998582386, 100.03088961560826 * sizeFactor)
  points.point6 = points.point5.shift(48.44442389860464, store.get('templeWidth'))
  points.point6Cp1 = points.point6.shift(309.39143738637324, 10.114793621226312 * sizeFactor)
  points.point7 = points.point0.shift(106.83135324063868, 91.72676538115797 * sizeFactor)
  points.point7Cp1 = points.point7.shift(30.822195101920396, 8.874408308214115 * sizeFactor)
  points.point7Cp2 = points.point7.shift(210.82427193940393, 7.2559551404346445 * sizeFactor)
  points.point8 = points.point0.shift(100.36453213741231, 104.78002255825726 * sizeFactor)
  points.point8Cp2 = points.point8.shift(304.5254766583761, 6.962227517109719 * sizeFactor)
  // points.point9 = points.point0.shift(96.0200385798697, 105.5624778408924 * sizeFactor)
  points.point9 = points.point8.shift(13.793392692988947, store.get('noseBridgeWidth'))
  points.point9Cp1 = points.point9.shift(322.2548163010328, 16.221492810465996 * sizeFactor)
  points.point0Cp2 = points.point0.shift(81.92955090220643, 37.666339998598225 * sizeFactor)

  points.point0 = new Point(0, 0)
  points.point0Cp1 = points.point0.shift(333.9339465987448, 38.41308527689494 * sizeFactor)
  points.point0Cp2 = points.point0.shift(241.92955090220636, 37.666339998598225 * sizeFactor)
  points.point1 = points.point0.shift(325.07215199461336, 129.7747702101221 * sizeFactor)
  points.point1Cp2 = points.point1.shift(126.07355572621562, 42.01723333347864 * sizeFactor)
  points.point2 = points.point0.shift(315.99934749521526, 121.10503287183268 * sizeFactor)
  points.point2Cp1 = points.point2.shift(138.225501502238, 23.326308173390803 * sizeFactor)
  points.point3 = points.point0.shift(301.8945694309706, 53.41879968784397 * sizeFactor)
  points.point3Cp1 = points.point3.shift(306.82890730505164, 20.883100248765764 * sizeFactor)
  points.point3Cp2 = points.point3.shift(330.8064552671208, 26.14383661592154 * sizeFactor)
  points.point4 = points.point0.shift(299.0865415436474, 123.293691591622 * sizeFactor)
  points.point4Cp1 = points.point4.shift(171.33241486296131, 9.49614011059247 * sizeFactor)
  points.point4Cp2 = points.point4.shift(102.44153405115529, 30.07799330075059 * sizeFactor)
  points.point5 = points.point0.shift(285.6356187763194, 96.73748550220853 * sizeFactor)
  points.point5Cp2 = points.point5.shift(322.25160644653687, 21.112881376069897 * sizeFactor)
  points.point6 = points.point0.shift(279.23029819067256, 99.89481626481647 * sizeFactor)
  points.point6Cp1 = points.point6.shift(109.3914373863736, 10.114793621226355 * sizeFactor)
  points.point7 = points.point0.shift(266.83135324063875, 91.72676538115797 * sizeFactor)
  points.point7Cp1 = points.point7.shift(190.82219510192064, 8.8744083082141 * sizeFactor)
  points.point7Cp2 = points.point7.shift(10.824271939403667, 7.255955140434657 * sizeFactor)
  points.point8 = points.point0.shift(260.36453213741225, 104.78002255825727 * sizeFactor)
  points.point8Cp2 = points.point8.shift(104.52547665837686, 6.962227517109787 * sizeFactor)
  points.point9 = points.point0.shift(255.81688050452775, 105.61426225557886 * sizeFactor)
  points.point9Cp1 = points.point9.shift(122.25481630103288, 16.221492810466046 * sizeFactor)

  points.point0 = new Point(0, 0)
  points.point0Cp2 = points.point0.shift(333.9339465987448, 38.41308527689494 * sizeFactor)
  points.point0Cp1 = points.point0.shift(241.92955090220636, 37.666339998598225 * sizeFactor)
  points.point9 = points.point0.shift(325.07215199461336, 129.7747702101221 * sizeFactor)
  points.point9Cp1 = points.point9.shift(126.07355572621562, 42.01723333347864 * sizeFactor)
  points.point8 = points.point0.shift(315.99934749521526, 121.10503287183268 * sizeFactor)
  points.point8Cp2 = points.point8.shift(138.225501502238, 23.326308173390803 * sizeFactor)
  points.point7 = points.point0.shift(301.8945694309706, 53.41879968784397 * sizeFactor)
  points.point7Cp2 = points.point7.shift(306.82890730505164, 20.883100248765764 * sizeFactor)
  points.point7Cp1 = points.point7.shift(330.8064552671208, 26.14383661592154 * sizeFactor)
  points.point6 = points.point0.shift(299.0865415436474, 123.293691591622 * sizeFactor)
  points.point6Cp2 = points.point6.shift(171.33241486296131, 9.49614011059247 * sizeFactor)
  points.point6Cp1 = points.point6.shift(102.44153405115529, 30.07799330075059 * sizeFactor)
  points.point5 = points.point0.shift(285.6356187763194, 96.73748550220853 * sizeFactor)
  points.point5Cp1 = points.point5.shift(322.25160644653687, 21.112881376069897 * sizeFactor)
  points.point4 = points.point0.shift(279.23029819067256, 99.89481626481647 * sizeFactor)
  points.point4Cp2 = points.point4.shift(109.3914373863736, 10.114793621226355 * sizeFactor)
  points.point3 = points.point0.shift(266.83135324063875, 91.72676538115797 * sizeFactor)
  points.point3Cp2 = points.point3.shift(190.82219510192064, 8.8744083082141 * sizeFactor)
  points.point3Cp1 = points.point3.shift(10.824271939403667, 7.255955140434657 * sizeFactor)
  points.point2 = points.point0.shift(260.36453213741225, 104.78002255825727 * sizeFactor)
  points.point2Cp1 = points.point2.shift(104.52547665837686, 6.962227517109787 * sizeFactor)
  points.point1 = points.point0.shift(255.81688050452775, 105.61426225557886 * sizeFactor)
  points.point1Cp2 = points.point1.shift(122.25481630103288, 16.221492810466046 * sizeFactor)

  // console.log( 'points.point2 = points.point1.shift( ' +
  // points.point1.angle(points.point2) +
  // ', ' +
  // points.point1.dist(points.point2) +
  // ' *sizeFactor )')

  // console.log( {d1: (new Path().move(points.point2).curve(points.point2Cp1, points.point3Cp2, points.point3)).length()} )
  // console.log( {d2: (new Path().move(points.point3).curve(points.point3Cp1, points.point4Cp2, points.point4)).length()} )

  paths.firstSeam = new Path()
    .move(points.point9)
    .curve(points.point9Cp1, points.point0Cp2, points.point0)
    .setText('First Seam', textAttribute)
    .addClass('hidden')

  store.set('firstSeam', paths.firstSeam.length())
  store.set(
    'templeTop',
    new Path().move(points.point8).line(points.point9).length() +
      new Path()
        .move(points.point5)
        .curve(points.point5Cp1, points.point6Cp2, points.point6)
        .length()
  )

  console.log({ l: store.get('templeTop') })

  // console.log({ points: JSON.parse(JSON.stringify(points)) })
  // console.log({ paths: JSON.parse(JSON.stringify(paths)) })
  // convertPoints(points, 160, false)

  paths.seam = new Path()
    .move(points.point0)
    .curve(points.point0Cp1, points.point1Cp2, points.point1)
    .line(points.point2)
    .curve(points.point2Cp1, points.point3Cp2, points.point3)
    .curve(points.point3Cp1, points.point4Cp2, points.point4)
    .line(points.point5)
    .curve(points.point5Cp1, points.point6Cp2, points.point6)
    .curve(points.point6Cp1, points.point7Cp2, points.point7)
    .curve(points.point7Cp1, points.point8Cp2, points.point8)
    .line(points.point9)
    .curve(points.point9Cp1, points.point0Cp2, points.point0)
    .close()

  // Complete?
  if (complete) {
    points.title = points.point4.shiftFractionTowards(points.point0, 0.5)
    macro('title', {
      nr: 2,
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

export const part2 = {
  name: 'part2',
  after: part1,
  options: {
    size: { pct: 50, min: 10, max: 100, menu: 'fit' },
  },
  plugins: [pluginBundle],
  draft: draftPart2,
}
