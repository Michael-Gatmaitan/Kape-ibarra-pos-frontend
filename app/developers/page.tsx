import Image from 'next/image'
import React from 'react'
import { Separator } from '../../components/ui/separator';
import Link from 'next/link';

const developers = [
  {
    name: 'Michael Gatmaitan',
    img: '/img/developers/team/kel.jpeg',
    role: 'Fullstack Developer',
    description: "Michael, the programmer of the team, responsible for creating database, API, & user interfaces of the website",
    links: [
      { name: 'facebook', url: '', },
      { name: 'instagram', url: '', },
    ]
  },
  {
    name: 'Revo Fidel',
    img: '/img/developers/team/revo.jpg',
    role: 'UI Design / Diagrams',
    description: "Revo planned the wireframes with the help of John Rhey. Revo focused on designing and creating of diagrams.",
    links: [
      { name: 'facebook', url: '', },
      { name: 'instagram', url: '', },
    ]
  },
  {
    name: 'John Rhey Dela Cruz',
    img: '/img/developers/team/jear.jpg',
    role: 'UI Design / Diagrams',
    description: "John Rhey helped Revo for thinking what the diagram should be and He is focused for designing the user interface of the system.",
    links: [
      { name: 'facebook', url: '', },
      { name: 'instagram', url: '', },
    ]
  },
  {
    name: 'Maui Joy Castro',
    img: '/img/developers/team/mawi.jpg',
    role: 'Documentation / Diagrams',
    description: "Maui mainly focused for documentation of the system. Maui also helped for creating and debugging of the diagram to ensure corrections and accurate informations.",
    links: [
      { name: 'facebook', url: '', },
      { name: 'instagram', url: '', },
    ]
  }
];

const tech_stacks = [{
  name: 'NextJS',
  description: "React framework for server-side rendering",
  url: 'https://nextjs.org'
},
{
  name: 'ExpressJS',
  description: "Backend framework for API creation",
  url: 'https://expressjs.com'
},
{
  name: 'PostgreSQL',
  description: "Relational database for structured data",
  url: 'https://www.postgresql.org'
},
{
  name: 'Prisma',
  description: "ORM for database management",
  url: 'https://www.prisma.io/'
},
{
  name: 'Supabase',
  description: "Backend-as-a-service for modern apps",
  url: 'https://supabase.com'
},
{
  name: 'JWT',
  description: "Token-based authentication for security",
  url: 'https://jwt.io/'
},
{
  name: 'Redux-toolkit',
  description: "State management library for React",
  url: 'https://redux-toolkit.js.org'
},
{
  name: 'TailwindCSS',
  description: "Utility-first CSS framework for styling",
  url: 'https://tailwindcss.com'
},
{
  name: 'Typescript',
  description: "Typed JavaScript for scalable development",
  url: 'https://www.typescriptlang.org/'
},
{
  name: 'Vercel',
  description: "Hosting platform for Next.js projects",
  url: 'https://vercel.com'
},
{
  name: 'Shadcn-UI',
  description: "Component library for modern UI",
  url: 'https://ui.shadcn.com/'
},
{
  name: 'Figma',
  description: "Design tool for UI/UX prototyping",
  url: 'htpps://reactjs.org'
},
]

const page = () => {
  return (
    <div>
      <div className="flex align-center flex-col gap-3 text-center items-center">
        <div className="font-playfair font-bold text-4xl lg:text-6xl">Developers</div>
        <div className="opacity-60 font-medium text-[14px] lg:text-[24px]">from Pambayang Dalubhasaan ng Marilao</div>

        <div className='mt-4 lg:mt-5 lg:text-lg text-center max-w-[900px]'>
          This website are made by the college students from PDM (Pambayang Dalubhasaan ng Marilao) a college school from Abangan Sur, Marilao, Bulacan. This <span className='font-medium'>Web-based Point-of-Sales &amp; Inventory System</span> are used for case-study of students who made this system possible. The building process including planning, diagrams and development really sharpen the students&rsquo; skills and they spent a lot of time and effort to made this system possible.
        </div>

        <div className='overflow-hidden mt-4 lg:mt-5 rounded-md'>
          <Image src="/img/developers/developers.jpeg" alt="developers" width={1000} height={1000} className="w-full max-w-[750px]" />
        </div>
      </div>

      <div className='flex align-center flex-col gap-3 text-center items-center mt-20 lg:mt-24'>
        <div className='font-playfair font-bold text-4xl lg:text-6xl'>Team members</div>
        <div className='opacity-60 font-medium text-[14px] lg:text-[24px]'>4 members</div>

        <div className="grid gap-2 grid-cols-developer_card mt-5 w-full">
          {developers.map((dev, i) => (
            <div className="rounded-md overflow-hidden bg-cover bg-center relative" key={i} style={{
              backgroundImage: `url(${dev.img})`
            }}>

              <div className="p-8 lg:p-10 w-full h-full top-0 left-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white">
                <div className="font-bold text-xl lg:text-3xl">{dev.name}</div>
                <div className="font-medium text-sm md:text-[16px]">{dev.role}</div>

                <div className='md:text-lg mt-3 lg:mt-4'>
                  {dev.description}
                </div>

                <div className='flex justify-start mt-3 lg:mt-4 gap-2'>
                  {dev.links.map((link, i) => (
                    <a href={link.url} key={i} className='text-blue-500 hover:underline p-1 bg-white rounded-full'>
                      <Image src={`/assets/svg-icons/${link.name}.svg`} alt={link.name} width={30} height={30} className='lg:w-10 lg:h-10' />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className='mt-5 max-w-[900px] md:text-lg'>
          The development of this product takes only 3 months for the developers which is a short time for this kind of system. 3 months is very short for single programmer to finish this kind of system but the system is 70%-80% complete thanks to the collaboration of the other members.
        </div>
      </div>

      <div className='flex align-center flex-col gap-3 text-center items-center mt-20 lg:mt-24'>
        <div className='font-playfair font-bold text-4xl lg:text-6xl'>Tech stack</div>
        <div className='opacity-60 font-medium text-[14px] lg:text-[24px]'>Tools used for development</div>

        <div className='grid grid-cols-tech_stack w-full gap-4 mt-3'>
          {tech_stacks.map((tech, i) => (
            <div className='rounded-md grid gap-2 border' key={i}>
              {/* <div className='grid gap-2 justify-center place-items-center bg-slate-400'> */}
              <div className='grid place-items-center gap-2 pt-2'>
                <div className='w-[100px] h-[100px] flex justify-center items-center'>
                  <Image src={`/assets/brand-icons/${tech.name.toLowerCase()}.svg`} alt={tech.name} width={100} height={100} className="h-[100px] w-[100px] object-fit" />
                </div>
                <Link href={tech.url} target='_blank' className='hover:underline hover:text-primary'>
                  <div className='font-bold text-2xl'>{tech.name}</div>
                </Link>
              </div>

              <Separator />
              <div className='lg:text-lg p-2'>
                {/* {tech.url} */}
                {tech.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div >
  )
}

export default page
