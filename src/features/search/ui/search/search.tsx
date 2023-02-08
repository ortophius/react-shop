import clsx from 'clsx';
import { useEvent, useStore } from 'effector-react';
import { useState, useEffect, useRef } from 'react';
import { getSearchModel } from '../../model';
import styles from './search.module.scss';
import { Suggestions } from './suggestions/suggestions';

type SearchComponentProps = {
  model: ReturnType<typeof getSearchModel>;
};

export const SearchComponent = ({ model }: SearchComponentProps) => {
  const [query, setQuery] = useState('');
  const { searchInvoked, queryChanged, toggleSuggestions } = useEvent({
    searchInvoked: model.searchInvoked,
    queryChanged: model.queryChanged,
    toggleSuggestions: model.toggleSuggestions,
  });
  const showSuggestions = useStore(model.$showSuggestions);
  const inputRef = useRef<HTMLInputElement>(null);

  const inputChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (e) =>
    setQuery(e.target.value);

  const searchButtonClickHandler = () => {
    if (query.length) searchInvoked();
  };

  useEffect(() => {
    if (!query.length) {
      toggleSuggestions(false);
      return;
    }

    const handleQueryUpdate = () => {
      if (document.activeElement === inputRef.current) queryChanged(query);
    };

    toggleSuggestions(false);
    const timeout = setTimeout(handleQueryUpdate, 800);
    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <div className={styles.search}>
      <input
        type="text"
        className={styles.input}
        value={query}
        onChange={inputChangeHandler}
        ref={inputRef}
      />
      <button className={styles.button} onClick={searchButtonClickHandler}>
        <i className="icon-search" />
      </button>
      {showSuggestions && <Suggestions model={model} />}
    </div>
  );
};

export const Search = () => <SearchComponent model={getSearchModel()} />;
