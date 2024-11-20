import React from 'react'
import { Card } from '../ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Label } from '../ui/label'
import { getUserPayloadServer } from '../../actions/serverActions';

const ProfileCard = async () => {

  const payload = await getUserPayloadServer();

  return (
    <Card className='p-2 flex gap-2 items-center'>
      <Avatar>
        <AvatarImage src='/img/remvo.png' alt="mama_mo" />
        <AvatarFallback>{payload.user.lastname}</AvatarFallback>
      </Avatar>

      <div className="infos">
        <div className="name font-bold">{payload.user.firstname}</div>
        <Label className="font-medium text">{payload.roleName}</Label>
      </div>
    </Card>
  )
}

export default ProfileCard;
