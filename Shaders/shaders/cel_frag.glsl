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
  
  //these are defined by myself, dividing the color into 4 sections
  float A = 0.1;
  float B = 0.3;
  float C = 0.6;
  float D = 1.0;
  //define discrete values to discretize diffuse and specular light.
  if(NdotL < A)
      NdotL = 0.0;
  else if(NdotL < B)
      NdotL = B;
  else if(NdotL < C)
      NdotL = C;
  else
      NdotL = D;
  
  //ambient and diffure component calculations are the same as the phone shader
  vec3 ambientIll = ambientColor * Ka;
  vec3 diffuseIll = diffuseColor * Kd * NdotL;

  vec3 reflectedLight = normalize(reflect(-vecLight,normalInterp));
  vec3 viewPoint = normalize(vertPos);
  float RdotV = max(dot(reflectedLight,viewPoint),0.0);
  float specularComp = pow(RdotV,shininessVal);
  //after calculating the specular component, we determine it to be fully
  //illuminated if it is greater than 0.5. Otherwise we eliminate the it.
  if(specularComp >= 0.5)
      specularComp = 1.0;
  if(specularComp <0.5)
      specularComp = 0.0;
  //discretize specular component
  vec3 specularIll = specularColor * Ks * specularComp;

  vec4 color = vec4(ambientIll + diffuseIll + specularIll,1.0);
  gl_FragColor = color;
}
