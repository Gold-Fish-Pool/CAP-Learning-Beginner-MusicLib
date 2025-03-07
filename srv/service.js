'use strict';

const cds = require("@sap/cds");
const { ArtistDAO } = require("./lib/ArtistDAO");

/** CDS Managed Logger */
const logger = cds.log('cds',{
    level: 'DEBUG',
    label: 'music-srv'
});

module.exports = cds.service.impl(async (service) => {
    const {
        Geners,
        Album,
        Artist,
        Track
     } =
    service.entities;

    // TODO: CDS Annotation '@readonly' can simplify the below code
    // service.before("CREATE", Geners, async (req) => {
    //     logger.warn("POST Not allowed on Geners");
    //     req.reject(405, 'Method_Not_Allowed');
    //     return;
    // })

    service.before("READ", [Geners, Album, Artist, Track], async (req, res) => {
        logger.info("Before Read!", req.subject.ref );
    });

    service.on("getTopSinger", async(req, res) => {
        logger.debug("Triggered getTopSinger()");

        const artists = new ArtistDAO(service.entities);
        logger.debug("ArtistDAO instance created!");

        logger.debug("Getting Top Singer!");
        return artists.getTopSinger().catch(err => {
            logger.info("Err = ", err.message || "UNABLE_TO_GET_SINGERS");
            logger.info("Stack= ", err.stack);
            req.reject(400, err.message || "UNABLE_TO_GET_SINGERS")
        })
    });


    // TODO: This is a Generic error handler, that can be commonly used to log necessary info
    // Uncomment the below code, and make any of the service throw error

    // service.on('error', async(err, req) => {
    //     logger.info("Caught an Error!");
    //     logger.debug('Data = ', req.data);
    //     logger.error('Message = ', err.message);
    //     logger.error('Stack = ', err.stack);
    // })

})
