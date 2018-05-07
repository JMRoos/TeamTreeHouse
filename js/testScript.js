var points = {};
var jobj;

var script = document.createElement('script');
script.src = 'js/colorMe.js';
document.head.appendChild(script);

function URLExists(url){
    var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    return http.status!=404;
}

function getDetail(cb) {
    var xhReq = new XMLHttpRequest();
    //xhReq.open("GET", "https://teamtreehouse.com/amerkhalid.json", true);
    var url = "https://teamtreehouse.com/" + document.getElementById('username').value + ".json";
    
    if(URLExists(url)){

        xhReq.open("GET", url, true); 
        xhReq.onreadystatechange = function() {
            if (xhReq.readyState == 4){
                cb(xhReq.responseText);
            } 
            cb(xhReq.responseText);
        } 
        xhReq.send(null);
    } else {
        alert("No username with " + url.value + " was found, please try again.");
    }
} 
    
function clearCircle(context,x,y,radius) {
    context.save();
    context.beginPath();
    context.arc(x, y, radius, 0, 2*Math.PI, true);
    context.clip();
    context.clearRect(x-radius,y-radius,radius*2,radius*2);
    context.restore();
};





function loadScript(url, callback) {
    // Adding the script tag to the head as suggested before
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;

    // Then bind the event to the callback function.
    // There are several events for cross browser compatibility.
    script.onreadystatechange = callback;
    script.onload = callback;

    // Fire the loading
    head.appendChild(script);
}

var drawPieChart = function() {
    var myCanvas = document.getElementById("myCanvas");
    var ctx = myCanvas.getContext("2d");

    ctx.beginPath();
    ctx.rect(0, 0, myCanvas.width, myCanvas.height);
    ctx.fillStyle = "#c0c0c0";
    ctx.closePath();
    ctx.fill();

    var myDougnutChart = new Piechart(
        {
            canvas:myCanvas,
            data:points,
            colors:colors,
            doughnutHoleSize:0.70
        }
    );
    myDougnutChart.draw();
    clearCircle(ctx,150,150,100);
};

function getUserDataByName(){
 

        getDetail(function(data) {
            jobj  = JSON.parse(data);
            document.getElementById("treehousediv").style.opacity = 1.0;
            document.getElementById("treehouse").innerHTML = 'TREEHOUSE ACHIEVEMENTS';
            document.getElementById("username").innerHTML = jobj.name;
            document.getElementById("profilename").innerHTML = "Profile name: " + jobj.profile_name;
            document.getElementById("url").innerHTML =  '<a href=' + jobj.profile_url+ '>Link to TreeHouse  account</a>';
            document.getElementById("badges").innerHTML = "Badges earned: " + jobj.badges.length;
            document.getElementById("total").innerHTML = "Total points: " + jobj.points.total;

            var myCanvas = document.getElementById("myCanvas");
            myCanvas.width = 300;
            myCanvas.height = 300;
            myCanvas.style.backgroundImage = "url('"+ jobj.gravatar_url +"')";

            var contentList = "<table>";
            for (var key in jobj.points) {
                if (jobj.points.hasOwnProperty(key) && key !== 'total') {
                    //   contentList  += key + " -> " + jobj.points[key] + "<br>";
                    contentList  +=     '<tr>' +
                        ' <td bgcolor="' + colors[key] + '" width= "15px"> </td>' +
                        ' <td  width= "200px">' + key +  '</td> ' +
                        ' <td  >' +  jobj.points[key] + '</td> ' +
                        '</tr>';

                    points[key] = jobj.points[key];
                }
            }
            contentList  += "</table>";
            document.getElementById("myPoints").innerHTML = contentList;

            loadScript("js/PieChart.js", drawPieChart);

        });
}
