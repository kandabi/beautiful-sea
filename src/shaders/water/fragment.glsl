uniform float uTime;

uniform vec3 uDepthColor;
uniform vec3 uSurfaceColor;
uniform float uColorOffset;
uniform float uColorMultiply;
uniform float uFoamCount;
uniform float uFoamStrength;

varying float vElevation;
varying vec2 vUv;

void main() {
  vec2 newUvs = vec2(1.0 - vUv.x, vUv.y);
  float foam = (1.0 - abs(sin(newUvs.x * newUvs.y * uFoamCount + uTime))) *
               uFoamStrength;
  float elevation = vElevation * uColorMultiply + uColorOffset;
  vec3 finalcolor = mix(uDepthColor, uSurfaceColor, elevation);
  finalcolor += foam;

  gl_FragColor = vec4(finalcolor, 1.0);
}