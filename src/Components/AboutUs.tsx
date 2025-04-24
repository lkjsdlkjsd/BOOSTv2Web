import React from "react";
import "./AboutUs.css";
import Logo from "/src/assets/LOGO.png";
const CompanyOverview: React.FC = () => {
  const developers = [
    {
      name: "Zaldy Malig",
      role: "Full Stack Developer",
      img: "/images/dev1.jpg",
    },
    {
      name: "John Luis Baisa",
      role: "Backend Developer",
      img: "/images/dev2.jpg",
    },
    {
      name: " Axel Kyle Sabado",
      role: "UI/UX Designer & Front-End Developer",
      img: "/images/dev3.jpg",
    },
    {
      name: "John Luis Dagsa",
      role: "Front-End Developer",
      img: "/images/dev4.jpg",
    },
    {
      name: "Ace Bignotia",
      role: "UI/UX Designer & Frond-End Developer",
      img: "/images/dev5.jpg",
    },
    {
      name: "Darwin Dimalanta ",
      role: "UI/UX Designer & Frond-End Developer",
      img: "/images/dev6.jpg",
    },
  ];

  return (
    <div className="overview-container">
      <h2 className=" text-center fw-semibold pt-5" id="boost-tagline">
        Bula
        <span id="color2">CAN</span> Boost
      </h2>
      <h2 className=" text-center fw-semibold" id="boost-tagline">
        <span id="color2">Unlock</span> Your Potential, Boost Yourself!
      </h2>
      <h1 className="overview-title">Vision, Mission & Core Values</h1>
      <section>
        <h2>Location</h2>
      </section>
      <section>
        <h2>Vision</h2>
        <p>
          To be a globally recognized platform that transforms student and
          professional productivity through collaborative, user-friendly
          solutions—enabling success, balance, and personal growth in a
          community dedicated to learning and excellence.
        </p>
      </section>

      <section>
        <h2>Mission</h2>
        <p>
          To make productivity accessible to all through intuitive, inclusive
          tools that inspire growth and efficiency. We build collaborative
          innovations that empower individuals to unlock their potential and
          thrive in dynamic environments—while supporting sustainability and
          lifelong development.
        </p>
      </section>

      <section>
        <h2>Core Values</h2>
        <p>
          <strong>Innovation</strong> – We embrace creativity and tech to design
          modern solutions.
          <br />
          <strong>Collaboration</strong> – Teamwork and inclusivity shape
          everything we do.
          <br />
          <strong>Accessibility</strong> – Simplicity, openness, and
          inclusiveness for all.
          <br />
          <strong>Excellence</strong> – We commit to integrity, growth, and
          long-term impact.
        </p>
      </section>

      <section>
        <h2>Company Name</h2>
        <p>
          <strong>BulacanBoost Tech</strong> empowers students and professionals
          with easy-to-use digital tools. "Boost" reflects our mission to
          enhance productivity; "Tech" symbolizes innovation. “Bulacan”
          creatively represents leadership in creating change.
        </p>
      </section>

      <section>
        <h2>Contact</h2>
        <ul className="contact-list">
          <li>
            Email:{" "}
            <a href="mailto:BulaCanBoost@gmail.com">BulaCanBoost@gmail.com</a>
          </li>
          <li>Phone: +639510609840</li>
          <li>
            Facebook: <a href="https://facebook.com/BoostApp">BoostApp</a>
          </li>
          <li>
            Twitter: <a href="https://twitter.com/BoostApp">@BoostApp</a>
          </li>
          <li>
            Instagram: <a href="https://instagram.com/BoostApp">@BoostApp</a>
          </li>
          <li>
            LinkedIn:{" "}
            <a href="https://linkedin.com/company/BoostApp">BoostApp</a>
          </li>
          <li>
            Website:{" "}
            <a href="https://Boost2.0.vercel.app">Boost2.0.vercel.app</a>
          </li>
        </ul>
      </section>

      <section>
        <h2>About Us</h2>
        <p>
          BulacanBoost Tech is a partnership focused on web apps and tools for
          productivity and collaboration. With backgrounds in tech, education,
          and business, our team builds inclusive and user-friendly solutions
          that promote efficiency, collaboration, and meaningful growth.
        </p>
      </section>

      <section>
        <h2>Meet the Team</h2>
        <div className="dev-team">
          {developers.map((dev, index) => (
            <div key={index} className="dev-card">
              <img src={dev.img} alt={dev.name} className="dev-photo" />
              <h3>{dev.name}</h3>
              <p>{dev.role}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CompanyOverview;
