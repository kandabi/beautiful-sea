uniform float uStarIntensity;
uniform vec3 uSkyDarkColor;
uniform vec3 uSkyLightColor;

varying float vNoise;
varying vec2 vUv;

float createCircle(float starX, float starY) {
  return uStarIntensity /
         (distance(vec2(starX, (starY - 0.5) * 5.0 + 0.5), vec2(0.5)));
}

void main() {
  vec2 starUvs = mod(vec2(vUv.x, vUv.y) * 5.0, 1.0);
  float stars =
      createCircle(starUvs.x, starUvs.y) * createCircle(starUvs.y, starUvs.x);
  stars *= abs((vNoise - 0.1) * 0.8);

  float sky =
      clamp((0.3 - abs(vUv.x - 0.5)) + (0.3 - abs(vUv.y - 0.5)), 0.0, 1.0);
  sky += stars;
  vec3 finalColor = mix(uSkyDarkColor, uSkyLightColor, sky * 3.0);

  gl_FragColor = vec4(finalColor, 1.0);
  // gl_FragColor = vec4(vec3(vNoise), 1.0);
}