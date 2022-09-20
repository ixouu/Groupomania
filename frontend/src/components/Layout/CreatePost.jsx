import React from 'react';

const CreatePost = () => {
    return (
        <div className='newPost'>
            <h3>Creer une nouvelle publiation :</h3>
            <form>
                <textarea  id="newPost-text" cols="30" rows="10" placeholder='Que voulez-vous partager ?'></textarea>
            </form>
            <div className='newPost-btns'>
                <button className='btn newPost-addImg'>Ajouter une image</button>
                <button className='btn newPost-send'>Publier</button>
            </div>
        </div>
    );
}

export default CreatePost;
