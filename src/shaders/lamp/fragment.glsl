

uniform float fogNear;
uniform float fogFar;
uniform vec3 fogColor;

uniform float uLampStrength;
uniform float uLampOffset;
uniform vec3 uLampColor;

uniform float uLampSkyStrength;

varying vec2 vUv;

void main() {
  float lamp =
      uLampStrength - (abs(vUv.x - uLampOffset) * abs(vUv.y - uLampOffset));

  vec3 finalcolor = mix(uLampColor * vec3(vUv, 1.0), vec3(1.0), lamp);
  gl_FragColor = vec4(finalcolor, lamp);

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