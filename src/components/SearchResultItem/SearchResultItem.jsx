import React from "react";
import classNames from "classnames/bind";
import styles from "./SearchResultItem.scss";
import xbox from "../../static/images/a1.jpeg";

const cx = classNames.bind(styles);

/**
 * @author AnGwangHo
 * @description 한개의 칵테일 검색결과를 보여준다
 * @param props object형태의 칵테일 정보 {_id, owner, image, name, scrap}
 */
const SearchResultItem = ({ className, props, modify, modifyClick }) => {
  const { _id, owner, image, name, scrap } = props;
  return (
    <div id={_id} className={cx(className, { image_container: !className })}>
      <img
        className={cx("item_img")}
        onError={e => {
          e.target.onerror = null;
          e.target.src = xbox;
        }}
        src={image}
        alt="사진"
      />
      {modify && (
        <div className={cx("modify_rect")}>
          <div
            id={_id}
            className={cx("modify_container")}
            onClick={modifyClick}
          >
            ...
          </div>
        </div>
      )}
      <div className={cx("information_rect")}>
        <div className={cx("inner")}>
          <div className={cx("cocktailName")}>{name}</div>
          <div className={cx("bottom")}>
            <div className={cx("userName")}>{owner}</div>
            <div className={cx("right")}>
              <div className={cx("like")} />
              <div className={cx("number")}>{scrap}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultItem;
