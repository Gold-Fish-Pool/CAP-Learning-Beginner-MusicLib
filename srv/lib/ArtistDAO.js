'use strict';

const {DAO} = require("./DAO");

class ArtistDAO extends DAO {

    static #entity;

    /**
     * @param {*} cdsEntitiesRef 
     * @throws Error
     */
    constructor(cdsEntitiesRef ) {
        super(cdsEntitiesRef);

        if (!cdsEntitiesRef.Artist) {
            throw new Error('MISSING_ENTITY_ARTIST');
        }
        ArtistDAO.#entity = cdsEntitiesRef.Artist;
    }

    /**
     * Returns an Array of Artist and their tracks
     * @returns
     */
    async getArtistTracks() {
        // INFO: This is an example of CQL statment that expands the associated entities
        // Nesting order = Artist -> artistTracks -> tracks
        return SELECT.from(
            super.cdsEntitiesRef.Artist,
            (artist) => {
                artist.title,
                artist.artistTracks( at => {
                    at.tracks( (att) => {
                        att.ID,
                        att.title,
                        att.description
                    })
                })
            }
        )
    }


    /**
     * To get the Artist with most Tracks
     */
    async getTopSinger() {

        const artistTracks = await this.getArtistTracks() || [];

        if(!artistTracks.length) {
            return null;
        }

        // INFO: This function can throw Error, must handle it!
        return this.#sortArtistTracks(artistTracks)[0];
    }

    /**
     * Helper function that sorts and returns Array of Artist singing the most Tracks is placed first
     * @param {*} Array<Artist>
     * @returns Array<Artist> | []
     * @throws Error
     */
    #sortArtistTracks(artists = []) {
        const artistsLocal = [...artists];
        let temp;

        // TODO: See how language translation work, by commenting the IF condition
        // throw error and set browser language as German
        if(!artistsLocal?.length) {
            throw new Error("NO_ARTISTS_FOUND");
        }

        // INFO: Bubble sort based on number of Artist.artistTracks
        for(let i = 0; i < artistsLocal.length; i++) {
            for(let j = i+1; j < artistsLocal.length; j++) {
                if(
                    artistsLocal[i].artistTracks?.length
                    <
                    artistsLocal[j].artistTracks?.length
                ) {
                    temp = {...artistsLocal[i]};
                    artistsLocal[i] = {...artistsLocal[j]};
                    artistsLocal[j] = {...temp};
                }
            }
        }
        return [...artistsLocal]
    }
}

module.exports = {
    ArtistDAO
}
