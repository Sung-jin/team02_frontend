import React, { Component } from "react";
import classNames from "classnames/bind";
import styles from "./Header.scss";
import { connect } from "react-redux";
import { Button, Combo } from "../../components";

//layout
import SearchPopup from "../SearchPopup/SearchPopup";
import LoginPopup from "../LoginPopup/LoginPopup";
import SearchResult from "../SearchResult/SearchResult";

import { loginRequest, logout } from "../../action/userAction";
import { searchRequest } from "../../action/searchAction";
import { withRouter } from "react-router-dom";
const cx = classNames.bind(styles);

const mapStateToProps = state => {
  return {
    bLoginResult: state.userReducer.bLoginResult,
    set_auth: state.userReducer.set_auth,
    searchReducer: state.searchReducer
  };
};

const mapDispatchToProps = { loginRequest, logout, searchRequest };
const loginPopupID = "login";

const customStyles = {
  control: base => ({
    ...base,
    height: 47,
    minHeight: 47,
    margin: 0,
    border: 0,
    backgroundColor: "#0f1835",
    color: "#ffffff",
    paddingTop: 5
  }),
  menu: base => ({
    ...base,
    margin: 0,
    color: "#ffffff",
    backgroundColor: "#0f1835",
    position: "absolute",
    height: "auto",
    "font-size": 20
  }),
  indicatorSeparator: base => ({
    ...base,
    backgroundColor: "transparent"
  }),
  dropdownIndicator: base => ({
    ...base,
    color: "#ffffff",
    "&:hover": {
      color: "#ffffff"
    }
  }),
  singleValue: base => ({
    ...base,
    color: "#fff"
  }),
  valueContainer: base => ({
    ...base,
    color: "#ffffff",
    "font-size": 20
  }),
  input: base => ({
    ...base,
    color: "#ffffff",
    "font-size": 20
  })
};

const SEARCH_FITER_TIME = 0;
const SEARCH_FITER_SCRAP = 1;
const filter = [
  { value: SEARCH_FITER_TIME, label: "최신순" },
  { value: SEARCH_FITER_SCRAP, label: "스크랩순" }
];

class Header extends Component {
  state = {
    bShowSearch: false,
    bShowLogin: false,
    bShowUser: false,
    selectedOption: filter[0],
    bsearchRequest: false
  };

  componentDidMount() {
    const auth = JSON.parse(localStorage.getItem("myData")); //localstorage에서 가져옴\
    //자동 로그인 기능
    if (auth) {
      this.props.loginRequest(auth.userid, auth.password);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      bShowLogin,
      bShowSearch,
      selectedOption,
      bsearchRequest
    } = this.state;
    const { searchReducer } = this.props;
    if (this.props.bLoginResult && bShowLogin) {
      this.setState({ bShowLogin: false });
    }

    if (!bShowSearch && searchReducer.searchresult.cocktails.length) {
      searchReducer.searchresult.cocktails = [];
    }

    //filter 변경에 의한 searchAPI 호출
    if (prevState.selectedOption.value !== selectedOption.value) {
      const word = searchReducer.searchword;
      const filter = selectedOption.value;
      const type = searchReducer.type;
      this.props.searchRequest({ word, filter, type });
    }

    // 결과창 떠있는 상태에서 검색 종류 or 단어 변경하여 검색 시 필터콤보 초기값으로 변경
    if (
      prevProps.searchReducer.searchword !== searchReducer.searchword ||
      prevProps.searchReducer.type !== searchReducer.type
    ) {
      this.setState({ selectedOption: filter[0] });
      return;
    }

    if (
      bsearchRequest &&
      prevProps.searchReducer.searchresult.cocktails !==
        searchReducer.searchresult.cocktails
    ) {
      this.setState({ bsearchRequest: false });
    }
  }

  onChangeSearchStatus = event => {
    this.setState({ bShowSearch: !this.state.bShowSearch });
  };

  handleChangeFilter = selectedOption => {
    this.setState({ selectedOption });
  };

  handleNotifyScroll = props => {
    const nextPage = props.next;
    const { searchReducer } = this.props;

    if (
      searchReducer.searchresult.page !== nextPage &&
      nextPage > searchReducer.searchresult.page &&
      !this.state.bsearchRequest
    ) {
      const { selectedOption } = this.state;

      const word = searchReducer.searchword;
      const filter = selectedOption.value;
      const type = searchReducer.type;

      this.setState({ bsearchRequest: true });
      this.props.searchRequest({ word, filter, type, index: nextPage });
    }
  };

  showUserPopup = () => {
    return (
      <div id="userPopup" className={cx("user_popup")}>
        <div className={cx("container")}>
          <div className={cx("text")} onClick={this.onMyMenuClick}>
            마이메뉴
          </div>
        </div>
        <div className={cx("container")}>
          <div className={cx("text")}>개인정보 설정</div>
        </div>
        <div className={cx("container")}>
          <div className={cx("text")} onClick={this.onLogoutClick}>
            로그아웃
          </div>
        </div>
      </div>
    );
  };

  onMyMenuClick = event => {
    this.props.history.push("/mymenu");
    this.setState({ bShowUser: false });
  };

  onLogoutClick = event => {
    if (this.props.bLoginResult && this.state.bShowUser) {
      this.setState({ bShowUser: false });
      this.props.logout();
    }
  };

  onShowLogin = event => {
    const _bShowLogin = this.state.bShowLogin;
    if (_bShowLogin) {
      if (event.target.id === loginPopupID) {
        this.setState({ bShowLogin: false });
      }
    } else {
      if (this.props.bLoginResult) {
        this.setState({ bShowUser: !this.state.bShowUser });
      } else {
        this.setState({ bShowLogin: !_bShowLogin });
      }
    }
  };

  onLogoClick = event => {
    const { history } = this.props;
    history.push("/");
  };

  onCreateRecipesClick = event => {
    const { history } = this.props;
    history.push("/enrolment");
  };

  render() {
    const { bShowSearch, bShowLogin, bShowUser, selectedOption } = this.state;
    const { searchresult } = this.props.searchReducer;

    return (
      <div
        className={cx(
          "container",
          bShowSearch ? "_over" : "",
          searchresult.cocktails.length ? "_result" : ""
        )}
      >
        <div className={cx("toprect")}>
          <div className={cx("icon")} onClick={this.onLogoClick} />
          <div className={cx("right_container")}>
            <Button
              className={cx("search")}
              onClick={this.onChangeSearchStatus}
            />
            <Button
              className={cx("login", this.props.bLoginResult ? "_out" : "")}
              value={this.props.bLoginResult ? "" : "로그인"}
              onClick={this.onShowLogin}
            />
            {this.props.bLoginResult && (
              <Button
                className={cx("create_recipes")}
                onClick={this.onCreateRecipesClick}
              />
            )}
            {bShowUser && this.showUserPopup()}
          </div>
        </div>
        {bShowSearch && <SearchPopup className={cx("searchrect")} />}
        {bShowSearch && searchresult.cocktails.length > 0 ? (
          <div className={cx("searchresult_rect")}>
            <div className={cx("filter_rect")}>
              <Combo
                id="filter"
                className={cx("filter")}
                options={filter}
                handleChange={this.handleChangeFilter}
                isSearchable={false}
                value={selectedOption}
                defaultValue={selectedOption}
                key="filter"
                styles={customStyles}
              />
            </div>
            <SearchResult
              className={cx("searchresultrect")}
              word={this.props.searchReducer.searchword}
              type={this.props.searchReducer.type}
              filter={this.props.searchReducer.filter}
              page={searchresult.page}
              pages={searchresult.pages}
              searchList={searchresult.cocktails}
              handleNotifyScroll={this.handleNotifyScroll}
            />
          </div>
        ) : null}

        {bShowLogin ? <LoginPopup onClick={this.onShowLogin} /> : null}
      </div>
    );
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Header)
);
