import db, { auth, provider, storage } from "../firebase";
import { SET_USER, SET_LOADER } from "./actionType";

const setUser = (payload) => ({
  type: SET_USER,
  user: payload,
});

const setLoader = (payload) => ({
  type: SET_LOADER,
  loading: payload,
});

export const signInAPI = () => {
  return (dispatch) => {
    auth
      .signInWithPopup(provider)
      .then((payload) => {
        console.log(payload.user);
        dispatch(setUser(payload.user));
      })
      .catch((error) => alert(error.message));
  };
};

export const getUserAuth = () => {
  return (dispatch) => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        dispatch(setUser(user));
      }
      console.log(user);
    });
  };
};

export const signOutAPI = () => {
  return (dispatch) => {
    auth
      .signOut()
      .then(() => dispatch(setUser(null)))
      .catch((error) => console.log(error.message));
  };
};

export const postArticleAPI = (payload) => {
  return (dispatch) => {
    if (payload.image !== "") {
      dispatch(setLoader(true));
      const upload = storage
        .ref(`images/${payload.image.name}`)
        .put(payload.image);
      upload.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(progress, " % done");
          if (snapshot.state === "RUNNING") {
            console.log(progress, " % done1");
          }
        },
        (error) => console.log(error.code),
        async () => {
          const downloadURL = await upload.snapshot.ref.getDownloadURL();
          db.collection("post").add({
            userDetail: {
              userEmail: payload.user.email,
              userName: payload.user.displayName,
              uploadDate: payload.timestamp,
              userImage: payload.user.photoURL,
            },
            videoURL: payload.videoURL,
            postedImage: downloadURL,
            comments: 0,
            description: payload.description,
          });
          dispatch(setLoader(false));
        }
      );
    } else if (payload.videoURL !== "") {
      dispatch(setLoader(true));
      db.collection("post").add({
        userDetail: {
          userEmail: payload.user.email,
          userName: payload.user.displayName,
          uploadDate: payload.timestamp,
          userImage: payload.user.photoURL,
        },
        videoURL: payload.videoURL,
        postedImage: "",
        comments: 0,
        description: payload.description,
      });
      dispatch(setLoader(false));
    }
  };
};
