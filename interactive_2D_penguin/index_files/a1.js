/**
 * Note: Do not include any external libraries.
 * You may only use the drawing functions provided to complete this assignment.
 */

/**    HELPER FUNCTIONS     **/
/** Do not modify this code **/

/**
 * Draws a line segment on the screen connecting (x1, y1) and (x2, y2). This is the only function
 * you may call to draw.
 * @param  {DOMString} ctx - Canvas context to draw to. Simply pass in the given ctx variable
 * @param  {number} x1 - X coordinate of the start point
 * @param  {number} y1 - Y coordinate of the start point
 * @param  {number} x2 - X coordinate of the end point
 * @param  {number} y2 - Y coordinate of the end point
 * @param  {String} style - A string giving the colour of the line. Default is black.
 * @return {undefined}
 */
function drawLineSegment(ctx, x1, y1, x2, y2, style="black")
{
  ctx.beginPath();
  ctx.moveTo(x1,y1);
  ctx.lineTo(x2,y2);
  ctx.strokeStyle = style;
  ctx.stroke();
}
/*
function drawHat(ctx,T,style=“green”)
{
  ctx.beginPath();
  for(var i =0; i<T.length-1; i++){
    ctx.moveTo(T[i][0],T[i][1]);
    ctx.lineTo(T[i+1][0],T[i][1]);
    ctx.strokeStyle = style;
    ctx.stroke();
  }
  //ctx.fillStyle = style;
  ctx.fill();
}*/

/**
 * Takes a point defined as an array of numbers [x, y] and treats it as a homogeneous coordinate [x, y, 1]
 * The transformation T is a 2x3 matrix defined as an array of arrays
 * T = [[T11, T12, T13],
 *      [T21, T22, T23]]
 * The result is a new transformed point [x', y'] = T * [p[0], p[1], 1]
 * @param  {array} p - Point to transform
 * @param  {array} T - Transformation to apply
 * @return {array} New transformed point
 */
function transformPoint(p,T)
{
  var q = new Array();
  
  for(var i = 0; i<T.length; i++)
  {
    q[i] = 0;
    for(var j = 0; j<p.length; j++)
      q[i] += T[i][j] * p[j];
	// Translation
	q[i] += T[i][j];
  }
  
  return q;
}

/**
 * Given two transformations T1 and T2, returns a new transformation equivalent to applying
 * T1 followed by T2.
 * @param  {array} T1 - The first transform to apply
 * @param  {array} T2 - The second transfrom to apply
 * @return {array} A new transformation
 */
function composeTransforms(T1, T2) {
  var T_new = [
    [0, 0, 0],
    [0, 0, 0]
  ];

  for (var i = 0; i < 2; i++) {
    for (var j = 0; j < 3; j++) {
      for(var k = 0; k < 3; k++) {
        T_new[i][j] += T2[i][k] * (k === 2 ? (j === 2 ? 1 : 0) : T1[k][j]);
      }
    }
  }

  return T_new;
}
/** END OF HELPER FUNCTIONS **/


/**
 * This function should take a list of points and draw a closed polygon connecting the points.
 * Each point is an array containing two numbers [x, y].
 * @param  {DOMString} ctx - Canvas context to draw to. Simply pass in the given ctx variable
 * @param  {array} poly - Array of points corresponding to the vertices of the polygon [p1, p2, p3, ..., pn]
 * @return {undefined}
 */
function drawPolygon(ctx, poly)
{
  /** Fill in your answer here **/
  //a for loop that iterates through all points in the poly array and draws a segment between them
	for(var i = 0; i < poly.length-1; i++){
		drawLineSegment(ctx,poly[i][0],poly[i][1],poly[i+1][0],poly[i+1][1],"black");
	};
	//draw a line in between the first element and the last element in the poly array
	drawLineSegment(ctx,poly[poly.length-1][0],poly[poly.length-1][1],poly[0][0],poly[0][1],"black");
  
  // Hint: call drawLineSegment to help you
}

/**
 * Given an array of points defining a polygon, return a new array of points for a polygon transformed by
 * the transformation T.
 * @param  {array} poly - Array of points corresponding to the vertices of the polygon [p1, p2, p3, ..., pn]
 * @param  {array} T - T transformation to apply. Same definition as in transformPoint()
 * @return {array} Array of vertex locations for the transformed polygon
 */
function transformPolygon(poly, T)
{
  /** Fill in your answer here **/
  // Hint: call transformPoint to help you
  //a for loop that transform every point in the polygon array using the transformation T.
  for(var i = 0; i<poly.length; i++){
  		poly[i] = transformPoint(poly[i],T);
  }
  return poly;
}

/**
 * Draws a circle of radius r around point [cx, cy].
 * @param  {DOMString} ctx - Canvas context to draw to. Simply pass in the given ctx variable
 * @param  {number} cx - X coordinate of the circle center
 * @param  {number} cy - Y coordinate of the circle center
 * @param  {number} r - Radius of the circle
 * @return {undefined}
 */
function drawCircle(ctx, cx, cy, r)
{
  /** Fill in your answer here **/
  // Hint: call drawLineSegment to help you
  var point_one = [cx+r,cy];
  var point_two = [0,0];
  //x = cx+r*cos(theta)
  //y = cy+r*sin(theta)
  //i should be small or else the circle would be thick.
  for(var i=1; i<17; i++){
  		point_two[0] = cx+r*Math.cos(Math.PI*i/8);
  		point_two[1] = cy+r*Math.sin(Math.PI*i/8);
  		drawLineSegment(ctx,point_one[0],point_one[1],point_two[0],point_two[1],"black");
  		//update the previous point to current point and iterate again.
  		point_one[0] = point_two[0];
  		point_one[1] = point_two[1];
  }
}

/**
 * Returns a transformation matrix T that defines a translation in homogeneous coordinates
 * by the vector offset [x, y].
 * That is, if applied to a point p = [p1, p2, 1] then it will be
 * translated to p' = [p1 + x, p2 + y, 1]
 * @param  {array} offset - The offset to translate by
 * @return {array} A 2x3 transformation matrix
 */
function translateByOffset(offset)
{
  var T = [
    [1, 0, 0],
    [0, 1, 0]
  ];
  //the definition of a translation matrix T2
  var T2 = [
  		[1,0,offset[0]],
  		[0,1,offset[1]],
  		[0,0,1]
  	];
  	//use composeTransform to combine them
  	T = composeTransforms(T, T2);
  

  /** Fill in your answer here **/
  
  
  return T;
}

/**
 * Returns a transformation matrix T that defines
 * a rotation by angle radians around a point joint.
 * @param  {number} angle - Angle in radians
 * @param  {array} joint - point [x, y] to rotate around 
 * @return {array} T - 2x3 transformation matrix defining the rotation
 */
function rotationAboutPoint(angle, joint)
{
  var T = [
    [1, 0, 0],
    [0, 1, 0]
  ];
  //move to origin (translation)
  //rotate (rotation)
  //move back to joint (translation)
  var T1 = [
  		[1,0,-joint[0]],
  		[0,1,-joint[1]],
  		[0,0,1]
  	];
  	var T2 = [
  		[Math.cos(angle),-Math.sin(angle),0],
  		[Math.sin(angle),Math.cos(angle),0],
  		[0,0,1]
  	];
  var T3 = [
  		[1,0,joint[0]],
  		[0,1,joint[1]],
  		[0,0,1]
  	];
  var T12 = composeTransforms(T1, T2);
  var T123 = composeTransforms(T12, T3);
  
  T = composeTransforms(T, T123);
  /** Fill in your answer here **/
  // Hint: Use Math.cos() and Math.sin()
 
 
  return T;
}


function drawPenguin(ctx)
{
  /** GET UI SLIDER VARIABLES **/
  /** You do not need to change this code **/
  var deg_to_rad = Math.PI / 180.0;
  var torso_x_offset = parseFloat(document.getElementById("slider_torso_x").value);
  var torso_y_offset = parseFloat(document.getElementById("slider_torso_y").value);
  var arm_angle = parseFloat(document.getElementById("slider_arm_angle").value) * deg_to_rad;
  var head_angle = parseFloat(document.getElementById("slider_head_angle").value) * deg_to_rad;
  var mouth_gap = parseFloat(document.getElementById("slider_mouth_gap").value);
  var hip_angles = [
    parseFloat(document.getElementById("slider_hip_angle0").value) * deg_to_rad,
    parseFloat(document.getElementById("slider_hip_angle1").value)  * deg_to_rad
  ];
  var ankle_angles = [
    parseFloat(document.getElementById("slider_ankle_angle0").value)  * deg_to_rad,
	parseFloat(document.getElementById("slider_ankle_angle1").value)  * deg_to_rad
  ];
  /** END OF GET UI SLIDER VARIABLES **/


  /** POLYGON DEFINITIONS **/
  /**
   * The polygons defining each body region are provided *relative to the origin*
   * It is your responsibility to transform and draw these polygons to construct a hierarchical model
   * that can be manipulated by the sliders. 
   *
   * You may not change these values manually.
   */
  // 
  var torso_poly = [[-56, -196], [-129, 99], [-46, 188], [36, 196], [129, 116], [69, -71], [36, -196]];
  var arm_poly = [[-38, -78], [-15, 78], [22, 78], [39, -74]];
  var hat_poly = [[-30,-30],[30,-30],[30,-10],[80,-10],[80,-30],[-80,-30],[-80,-10],[-30,-10],[-30,-30]];

  var head_poly = [[-19, -50], [-49, -29], [-62, 50], [62, 48], [46, -27]];
  var upper_beak_poly = [[41, -13], [-44, 2], [-41, 13], [43, 13]];
  var lower_beak_poly = [[-40, -3], [-42, 3], [41, 3], [41, -3]];
  
  var leg_poly = [[-15, -53], [-20, 52], [ 20,  52], [ 12, -53]];
  var foot_poly = [[54, -11], [58, 11], [-48,  11], [-58, -11]];
  
  // These will be drawn as circles
  var eye = [0, 0];
  var iris = [0, 0];
  
  // Radii of circles
  var eye_r = 10;
  var iris_r = 3;
  var arm_joint_r = 10;
  var head_joint_r = 5;
  var hip_joint_r = 5;
  var ankle_joint_r = 5;
  
  // Joint positions
  var hip_joints = [[0, 0], [0, 0]];
  var ankle_joints = [[0, 0], [0, 0]];
  var arm_joint = [0, 0];
  var head_joint = [0, 0];
  /** END OF POLYGON DEFINITIONS **/


  /*********************************/
  /** YOUR DRAWING CODE GOES HERE **/
  /*********************************/

  /** The torso and head are given as examples **/
  // Define the center of the torso in screen space
  // and a transformation to translate the torso to its origin
  var torso_origin = [360, 360];
  var torso_T = translateByOffset([torso_origin[0] + torso_x_offset, torso_origin[1] + torso_y_offset]);
  
  torso_poly = transformPolygon(torso_poly, torso_T);
  drawPolygon(ctx, torso_poly);

  // Define the transformation for the head as a rotation and then a translation
  var head_offset = [-10, -220]; // The location of the head relative to the body
  var head_joint_offset = [0, 35]; // The location of the head joint relative to the head center
  var head_T = composeTransforms(
    rotationAboutPoint(head_angle, head_joint_offset),
    translateByOffset(head_offset)
  );
 
  // Transform and draw the head in a hierarchical fashion
  // That is, if the body moves, then the head will move with it.
  head_poly = transformPolygon(head_poly, head_T);
  head_poly = transformPolygon(head_poly, torso_T);
  drawPolygon(ctx, head_poly);

  // Now draw the head joint
  head_joint = transformPoint(head_joint_offset, head_T);
  head_joint = transformPoint(head_joint, torso_T);
  drawCircle(ctx, head_joint[0], head_joint[1], head_joint_r);

  /* Draw the rest of the penguin below. */
  //draw eye
  var eye_offset = [-29,-20] // The location of the eye + iris relative to the head centre
  eye = transformPoint(eye_offset,head_T);
  eye = transformPoint(eye, torso_T);
  drawCircle(ctx,eye[0],eye[1],eye_r);
	//draw iris
	iris = transformPoint(eye_offset,head_T);
	iris = transformPoint(iris, torso_T);
	drawCircle(ctx,iris[0],iris[1],iris_r);

	//draw hat
	var hat_offset = [0,-50];
	//var hat_T
  
 	//draw beak
 	var upper_beak_offset = [-90,0]; // The location of the upper beak relative to the head centre
 	//Transform and draw the upper beak in a hierarchical fashion.
 	//If the body moves, the beak will move with it, attached to the head.
 	upper_beak_T = composeTransforms(translateByOffset(upper_beak_offset),head_T);
 	upper_beak_poly = transformPolygon(upper_beak_poly,upper_beak_T);
 	upper_beak_poly = transformPolygon(upper_beak_poly,torso_T);
 	drawPolygon(ctx, upper_beak_poly);
 	
 	//Transform and draw the lower beak in a hierarchical fashion.
 	var lower_beak_offset = [-90,30];// The location of the lower beak relative to the head centre
 	//We read data from the sliders and add the offset to the defined offset.
 	lower_beak_offset[1] = lower_beak_offset[1] + mouth_gap;
 	lower_beak_T = composeTransforms(translateByOffset(lower_beak_offset),head_T);
 	lower_beak_poly = transformPolygon(lower_beak_poly,lower_beak_T);
 	lower_beak_poly = transformPolygon(lower_beak_poly,torso_T);
 	drawPolygon(ctx, lower_beak_poly);
 	
 	//draw arm
 	var arm_offset = [20,-20]; // The location of the arm relative to the torso
 	var arm_joint_offset = [0,-60]; // The location of the arm joint relative to the arm
 	//Define the transformation as a rotation and then a translation.
 	var arm_T = composeTransforms(rotationAboutPoint(arm_angle,arm_joint_offset),
 			translateByOffset(arm_offset)
 			);
 			
 	arm_poly = transformPolygon(arm_poly,arm_T);
 	arm_poly = transformPolygon(arm_poly,torso_T); //If the body moves, the arm moves with it
 	drawPolygon(ctx,arm_poly);
	//ctx.fillStyle = “red”;
	//ctx.fill();
 	
 	//draw arm joint
 	arm_joint = transformPoint(arm_joint_offset,arm_T); //Same as above
 	arm_joint = transformPoint(arm_joint,torso_T);
 	drawCircle(ctx,arm_joint[0],arm_joint[1],arm_joint_r);
 	
 	//draw legs
 	var left_leg_offset = [-70,180]; //The location of the leg relative to the torso
 	var right_leg_offset = [70,190]; //As above
 	var left_leg_joint_offset = [0,-40]; // The location of the leg joint relative to the leg
 	var right_leg_joint_offset =[0,-40]; //As above
 	
 	//var leg_poly_copy = [[-15, -53], [-20, 52], [ 20,  52], [ 12, -53]]; //Only suits this scenario of the penguin
 	var leg_poly_copy = leg_poly.slice(); //hard copy of the leg polygon in a non-hardcoding way
 	
 	//Define the transformation as a rotation and then a translation
 	//Left and right legs are coded separately by the same method.
 	//Left leg
 	var left_leg_T = composeTransforms(rotationAboutPoint(hip_angles[0],left_leg_joint_offset),
 			translateByOffset(left_leg_offset)
 			);
 	var left_leg_poly = transformPolygon(leg_poly,left_leg_T);
 	left_leg_poly = transformPolygon(left_leg_poly,torso_T);
 	drawPolygon(ctx,left_leg_poly);
 	
 	//Right leg
 	var right_leg_T = composeTransforms(rotationAboutPoint(hip_angles[1],right_leg_joint_offset),
 			translateByOffset(right_leg_offset)
 			);
 	var right_leg_poly = transformPolygon(leg_poly_copy,right_leg_T);
 	right_leg_poly = transformPolygon(right_leg_poly,torso_T);
 	drawPolygon(ctx,right_leg_poly);
 	
 	//draw leg joints
 	left_leg_joint = transformPoint(left_leg_joint_offset,left_leg_T);
 	left_leg_joint = transformPoint(left_leg_joint,torso_T);
 	drawCircle(ctx,left_leg_joint[0],left_leg_joint[1],hip_joint_r);
 	
 	right_leg_joint = transformPoint(right_leg_joint_offset,right_leg_T);
 	right_leg_joint = transformPoint(right_leg_joint,torso_T);
 	drawCircle(ctx,right_leg_joint[0],right_leg_joint[1],hip_joint_r);
 	
 	//draw feet
 	var left_foot_offset = [-55,40]; //The location of the foot relative to the legs
 	var right_foot_offset = [-55,40]; //As above
 	var left_foot_joint_offset = [47,0]; //The location of the ankle relative to the foot
 	var right_foot_joint_offset = [47,0]; //As above
	var foot_poly_copy = foot_poly.slice(); //Hard copy of the foot polygon
	
	//Define the transformation as a rotation and a translation to the left leg
	//The left foot moves as the leg rotates, and also moves when the body moves.
	//The left and right feet are coded separately by the same method.
 	var tempT_left = composeTransforms(translateByOffset(left_foot_offset),left_leg_T);
 	var left_foot_T = composeTransforms(rotationAboutPoint(ankle_angles[0],left_foot_joint_offset),
      tempT_left
      );
 	var left_foot_poly = transformPolygon(foot_poly,left_foot_T);
 	left_foot_poly = transformPolygon(left_foot_poly, torso_T);
 	drawPolygon(ctx,left_foot_poly);
 	
 	var tempT_right = composeTransforms(translateByOffset(right_foot_offset),right_leg_T);
 	var right_foot_T = composeTransforms(rotationAboutPoint(ankle_angles[1],left_foot_joint_offset),
 			tempT_right
 			);
 	var right_foot_poly = transformPolygon(foot_poly_copy,right_foot_T);
 	right_foot_poly = transformPolygon(right_foot_poly, torso_T);
 	drawPolygon(ctx,right_foot_poly);
 	
 	//draw ankles
 	left_ankle = transformPoint(left_foot_joint_offset,left_foot_T);
 	left_ankle = transformPoint(left_ankle,torso_T);
 	drawCircle(ctx,left_ankle[0],left_ankle[1],ankle_joint_r);
 	
 	right_ankle = transformPoint(right_foot_joint_offset,right_foot_T);
 	right_ankle = transformPoint(right_ankle,torso_T);
 	drawCircle(ctx,right_ankle[0],right_ankle[1],ankle_joint_r);
 	
 	//done drawing
}


/**        BOILERPLATE DRAWING CODE        **/
/**   You do not need to modify this code  **/
function drawAxis(ctx)
{
  drawLineSegment(ctx, 0, 0, 100, 0, "red");
  drawLineSegment(ctx, 0, 0, 0, 100, "green");
  ctx.fillText("0,0", 4, 12);
  ctx.fillText("100,0", 98, 10);
  ctx.fillText("0,100", 5, 100);
}

// This function is called to draw the current frame. It is called whenever the
// sliders are changed.
function draw() 
{
  // you do not need to modify this function
  // this is help function
  // Boilerplate code to setup the canvas
  var canvas = document.getElementById('canvas');
  if (!canvas.getContext)
  {
    alert("Your browser is too old! Please upgrade to a canvas-capable browser.");
  }
  var ctx = canvas.getContext('2d');
  // clear canvas so we can draw a new frame
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // set global line width and smooth lines
  ctx.lineWidth = 2;
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  // draw a small axis to demonstrate the inverted coordinate system
  drawAxis(ctx);
  // draw the current Penguin
  drawPenguin(ctx);
}
/**     END OF BOILERPLATE DRAWING CODE       **/

