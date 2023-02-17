import { back as charlieBack } from '@freesewing/charlie'
import { front } from './front.mjs'
import { frontPocketFacingBack } from './front-pocket-facing-back.mjs'

function draftZootBack({
  points,
  Point,
  paths,
  Path,
  options,
  complete,
  paperless,
  store,
  macro,
  snippets,
  Snippet,
  sa,
  log,
  units,
  utils,
  part,
}) {
  // Helper method to draw the outseam path
  const drawOutseam = () => {
    let outseam = new Path()
      .move(points.styleWaistOut)
      // .curve(points.seatOut, points.kneeOutCp2, points.floorOut)
      .curve(points.seatOut, points.kneeOutCp2, points.hemOut)
      .line(points.cuffOneOut)
      .line(points.cuffTwoOut)
    return (
      new Path()
        //   .move(points.slantOut)
        //   .line(points.slantCurveStart)
        //   .curve(points.slantCurveCp1, points.slantCurveCp2, points.slantCurveEnd)
        //   .join(outseam.split(points.slantCurveEnd).pop())
        .move(points.styleWaistOut)
        .join(outseam)
        .reverse()
    )
  }
  /*
   * Helper method to draw the outline path
   */
  const drawPath = () => {
    let waistIn = points.styleWaistIn || points.waistIn
    return drawOutseam()
      ._curve(points.backDartRightCp, points.backDartRight)
      .noop('dart')
      .line(points.backDartLeft)
      .curve(points.backDartLeftCp, points.cbCp, waistIn)
      .line(points.crossSeamCurveStart)
      .curve(points.crossSeamCurveCp1, points.crossSeamCurveCp2, points.fork)
      .curve(points.forkCp2, points.kneeInCp1, points.hemIn)
      .line(points.cuffOneIn)
      .line(points.cuffTwoIn)
  }

  // Cuff
  let ankleWidth = store.get('legWidthFront')

  points.floorIn = points.floor.shift(180, ankleWidth / 2)
  points.floorOut = points.floor.shift(0, ankleWidth / 2)

  if (options.fitKnee) {
    const kneeInExtra1 = points.kneeIn.shiftFractionTowards(points.knee, -0.05)
    const kneeInExtra2 = points.kneeIn.shiftOutwards(kneeInExtra1, 200)
    const kneeOutExtra1 = points.kneeOut.shiftFractionTowards(points.knee, -0.05)
    const kneeOutExtra2 = points.kneeOut.shiftOutwards(kneeOutExtra1, 200)

    while (
      utils.lineIntersectsCurve(
        kneeInExtra1,
        kneeInExtra2,
        points.fork,
        points.forkCp2,
        points.kneeInCp1,
        points.floorIn
      )
    ) {
      points.kneeInCp1 = points.kneeInCp1.shiftFractionTowards(points.kneeOutCp2, 0.01)
    }
    while (
      utils.lineIntersectsCurve(
        kneeOutExtra1,
        kneeOutExtra2,
        points.styleWaistOut,
        points.seatOut,
        points.kneeOutCp2,
        points.floorOut
      )
    ) {
      points.kneeOutCp2 = points.kneeOutCp2.shiftFractionTowards(points.kneeInCp1, 0.01)
    }
  }

  while (
    utils.lineIntersectsCurve(
      points.knee,
      points.kneeOut,
      points.styleWaistOut,
      points.seatOut,
      points.kneeOutCp2,
      points.floorOut
    )
  ) {
    points.kneeOutCp2 = points.kneeOutCp2.shiftFractionTowards(points.kneeInCp1, -0.01)
  }
  while (
    utils.lineIntersectsCurve(
      points.knee,
      points.kneeIn,
      points.fork,
      points.forkCp2,
      points.kneeInCp1,
      points.floorIn
    )
  ) {
    points.kneeInCp1 = points.kneeInCp1.shiftFractionTowards(points.kneeOutCp2, -0.01)
  }
  // Mark back pocket
  //   let base = points.styleWaistIn.dist(points.styleWaistOut)
  //   let angle = points.styleWaistIn.angle(points.styleWaistOut)
  //   store.set('backPocketToWaistband', base * options.backPocketVerticalPlacement)
  //   store.set('backPocketWidth', base * options.backPocketWidth)
  //   store.set('backPocketDepth', base * options.backPocketDepth)
  //   points.waistPocketCenter = points.styleWaistIn.shiftFractionTowards(
  //     points.styleWaistOut,
  //     options.backPocketHorizontalPlacement
  //   )
  //   points.pocketCenter = points.waistPocketCenter.shift(
  //     angle - 90,
  //     store.get('backPocketToWaistband')
  //   )
  //   points.pocketRight = points.pocketCenter.shift(angle, store.get('backPocketWidth') / 2)
  //   points.pocketLeft = points.pocketCenter.shift(angle, store.get('backPocketWidth') / -2)

  //   // Back dart
  //   points.tmp1 = points.waistPocketCenter.rotate(8.66, points.pocketCenter)
  //   points.tmp2 = points.waistPocketCenter.rotate(-8.66, points.pocketCenter)
  //   points.backDartLeft = points.pocketCenter.shiftFractionTowards(points.tmp1, 1.05)
  //   points.backDartRight = points.pocketCenter.shiftFractionTowards(points.tmp2, 1.05)
  //   let newBase =
  //     points.styleWaistIn.dist(points.backDartLeft) + points.styleWaistOut.dist(points.backDartRight)
  //   let delta = base - newBase
  //   // Adapt waist to new darted reality
  //   for (let p of ['styleWaistIn', 'crossSeamCurveStart', 'crossSeamCurveCp1']) {
  //     points[p] = points[p].shift(angle + 180, delta / 2)
  //   }
  //   points.styleWaistOut = points.styleWaistOut.shift(angle, delta / 2)

  //   // Helper object that holds the titan outseam path adapted for the dart
  //   const titanOutseam = new Path()
  //     .move(points.styleWaistOut)
  //     .curve(points.seatOut, points.kneeOutCp2, points.floorOut)

  //   // Keep the seat control point vertically between the (lowered) waist and seat line
  //   points.seatOutCp2.y = points.styleWaistOut.y + points.styleWaistOut.dy(points.seatOut) / 2

  //   // Construct pocket slant
  //   points.slantBottom = titanOutseam.shiftAlong(store.get('slantLength'))
  //   points.slantOut = points.styleWaistIn.shiftOutwards(points.styleWaistOut, store.get('slantWidth'))

  //   // Shape waist
  //   let dist = points.styleWaistOut.dist(points.waistPocketCenter) / 3
  //   points.cbCp = points.styleWaistIn
  //     .shiftTowards(points.crossSeamCurveStart, dist)
  //     .rotate(90, points.styleWaistIn)
  //   points.backDartLeftCp = points.backDartLeft
  //     .shiftTowards(points.pocketCenter, dist)
  //     .rotate(-90, points.backDartLeft)
  //   points.backDartRightCp = points.backDartRight
  //     .shiftTowards(points.pocketCenter, dist)
  //     .rotate(90, points.backDartRight)

  // Store waistband length
  store.set(
    'waistbandBack',
    new Path()
      .move(points.styleWaistIn)
      .curve(points.cbCp, points.backDartLeftCp, points.backDartLeft)
      .length() +
      new Path()
        .move(points.backDartRight)
        .curve_(points.backDartRightCp, points.styleWaistOut)
        .length()
  )
  console.log({
    waistbandBack:
      new Path()
        .move(points.styleWaistIn)
        .curve(points.cbCp, points.backDartLeftCp, points.backDartLeft)
        .length() +
      new Path()
        .move(points.backDartRight)
        .curve_(points.backDartRightCp, points.styleWaistOut)
        .length(),
  })
  store.set('legWidthBack', points.floorIn.dist(points.floorOut))

  //   // Round the slant
  //   points.slantCurveStart = points.slantBottom.shiftFractionTowards(
  //     points.slantOut,
  //     options.frontPocketSlantRound
  //   )
  //   points.slantCurveEnd = titanOutseam.shiftAlong(
  //     points.slantBottom.dist(points.slantCurveStart) + store.get('slantLength')
  //   )
  //   points.slantCurveCp1 = points.slantBottom.shiftFractionTowards(
  //     points.slantCurveStart,
  //     options.frontPocketSlantBend
  //   )
  //   points.slantCurveCp2 = titanOutseam.shiftAlong(
  //     points.slantBottom.dist(points.slantCurveCp1) + store.get('slantLength')
  //   )

  // Anchor for sampling/grid
  // This breaks the samples for reason not clear. See #
  // points.anchor = points.fork.clone()

  // adjusting seams to match front
  const inseam = store.get('frontInSeam')
  const sideseam = store.get('frontSideSeam')

  var diff = 0,
    iter = 0
  do {
    iter++
    points.floorIn = points.floorIn.shift(90, diff)
    diff =
      new Path()
        .move(points.floorIn)
        .curve(points.kneeInCp1, points.forkCp2, points.fork)
        .length() - inseam
  } while (iter < 100 && (diff > 1 || diff < -1))
  ;(diff = 0), (iter = 0)
  do {
    iter++
    points.floorOut = points.floorOut.shift(90, diff)
    diff =
      new Path()
        .move(points.styleWaistOut)
        .curve(points.seatOut, points.kneeOutCp2, points.floorOut)
        .length() - sideseam
  } while (iter < 100 && (diff > 1 || diff < -1))

  points.grainlineBottom = points.floor = points.floorIn.shiftFractionTowards(points.floorOut, 0.5)

  points.hemIn = points.floorIn.copy()
  points.hemOut = points.floorOut.copy()
  let pCuffHelperIn = points.floorIn.copy()
  let pCuffHelperOut = points.floorOut.copy()
  if (options.cuff) {
    pCuffHelperIn = new Path()
      .move(points.floorIn)
      .curve(points.kneeInCp1, points.forkCp2, points.fork)
      .shiftAlong(store.get('cuffSize'))
    pCuffHelperOut = new Path()
      .move(points.floorOut)
      .curve(points.kneeOutCp2, points.seatOut, points.styleWaistOut)
      .shiftAlong(store.get('cuffSize'))
  } else {
    points.cuffSaIn = new Path()
      .move(points.floorIn)
      .curve(points.kneeInCp1, points.forkCp2, points.fork)
      .shiftAlong(sa * 2)
      .flipY(points.floorIn)
    points.cuffSaOut = new Path()
      .move(points.floorOut)
      .curve(points.kneeOutCp2, points.seatOut, points.styleWaistOut)
      .shiftAlong(sa * 2)
      .flipY(points.floorOut)
  }

  points.cuffOneIn = pCuffHelperIn.flipY(points.floorIn)
  points.cuffOneOut = pCuffHelperOut.flipY(points.floorOut)
  points.cuffTwoIn = points.floorIn.flipY(points.cuffOneIn)
  points.cuffTwoOut = points.floorOut.flipY(points.cuffOneOut)

  if (options.cuff) {
    points.cuffSaIn = points.cuffOneIn.flipY(points.cuffTwoIn)
    points.cuffSaOut = points.cuffOneOut.flipY(points.cuffTwoOut)
    paths.hem = new Path().move(points.hemIn).line(points.hemOut).addClass('note dashed')
    paths.cuffFold = new Path()
      .move(points.cuffOneIn)
      .line(points.cuffOneOut)
      .addClass('note dashed')
  }

  paths.saBase = drawPath()
  paths.seam = paths.saBase
    .insop('dart', new Path().line(points.pocketCenter))
    .close()
    .attr('class', 'fabric')
  paths.saBase.hide()

  console.log({
    inSeamBack: new Path()
      .move(points.floorIn)
      .curve(points.kneeInCp1, points.forkCp2, points.fork)
      .length(),
  })
  console.log({
    sideSeamBack: new Path()
      .move(points.styleWaistOut)
      .curve(points.seatOut, points.kneeOutCp2, points.floorOut)
      .length(),
  })

  console.log({
    crossBack: new Path()
      .move(points.styleWaistIn)
      .line(points.crossSeamCurveStart)
      .curve(points.crossSeamCurveCp1, points.crossSeamCurveCp2, points.fork)
      .length(),
  })

  console.log({
    Bknee: points.kneeIn.dist(points.kneeOut),
    ankle: points.floorIn.dist(points.floorOut),
  })

  if (complete) {
    paths.pocketLine = new Path()
      .move(points.pocketLeft)
      .line(points.pocketRight)
      .attr('class', 'fabric dashed')
    points.titleAnchor = new Point(points.knee.x, points.fork.y)
    macro('title', {
      at: points.titleAnchor,
      nr: 1,
      title: 'back',
    })
    snippets.logo = new Snippet('logo', points.titleAnchor.shiftFractionTowards(points.knee, 0.5))
    points.slantBottomNotch = new Path()
      .move(points.slantCurveStart)
      .curve(points.slantCurveCp1, points.slantCurveCp2, points.slantCurveEnd)
      .intersectsY(points.slantBottom.y)
      .pop()
    points.slantTopNotch = points.slantOut.shiftTowards(
      points.slantCurveStart,
      store.get('slantTopNotchDistance')
    )

    for (const i in snippets) {
      if ('bnotch' == snippets[i].def) delete snippets[i]
    }
    macro('sprinkle', {
      snippet: 'bnotch',
      on: ['grainlineBottom'],
    })

    console.log({ snippets: JSON.parse(JSON.stringify(snippets)) })
    console.log({ grainlineBottombnotch: snippets['grainlineBottom-bnotch'] })

    // snippets.forEach((s) => {console.log(s.name)})

    // snippets = snippets.filter(function(value, index, arr){
    //     return value.name != 'grainlineBottom-bnotch';
    // })

    paths['bartackslantBottom'].setHidden(true)
    paths['bartackslantTop'].setHidden(true)
    // paths.bartackslantTop = new Path().noop()
    // macro('bartack', {
    //   anchor: points.slantTopNotch,
    //   angle: points.slantTopNotch.angle(points.slantBottomNotch) - 90,
    //   length: sa ? sa / 2 : 5,
    //   suffix: 'slantTop',
    // })
    // macro('bartack', {
    //   anchor: points.slantBottomNotch,
    //   length: sa ? sa / 2 : 5,
    //   angle: 180,
    //   suffix: 'slantBottom',
    // })

    console.log({ points: JSON.parse(JSON.stringify(points)) })
    console.log({ paths: JSON.parse(JSON.stringify(paths)) })

    if (sa) {
      paths.sa = paths.saBase
        .offset(sa)
        .join(
          new Path()
            .move(points.cuffSaOut.shiftOutwards(points.cuffSaIn, sa))
            .line(points.cuffSaIn.shiftOutwards(points.cuffSaOut, sa))
        )
        // .join( options.cuff ?
        //   new Path()
        //   .move(points.cuffSaOut.shiftOutwards(points.cuffSaIn,sa))
        //   .line(points.cuffSaIn.shiftOutwards(points.cuffSaOut,sa))
        //   :           new Path()
        //   .move(points.floorIn)
        //   .line(points.floorOut)
        //   .offset(sa * 6)
        // )
        .close()
        .attr('class', 'fabric sa')
    }
    log.info(
      `Zoot | ` +
        `Inseam height: ${units(points.fork.dy(points.floorIn))} | ` +
        `Waist: ${units((store.get('waistbandBack') + store.get('waistbandFront')) * 2)} | ` +
        `Bottom leg width: ${units((store.get('legWidthBack') + store.get('legWidthFront')) / 2)}`
    )
    console.log({ waist_Back: store.get('waistbandBack') })

    if (paperless) {
      // Clean up paperless dimensions
      macro('rmad')
      delete paths.hint

      macro('hd', {
        from: points.floorIn,
        to: points.grainlineBottom,
        y: points.floorIn.y - 15,
      })
      macro('hd', {
        from: points.grainlineBottom,
        to: points.floorOut,
        y: points.floorIn.y - 15,
      })
      macro('hd', {
        from: points.floorIn,
        to: points.floorOut,
        y: points.floorIn.y - 30,
      })

      let y = points.floorIn.y + sa * 6
      macro('hd', {
        from: points.fork,
        to: points.grainlineBottom,
        y: y + 15,
      })
      macro('hd', {
        from: points.grainlineBottom,
        to: points.slantBottomNotch,
        y: y + 15,
      })
      macro('hd', {
        from: points.grainlineBottom,
        to: points.slantOut,
        y: y + 30,
      })

      y = points.styleWaistIn.y - sa
      macro('hd', {
        from: points.styleWaistIn,
        to: points.grainlineTop,
        y: y - 15,
      })
      macro('hd', {
        from: points.fork,
        to: points.grainlineTop,
        y: y - 30,
      })
      macro('hd', {
        from: points.grainlineTop,
        to: points.waistPocketCenter,
        y: y - 15,
      })
      macro('hd', {
        from: points.grainlineTop,
        to: points.slantOut,
        y: y - 30,
      })

      macro('ld', {
        from: points.pocketLeft,
        to: points.pocketRight,
        d: -15,
      })
      macro('ld', {
        from: points.backDartLeft,
        to: points.backDartRight,
        d: 15,
      })
      macro('ld', {
        from: points.pocketCenter,
        to: points.waistPocketCenter,
        d: 25,
      })

      let x = points.fork.x - sa
      macro('vd', {
        from: points.fork,
        to: points.pocketCenter,
        x: x - 15,
      })
      macro('vd', {
        from: points.fork,
        to: points.waistPocketCenter,
        x: x - 30,
      })
      macro('vd', {
        from: points.fork,
        to: points.styleWaistIn,
        x: x - 45,
      })

      x = points.slantOut.x + sa
      macro('vd', {
        from: points.floorOut,
        to: points.slantBottomNotch,
        x: x + 15,
      })
      macro('vd', {
        from: points.floorOut,
        to: points.slantOut,
        x: x + 30,
      })
    }
  }

  return part
}

export const back = {
  name: 'zoot.back',
  from: charlieBack,
  after: [front, frontPocketFacingBack],
  hideDependencies: true,
  options: {
    backPocketVerticalPlacement: { pct: 26, min: 18, max: 30, menu: 'pockets.backpockets' },
    // backPocketHorizontalPlacement: { pct: 55, min: 48, max: 62, menu: 'pockets.backpockets' },
    // backPocketWidth: { pct: 55, min: 50, max: 60, menu: 'pockets.backpockets' },
    // backPocketDepth: { pct: 60, min: 40, max: 80, menu: 'pockets.backpockets' },
    // backPocketFacing: { bool: true, menu: 'pockets.backpockets' },
  },
  draft: draftZootBack,
}
