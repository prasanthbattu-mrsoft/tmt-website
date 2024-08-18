// varying vec2 vUvs; 
// uniform float u_time;

// // Function to generate a hash value based on a 2D coordinate
// float hash(vec2 p) {
//     return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
// }

// // Function to generate random noise based on a 2D coordinate
// float noise(vec2 p) {
//     vec2 i = floor(p);
//     vec2 f = fract(p);
    
//     // Four corners in 2D of a tile
//     float a = hash(i);
//     float b = hash(i + vec2(1.0, 0.0));
//     float c = hash(i + vec2(0.0, 1.0));
//     float d = hash(i + vec2(1.0, 1.0));
    
//     // Smooth interpolation
//     vec2 u = f * f * (3.0 - 2.0 * f);
    
//     // Mix the four corners
//     return mix(a, b, u.x) +
//            (c - a) * u.y * (1.0 - u.x) +
//            (d - b) * u.x * u.y;
// }
 
 
 
// void main() {
//   vec3 colorA =  vec3(0.3,0.5,1.0);
//   vec3 colorB = vec3(1.000,0.777,0.052);
  
//   vec3 blue = vec3(0.7, 0.8, 1.0);   
//   float speed = 3.0;
//   float opacity = step(0.5,abs(sin(vUvs.y * 1000.0)));
//   float sinWave = abs(sin(vUvs.x * 10.0 + (u_time * speed)) - 1.) ;

//   vec3 color = vec3(sinWave) * (noise(vUvs) * 5.0);
//   // color = mix(colorA,colorB,color);
  
//   gl_FragColor = vec4(color,opacity);
// }

// `;

// const vertexShader = `
// varying vec2 vUvs; 
// void main() {
//     vec4 localPosition = vec4(position, 1.0);
//     gl_Position = projectionMatrix * modelViewMatrix * localPosition;
//     vUvs = uv;
// }



const fragmentShader = `
// uniform vec2 resolution;
// uniform int numRows;
float speed=3.0;
uniform float u_time;
int numRows = 350; 
varying vec2 vUvs;

// Function to generate a hash value based on a float input
float random(float x) {
    return fract(sin(x) * 43758.5453123);
}

// Function to generate a random color based on an integer seed
vec3 randomColor(int seed) {
    float sinWave = abs(sin(vUvs.x * 10.0 + ((u_time * 0.4)  *   (float(seed)*0.01 * random(float(seed) )) )) - 1.) ;
    vec3 color = (seed % 2 == 0) ? vec3(0.0, 0.482, 1.0) : vec3(1.0, 0.0, 1.0); 

    vec3 sinWaveFinal = vec3(sinWave);
    sinWaveFinal = color;

     
    return sinWaveFinal;
}

float sinOpacity(int seed) {
    float sinWave = abs(sin(vUvs.x * 10.0 + ((u_time * 0.4)  *   (float(seed)*0.01 * random(float(seed) )) )) - 1.) ;
    
    
  
     
    return sinWave;
}

void main() {
  vec3 colorB =  vec3(1.0,1.0,1.0);
  vec3 colorA = vec3(0.027, 0.631, 0);
    // Calculate the normalized coordinates of the fragment
    vec2 uv = vUvs;

    // Determine which row the fragment belongs to
    int row = int(floor(uv.y * float(numRows)));

    // Generate a random color based on the row index
     
    vec3 color = step(0.5,randomColor(row));
    
    // vec3 opacity = color;
    vec3 opacityMask = vec3(abs(abs(vUvs.x - 0.5) - 0.5) * 2.0) ;
    // color = mix(colorA,colorB,color);
    float opacity =  smoothstep(0.5,0.55,sinOpacity(row));
    

    // Output the color
    // gl_FragColor = vec4(color,(abs(opacity-1.0) +0.1) * opacityMask);
    gl_FragColor = vec4(color, 1.0);
     
}

`;

const vertexShader = `
varying vec2 vUvs; 
 
void main() {
    vec4 localPosition = vec4(position, 1.0);
    gl_Position = projectionMatrix * modelViewMatrix * localPosition;
    vUvs = uv;
}
`;