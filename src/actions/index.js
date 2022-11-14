import { auth, provider } from "../firebase";
import { SET_USER, SET_LOADING_STATUS } from "./actionType";
import db from "../firebase";
import { storage } from "../firebase";

export const setUser = (payload) => ({
    type: SET_USER,
    user: payload,
});

export const setLoading = (status) => ({
    type: SET_LOADING_STATUS,
    loading: status,
});

export function signInApi() {
    return (dispatch) => {
        auth.signInWithPopup(provider)
            .then((payload) => {
                dispatch(setUser(payload.user));
            })
            .catch((error) => alert(error.message));
    };
}

export function getUserAuth() {
    return (dispatch) => {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                dispatch(setUser(user));
            }
        });
    };
}

export function signOutApi() {
    return (dispatch) => {
        auth.signOut().then(() => {
            dispatch(setUser(null));
        })
        .catch((error) => alert(error.message));
    };
}

export function postArticleAPI(payload) {
    return (dispatch) => {
        dispatch(setLoading(true));
        if (payload.image != "") {
            const upload = storage
                .ref(`images/${payload.image.name}`)
                .put(payload.image);
            upload.on(
                "state_changed",
                (snapshot) => {
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log(`Progress: ${progress}%`);
                    if (snapshot.state === storage.TaskState.RUNNING) {
                        console.log(`Progress: ${progress}%`);
                    }
                },
                (error) => {
                    console.log(error);
                },
                async () => {
                    storage
                        .ref("images")
                        .child(payload.image.name)
                        .getDownloadURL()
                        .then((url) => {
                            payload.image = url;
                            db.collection("articles").add(payload).then((doc) => {
                                const post = payload;
                                post.id = doc.id;
                                dispatch(postArticle(post));
                            });
                            dispatch(setLoading(false));
                        });
                }
            );
        } else {
            db.collection("articles").add(payload).then((doc) => {
                const post = payload;
                post.id = doc.id;
                dispatch(postArticle(post));
            });
        }
    };
}

export const postArticle = (payload) => ({
    type: "POST_ARTICLE",
    payload,
});

