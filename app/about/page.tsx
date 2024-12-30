import React from 'react'


const page = () => {
  return (
    <div>
      <div className="flex align-center flex-col gap-3 text-center items-center">
        <div className="font-playfair font-bold text-4xl lg:text-6xl">About us</div>
        <div className="opacity-60 font-medium text-[14px] lg:text-[24px]">Awakening Minds, One Brew at a Time.</div>
      </div>

      <div className="flex flex-col gap-2 lg:gap-3 justify-center items-center">
        <div className="mt-4 lg:mt-5 grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-3">
          <div className="flex flex-col justify-start gap-2 lg:gap-3 bg-[#4E3E31] text-white p-5 lg:p-6 rounded-md">
            <div className='text-3xl lg:text-4xl text-center font-playfair font-bold'>Our Mission</div>
            <div className='text-lg lg:text-xl'>
              At Kape Ibarra, we are dedicated to crafting each cup with passion and purpose. Our mission is to:

              <ul className='list-disc pl-5 mt-2'>
                <li>Serve high-quality coffee and beverages that reflect the warmth and soul of Filipino tradition.</li>
                <li>Create a welcoming space where customers can feel at home, connect with others, and find inspiration.</li>
                <li>Uphold our values of faith, community, and excellence in everything we do.</li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col justify-start gap-2 lg:gap-3 bg-[#4E3E31] text-white p-5 lg:p-6 rounded-md">
            <div className='text-3xl lg:text-4xl text-center font-playfair font-bold'>Our Vision</div>
            <div className='text-lg lg:text-xl'>
              To be the heart of our community, offering high-quality, affordable beverages and pastries in a warm and welcoming environment.
              We aspire to uplift and strengthen our customers’ faith through carefully selected Bible verses, creating a space where exceptional coffee, meaningful connections, and spiritual growth come together.
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-start gap-2 lg:gap-3 bg-[#4E3E31] text-white p-5 lg:p-6 rounded-md w-full max-w-[700px]">
          <div className='text-3xl lg:text-4xl text-center font-playfair font-bold'>Values</div>
          <div className='text-lg lg:text-xl'>
            <ul className='list-disc pl-5 mt-2'>
              <li>Excellence & Quality: We are committed to delivering the highest quality products and services, ensuring each customer has a memorable experience.</li>
              <li>Community & Connection: We believe in fostering a sense of community and belonging, providing a space where people can gather, share stories, and build relationships.</li>
              <li>Faith & Integrity: Our foundation is rooted in faith, guiding our actions and decisions with integrity and honesty.</li>
              <li>Innovation & Creativity: We continually seek new and creative ways to enhance our offerings, staying true to our heritage while embracing the future.</li>
            </ul>
          </div>
        </div>
      </div>


    </div>
  )
}

export default page
