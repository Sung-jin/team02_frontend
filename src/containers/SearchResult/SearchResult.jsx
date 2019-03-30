import React, { Component } from "react";
import classNames from "classnames/bind";
import styles from "./SearchResult.scss";
import { connect } from "react-redux";
import { SearchResultItem } from "../../components";

import cocktail1 from "../../static/images/a1.jpeg";
import cocktail2 from "../../static/images/a2.jpg";

const cx = classNames.bind(styles);

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = {};
const dummy_data = [
  { no: 0, Image: cocktail1, name: "칵테일1", like: 10 },
  { no: 1, Image: cocktail2, name: "칵테일2", like: 20 },
  { no: 2, Image: cocktail1, name: "칵테일3", like: 30 },
  { no: 3, Image: cocktail2, name: "칵테일4", like: 40 },
  { no: 4, Image: cocktail1, name: "칵테일5", like: 50 },
  { no: 5, Image: cocktail2, name: "칵테일6", like: 60 },
  { no: 6, Image: cocktail1, name: "칵테일7", like: 70 },
  { no: 7, Image: cocktail2, name: "칵테일8", like: 80 },
  { no: 8, Image: cocktail1, name: "칵테일9", like: 90 },
  { no: 9, Image: cocktail2, name: "칵테일10", like: 100 }
];

/**
 * @author AnGwangHo
 * @description 검색 결과를 표현하는 컨테이너
 */
class SearchResult extends Component {
  /**
   * @author AnGwangHo
   * @description 칵테일 검색결과 레이아웃
   * @param data 검색결과 data[{no, Image, name},{}...]
   */
  result_form = ({ data }) => {
    return data.map(item => {
      return (
        <ui className={cx("resultitem")}>
          <SearchResultItem
            className={cx("image_container")}
            key={item.no}
            props={item}
            like={item.like}
          />
        </ui>
      );
    });
  };

  render() {
    return (
      <div>
        <ul className={cx("searchresultform")}>
          {this.result_form({ data: dummy_data })}
        </ul>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchResult);