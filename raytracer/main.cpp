/***********************************************************
Starter code for Assignment 3

This code was originally written by Jack Wang for
CSC418, SPRING 2005

***********************************************************/


#include "raytracer.h"
#include <cstdlib>

int main(int argc, char* argv[])
{
	// Build your scene and setup your camera here, by calling 
	// functions from Raytracer.  The code here sets up an example
	// scene and renders it from two different view points, DO NOT
	// change this if you're just implementing part one of the 
	// assignment.  
	Raytracer raytracer;
	int width = 320;
	int height = 240;

	if (argc == 3) {
		width = atoi(argv[1]);
		height = atoi(argv[2]);
	}

	// Camera parameters.
	Point3D eye(0, 0, 1);
	Vector3D view(0, 0, -1);
	Vector3D up(0, 1, 0);
	double fov = 60;

	// Defines a material for shading.
	Material gold(Colour(0.3, 0.3, 0.3), Colour(0.75164, 0.60648, 0.22648),
		Colour(0.628281, 0.555802, 0.366065),
		51.2,0.0,0.0);
	Material jade(Colour(0, 0, 0), Colour(0.54, 0.89, 0.63),
		Colour(0.316228, 0.316228, 0.316228),
		12.8,0.5,0.0);

    //Extra colours from http://devernay.free.fr/cours/opengl/materials.html
    Material turquoise(Colour(0.1,0.18725,0.1745),Colour(0.396,0.74151,0.69102),
        Colour(0.297254,0.30829,0.306678),12.8,0.7,0.0);
    Material silver(Colour(0.19225,0.19225,0.19225), Colour(0.50754,0.50754,0.50754),
        Colour(0.508273,0.508273,0.508273),51.2,0.7,0.0);
    Material emerald(Colour(0.0215,0.1745,0.0215), Colour(0.07568,0.61424,0.07568),
        Colour(0.633,0.727811,0.633),76.8,0.7,0.0);
    Material copper(Colour(0.19125,0.0735,0.0225),Colour(0.7038,0.27048,0.0828),
        Colour(0.256777,0.137622,0.086014),12.8,0.7,0.0);
    Material glass(Colour(0, 0, 0), Colour(0.54, 0.89, 0.63), 
        Colour(0.6, 0.3, 0.6), 52.8, 0.1, 1.5168);

    //Colour for signature use only
    //Eventually decided to not use these
    //realized that we should show diffuse color for signature
    Material yellow(Colour(1,1,0),Colour(0,0,0),Colour(0,0,0),10,0.8,0.0);
    Material green(Colour(0,1,0),Colour(0,0,0),Colour(0,0,0),10,0.8,0.0);

	// Defines a point light source.
	raytracer.addLightSource(new PointLight(Point3D(0, 0, 5),
		Colour(0.9, 0.9, 0.9)));
    double bias = 0.05;
    int lightNum = 20;
    //create extended light source with a small bias comment out to improve speed
    /*
    for(int i=-lightNum;i<lightNum;i++){
        raytracer.addLightSource(new PointLight(Point3D(0+i*bias,0+i*bias,5+i*bias),
        Colour(0.9,0.9,0.9)));
    }
    */


	// Add a unit square into the scene with material mat.
    SceneDagNode* sphere2 = raytracer.addObject(new UnitSphere(), &glass);
	SceneDagNode* sphere = raytracer.addObject(new UnitSphere(), &gold);
	SceneDagNode* plane = raytracer.addObject(new UnitSquare(), &jade);
    
    SceneDagNode* sphere3 = raytracer.addObject(new UnitSphere(), &silver);
	// Apply some transformations to the unit square.
	double factor1[3] = { 1.0, 2.0, 1.0 };
	double factor2[3] = { 6.0, 6.0, 6.0 };
    double factor3[3] = { 2.0, 1.0, 1.0};
    raytracer.translate(sphere2,Vector3D(2,0,-6));
    raytracer.translate(sphere3,Vector3D(-4,3,-6));
    raytracer.scale(sphere3,Point3D(0,0,0),factor3);

	raytracer.translate(sphere, Vector3D(0, 0, -5));
	raytracer.rotate(sphere, 'x', -45);
	raytracer.rotate(sphere, 'z', 45);
	raytracer.scale(sphere, Point3D(0, 0, 0), factor1);

	raytracer.translate(plane, Vector3D(0, 0, -7));
	raytracer.rotate(plane, 'z', 45);
	raytracer.scale(plane, Point3D(0, 0, 0), factor2);


	// Render the scene, feel free to make the image smaller for
	// testing purposes.	
	raytracer.render(width, height, eye, view, up, fov, "refraction1.bmp");

	// Render it from a different point of view.
	Point3D eye2(4, 2, 1);
	Vector3D view2(-4, -2, -6);
	raytracer.render(width, height, eye2, view2, up, fov, "refraction2.bmp");

	return 0;
}