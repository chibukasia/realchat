import React from 'react';

const Avatar1 = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect width="40" height="40" rx="20" fill="#B2EBF2"/>
    <circle cx="20" cy="18" r="8" fill="#4DD0E1"/>
    <path d="M12 34C12 29.5817 15.5817 26 20 26C24.4183 26 28 29.5817 28 34H12Z" fill="#00ACC1"/>
  </svg>
);

const Avatar2 = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect width="40" height="40" rx="20" fill="#FFCCBC"/>
    <circle cx="20" cy="18" r="8" fill="#FF8A65"/>
    <path d="M12 34C12 29.5817 15.5817 26 20 26C24.4183 26 28 29.5817 28 34H12Z" fill="#F4511E"/>
  </svg>
);

const Avatar3 = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect width="40" height="40" rx="20" fill="#C8E6C9"/>
    <circle cx="20" cy="18" r="8" fill="#81C784"/>
    <path d="M12 34C12 29.5817 15.5817 26 20 26C24.4183 26 28 29.5817 28 34H12Z" fill="#388E3C"/>
  </svg>
);

const Avatar4 = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect width="40" height="40" rx="20" fill="#D1C4E9"/>
    <circle cx="20" cy="18" r="8" fill="#9575CD"/>
    <path d="M12 34C12 29.5817 15.5817 26 20 26C24.4183 26 28 29.5817 28 34H12Z" fill="#5E35B1"/>
  </svg>
);

const Avatar5 = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect width="40" height="40" rx="20" fill="#FFF9C4"/>
    <circle cx="20" cy="18" r="8" fill="#FFF176"/>
    <path d="M12 34C12 29.5817 15.5817 26 20 26C24.4183 26 28 29.5817 28 34H12Z" fill="#FBC02D"/>
  </svg>
);

const Avatar6 = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect width="40" height="40" rx="20" fill="#F8BBD0"/>
    <circle cx="20" cy="18" r="8" fill="#F06292"/>
    <path d="M12 34C12 29.5817 15.5817 26 20 26C24.4183 26 28 29.5817 28 34H12Z" fill="#D81B60"/>
  </svg>
);

export const avatarComponents: React.FC<React.SVGProps<SVGSVGElement>>[] = [Avatar1, Avatar2, Avatar3, Avatar4, Avatar5, Avatar6];

export const getAvatar = (id: string | number) => {
    const index = typeof id === 'string' ? (parseInt(id, 10) -1) : id - 1;
    const AvatarComponent = avatarComponents[index % avatarComponents.length];
    return AvatarComponent ? <AvatarComponent /> : <Avatar1 />;
};

// Returns the avatar ID (e.g., "avatar-1") for storage
export const getAvatarId = (index: number) => `avatar-${index + 1}`;

// Returns the React component for a given avatar ID
export const getAvatarComponent = (avatarId: string) => {
    const id = parseInt(avatarId.split('-')[1], 10);
    return getAvatar(id);
};
