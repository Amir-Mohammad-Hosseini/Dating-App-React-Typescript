import type { ChangeEvent } from "react";
import type { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import type { MyProfileSchemaType } from "../../lib/zod/MyProfile/myProfileSchema";

export interface ProfilePageHeaderType {
  isSubmitting: boolean;
}


export type PhotoItemType =
| { kind: "existing"; id: number; url: string }
| { kind: "new"; tempId: string; file: File; url: string };

export type PhotoSlotType = PhotoItemType | null;

export interface ProfilePhotosType {
  photosNumber: number;
  photos: PhotoSlotType[];
  onDeletePhoto: (photoIndex: number) => void;
  onAddPhoto: (event: ChangeEvent<HTMLInputElement>) => void;
}

export interface ProfileBasicInfosType {
  basicInfos: {
    firstname: string;
    lastname: string;
    gender: string;
    sexual_pref: string;
    location: string;
    user_location : string
  };
  address : { 
    city : string ,
    country : string
  }
  register: UseFormRegister<MyProfileSchemaType>;
  control: Control<MyProfileSchemaType>;
  errors: FieldErrors<MyProfileSchemaType>;
}

export interface ProfileBiographyType {
  biography : string
  register: UseFormRegister<MyProfileSchemaType>;
  errors: FieldErrors<MyProfileSchemaType>;
  bioLength : number
  onCountBioText : (event: ChangeEvent<HTMLTextAreaElement>) => void
}

export default interface InterestChipType {
  label: string;
  onDeleteInterest: (interest: string) => void;
}

export interface ProfileInterestsType {
  interests : string[]
  onDeleteInterest : (interest : string) => void
  onAddInterest : (interest : string) => void
}

export interface ToggleSwitchPrivacyProfileType {
  label: string;
  description?: string;
  defaultChecked?: boolean;
  disabled?: boolean;
}
