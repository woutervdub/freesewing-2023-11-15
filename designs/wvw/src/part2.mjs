import { pluginBundle } from '@freesewing/plugin-bundle'

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

  points.point0 = new Point(385.139, 100.78)
  points.point0Cp1 = new Point(346.941, 96.7207)
  points.point1Cp2 = new Point(294.608, 90.8007)
  points.point1 = new Point(259.744, 67.3497)
  points.point2 = new Point(273.326, 50.4987)
  points.point2Cp1 = new Point(294.988, 59.1517)
  points.point3Cp2 = new Point(317.297, 63.6377)
  points.point3 = new Point(343.105, 67.8147)
  points.point3Cp1 = new Point(325.625, 56.3887)
  points.point4Cp2 = new Point(308.101, 45.4167)
  points.point4 = new Point(291.966, 20.0327)
  points.point4Cp1 = new Point(301.277, 18.1667)
  points.point5Cp2 = new Point(308.669, 15.7217)
  points.point5 = new Point(328.777, 22.1577)
  points.point6 = new Point(336.631, 13.2977)
  points.point6Cp1 = new Point(343.05, 21.1147)
  points.point7Cp2 = new Point(352.348, 16.7007)
  points.point7 = new Point(358.579, 12.9827)
  points.point7Cp1 = new Point(366.2, 8.43567)
  points.point8Cp2 = new Point(370.234, 3.44567)
  points.point8 = new Point(366.288, -2.29033)
  points.point9 = new Point(374.068, -4.20033)
  points.point9Cp1 = new Point(386.895, 5.72967)
  points.point10Cp2 = new Point(390.427, 63.4867)
  points.point10 = new Point(385.139, 100.78)

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
  options: {
    size: { pct: 50, min: 10, max: 100, menu: 'fit' },
  },
  plugins: [pluginBundle],
  draft: draftPart2,
}
