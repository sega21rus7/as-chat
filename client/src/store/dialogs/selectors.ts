/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable indent */
import { createSelector } from "reselect";
import { FilterTypes } from "./interfaces";
import { StateType } from "./reducers";
import { getFullName } from "tools";
import { IDialog } from "tools/interfaces";
import { Nullable } from "tools/types";

const getFilter = (state: StateType) => state.filter;
const getDialogs = (state: StateType) => state.items;

export const getFiltetedDialogs = (state: StateType, currentUserID: string | undefined): Nullable<IDialog[]> | undefined => {
  return createSelector(
    [getFilter, getDialogs],
    (filter, dialogs) => {
      if (!dialogs || !filter || !currentUserID) { return; }
      switch (filter.type) {
        case FilterTypes.SHOW_ALL: {
          return dialogs;
        }
        case FilterTypes.SHOW_BY_FULLNAME: {
          return dialogs.filter(d => {
            const dialogAuthor = currentUserID === d.author._id ? d.companion : d.author;
            return getFullName(dialogAuthor).includes(filter.key);
          },
          );
        }
      }
    },
  )(state);
};