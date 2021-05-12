//post a new characters to the server
const handleChar = (e) => {
    e.preventDefault();
    
    if($("#characterName").val() == '' || $("#characterMedia").val() == '' || $("#characterImg").val() == '') {
        handleError("]All fields are required!");
        return false;
    }
    
    sendAjax('POST', $("#characterForm").attr("action"), $("#characterForm").serialize(), function() {
        loadCharactersFromServer();
    });
    
    return false;
};

//React form to fill out with character information
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

//displays the list of characters currently tied to the user's account
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
                Name: {character.charname}
                <img src={character.imageLink} alt={character.charname}></img>
            </div>
        );
    });
    return (
        <div className="characterList">
            {characterNodes}
        </div>
    );
};

//modify some handlebars with some react GET calls
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