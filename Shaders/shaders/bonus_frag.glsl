// Fragment shader template for the bonus question

precision mediump float; // It is required to set a floating point precision in all fragment shaders.

// Interpolated values from vertex shader
// NOTE: You may need to edit this section to add additional variables
varying vec3 normalInterp; // Normal
varying vec3 vertPos; // Vertex position
varying vec3 viewVec; // Interpolated view vector

// uniform values remain the same across the scene
// NOTE: You may need to edit this section to add additional variables
uniform float Ka;   // Ambient reflection coefficient
uniform float Kd;   // Diffuse reflection coefficient
uniform float Ks;   // Specular reflection coefficient
uniform float shininessVal; // Shininess

// Material color
uniform vec3 ambientColor;
uniform vec3 diffuseColor;
uniform vec3 specularColor;

uniform vec3 lightPos; // Light position

uniform sampler2D uSampler;	// 2D sampler for the earth texture
uniform samplerCube envTexSampler;	// cube sampler for the environment map

void main() {
  // normalize interpolated values from vertex shader and lightPos
  vec3 vertPosN = normalize(vertPos);
  vec3 lightPosN = normalize(lightPos);
  vec3 N = normalize(normalInterp);
  vec3 V = normalize(viewVec);

  vec3 vecLight = normalize(vertPosN-lightPosN);
  float NdotL = dot(-vecLight,N);
  
  vec3 ambientIll = ambientColor * Ka;
  vec3 diffuseIll = diffuseColor * Kd * max(NdotL,0.0);

  //find the specular highlight using cook-torrance model
  //make a reasonable guess for m
  float m = 0.1; //very close to a metal
  float pi = 3.14159265358979323846264338327950; //define PI
  
  vec3 H = normalize(-vecLight+V); //half vector

  float NdotH = dot(N,H); //values to be used in calculations
  float NdotV = dot(N,V);
  float VdotH = dot(V,H);

  //compute D Beckmann Distribution
  float numerator = exp((NdotH*NdotH-1.0)/(NdotH*NdotH*m*m));
  float denominator = pi*m*m*pow(NdotH,4.0);
  float D = numerator/denominator;

  //compute R Schlick's Approximation for the Fresnel Factor
  float n1 = 1.0;//air
  float n2 = 0.05;//guess it
  float R0 = pow(((n1-n2)/(n1+n2)),2.0);
  float R = R0 + (1.0-R0)*pow((1.0-VdotH),5.0);

  //compute G Geometric Attenuation
  float double_NdotH = 2.0 * NdotH;
  float g1 = double_NdotH*NdotV/VdotH;
  float g2 = double_NdotH*NdotL/VdotH;
  float G = min(1.0,min(g1,g2));

  //compute Kc cook torrance specular coefficient
  float Kc = (D*R*G)/(4.0*NdotV*NdotL);

  vec3 reflectedLight = normalize(reflect(-vecLight,N));
  vec3 viewPoint = normalize(vertPosN);
  vec3 specularIll = specularColor * Kc * pow(dot(reflectedLight,viewPoint),shininessVal);

  vec4 color = vec4(ambientIll + diffuseIll + specularIll,1.0);
  gl_FragColor = color;
}
