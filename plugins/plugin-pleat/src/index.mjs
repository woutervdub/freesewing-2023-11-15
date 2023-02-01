import { name, version } from '../data.mjs'

const markers = `
<marker orient="auto" refY="4.0" refX="12.0" id="pleatTo" style="overflow:visible;" markerWidth="12" markerHeight="8">
	<path class="note fill-note" d="M 12,4 L 0,0 C 2,2 2,6  0,8 z" />
</marker>
`

export const plugin = {
  name,
  version,
  hooks: {
    preRender: (svg) => {
      if (svg.defs.indexOf(markers) === -1) svg.defs += markers
    },
  },
  macros: {
    pleat: function (so, { points, paths, Path, complete, scale }) {
      if (so === false) {
        delete points.pleatFrom
        delete points.pleatFromIn
        delete points.pleatTo
        delete points.pleatToIn
        delete paths.pleatTo
        delete paths.pleatFrom
        delete paths.pleatArrow
        // setCutOnFold relies on plugin-cutlist
        return true
      }
      so = {
        margin: 15,
        prefix: 'pleat',
        reverse: false,
        ...so,
      }
      if (complete) {
        points[so.prefix + 'From'] = so.from
        points[so.prefix + 'To'] = so.to
        points[so.prefix + 'FromIn'] = points[so.prefix + 'From'].shift(
          so.from.shiftTowards(so.to, 0.1).angle(so.from) + 90,
          so.margin * scale
        )
        points[so.prefix + 'ToIn'] = points[so.prefix + 'To'].shift(
          so.from.shiftTowards(so.to, 0.1).angle(so.to) + 270,
          so.margin * scale
        )
        paths[so.prefix + 'PleatFrom'] = new Path()
          .move(points[so.prefix + 'From'])
          .line(points[so.prefix + 'FromIn'])
          .attr('class', 'note ' + (so.reverse ? 'dotted' : ''))
        paths[so.prefix + 'PleatTo'] = new Path()
          .move(points[so.prefix + 'To'])
          .line(points[so.prefix + 'ToIn'])
          .attr('class', 'note ' + (so.reverse ? '' : 'dotted'))
        paths[so.prefix + 'PleatArrow'] = new Path()
          .move(points[so.prefix + 'From'].shiftFractionTowards(points[so.prefix + 'FromIn'], 0.25))
          .line(points[so.prefix + 'To'].shiftFractionTowards(points[so.prefix + 'ToIn'], 0.25))
          .attr('class', 'note')
          .attr('marker-start', so.reverse ? 'url(#pleatTo)' : '')
          .attr('marker-end', so.reverse ? '' : 'url(#pleatTo)')
      }
    },
  },
}

// More specifically named exports
export const pleatPlugin = plugin
export const pluginPleat = plugin
