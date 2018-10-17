const statements = {
  INSERT_SEARCH_TEXT: 'INSERT INTO logger.search(text) VALUES($1)',
};

export const logSearchText = ({pool, text}) => {
  pool.query(statements.INSERT_SEARCH_TEXT, [text]);
}
