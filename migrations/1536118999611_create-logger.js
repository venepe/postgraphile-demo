exports.shorthands = undefined;

exports.up = (pgm) => {

  pgm.createSchema('logger');

  pgm.createTable({schema: 'logger', name: 'search'}, {
   id: 'id',
   text: { type: 'varchar' },
   created_at: {
     type: 'timestamp',
     notNull: true,
     default: pgm.func('current_timestamp')
   }
  });

  pgm.createIndex({schema: 'logger', name: 'search'}, 'text');

};

exports.down = (pgm) => {

};
