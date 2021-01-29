const Settings = function(){
    this.withAccidental = false;
    this.keysignature = "C";
    this.lowestNote = "C/2"
    this.highestNote = "C/6"
    this.loadCookies();
    
}

Settings.prototype.loadCookies = function()
{
    this.withAccidental = Cookies.get("withAccidental");
    this.keysignature = Cookies.get("keysignature")
    this.lowestNote = Cookies.get("lowestNote")
    this.highestNote = Cookies.get("highestNote")
}

Settings.prototype.setAllCookies = function(withAccidental,keysignature,lowestNote,highestNote)
{
    Cookies.set("withAccidental", withAccidental, { expires: 365 });
    Cookies.set("keysignature", keysignature, { expires: 365 });
    Cookies.set("lowestNote", lowestNote, { expires: 365 });
    Cookies.set("highestNote", lowestNote, { expires: 365 });
}

Settings.prototype.setWithAccidental = function(withAccidental)
{
    Cookies.set("withAccidental", withAccidental, { expires: 365 });
}

Settings.prototype.setKeysignature = function(keysignature)
{
    Cookies.set("keysignature", keysignature, { expires: 365 });
}

Settings.prototype.setlowestNote = function(lowestNote)
{
    Cookies.set("lowestNote", lowestNote, { expires: 365 });
}

Settings.prototype.sethighestNote = function(highestNote)
{
    Cookies.set("highestNote", highestNote, { expires: 365 });
}
