/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable indent */
import { createSelector } from "reselect";
import { FilterTypes } from "./types";
import { StateType } from "./reducers";
import { getFullName } from "tools";

const getFilter = (state: StateType) => state.filter;
const getUsers = (state: StateType) => state.users;

export const getFiltetedUsers = createSelector(
  [getFilter, getUsers],
  (filter, users) => {
    if (!users || !filter) { return; }
    switch (filter.type) {
      case FilterTypes.SHOW_ALL: {
        return users;
      }
      case FilterTypes.SHOW_BY_FULLNAME: {
        return users.filter(u => {
          return getFullName(u).includes(filter.key);
        },
        );
      }
    }
  },
);