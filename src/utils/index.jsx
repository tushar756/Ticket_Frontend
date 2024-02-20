const ProfileImgMaker = (firstName,lastName)=>{
    const firstname = firstName;
    const lastname = lastName;
   return `https://ui-avatars.com/api/?name=${firstname}+${lastname}&rounded=true&background=random&size=50`
}
export default ProfileImgMaker