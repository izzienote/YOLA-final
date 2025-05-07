import { clsx } from 'clsx';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import DEFAULT_AVATAR_IMAGE from '@images/images/default-avatar.svg';

interface ProfileAvatarProps {
  src: string | null;
  mode: 'mobile' | 'desktop';
}

const ProfileAvatar = ({ src, mode }: ProfileAvatarProps) => {
  return (
    <Avatar
      className={clsx({
        'min-h-[48px] min-w-[48px] rounded-sm': mode === 'mobile',
        'h-[172px] w-[172px] rounded-2xl': mode === 'desktop'
      })}
    >
      <AvatarImage draggable="false" src={src ? src : ''} />
      <AvatarFallback className={clsx({ 'rounded-2xl': mode === 'desktop', 'rounded-sm': mode === 'mobile' })}>
        <Image
          draggable="false"
          src={DEFAULT_AVATAR_IMAGE}
          alt="디폴트 프로필 이미지"
          width={mode === 'mobile' ? 48 : 172}
          height={mode === 'mobile' ? 48 : 172}
        />
      </AvatarFallback>
    </Avatar>
  );
};
export default ProfileAvatar;
