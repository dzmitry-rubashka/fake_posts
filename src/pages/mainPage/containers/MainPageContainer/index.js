import { useCallback, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { getPosts } from "../../../../shared/store/reducers/PostPageReducer/thunks";
import MainPageLayout from "../../components/MainPageLayout";

const MainPageContainer = () => {
  const dispatch = useDispatch();
  const mainPageList = useSelector((state) => state.mainPageList);
  const { isLoading, error, posts } = mainPageList;

  useEffect(() => {
    dispatch(getPosts());
    if (error?.message === "Request failed with status code 403") {
      history.push("./login");
    }
    if (error) {
      history.push("./error");
    }
  }, [dispatch, error]);

  const [postsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  const currentPosts = posts?.slice(indexOfFirstPost, indexOfLastPost);

  const history = useHistory();

  const paginate = useCallback((pageNumber) => {
    setCurrentPage(pageNumber);
  }, []);

  const handleGoToPost = useCallback((post) => {
    history.push(`/posts/${post}`);
  }, []);

  return (
    <MainPageLayout
      posts={currentPosts}
      isLoading={isLoading}
      error={error}
      handleGoToPost={handleGoToPost}
      paginate={paginate}
      allPosts={posts}
    />
  );
};
export default MainPageContainer;
