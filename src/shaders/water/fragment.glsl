uniform vec3 uDepthColor;
uniform vec3 uSurfaceColor;
uniform float uColorOffset;
uniform float uColorMultiply;

varying float vElevation;

void main() {
  float elevation = vElevation * uColorMultiply + uColorOffset;
  vec3 mixedColor = mix(uDepthColor, uSurfaceColor, elevation);

  gl_FragColor = vec4(mixedColor, 1.0);
}