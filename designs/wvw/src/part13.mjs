import { pluginBundle } from '@freesewing/plugin-bundle'
import { utils } from 'mocha'
import path from 'path'
import { part1 } from './part1.mjs'
import { part2 } from './part2.mjs'
import { convertPoints } from './pointsUtil.mjs'

function draftPart13({
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
  utils,
  macro,
  part,
}) {
  console.log('part13')
  const textAttribute = 'text-xs center'
  const sizeFactor = 1

  var noseSide = store.get('noseSide')
  var noseHeight = store.get('noseHeight')
  var noseCircumference = noseSide * 2
  var noseDiameter = (noseCircumference / Math.PI) * 2

  const c = 0.55191502449351
  // const c = 0.75

  // points.b0 = new Point(0,0).shift(0,noseDiameter*1.5).shift(90,noseDiameter*1.5)
  // points.b1 = new Point(0,0).shift(180,noseDiameter*1.5).shift(90,noseDiameter*1.5)
  // points.b2 = new Point(0,0).shift(180,noseDiameter*1.5).shift(270,noseDiameter*1.5)
  // points.b3 = new Point(0,0).shift(0,noseDiameter*1.5).shift(270,noseDiameter*1.5)

  // paths.box = new Path()
  //   .move(points.b0)
  //   .line(points.b1)
  //   .line(points.b2)
  //   .line(points.b3)
  //   .close()

  points.point0 = new Point(0, 0)
  points.point2 = points.point0.shift(0, noseDiameter / 1.8).shift(90, noseDiameter / 3)
  points.point0Cp1 = points.point0.shift(0, (noseDiameter / 2) * c * 1.9)
  points.point2Cp2 = points.point2.shift(325, (noseDiameter / 2) * c * 0.8)

  // points.point0.addCircle(noseHeight, 'note')
  // points.point2.addCircle(noseDiameter / 2,'mark')
  points.p2 = points.point2.clone()
  // points.p2.addCircle(noseDiameter / 2, 'mark')

  let ci = utils.circlesIntersect(points.point0, noseHeight, points.point2, noseHeight, 'x')
  console.log({ ci: ci })

  points.p0 = ci[0]
  points.p1 = points.point0.shiftTowards(
    points.p0.rotate(points.point0.angle(points.p0), points.point0),
    noseHeight
  )

  // points.p0 = utils.linesIntersect(points.point0, points.p0, points.point2, points.p1)

  console.log({
    nh: noseHeight,
    p1p0: points.p1.dist(points.p0),
    p0p2: points.p0.dist(points.point2),
  })

  // points.p0 = points.p1.shiftTowards(points.p0, noseHeight)
  // points.point2 = points.p0.shiftTowards(points.point2, noseHeight)

  macro('mirror', {
    mirror: [points.point0, points.p1],
    points: [points.point0, points.point0Cp1, points.point2, points.point2Cp2, points.p0],
    prefix: 'm',
  })

  console.log({ points: JSON.parse(JSON.stringify(points)) })

  paths.p = new Path().move(points.point0).curve(points.point0Cp1, points.point2Cp2, points.point2)
  // let p = new Path().move(points.point0).curve(points.point0Cp1, points.point2Cp2, points.point2)

  console.log({ l1: noseSide, l2: paths.p.length() })

  paths.m = new Path()
    .move(points.mPoint0)
    .curve(points.mPoint0Cp1, points.mPoint2Cp2, points.mPoint2)
    .reverse()

  paths.seam = new Path()
    .move(points.point2)
    .line(points.p0)
    .line(points.p1)
    .line(points.mP0)
    .line(points.mPoint2)
    .join(paths.m)
    .join(paths.p)
    .close()

  paths.p0 = new Path().move(points.point0).line(points.p0).addClass('dotted')
  paths.p1 = new Path().move(points.point0).line(points.p1).addClass('dashed')
  paths.mP0 = new Path().move(points.point0).line(points.mP0).addClass('dotted')

  // Complete?
  if (complete) {
    snippets.s1 = new Snippet('notch', points.p0)
    snippets.s2 = new Snippet('notch', points.mP0)
    points.title = points.p1
      .shiftFractionTowards(points.point2Cp2, 0.5)
      .shiftFractionTowards(points.point0, 0.5)
    macro('title', {
      nr: 13,
      at: points.title,
      scale: 0.25,
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
  console.log({ points: JSON.parse(JSON.stringify(points)) })

  console.log({ paths: JSON.parse(JSON.stringify(paths)) })

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

export const part13 = {
  name: 'part13',
  after: [part1, part2],
  options: {
    size: { pct: 50, min: 10, max: 100, menu: 'fit' },
  },
  plugins: [pluginBundle],
  draft: draftPart13,
}
