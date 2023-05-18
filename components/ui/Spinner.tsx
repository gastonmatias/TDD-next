// https://cssloaders.github.io

import styles from './spinner.module.css'

export const Spinner = () => {
  
    return (
        <div
            role="progressbar"   // necesario para ser reconocido en testing
            aria-label='loading' // necesario para ser reconocido en testing
            className={styles.loaderContainer}
        >
            <span className="loader"></span>
            <span className={styles.loader}></span>
        </div>    
    )
}
