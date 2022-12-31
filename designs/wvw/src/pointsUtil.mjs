function convertPoints(points) {
  var p = []
  Object.keys(points).forEach(function (key, index) {
    const point = points[key]
    if (point.name == 'point0') {
      p.push('points.point0 = new Point( 0, 0 );')
    } else if (point.name.match('.+[0-9]Cp[12]')) {
      let masterPoint = point.name.replace(/Cp[12]/, '')
      p.push(
        'points.' +
          point.name +
          ' = points.' +
          masterPoint +
          '.shift( ' +
          points[masterPoint].angle(point) +
          ', ' +
          points[masterPoint].dist(point) +
          ' *sizeFactor );'
      )
    } else {
      p.push(
        'points.' +
          point.name +
          ' = points.point0.shift( ' +
          points.point0.angle(point) +
          ', ' +
          points.point0.dist(point) +
          ' *sizeFactor );'
      )
    }
  })

  console.log(p.sort().join('\n'))
}

export { convertPoints }
