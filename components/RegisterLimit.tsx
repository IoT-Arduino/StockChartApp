import { registerAllowance } from '../const/settings'
import { TranslationLocales } from '../types/TranslationLocales'

type Props = {
  rank: string
  t: TranslationLocales 
}

const RegisterLimit = ({ rank, t }:Props) => {
  if (rank === 'free') {
    return (
      <div className='mt-8'>
        <h4>
          {t.memberShipRegisterAvail}({rank}
          {t.memberShipRegisterUser})
        </h4>
        <ul>
          <li>
            BookMark : {registerAllowance.BookMarkLimitFree}
            {t.memberShipRegisterUntil}
          </li>
          <li>
            Marker : {registerAllowance.MarkerLimitFree}
            {t.memberShipRegisterUntil}
          </li>
          <li>
            Comment : {registerAllowance.CommentLimitFree}
            {t.memberShipRegisterUntil}
          </li>
        </ul>
      </div>
    )
  } else if (rank === 'pro') {
    return (
      <div>
        <h4>
          {t.memberShipRegisterAvail}({rank}
          {t.memberShipRegisterUser})
        </h4>
        <ul>
          <li>
            BookMark : {registerAllowance.BookMarkLimitPro}
            {t.memberShipRegisterUntil}
          </li>
          <li>
            Marker : {registerAllowance.MarkerLimitPro}
            {t.memberShipRegisterUntil}
          </li>
          <li>
            Comment : {registerAllowance.CommentLimitPro}
            {t.memberShipRegisterUntil}
          </li>
        </ul>
      </div>
    )
  } else if (rank === 'business') {
    return (
      <div>
        <h4>
          {t.memberShipRegisterAvail}({rank}
          {t.memberShipRegisterUser})
        </h4>
        <ul>
          <li>
            BookMark : {registerAllowance.BookMarkLimitBusiness}
            {t.memberShipRegisterUntil}
          </li>
          <li>
            Marker : {registerAllowance.MarkerLimitBusiness}
            {t.memberShipRegisterUntil}
          </li>
          <li>
            Comment : {registerAllowance.CommentLimitBusiness}
            {t.memberShipRegisterUntil}
          </li>
        </ul>
      </div>
    )
  } else if (rank === 'admin') {
    return (
      <div>
        <h4>
          {t.memberShipRegisterAvail}({rank}
          {t.memberShipRegisterUser})
        </h4>
        <ul>
          <li>BookMark :{t.memberShipRegisterUnlimit}</li>
          <li>Comment : {t.memberShipRegisterUnlimit}</li>
          <li>Marker :{t.memberShipRegisterUnlimit}</li>
        </ul>
      </div>
    )
  } else {
    return null
  }
}

export default RegisterLimit
