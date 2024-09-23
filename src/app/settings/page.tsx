import Footer from '@/components/layout/Footer'
import GeneralInfo from './components/GeneralInfo'
import ResetPassword from './components/ResetPassword'
import SkillsAndHobbies from './components/SkillsAndHobbies'
import UserImageUpload from './components/UserImageUpload'

function UserSetting() {
  return (
    <div className="w-full flex flex-col gap-4 p-4">
      <div className="w-full flex flex-row gap-4">
        <div className="flex flex-col gap-4 w-full max-w-[30%]">
          <UserImageUpload />
          <SkillsAndHobbies />
          <ResetPassword />
        </div>
        <div className="flex flex-col gap-4 w-full">
          <GeneralInfo />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default UserSetting
