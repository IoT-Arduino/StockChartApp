import { registerAllowance } from '../const/settings'
import { Ranks } from '../types/Ranks'
import { Marker } from './../types/StoreTypes'

type MarkersArray = Marker[] | undefined

export const checkAllowanceMarker = (rank: Ranks, markers: MarkersArray) => {
  let canMarkerInput

  switch (rank) {
    case 'free':
      canMarkerInput = markers ? registerAllowance.MarkerLimitFree > markers.length : false
      break
    case 'pro':
      canMarkerInput = markers ? registerAllowance.MarkerLimitPro > markers.length : false
      break
    case 'business':
      canMarkerInput = markers ? registerAllowance.MarkerLimitBusiness > markers.length : false
      break
    case 'admin':
      canMarkerInput = true
      break
    default:
      break
  }

  return {
    canMarkerInput,
  }
}
