import { useCallback, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getUsers } from "../../../../shared/store/reducers/AllUsersPageReducer/thunks";
import AllUsersPageLayout from "../../components/AllUsersPageLayout";

const AllUsersPageContainer = () => {
  const dispatch = useDispatch();
  const { isLoading, error, users } = useSelector(
    (state) => state.allUsersPageList
  );

  useEffect(() => {
    dispatch(getUsers());
    if (error) {
      history.push("./error");
    }
  }, [dispatch, error]);

  const history = useHistory();

  const handleGoToDetails = useCallback((user) => {
    history.push(`/users/${user}`);
  }, []);

  return (
    <AllUsersPageLayout
      isLoading={isLoading}
      error={error}
      users={users}
      handleGoToDetails={handleGoToDetails}
    />
  );
};
export default AllUsersPageContainer;
