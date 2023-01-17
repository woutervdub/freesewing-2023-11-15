import { pluginBundle } from '@freesewing/plugin-bundle'
import { part1 } from './part1.mjs'
import { part6 } from './part6.mjs'
import { convertPoints } from './pointsUtil.mjs'

function draftPart11({
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
  console.log('part11')
  const textAttribute = 'text-xs center'
  const sizeFactor = store.get('sizeFactor')

  // points.point0 = new Point( -51.8735,201.484 )
  // points.point1 = new Point( -94.7305,197.669 )
  // points.point1Cp1 = new Point( -95.9315,250.677 )
  // points.point2Cp2 = new Point( -94.4875,267.925 )
  // points.point2 = new Point( -91.9525,273.759 )
  // points.point2Cp1 = new Point( -87.2415,284.598 )
  // points.point3Cp2 = new Point( -95.0055,300.763 )
  // points.point3 = new Point( -86.1085,301.82 )
  // points.point3Cp1 = new Point( -70.4625,303.678 )
  // points.point4Cp2 = new Point( -58.9235,312.248 )
  // points.point4 = new Point( -38.3645,317.458 )
  // points.point4Cp1 = new Point( -32.4955,277.729 )
  // points.point5Cp2 = new Point( -23.6165,260.602 )
  // points.point5 = new Point( -56.7515,252.033 )
  // points.point5Cp1 = new Point( -51.8445,232.433 )
  // points.point6Cp2 = new Point( -53.3405,218.079 )
  // points.point6 = new Point( -51.8735,201.484 )

  points.point0 = new Point(0, 0)
  points.point1 = points.point0.shift(174.91311161963839, 43.0264648094635 * sizeFactor)
  points.point2 = points.point0.shift(240.9901082422603, 82.64382533498798 * sizeFactor)
  points.point3 = points.point0.shift(251.1601763775522, 106.01579184725264 * sizeFactor)
  points.point4 = points.point0.shift(276.6440430845334, 116.75813357963548 * sizeFactor)
  points.point5 = points.point0.shift(264.48800048134507, 50.78381912578058 * sizeFactor)

  points.point0Cp2 = points.point0.shift(264.9481781658739, 16.659715303689914 * sizeFactor)
  points.point1Cp1 = points.point1.shift(268.7020740231185, 53.02160375733648 * sizeFactor)

  let mouthTop = store.get('mouthTop')

  let iterations = 0
  var p
  do {
    iterations++

    points.point5Cp1 = points.point5.shift(75.9444990655226, 20.20491645614997 * sizeFactor)
    points.point5Cp2 = points.point5.shift(345.5004759497096, 34.22507831985195 * sizeFactor)
    p = new Path().move(points.point5).curve(points.point5Cp1, points.point0Cp2, points.point0)

    points.point5 = points.point5.shift(270, (mouthTop - p.length()) * 0.5)

    console.log({ mouthTop: mouthTop, seriously: p.length() })
  } while (iterations < 100 && (mouthTop - p.length() > 1 || mouthTop - p.length() < -1))
  if (iterations >= 100) {
    log.error('Something is not quite right here!')
  }

  points.point2 = points.point2.shift(270, (mouthTop - p.length()) * 0.5)
  points.point3 = points.point3.shift(270, (mouthTop - p.length()) * 0.5)
  points.point4 = points.point4.shift(270, (mouthTop - p.length()) * 0.5)

  points.point2Cp1 = points.point2.shift(293.4914135377402, 11.81852114268109 * sizeFactor)
  points.point2Cp2 = points.point2.shift(113.48599545649276, 6.360957553702117 * sizeFactor)
  points.point3Cp1 = points.point3.shift(353.2277046181922, 15.755934754878876 * sizeFactor)
  points.point3Cp2 = points.point3.shift(173.22478394781675, 8.959567958333698 * sizeFactor)
  points.point4Cp1 = points.point4.shift(81.59670910061827, 40.16016187716384 * sizeFactor)
  points.point4Cp2 = points.point4.shift(165.77964223723035, 21.20887976768222 * sizeFactor)

  points.point0 = new Point(0, 0)
  points.point0Cp2 = points.point0.shift(354.9481781658739, 16.659715303689914 * sizeFactor)
  points.point1 = points.point0.shift(264.91311161963836, 43.0264648094635 * sizeFactor)
  points.point1Cp1 = points.point1.shift(358.7020740231185, 53.02160375733651 * sizeFactor)
  points.point2 = points.point0.shift(331.14662128979205, 83.05325951149062 * sizeFactor)
  points.point2Cp1 = points.point2.shift(23.491413537740165, 11.818521142681087 * sizeFactor)
  points.point2Cp2 = points.point2.shift(203.48599545649284, 6.360957553702122 * sizeFactor)
  points.point3 = points.point0.shift(341.2414817357221, 106.45865437980989 * sizeFactor)
  points.point3Cp1 = points.point3.shift(83.22770461819215, 15.755934754878917 * sizeFactor)
  points.point3Cp2 = points.point3.shift(263.2247839478168, 8.959567958333654 * sizeFactor)
  points.point4 = points.point0.shift(6.617587088273078, 117.22282297600707 * sizeFactor)
  points.point4Cp1 = points.point4.shift(171.59670910061834, 40.160161877163844 * sizeFactor)
  points.point4Cp2 = points.point4.shift(255.77964223723035, 21.208879767682262 * sizeFactor)
  points.point5 = points.point0.shift(354.81977589032454, 54.026610044075944 * sizeFactor)
  points.point5Cp1 = points.point5.shift(166.25960112580196, 20.659041530160696 * sizeFactor)
  points.point5Cp2 = points.point5.shift(76.26126036953632, 34.11095664483535 * sizeFactor)

  paths.mouthBottom = new Path()
    .move(points.point5)
    .curve(points.point5Cp1, points.point0Cp2, points.point0)
    .setText('Mouth bottom', textAttribute)
    .addClass('hidden')

  paths.lowerJaw = new Path()
    .move(points.point4)
    .curve(points.point4Cp1, points.point5Cp2, points.point5)
    .setText('Lower Jaw', textAttribute)
    .addClass('hidden')

  points.point4 = points.point4.shift(355, store.get('lowerJaw') - paths.lowerJaw.length())
  points.point4Cp1 = points.point4.shift(171.59670910061834, 40.160161877163844 * sizeFactor)
  points.point4Cp2 = points.point4.shift(255.77964223723035, 21.208879767682262 * sizeFactor)

  paths.seam = new Path()
    .move(points.point0)
    .line(points.point1)
    .curve(points.point1Cp1, points.point2Cp2, points.point2)
    .curve(points.point2Cp1, points.point3Cp2, points.point3)
    .curve(points.point3Cp1, points.point4Cp2, points.point4)
    .curve(points.point4Cp1, points.point5Cp2, points.point5)
    .curve(points.point5Cp1, points.point0Cp2, points.point0)
    .close()

  paths.bottomJaw = new Path()
    .move(points.point1)
    .curve(points.point1Cp1, points.point2Cp2, points.point2)
    .curve(points.point2Cp1, points.point3Cp2, points.point3)
    .curve(points.point3Cp1, points.point4Cp2, points.point4)
    .setText('Jaw Bottom', textAttribute)
    .addClass('hidden')

  store.set('bottomJaw', paths.bottomJaw.length())

  console.log({ lowerJaw: paths.lowerJaw.length() })
  console.log({ ljCalc: store.get('lowerJaw') })

  // console.log({ points: JSON.parse(JSON.stringify(points)) })
  // console.log({ paths: JSON.parse(JSON.stringify(paths)) })
  // convertPoints(points,90)

  // Complete?
  if (complete) {
    points.title = points.point1.shiftFractionTowards(points.point4, 0.25)
    macro('title', {
      nr: 11,
      at: points.title,
      scale: 0.4,
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

export const part11 = {
  name: 'part11',
  after: [part1, part6],
  options: {
    size: { pct: 50, min: 10, max: 100, menu: 'fit' },
  },
  plugins: [pluginBundle],
  draft: draftPart11,
}
