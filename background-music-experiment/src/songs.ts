import { SongPageProps } from "./Components/SongPage";

/*
Using cloudinary's e_blur to blur pictures cause doing it with 
css is fucking tiring

*/

const blurFactor = 400;
const message: string [] = [
    "I'm done with exams",
    "So I'm working on this because I think it'll be cool",
    "Need your feedback on the UI. I'm not done yet",
    "The idea is to create playlist stories..."
]

export const Wait: SongPageProps = {
    message: message,
    songName: 'Wait - Doechii',
    songPictureUrl: 'https://res.cloudinary.com/delocqgic/image/upload/v1740685218/doechi_kxbneq.webp',
    songBackground: `https://res.cloudinary.com/delocqgic/image/upload/e_blur:${blurFactor}/v1740685218/doechi_kxbneq.webp`,
    youTubeSongId: 'oi53alU3TRw',
}

export const TakeMeAway: SongPageProps = {
    message: message,
    songName: 'Take Me Away - Daniel Caesar',
    songBackground: `https://res.cloudinary.com/delocqgic/image/upload/e_blur:${blurFactor}/v1740553170/take-me-away-daniel_sqjnpn.jpg`,
    songPictureUrl: 'https://res.cloudinary.com/delocqgic/image/upload/v1740553170/take-me-away-daniel_sqjnpn.jpg',
    youTubeSongId: 'HIKOK1FdER4',
}

export const DanceNow: SongPageProps = {
    message: message,
    songName: 'Dance Now - JID',
    songPictureUrl: 'https://res.cloudinary.com/delocqgic/image/upload/v1740555485/forever-story-poster-jid_wzgmln.png',
    songBackground: `https://res.cloudinary.com/delocqgic/image/upload/e_blur:${blurFactor}/v1740555485/forever-story-poster-jid_wzgmln.png`,
    youTubeSongId: 'to-be-added'
}



