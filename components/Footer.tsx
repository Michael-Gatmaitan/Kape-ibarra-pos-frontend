import Image from 'next/image'
import Link from 'next/link';
import React from 'react'
import EmailForm from './footer/EmailForm';

const Footer = () => {
  const socmeds = [{
    label: "facebook",
    iconSrc: '/assets/svg-icons/facebook.svg',
    alt: "facebook",
    linkUrl: "https://www.facebook.com/kapeibarra"
  }, {
    label: "instagram",
    iconSrc: '/assets/svg-icons/instagram.svg',
    alt: "instagram",
    linkUrl: "https://www.instagram.com/kapeibarra"
  }];

  const footerLinks = [
    { text: "About us", linkUrl: "/about" },
    { text: "Our story", linkUrl: "/menu" },
    { text: "Developers", linkUrl: "/developers" },
  ];

  return (
    <footer className='bg-[#4E3E31] px-4 lg:px-8 xl:px-12 2xl:px-36 py-10 grid grid-flow-row lg:grid-flow-col gap-6'>
      <div className="flex gap-2 md:gap-3">
        {socmeds.map((socmed, i) => (
          <SocmedCircle {...socmed} key={i} />
        ))}
      </div>

      {/* Links */}
      <div className="flex flex-col">
        {footerLinks.map((link, i) => (
          <FooterLink {...link} key={i} />
        ))}
      </div>

      <div className="flex flex-col gap-2 md:gap-3 text-white justify-start">
        <div className="text-2xl md:text-3xl font-bold mb-1">Contact Us</div>
        <div className="text-sm md:text-base">Sta. Rosa 1, Marilao, Bulacan, PH</div>
        <div className="text-sm md:text-base">(+63) 923-413-2544</div>
      </div>

      <EmailForm />
    </footer>
  )
}

const SocmedCircle = ({ alt, iconSrc, label, linkUrl }: { alt: string, iconSrc: string, label: string, linkUrl: string }) => {
  return (
    <Link href={linkUrl} target='_blank'>
      <div className='rouded-full justify-center items-center w-10 h-10 lg:w-12 lg:h-12 p-1 bg-gray-100 rounded-full'>
        <Image src={iconSrc} alt={alt} aria-label={label} title={label} width={60} height={60} />
      </div>
    </Link>
  )
}

const FooterLink = ({ text, linkUrl }: { text: string, linkUrl: string }) => {
  return (
    <Link href={linkUrl} className='font-medium text-sm md:text-[16px] py-2 text-white'>{text}</Link>
  )
}

export default Footer
