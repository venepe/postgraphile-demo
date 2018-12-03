exports.shorthands = undefined;

exports.up = (pgm) => {

  pgm.createFunction(
    {schema: 'carco', name: 'search_vehicles'},
    [{name: 'search', type: 'text'}],
    {returns: 'setof carco.vehicle', language: 'sql', behavior: 'stable'},
    " select vehicle.* from carco.vehicle as vehicle where vehicle.model ilike ('%' || search || '%') or vehicle.manufacturer ilike ('%' || search || '%') group by vehicle.id "
  );

};

exports.down = (pgm) => {

};
