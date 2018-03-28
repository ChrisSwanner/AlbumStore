import { Injectable } from '@angular/core';
import { Album } from './album.model';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';


@Injectable()
export class AlbumService {


  albums: FirebaseListObservable<any[]>;

  getAlbums() {
    return this.albums;
  }

  addAlbum(newAlbum: Album) {
  this.albums.push(newAlbum);
  }

  constructor(private database: AngularFireDatabase) {
    this.albums = database.list('albums');
   }

  getAlbumById(albumId: string) {
  return this.database.object('albums/' + albumId);
  }

  updateAlbum(localUpdatedAlbum) {
    let albumEntryInFirebase = this.getAlbumById(localUpdatedAlbum.$key);
    albumEntryInFirebase.update({title: localUpdatedAlbum.title,
                                artist: localUpdatedAlbum.artist,
                                description: localUpdatedAlbum.description});
  }

  deleteAlbum(localAlbumToDelete) {
    let albumEntryInFirebase = this.getAlbumById(localAlbumToDelete.$key);
    albumEntryInFirebase.remove();
  }
}