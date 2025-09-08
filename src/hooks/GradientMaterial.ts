import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { extend } from '@react-three/fiber';

const GradientMaterial = shaderMaterial(
	{
		time: 0,
		modelMinX: 0,
		modelWidth: 1,
	},
	`
    varying vec3 vWorldPosition;
    void main() {
      vec4 worldPosition = modelMatrix * vec4(position, 1.0);
      vWorldPosition = worldPosition.xyz;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
	`
    uniform float time;
    uniform float modelMinX;
    uniform float modelWidth;
    varying vec3 vWorldPosition;

    void main() {
      float worldX = vWorldPosition.x;
      float normalizedX = (worldX - modelMinX) / modelWidth;
      float shift = fract(normalizedX - time * 0.5);

      vec3 color1 = vec3(0.82, 0.21, 1.0);
      vec3 color2 = vec3(0.25, 0.41, 1.0);
      vec3 color3 = vec3(0.0, 1.0, 1.0);

      vec3 finalColor;
      if (shift < 0.33) {
        finalColor = mix(color1, color2, shift * 3.0);
      } else if (shift < 0.66) {
        finalColor = mix(color2, color3, (shift - 0.33) * 3.0);
      } else {
        finalColor = mix(color3, color1, (shift - 0.66) * 3.0);
      }

      gl_FragColor = vec4(finalColor, 1.0);
    }
  `,
);

extend({ GradientMaterial });

export { GradientMaterial };
