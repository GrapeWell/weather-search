import { Input } from "antd";
const { Search } = Input;
import type { SearchProps } from "antd/es/input/Search";
import pinyin from "pinyin";
import "./index.less";

const Header = (props) => {
  const { searchFnc } = props;
  const onSearch: SearchProps["onSearch"] = (value, _e, info) => {
    searchFnc(pinyin(value, { style: "normal" }).join(""));
  };
  return (
    <div className="header">
      <Search
        placeholder="请输入城市名称"
        allowClear
        onSearch={onSearch}
        style={{ width: 304 }}
      />
    </div>
  );
};

export default Header;
