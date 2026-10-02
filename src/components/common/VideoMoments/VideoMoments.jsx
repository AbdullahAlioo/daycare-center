/**
 * VideoMoments — short real clips from the centre so parents can get
 * a feel for everyday life. The clip autoplays muted and loops; visitors can
 * use the controls to unmute or go fullscreen.
 */

import birthdayVideo from '../../../assets/videos/birthday-celebration-video.mp4';
import './VideoMoments.css';

const VIDEOS = [
  { src: birthdayVideo, title: 'Birthday celebrations', caption: 'Cake, songs, and friends cheering together.' },
];

const VideoMoments = () => (
  <section className="video-moments">
    <div className="container video-moments__grid">
      <div className="video-moments__intro">
        <p className="video-moments__kicker">See us in action</p>
        <h2>A glimpse of our <em>everyday joy.</em></h2>
        <p>A real moment filmed at Angels &amp; Fairies: friends cheering together at a birthday party. Tap the video to turn the sound on.</p>
      </div>
      <div className="video-moments__videos">
        {VIDEOS.map((video) => (
          <figure className="video-moments__card" key={video.title}>
            <video src={video.src} autoPlay muted loop playsInline controls preload="metadata" aria-label={video.title} />
            <figcaption><strong>{video.title}</strong><span>{video.caption}</span></figcaption>
          </figure>
        ))}
      </div>
    </div>
  </section>
);

export default VideoMoments;
