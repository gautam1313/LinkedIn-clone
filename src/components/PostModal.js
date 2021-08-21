import React, { useState, Fragment } from "react";
import styled from "styled-components";
import ReactPlayer from "react-player";
import { connect } from "react-redux";
import firebase from "firebase";
import { postArticleAPI } from "../action";

const PostModal = (props) => {
  const [editorText, setEditorText] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

  const [vidORimg, setvidORimg] = useState("");

  const switchVidOrImgHandler = (option) => {
    setImageUrl("");
    setVideoUrl("");
    setvidORimg(option);
  };

  const postArticle = (event) => {
    event.preventDefault();
    if (event.target !== event.currentTarget) {
      return;
    }
    const payload = {
      image: imageUrl,
      user: props.user,
      timestamp: new firebase.firestore.Timestamp.now(),
      videoURL: videoUrl,
      description: editorText,
    };
    props.postArticle(payload);
    reset(event);
  };

  const imageUrlHandler = (event) => {
    event.preventDefault();
    if (event.target.files[0] === "" || event.target.files[0] === undefined) {
      return;
    }
    setImageUrl(event.target.files[0]);
  };

  const reset = (event) => {
    event.preventDefault();
    setEditorText("");
    setImageUrl("");
    setVideoUrl("");
    setvidORimg("");
    props.modalHandler(event);
  };
  return (
    <Fragment>
      {props.showModal && (
        <Container>
          <Content>
            <Header>
              <h2>Create Post</h2>
              <button onClick={reset}>
                <img src="/images/close-icon.svg" alt="" />
              </button>
            </Header>
            <SharedContent>
              <UserInfo>
                {props.user.photoURL ? (
                  <img src={props.user.photoURL} alt="" />
                ) : (
                  <img src="/images/user.svg" alt="" />
                )}
                <span>
                  {props.user.displayName ? props.user.displayName : "Name"}
                </span>
              </UserInfo>
              <Editor>
                <textarea
                  value={editorText}
                  placeholder="What do you want to talk about?"
                  onChange={(event) => setEditorText(event.target.value)}
                  autoFocus={true}
                />
                {vidORimg === "image" ? (
                  <Uploads>
                    <input
                      type="file"
                      id="file"
                      accept="image/jpeg, image/jpg, image/png, image/gif"
                      name="image"
                      onChange={imageUrlHandler}
                      style={{ display: "none" }}
                    />
                    <p>
                      <label
                        htmlFor="file"
                        style={{
                          textDecoration: "underline",
                          cursor: "pointer",
                        }}
                      >
                        Select Image
                      </label>
                    </p>
                    {imageUrl && <img src={URL.createObjectURL(imageUrl)} />}
                  </Uploads>
                ) : (
                  vidORimg === "media" && (
                    <Fragment>
                      <input
                        type="text"
                        placeholder="Select Video URL"
                        value={videoUrl}
                        onChange={(event) => setVideoUrl(event.target.value)}
                      />
                      {videoUrl && (
                        <ReactPlayer width={"100%"} url={videoUrl} />
                      )}
                    </Fragment>
                  )
                )}
              </Editor>
            </SharedContent>
            <ShareCreation>
              <AttachAssets>
                <AssetButton onClick={() => switchVidOrImgHandler("image")}>
                  <img src="/images/shareImage-icon.svg" alt="" />
                </AssetButton>
                <AssetButton onClick={() => switchVidOrImgHandler("media")}>
                  <img src="/images/shareVideo-icon.svg" alt="" />
                </AssetButton>
              </AttachAssets>
              <ShareComment>
                <AssetButton>
                  <img src="/images/privacyComment-icon.svg" alt="" />
                  Anyone
                </AssetButton>
              </ShareComment>
              <PostButton
                disabled={!editorText ? true : false}
                onClick={(event) => postArticle(event)}
              >
                Post
              </PostButton>
            </ShareCreation>
          </Content>
        </Container>
      )}
    </Fragment>
  );
};

const Container = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.8);
  color: black;
  animation: fadeIn 0.3s ease-in;
`;

const Content = styled.div`
  background-color: white;
  width: 100%;
  max-width: 552px;
  max-height: 90%;
  overflow: initial;
  border-radius: 5px;
  position: relative;
  display: flex;
  flex-direction: column;
  top: 32px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px 20px;
  align-items: center;
  color: rgba(0, 0, 0, 0.6);
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  line-height: 1.5;
  font-size: 16px;
  font-weight: 400;
  button {
    height: 40px;
    width: 40px;
    min-width: auto;
    svg,
    img {
      pointer-events: none;
    }
  }
`;

const SharedContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: auto;
  vertical-align: baseline;
  padding: 8px 12px;
  background: transparent;
`;
const UserInfo = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 24px;
  svg,
  img {
    width: 48px;
    height: 48px;
    background-clip: content-box;
    border: 2px solid transparent;
    border-radius: 50%;
  }
  span {
    font-weight: 600;
    font-size: 16px;
    margin-left: 5px;
    line-height: 1.5;
  }
`;

const ShareCreation = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 24px 12px 16px;
`;

const AssetButton = styled.button`
  display: flex;
  align-items: center;
  min-width: auto;
  height: 40px;
  color: rgba(0, 0, 0, 0.5);
`;
const AttachAssets = styled.div`
  display: flex;
  align-items: center;
  padding-right: 8px;
  ${AssetButton} {
    width: 40px;
  }
`;

const ShareComment = styled.div`
  padding-left: 8px;
  margin-right: auto;
  border-left: 1px solid rgba(0, 0, 0, 0.15);
  ${AssetButton} {
    svg,
    img {
      margin-right: 5px;
    }
  }
`;

const PostButton = styled.button`
  min-width: 60px;
  padding-left: 16px;
  padding-right: 16px;
  border-radius: 20px;
  color: ${(props) => (props.disabled ? "rgba(0, 0, 0, 0.5)" : "white")};
  background: ${(props) =>
    props.disabled ? "rgba(0, 0, 0, 0.09)" : "#0a66c2"};
  &:hover {
    background: ${(props) =>
      props.disabled ? "rgba(0, 0, 0, 0.02)" : "#004182"};
  }
`;

const Editor = styled.div`
  padding: 12px 24px;
  textarea {
    width: 100%;
    min-height: 100px;
    resize: none;
  }
  input {
    width: 100%;
    height: 35px;
    margin-bottom: 20px;
  }
`;

const Uploads = styled.div`
  text-align: center;
  img {
    width: 100%;
  }
`;

const mapStateToProps = (state) => {
  return {
    user: state.useState.user,
  };
};

const mapDispatchToProps = (dispatch) => ({
  postArticle: (payload) => dispatch(postArticleAPI(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostModal);
