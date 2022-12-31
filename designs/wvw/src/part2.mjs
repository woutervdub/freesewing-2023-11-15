import { pluginBundle } from '@freesewing/plugin-bundle'
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
  paperless,
  macro,
  part,
}) {
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
  points.point2 = points.point0.shift(155.78697928223406, 122.59835275683763 * sizeFactor)
  points.point2Cp1 = points.point2.shift(338.225501502238, 23.326308173390814 * sizeFactor)
  points.point3 = points.point0.shift(141.89456943097056, 53.41879968784397 * sizeFactor)
  points.point3Cp1 = points.point3.shift(146.82890730505153, 20.883100248765764 * sizeFactor)
  points.point3Cp2 = points.point3.shift(170.8064552671208, 26.143836615921536 * sizeFactor)
  points.point4 = points.point0.shift(139.08654154364726, 123.293691591622 * sizeFactor)
  points.point4Cp1 = points.point4.shift(11.332414862960503, 9.496140110592282 * sizeFactor)
  points.point4Cp2 = points.point4.shift(302.44153405115503, 30.077993300750627 * sizeFactor)
  points.point5 = points.point0.shift(125.6356187763194, 96.73748550220851 * sizeFactor)
  points.point5Cp2 = points.point5.shift(162.2516064465369, 21.11288137606992 * sizeFactor)
  points.point6 = points.point0.shift(119.0078998582386, 100.03088961560826 * sizeFactor)
  points.point6Cp1 = points.point6.shift(309.39143738637324, 10.114793621226312 * sizeFactor)
  points.point7 = points.point0.shift(106.83135324063868, 91.72676538115797 * sizeFactor)
  points.point7Cp1 = points.point7.shift(30.822195101920396, 8.874408308214115 * sizeFactor)
  points.point7Cp2 = points.point7.shift(210.82427193940393, 7.2559551404346445 * sizeFactor)
  points.point8 = points.point0.shift(100.36453213741231, 104.78002255825726 * sizeFactor)
  points.point8Cp2 = points.point8.shift(304.5254766583761, 6.962227517109719 * sizeFactor)
  points.point9 = points.point0.shift(96.0200385798697, 105.5624778408924 * sizeFactor)
  points.point9Cp1 = points.point9.shift(322.2548163010328, 16.221492810465996 * sizeFactor)
  points.point10 = points.point0.shift(0, 0 * sizeFactor)
  points.point10Cp2 = points.point10.shift(81.92955090220643, 37.666339998598225 * sizeFactor)

  convertPoints(points)

  console.log({ points: JSON.parse(JSON.stringify(points)) })

  paths.eyeBottom = new Path()
    .move(points.point0)
    .curve(points.point0Cp1, points.point1Cp2, points.point1)
    .line(points.point2)
    .curve(points.point2Cp1, points.point3Cp2, points.point3)
    .curve(points.point3Cp1, points.point4Cp2, points.point4)
    .curve(points.point4Cp1, points.point5Cp2, points.point5)
    .line(points.point6)
    .curve(points.point6Cp1, points.point7Cp2, points.point7)
    .curve(points.point7Cp1, points.point8Cp2, points.point8)
    .line(points.point9)
    .curve(points.point9Cp1, points.point10Cp2, points.point10)
    .close()

  console.log({ paths: JSON.parse(JSON.stringify(paths)) })

  // Complete?
  if (complete) {
    points.title = points.point4.shiftFractionTowards(points.point10, 0.5)
    macro('title', {
      nr: 2,
      at: points.title,
      scale: 0.5,
      // title: 'pants',
    }) // points.logo = points.topLeft.shiftFractionTowards(points.bottomRight, 0.5)
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
  options: {
    size: { pct: 50, min: 10, max: 100, menu: 'fit' },
  },
  plugins: [pluginBundle],
  draft: draftPart2,
}
