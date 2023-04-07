
import { registerAllowance } from '../const/settings'
export const checkAllowanceMarker =  (rank:string, markers:[]) => {
    let canMarkerInput
  
    switch (rank) {
      case 'free':
        canMarkerInput = markers
          ? registerAllowance.MarkerLimitFree > markers.length
          : false
  
        break
      case 'pro':
        canMarkerInput = markers
          ? registerAllowance.MarkerLimitPro > markers.length
          : false
  
        break
      case 'business':
        canMarkerInput = markers
          ? registerAllowance.MarkerLimitBusiness > markers.length
          : false
  
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