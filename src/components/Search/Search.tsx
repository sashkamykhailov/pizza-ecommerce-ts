import React, { FC, useCallback, useRef, useState } from "react";
import debounce from "lodash.debounce";
import "./Search.scss";

type SearchProps = {
  setValue: (str: string) => void;
};

const Search: FC<SearchProps> = ({ setValue }) => {
  const [localValue, setLocalValue] = useState<string>("");
  const [wider, setWider] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const updateSearchValue = useCallback(
    debounce((str) => {
      setValue(str);
    }, 500),
    []
  );

  const focusInput = () => {
    setWider(!wider);
    console.log(wider);
  };
  const blurInput = () => {
    setWider(false);
    console.log(wider);
  };

  const onChangeInput = (event: any) => {
    setLocalValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  return (
    <input
      ref={inputRef}
      className={wider ? "search__wide" : "search"}
      placeholder="Search for pizza here..."
      value={localValue}
      onChange={onChangeInput}
      onFocus={focusInput}
      onBlur={blurInput}
    />
  );
};

export default Search;
