import { useState } from "react";
import styled from "styled-components";
import ReactPlayer from "react-player";
import { connect } from "react-redux";
import firebase from "firebase/compat/app";
import { postArticleAPI } from "../actions";

const PostModal = (props) => {
    const [editorText, setEditorText] = useState("");
    const [shareImage, setShareImage] = useState("");
    const [videoLink, setVideoLink] = useState("");
    const [assetArea, setAssetArea] = useState("");

    const reset = (e) => {
        setEditorText("");
        setShareImage("");
        setVideoLink("");
        setAssetArea("");
        props.handleClick(e);
    };

    const switchAssetArea = (area) => {
        setShareImage("");
        setVideoLink("");
        setAssetArea(area);
    };

    const postArticle = (e) => {
        e.preventDefault();
        if (e.target !== e.currentTarget) {
            return;
        }

        const payload = {
            image: shareImage,
            video: videoLink,
            user: props.user,
            description: editorText,
            timestamp: firebase.firestore.Timestamp.now(),
        };

        props.postArticle(payload);
        reset(e);
    };


    const handleChange = (e) => {
        const image = e.target.files[0];

        if (image === "" || image === undefined) {
            alert(`not an image, the image file is a ${typeof image}`);
            return;
        }
        setShareImage(image);
    };


    return (
        <>
        {props.showModal === "open" && (
        <Container>
            <Content>
                <Header>
                    <h2>Create a post</h2>
                    <button onClick={(e) => reset(e)}>
                        <img src="/images/close-icon.svg" alt="" />
                    </button>
                </Header>
                <SharedContent>
                    <UserInfo>
                        {props.user && props.user.photoURL ? (
                            <img src={props.user.photoURL} alt="" />
                        ) : (
                        <img src="/images/user.svg" alt="" />
                        )}
                        <span>{props.user.displayName}</span>
                    </UserInfo>
                    <Editor>
                        <textarea placeholder="write your thought" autoFocus={true}
                            value = {editorText}
                            onChange = {(e) => setEditorText(e.target.value)}
                            />
                        {assetArea === "image" ? (
                        <UploadImage>
                            <input type="file" accept="image/gif, image/jpeg, image/png, video/mp4, video/3gp, video/mov" name="image" id="file" style={{display: "none"}} onChange={handleChange}/>
                            <p>
                                <label htmlFor="file" >Please write your thought before choosing image</label>
                            </p>
                            {shareImage && <img src={URL.createObjectURL(shareImage)} alt="" />}
                        </UploadImage>
                        ) : (
                            <>
                            <input type="text"
                            placeholder="Please input a video link"
                            value={videoLink}
                            onChange = {(e) => setVideoLink(e.target.value)} 
                            />
                            {videoLink && (
                                <ReactPlayer width={"100%"} url={videoLink} />
                            )}
                            </>
                            )}
                    </Editor>
                </SharedContent>
                <ShareCreation>
                    <AttachAssets>
                        <AssetButton onClick={() => switchAssetArea("image")}>
                            <img src="/images/share-image.svg" alt="" />
                        </AssetButton>
                        <AssetButton onClick={() => switchAssetArea("media")}>
                            <img src="/images/share-video.svg" alt="" />
                        </AssetButton>
                    </AttachAssets>
                    <ShareComment>
                        <AssetButton>
                            <img src="/images/share-comment.svg" alt="" />
                            Anyone
                        </AssetButton>
                    </ShareComment>
                    <PostButton disabled = {!editorText ? true : false} onClick={(event) => postArticle(event)}>
                        Post
                    </PostButton>
                </ShareCreation>
            </Content>
        </Container>
        )}
        </>
    )
}

const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
    color: black;
    background-color: rgba(0, 0, 0, 0.8);
    animation: fadeIn 0.3s;
    input{
        padding: 1px 7px;
        border: 1px solid rgba(0, 0, 0, 0.15);
        border-radius: 5px;
    }
    input:focus{
        border: 1px solid rgba(0, 0, 0, 0.55);
    }
`

const Content = styled.div`
    width: 100%;
    max-width: 552px;
    background-color: white;
    max-height: 90%;
    overflow: initial;
    border-radius: 5px;
    position: relative;
    display: flex;
    flex-direction: column;
    top: 32px;
    margin: 0 auto;
    @media screen and (max-width: 768px) {
        max-width: 90%;
    }
`

const Header = styled.div`
    display: block;
    padding: 16px 20px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.15);
    font-size: 16px;
    line-height: 1.5;
    color: rgba(0, 0, 0, 0.6);
    font-weight: 400;
    display: flex;
    justify-content: space-between;
    align-items: center;
    button {
        height: 40px;
        width: 40px;
        min-width: auto;
        color: rgba(0, 0, 0, 0.15);
        border-radius: 5px;
        svg, img {
            pointer-events: none;
        }
    }
    @media screen and (max-width: 768px) {
        font-size: 14px;
        button {
        height: 30px;
        width: 30px;
        border-radius: 5px;
    }
    }
`

const SharedContent = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    overflow-y: auto;
    vertical-align: baseline;
    background: transparent;
    padding: 8px 12px;
`

const UserInfo = styled.div`
    display: flex;
    align-items: center;
    padding: 12px 24px;
    svg, img {
        width: 48px;
        height: 48px;
        background-clip: content-box;
        border: 2px solid transparent;
        border-radius: 50%;
    }
    span {
        font-weight: 600;
        font-size: 16px;
        line-height: 1.5;
        margin-left: 5px;
    }
    @media screen and (max-width: 768px) {
        padding: 4px 8px;
        svg, img {
        width: 38px;
        height: 38px;
    }
    span {
        font-weight: 500;
        font-size: 14px;
        line-height: 1.2;
    }
    }
`


const Editor = styled.div`
    padding: 12px 16px;
    textarea {
        width: 92%;
        min-height: 100px;
        resize: none;
        font-size: 16px;
        line-height: 1.5;
        border: 1px rgba(0,0,0,0.15) solid;
        border-radius: 7px;
        padding: 8px 12px;
    }

    input {
        width: 100%;
        height: 35px;
        font-size: 16px;
        margin-bottom: 20px;
    }
    @media screen and (max-width: 768px) {
        padding: 8px 4px;
    textarea {
        font-size: 14px;
    }

    input {
        font-size: 14px;
    }
    }
`

const ShareCreation = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 12px 24px 12px 16px;
`

const AttachAssets = styled.div`
    align-items: center;
    display: flex;
    padding-right: 8px;
`

const AssetButton = styled.button`
    display: flex;
    align-items: center;
    height: 40px;
    min-width: auto;
    color: rgba(0, 0, 0, 0.5);
    @media screen and (max-width: 768px) {
        font-size: 14px;
        height: 30px;
        img{
            width: 20px;
        }
    }
`

const ShareComment = styled.div`
    padding-left: 8px;
    margin-right: auto;
    border-left: 1px solid rgba(0, 0, 0, 0.15);
    display: flex;
    align-items: center;
`

const PostButton = styled.button`
    min-width: 60px;
    border-radius: 20px;
    padding-left: 16px;
    padding-right: 16px;
    background: ${(props) => (props.disabled ? "rgba(0, 0, 0, 0.8)" : "#0a66c2;")};
    color: ${(props) => (props.disabled ? "rgba(1, 1, 1, 0.2)" : "white")};
    cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
    &:hover {
        background: ${(props) => (props.disabled ? "rgba(0, 0, 0, 0.08)" : "#004182")};
    }

`

const UploadImage = styled.div`
    text-align: center;
    img {
        width: 100%;
    }
`

const mapStateToProps = (state) => {
    return {
        user: state.userState.user,
    };
};

const mapDispatchToProps = (dispatch) => ({
    postArticle: (payload) => dispatch(postArticleAPI(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostModal);
