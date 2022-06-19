
import { useState } from 'react';
import { NextPage } from 'next';
import { supabase } from './../../utils/supabase';
import style from './auth.module.css'

const SendEmailToResetPassword: NextPage = () => {
    const [email, setEmail] = useState<string>('');
    const [isSend, setIsSend] = useState<boolean>(false);
    const [error, setError] = useState<any>(null);
       
    const handleSubmitEmail = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
          const { error } = await supabase.auth.api.resetPasswordForEmail(email, {
            // 送信メールに埋め込まれるリンクのリダイレクト先のURL
        // reset-passwordへ遷移する
            redirectTo: `${process.env.NEXT_PUBLIC_API_ENDOPOINT}/auth/reset-password`,
          });
          if (error) {
            setError(error);
        throw error;
          }
          setIsSend(true);
        } catch (error) {
          console.log(error);
        }
      };
    
    const handleSetEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(event.target.value);
    };
    
    if (error) {
      return <p>エラー</p>;
    }
    
    if (isSend) {
      return <p>送信しました</p>;
    }
    
    return (
      <div>
       <p>登録されているメールアドレスを入力してください</p>
       <form onSubmit={handleSubmitEmail} className={style.inputField}>
          <input value={email} type="email" onChange={handleSetEmail} placeholder="メールアドレス" required />
          <button type="submit">送信</button>
        </form>
      </div>
    );
  }

export default SendEmailToResetPassword
