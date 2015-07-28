var sketchProc=function(processingInstance){ with (processingInstance){
size(400, 400); 
frameRate(30);


// This program lets the user move the mouse to draw Winston's beard -
//  but ONLY his beard, nothing else.
// It does this by figuring out a polygon that describes his beard,
//  and using a point-in-poly algorithm to detect if the point is in the poly.


// A polygon that describes the space of Winston's beard
var beardPolygon = [
    [ 51, 226],
    [ 125, 225],
    [ 180, 308],
    [ 258, 318],
    [ 320, 286],
    [ 338, 238],
    [ 353, 248],
    [ 349, 311],
    [ 286, 374],
    [ 161, 367],
    [ 70, 310],
    [ 53, 227]
];


// Function to determine whether a given point (array of two coordinates)
//  is inside a polygon (multi-dimensional array of multiple coordinates)
// From: https://github.com/substack/point-in-polygon/blob/master/index.js
var isPointInPoly = function (point, vs) {
    // ray-casting algorithm based on
    // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html
    
    var x = point[0], y = point[1];
    
    var inside = false;
    for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        var xi = vs[i][0], yi = vs[i][1];
        var xj = vs[j][0], yj = vs[j][1];
        
        var intersect = ((yi > y) !== (yj > y)) &&
            (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) {
            inside = !inside;
        }
    }
    return inside;
};

// Function that draws polygons (multi-dimensional arrays of coordinates),
//  useful for debugging and visualizing the beard polygon if desired
var drawPoly = function(poly) {
    beginShape();
    for (var i = 0; i < poly.length; i++) {
        vertex(poly[i][0], poly[i][1]);
    }
    endShape();
};

// Draw Winston's face
var drawWinston = function() {
    
    noStroke();
    // face
    fill(255, 255, 0);
    ellipse(202, 208, 300, 300);
    
    // eyes
    fill(46, 46, 41);
    ellipse(157, 151, 40, 40);
    ellipse(304, 142, 40, 40);
    
    // mouth
    fill(252, 65, 65);
    ellipse(257, 240, 120, 136);
};

/*
// This was used to come up with the beardPolygon array.
Feel free to re-use to come up with your own beard!
var polyPoints = [];
mouseClicked = function() {
    polyPoints.push([mouseX, mouseY]);
    println("[ " + mouseX + ", " + mouseY + "],");
    stroke(0, 0, 0);
    point(mouseX, mouseY);
    if (polyPoints.length >= 2) {
        line(polyPoints[polyPoints.length-2][0], polyPoints[polyPoints.length-2][1],
            polyPoints[polyPoints.length-1][0], polyPoints[polyPoints.length-1][1]);
            
    }
};*/


// When the mouse moves, draw a point only if its inside the beard polygon
mouseClicked = function() {
    if (isPointInPoly([mouseX, mouseY], beardPolygon)) {
        strokeWeight(5);
        stroke(0, 0, 0);
        point(mouseX, mouseY);
    }
};


drawWinston();


}};
