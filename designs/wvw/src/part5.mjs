import { pluginBundle } from '@freesewing/plugin-bundle'
import { convertPoints } from './pointsUtil.mjs'
import { part4 } from './part4.mjs'
import { part8 } from './part8.mjs'

function draftPart5({
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
  console.log('part5')
  const textAttribute = 'text-xs center'
  const sizeFactor = 1

  // points.point0 = new Point(-250.51, 319.591)
  // points.point0Cp1 = new Point(-251.85, 344.013)
  // points.point1Cp2 = new Point(-255.46, 351.868)
  // points.point1 = new Point(-255.684, 376.777)
  // points.point2 = new Point(-315.42, 371.84)
  // points.point3 = new Point(-324.302, 379.208)
  // points.point3Cp1 = new Point(-351.018, 362.566)
  // points.point4Cp2 = new Point(-373.744, 338.999)
  // points.point4 = new Point(-381.609, 324.279)
  // points.point4Cp1 = new Point(-340, 311.983)
  // points.point5Cp2 = new Point(-305.568, 312.429)
  // points.point5 = new Point(-288.007, 313.63)
  // points.point5Cp1 = new Point(-270.675, 314.815)
  // points.point6Cp2 = new Point(-269.705, 316.541)
  // points.point6 = new Point(-250.51, 319.591)
  // points.dartPoint0 = new Point(-315.42, 371.84)
  // points.dartPoint0Cp1 = new Point(-317.905, 356.364)
  // points.dartPoint1Cp2 = new Point(-321.312, 340.785)
  // points.dartPoint1 = new Point(-329.406, 324.686)
  // points.dartPoint1Cp1 = new Point(-325.884, 343.555)
  // points.dartPoint2Cp2 = new Point(-330.953, 357.473)
  // points.dartPoint2 = new Point(-334.51, 372.263)

  points.point0 = new Point(0, 0)
  points.point0Cp1 = points.point0.shift(266.8594121345838, 24.45873430903567 * sizeFactor)
  points.point1 = points.point0.shift(264.83014371859684, 57.4195861357429 * sizeFactor)
  points.point1Cp2 = points.point1.shift(89.48476820979678, 24.91000716579583 * sizeFactor)
  points.point2 = points.point0.shift(218.37, 82.3 * sizeFactor)
  points.point3 = points.point0.shift(218.93495280472038, 94.86540967602474 * sizeFactor)
  points.point3Cp1 = points.point3.shift(148.08028890914184, 31.47540023573964 * sizeFactor)
  points.point4 = points.point0.shift(182.0479806305003, 131.18279286933938 * sizeFactor)
  points.point4Cp1 = points.point4.shift(16.463094543223505, 43.387792027251145 * sizeFactor)
  points.point4Cp2 = points.point4.shift(298.1159050601914, 16.689416556608563 * sizeFactor)
  points.point5 = points.point0.shift(170.9671220145567, 37.967861804426136 * sizeFactor)
  points.point5Cp1 = points.point5.shift(356.08873754110124, 17.372462375840673 * sizeFactor)
  points.point5Cp2 = points.point5.shift(176.08762325510824, 17.602020395397776 * sizeFactor)
  points.point0Cp2 = points.point0.shift(170.9714347113461, 19.435805231582247 * sizeFactor)
  // points.dartPoint0 = points.point0.shift(218.8321634938166, 83.32626297272667 * sizeFactor)
  points.dartPoint0 = points.point2.clone()
  points.dartPoint0Cp1 = points.dartPoint0.shift(99.1221849088359, 15.674240045373804 * sizeFactor)
  points.dartPoint1 = points.point0.shift(183.6949553576291, 79.06034303618978 * sizeFactor)
  points.dartPoint1Cp1 = points.dartPoint1.shift(280.5728974416993, 19.194885907449436 * sizeFactor)
  points.dartPoint1Cp2 = points.dartPoint1.shift(296.6916101983046, 18.019174148667343 * sizeFactor)
  points.dartPoint2 = points.point0.shift(212.08967047259978, 99.14806898775184 * sizeFactor)
  points.dartPoint2 = points.dartPoint2.shift(270, 0.2 * sizeFactor)
  points.dartPoint2 = new Path()
    .move(points.point3)
    .curve(points.point3Cp1, points.point4Cp2, points.point4)
    .shiftAlong(12.256989612591314 * sizeFactor)
  points.dartPoint2Cp2 = points.dartPoint2.shift(76.4771638420823, 15.211717490145517 * sizeFactor)

  console.log(
    new Path()
      .move(points.point3)
      .curve(points.point3Cp1, points.point4Cp2, points.point4)
      .split(points.dartPoint2)
  )

  points.point3 = points.dartPoint2.clone()
  points.point3Cp1 = new Point(-106.21252668521936, 36.94650601428031)

  console.log(
    new Path()
      .move(points.dartPoint0)
      .curve(points.dartPoint0Cp1, points.dartPoint1Cp2, points.dartPoint1)
      .length()
  )
  console.log(
    new Path()
      .move(points.dartPoint1)
      .curve(points.dartPoint1Cp1, points.dartPoint2Cp2, points.dartPoint2)
      .length()
  )
  points.point0 = new Point(0, 0)
  2
  points.dartPoint0 = points.point0.shift(128.37, 82.29999999999998 * sizeFactor)
  points.dartPoint0Cp1 = points.dartPoint0.shift(9.122184908835848, 15.674240045373793 * sizeFactor)
  points.dartPoint1 = points.point0.shift(93.69495535762911, 79.06034303618978 * sizeFactor)
  points.dartPoint1Cp1 = points.dartPoint1.shift(190.57289744169927, 19.19488590744941 * sizeFactor)
  points.dartPoint1Cp2 = points.dartPoint1.shift(
    206.69161019830457,
    18.019174148667343 * sizeFactor
  )
  points.dartPoint2 = points.point0.shift(122.10525602099625, 99.24923435875874 * sizeFactor)
  points.dartPoint2Cp2 = points.dartPoint2.shift(346.4771638420822, 15.211717490145492 * sizeFactor)

  points.point0Cp2 = points.point0.shift(176.85941213458383, 24.45873430903567 * sizeFactor)
  points.point0Cp1 = points.point0.shift(80.97143471134606, 19.435805231582247 * sizeFactor)
  points.point5 = points.point0.shift(174.83014371859687, 57.4195861357429 * sizeFactor)
  points.point5Cp1 = points.point5.shift(359.48476820979687, 24.91000716579583 * sizeFactor)
  points.point4 = points.point0.shift(128.37, 82.29999999999998 * sizeFactor)
  points.point3 = points.point0.shift(122.10525602099625, 99.24923435875874 * sizeFactor)
  points.point3Cp2 = points.point3.shift(54.484617512340854, 27.201796658909853 * sizeFactor)
  points.point2 = points.point0.shift(92.0479806305003, 131.18279286933938 * sizeFactor)
  points.point2Cp2 = points.point2.shift(286.4630945432234, 43.38779202725112 * sizeFactor)
  points.point2Cp1 = points.point2.shift(208.11590506019132, 16.689416556608613 * sizeFactor)
  points.point1 = points.point0.shift(80.96712201455671, 37.967861804426136 * sizeFactor)
  points.point1Cp2 = points.point1.shift(266.0887375411011, 17.372462375840676 * sizeFactor)
  points.point1Cp1 = points.point1.shift(86.08762325510818, 17.602020395397776 * sizeFactor)

  console.log({
    l: new Path()
      .move(points.point5)
      .curve(points.point5Cp1, points.point0Cp2, points.point0)
      .length(),
    bolj: store.get('backOfLowerJaw'),
    p4: store.get('part4width'),
  })

  points.point5 = points.point5.shift(
    0,
    new Path()
      .move(points.point5)
      .curve(points.point5Cp1, points.point0Cp2, points.point0)
      .length() -
      (store.get('backOfLowerJaw') - store.get('part4width'))
  )
  points.point5Cp1 = points.point5.shift(359.48476820979687, 24.91000716579583 * sizeFactor)

  paths.thirdSeam1 = new Path()
    .move(points.point2)
    .curve(points.point2Cp1, points.point3Cp2, points.point3)
    .setText('Third Seam', textAttribute)
    .addClass('hidden')
  paths.thirdSeam2 = new Path()
    .move(points.point4)
    .line(points.point5)
    .setText('Third Seam', textAttribute)
    .addClass('hidden')

  paths.dart = new Path()
    .move(points.dartPoint0)
    .curve(points.dartPoint0Cp1, points.dartPoint1Cp2, points.dartPoint1)
    .curve(points.dartPoint1Cp1, points.dartPoint2Cp2, points.dartPoint2)

  // paths.seam = new Path()
  //   .move(points.point0)
  //   .curve(points.point0Cp1, points.point1Cp2, points.point1)
  //   .line(points.point2)
  //   .line(points.point3)
  //   .curve(points.point3Cp1, points.point4Cp2, points.point4)
  //   .curve(points.point4Cp1, points.point5Cp2, points.point5)
  //   .curve(points.point5Cp1, points.point0Cp2, points.point0)
  //   .close()

  paths.seam = new Path()
    .move(points.point0)
    .curve(points.point0Cp1, points.point1Cp2, points.point1)
    .curve(points.point1Cp1, points.point2Cp2, points.point2)
    .curve(points.point2Cp1, points.point3Cp2, points.point3)
    .line(points.point4)
    .line(points.point5)
    // .curve(points.point5Cp1, points.point0Cp2, points.point0)
    .line(points.point0)
    .close()

  // convertPoints(points)

  // points.p1 = utils.curvesIntersect(
  //   points.point3,
  //   points.point3Cp1,
  //   points.point4Cp2,
  //   points.point4,
  //   points.dartPoint1,
  //   points.dartPoint1Cp1,
  //   points.dartPoint2Cp2,
  //   points.dartPoint2,
  // )[0]
  // console.log({ p1: points.p1 })
  // let s1 = utils.splitCurve(
  //   points.point3,
  //   points.point3Cp1,
  //   points.point4Cp2,
  //   points.point4,
  //   points.p1
  // )
  // console.log( {s1: s1})

  // paths.p1 = new Path()
  //   .move(points.point3)
  //   .curve(points.point3Cp1,points.point4Cp2,points.point4)
  //   .addClass('hidden')

  // paths.p1a = new Path()
  // .move(s1[0].start)
  // .curve(s1[0].cp1,s1[0].cp2,s1[0].end)

  // paths.p1b = new Path()
  // .move(s1[1].start)
  // .curve(s1[1].cp1,s1[1].cp2,s1[1].end)

  // console.log( {l1: (paths.p1a).length()})
  // console.log( {l1: (paths.p1b).length()})
  // console.log( {l1: (paths.p1).length()})

  // console.log({ points: JSON.parse(JSON.stringify(points)) })
  // console.log({ paths: JSON.parse(JSON.stringify(paths)) })
  // convertPoints(points)

  // Complete?
  if (complete) {
    points.title = points.point4.shiftFractionTowards(points.point1, 0.6)
    macro('title', {
      nr: 5,
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

export const part5 = {
  name: 'part5',
  after: [part4, part8],
  options: {
    size: { pct: 50, min: 10, max: 100, menu: 'fit' },
  },
  plugins: [pluginBundle],
  draft: draftPart5,
}
