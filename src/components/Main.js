import styled from "styled-components";
import React, { useState } from "react";
import PostModal from "./PostModal";
import { connect } from "react-redux";

const Main = (props) => {
  const [showModal, setShowModal] = useState(false);
  const modalHandler = (event) => {
    event.preventDefault();
    if (event.target !== event.currentTarget) {
      return;
    }
    switch (showModal) {
      case true:
        setShowModal(false);
        break;
      case false:
        setShowModal(true);
        break;
      default:
        setShowModal(false);
    }
  };
  return (
    <Container>
      <ShareBox>
        <div>
          {props.user && props.user.photoURL ? (
            <img src={props.user.photoURL} alt="" />
          ) : (
            <img src="/images/user.svg" alt="" />
          )}
          <button onClick={modalHandler}>Start a post</button>
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
            <span>Write article</span>
          </button>
        </div>
      </ShareBox>
      <div>
        <Article>
          <SharedActor>
            <a>
              <img src="/images/user.svg" />
              <div>
                <span>Title</span>
                <span>Mail</span>
                <span>Date</span>
              </div>
            </a>
            <button>
              <img src="/images/element.svg" alt="" />
            </button>
          </SharedActor>
          <Description>Description!</Description>
          <SharedImg>
            <a>
              <img src="/images/scuderia-ferrari.jpeg" alt="" />
            </a>
          </SharedImg>
          <SocialCounts>
            <li>
              <button>
                <img
                  src="https://static-exp1.licdn.com/sc/h/d310t2g24pvdy4pt1jkedo4yb"
                  alt=""
                />
                <img
                  src="https://static-exp1.licdn.com/sc/h/5thsbmikm6a8uov24ygwd914f"
                  alt=""
                />
                <span>175</span>
              </button>
            </li>
            <li>
              <a>33 comments</a>
            </li>
          </SocialCounts>
          <SocialActions>
            <button>
              <img src="/images/like-icon.svg" alt="" />
              <span>Like</span>
            </button>
            <button>
              <img src="/images/comments-icon.svg" alt="" />
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
      </div>
      <PostModal showModal={showModal} modalHandler={modalHandler} />
    </Container>
  );
};

const Container = styled.div`
  grid-area: main;
`;

const CommonCard = styled.div`
  text-align: center;
  background-color: #fff;
  border-radius: 5px;
  margin-bottom: 8px;
  overflow: hidden;
  position: relative;
  border: none;
`;
const ShareBox = styled(CommonCard)`
  display: flex;
  flex-direction: column;
  color: #958b7b;
  background: white;
  margin: 0 0 8px;
  div {
    button {
      outline: none;
      color: rgba(0, 0, 0, 0.8);
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
      padding: 8px 16px 0 16px;
      img {
        width: 48px;
        border-radius: 50%;
        margin-right: 8px;
      }
      button {
        border: 1px solid rgba(0, 0, 0, 0.15);
        border-radius: 35px;
        margin: 4px 0;
        padding-left: 16px;
        flex-grow: 1;
        background-color: white;
        text-align: left;
      }
    }
    &:nth-child(2) {
      display: flex;
      align-items: center;
      justify-content: space-around;
      padding-bottom: 4px;
      button {
        img {
          margin: 0 4px 0 -2px;
        }
        span {
          color: #70b5f9;
        }
      }
    }
  }
`;

const Article = styled(CommonCard)`
  padding: 0;
  margin: 0 0 8px;
  overflow: visible;
`;

const SharedActor = styled.div`
  flex-wrap: no-wrap;
  padding: 12px 16px 0;
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  a {
    margin-right: 8px;
    overflow: hidden;
    flex-grow: 1;
    display: flex;
    text-decoration: none;

    img {
      width: 48px;
    }
    & > div {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      margin-left: 8px;
      overflow: hidden;
      span {
        text-align: left;
        &:first-child {
          font-weight: 700;
          font-size: 14px;
          color: rgba(0, 0, 0, 1);
        }
        &:not(:first-child) {
          font-size: 12px;
          color: rgba(0, 0, 0, 0.6);
        }
      }
    }
  }

  button {
    background: transparent;
    border: none;
    outline: none;
    position: absolute;
    right: 12px;
    top: 0;
  }
`;

const Description = styled.div`
  padding: 0 16px;
  overflow: hidden;
  color: rgba(0, 0, 0, 0.9);
  text-align: left;
  font-size: 14px;
`;
const SharedImg = styled.div`
  margin-top: 8px;
  background-color: #f9fafb;
  position: relative;
  width: 100%;
  display: block;

  img {
    width: 100%;
    object-fit: contain;
  }
`;

const SocialCounts = styled.ul`
  display: flex;
  list-style: none;
  align-items: flex-start;
  line-height: 1.3;
  overflow: auto;
  margin: 0 16px;
  padding: 8px 0;
  border-bottom: 1px solid #e9e5df;
  li {
    margin-right: 5px;
    font-size: 12px;
    button {
      display: flex;
    }
  }
`;

const SocialActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 0;
  padding: 4px 8px;
  min-height: 40px;
  width: 100%;
  button {
    color: #0a66c2;
    display: inline-flex;
    align-items: center;
    padding: 8px;

    @media (min-width: 768px) {
      span {
        margin-left: 8px;
      }
    }
  }
`;

const mapStateToProps = (state) => {
  return {
    user: state.useState.user,
  };
};

export default connect(mapStateToProps)(Main);
