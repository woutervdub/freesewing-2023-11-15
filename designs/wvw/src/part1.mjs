import { pluginBundle } from '@freesewing/plugin-bundle'

function draftPart1({
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

  points.point0 = new Point(122.046, 133.426)
  points.point1 = new Point(144.493, 131.548)
  points.point1Cp1 = new Point(146.794, 124.788)
  points.point2Cp2 = new Point(172.345, 105.282)
  points.point2 = new Point(165.995, 125.596)
  points.point2Cp1 = new Point(182.495, 127.548)
  points.point3Cp2 = new Point(185.621, 121.574)
  points.point3 = new Point(196.903, 118.357)
  points.point3Cp1 = new Point(198.319, 106.271)
  points.point4Cp2 = new Point(186.475, 85.1561)
  points.point4 = new Point(178.46, 67.4841)
  points.point4Cp1 = new Point(130.878, 79.6602)
  points.point5Cp2 = new Point(150.115, 58.1662)
  points.point5 = new Point(116.026, 12.5282)
  points.point5Cp1 = new Point(104.599, 40.147)
  points.point6Cp2 = new Point(120.548, 41.8822)
  points.point6 = new Point(102.491, 82.8021)
  points.point7 = new Point(109.117, 92.1141)
  points.point7Cp1 = new Point(121.939, 77.2911)
  points.point8Cp2 = new Point(132.431, 85.3482)
  points.point8 = new Point(135.853, 100.03)
  points.point8Cp1 = new Point(138.686, 112.184)
  points.point9Cp2 = new Point(141.177, 123.343)
  points.point9 = new Point(122.61, 125.056)

  console.log({ points: JSON.parse(JSON.stringify(points)) })

  paths.eyeBottom = new Path()
    .move(points.point7)
    .curve(points.point7Cp1, points.point8Cp2, points.point8)
    .curve(points.point8Cp1, points.point9Cp2, points.point9)
    .setText('Eye bottom', textAttribute)
  // .setHidden( true )

  paths.mouthTop = new Path()
    .move(points.point3)
    .curve(points.point3Cp1, points.point4Cp2, points.point4)
    .setText('Mouth top', textAttribute)
  // .setHidden( true )

  paths.nose = new Path()
    .move(points.point1)
    .curve(points.point1Cp1, points.point2Cp2, points.point2)
    .setText('Nose', textAttribute)
  // .setHidden( true )

  paths.seam = new Path()
    .move(points.point0)
    .line(points.point1)
    .join(paths.nose)
    // .curve( points.point1Cp1,points.point2Cp2,points.point2 )
    .curve(points.point2Cp1, points.point3Cp2, points.point3)
    .join(paths.mouthTop)
    .curve(points.point4Cp1, points.point5Cp2, points.point5)
    .curve(points.point5Cp1, points.point6Cp2, points.point6)
    .line(points.point7)
    .join(paths.eyeBottom)
    .close()
    .attr('class', 'fabric')

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

export const part1 = {
  name: 'part1',
  options: {
    size: { pct: 50, min: 10, max: 100, menu: 'fit' },
  },
  plugins: [pluginBundle],
  draft: draftPart1,
}
