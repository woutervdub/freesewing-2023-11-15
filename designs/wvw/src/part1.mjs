import { pluginBundle } from '@freesewing/plugin-bundle'
import { convertPoints } from './pointsUtil.mjs'

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
  store,
  paperless,
  macro,
  part,
}) {
  console.log('part1')
  const textAttribute = 'text-xs center'
  const sizeFactor = 1

  // points.point0 = new Point(122.046, 133.426)
  // points.point1 = new Point(144.493, 131.548)
  // points.point1Cp1 = new Point(146.794, 124.788)
  // points.point2Cp2 = new Point(172.345, 105.282)
  // points.point2 = new Point(165.995, 125.596)
  // points.point2Cp1 = new Point(182.495, 127.548)
  // points.point3Cp2 = new Point(185.621, 121.574)
  // points.point3 = new Point(196.903, 118.357)
  // points.point3Cp1 = new Point(198.319, 106.271)
  // points.point4Cp2 = new Point(186.475, 85.1561)
  // points.point4 = new Point(178.46, 67.4841)
  // points.point4Cp1 = new Point(130.878, 79.6602)
  // points.point5Cp2 = new Point(150.115, 58.1662)
  // points.point5 = new Point(116.026, 12.5282)
  // points.point5Cp1 = new Point(104.599, 40.147)
  // points.point6Cp2 = new Point(120.548, 41.8822)
  // points.point6 = new Point(102.491, 82.8021)
  // points.point7 = new Point(109.117, 92.1141)
  // points.point7Cp1 = new Point(121.939, 77.2911)
  // points.point8Cp2 = new Point(132.431, 85.3482)
  // points.point8 = new Point(135.853, 100.03)
  // points.point8Cp1 = new Point(138.686, 112.184)
  // points.point9Cp2 = new Point(141.177, 123.343)
  // points.point9 = new Point(122.61, 125.056)

  points.point0 = new Point(0, 0)
  points.point1 = points.point0.shift(4.782441597059461, 22.5254232590644 * sizeFactor)
  points.point1Cp1 = points.point1.shift(71.20221574261915, 7.140882368447204 * sizeFactor)
  points.point2 = points.point0.shift(10.101883700925523, 44.64105174612264 * sizeFactor)
  points.point2Cp1 = points.point2.shift(353.25309471936816, 16.615062563830445 * sizeFactor)
  points.point2Cp2 = points.point2.shift(72.64115754242509, 21.28335255545987 * sizeFactor)
  points.point3 = points.point0.shift(11.3817445672859, 76.35866165668436 * sizeFactor)
  points.point3Cp1 = points.point3.shift(83.31767035764925, 12.16866681276137 * sizeFactor)
  points.point3Cp2 = points.point3.shift(195.91520774712572, 11.731692674119945 * sizeFactor)
  points.point4 = points.point0.shift(49.45265842618781, 86.78060596475459 * sizeFactor)
  points.point4Cp1 = points.point4.shift(194.35380802294478, 49.1152128694359 * sizeFactor)
  points.point4Cp2 = points.point4.shift(294.39630340760465, 19.404633699196687 * sizeFactor)
  points.point5 = points.point0.shift(92.85063867452847, 121.04758752176764 * sizeFactor)
  points.point5Cp1 = points.point5.shift(247.5231675433567, 29.8893700575974 * sizeFactor)
  points.point5Cp2 = points.point5.shift(306.7576473954592, 56.96390931984919 * sizeFactor)
  points.point6 = points.point0.shift(111.12054935054155, 54.26948752485138 * sizeFactor)
  points.point6Cp2 = points.point6.shift(66.1892477400303, 44.726876316259776 * sizeFactor)
  points.point7 = points.point0.shift(107.37806779049234, 43.28778260213844 * sizeFactor)
  points.point7Cp1 = points.point7.shift(49.139962413870386, 19.599107454167385 * sizeFactor)
  points.point8 = points.point0.shift(67.53819634756516, 36.1375990486363 * sizeFactor)
  points.point8Cp1 = points.point8.shift(283.1209074269732, 12.479807891149603 * sizeFactor)
  points.point8Cp2 = points.point8.shift(103.12013041683639, 15.075322060904696 * sizeFactor)
  points.point9 = points.point0.shift(86.14503661026949, 8.388980629373263 * sizeFactor)
  points.point9Cp2 = points.point9.shift(5.271212717779854, 18.645853640957277 * sizeFactor)

  paths.eyeBottom = new Path()
    .move(points.point7)
    .curve(points.point7Cp1, points.point8Cp2, points.point8)
    .curve(points.point8Cp1, points.point9Cp2, points.point9)
    .setText('Eye bottom', textAttribute)
    .addClass('hidden')

  paths.mouthTop = new Path()
    .move(points.point3)
    .curve(points.point3Cp1, points.point4Cp2, points.point4)
    .setText('Mouth top', textAttribute)
    .addClass('hidden')

  paths.nose = new Path()
    .move(points.point1)
    .curve(points.point1Cp1, points.point2Cp2, points.point2)
    .setText('Nose', textAttribute)
    .addClass('hidden')

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
    .line(points.point0)
    .close()
    .attr('class', 'fabric')

  store.set('noseBridgeWidth', points.point0.dist(points.point9))
  store.set('templeWidth', points.point6.dist(points.point7))
  store.set('mouthTop', paths.mouthTop.length())

  // console.log({ points: JSON.parse(JSON.stringify(points)) })
  // console.log({ paths: JSON.parse(JSON.stringify(paths)) })
  // convertPoints(points)

  // Complete?
  if (complete) {
    points.title = points.point4.shiftFractionTowards(points.point0, 0.5)
    macro('title', {
      nr: 1,
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

export const part1 = {
  name: 'part1',
  options: {
    size: { pct: 50, min: 10, max: 100, menu: 'fit' },
  },
  plugins: [pluginBundle],
  draft: draftPart1,
}
