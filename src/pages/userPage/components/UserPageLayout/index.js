import Loader from "../../../../shared/commonComponents/Loader";
import FPButton from "../../../../shared/commonComponents/Button";

import styles from "./styles.module.scss";

const UserPageLayout = ({
  postsOfSelectedUser,
  handleGoToPost,
  isLoadingUserInfo,
  isLoadingPosts,
  postsError,
  user,
  flatObj,
}) => {
  return (
    <>
      {(isLoadingUserInfo || isLoadingPosts) && <Loader />}
      {!isLoadingUserInfo && !isLoadingPosts && !postsError && (
        <>
          <h1>{user?.name}'s Info</h1>
          <div className={styles.UserPageLayout__userContainer}>
            <div className={styles.UserPageLayout__userInfo}>
              {flatObj(user)}
            </div>
          </div>
          <h2>Posts</h2>
          <div className={styles.UserPageLayout__postsContainer}>
            {postsOfSelectedUser?.map((post) => {
              const { title, body, id } = post;
              return (
                <div className={styles.UserPageLayout__post} key={id}>
                  <div className={styles.UserPageLayout__article}>
                    <div>
                      <span className={styles.UserPageLayout__title}>
                        Title :
                      </span>{" "}
                      {title}
                    </div>
                    <div>Post : {body}</div>
                  </div>
                  <FPButton type="submit" onClick={() => handleGoToPost(id)}>
                    Go To Comments
                  </FPButton>
                </div>
              );
            })}
          </div>
        </>
      )}
    </>
  );
};
export default UserPageLayout;
