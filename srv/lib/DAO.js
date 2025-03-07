'use strict';

class DAO {
    #cdsEntitiesRef;

    constructor(cdsEntities) {
        this.#cdsEntitiesRef = cdsEntities;
    }

    get cdsEntitiesRef() {
        return this.#cdsEntitiesRef;
    }
}

module.exports = {
    DAO
}
