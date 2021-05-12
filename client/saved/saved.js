//this was just part of one of my several attempts at throwing code at a wall and hoping it'd stick
let chartsG;

//build a canvas for every saved chart
const ChartList = function(props) {
console.log(props.charts.length);
chartsG= props.charts;

    if(props.charts.length === 0){
        return (
            <div className="chartList">
                <h3 className="noCharts">None yet</h3>
            </div>
        );
    }
    
    const chartNodes = props.charts.map(function(chart){
        
        return (   
                <div className="chart-content">
                    <canvas onLoad={DrawChart} width="690" height="640">
		            Your browser doesn't support canvas, so an image can not be created.
	                </canvas>
                    <div id="modalButtons">
                        <a href="#" id="download">
                        Download Image
                        </a> 
                    </div>  
                </div>
        );
    });

    return (
        <div className="canvasArea">
            {chartNodes}
        </div>
    );
};

//draw on the canvases on the saved charts page
const DrawChart = () => {

    let canvas = document.querySelector("canvas");

    // B - the ctx variable points at a “2D drawing context” 
    var ctx = canvas.getContext("2d");

    // C - all fill operations are now in yellow 
    ctx.fillStyle = "white";

    // D - fill a rectangle with the current fill color 
    ctx.fillRect(0, 0, 690, 640);

    ctx.save();

    // horizontal alignment 
    ctx.textAlign = "center";

    // vertical alignment 
    ctx.textBaseline = "middle";


    // E - set the current font 
    ctx.font = "bold 20pt Gloria Hallelujah";

    // F - change the current fill color 
    ctx.fillStyle = "#000000";

    // G - draw and fill text using current fill color 
    ctx.fillText("Lawful", 200, 85);
    ctx.fillText("Neutral", 370, 85);
    ctx.fillText("Chaotic", 540, 85);

    ctx.fillText("Good", 75, 185);
    ctx.fillText("Neutral", 75, 185 + 170);
    ctx.fillText("Evil", 75, 185 + 340);

    ctx.font = "bold 10pt Arial";

    ctx.fillText("Created with alignment-charts.herokuapp.com", 520, 630);

    ctx.restore();

    ctx.strokeStyle = "black";
    ctx.lineWidth = 5;

    ctx.beginPath();

    //horizontal lines
    for (let i = 100; i <= 640; i += 170) {
        ctx.moveTo(150, i);
        ctx.lineTo(660, i);
    }

    //vertical lines
    for (let i = 150; i <= 690; i += 170) {
        ctx.moveTo(i, 100);
        ctx.lineTo(i, 610);
    }

    ctx.closePath();

    ctx.stroke();

    for (let i = 0; i < 9; i += 1) {
        //https://stackoverflow.com/questions/6011378/how-to-add-image-to-canvas
        splitLinks = imageLinks.split(',');
        if (chartsG[0].splitLinks[i] !== '') {
            let base_image = new Image();
            base_image.src = chartsG[0].splitLinks[i].src;
            base_image.width = "130";
            base_image.height = "130";
            let scale = Math.min(150 / base_image.width, 150 / base_image.height);
            ctx.drawImage(base_image, 155 + 170 * (i % 3), 105 + 170 * Math.floor(i / 3), base_image.width * scale, base_image.height * scale);
        }
    }
}

const loadChartsFromServer = () => {
    sendAjax('GET', '/getCharts', null, (data) => {
        ReactDOM.render(
            <ChartList charts={data.charts} />, document.querySelector("#savedCharts")
        );
    });
};

const setup = function() {    
    
    loadChartsFromServer();
};

$(document).ready(function() {
    setup();
});