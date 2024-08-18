const fragmentShader = `
varying vec2 vUvs; 
 
 
void main() {

 
 
  vec3 color = vec3(vUvs.x);
 
 
  gl_FragColor = vec4(color, 1.0);
}

`;

export default fragmentShader;