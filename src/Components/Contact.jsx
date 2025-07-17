import React, { useState } from 'react';

const Contact = () => {
  const [result, setResult] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);
    formData.append("access_key", "3b27674f-51db-45e0-a7f7-832d47154dca");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      setResult("");
      setShowSuccess(true);
      event.target.reset();

      setTimeout(() => setShowSuccess(false), 3000);
    } else {
      console.log("Error", data);
      alert(data.message);
      setResult("");
    }
  };

  return (
    <div className='text-center p-6 py-20 px-6 md:px-32 w-full overflow-hidden' id='Contact'>
      <h1 className='text-2xl sm:text-4xl font-bold mb-2 text-center'>
        Contact <span className='underline underline-offset-4 decoration-1 font-light'>With Us</span>
      </h1>
      <p className='text-center text-gray-500 mb-12 max-w-80 mx-auto'>
        Ready to make a move? Let's Build Your Future Together
      </p>

      {showSuccess && (
        <div className="flex items-center justify-center mb-6">
          <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded flex items-center gap-3 max-w-md w-full">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-sm font-medium">Form submitted successfully!</span>
          </div>
        </div>
      )}

      <form onSubmit={onSubmit} className='max-w-2xl mx-auto text-gray-600 pt-8'>
        <div className='flex flex-wrap'>
          <div className='w-full md:w-1/2 text-left'>
            Your Name
            <input className='w-full border border-gray-300 rounded py-3 px-4 mt-2' type="text" name='Name' placeholder='Your Name' required />
          </div>
          <div className='w-full md:w-1/2 text-left md:pl-4'>
            Your Email
            <input className='w-full border border-gray-300 rounded py-3 px-4 mt-2' type="email" name='Email' placeholder='Your Email' required />
          </div>
        </div>
        <div className='my-6 text-left'>
          Message
          <textarea className='w-full border border-gray-300 rounded py-3 px-4 mt-2 h-48 resize-none' name="Message" placeholder='Message' required></textarea>
        </div>
        <button type="submit" className='bg-blue-600 text-white py-2 px-12 mb-10 mt-4 rounded block mx-auto'>
          {result ? result : "Send Message"}
        </button>
      </form>
    </div>
  );
};

export default Contact;
