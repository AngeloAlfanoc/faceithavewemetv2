import de_cache from '../assets/maps/de_cache.jpg'
import de_cbble from '../assets/maps/de_cbble.jpg'
import de_dust2 from '../assets/maps/de_dust2.jpg'
import de_inferno from '../assets/maps/de_inferno.jpg'
import de_mirage from '../assets/maps/de_mirage.jpg'
import de_nuke from '../assets/maps/de_nuke.jpg'
import de_overpass from '../assets/maps/de_overpass.jpg'
import de_train from '../assets/maps/de_train.jpg'
import de_vertigo from '../assets/maps/de_vertigo.jpg'

export const mapDecider = (string) => {
    switch (string) {
        case "de_mirage":
            return de_mirage
        case "de_nuke":
            return de_nuke
        case "de_vertigo":
            return de_vertigo
        case "de_cbble":
            return de_cbble
        case "de_train":
            return de_train
        case "de_dust2":
            return de_dust2
        case "de_overpass":
            return de_overpass
        case "de_train":
            return de_train
        case "de_cache":
            return de_cache
        case "de_inferno":
            return de_inferno
        default:
            return ''
    }
}