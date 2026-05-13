import emailjs from '@emailjs/browser';

// To set up EmailJS:
// 1. Create an account at https://www.emailjs.com/
// 2. Add an Email Service (e.g., Gmail)
// 3. Create an Email Template
// 4. Fill in these constants from your EmailJS dashboard:
export const EMAILJS_SERVICE_ID = "service_6tcf2nn";
export const EMAILJS_TEMPLATE_ID = "template_a8obaci";
export const EMAILJS_PUBLIC_KEY = "qmuPjx5j4-Yphqc24";

export const initEmailJS = () => {
    emailjs.init(EMAILJS_PUBLIC_KEY);
};
