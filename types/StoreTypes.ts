export type Marker ={
    created_at: string;
    date: string;
    id: number| null;
    memo:string;
    ticker: string;
    user_id: string;
  }

  export type Comments ={
    created_at: string;
    date: string;
    id: number | null;
    memo:string;
    ticker: string;
    user_id: string;
  }

  export type EditedMarker = Omit<Marker, 'created_at' | 'user_id'>
  export type EditedComments = Omit<Comments, 'created_at' | 'user_id'>