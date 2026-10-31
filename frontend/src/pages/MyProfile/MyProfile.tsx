import Navbar from "../../components/Navbar/Navbar";
import PrivacyProfileWrapper from "./PrivacyProfileWrapper";
import ProfilePageHeader from "../../components/ProfilePage/ProfilePageHeader";
import {
  AccountActions,
  ProfileBasicInfos,
  ProfileBiography,
  ProfileInterests,
  ProfilePhotos,
} from "../../components/ProfilePage";
import { PageLoader } from "../../components/Loader";
import useMyProfile from "./useMyProfile";

const MyProfile = () => {
  const {
    register,
    handleSubmit,
    control,
    errors,
    onValid,
    isMyLocationError,
    myLocationError,
    myLocationDatas,
    bioLength,
    isMyProfileQueryPending,
    isMyProfileMutatePending,
    handleChangeAddPhoto,
    handleDeletePhoto,
    handleChangeBioCountText,
    handleAddInterest,
    handleDeleteInterest,
    myPhotos,
    myProfileDatas,
    myInterests,
  } = useMyProfile();

  if (isMyProfileQueryPending) {
    return <PageLoader />;
  }

  if (isMyLocationError) {
    throw new Error(myLocationError?.message || "An error occurred");
  }

  const myPhotosNumber = myPhotos.filter((photo) => photo).length;

    const basicInfos = {
      firstname: myProfileDatas.firstname,
      lastname: myProfileDatas.lastname,
      gender: myProfileDatas.gender,
      sexual_pref: myProfileDatas.sexual_pref,
      location: myProfileDatas?.location,
      user_location: myProfileDatas?.user_location,
    };
  
    const address = myLocationDatas?.address;

  return (
    <div className="relative md:flex md:overflow-x-hidden">
      <Navbar />
      <form onSubmit={handleSubmit(onValid)} className="w-full pb-24 md:pb-10">
        <ProfilePageHeader isSubmitting={isMyProfileMutatePending} />

        <ProfilePhotos
          photosNumber={myPhotosNumber}
          photos={myPhotos}
          onDeletePhoto={handleDeletePhoto}
          onAddPhoto={handleChangeAddPhoto}
        />

        {/* Basic info */}
        <ProfileBasicInfos
          basicInfos={basicInfos}
          address={address}
          register={register}
          control={control}
          errors={errors}
        />

        {/* About you */}
        <ProfileBiography
          biography={myProfileDatas.biography}
          bioLength={bioLength}
          onCountBioText={handleChangeBioCountText}
          register={register}
          errors={errors}
        />

        {/* Interests */}
        <ProfileInterests
          interests={myInterests}
          onAddInterest={handleAddInterest}
          onDeleteInterest={handleDeleteInterest}
        />

        {/* Privacy */}
        <PrivacyProfileWrapper />

        {/* Account */}
        <AccountActions />
      </form>
    </div>
  );
};

export default MyProfile;
