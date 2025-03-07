using {
    Albums,
    Artists,
    Tracks,
    Genre
} from '../db/schema';



@(path: '/music-lib')
service MusicLibrary {

    @readonly
    // TODO: Before CREATE, UPDATE events can also be used in absence of '@readonly'
    entity Geners as projection on Genre;

    entity Album  as projection on Albums;
    entity Artist as projection on Artists;
    entity Track  as projection on Tracks;

    /** A Top singer is the one Singing the most Tracks! */
    function getTopSinger() returns Artist;
}
