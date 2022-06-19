import { registerAllowance } from '../const/settings'

const RegisterLimit = ({ rank }) => {

  if(rank === 'free') {
    return (
        <div className="mt-8">
          <h4>登録可能数について({rank}ユーザー)</h4>
          <ul>
            <li>BookMark : {registerAllowance.BookMarkLimitFree}件まで</li>
            <li>Marker : {registerAllowance.MarkerLimitFree}件まで</li>
            <li>Comment : {registerAllowance.CommentLimitFree}件まで</li>
          </ul>
        </div>
      )

    }else if(rank === 'pro'){
        return (
            <div>
              <h4>登録可能数について({rank}ユーザー)</h4>
              <ul>
                <li>BookMark : {registerAllowance.BookMarkLimitPro}件まで</li>
                <li>Marker : {registerAllowance.MarkerLimitPro}件まで</li>
                <li>Comment : {registerAllowance.CommentLimitPro}件まで</li>
              </ul>
            </div>
          )
    
    }else if(rank === 'business'){
        return (
            <div>
              <h4>登録可能数について({rank}ユーザー)</h4>
              <ul>
                <li>BookMark : {registerAllowance.BookMarkLimitBusiness}件まで</li>
                <li>Marker : {registerAllowance.MarkerLimitBusiness}件まで</li>
                <li>Comment : {registerAllowance.CommentLimitBusiness}件まで</li>
              </ul>
            </div>
          )
    

    }else if(rank === 'admin'){

        return (
            <div>
              <h4>登録可能数について({rank}ユーザー)</h4>
              <ul>
                <li>BookMark :登録制限なし</li>
                <li>Comment : 登録制限なし</li>
                <li>Marker :登録制限なし</li>
              </ul>
            </div>
          )



  } else {
    return null
  }


}

export default RegisterLimit
