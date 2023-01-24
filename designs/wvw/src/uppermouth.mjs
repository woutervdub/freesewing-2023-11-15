import { pluginBundle } from '@freesewing/plugin-bundle'
import { cheek } from './cheek.mjs'
import { convertPoints } from './pointsUtil.mjs'

function draftUppermouth({
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
  console.log('uppermouth')
  const textAttribute = 'text-xs center'
  const sizeFactor = store.get('sizeFactor')

  // points.point0 = new Point( 376.653,-242.561 )
  // points.point1 = new Point( 376.653,-176.415  )
  // points.point1Cp1 = new Point( 376.653,-176.415 )
  // points.point2Cp2 = new Point( 336.966,-176.415 )
  // points.point2 = new Point( 336.966,-209.488 )
  // points.point2Cp1 = new Point( 336.966,-242.561 )
  // points.point3Cp2 = new Point( 376.653,-242.561 )
  // points.point3 = new Point( 376.653,-242.561 )

  points.point0 = new Point(0, 0)
  points.point1 = points.point0.shift(270, 66.14600000000002 * sizeFactor)
  points.point1Cp1 = points.point1.shift(0, 0 * sizeFactor)
  // points.point3 = points.point0.shift( 0, 0 *sizeFactor );
  // points.point3Cp2 = points.point3.shift( 0, 0 *sizeFactor );
  points.point0Cp2 = points.point0.shift(0, 0 * sizeFactor)

  points.point2 = points.point0.shift(219.80599709691597, 51.66121657491237 * sizeFactor)

  points.point0 = new Point(0, 0)
  points.point0Cp1 = points.point0.shift(0, 0 * sizeFactor)
  points.point1 = points.point0.shift(222.41579397130369, 49.03292752740774 * sizeFactor)
  points.point2 = points.point0.shift(270, 66.14600000000002 * sizeFactor)
  points.point2Cp2 = points.point2.shift(0, 0 * sizeFactor)
  points.point1.x = points.point0.x - points.point0.dist(points.point2) / 2
  points.point1Cp1 = points.point1.shift(270, 33.0746752291626 * sizeFactor)
  points.point1Cp2 = points.point1.shift(90, 33.0746752291626 * sizeFactor)

  let mouthTop = store.get('mouthTop')

  // let iterations = 0
  // var p
  // do {
  //   iterations++

  //   points.point1Cp2 = points.point1.shift(90, 33.07300000000001 * sizeFactor)
  //   points.point1Cp1 = points.point1.shift(270, 33.07300000000001 * sizeFactor)

  //   p = new Path().move(points.point0).curve(points.point0Cp1, points.point1Cp2, points.point1)

  //   points.point1 = points.point1.shift(180, (mouthTop - p.length()) * 0.5)
  // } while (iterations < 100 && (mouthTop - p.length() > 1 || mouthTop - p.length() < -1))

  // if (iterations >= 100) {
  //   log.error('Something is not quite right here!')
  // }

  // console.log({ iterations: iterations })

  paths.mouth1 = new Path()
    .move(points.point0)
    .curve(points.point0Cp1, points.point1Cp2, points.point1)
    .setText('Mouth top/bottom', textAttribute)
    .addClass('hidden')
  paths.mouth2 = new Path()
    .move(points.point1)
    .curve(points.point1Cp1, points.point2Cp2, points.point2)
    .setText('Mouth top/bottom', textAttribute)
    .addClass('hidden')

  paths.backOfMouth = new Path()
    .move(points.point2)
    .line(points.point0)
    .setText('Back of Mouth', textAttribute)
    .addClass('hidden')

  store.set('MouthWidth', points.point0.dist(points.point2))

  paths.seam = new Path()
    .move(points.point0)
    .curve(points.point0Cp1, points.point1Cp2, points.point1)
    .curve(points.point1Cp1, points.point2Cp2, points.point2)
    .line(points.point0)
    .close()

  // console.log({ points: JSON.parse(JSON.stringify(points)) })
  // console.log({ paths: JSON.parse(JSON.stringify(paths)) })
  // convertPoints(points)

  // Complete?
  if (complete) {
    points.title = points.point0
      .shiftFractionTowards(points.point2, 0.25)
      .shiftFractionTowards(points.point1, 0.6)
    macro('title', {
      nr: 10,
      at: points.title,
      scale: 0.25,
      rotation: 90,
      title: 'uppermouth',
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

export const uppermouth = {
  name: 'uppermouth',
  after: cheek,
  plugins: [pluginBundle],
  draft: draftUppermouth,
}
