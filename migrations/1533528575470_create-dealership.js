exports.shorthands = undefined;

exports.up = (pgm) => {

  pgm.createSchema('carco');

  pgm.createTable({schema: 'carco', name: 'dealership'}, {
  id: 'id',
  name: { type: 'varchar' },
  created_at: {
    type: 'timestamp',
    notNull: true,
    default: pgm.func('current_timestamp')
  }
 });
};

exports.down = (pgm) => {

};
