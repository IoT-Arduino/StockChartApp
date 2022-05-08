import { supabase } from '../utils/supabase'

export const getMarkerData = async (id) => {
  // <!-- supabaseに接続 -->
  const fetchComments = await supabase
      .from('comments')
      .select('*')


  console.log(fetchComments)
  
    // var result = await new Promise(async function(resolve, reject){
    //     var a ="aaaa";
    //   resolve(a);
    //   console.log(a)
    // });

}