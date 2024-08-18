import React, { useState } from 'react'
import emailjs from '@emailjs/browser';

const ContactForm = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Your EmailJS service ID, template ID, and Public Key
    const serviceId = 'service_4s3az7u';
    const templateId = 'template_vyum51c';
    const publicKey = 'YrjE6ZKki-zkzjyd0';

    // Create a new object that contains dynamic template params
    const templateParams = {
      from_name: name,
      from_email: email,
      to_name: 'Twin Matrix Technology Team',
      message: message,
    };

    // Send the email using EmailJS
    emailjs.send(serviceId, templateId, templateParams, publicKey)
      .then((response) => {
        console.log('Email sent successfully!', response);
        setName('');
        setEmail('');
        setMessage('');
      })
      .catch((error) => {
        console.error('Error sending email:', error);
      });
  }

  return (
    // <form onSubmit={handleSubmit} className='emailForm'>
    //   <input
    //     type="text"
    //     placeholder="Your Name"
    //     value={name}
    //     onChange={(e) => setName(e.target.value)}
    //   />
    //   <input
    //     type="email"
    //     placeholder="Your Email"
    //     value={email}
    //     onChange={(e) => setEmail(e.target.value)}
    //   />
    //   <textarea
    //     cols="30"
    //     rows="10"
    //     value={message}
    //     onChange={(e) => setMessage(e.target.value)}
    //   >
    //   </textarea>
    //   <button type="submit">Send Email</button>
    // </form>
    <form onSubmit={handleSubmit} className="emailForm max-w-lg  mx-5 md:mx-auto p-6 my-8 bg-white rounded-md shadow-md">
    <h2 className="text-2xl font-bold mb-6 text-gray-800">Contact Us</h2>
    
    <div className="mb-4">
      <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
        Name
      </label>
      <input
        type="text"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
         
        required
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
      />
    </div>

    <div className="mb-4">
      <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
        Email
      </label>
      <input
        type="email"
        id="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
      />
    </div> 

    <div className="mb-4">
      <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
        Message
      </label>
      <textarea
        id="message"
        name="message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
        rows={5}
      ></textarea>
    </div>

    <button
      type="submit"
      className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-slate-800 transition-colors"
    >
      Submit
    </button>
  </form>


 
 
  )
}

export default ContactForm