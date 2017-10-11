let canvasFactor = 0.75;

function setup() {
    //Create Canvas Area
    canvas = createCanvas(windowWidth,windowHeight*canvasFactor);
    canvas.parent("fractalTree")
    
    //Create and Initialise Sliders to control branch angle, length and thickness
    angleSlider = createSlider(0,PI/4,PI/8,0.01).parent("angle");
    lengthSlider = createSlider(0,200,100,0.1).parent("length");
    thicknessSlider = createSlider(0,10,6,0.1).parent("thickness");
    rightTiltFactorSlider = createSlider(0,2,1.5,0.01).parent("rightTilt");
    leftTiltFactorSlider = createSlider(0,2,1,0.01).parent("leftTilt");
    
    //Set Frame Rate - 25 FPS
    frameRate(25);
}

function draw() { 
    //Set Background Colour
    background(45);
    
    //Set Origin to center bottom of Canvas
    translate(width/2,height);
    
    //Retrieve values for Angle, Length and Thickness
    angle = angleSlider.value();
    len = lengthSlider.value();
    thickness = thicknessSlider.value();
    rightTiltFactor = rightTiltFactorSlider.value();
    leftTiltFactor = leftTiltFactorSlider.value();
    
    //Recursively draw fractal tree
    branch(len, thickness);
}

function windowResized() { 
    resizeCanvas(windowWidth, windowHeight*canvasFactor); 
}

function branch(len, thickness) {
    
    //Set the stroke weight and change tips to green
    strokeWeight(thickness);
    if (len > lengthSlider.value() / 10) {
        stroke(255);
    } else { stroke(166,214,40); } 
    
    //Draw 'trunk'
    line(0,0,0,-len);
    translate(0,-len);
    
    //If there are more branches to make, split off and make.
    if (len > lengthSlider.value() / 20) {
        
      //Right branching
      push();
      rotate(angle*rightTiltFactor);
      branch(len * 0.75, thickness * 0.75); //reduce length and thickness to 75%
      pop();
        
      //Left branching  
      push();
      rotate(-angle*leftTiltFactor);
      branch(len * 0.75, thickness * 0.75); //reduce length and thickness to 75%
      pop();
    }
}