precision mediump float; // It is required to set a floating point precision in all fragment shaders.

// Interpolated values from vertex shader
varying vec3 normalInterp; // Normal
varying vec3 vertPos; // Vertex position

uniform float Ka;   // Ambient reflection coefficient
uniform float Kd;   // Diffuse reflection coefficient

// Material color
uniform vec3 ambientColor;	// Use this as the foreground (dark) color
uniform vec3 diffuseColor;  // Use this as the background (light) color

uniform vec3 lightPos; // Light position

// HINT: Use the built-in variable gl_FragCoord to get the screen-space coordinates

void main() {
  // Your solution should go here.
  // Only the background color calculations have been provided as an example.
  vec3 vertPosN = normalize(vertPos);
  vec3 N = normalize(normalInterp);
  vec3 lightPosN = normalize(lightPos);

  vec3 vecLight = normalize(vertPosN-lightPosN); //incident light vector
  float NdotL = max(dot(-vecLight,N),0.0);
  vec3 color;
  vec3 coords = vec3(gl_FragCoord.x,gl_FragCoord.y,gl_FragCoord.z);
  if(NdotL < 0.5)
     color = ambientColor * Ka ;
  else
     color = diffuseColor * Kd;
  
  //gl_FragColor = vec4(color, 1.0);
}
