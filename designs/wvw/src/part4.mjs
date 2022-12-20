import { pluginBundle } from '@freesewing/plugin-bundle'

function draftPart4({
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

  points.point0 = new Point(-250.51, 319.591)
  points.point0Cp1 = new Point(-251.85, 344.013)
  points.point1Cp2 = new Point(-255.46, 351.868)
  points.point1 = new Point(-255.684, 376.777)
  points.point2 = new Point(-315.42, 371.84)
  points.point3 = new Point(-324.302, 379.208)
  points.point3Cp1 = new Point(-351.018, 362.566)
  points.point4Cp2 = new Point(-373.744, 338.999)
  points.point4 = new Point(-381.609, 324.279)
  points.point4Cp1 = new Point(-340, 311.983)
  points.point5Cp2 = new Point(-305.568, 312.429)
  points.point5 = new Point(-288.007, 313.63)
  points.point5Cp1 = new Point(-270.675, 314.815)
  points.point6Cp2 = new Point(-269.705, 316.541)
  points.point6 = new Point(-250.51, 319.591)

  console.log({ points: JSON.parse(JSON.stringify(points)) })

  points.dartPoint0 = new Point(-315.42, 371.84)
  points.dartPoint0Cp1 = new Point(-317.905, 356.364)
  points.dartPoint1Cp2 = new Point(-321.312, 340.785)
  points.dartPoint1 = new Point(-329.406, 324.686)
  points.dartPoint1Cp1 = new Point(-325.884, 343.555)
  points.dartPoint2Cp2 = new Point(-330.953, 357.473)
  points.dartPoint2 = new Point(-334.51, 372.263)

  paths.eyeBottom = new Path()
    .move(points.dartPoint0)
    .curve(points.dartPoint0Cp1, points.dartPoint1Cp2, points.dartPoint1)
    .curve(points.dartPoint1Cp1, points.dartPoint2Cp2, points.dartPoint2)

  paths.seam = new Path()
    .move(points.point0)
    .curve(points.point0Cp1, points.point1Cp2, points.point1)
    .line(points.point2)
    .line(points.point3)
    .curve(points.point3Cp1, points.point4Cp2, points.point4)
    .curve(points.point4Cp1, points.point5Cp2, points.point5)
    .curve(points.point5Cp1, points.point6Cp2, points.point6)
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

export const part4 = {
  name: 'part4',
  options: {
    size: { pct: 50, min: 10, max: 100, menu: 'fit' },
  },
  plugins: [pluginBundle],
  draft: draftPart4,
}
