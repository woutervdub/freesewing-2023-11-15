import { elastics } from '@freesewing/snapseries'
import { pctBasedOn } from '@freesewing/core'
import { front as charlieFront } from '@freesewing/charlie'
import { captureRejectionSymbol } from 'events'

function draftZootFront({
  points,
  Point,
  paths,
  Path,
  options,
  complete,
  paperless,
  measurements,
  store,
  macro,
  utils,
  snippets,
  Snippet,
  sa,
  log,
  part,
}) {
  const pleatRatios = [[0], [1], [0.6, 0.4], [0.5, 0.25, 0.25], [0.4, 0.2, 0.2, 0.2]]
  const rotatePoints = (angle, center, pointList) => {
    console.log({ angle: angle, center: center, pointList: pointList })
    pointList.forEach((pointName) => {
      if (points[pointName] != undefined) {
        points[pointName + angle] = points[pointName].clone()
        points[pointName] = points[pointName].rotate(angle, center)
      }
    })
  }

  const addPleat = (pleats, pleatNr, pointTop, pointBottom) => {
    const pleatSize = ((measurements.waist * options.pleatSize) / 4) * pleatRatios[pleats][pleatNr]

    var iteration = 0,
      diff = pleatSize
    points['pleatIn' + pleatNr] = pointTop.clone()
    points['pleatMid' + pleatNr] = pointTop.clone()
    points['pleatOut' + pleatNr] = pointTop.clone()
    points['pleatBot' + pleatNr] = pointBottom.clone()
    do {
      iteration++
      if (pleatNr == 0) {
        if ('foldInwards' != options.pleatStyle) {
          points['pleatOut' + pleatNr] = points['pleatOut' + pleatNr].rotate(
            360 + diff / 50,
            pointBottom
          )
        }
        if ('foldOutwards' != options.pleatStyle) {
          points['pleatIn' + pleatNr] = points['pleatIn' + pleatNr].rotate(
            360 - diff / 50,
            pointBottom
          )
        }
      } else {
        points['pleatOut' + pleatNr] = points['pleatOut' + pleatNr].rotate(
          360 + diff / 50,
          pointBottom
        )
      }
      diff = pleatSize - points['pleatOut' + pleatNr].dist(points['pleatIn' + pleatNr])
      // console.log({ i: iteration, p: pleatSize, diff: diff })
    } while (iteration < 100 && (diff > 1 || diff < -1))

    if ('box' == options.pleatStyle) {
      points['pleatMid' + pleatNr] = points['pleatOut' + pleatNr].shiftFractionTowards(
        points['pleatIn' + pleatNr],
        0.5
      )
    }
    let angleIn = pointBottom.angle(pointTop) - pointBottom.angle(points['pleatIn' + pleatNr])
    let angleOut = pointBottom.angle(pointTop) - pointBottom.angle(points['pleatOut' + pleatNr])
    console.log({ angleIn: angleIn, angleOut: angleOut })

    if (0 == pleatNr) {
      rotatePoints(angleIn * -1, pointBottom, [
        'flyTop',
        'styleWaistIn',
        'anchor',
        'cfSeat',
        'fork',
        'forkCp1',
        'kneeIn',
        'kneeInCp2',
        'crotchSeamCurveStart',
        'crotchSeamCurveCp1',
        'crotchSeamCurveCp2',
        'crotchSeamCurveBend',
        'crotchSeamCurveMax',
        'flyCurveBottom',
        'flyCurveStart',
        'flyCurveCp1',
        'flyCurveCp2',
        'flyBottom',
        'flyCorner',
        'flyExtensionBottom',
      ])
    }
    rotatePoints((angleOut + (0 == pleatNr ? 0 : angleIn)) * -1, pointBottom, [
      // rotatePoints(angleOut * -1, pointBottom, [
      'slantTop',
      'slantBottom',
      'slantCurveStart',
      'slantCurveEnd',
      'slantCurveCp1',
      'slantCurveCp2',
      'slantLowest',
      'pocketbagBottom',
      'pocketbagBottomCp1',
      'pocketbagBottomCp2',
      'pocketbagBottomRight',
      'pocketbagTopRight',
      'pocketFacingBottom',
      'pocketFacingTop',
      'styleWaistOut',
      'styleSeatOut',
      'styleSeatOutCp1',
      'styleSeatOutCp2',
      'kneeOut',
      'kneeOutCp1',
      'seatOut',
      'seatOutCp1',
      'seatOutCp2',
      'seatY',
      'waistOut',
    ])
    paths['pleatA' + pleatNr] = new Path()
      .move(points['pleatMid' + pleatNr])
      .line(points['pleatBot' + pleatNr])
      .setClass('note')
      .addText(pleatNr, 'center')
    paths['pleatB' + pleatNr] = new Path()
      .move(points['pleatIn' + pleatNr])
      .line(points['pleatBot' + pleatNr])
      .setClass('note dashed')
      .addText(pleatNr, 'center')
    paths['pleatC' + pleatNr] = new Path()
      .move(points['pleatOut' + pleatNr])
      .line(points['pleatBot' + pleatNr])
      .setClass('note dashed')
      .addText(pleatNr, 'center')
  }
  // Helper method to draw the outseam path
  // const drawOutseam = () =>
  //   new Path()
  //     .move(points.slantTop)
  //     .line(points.slantCurveStart)
  //     .curve(points.slantCurveCp1, points.slantCurveCp2, points.slantCurveEnd)
  //     .join(sideSeam.split(points.slantCurveEnd).pop())

  // Helper method to draw the outline path
  const drawPath = () => {
    // let outseam = drawOutseam()
    return new Path()
      .move(points.floorIn)
      .curve(points.kneeInCp2, points.forkCp1, points.fork)
      .curve(points.crotchSeamCurveCp1, points.crotchSeamCurveCp2, points.crotchSeamCurveStart)
      .line(points.styleWaistIn)
      .join(pleatSeam())
      .join(sideSeam())
  }

  // Helper method to draw the pleat(s) path
  const pleatSeam = () => {
    let pleatSeam = new Path().move(points.styleWaistIn)
    for (var i = 0; i < options.pleatNumber; i++) {
      pleatSeam.line(points['pleatIn' + i])
      pleatSeam.line(points['pleatMid' + i])
      pleatSeam.line(points['pleatOut' + i])
    }
    pleatSeam.line(points.styleWaistOut)
    return pleatSeam
  }

  // Helper method to draw the Titan side seam path
  const sideSeam = () => {
    return points.waistOut.x < points.seatOut.x
      ? new Path()
          .move(points.styleWaistOut)
          .curve(points.seatOut, points.kneeOutCp1, points.floorOut)
      : new Path()
          .move(points.styleWaistOut)
          ._curve(points.seatOutCp1, points.seatOut)
          .curve(points.seatOutCp2, points.kneeOutCp1, points.floorOut)
  }

  // Draw fly J-seam
  const flyBottom = utils.curveIntersectsY(
    points.crotchSeamCurveStart,
    points.crotchSeamCurveCp2,
    points.crotchSeamCurveCp1,
    points.fork,
    points.cfSeat.shiftFractionTowards(points.crotchSeamCurveCp2, options.flyLength).y
  )
  points.topPleat = utils.beamsIntersect(
    points.styleWaistIn,
    points.styleWaistOut,
    points.knee,
    points.grainlineBottom
  )

  if (options.pleatNumber > 0) {
    var pleatDistance = points.topPleat.dist(points.slantTop) / options.pleatNumber

    let top = points.topPleat
    let bottom = points.grainlineBottom

    addPleat(options.pleatNumber, 0, top, bottom)

    for (var i = 1; i < options.pleatNumber; i++) {
      top = points['pleatOut' + (i - 1)].shiftTowards(points.slantTop, pleatDistance)

      bottom = points.knee.shiftFractionTowards(points.kneeOut, (1 / options.pleatNumber) * i)
      if (4 == options.pleatNumber && 2 == i) {
        bottom = points.grainlineBottom
      }

      addPleat(options.pleatNumber, i, top, bottom)
    }
  }

  console.log({ points: JSON.parse(JSON.stringify(points)) })

  // Draw path
  paths.seam = drawPath().close().attr('class', 'fabric')

  console.log({ paths: JSON.parse(JSON.stringify(paths)) })

  // Store waistband length
  store.set('waistbandFront', points.styleWaistIn.dist(points.slantTop))
  store.set('waistbandFly', points.styleWaistIn.dist(points.flyTop))
  store.set('legWidthFront', points.floorIn.dist(points.floorOut))

  if (complete) {
    if ('box' != options.pleatStyle) {
      for (var i = 0; i < options.pleatNumber; i++) {
        macro('pleat', {
          from: points['pleatIn' + i],
          to: points['pleatOut' + i],
          reverse: 'foldOutwards' != options.pleatStyle,
          prefix: 'pleat' + i,
        })
      }
    } else {
      for (var i = 0; i < options.pleatNumber; i++) {
        macro('pleat', {
          from: points['pleatIn' + i],
          to: points['pleatMid' + i],
          reverse: false,
          prefix: 'pleatA' + i,
        })
        macro('pleat', {
          from: points['pleatMid' + i],
          to: points['pleatOut' + i],
          reverse: true,
          prefix: 'pleatB' + i,
        })
      }
    }

    points.titleAnchor = new Point(points.knee.x, points.fork.y)
    macro('title', {
      at: points.titleAnchor,
      nr: 2,
      title: 'front',
    })
    snippets.logo = new Snippet('logo', points.titleAnchor.shiftFractionTowards(points.knee, 0.666))
    // points.topPleat = utils.beamsIntersect(
    //   points.styleWaistIn,
    //   points.styleWaistOut,
    //   points.knee,
    //   points.grainlineBottom
    // )
    points.slantBottomNotch = new Path()
      .move(points.slantCurveStart)
      .curve(points.slantCurveCp1, points.slantCurveCp2, points.slantCurveEnd)
      .intersectsY(points.slantBottom.y)
      .pop()
    points.slantTopNotch = points.slantTop.shiftFractionTowards(points.slantCurveStart, 0.1)
    store.set('slantTopNotchDistance', points.slantTop.dist(points.slantTopNotch))
    macro('sprinkle', {
      snippet: 'notch',
      on: [
        'slantBottomNotch',
        'slantTopNotch',
        'topPleat',
        'grainlineBottom',
        'flyBottom',
        'flyExtensionBottom',
      ],
    })
    let Jseam = new Path()
      .move(points.flyCurveStart)
      .curve(points.flyCurveCp2, points.flyCurveCp1, points.flyBottom)
    paths.Jseam = new Path()
      .move(points.flyTop)
      .join(Jseam)
      .attr('class', 'dashed')
      .attr('data-text', 'Left panel only')
      .attr('data-text-class', 'center')
    paths.pocketBag = new Path()
      .move(points.slantTop)
      .line(points.slantCurveStart)
      .curve(points.slantCurveCp1, points.slantCurveCp2, points.slantCurveEnd)
      .curve(points.pocketbagBottomCp1, points.pocketbagBottomCp2, points.pocketbagBottom)
      .line(points.pocketbagBottomRight)
      .line(points.pocketbagTopRight)
      .move(points.pocketFacingTop)
      .line(points.pocketFacingBottom)
      .attr('class', 'lining dashed')

    // Bartack
    macro('bartack', {
      anchor: points.slantTopNotch,
      angle: points.slantTopNotch.angle(points.slantCurveStart) + 90,
      length: sa ? sa / 1.5 : 7.5,
      suffix: 'slantTop',
    })
    macro('bartack', {
      anchor: points.slantBottomNotch,
      length: sa ? sa / 2 : 5,
      suffix: 'slantBottom',
    })
    // This is too small to do on doll-sized patterns
    if (measurements.waist > 200) {
      macro('bartackFractionAlong', {
        path: Jseam.reverse(),
        start: 0,
        end: 0.1,
        suffix: 'stom',
      })
    }

    if (sa) {
      paths.sa = drawPath()
        .offset(sa)
        .join(
          new Path()
            .move(points.floorOut)
            .line(points.floorIn)
            .offset(sa * 6)
        )
        .close()
        .trim()
        .attr('class', 'fabric sa')
    }

    if (paperless) {
      // Clean up paperless dimensions
      macro('rmad')
      delete paths.hint

      macro('hd', {
        from: points.grainlineBottom,
        to: points.floorIn,
        y: points.floorIn.y - 15,
      })
      macro('hd', {
        from: points.floorOut,
        to: points.grainlineBottom,
        y: points.floorIn.y - 15,
      })
      macro('hd', {
        from: points.floorOut,
        to: points.floorIn,
        y: points.floorIn.y - 30,
      })

      let y = points.styleWaistIn.y - sa
      macro('hd', {
        from: points.grainlineFrom,
        to: points.flyTop,
        y: y - 15,
      })
      macro('hd', {
        from: points.grainlineFrom,
        to: points.styleWaistIn,
        y: y - 30,
      })
      macro('hd', {
        from: points.grainlineFrom,
        to: points.flyBottom,
        y: y - 45,
      })
      macro('hd', {
        from: points.grainlineFrom,
        to: points.flyExtensionBottom,
        y: y - 60,
      })
      macro('hd', {
        from: points.grainlineFrom,
        to: points.fork,
        y: y - 75,
      })

      macro('hd', {
        from: points.pocketFacingTop,
        to: points.grainlineFrom,
        y: y - 15,
      })
      macro('hd', {
        from: points.slantTop,
        to: points.grainlineFrom,
        y: y - 30,
      })
      macro('hd', {
        from: points.slantBottomNotch,
        to: points.grainlineFrom,
        y: y - 45,
      })

      let x = points.fork.x + sa
      macro('vd', {
        from: points.floorIn,
        to: points.fork,
        x: x + 15,
      })
      macro('vd', {
        from: points.fork,
        to: points.flyExtensionBottom,
        x: x + 15,
      })
      macro('vd', {
        from: points.fork,
        to: points.flyBottom,
        x: x + 30,
      })
      macro('vd', {
        from: points.fork,
        to: points.slantTop,
        x: x + 45,
      })
      macro('vd', {
        from: points.fork,
        to: points.styleWaistIn,
        x: x + 60,
      })
    }
  }

  return part
}

export const front = {
  name: 'zoot.front',
  from: charlieFront,
  hideDependencies: true,
  measurements: [
    'crossSeam',
    'crossSeamFront',
    'knee',
    'seat',
    'seatBack',
    'waist',
    'waistBack',
    'waistToFloor',
    'waistToKnee',
    'waistToHips',
    'waistToSeat',
    'waistToUpperLeg',
  ],
  options: {
    // Constants (from Titan)
    titanPaperless: true,
    fitCrossSeam: true,
    fitCrossSeamFront: true,
    fitCrossSeamBack: true,
    fitGuides: false,
    // Lock titan options
    fitKnee: true,
    // Charlie constants
    waistbandReduction: 0.25, // See src/index.js
    waistbandFactor: 0.1,

    // Fit (from Titan)
    waistEase: { pct: 1, min: 0, max: 5, menu: 'fit' },
    seatEase: { pct: 5, min: 0, max: 10, menu: 'fit' },
    kneeEase: { pct: 15, min: 10, max: 30, menu: 'fit' },

    // Style (from Titan)
    waistHeight: { pct: -4, min: -15, max: 40, menu: 'style' },
    waistbandWidth: {
      pct: 3,
      min: 1,
      max: 6,
      snap: elastics,
      ...pctBasedOn('waistToFloor'),
      menu: 'style',
    },
    //waistbandWidth: { pct: 3.5, min: 2, max: 5 },
    lengthBonus: { pct: 2, min: -20, max: 10, menu: 'style' },
    crotchDrop: { pct: 2, min: 0, max: 15, menu: 'style' },

    // Advanced (from Titan)
    crossSeamCurveStart: { pct: 85, min: 60, max: 100, menu: 'advanced' },
    crossSeamCurveBend: { pct: 65, min: 45, max: 85, menu: 'advanced' },
    crossSeamCurveAngle: { deg: 12, min: 0, max: 20, menu: 'advanced' },
    crotchSeamCurveStart: { pct: 80, min: 60, max: 95, menu: 'advanced' },
    crotchSeamCurveBend: { pct: 80, min: 45, max: 100, menu: 'advanced' },
    crotchSeamCurveAngle: { deg: 25, min: 0, max: 35, menu: 'advanced' },
    grainlinePosition: { pct: 50, min: 30, max: 60, menu: 'advanced' },
    legBalance: { pct: 57.5, min: 52.5, max: 62.5, menu: 'advanced' },
    waistBalance: { pct: 55, min: 30, max: 90, menu: 'advanced' },

    // Front pockets
    frontPocketSlantDepth: { pct: 85, min: 70, max: 100, menu: 'pockets.frontpockets' },
    frontPocketSlantWidth: { pct: 25, min: 15, max: 35, menu: 'pockets.frontpockets' },
    frontPocketSlantRound: { pct: 30, min: 5, max: 50, menu: 'pockets.frontpockets' },
    frontPocketSlantBend: { pct: 25, min: 5, max: 50, menu: 'pockets.frontpockets' },
    frontPocketWidth: { pct: 55, min: 45, max: 65, menu: 'pockets.frontpockets' },
    frontPocketDepth: { pct: 100, min: 85, max: 110, menu: 'pockets.frontpockets' },
    frontPocketFacing: { pct: 45, min: 25, max: 65, menu: 'pockets.frontpockets' },

    // Fly
    flyCurve: { pct: 72, min: 50, max: 100, menu: 'advanced.fly' },
    flyLength: { pct: 45, min: 30, max: 60, menu: 'advanced.fly' },
    flyWidth: { pct: 15, min: 10, max: 20, menu: 'advanced.fly' },

    // Pleats
    pleatStyle: {
      dflt: 'foldOutwards',
      list: ['foldOutwards', 'foldInwards', 'box'],
      menu: 'style',
    },

    pleatSize: { pct: 15, min: 0, max: 45, menu: 'style' },
    pleatNumber: { count: 2, min: 0, max: 4, menu: 'style' },
  },
  draft: draftZootFront,
}
