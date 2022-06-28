import { Album } from './Album';
import { Category } from './Category';
import { Artist } from './Artist';
import { Key } from './Key';

export interface Track {
    id: number;
    title: string;
    location: string;
    slug: string;
    filesize: number;
    mp3_size: number;
    aiff_size: number;
    duration: number;
    album: Album;
    category: Category;
    key: Key;
    artist: Artist;
    created_at: string;
}
