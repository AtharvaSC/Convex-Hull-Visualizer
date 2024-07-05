// Canvas.js
import React, { useEffect, useRef } from 'react';

const Canvas = ({ points, convexHullPoints, onClick, currentState, myArr, updateDescription }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (currentState === 0) {
      // document.getElementById('description-container').innerHTML = "description-container";
      updateDescription("Step 1: Sorting the points by x-coordinate and showing the extreme points(i.e. plmin,plmax,pumin,pumax) and proceding ahead to show the LOWERHULL");
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw input points
      ctx.fillStyle = '#008ae6';
      points.forEach(({ x, y }) => {
        ctx.beginPath();
        ctx.arc(x, y, 4.5, 0, 2 * Math.PI);
        ctx.fill();
      });

      ctx.fillStyle = 'red';
      myArr[currentState][1].forEach(({ x, y }) => {
        ctx.beginPath();
        ctx.arc(x, y, 4.5, 0, 2 * Math.PI);
        ctx.fill();
      });

    }
    else if (currentState === 1) {
      updateDescription("Step 2: Dividing the points by Median(green line) into two halves and showing the Tleft(red) and Tright(purple) proceding ahead to show the first LOWERBRIDGE");
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw input points
      ctx.fillStyle = '#008ae6';
      points.forEach(({ x, y }) => {
        ctx.beginPath();
        ctx.arc(x, y, 4.5, 0, 2 * Math.PI);
        ctx.fill();
      });


      drawVerticalLine(ctx, myArr[currentState][2], canvas.height, '#00b300');

      ctx.fillStyle = 'red';
      myArr[currentState][3].forEach(({ x, y }) => {
        ctx.beginPath();
        ctx.arc(x, y, 4.5, 0, 2 * Math.PI);
        ctx.fill();
      });

      ctx.fillStyle = '#9900cc';
      myArr[currentState][4].forEach(({ x, y }) => {
        ctx.beginPath();
        ctx.arc(x, y, 4.5, 0, 2 * Math.PI);
        ctx.fill();
      });

      ctx.fillStyle = 'black';
      myArr[currentState][1].forEach(({ x, y }) => {
        ctx.beginPath();
        ctx.arc(x, y, 4.5, 0, 2 * Math.PI);
        ctx.fill();
      });
    }
    else if (currentState === 2) {
      updateDescription("Step 3: showing the random pairing(yellow segments) of points");
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw input points
      ctx.fillStyle = '#008ae6';
      points.forEach(({ x, y }) => {
        ctx.beginPath();
        ctx.arc(x, y, 4.5, 0, 2 * Math.PI);
        ctx.fill();
      });

      drawVerticalLine(ctx, myArr[currentState][2], canvas.height, '#00b300');

      //for Tleft
      ctx.fillStyle = 'red';
      myArr[currentState - 1][3].forEach(({ x, y }) => {
        ctx.beginPath();
        ctx.arc(x, y, 4.5, 0, 2 * Math.PI);
        ctx.fill();
      });

      //for Tright
      ctx.fillStyle = '#9900cc';
      myArr[currentState - 1][4].forEach(({ x, y }) => {
        ctx.beginPath();
        ctx.arc(x, y, 4.5, 0, 2 * Math.PI);
        ctx.fill();
      });

      //for pair
      ctx.strokeStyle = '#ffff00';
      ctx.lineWidth = 2;

      myArr[currentState][3].forEach(pair => {
        ctx.beginPath();
        ctx.moveTo(pair[0].x, pair[0].y);
        ctx.lineTo(pair[1].x, pair[1].y);
        ctx.stroke();
      });

      //for plmin plmax .....
      ctx.fillStyle = 'black';
      myArr[currentState][1].forEach(({ x, y }) => {
        ctx.beginPath();
        ctx.arc(x, y, 4.5, 0, 2 * Math.PI);
        ctx.fill();
      });
    }
    else if (currentState === 3) {
      updateDescription("Step 4: Calculating the median line slope and showing the supporting line(pink line) which has lowest y co-ordinate intercept and is passing through one or two(i.e pk,pm) of the input points(marked with blue)");
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw input points
      ctx.fillStyle = '#008ae6';
      points.forEach(({ x, y }) => {
        ctx.beginPath();
        ctx.arc(x, y, 4.5, 0, 2 * Math.PI);
        ctx.fill();
      });

      drawVerticalLine(ctx, myArr[currentState][2], canvas.height, '#00b300');

      //for Tleft
      ctx.fillStyle = 'red';
      myArr[currentState - 2][3].forEach(({ x, y }) => {
        ctx.beginPath();
        ctx.arc(x, y, 4.5, 0, 2 * Math.PI);
        ctx.fill();
      });

      //for Tright
      ctx.fillStyle = '#9900cc';
      myArr[currentState - 2][4].forEach(({ x, y }) => {
        ctx.beginPath();
        ctx.arc(x, y, 4.5, 0, 2 * Math.PI);
        ctx.fill();
      });
      // Draw line
      //color of supporting line
      ctx.strokeStyle = '#ff0066';
      ctx.lineWidth = 2;

      // Calculate another point on the line (for example, x = 200)
      const anotherPointX = 1000;
      const anotherPointY = myArr[currentState + 1][3][0].y + myArr[currentState + 1][3][2] * (anotherPointX - myArr[currentState + 1][3][0].x);
      const anotherPointX2 = 0;
      const anotherPointY2 = myArr[currentState + 1][3][0].y + myArr[currentState + 1][3][2] * (anotherPointX2 - myArr[currentState + 1][3][0].x);

      // Draw the line
      ctx.beginPath();
      ctx.moveTo(myArr[currentState + 1][3][0].x, myArr[currentState + 1][3][0].y);
      ctx.lineTo(anotherPointX, anotherPointY);
      ctx.moveTo(myArr[currentState + 1][3][0].x, myArr[currentState + 1][3][0].y);
      ctx.lineTo(anotherPointX2, anotherPointY2);
      ctx.stroke();

      //point of supporting line
      ctx.fillStyle = '#00ffff';
      myArr[currentState + 1][3].forEach(({ x, y }, index) => {
        if (index < 2) {
          ctx.beginPath();
          ctx.arc(x, y, 4.5, 0, 2 * Math.PI);
          ctx.fill();
        }

      });

      //for pair
      ctx.strokeStyle = '#ffff00';
      ctx.lineWidth = 2;

      myArr[currentState - 1][3].forEach(pair => {
        ctx.beginPath();
        ctx.moveTo(pair[0].x, pair[0].y);
        ctx.lineTo(pair[1].x, pair[1].y);
        ctx.stroke();
      });

      //for plmin plmax .....
      ctx.fillStyle = 'black';
      myArr[currentState][1].forEach(({ x, y }) => {
        ctx.beginPath();
        ctx.arc(x, y, 4.5, 0, 2 * Math.PI);
        ctx.fill();
      });

    }




    else if (currentState === 4) {
      updateDescription("Step 5: Dividing the pairs into three categories based on their slope in comparision with median slope: Small(orange) , Large(blue) and Equal(pink)");
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw input points
      ctx.fillStyle = '#008ae6';
      points.forEach(({ x, y }) => {
        ctx.beginPath();
        ctx.arc(x, y, 4.5, 0, 2 * Math.PI);
        ctx.fill();
      });

      drawVerticalLine(ctx, myArr[currentState][2], canvas.height, '#00b300');

      //for Tleft
      ctx.fillStyle = 'red';
      myArr[1][3].forEach(({ x, y }) => {
        ctx.beginPath();
        ctx.arc(x, y, 4.5, 0, 2 * Math.PI);
        ctx.fill();
      });

      //for Tright
      ctx.fillStyle = '#9900cc';
      myArr[1][4].forEach(({ x, y }) => {
        ctx.beginPath();
        ctx.arc(x, y, 4.5, 0, 2 * Math.PI);
        ctx.fill();
      });

      //Large
      //for pair
      ctx.strokeStyle = 'orange';
      ctx.lineWidth = 2;

      myArr[3][3].forEach(pair => {
        ctx.beginPath();
        ctx.moveTo(pair[0].x, pair[0].y);
        ctx.lineTo(pair[1].x, pair[1].y);
        ctx.stroke();
      });

      //Small
      ctx.strokeStyle = '#397290';
      ctx.lineWidth = 2;

      myArr[3][4].forEach(pair => {
        ctx.beginPath();
        ctx.moveTo(pair[0].x, pair[0].y);
        ctx.lineTo(pair[1].x, pair[1].y);
        ctx.stroke();
      });

      //equal
      ctx.strokeStyle = '#ff0066';
      ctx.lineWidth = 2;

      myArr[3][5].forEach(pair => {
        ctx.beginPath();
        ctx.moveTo(pair[0].x, pair[0].y);
        ctx.lineTo(pair[1].x, pair[1].y);
        ctx.stroke();
      });

      //color of supporting line
      ctx.strokeStyle = '#ff0066';
      ctx.lineWidth = 2;

      // Calculate another point on the line (for example, x = 200)
      const anotherPointX = 1000;
      const anotherPointY = myArr[4][3][0].y + myArr[4][3][2] * (anotherPointX - myArr[4][3][0].x);
      const anotherPointX2 = 0;
      const anotherPointY2 = myArr[4][3][0].y + myArr[4][3][2] * (anotherPointX2 - myArr[4][3][0].x);
      // Draw the line
      ctx.beginPath();
      ctx.moveTo(myArr[4][3][0].x, myArr[4][3][0].y);
      ctx.lineTo(anotherPointX, anotherPointY);
      ctx.moveTo(myArr[4][3][0].x, myArr[4][3][0].y);
      ctx.lineTo(anotherPointX2, anotherPointY2);
      ctx.stroke();

      //point of supporting line
      ctx.fillStyle = '#00ffff';
      myArr[4][3].forEach(({ x, y }, index) => {
        if (index < 2) {
          ctx.beginPath();
          ctx.arc(x, y, 4.5, 0, 2 * Math.PI);
          ctx.fill();
        }
      });

      //for plmin plmax .....
      ctx.fillStyle = 'black';
      myArr[currentState][1].forEach(({ x, y }) => {
        ctx.beginPath();
        ctx.arc(x, y, 4.5, 0, 2 * Math.PI);
        ctx.fill();
      });
    }






    else if (currentState === 5) {
      updateDescription("Step 6: Using the Lemma2 and Lemma3 of KPS lemmas eliminating the points not in the Lower Bridge. Eliminating points(blue) and Candidiate Points(red) for next recursive call are shown.");
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw input points
      ctx.fillStyle = '#008ae6';
      points.forEach(({ x, y }) => {
        ctx.beginPath();
        ctx.arc(x, y, 4.5, 0, 2 * Math.PI);
        ctx.fill();
      });

      drawVerticalLine(ctx, myArr[currentState][2], canvas.height, '#00b300');

      // Draw candidate points
      ctx.fillStyle = 'red';
      myArr[5][3].forEach(({ x, y }) => {
        ctx.beginPath();
        ctx.arc(x, y, 4.5, 0, 2 * Math.PI);
        ctx.fill();
      });

      //for plmin plmax .....
      ctx.fillStyle = 'black';
      myArr[currentState][1].forEach(({ x, y }) => {
        ctx.beginPath();
        ctx.arc(x, y, 4.5, 0, 2 * Math.PI);
        ctx.fill();
      });
    }






    else if (currentState === 6) {
      updateDescription("Step 7: One complete run of LowerBridge function completes here and showing the Input points for the next recursive call of the LowerBridge. Steps 3 to 6 keeps on computing until the LowerBridge is found.");
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      drawVerticalLine(ctx, myArr[5][2], canvas.height, '#00b300');

      // Draw candidate points
      ctx.fillStyle = 'red';
      myArr[5][3].forEach(({ x, y }) => {
        ctx.beginPath();
        ctx.arc(x, y, 4.5, 0, 2 * Math.PI);
        ctx.fill();
      });

      //for plmin plmax .....
      ctx.fillStyle = 'black';
      myArr[0][1].forEach(({ x, y }) => {
        ctx.beginPath();
        ctx.arc(x, y, 4.5, 0, 2 * Math.PI);
        ctx.fill();
      });

    }






    else if (currentState === 7) {
      updateDescription("Step 8: LowerBridge is found(orange line segment(Pl-Pr)) with 2 points on either side of the median line.");
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw input points
      ctx.fillStyle = '#008ae6';
      points.forEach(({ x, y }) => {
        ctx.beginPath();
        ctx.arc(x, y, 4.5, 0, 2 * Math.PI);
        ctx.fill();
      });

      drawVerticalLine(ctx, myArr[currentState][2], canvas.height, '#00b300');

      //for connecting lower bridge
      ctx.strokeStyle = 'orange';
      ctx.lineWidth = 2;
      ctx.fillStyle = 'red';
      myArr[6][3].forEach(({ x, y }, index) => {
        if (index === 0) {
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.arc(x, y, 5, 0, 2 * Math.PI);
          ctx.fill();
        }
        else {
          ctx.lineTo(x, y);
          ctx.stroke();
          ctx.arc(x, y, 5, 0, 2 * Math.PI);
          ctx.fill();
        }
      })

      //for plmin plmax .....
      ctx.fillStyle = 'black';
      myArr[0][1].forEach(({ x, y }) => {
        ctx.beginPath();
        ctx.arc(x, y, 4.5, 0, 2 * Math.PI);
        ctx.fill();
      });
    }







    else if (currentState === 8) {
      updateDescription("Step 9: connecting [plmin and pl(left point of bridge)] and [plmax and pr(right point of bridge)] and showing the newTleft(green points below plmin-pl) and newTright(green points below plmax-pr).");
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw input points
      ctx.fillStyle = '#008ae6';
      points.forEach(({ x, y }) => {
        ctx.beginPath();
        ctx.arc(x, y, 4.5, 0, 2 * Math.PI);
        ctx.fill();
      });

      drawVerticalLine(ctx, myArr[currentState][2], canvas.height, '#00b300');

      ctx.strokeStyle = 'purple';
      ctx.lineWidth = 2;
      // ctx.fillStyle = 'red';
      myArr[7][5].forEach(({ x, y }, index) => {
        if (index === 0) {
          ctx.beginPath();
          ctx.moveTo(x, y);
          // ctx.arc(x, y, 5, 0, 2 * Math.PI);
          // ctx.fill();
        }
        else {
          ctx.lineTo(x, y);
          ctx.stroke();
          // ctx.arc(x, y, 5, 0, 2 * Math.PI);
          // ctx.fill();
        }
      })

      myArr[7][6].forEach(({ x, y }, index) => {
        if (index === 0) {
          ctx.beginPath();
          ctx.moveTo(x, y);
          // ctx.arc(x, y, 5, 0, 2 * Math.PI);
          // ctx.fill();
        }
        else {
          ctx.lineTo(x, y);
          ctx.stroke();
          // ctx.arc(x, y, 5, 0, 2 * Math.PI);
          // ctx.fill();
        }
      })

      // newTleft points
      ctx.fillStyle = '#00ff00';
      myArr[7][3].forEach(({ x, y }) => {
        ctx.beginPath();
        ctx.arc(x, y, 4.5, 0, 2 * Math.PI);
        ctx.fill();
      });

      myArr[7][4].forEach(({ x, y }) => {
        ctx.beginPath();
        ctx.arc(x, y, 4.5, 0, 2 * Math.PI);
        ctx.fill();
      });

      //for connecting lower bridge
      ctx.strokeStyle = 'orange';
      ctx.lineWidth = 2;
      ctx.fillStyle = 'red';
      myArr[6][3].forEach(({ x, y }, index) => {
        if (index === 0) {
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.arc(x, y, 5, 0, 2 * Math.PI);
          ctx.fill();
        }
        else {
          ctx.lineTo(x, y);
          ctx.stroke();
          ctx.arc(x, y, 5, 0, 2 * Math.PI);
          ctx.fill();
        }
      })

      //for plmin plmax .....
      ctx.fillStyle = 'black';
      myArr[0][1].forEach(({ x, y }) => {
        ctx.beginPath();
        ctx.arc(x, y, 4.5, 0, 2 * Math.PI);
        ctx.fill();
      });
    }






    else if (currentState === 9) {
      updateDescription("Step 10: Calculating the medians of newTleft and newTright, showing them with green line and making recursive LowerHull calls (i.e LOWER_HULL(Plmin, pl, newTleft) and LOWER_HULL(Plmax, pr, newTright) steps 1 to 9 keeps repeating untill the LowerHull is found");
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw input points
      // ctx.fillStyle = '#008ae6';
      // points.forEach(({ x, y }) => {
      //   ctx.beginPath();
      //   ctx.arc(x, y, 4.5, 0, 2 * Math.PI);
      //   ctx.fill();
      // });

      // drawVerticalLine(ctx, myArr[6][2], canvas.height, '#00b300');

      ctx.strokeStyle = 'purple';
      ctx.lineWidth = 2;
      // ctx.fillStyle = 'red';
      myArr[7][5].forEach(({ x, y }, index) => {
        if (index === 0) {
          ctx.beginPath();
          ctx.moveTo(x, y);
          // ctx.arc(x, y, 5, 0, 2 * Math.PI);
          // ctx.fill();
        }
        else {
          ctx.lineTo(x, y);
          ctx.stroke();
          // ctx.arc(x, y, 5, 0, 2 * Math.PI);
          // ctx.fill();
        }
      })

      myArr[7][6].forEach(({ x, y }, index) => {
        if (index === 0) {
          ctx.beginPath();
          ctx.moveTo(x, y);
          // ctx.arc(x, y, 5, 0, 2 * Math.PI);
          // ctx.fill();
        }
        else {
          ctx.lineTo(x, y);
          ctx.stroke();
          // ctx.arc(x, y, 5, 0, 2 * Math.PI);
          // ctx.fill();
        }
      })

      // newTleft points
      ctx.fillStyle = '#00ff00';
      myArr[7][3].forEach(({ x, y }) => {
        ctx.beginPath();
        ctx.arc(x, y, 4.5, 0, 2 * Math.PI);
        ctx.fill();
      });

      myArr[7][4].forEach(({ x, y }) => {
        ctx.beginPath();
        ctx.arc(x, y, 4.5, 0, 2 * Math.PI);
        ctx.fill();
      });

      //for connecting lower bridge
      ctx.strokeStyle = 'orange';
      ctx.lineWidth = 2;
      ctx.fillStyle = 'red';
      myArr[6][3].forEach(({ x, y }, index) => {
        if (index === 0) {
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.arc(x, y, 5, 0, 2 * Math.PI);
          ctx.fill();
        }
        else {
          ctx.lineTo(x, y);
          ctx.stroke();
          ctx.arc(x, y, 5, 0, 2 * Math.PI);
          ctx.fill();
        }
      })

      //median of nTleft
      let xCoordinates = myArr[7][3].map(point => point.x).sort((a, b) => a - b);
      let medianIndex = Math.floor(myArr[7][3].length / 2);
      let a = xCoordinates[medianIndex];
      // const median = { x: a, y: 0 }; // Example value, replace it with the actual median line
      drawVerticalLine(ctx, a, canvas.height, '#00b300');

      //median of nTright
      xCoordinates = myArr[7][4].map(point => point.x).sort((a, b) => a - b);
      medianIndex = Math.floor(myArr[7][4].length / 2);
      a = xCoordinates[medianIndex];
      // const median = { x: a, y: 0 }; // Example value, replace it with the actual median line
      drawVerticalLine(ctx, a, canvas.height, '#00b300');

      //for plmin plmax .....
      ctx.fillStyle = 'black';
      myArr[0][1].forEach(({ x, y }) => {
        ctx.beginPath();
        ctx.arc(x, y, 4.5, 0, 2 * Math.PI);
        ctx.fill();
      });

    }






    else if (currentState === 10) {
      updateDescription("Step 11: LowerHull is found which is shown with the orange line segments. Similarly now we proceed with forming the UPPERHULL");
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw input points
      ctx.fillStyle = '#008ae6';
      points.forEach(({ x, y }) => {
        ctx.beginPath();
        ctx.arc(x, y, 4.5, 0, 2 * Math.PI);
        ctx.fill();
      });

      //showing lower hull
      ctx.strokeStyle = '#ff751a';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      myArr[9][2].forEach(({ x, y }, index) => {
        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      // ctx.closePath();
      ctx.stroke();

      //for plmin plmax .....
      ctx.fillStyle = 'black';
      myArr[0][1].forEach(({ x, y }) => {
        ctx.beginPath();
        ctx.arc(x, y, 4.5, 0, 2 * Math.PI);
        ctx.fill();
      });
    }





    else if (currentState === 11) {
      updateDescription("Step 12: Dividing the points by Median(green line) into two halves and showing the Tleft(red) and Tright(purple) proceding ahead to show the first UPPERBRIDGE");
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw input points
      ctx.fillStyle = '#008ae6';
      points.forEach(({ x, y }) => {
        ctx.beginPath();
        ctx.arc(x, y, 4.5, 0, 2 * Math.PI);
        ctx.fill();
      });


      drawVerticalLine(ctx, myArr[10][3], canvas.height, '#00b300');


      ctx.fillStyle = 'red';
      myArr[10][4].forEach(({ x, y }) => {
        ctx.beginPath();
        ctx.arc(x, y, 4.5, 0, 2 * Math.PI);
        ctx.fill();
      });

      ctx.fillStyle = '#9900cc';
      myArr[10][5].forEach(({ x, y }) => {
        ctx.beginPath();
        ctx.arc(x, y, 4.5, 0, 2 * Math.PI);
        ctx.fill();
      });

      //showing lower hull
      ctx.strokeStyle = '#ff751a';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      myArr[9][2].forEach(({ x, y }, index) => {
        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      // ctx.closePath();
      ctx.stroke();

      //for plmin plmax .....
      ctx.fillStyle = 'black';
      myArr[0][1].forEach(({ x, y }) => {
        ctx.beginPath();
        ctx.arc(x, y, 4.5, 0, 2 * Math.PI);
        ctx.fill();
      });

    }







    else if (currentState === 12) {
      updateDescription("Step 13: showing the random pairing(yellow segments) of points");
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw input points
      ctx.fillStyle = '#008ae6';
      points.forEach(({ x, y }) => {
        ctx.beginPath();
        ctx.arc(x, y, 4.5, 0, 2 * Math.PI);
        ctx.fill();
      });

      drawVerticalLine(ctx, myArr[11][3], canvas.height, '#00b300');

      //for Tleft
      ctx.fillStyle = 'red';
      myArr[10][4].forEach(({ x, y }) => {
        ctx.beginPath();
        ctx.arc(x, y, 4.5, 0, 2 * Math.PI);
        ctx.fill();
      });

      //for Tright
      ctx.fillStyle = '#9900cc';
      myArr[10][5].forEach(({ x, y }) => {
        ctx.beginPath();
        ctx.arc(x, y, 4.5, 0, 2 * Math.PI);
        ctx.fill();
      });

      //for pair
      ctx.strokeStyle = '#ffff00';
      ctx.lineWidth = 2;

      myArr[11][4].forEach(pair => {
        ctx.beginPath();
        ctx.moveTo(pair[0].x, pair[0].y);
        ctx.lineTo(pair[1].x, pair[1].y);
        ctx.stroke();
      });

      //showing lower hull
      ctx.strokeStyle = '#ff751a';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      myArr[9][2].forEach(({ x, y }, index) => {
        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      // ctx.closePath();
      ctx.stroke();

      //for plmin plmax .....
      ctx.fillStyle = 'black';
      myArr[0][1].forEach(({ x, y }) => {
        ctx.beginPath();
        ctx.arc(x, y, 4.5, 0, 2 * Math.PI);
        ctx.fill();
      });

    }






    else if (currentState === 13) {
      updateDescription("Step 14: Calculating the median line slope and showing the supporting line(pink line) which has highest y co-ordinate intercept and is passing through one or two(i.e pk,pm) of the input points(marked with blue)");
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw input points
      ctx.fillStyle = '#008ae6';
      points.forEach(({ x, y }) => {
        ctx.beginPath();
        ctx.arc(x, y, 4.5, 0, 2 * Math.PI);
        ctx.fill();
      });

      drawVerticalLine(ctx, myArr[13][3], canvas.height, '#00b300');

      //for Tleft
      ctx.fillStyle = 'red';
      myArr[10][4].forEach(({ x, y }) => {
        ctx.beginPath();
        ctx.arc(x, y, 4.5, 0, 2 * Math.PI);
        ctx.fill();
      });

      //for Tright
      ctx.fillStyle = '#9900cc';
      myArr[10][5].forEach(({ x, y }) => {
        ctx.beginPath();
        ctx.arc(x, y, 4.5, 0, 2 * Math.PI);
        ctx.fill();
      });
      // Draw line
      //color of supporting line
      ctx.strokeStyle = '#ff0066';
      ctx.lineWidth = 2;

      // Calculate another point on the line (for example, x = 200)
      const anotherPointX = 1000;
      const anotherPointY = myArr[13][4][0].y + myArr[13][4][2] * (anotherPointX - myArr[13][4][0].x);
      const anotherPointX2 = 0;
      const anotherPointY2 = myArr[13][4][0].y + myArr[13][4][2] * (anotherPointX2 - myArr[13][4][0].x);

      // Draw the line
      ctx.beginPath();
      ctx.moveTo(myArr[13][4][0].x, myArr[13][4][0].y);
      ctx.lineTo(anotherPointX, anotherPointY);
      ctx.moveTo(myArr[13][4][0].x, myArr[13][4][0].y);
      ctx.lineTo(anotherPointX2, anotherPointY2);
      ctx.stroke();

      //point of supporting line
      ctx.fillStyle = '#00ffff';
      myArr[13][4].forEach(({ x, y }, index) => {
        if (index < 2) {
          ctx.beginPath();
          ctx.arc(x, y, 4.5, 0, 2 * Math.PI);
          ctx.fill();
        }

      });

      //for pair
      ctx.strokeStyle = '#ffff00';
      ctx.lineWidth = 2;

      myArr[11][4].forEach(pair => {
        ctx.beginPath();
        ctx.moveTo(pair[0].x, pair[0].y);
        ctx.lineTo(pair[1].x, pair[1].y);
        ctx.stroke();
      });

      //showing lower hull
      ctx.strokeStyle = '#ff751a';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      myArr[9][2].forEach(({ x, y }, index) => {
        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      // ctx.closePath();
      ctx.stroke();

      //for plmin plmax .....
      ctx.fillStyle = 'black';
      myArr[0][1].forEach(({ x, y }) => {
        ctx.beginPath();
        ctx.arc(x, y, 4.5, 0, 2 * Math.PI);
        ctx.fill();
      });

    }












    else if (currentState === 14) {
      updateDescription("Step 15: Dividing the pairs into three categories based on their slope in comparision with median slope: Small(orange) , Large(blue) and Equal(pink)");
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw input points
      ctx.fillStyle = '#008ae6';
      points.forEach(({ x, y }) => {
        ctx.beginPath();
        ctx.arc(x, y, 4.5, 0, 2 * Math.PI);
        ctx.fill();
      });

      drawVerticalLine(ctx, myArr[12][3], canvas.height, '#00b300');

      //for Tleft
      ctx.fillStyle = 'red';
      myArr[10][4].forEach(({ x, y }) => {
        ctx.beginPath();
        ctx.arc(x, y, 4.5, 0, 2 * Math.PI);
        ctx.fill();
      });

      //for Tright
      ctx.fillStyle = '#9900cc';
      myArr[10][5].forEach(({ x, y }) => {
        ctx.beginPath();
        ctx.arc(x, y, 4.5, 0, 2 * Math.PI);
        ctx.fill();
      });

      //Large 
      ctx.strokeStyle = 'orange';
      ctx.lineWidth = 2;

      myArr[12][4].forEach(pair => {
        ctx.beginPath();
        ctx.moveTo(pair[0].x, pair[0].y);
        ctx.lineTo(pair[1].x, pair[1].y);
        ctx.stroke();
      });

      //Small
      ctx.strokeStyle = '#397290';
      ctx.lineWidth = 2;

      myArr[12][5].forEach(pair => {
        ctx.beginPath();
        ctx.moveTo(pair[0].x, pair[0].y);
        ctx.lineTo(pair[1].x, pair[1].y);
        ctx.stroke();
      });

      //equal
      ctx.strokeStyle = '#ff0066';
      ctx.lineWidth = 2;

      myArr[12][6].forEach(pair => {
        ctx.beginPath();
        ctx.moveTo(pair[0].x, pair[0].y);
        ctx.lineTo(pair[1].x, pair[1].y);
        ctx.stroke();
      });

      //color of supporting line
      ctx.strokeStyle = '#ff0066';
      ctx.lineWidth = 2;

      // Calculate another point on the line (for example, x = 200)
      const anotherPointX = 1000;
      const anotherPointY = myArr[13][4][0].y + myArr[13][4][2] * (anotherPointX - myArr[13][4][0].x);
      const anotherPointX2 = 0;
      const anotherPointY2 = myArr[13][4][0].y + myArr[13][4][2] * (anotherPointX2 - myArr[13][4][0].x);

      // Draw the line
      ctx.beginPath();
      ctx.moveTo(myArr[13][4][0].x, myArr[13][4][0].y);
      ctx.lineTo(anotherPointX, anotherPointY);
      ctx.moveTo(myArr[13][4][0].x, myArr[13][4][0].y);
      ctx.lineTo(anotherPointX2, anotherPointY2);
      ctx.stroke();

      //point of supporting line
      ctx.fillStyle = '#00ffff';
      myArr[13][4].forEach(({ x, y }, index) => {
        if (index < 2) {
          ctx.beginPath();
          ctx.arc(x, y, 4.5, 0, 2 * Math.PI);
          ctx.fill();
        }

      });

      //showing lower hull
      ctx.strokeStyle = '#ff751a';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      myArr[9][2].forEach(({ x, y }, index) => {
        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      // ctx.closePath();
      ctx.stroke();

      //for plmin plmax .....
      ctx.fillStyle = 'black';
      myArr[0][1].forEach(({ x, y }) => {
        ctx.beginPath();
        ctx.arc(x, y, 4.5, 0, 2 * Math.PI);
        ctx.fill();
      });


    }






    else if (currentState === 15) {
      updateDescription("Step 16: Using the Lemma2 and Lemma3 of KPS lemmas eliminating the points not in the Upper Bridge. Eliminating points(blue) and Candidiate Points(red) for next recursive call are shown.");
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw input points
      ctx.fillStyle = '#008ae6';
      points.forEach(({ x, y }) => {
        ctx.beginPath();
        ctx.arc(x, y, 4.5, 0, 2 * Math.PI);
        ctx.fill();
      });

      drawVerticalLine(ctx, myArr[14][3], canvas.height, '#00b300');

      // Draw candidate points
      ctx.fillStyle = 'red';
      myArr[14][4].forEach(({ x, y }) => {
        ctx.beginPath();
        ctx.arc(x, y, 4.5, 0, 2 * Math.PI);
        ctx.fill();
      });

      //showing lower hull
      ctx.strokeStyle = '#ff751a';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      myArr[9][2].forEach(({ x, y }, index) => {
        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      // ctx.closePath();
      ctx.stroke();

      //for plmin plmax .....
      ctx.fillStyle = 'black';
      myArr[0][1].forEach(({ x, y }) => {
        ctx.beginPath();
        ctx.arc(x, y, 4.5, 0, 2 * Math.PI);
        ctx.fill();
      });

    }






    else if (currentState === 16) {
      updateDescription("Step 17: One complete run of UpperBridge function completes here and showing the Input points for the next recursive call of the UpperBridge. Steps 13 to 16 keeps on computing until the UpperBridge is found.");
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      drawVerticalLine(ctx, myArr[3][2], canvas.height, '#00b300');

      // Draw candidate points
      ctx.fillStyle = 'red';
      myArr[14][4].forEach(({ x, y }) => {
        ctx.beginPath();
        ctx.arc(x, y, 4.5, 0, 2 * Math.PI);
        ctx.fill();
      });

      //showing lower hull
      ctx.strokeStyle = '#ff751a';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      myArr[9][2].forEach(({ x, y }, index) => {
        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      // ctx.closePath();
      ctx.stroke();

      //for plmin plmax .....
      ctx.fillStyle = 'black';
      myArr[0][1].forEach(({ x, y }) => {
        ctx.beginPath();
        ctx.arc(x, y, 4.5, 0, 2 * Math.PI);
        ctx.fill();
      });

    }





    else if (currentState === 17) {
      updateDescription("Step 18: UpperBridge is found(orange line segment(Pl-Pr)) with 2 points on either side of the median line.");
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw input points
      ctx.fillStyle = '#008ae6';
      points.forEach(({ x, y }) => {
        ctx.beginPath();
        ctx.arc(x, y, 4.5, 0, 2 * Math.PI);
        ctx.fill();
      });

      drawVerticalLine(ctx, myArr[3][2], canvas.height, '#00b300');

      //for connecting upper bridge
      ctx.strokeStyle = 'orange';
      ctx.lineWidth = 2;
      ctx.fillStyle = 'red';
      myArr[15][4].forEach(({ x, y }, index) => {
        if (index === 0) {
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.arc(x, y, 5, 0, 2 * Math.PI);
          ctx.fill();
        }
        else {
          ctx.lineTo(x, y);
          ctx.stroke();
          ctx.arc(x, y, 5, 0, 2 * Math.PI);
          ctx.fill();
        }
      })

      //showing lower hull
      ctx.strokeStyle = '#ff751a';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      myArr[9][2].forEach(({ x, y }, index) => {
        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      // ctx.closePath();
      ctx.stroke();

      //for plmin plmax .....
      ctx.fillStyle = 'black';
      myArr[0][1].forEach(({ x, y }) => {
        ctx.beginPath();
        ctx.arc(x, y, 4.5, 0, 2 * Math.PI);
        ctx.fill();
      });

    }






    else if (currentState === 18) {
      updateDescription("Step 19: connecting [pumin and pl(left point of bridge)] and [pumax and pr(right point of bridge)] and showing the newTleft(green points above pumin-pl) and newTright(green points above pumax-pr).");
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw input points
      ctx.fillStyle = '#008ae6';
      points.forEach(({ x, y }) => {
        ctx.beginPath();
        ctx.arc(x, y, 4.5, 0, 2 * Math.PI);
        ctx.fill();
      });

      drawVerticalLine(ctx, myArr[3][2], canvas.height, '#00b300');

      ctx.strokeStyle = 'purple';
      ctx.lineWidth = 2;
      // ctx.fillStyle = 'red';
      myArr[16][6].forEach(({ x, y }, index) => {
        if (index === 0) {
          ctx.beginPath();
          ctx.moveTo(x, y);
          // ctx.arc(x, y, 5, 0, 2 * Math.PI);
          // ctx.fill();
        }
        else {
          ctx.lineTo(x, y);
          ctx.stroke();
          // ctx.arc(x, y, 5, 0, 2 * Math.PI);
          // ctx.fill();
        }
      })

      myArr[16][7].forEach(({ x, y }, index) => {
        if (index === 0) {
          ctx.beginPath();
          ctx.moveTo(x, y);
          // ctx.arc(x, y, 5, 0, 2 * Math.PI);
          // ctx.fill();
        }
        else {
          ctx.lineTo(x, y);
          ctx.stroke();
          // ctx.arc(x, y, 5, 0, 2 * Math.PI);
          // ctx.fill();
        }
      })

      // newTleft points
      ctx.fillStyle = '#00ff00';
      myArr[16][4].forEach(({ x, y }) => {
        ctx.beginPath();
        ctx.arc(x, y, 4.5, 0, 2 * Math.PI);
        ctx.fill();
      });

      myArr[16][5].forEach(({ x, y }) => {
        ctx.beginPath();
        ctx.arc(x, y, 4.5, 0, 2 * Math.PI);
        ctx.fill();
      });

      //for connecting lower bridge
      ctx.strokeStyle = 'orange';
      ctx.lineWidth = 2;
      ctx.fillStyle = 'red';
      myArr[15][4].forEach(({ x, y }, index) => {
        if (index === 0) {
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.arc(x, y, 5, 0, 2 * Math.PI);
          ctx.fill();
        }
        else {
          ctx.lineTo(x, y);
          ctx.stroke();
          ctx.arc(x, y, 5, 0, 2 * Math.PI);
          ctx.fill();
        }
      })

      //showing lower hull
      ctx.strokeStyle = '#ff751a';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      myArr[9][2].forEach(({ x, y }, index) => {
        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      // ctx.closePath();
      ctx.stroke();

      //for plmin plmax .....
      ctx.fillStyle = 'black';
      myArr[0][1].forEach(({ x, y }) => {
        ctx.beginPath();
        ctx.arc(x, y, 4.5, 0, 2 * Math.PI);
        ctx.fill();
      });

    }




    else if (currentState === 19) {
      updateDescription("Step 20: Calculating the medians of newTleft and newTright, showing them with green line and making recursive UpperHull calls (i.e UPPER_HULL(Pumin, pl, newTleft) and UPPER_HULL(Pumax, pr, newTright) steps 11 to 19 keeps repeating untill the UpperHull is found");
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = 'purple';
      ctx.lineWidth = 2;
      // ctx.fillStyle = 'red';
      myArr[16][6].forEach(({ x, y }, index) => {
        if (index === 0) {
          ctx.beginPath();
          ctx.moveTo(x, y);
          // ctx.arc(x, y, 5, 0, 2 * Math.PI);
          // ctx.fill();
        }
        else {
          ctx.lineTo(x, y);
          ctx.stroke();
          // ctx.arc(x, y, 5, 0, 2 * Math.PI);
          // ctx.fill();
        }
      })

      myArr[16][7].forEach(({ x, y }, index) => {
        if (index === 0) {
          ctx.beginPath();
          ctx.moveTo(x, y);
          // ctx.arc(x, y, 5, 0, 2 * Math.PI);
          // ctx.fill();
        }
        else {
          ctx.lineTo(x, y);
          ctx.stroke();
          // ctx.arc(x, y, 5, 0, 2 * Math.PI);
          // ctx.fill();
        }
      })

      // newTleft points
      ctx.fillStyle = '#00ff00';
      myArr[16][4].forEach(({ x, y }) => {
        ctx.beginPath();
        ctx.arc(x, y, 4.5, 0, 2 * Math.PI);
        ctx.fill();
      });

      myArr[16][5].forEach(({ x, y }) => {
        ctx.beginPath();
        ctx.arc(x, y, 4.5, 0, 2 * Math.PI);
        ctx.fill();
      });

      //for connecting lower bridge
      ctx.strokeStyle = 'orange';
      ctx.lineWidth = 2;
      ctx.fillStyle = 'red';
      myArr[15][4].forEach(({ x, y }, index) => {
        if (index === 0) {
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.arc(x, y, 5, 0, 2 * Math.PI);
          ctx.fill();
        }
        else {
          ctx.lineTo(x, y);
          ctx.stroke();
          ctx.arc(x, y, 5, 0, 2 * Math.PI);
          ctx.fill();
        }
      })

      //median of nTleft
      let xCoordinates = myArr[16][4].map(point => point.x).sort((a, b) => a - b);
      let medianIndex = Math.floor(myArr[16][4].length / 2);
      let a = xCoordinates[medianIndex];
      // const median = { x: a, y: 0 }; // Example value, replace it with the actual median line
      drawVerticalLine(ctx, a, canvas.height, '#00b300');

      //median of nTright
      xCoordinates = myArr[16][5].map(point => point.x).sort((a, b) => a - b);
      medianIndex = Math.floor(myArr[16][5].length / 2);
      a = xCoordinates[medianIndex];
      // const median = { x: a, y: 0 }; // Example value, replace it with the actual median line
      drawVerticalLine(ctx, a, canvas.height, '#00b300');

      //showing lower hull
      ctx.strokeStyle = '#ff751a';
      // ctx.fillStyle = 'blue';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      myArr[9][2].forEach(({ x, y }, index) => {
        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }

      });

      // ctx.closePath();
      ctx.stroke();

      // Draw input points
      ctx.fillStyle = '#008ae6';
      myArr[9][2].forEach(({ x, y }) => {
        ctx.beginPath();
        ctx.arc(x, y, 4.5, 0, 2 * Math.PI);
        ctx.fill();
      });


      //for plmin plmax .....
      ctx.fillStyle = 'black';
      myArr[0][1].forEach(({ x, y }) => {
        ctx.beginPath();
        ctx.arc(x, y, 4.5, 0, 2 * Math.PI);
        ctx.fill();
      });


    }





    else if (currentState === 20) {
      updateDescription("Step 21: Complete UpperHull is found and joined with the already formed LowerHull to get the ConvexHull. The ConvexHull is shown with the orange line segments.");
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw input points
      ctx.fillStyle = '#008ae6';
      points.forEach(({ x, y }) => {
        ctx.beginPath();
        ctx.arc(x, y, 4.5, 0, 2 * Math.PI);
        ctx.fill();
      });

      //showing full hull
      ctx.strokeStyle = '#ff751a';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      myArr[18][2].forEach(({ x, y }, index) => {
        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      ctx.closePath();
      ctx.stroke();

    }




    else {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw input points
      ctx.fillStyle = '#008ae6';
      points.forEach(({ x, y }) => {
        ctx.beginPath();
        ctx.arc(x, y, 4.5, 0, 2 * Math.PI);
        ctx.fill();
      });

      // Draw convex hull
      ctx.strokeStyle = '#ff751a';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      convexHullPoints.forEach(({ x, y }, index) => {
        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      ctx.closePath();
      ctx.stroke();


      // // Draw median line
      // if (medianLine) {
      //   drawVerticalLine(ctx, medianLine.x, canvas.height, 'green');
      // }  
    }
  }, [points, currentState, convexHullPoints, myArr, updateDescription]);

  const handleCanvasClick = (event) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    onClick({ x, y });
  };

  const drawVerticalLine = (ctx, x, canvasHeight, color) => {
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvasHeight);
    ctx.stroke();
  };
  const canvasStyle = {
    border: '1px solid black',
    backgroundColor: 'rgba(255, 255, 255, 1)' // White color with full opacity
  };

  return (
    <canvas
      ref={canvasRef}
      width={1200}
      height={500}
      onClick={handleCanvasClick}
      style={canvasStyle}
    ></canvas>
  );
};

export default Canvas;