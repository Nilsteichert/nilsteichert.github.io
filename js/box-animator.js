class Animator{
    constructor(elementID){
        this.elementID = elementID;
        this.color = this.getRGB(undefined);
        this.running=false;
    }
    
    startAnimation(color){this.color=this.getRGB(color);this.lightUp()}
    getRGB(color="green")
    {
        switch (color) {
            case "red":
                return "255, 31, 31";
                
            case "green":
                return "42, 255, 60";
            case "blue":
            
                return "0, 255, 255"; 
            default:
                return color;
        }
    }
    sleep(milliseconds) {
        return new Promise(resolve => setTimeout(resolve, milliseconds));
       }
}

Animator.prototype.lightUp = async function(color = this.color){
        if(this.running){return;}
        this.running=true;
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
        this.running = false;
    }

