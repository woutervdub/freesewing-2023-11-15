import { pluginBundle } from '@freesewing/plugin-bundle'

function draftPart3({
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

  points.point0 = new Point(-282.159, 130.879)
  points.point0Cp1 = new Point(-282.496, 160.326)
  points.point1Cp2 = new Point(-295.578, 176.691)
  points.point1 = new Point(-296.145, 195.513)
  points.point1Cp1 = new Point(-297.056, 225.742)
  points.point2Cp2 = new Point(-275.923, 283.958)
  points.point2 = new Point(-275.923, 283.958)
  points.point3 = new Point(-246.629, 291.142)
  points.point3Cp1 = new Point(-238.481, 236.993)
  points.point4Cp2 = new Point(-229.29, 198.374)
  points.point4 = new Point(-232.854, 147.926)

  console.log({ points: JSON.parse(JSON.stringify(points)) })

  points.dartPoint0 = new Point(-232.455, 192.867)
  points.dartPoint0Cp1 = new Point(-232.455, 192.867)
  points.dartPoint1Cp2 = new Point(-250.493, 194.668)
  points.dartPoint1 = new Point(-264.149, 193.845)
  points.dartPoint1Cp1 = new Point(-250.544, 195.097)
  points.dartPoint2Cp2 = new Point(-232.966, 199.326)
  points.dartPoint2 = new Point(-232.966, 199.326)

  console.log({ points: JSON.parse(JSON.stringify(points)) })

  paths.eyeBottom = new Path()
    .move(points.dartPoint0)
    .curve(points.dartPoint0Cp1, points.dartPoint1Cp2, points.dartPoint1)
    .curve(points.dartPoint1Cp1, points.dartPoint2Cp2, points.dartPoint2)
    .close()

  paths.seam = new Path()
    .move(points.point0)
    .curve(points.point0Cp1, points.point1Cp2, points.point1)
    .curve(points.point1Cp1, points.point2Cp2, points.point2)
    .line(points.point3)
    .curve(points.point3Cp1, points.point4Cp2, points.point4)
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

export const part3 = {
  name: 'part3',
  options: {
    size: { pct: 50, min: 10, max: 100, menu: 'fit' },
  },
  plugins: [pluginBundle],
  draft: draftPart3,
}
