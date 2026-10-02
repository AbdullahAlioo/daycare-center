/**
 * VideoMoments — short real clips from the centre so parents can get
 * a feel for everyday life. Clips autoplay muted and loop; visitors can
 * use the controls to unmute or go fullscreen.
 */

import birthdayVideo from '../../../assets/videos/birthday-celebration-video.mp4';
import independenceVideo from '../../../assets/videos/independence-day-video.mp4';
import './VideoMoments.css';

const VIDEOS = [
  { src: birthdayVideo, title: 'Birthday celebrations', caption: 'Cake, songs, and friends cheering together.' },
  { src: independenceVideo, title: 'Independence Day', caption: 'Little ones celebrating 14 August in green and white.' },
];

const VideoMoments = () => (
  <section className="video-moments">
    <div className="container video-moments__grid">
      <div className="video-moments__intro">
        <p className="video-moments__kicker">See us in action</p>
        <h2>A glimpse of our <em>everyday joy.</em></h2>
        <p>Real moments filmed at Angels &amp; Fairies, from birthday parties to national celebrations. Tap a clip to turn the sound on.</p>
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
