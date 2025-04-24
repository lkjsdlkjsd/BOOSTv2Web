import React, { useState } from "react";
import "./Contentland.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Logo from "/src/assets/LOGO.png";
import Video from "/src/assets/TeamworkLandingPage.mp4";
import Pomodoro from "/src/assets/Pomodoro.png";
import Todo from "/src/assets/Todolist.jpeg";
import Brainstorming from "/src/assets/Brainstorming.jpg";
import Tracker from "/src/assets/Tracker.jpeg";
import Reward from "/src/assets/Reward.png";
import Focus from "/src/assets/Focus.jpg";
import { Button, Modal } from "react-bootstrap";
import Header from "./Header";
import Nav from "./LandingPageNavigation";
import Footer from "./Footer.tsx";
import { useNavigate } from "react-router-dom";

function Contentland() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: "",
    description: "",
  });
  const [isPlaying, setIsPlaying] = useState(false);

  const AboutUS = () => {
    navigate("/Aboutus");
  };

  const handlePlay = () => {
    const video = document.getElementById("custom-video") as HTMLVideoElement;
    if (video) {
      video.play();
      setIsPlaying(true);
    }
  };

  const handleClose = () => setShowModal(false);
  const scrollToServices = () => {
    const element = document.getElementById("services-section");
    if (element) {
      const offset = 100;

      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: elementPosition - offset, behavior: "smooth" });
    }
  };

  const handleShow = (title: string, description: string) => {
    setModalContent({ title, description });
    setShowModal(true);
  };

  return (
    <React.Fragment>
      <Header />
      <Nav />
      <h2 className=" text-center fw-semibold pt-5" id="boost-tagline">
        <img className="img-fluid" src={Logo} alt="Logo" id="Logostart" />
        <span id="color1">Unlock</span> Your Potential, Boost Yourself!
      </h2>
      <h4 id="text1" className="text-center pb-1 medium-weight">
        From Brainstorming to Focused Study
      </h4>
      <h6 className="text-center pb-4" id="Unlock">
        Unlock Your Full Potential.
      </h6>
      <div className="container" id="button-row">
        <ul className="list-unstyled d-flex justify-content-center">
          <li className="btn p-3 m-1" id="abtus-btn" onClick={AboutUS}>
            About Us
          </li>
          <li className="btn p-3 m-1" id="serv-btn" onClick={scrollToServices}>
            Services
          </li>
        </ul>
      </div>
      <div className="video-container d-flex justify-self-center mt-5 pt-5">
        <video
          id="custom-video"
          className="video-player"
          src={Video}
          loop
          autoPlay
          onClick={handlePlay}
        ></video>

        {!isPlaying && (
          <button className="play-button" onClick={handlePlay}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="36"
              fill="white"
              viewBox="0 0 16 16"
            >
              <path d="M6.271 4.055a.5.5 0 0 1 .759-.424l4.5 3.25a.5.5 0 0 1 0 .838l-4.5 3.25A.5.5 0 0 1 6 10.25v-6.5a.5.5 0 0 1 .271-.445z" />
            </svg>
          </button>
        )}
      </div>

      <div className="container">
        <div className="row">
          <div className="col-sm-1">
            <h2 className="fw-semibold">Benefits</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            Effective time management brings numerous benefits, enhancing
            productivity, reducing stress, and improving overall well-being. By
            prioritizing tasks and setting clear goals, individuals can
            accomplish more in less time, leading to increased efficiency and a
            sense of achievement. Proper time management also helps reduce
            procrastination, ensuring that deadlines are met without last-minute
            pressure. Additionally, it allows for a better work-life balance,
            providing more time for relaxation, hobbies, and personal growth.
          </div>
        </div>
        <div className="row pt-5">
          <div className="col-sm m-3 card">
            <h1 className="fw-bold text-end p-4">01</h1>
            <h5>Focus on your work task </h5>
            <span className="pb-5">
              Fit your coursework around your existing commitments and
              obligations.
            </span>
          </div>
          <div className="col-sm m-3 card">
            <h1 className="fw-bold text-end p-4">02</h1>
            <h5>Improve your productivity</h5>
            <span className="pb-5">
              Learn from industry experts who have hands-on experience in design
              and development.
            </span>
          </div>
          <div className="col-sm m-3 card">
            <h1 className="fw-bold text-end p-4">03</h1>
            <h5>Less Stress</h5>
            <span className="pb-5">
              When you ave better organization and task management. It help you
              feel less overwhelmed and lowers stress level.
            </span>
          </div>
        </div>
        <div className="row pt-2">
          <div className="col-sm m-3 card">
            <h1 className="fw-bold text-end p-4">04</h1>
            <h5>Quality of your work</h5>
            <span className="pb-5">
              Productivity tools often include feature like automated reminders
              and version control to help you minizie errors and maintain
              quality of work.
            </span>
          </div>
          <div className="col-sm m-3 card">
            <h1 className="fw-bold text-end p-4">05</h1>
            <h5>Growth Opportunities</h5>
            <span className="pb-5">
              Many individuals are motivated by career growth and professional
              development opportunities.
            </span>
          </div>
          <div className="col-sm m-3 card">
            <h1 className="fw-bold text-end p-4">06</h1>
            <h5>Reduce Burnout</h5>
            <span className="pb-5">
              Spending the right amount of time on daily processes makes you
              cope better with your worklaod, allowing you to complete tasks.
            </span>
          </div>
        </div>
        <div className="row mb-5 mt-5 pt-5">
          <div className="row mb-2">
            <div className="col-lg">
              <h2 className="fw-semibold" id="services-section">
                Our Services
              </h2>
            </div>
          </div>

          <div className="col-sm-12">
            <span>
              At BulaCanBoost, we are committed to providing top-quality
              services tailored to meet your unique needs. Our team of experts
              ensures seamless solutions with a focus on innovation, efficiency,
              and customer satisfaction. Whether you're looking for professional
              guidance, technical support, or creative solutions, we strive to
              deliver excellence at every step. With a dedication to quality and
              a passion for service, we aim to enhance your experience and help
              you achieve your goals effortlessly.
            </span>
          </div>
        </div>
        <div className="row d-flex justify-content-center">
          <div className="col-md-5 m-1 card">
            <img
              alt="place holder"
              src={Pomodoro}
              className="rounded mt-3"
              height={300}
            />
            <h5 className="fw-semibold m-3">Pomodoro Timer</h5>
            <span className="px-3">
              A time management method based on 25-minute stretches of focused
              work broken by five-minute brakes.
            </span>
            <a
              className="btn m-2 mb-4"
              id="serv-btns"
              onClick={() =>
                handleShow(
                  "Pomodoro Timer",
                  "The Pomodoro Timer is a time management technique designed to improve focus and productivity. It involves breaking work into intervals, traditionally 25 minutes in length, separated by short 5-minute breaks. After completing four consecutive work sessions, a longer break of 15 to 30 minutes is taken. This method helps prevent burnout, maintains concentration, and enhances efficiency by encouraging short bursts of deep work followed by necessary rest. It is particularly useful for students, professionals, and anyone looking to optimize their workflow and minimize distractions."
                )
              }
            >
              Know more!
            </a>
          </div>
          <div className="col-md-5 m-1 card">
            <img src={Todo} className="rounded mt-3" height={300} />
            <h5 className="fw-semibold m-3">To-Do List</h5>
            <span className="px-3">
              A list of things you have to do. That means basically anything and
              everything can be on your to-do list—just about anything!
            </span>
            <a
              className="btn m-2 mb-4"
              id="serv-btns"
              onClick={() =>
                handleShow(
                  "To-Do List HISTORY",
                  "The history of the to-do list dates back centuries, with its roots in human productivity and organization. The concept of listing tasks can be traced to ancient civilizations, where people used clay tablets, papyrus, or parchment to record important duties, transactions, and schedules. One of the earliest recorded examples comes from Benjamin Franklin in the 18th century, who famously maintained daily task lists as part of his structured approach to self-improvement. In the early 20th century, the rise of personal planners and paper-based task management, such as the Filofax and day planners, made to-do lists more systematic. The method gained further popularity with productivity techniques like the Eisenhower Matrix and David Allens Getting Things Done (GTD) framework, emphasizing prioritization and efficiency. With the advent of digital technology, to-do lists evolved from handwritten notes to applications like Microsoft Outlook’s task manager, Google Keep, and dedicated apps like Todoist and Trello, allowing for seamless task tracking across devices. Today, to-do lists continue to be an essential tool for personal and professional productivity, integrating AI, reminders, and automation to enhance efficiency in daily life."
                )
              }
            >
              Know more!
            </a>
          </div>
        </div>
        <div className="row d-flex justify-content-center">
          <div className="col-md-5 m-1 card">
            <img
              alt="place holder"
              src={Brainstorming}
              className="rounded mt-3"
              height={300}
            />
            <h5 className="fw-semibold m-3">Brainstorming</h5>
            <span className="px-3">
              A group problem-solving method that involves the spontaneous
              contribution of creative ideas and solutions.
            </span>
            <a
              className="btn m-2 mb-4"
              id="serv-btns"
              onClick={() =>
                handleShow(
                  "Brainstorming",
                  "The concept of brainstorming was introduced by advertising executive Alex Faickney Osborn in the 1940s as a structured approach to generating creative ideas. Osborn, co-founder of the advertising firm BBDO, first outlined the technique in his 1948 book Your Creative Power. He believed that group collaboration could produce more innovative solutions than individuals working alone. Osborn established four key principles for effective brainstorming: defer judgment, encourage wild ideas, aim for quantity, and build on others’ ideas. These rules aimed to create a free-thinking environment where creativity could flourish without fear of criticism.Interestingly, while brainstorming remains widely used, research has shown that traditional group brainstorming can sometimes be less effective than individual brainstorming due to issues like groupthink and social loafing. As a result, variations such as brainwriting, reverse brainstorming, and electronic brainstorming have emerged to improve efficiency and inclusivity. Despite its challenges, brainstorming remains a fundamental tool in creative problem-solving, widely used in business, education, and innovation processes."
                )
              }
            >
              Know more!
            </a>
          </div>
          <div className="col-md-5 m-1 card">
            <img src={Tracker} className="rounded mt-3" height={300} />
            <h5 className="fw-semibold m-3">Tracker</h5>
            <span className="px-3">
              Porvides individuals and teams with tools to plan, prioritize, and
              track their activities efficiently
            </span>
            <a
              className="btn m-2 mb-4"
              id="serv-btns"
              onClick={() =>
                handleShow(
                  "Tracker",
                  "Porvides individuals and teams with tools to plan, prioritize, and track their activities efficiently"
                )
              }
            >
              Know more!
            </a>
          </div>
        </div>
        <div className="row d-flex justify-content-center">
          <div className="col-md-5 m-1 card">
            <img src={Reward} className="rounded mt-3" height={300} />
            <h5 className="fw-semibold m-3">EXP and Achievement</h5>
            <span className="px-3">
              A reward system that encourages completing tasks by offering
              incentives. It motivates users to create more tasks and stay
              productive.
            </span>
            <a
              className="btn m-2 mb-4"
              id="serv-btns"
              onClick={() =>
                handleShow(
                  "EXP and Achievement",
                  "A reward systems for completing tasks and make more task and stay productive"
                )
              }
            >
              Know more!
            </a>
          </div>
          <div className="col-md-5 m-1 card">
            <img src={Focus} className="rounded mt-3" height={300} />
            <h5 className="fw-semibold m-3">Focus Mode</h5>
            <span className="px-3">
              A mode that turns off any distractions on your device. It helps
              you stay focused by blocking notifications and interruptions.
            </span>
            <a
              className="btn m-2 mb-4"
              id="serv-btns"
              onClick={() =>
                handleShow(
                  "Focus Mode",
                  "A mode that turns off any distraction on your device"
                )
              }
            >
              Know more!
            </a>
          </div>
        </div>
      </div>

      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{modalContent.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalContent.description}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Footer />
    </React.Fragment>
  );
}

export default Contentland;
