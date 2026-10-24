export interface ProfileViewTopbarType {
  id : number | string
}

interface ProfileViewPhotoType {
  picture_data: string;
  picture_id: number;
  profile_pic: string;
  user_id: number;
}

export interface ProfileViewPhotosType {
  photos: ProfileViewPhotoType[];
  firstname : string
}

export interface ProfileViewInfoType {
  firstname: string;
  username: string;
  age: number;
  isOnline: boolean;
  distanceKm: number | null;
  connectionId : number | string | null
};

export interface ProfileViewAboutType {
  about: string;
}

export interface ProfileViewInterestsType {
  interests: string[];
}

export interface ProfileViewBasicsType {
  gender: string;
  interestedIn: string;
}

export interface ProfileViewFameRatingType {
  fameRating: number;
}
