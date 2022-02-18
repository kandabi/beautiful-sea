

uniform float fogNear;
uniform float fogFar;
uniform vec3 fogColor;

uniform float uLampStrength;
uniform float uLampOffset;

uniform float uLampSkyStrength;

varying vec2 vUv;

void main() {
  //
  float light =
      uLampStrength - (abs(vUv.x - uLampOffset) * abs(vUv.y - uLampOffset));
  light *= 1.2;

  gl_FragColor = vec4(light, light, light, light);

#ifdef USE_FOG
#ifdef USE_LOGDEPTHBUF_EXT
  float depth = gl_FragDepthEXT / gl_FragCoord.w;
#else
  float depth = gl_FragCoord.z / gl_FragCoord.w;
#endif
  float fogFactor = smoothstep(fogNear, fogFar, depth * uLampSkyStrength);
  gl_FragColor.rgb = mix(gl_FragColor.rgb, fogColor, fogFactor);
#endif
}