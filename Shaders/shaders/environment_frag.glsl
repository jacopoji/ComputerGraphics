precision mediump float; // It is required to set a floating point precision in all fragment shaders.

// Interpolated values from vertex shader
varying vec3 normalInterp; // Normal
varying vec3 vertPos; // Vertex position
varying vec3 viewVec; // View vector (eye to fragment)

uniform float Ka;   // Ambient reflection coefficient
uniform float Kd;   // Diffuse reflection coefficient
uniform float Ks;   // Specular reflection coefficient
uniform float shininessVal; // Shininess

// Material color
// HINT: Use the environment map as the ambient color
uniform vec3 diffuseColor;
uniform vec3 specularColor;
uniform vec3 lightPos; // Light position

uniform samplerCube envTexSampler; // A GLSL sampler represents a single texture. A samplerCube can be used to sample a cubemap texture.

void main() {
  vec3 N = normalize(normalInterp); //normalize N
  vec3 vecLight = normalize(vertPos-lightPos); //incident light vector
  float NdotL = max(dot(-vecLight,N),0.0); //dot product of incident light and normal
  
  vec3 vertPosd = normalize(vertPos); //normalize vertex position
  vec3 lightPosN = normalize(lightPos); //normalize light position
  vec3 diffuseIll = diffuseColor * Kd * NdotL;

  vec3 reflectedLight = normalize(reflect(-vecLight,N));//reflected light vector
  
  vec3 viewPoint = normalize(vertPosd); //vertPos - (0,0) eye to vertex
  vec3 envLight = normalize(viewVec-vertPosd); //environment mapping light
  vec3 envReflectedLight = normalize(reflect(envLight,N)); //environment mapping reflected light
  vec3 reflectedLightd = normalize(reflect(-vec3(-vecLight.x,vecLight.y,vecLight.z),N));
  vec3 envView = (-envReflectedLight-reflectedLightd); //view from the side
  //submitted the version viewing from the side since it is the one on the handout
  vec3 specularIll = specularColor * Ks * pow(max(dot(reflectedLight,viewPoint),0.0),shininessVal);

  vec4 color = textureCube(envTexSampler, envView)*Ka + vec4(diffuseIll + specularIll,1.0);
  
  gl_FragColor = color;
}
