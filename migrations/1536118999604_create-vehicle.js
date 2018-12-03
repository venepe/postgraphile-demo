exports.shorthands = undefined;

exports.up = (pgm) => {

  pgm.createTable({schema: 'carco', name: 'vehicle'}, {
   id: 'id',
   dealer_id: {
     type: 'integer',
     notNull: true,
     references: 'carco.dealership ON DELETE CASCADE',
   },
   manufacturer: { type: 'varchar' },
   model: { type: 'varchar' },
   image_uri: { type: 'varchar' },
   description: { type: 'varchar' },
   price: { type: 'varchar' },
   created_at: {
     type: 'timestamp',
     notNull: true,
     default: pgm.func('current_timestamp')
   }
  });
};

exports.down = (pgm) => {

};
