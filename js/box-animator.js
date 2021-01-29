class Animator{
    constructor(elementID,color){
        this.elementID = elementID;
        this.color = this.getColor(color);
    }

    getColor(color)
    {
        switch (color) {
            case "red":
                return "255, 31, 31";
                
            case "green":
                return "42, 255, 60";
            case "blue":
            
                return "rgba(42, 255, 60,) "; 
            default:
                return color;
        }
    }
    sleep(milliseconds) {
        return new Promise(resolve => setTimeout(resolve, milliseconds));
       }
}

Animator.prototype.animate = async function(color = this.color){
   
        var opacity = 0;
        while (opacity < 1) {
            opacity+=0.04;  
            document.getElementById(`${this.elementID}`).style.boxShadow=`0 0 50px 20px rgba(${color}, ${opacity})`
            await this.sleep(2);
        }
        while (opacity > 0) {    
            opacity-=0.01;
            document.getElementById(`${this.elementID}`).style.boxShadow=`0 0 50px 20px rgba(${color}, ${opacity})`
            await this.sleep(2);
        }
    }

