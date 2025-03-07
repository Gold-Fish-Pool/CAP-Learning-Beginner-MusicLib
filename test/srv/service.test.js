// Testing the APIs
// More on coverage https://cap.cloud.sap/docs/node.js/cds-test


const cds = require('@sap/cds');
const expect = require('@sap/cds/lib/test/expect');

describe('testing service.js', () => {

    const { GET, POST, PATCH, DELETE } = cds.test(__dirname + '/../../')
    const uri = '/music-lib';
    const title = 'Dummy-101';
    const desc = 'Dummy desc 1';

    /**
     * Test the API endpoints, like a consumer!
     */
    it('API Testing in Consumer viewpoint', async () => {

        await expect(GET`${uri}/Album`).to.be.fulfilled;

        let { data } = await (POST`${uri}/Album ${{ title: title, description: desc }}`);
        expect(data.ID).to.not.equal(null);
        expect(data.title).to.equal(title);
        expect(data.description).to.equal(desc);

        let updated = await (PATCH`${uri}/Album/${data.ID} ${{ title: title + title }}`);
        expect(updated.data.title).to.equal(title + title);

        await expect(DELETE`${uri}/Album/${data.ID}`).to.be.fulfilled;
    })

    /**
     * Testing APIs from back-end perspective!
     */
    it('API Testing in back-end viewpoint', async () => {
        const MusicLibrary = await cds.connect.to('MusicLibrary')
        const { Album } = MusicLibrary.entities
        expect (await SELECT.from(Album)) // INFO: Directly running a Query over SELECT global Object
        .to.eql(await MusicLibrary.read(Album)) // 
        .to.eql(await MusicLibrary.run(SELECT.from(Album)))
      })
})