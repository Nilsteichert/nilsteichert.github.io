async function answeredRight()
{
    var opacity = 0;
    while (opacity < 1) {
        opacity+=0.04;  
        document.getElementById(`boxshadow`).style.boxShadow=`0 0 50px 20px rgba(42, 255, 60, ${opacity})`
        await sleep(2);
    }
    while (opacity > 0) {    
        opacity-=0.01;
        document.getElementById(`boxshadow`).style.boxShadow=`0 0 50px 20px rgba(42, 255, 60, ${opacity})`
        await sleep(2);
    }
   }

async function answeredWrong()
   {
       var opacity = 0;
       while (opacity < 1) {
           opacity+=0.04;
           document.getElementById(`boxshadow`).style.boxShadow=`0 0 50px 20px rgba(255, 31, 31, ${opacity})`
           await sleep(2);
       }
       while (opacity > 0) {   
           opacity-=0.01; 
           document.getElementById(`boxshadow`).style.boxShadow=`0 0 50px 20px rgba(255, 31, 31, ${opacity})`
           await sleep(2);
       }
      }

function sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
   }

