import { UserProfile } from "@interfaces/authenticate.interface";
import { useSelector } from "react-redux"
import { selectProfile } from "../../redux/store/common/commonSlice"



export const useUserProfile = () => {
    const userProfile: UserProfile = useSelector(selectProfile);

    return userProfile;
}