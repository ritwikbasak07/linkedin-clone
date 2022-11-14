import styled from "styled-components";
import PostModal from "./PostModal";
import { useState } from "react";
import { connect } from "react-redux";

const Main = (props) => {
    const [showModal, setShowModal] = useState("close");

    const handleClick = (e) => {
        e.preventDefault();
        if (e.target !== e.currentTarget) {
            return;
        }
        switch (showModal) {
            case "open":
                setShowModal("close");
                break;
            case "close":
                setShowModal("open");
                break;
            default:
                setShowModal("close");
                break;
        }
    };

    return (
        <Container>
            <ShareBox>
                <div>
                {props.user && props.user.photoURL ? (
                    <img src={props.user
                        .photoURL} alt="" />
                    ) : (
                    <img src="/images/user.svg" alt="" />
                    )}
                    <button onClick={handleClick} disabled={props.loading ? true : false}>Start a post</button>
                </div>
                <div>
                    <button>
                        <img src="/images/photo-icon.svg" alt="" />
                        <span>Photo</span>
                    </button>
                    <button>
                        <img src="/images/video-icon.svg" alt="" />
                        <span>Video</span>
                    </button>
                    <button>
                        <img src="/images/event-icon.svg" alt="" />
                        <span>Event</span>
                    </button>
                    <button>
                        <img src="/images/article-icon.svg" alt="" />
                        <span>Article</span>
                    </button>
                </div>
            </ShareBox>
            <Content>
                {
                    props.loading && <img src="./images/loading.svg" alt="" />
                }
                <Article>
                    <SharedActor>
                        <a>
                            <img src="/images/user.svg" alt="" />
                            <div>
                                <span>Title</span>
                                <span>Info</span>
                                <span>Date</span>
                            </div>
                        </a>
                        <button>
                            <img src="/images/ellipsis.svg" alt="" />
                        </button>
                    </SharedActor>
                    <Description>Description</Description>
                    <SharedImg>
                        <a>
                            <img src="https://images.unsplash.com/photo-1537989036885-80b4d200958d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80" alt="" />
                        </a>
                    </SharedImg>
                    <SocialCounts>
                        <li>
                            <button>
                                <img src="/images/like-icon.svg" alt="" />
                                <img src="/images/clap-icon.svg" alt="" />
                                <span>75</span>
                            </button>
                        </li>
                        <li>
                            <a>2 comments</a>
                        </li>
                    </SocialCounts>
                    <SocialActions>
                        <button>
                            <img src="/images/like-icon.svg" alt="" />
                            <span>Like</span>
                        </button>
                        <button>
                            <img src="/images/comment-icon.svg" alt="" />
                            <span>Comments</span>
                        </button>
                        <button>
                            <img src="/images/share-icon.svg" alt="" />
                            <span>Share</span>
                        </button>
                        <button>
                            <img src="/images/send-icon.svg" alt="" />
                            <span>Send</span>
                        </button>
                    </SocialActions>
                </Article>
            </Content>
            <PostModal showModal = {showModal} handleClick = {handleClick} />
        </Container>
    )
}

const Container = styled.div`
    grid-area: main;
`

const CommonCard = styled.div`
    text-align: center;
    overflow: hidden;
    margin-bottom: 8px;
    background-color: #fff;
    border-radius: 5px;
    position: relative;
    border: none;
    box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
`

const ShareBox = styled(CommonCard)`
    display: flex;
    flex-direction: column;
    color: #958b7b;
    margin: 0 0 8px;
    background: white;
    div {
        button {
            cursor: text;
            outline: none;
            color: rgba(0, 0, 0, 0.6);
            font-size: 14px;
            line-height: 1.5;
            min-height: 48px;
            background: transparent;
            border: none;
            display: flex;
            align-items: center;
            font-weight: 600;
        }
        &:first-child {
            display: flex;
            align-items: center;
            padding: 8px 16px 0px 16px;
            img {
                width: 48px;
                border-radius: 50%;
                margin-right: 8px;
            }
            button {
                margin: 4px 0;
                flex-grow: 1;
                border-radius: 35px;
                padding-left: 16px;
                border: 1px solid rgba(0, 0, 0, 0.15);
                background-color: white;
                text-align: left;
            }
        }
        &:nth-child(2) {
            display: flex;
            flex-wrap: no-wrap;
            justify-content: space-around;
            padding: 4px;
            button {
                img {
                    width: 30px;
                    margin: 0 4px 0 -2px;
                }
                span {
                    color: #70b5f9;
                }
                &:hover{
                    transform: scale(1.05);
                }
            }
            @media (max-width: 468px) {
                button {
                img {
                    width: 24px;
                }
            }
            }
        }
    }
`

const Article = styled(CommonCard)`
    padding: 0;
    margin: 0 0 8px;
    overflow: visible;
`

const SharedActor = styled.div`
    padding-right: 40px;
    flex-wrap: nowrap;
    padding: 12px 16px 0;
    margin-bottom: 8px;
    align-items: center;
    display: flex;
    a {
        margin-right: 12px;
        flex-grow: 1;
        overflow: hidden;
        display: flex;
        text-decoration: none;
        img {
            width: 48px;
            height: 48px;
        }
        & > div {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            flex-basis: 0;
            margin-left: 8px;
            overflow: hidden;
            span {
                text-align: left;
                &:first-child {
                    font-size: 14px;
                    font-weight: 700;
                    color: rgba(0, 0, 0, 1);
                }
                &:nth-child(n + 1) {
                    font-size: 12px;
                    color: rgba(0, 0, 0, 0.6);
                }
            }
        }
    }
    button {
        position: absolute;
        right: 12px;
        top: 0;
        background: transparent;
        border: none;
        outline: none;
        img {
            padding-top: 7px;
        }
    }
`

const Description = styled.div`
    padding: 0 16px;
    overflow: hidden;
    color: rgba(0, 0, 0, 0.9);
    font-size: 14px;
    text-align: left;
`

const SharedImg = styled.div`
    margin-top: 8px;
    width: 100%;
    display: block;
    position: relative;
    background-color: #f9fafb;
    img {
        object-fit: contain;
        width: 100%;
        height: 100%;
    }
`

const SocialCounts = styled.ul`
    line-height: 1.3;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    overflow: auto;
    margin: 0 16px;
    padding: 8px 0;
    border-bottom: 1px solid #e9e5df;
    list-style: none;
    li {
        margin-right: 5px;
        font-size: 12px;
        button {
            display: flex;
            background-color: white;
            border : none;
            span{
                padding: 1px 0 1px 2px;

            }
        }
    }
    img{
        width: 16px;
    }
`

const SocialActions = styled.div`
    align-items: center;
    display: flex;
    justify-content: space-between;
    min-height: 60px;
    button {
        display: inline-flex;
        align-items: center;
        color: #0a66c2;
        background-color: white;
        border: none;
        :hover{
            cursor: pointer;
            background-color: #e9e5df;
            border-radius: 5px;
            transform: scale(1.05);
        }
        @media (min-width: 768px) {
            span {
                margin-left: 8px;
            }
        }
    }
    img{
        width: 16px;
    }
    @media (min-width: 768px) {
        button{
           padding: 15px 25px;
        }
    }
    padding-left:1rem;
    padding-right:1rem;
`

const Content = styled.div`
    text-align: center;
    & > img {
        width: 30px;
    }
`
const mapStateToProps = (state) => {
    return {
        loading: state.articleState.loading,
        user: state.userState.user,
    };
};

const mapDispatchToProps = (dispatch) => ({
    // logout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);