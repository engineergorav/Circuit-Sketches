/* =========================================
   ORTHOGONAL ROUTER
========================================= */

export function generateRoute(

  from,
  to,
  index = 0

) {

  const spacing =
    30 + (index * 10)

  const points = []

  /* ======================================
     RIGHT → LEFT
  ====================================== */

  if (

    from.side === 'right' &&
    to.side === 'left'

  ) {

    const midX =
      (from.x + to.x) / 2

    points.push(

      from.x,
      from.y,

      midX,
      from.y,

      midX,
      to.y,

      to.x,
      to.y
    )

    return points
  }

  /* ======================================
     LEFT → RIGHT
  ====================================== */

  if (

    from.side === 'left' &&
    to.side === 'right'

  ) {

    const midX =
      (from.x + to.x) / 2

    points.push(

      from.x,
      from.y,

      midX,
      from.y,

      midX,
      to.y,

      to.x,
      to.y
    )

    return points
  }

  /* ======================================
     SAME SIDE
  ====================================== */

  if (from.side === to.side) {

    const offsetX =
      from.side === 'right'

        ? Math.max(from.x, to.x) + spacing

        : Math.min(from.x, to.x) - spacing

    points.push(

      from.x,
      from.y,

      offsetX,
      from.y,

      offsetX,
      to.y,

      to.x,
      to.y
    )

    return points
  }

  /* ======================================
     FALLBACK
  ====================================== */

  points.push(

    from.x,
    from.y,

    to.x,
    from.y,

    to.x,
    to.y
  )

  return points
}

/* =========================================
   JUNCTION DETECTION
========================================= */

export function getJunctions(routes) {

  const junctions = []

  routes.forEach(route => {

    for (

      let i = 0;

      i < route.length;

      i += 2

    ) {

      junctions.push({

        x: route[i],

        y: route[i + 1]
      })
    }
  })

  return junctions
}