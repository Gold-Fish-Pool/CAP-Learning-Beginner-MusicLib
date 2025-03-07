// Music Library Entities
using {
    managed,
    cuid
} from '@sap/cds/common';

entity Genre : managed, cuid {
        title       : localized String(30) @mandatory;
        description : localized String(200);
        isActive: Boolean default true;

        // Associated Entities
        tracks: Association to many Tracks on tracks.genre = $self;
}

entity Tracks : managed, cuid {
    title       : localized String(50) @mandatory @assert.unique;
    description : localized String(200);
    isActive    : Boolean default true;
    albumUUID   : UUID @mandatory;
    genreUUID: UUID @mandatory;

    // Associated entities
    album: Association to one Albums on album.ID = albumUUID;
    genre: Association to one Genre on genre.ID = genreUUID;
    artistTracks      : Association to many ArtistTracks on artistTracks.tracks = $self;
}

entity Artists : managed, cuid {
    title    : localized String(50) @mandatory @assert.unique;
    isActive : Boolean default true;
    
    // Associated entities
    artistTracks      : Association to many ArtistTracks on artistTracks.artists = $self;
}

entity ArtistTracks {
    artists: Association to Artists;
    tracks: Association to Tracks;
}

entity Albums : managed, cuid {
    title       : localized String(50) @mandatory @assert.unique;
    description : localized String(200) @assert.notNull;
    isActive    : Boolean default true;

    // Association
    tracks      : Association to many Tracks on tracks.album = $self;
}
