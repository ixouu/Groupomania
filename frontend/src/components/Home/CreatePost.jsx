import React, { useState } from "react";

import { accountServices } from "../../utils/services/accountServices";

import { createPost, getPosts } from "../../redux/actions/post.actions";
import { useDispatch } from "react-redux";

import  { Toaster } from 'react-hot-toast';

const CreatePost = () => {
    const dispatch = useDispatch();

    const [content, setContent] = useState("");
    const [postImg, setPostImg] = useState(null);
    const [file, setFile] = useState(null);
    const [isPosting, setIsPosting] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isActive, setIsActive] = useState(false);

    //handle image Animation
    let activeImg = isActive ? 'imgPreviewIsActive' : 'imgPreviewIsNotActive'

    const posterId = accountServices.getUserId();

    const handleImage = (img) => {
        setPostImg(URL.createObjectURL(img));
        setFile(img);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!content || content.length < 3 || !content.length > 500) {
            setIsError(true);
        } else {
            const data = new FormData();
            data.append("posterId", posterId);
            data.append("content", content);
            file && data.append("file", file);
            await dispatch(createPost(data));
            dispatch(getPosts());
            cancel();
        
        }
    };

    const cancel = () => {
        setContent("");
        setFile(null);
        setPostImg(null);
        setIsPosting(false);
        setIsError(false);
    };



    return (
        <>
            <div><Toaster /></div>
            <section className="newPost">
                <h3>Creer une nouvelle publiation :</h3>
                <form>
                    <textarea
                        id="newPost-text"
                        cols="30"
                        rows="10"
                        placeholder="Que voulez-vous partager ?"
                        value={content}
                        onFocus={() => setIsError(false)}
                        onChange={function (e) {
                            setContent(e.target.value);
                            setIsPosting(true);
                        }}
                    ></textarea>
                    <div className="newPost-btns">
                        <label htmlFor="profile-photo_upload">
                            Ajouter une image
                        </label>
                        <input
                            type="file"
                            id="profile-photo_upload"
                            name="file"
                            accept=".jpg, .jpeg, .png"
                            className="newPost-addImg"
                            onChange={function (e) {
                                handleImage(e.target.files[0]);
                                setIsPosting(true);
                                setIsActive(true);
                            }}
                        />
                        {isPosting && (
                            <button
                                className="btn newPost-cancel"
                                onClick={(e) => cancel(e)}
                            >
                                Annuler
                            </button>
                        )}
                        <button
                            className="btn newPost-send"
                            onClick={(e) => handleSubmit(e)}
                        >
                            Publier
                        </button>
                    </div>
                </form>
                <div className="newPost-imgPreview">
                    {postImg && (
                        <img className={activeImg} src={postImg} alt="Previsualisation de l'image" />
                    )}
                </div>
                <div className="newPost-errorContainer">
                    {isError && (
                        <p className="newPost-error">
                            <i className="fa-solid fa-circle-exclamation"></i> Votre
                            poste doit contenir entre 3 caractères minimum et 500
                            maximum !{" "}
                        </p>
                    )}
                </div>
            </section>
        </>
    );
};

export default CreatePost;
