import { pluginBundle } from '@freesewing/plugin-bundle'
import { convertPoints } from './pointsUtil.mjs'

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
  store,
  paperless,
  macro,
  part,
  utils,
}) {
  console.log('part3')
  const textAttribute = 'text-xs center'
  const sizeFactor = 1

  // points.point0 = new Point( 153.999,380.842 )
  // points.point0Cp1 = new Point( 111.588,380.119 )
  // points.point1Cp2 = new Point( 102.796,398.185 )
  // points.point1 = new Point( -1.72734,425.254 )
  // points.point1Cp1 = new Point( 50.4992,440.02 )
  // points.point2Cp2 = new Point( 98.0439,454.206 )
  // points.point2 = new Point( 153.999,452.847 )

  points.point0 = new Point(0, 0)
  points.point0Cp1 = points.point0.shift(0.9766531413822468, 42.41716221059584 * sizeFactor)
  points.point1 = points.point0.shift(344.08224234639044, 161.93553876093907 * sizeFactor)
  points.point1Cp1 = points.point1.shift(195.7871794819755, 54.273808014286224 * sizeFactor)
  points.point1Cp2 = points.point1.shift(165.48077210575048, 107.97156739510456 * sizeFactor)
  points.point2 = points.point0.shift(270, 72.005 * sizeFactor)
  points.point2Cp2 = points.point2.shift(358.6087119924517, 55.97160080799905 * sizeFactor)

  points.point0 = new Point(0, 0)
  points.point0Cp2 = points.point0.shift(270.9766531413822, 42.41716221059584 * sizeFactor)
  points.point2 = points.point0.shift(254.08224234639044, 161.93553876093907 * sizeFactor)
  points.point2Cp2 = points.point2.shift(105.78717948197567, 54.27380801428633 * sizeFactor)
  points.point2Cp1 = points.point2.shift(75.48077210575057, 107.97156739510459 * sizeFactor)
  points.point1 = points.point0.shift(180, 72.005 * sizeFactor)
  points.point1Cp1 = points.point1.shift(268.60871199245156, 55.97160080799901 * sizeFactor)

  paths.firstSeam = new Path()
    .move(points.point1)
    .curve(points.point1Cp1, points.point2Cp2, points.point2)
    .setText('First Seam', textAttribute)
    .addClass('hidden')

  points.fs1 = paths.firstSeam.shiftAlong(store.get('firstSeam'))
  points.fs2 = paths.firstSeam.shiftAlong(store.get('firstSeam') + store.get('templeToJaw'))

  store.set(
    'upperJawToLowerJaw',
    paths.firstSeam.length() - store.get('firstSeam') - store.get('templeToJaw')
  )

  paths.secondSeam = new Path()
    .move(points.point2)
    .curve(points.point2Cp1, points.point0Cp2, points.point0)
    .setText('Second Seam', textAttribute)
    .addClass('hidden')

  store.set('secondSeam', paths.secondSeam.length())

  paths.seam = new Path()
    .move(points.point0)
    .line(points.point1)
    .curve(points.point1Cp1, points.point2Cp2, points.point2)
    .curve(points.point2Cp1, points.point0Cp2, points.point0)
    .close()

  // console.log({ points: JSON.parse(JSON.stringify(points)) })
  // console.log({ paths: JSON.parse(JSON.stringify(paths)) })
  // convertPoints(points,270)

  // Complete?
  if (complete) {
    points.title = points.point2.shiftFractionTowards(points.point1, 0.65)
    macro('title', {
      nr: 3,
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
    snippets.n1 = new Snippet('notch', points.fs1)
    snippets.n2 = new Snippet('notch', points.fs2)

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
