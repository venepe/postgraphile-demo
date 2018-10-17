exports.shorthands = undefined;

exports.up = (pgm) => {

  pgm.addColumns({schema: 'babelpack', name: 'babel'}, {
   description: { type: 'varchar(1500)' },
  });

  pgm.createFunction(
    {schema: 'babelpack', name: 'packless_babels'},
    [],
    {returns: 'setof babelpack.babel', language: 'sql', behavior: 'stable'},
    " select babel.* from babelpack.babel as babel left outer join babelpack.pack as pack ON babel.id = pack.babel_id where pack.id IS NULL group by babel.id order by babel.created_at desc "
  );

};

exports.down = (pgm) => {

};
