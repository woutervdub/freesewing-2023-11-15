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
  points.point1 = points.point0.shift(254.78244159705943, 22.5254232590644 * sizeFactor)
  points.point1Cp1 = points.point1.shift(321.2022157426192, 7.140882368447221 * sizeFactor)
  points.point2 = points.point0.shift(260.1018837009255, 44.64105174612264 * sizeFactor)
  points.point2Cp1 = points.point2.shift(243.25309471936828, 16.615062563830442 * sizeFactor)
  points.point2Cp2 = points.point2.shift(322.6411575424251, 21.283352555459906 * sizeFactor)
  points.point3 = points.point0.shift(261.38174456728586, 76.35866165668438 * sizeFactor)
  points.point3Cp1 = points.point3.shift(333.3176703576494, 12.168666812761435 * sizeFactor)
  points.point3Cp2 = points.point3.shift(85.91520774712568, 11.731692674119953 * sizeFactor)
  points.point4 = points.point0.shift(299.45265842618784, 86.78060596475459 * sizeFactor)
  points.point4Cp1 = points.point4.shift(84.35380802294482, 49.11521286943584 * sizeFactor)
  points.point4Cp2 = points.point4.shift(184.39630340760462, 19.40463369919666 * sizeFactor)
  points.point5 = points.point0.shift(342.8506386745285, 121.04758752176764 * sizeFactor)
  points.point5Cp1 = points.point5.shift(137.52316754335672, 29.889370057597382 * sizeFactor)
  points.point5Cp2 = points.point5.shift(196.75764739545923, 56.96390931984925 * sizeFactor)
  points.point6 = points.point0.shift(1.1205493505415198, 54.26948752485138 * sizeFactor)
  points.point6Cp2 = points.point6.shift(316.18924774003017, 44.726876316259826 * sizeFactor)
  points.point7 = points.point0.shift(357.37806779049225, 43.287782602138435 * sizeFactor)
  points.point7Cp1 = points.point7.shift(299.1399624138707, 19.59910745416729 * sizeFactor)
  points.point8 = points.point0.shift(317.5381963475652, 36.1375990486363 * sizeFactor)
  points.point8Cp1 = points.point8.shift(173.12090742697325, 12.479807891149623 * sizeFactor)
  points.point8Cp2 = points.point8.shift(353.1201304168364, 15.075322060904695 * sizeFactor)
  points.point9 = points.point0.shift(336.14503661026947, 8.388980629373263 * sizeFactor)
  points.point9Cp2 = points.point9.shift(255.27121271777986, 18.645853640957277 * sizeFactor)

  points.point5a = new Path()
    .move(points.point6)
    .curve(points.point6Cp2, points.point5Cp1, points.point5)
    .shiftAlong(65)

  var sp = new Path()
    .move(points.point5)
    .curve(points.point5Cp1, points.point6Cp2, points.point6)
    .split(points.point5a)

  points.point5aCp1 = sp[1].ops[1].cp1.clone()
  points.point6Cp2 = sp[1].ops[1].cp2.clone()

  points.point5 = points.point5.rotate(357, points.point0)
  points.point5Cp2 = points.point5.shift(196.75764739545923, 56.96390931984925 * sizeFactor)

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

  paths.upperJaw = new Path()
    .move(points.point4)
    .curve(points.point4Cp1, points.point5Cp2, points.point5)
    .setText('Upper Jaw', textAttribute)
    .addClass('hidden')

  paths.nose = new Path()
    .move(points.point1)
    .curve(points.point1Cp1, points.point2Cp2, points.point2)
    .setText('Nose', textAttribute)
    .addClass('hidden')

  store.set('templeToJaw', points.point5.dist(points.point5a))
  store.set('upperJaw', paths.upperJaw.length())

  console.log({ sp: sp })
  console.log({ points: JSON.parse(JSON.stringify(points)) })

  paths.seam = new Path()
    .move(points.point0)
    .line(points.point1)
    .join(paths.nose)
    // .curve( points.point1Cp1,points.point2Cp2,points.point2 )
    .curve(points.point2Cp1, points.point3Cp2, points.point3)
    .join(paths.mouthTop)
    .join(paths.upperJaw)
    .line(points.point5a)
    .curve(points.point5aCp1, points.point6Cp2, points.point6)
    .line(points.point7)
    .join(paths.eyeBottom)
    .line(points.point0)
    .close()
    .attr('class', 'fabric')

  store.set('noseBridgeWidth', points.point0.dist(points.point9))
  store.set('templeWidth', points.point6.dist(points.point7))
  store.set('mouthTop', paths.mouthTop.length())

  // console.log({
  //   l1: new Path()
  //     .move(points.point5)
  //     .curve(points.point5Cp1, points.point6Cp2, points.point6)
  //     .length(),
  // })

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
