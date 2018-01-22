attribute vec3 position; // Given vertex position in object space
attribute vec3 normal; // Given vertex normal in object space

uniform mat4 projection, modelview, normalMat; // Given scene transformation matrices

// These will be given to the fragment shader and interpolated automatically
varying vec3 normalInterp;
varying vec3 vertPos;
varying vec4 color;

uniform float Ka;   // Ambient reflection coefficient
uniform float Kd;   // Diffuse reflection coefficient
uniform float Ks;   // Specular reflection coefficient
uniform float shininessVal; // Shininess

// Material color
uniform vec3 ambientColor;
uniform vec3 diffuseColor;
uniform vec3 specularColor;
uniform vec3 lightPos; // Light position


void main(){
  // Your solution should go here.
  // Only the ambient colour calculations have been provided as an example.

  vec4 vertPos4 = modelview * vec4(position, 1.0);
  gl_Position = projection * vertPos4;

  vertPos = vec3(modelview * vec4(position,1.0)); //vertex position in camera space
  normalInterp = normalize(vec3(normalMat * vec4(normal,1.0))); //normalize normal
  
  vec3 n = normalInterp;
  
  vec3 vecLight = normalize(vertPos-lightPos); //incident light vector
  float NdotL = max(dot(-vecLight,n),0.0); //angle between light vector and normal
  vec3 ambientIll = ambientColor * Ka; //ambient component = Ia * Ka
  vec3 diffuseIll = diffuseColor * Kd * NdotL; //diffuse component = Id*Kd*NdotL

  vec3 reflectedLight = normalize(reflect(-vecLight,n)); //reflected light vector
  vec3 viewPoint = normalize(vertPos); //viewPoint is vertex position - camera which is (0,0)
  vec3 specularIll = specularColor * Ks * pow(max(dot(reflectedLight,viewPoint),0.0),shininessVal);
  //specular component = Is * Ks * RdotV^shininess
  color = vec4(ambientIll + diffuseIll + specularIll,1.0);
  //the final color is the accumulative color of the three components.

  
}
