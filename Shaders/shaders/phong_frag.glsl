precision mediump float; // It is required to set a floating point precision in all fragment shaders.

// Interpolated values from vertex shader
varying vec3 normalInterp; // Normal
varying vec3 vertPos; // Vertex position

uniform float Ka;   // Ambient reflection coefficient
uniform float Kd;   // Diffuse reflection coefficient
uniform float Ks;   // Specular reflection coefficient
uniform float shininessVal; // Shininess

// Material color
uniform vec3 ambientColor;
uniform vec3 diffuseColor;
uniform vec3 specularColor;
uniform vec3 lightPos; // Light position

void main() {
  vec3 vecLight = normalize(vertPos-lightPos); //incident light vector
  float NdotL = max(dot(-vecLight,normalInterp),0.0);
  vec3 ambientIll = ambientColor * Ka; //same calculation compared to gouraud shader
  vec3 diffuseIll = diffuseColor * Kd * NdotL; //as above

  vec3 reflectedLight = normalize(reflect(-vecLight,normalInterp));//normalInterp is normalized already
  vec3 viewPoint = normalize(vertPos); 
  vec3 specularIll = specularColor * Ks * pow(max(dot(reflectedLight,viewPoint),0.0),shininessVal);

  vec4 color = vec4(ambientIll + diffuseIll + specularIll,1.0);
  gl_FragColor = color; //pass color to gl_FragColor for it to be interpolated
}
