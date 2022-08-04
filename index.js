const regl = createREGL()

// Calling regl() creates a new partially evaluated draw command
const drawTriangle = regl({

  // Shaders in regl are just strings.  You can use glslify or whatever you want
  // to define them.  No need to manually create shader objects.
  frag: `
    precision mediump float;
    uniform vec4 color;
    uniform float time;

    void main() {
      gl_FragColor = color * 0.5 * (1.0 + sin(time));
    }`,

  vert: `
    precision mediump float;
    attribute vec2 position;
    void main() {
      gl_Position = vec4(position, 0, 1);
    }`,

  // Here we define the vertex attributes for the above shader
  attributes: {
    // regl.buffer creates a new array buffer object
    position: regl.buffer([
      [-1, -1],   // no need to flatten nested arrays, regl automatically
      [1, -1],    // unrolls them into a typedarray (default Float32)
      [1,  1],
      [-1, -1],   // no need to flatten nested arrays, regl automatically
      [1, 1],    // unrolls them into a typedarray (default Float32)
      [-1, 1],
    ])
    // regl automatically infers sane defaults for the vertex attribute pointers
  },

  uniforms: {
    // This defines the color of the triangle to be a dynamic variable
    color: regl.prop('color'),
    time: regl.prop('time'),
  },

  // This tells regl the number of vertices to draw in this command
  count: 6
})

// regl.frame() wraps requestAnimationFrame and also handles viewport changes
regl.frame(({time}) => {
  // clear contents of the drawing buffer
  regl.clear({
    color: [0, 0, 0, 0],
    depth: 1
  })

  // draw a triangle using the command defined above
  drawTriangle({
    time,
    color: [
      Math.cos(time * 0.001),
      Math.sin(time * 0.0008),
      Math.cos(time * 0.003),
      1
    ]
  })
})
