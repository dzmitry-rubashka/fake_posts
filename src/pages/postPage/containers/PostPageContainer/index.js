import { useLocation, useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getPosts } from "../../../../shared/store/reducers/PostPageReducer/thunks";
import { getComments } from "../../../../shared/store/reducers/MainPageReducer/thunks";
import PostPageLayout from "../../components/PostPageLayout";

const PostPageContainer = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    posts,
    isLoadingPosts,
    postsError,
    comments,
    isLoadingComments,
    commentsError,
    error,
  } = useSelector((state) => state.postPageList);

  useEffect(() => {
    dispatch(getPosts());
    dispatch(getComments());
    if (error?.message === "Request failed with status code 403") {
      history.push("./login");
    }
    if (postsError || commentsError) {
      history.push("../../error");
    }
  }, [dispatch, postsError, commentsError]);

  const location = useLocation();
  const elements = location.pathname.split("/");
  const id = elements[elements.length - 1];
  const postsOfSelectedUser = posts?.reduce((result, post) => {
    if (post.id.toString() === id) {
      result.push(post);
    }
    return result;
  }, []);
  const commentsOfSelectedUser = comments?.reduce((result, comment) => {
    if (comment.post_id.toString() === id) {
      result.push(comment);
    }
    return result;
  }, []);

  return (
    <PostPageLayout
      id={id}
      postsOfSelectedUser={postsOfSelectedUser}
      commentsOfSelectedUser={commentsOfSelectedUser}
      isLoadingPosts={isLoadingPosts}
      isLoadingComments={isLoadingComments}
      postsError={postsError}
      commentsError={commentsError}
    />
  );
};
export default PostPageContainer;
