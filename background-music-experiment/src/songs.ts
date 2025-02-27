import { SongPageProps } from "./Components/SongPage";

/*
Using cloudinary's e_blur to blur pictures cause doing it with 
css is fucking tiring

*/

const blurFactor = 400;

export const Wait: SongPageProps = {
    taniMessage: 'I hope you love this song!',
    songName: 'Wait - Doechii',
    songPictureUrl: 'https://res.cloudinary.com/delocqgic/image/upload/v1740685218/doechi_kxbneq.webp',
    songBackground: `https://res.cloudinary.com/delocqgic/image/upload/e_blur:${blurFactor}/v1740685218/doechi_kxbneq.webp`,
    youTubeSongId: 'oi53alU3TRw',
}

export const TakeMeAway: SongPageProps = {
    taniMessage: 'I hope you love this song!',
    songName: 'Take Me Away - Daniel Caesar',
    songBackground: `https://res.cloudinary.com/delocqgic/image/upload/e_blur:${blurFactor}/v1740553170/take-me-away-daniel_sqjnpn.jpg`,
    songPictureUrl: 'https://res.cloudinary.com/delocqgic/image/upload/v1740553170/take-me-away-daniel_sqjnpn.jpg',
    youTubeSongId: 'HIKOK1FdER4',
}

export const DanceNow: SongPageProps = {
    taniMessage: 'Idk. Listen to JID',
    songName: 'Dance Now - JID',
    songPictureUrl: 'https://res.cloudinary.com/delocqgic/image/upload/v1740555485/forever-story-poster-jid_wzgmln.png',
    songBackground: `https://res.cloudinary.com/delocqgic/image/upload/e_blur:${blurFactor}/v1740555485/forever-story-poster-jid_wzgmln.png`,
    youTubeSongId: 'to-be-added'
}



