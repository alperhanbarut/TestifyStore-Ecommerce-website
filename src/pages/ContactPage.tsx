import Contact from "@/components/Contact";
import React from "react";

function ContactPage() {
  return (
    <div>
      <Contact />

      <div className="mt-8 rounded-lg overflow-hidden shadow">
        <iframe
          title="TestifyStore Konum"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12041.63423254013!2d28.978359!3d41.008238!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14caba6c5b6e5b0b%3A0x7c6e6e6e6e6e6e6e!2sIstanbul!5e0!3m2!1str!2str!4v1695744000000!5m2!1str!2str"
          width="100%"
          height="300"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
}

export default ContactPage;
