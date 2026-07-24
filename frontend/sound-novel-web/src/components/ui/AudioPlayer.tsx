import styles from './AudioPlayer.module.css'



interface AudioPlayerProps {

  src?: string

}



export function AudioPlayer({ src }: AudioPlayerProps) {

  if (src) {

    return (

      <audio className={styles.player} controls playsInline preload="metadata" src={src}>

        <track kind="captions" />

      </audio>

    )

  }



  return (

    <div className={styles.mock} aria-hidden="true">

      <div className={styles.playBtn} />

      <div className={styles.track}>

        <div className={styles.thumb} />

      </div>

    </div>

  )

}


