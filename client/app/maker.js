const handleChar = (e) => {
    e.preventDefault();
    $("#characterMessage").animate({width:'hide'},350);
    
    if($("#characterName").val() == '' || $("#characterMedia").val() == '' || $("#characterImg").val() == '') {
        handleError("RAWR! All fields are required!");
        return false;
    }
    
    sendAjax('POST', $("#characterForm").attr("action"), $("#characterForm").serialize(), function() {
        loadCharactersFromServer();
    });
    
    return false;
};

const CharacterForm = (props) => {
    return(
    <form id="characterForm" name="characterForm"
          onSubmit={handleChar}
          action="/maker"
          method="POST"
          className="characterForm"
    >
    <label htmlFor="charname">Name: </label>
    <input id="characterName" type="text" name="charname" placeholder="Character Name"/>
    <label htmlFor="media"> Media: </label>
    <input id="characterMedia" type="text" name="media" placeholder="Character Media"/>
    <label htmlFor="imageLink"> Image URL: </label>
    <input id="characterImg" type="text" name="imageLink" placeholder=""/>
    <input className="makeCharSubmit" type="submit" value="Submit" />
    </form>
    );
};

const CharacterList = function(props) {
    if(props.characters.length === 0){
        return (
            <div className="characterList">
                <h3 className="emptyCharacter">None yet</h3>
            </div>
        );
    }
    
    const characterNodes = props.characters.map(function(character){
        return (
            <div key={character._id} className="character">
                <h3 className="characterName">Name: {character.charname}</h3>
                <h3 className="characterMedia">Media: {character.media}</h3>
                <h3 className="characterImg">Image: {character.imageLink}</h3>
            </div>
        );
    });
    return (
        <div className="characterList">
            {characterNodes}
        </div>
    );
};

const loadCharactersFromServer = () => {
    sendAjax('GET', '/getCharacters', null, (data) => {
        ReactDOM.render(
            <CharacterList characters={data.characters} />, document.querySelector("#characters")
        );
    });
};

const setup = function() {
    ReactDOM.render(
        <CharacterForm csrf={""} />, document.querySelector("#makeCharacter")
    )
    
    ReactDOM.render(
        <CharacterList characters={[]} />, document.querySelector("#characters")
    );
    
    loadCharactersFromServer();
};

$(document).ready(function() {
    setup();
});