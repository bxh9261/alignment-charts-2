const axios = require('axios');

let alignBoxes;
let charBoxes = [];
let charSelected = -1;
let charObj;
let characterSet;



//click and unclick box
const boxReset = () => {
    for (let i = 0; i < charBoxes.length; i += 1) {
        if (i === charSelected) {
            charBoxes[i].style.border = "#E40712 5px solid";
            charBoxes[i].style.backgroundColor = "#979AA4";
        }
        else {
            charBoxes[i].style.border = "black 3px solid";
            charBoxes[i].style.backgroundColor = "#ddd";
        }
    }
};

//place an item... whether use clicks on the div or directly on the image currently on the board
const alignClicked = (e) => {
    // box on alignment chart was selected

    let selectedDiv = e.target;

    if (e.target.id === "imgOnChart") {
        selectedDiv = e.target.parentNode;
        e.target.remove();
    } else if (e.target.children.length > 0) {
        e.target.innerHTML = "";
    }

    if (charSelected > -1) {
        const image = document.createElement('img');
        image.src = charBoxes[charSelected].getElementsByTagName('img')[0].src;
        image.id = "imgOnChart";
        //image.addEventListener('click', alignClicked);
        selectedDiv.appendChild(image);
    }
};

const charClicked = (e) => {
    // character was selected
    charBoxes = document.querySelectorAll(".cbox");

    for (let i = 0; i < charBoxes.length; i += 1) {
        if (e.target === charBoxes[i].getElementsByTagName('img')[0]) {
            charSelected = i;
        }
    }

    boxReset();
};

//clear button selected. remove all chart images.
const clearClicked = () => {
    for (let i = 0; i < alignBoxes.length; i += 1) {
        alignBoxes[i].innerHTML = "";
    }
}

//get new characters on dropdown selected
const resetChars = () => {
    const cboxes = document.querySelector('#characters-picker');
    const mediaList  = document.querySelector('.mediaList');
    charBoxes = [];
    let selText = mediaList.options[mediaList.selectedIndex].text;

    sendAjax('GET', '/getCharacters', null, (data) => {
        const finalChars = [];
        for(let i = 0; i < data.characters.length; i+=1){
            if(data.characters[i].media === selText || selText === "ALL") {
                finalChars.push(data.characters[i]);
            }
        }
        ReactDOM.render(
            <CharacterList characters={finalChars} />, document.querySelector("#characters-picker")
        );
    });

    charSelected = -1;
};

//Do I need to credit myself? This is from https://people.rit.edu/bxh9261/330/exercises/hello-canvas.html
const drawChart = () => {

    // Get the modal
    let canvasModal = document.querySelector("#canvasModal");
    canvasModal.style.display = "block";

    let xspan = document.querySelector(".close");
    xspan.addEventListener('click', closeModal);

    let canvas = document.querySelector("canvas");

    let download = document.querySelector("#download");
    download.addEventListener('click', downloadImage);

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

    for (let i = 0; i < alignBoxes.length; i += 1) {
        //https://stackoverflow.com/questions/6011378/how-to-add-image-to-canvas
        if (alignBoxes[i].getElementsByTagName('img').length > 0) {
            let base_image = new Image();
            base_image.src = alignBoxes[i].getElementsByTagName('img')[0].src;
            base_image.width = "130";
            base_image.height = "130";
            let scale = Math.min(150 / base_image.width, 150 / base_image.height);
            ctx.drawImage(base_image, 155 + 170 * (i % 3), 105 + 170 * Math.floor(i / 3), base_image.width * scale, base_image.height * scale);

        }
    }
}

//X button on modal
const closeModal = () => {
    let canvasModal = document.querySelector("#canvasModal");
    canvasModal.style.display = "none";
}

//https://stackoverflow.com/questions/8126623/downloading-canvas-element-to-an-image
const saveImage = () => {
    let download = document.querySelector("#download");
    let body = {
        imageLinks: []
    };
    if (alignBoxes[i].getElementsByTagName('img').length > 0) {
        imageLinks.push(alignBoxes[i].getElementsByTagName('img')[0].src);
    }
    else{
        imageLinks.push('');
    }
    
    axios.post('/makeChart', body)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
}

const init = () => {
    // An Event *Listeners*
    alignBoxes = document.querySelectorAll('.box');
    for (let i = 0; i < alignBoxes.length; i += 1) {
        alignBoxes[i].addEventListener('click', alignClicked);
    }

    characterSet = document.querySelector('#characterSet');
    characterSet.addEventListener('change', resetChars);

    let clearButton = document.querySelector("#clear");
    clearButton.addEventListener('click', clearClicked);

    let createButton = document.querySelector("#create");
    createButton.addEventListener('click', drawChart);

};

const CharacterList = function(props) {
    if(props.characters.length === 0){
        return (
            <div className="characterList">
                <h3 className="emptyCharacter">None yet</h3>
            </div>
        );
    }
    let boxwidth = "100%";
    let charwidth = "100%";

    if(props.characters.length < 9){
        boxwidth = props.characters.length*6 + "%";
        charwidth = 100/props.characters.length + "%"; 
    }
    else{ 
        boxwidth = "54%";
        charwidth = "11.11%";
    }    
      
    const characterNodes = props.characters.map(function(character){
        return (
            <div style={{width:charwidth}} key={character._id} className="cbox">
                <img onClick={charClicked} src={character.imageLink} alt={character.charname}></img>
            </div>
        );
    });
    return (
        <div className="characterList" style={{width: boxwidth}} className="redbox">
            {characterNodes}
        </div>
    );
};

const CharacterDropDown = function(props) {
    if(props.characters.length === 0){
        return (
            <select className="mediaList">
                <option>ALL</option>
            </select>
        );
    }

    const medArray = [];
    for (let i = 0; i < props.characters.length; i += 1) {
        if (!medArray.includes(props.characters[i].media)) {
            medArray.push(props.characters[i].media);
        }
    }
      
    const characterNodes = medArray.map(function(character){
        return (
            <option key={character._id}>{character}</option>
        );
    });
    return (
        <select className="mediaList">
            <option>ALL</option>
            {characterNodes}
        </select>
    );
};

const loadCharactersFromServer = () => {
    sendAjax('GET', '/getCharacters', null, (data) => {
        ReactDOM.render(
            <CharacterList characters={data.characters} />, document.querySelector("#characters-picker")
        );
        ReactDOM.render(
            <CharacterDropDown characters={data.characters} />, document.querySelector("#characterSet")
        );
    });
};

const setup = function() {

    ReactDOM.render(
        <CharacterList characters={[]} />, document.querySelector("#characters-picker")
    );

    ReactDOM.render(
        <CharacterDropDown characters={[]} />, document.querySelector("#characterSet")
    );
    
    loadCharactersFromServer();
};

$(document).ready(function () {
    setup();
    init();
});