import "reflect-metadata";
import {createTestingConnections, closeTestingConnections} from "../../utils/test-utils";
import {QueryFailedError, Connection} from "../../../src";
import {expect} from "chai";

describe("github issues > #5981 Getting redundant migrations generated using postgres", () => {

    let connections: Connection[];
    before(async () => connections = await createTestingConnections({
        entities: [],
        enabledDrivers: ["postgres"],
        schemaCreate: false,
        dropSchema: true,
    }));
    after(() => closeTestingConnections(connections));

    it("should synchronize", () => Promise.all(connections.map(connection => {
        return expect(connection.synchronize()).to.not.be.rejectedWith(QueryFailedError);
    })));

});
