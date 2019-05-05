import {MenuItem} from "@blueprintjs/core";
import { Suggest, ItemPredicate, ItemRenderer } from "@blueprintjs/select";
import * as React from "react";
import {connect} from "react-redux";
import User from "../../../modals/User";
import { AppState } from "../../../store";
import { UserState } from "../../../store/user/types";
import { getUsers } from "../../../services/user";
import { selectUser } from "../../../store/user/actions";

function highlightText(text: string, query: string) {
  let lastIndex = 0;
  const words = query
    .split(/\s+/)
    .filter(word => word.length > 0)
    .map(text => text.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1"));
  if (words.length === 0) {
    return [text];
  }
  const regexp = new RegExp(words.join("|"), "gi");
  const tokens: React.ReactNode[] = [];
  while (true) {
    const match = regexp.exec(text);
    if (!match) {
      break;
    }
    const length = match[0].length;
    const before = text.slice(lastIndex, regexp.lastIndex - length);
    if (before.length > 0) {
      tokens.push(before);
    }
    lastIndex = regexp.lastIndex;
    tokens.push(<strong key={lastIndex}>{match[0]}</strong>);
  }
  const rest = text.slice(lastIndex);
  if (rest.length > 0) {
    tokens.push(rest);
  }
  return tokens;
}

const areUsersEqual = (userA: User, userB: User) => {
  return userA.email === userB.email;
};

const filterUser: ItemPredicate<User> = (query, user, _index, exactMatch) => {
  const normalizedName = user.name.toLowerCase();
  const normalizedQuery = query.toLowerCase();

  if (exactMatch) {
    return normalizedName === normalizedQuery;
  } else {
    return `${user.id}. ${normalizedName} ${user.email}`.indexOf(normalizedQuery) >= 0;
  }
};

const renderUser: ItemRenderer<User> = (user, { handleClick, modifiers, query }) => {
  if (!modifiers.matchesPredicate) {
    return null;
  }
  const text = `${user.id}. ${user.name}`;
  return (
    <MenuItem
      active={modifiers.active}
      disabled={modifiers.disabled}
      label={user.email}
      key={user.id}
      onClick={handleClick}
      text={highlightText(text, query)}
    />
  );
};

const UserSelect = Suggest.ofType<User>();

export interface SearchUserState {
  users: User[]
}

interface SearchUserProps {
  selectedUser: UserState,
  selectUser: typeof selectUser
}

class SearchUser extends React.Component<SearchUserProps, SearchUserState> {
  public state: SearchUserState= {
    users: []
  };

  public async componentDidMount(): Promise<void> {
    const users = await getUsers();
    this.setState({ users });
  }

  public render() {
    console.log(this.props.selectedUser.user);
    return (
      <UserSelect
        className="search-user"
        inputValueRenderer={(user: User) => user.name}
        itemPredicate={filterUser}
        itemRenderer={renderUser}
        items={this.state.users}
        itemsEqual={areUsersEqual}
        noResults={<MenuItem disabled={true} text="User does not exist." />}
        onItemSelect={this.handleValueChange}
        popoverProps={{ minimal: false }}
      />
    )
  }

  private handleValueChange = (user: User) => {
    this.props.selectUser({ user });
  };
}

const mapStateToProps = (state: AppState) => ({
  selectedUser: state.selectedUser
});

export default connect(mapStateToProps, { selectUser })(SearchUser);
