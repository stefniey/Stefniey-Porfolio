"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { gsap } from "gsap";
import Editor from "react-simple-code-editor";
import Prism from "prismjs";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism-tomorrow.css";
import { FiDownload } from "react-icons/fi";
import {
  FaLinkedin,
  FaTwitter,
  FaGithub,
  FaInstagram,
  FaCode,
  FaPaintBrush,
  FaTools,
  FaBolt,
  FaUsers,
  FaLightbulb,
  FaLaptopCode,
  FaDatabase,
  FaCloud,
  FaServer,
  FaLinkedinIn,
} from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Image from "next/image";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { FaReact, FaNodeJs, FaGitAlt } from "react-icons/fa";
import {
  SiNextdotjs,
  SiTypescript,
  SiSupabase,
  SiPostgresql,
  SiVercel,
  SiNetlify,
  SiJavascript,
  SiReact,
  SiMysql,
} from "react-icons/si";

import { ExternalLink } from "lucide-react";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cubeRef = useRef<THREE.Mesh | null>(null);

  const [loaded, setLoaded] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const techCards = [
    {
      title: "Frontend Development",
      icon: <FaLaptopCode className="text-blue-500 w-6 h-6" />,
      text: "Building interactive, responsive, and user-friendly web applications using modern frontend technologies.",
      technologies: [
        { name: "React", icon: <FaReact className="text-cyan-500" /> },
        { name: "Next.js", icon: <SiNextdotjs className="text-black" /> },
        {
          name: "JavaScript",
          icon: <SiJavascript className="text-blue-600" />,
        },
        {
          name: "TypeScript",
          icon: <SiTypescript className="text-blue-600" />,
        },

        {
          name: "React Native",
          icon: <SiReact className="text-cyan-500" />,
        },
      ],
    },
    {
      title: "Backend & Databases",
      icon: <FaDatabase className="text-purple-600 w-6 h-6" />,
      text: "Managing data storage, authentication, and APIs to build scalable and reliable applications.",
      technologies: [
        { name: "Supabase", icon: <SiSupabase className="text-emerald-500" /> },
        {
          name: "SQL",
          icon: <SiMysql className="text-blue-600" />,
        },

        {
          name: "PostgreSQL",
          icon: <SiPostgresql className="text-blue-700" />,
        },
        { name: "REST APIs", icon: <FaGitAlt className="text-orange-500" /> },
      ],
    },
    {
      title: "Deployment & Hosting",
      icon: <FaCloud className="text-teal-500 w-6 h-6" />,
      text: "Deploying apps on modern hosting platforms with focus on reliability and performance.",

      technologies: [
        { name: "Vercel", icon: <SiVercel className="text-black" /> },
        { name: "Netlify", icon: <SiNetlify className="text-teal-500" /> },
        { name: "CI / CD", icon: <FaGitAlt className="text-orange-500" /> },
        {
          name: "GitHub",
          icon: <FaGithub className="text-gray-800" />,
        },
        {
          name: "Other Hosting Services",
          icon: <FaServer className="text-gray-600" />,
        },
      ],
    },
  ];

  const projects = [
    {
      image: "/fleetrify.jpeg",
      title: "Fleetrify",
      description:
        "A fleet management platform built to monitor vehicles, manage operations, and integrate external APIs for real-time data handling.",
      url: "https://fleetrify.com",
    },
    {
      image: "/elbis.jpeg",
      title: "Elbis Home.ng",
      description:
        "A real estate listing platform for showcasing available houses and properties with a clean, user-friendly interface.",
      url: "https://elbishome.ng",
    },
    {
      image: "/gadget.jpeg",
      title: "The 8th Limited",
      description:
        "An e-commerce product showcase for gadgets, allowing users to browse items and make purchase decisions.",
      url: "https://the-8th-limited.netlify.app",
    },
    {
      image: "/hobnk.jpeg",
      title: "Hoobank",
      description:
        "A UI-focused web project created to explore modern layouts, animations, and visual design concepts without backend functionality.",
      url: "https://hoobanc.netlify.app",
    },
    {
      image: "/getrich.png",
      title: "GetRich",
      description:
        "A food and drinks website concept designed to showcase menus and branding, focused purely on visual presentation.",
      url: "https://getrichcuisne.netlify.app",
    },
    {
      image: "/qrcode.png",
      title: "QR Genie",
      description:
        "A simple QR code generator that allows users to create scannable QR codes instantly.",
      url: "https://teamgnatpp.netlify.app",
    },
  ];

  //  cube and splash intro for hero
  useEffect(() => {
    if (!containerRef.current) return;

    //  Scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      100,
    );
    camera.position.z = 3;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    containerRef.current.appendChild(renderer.domElement);

    //lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.9);
    directionalLight.position.set(3, 3, 5);
    scene.add(directionalLight);

    //texture
    const textureLoader = new THREE.TextureLoader();
    const woodTexture = textureLoader.load("/textures/crate.gif");
    woodTexture.colorSpace = THREE.SRGBColorSpace;

    //cube
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({
      map: woodTexture,
    });
    const cube = new THREE.Mesh(geometry, material);
    cubeRef.current = cube;
    scene.add(cube);

    // animation loop
    let animationId: number;
    const animate = () => {
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };
    animate();

    // cube splash
    const triggerBubbleSplash = () => {
      const count = 60;

      // star shape
      const starShape = new THREE.Shape();
      const spikes = 5;
      const outerRadius = 0.12;
      const innerRadius = 0.05;
      for (let i = 0; i < spikes * 2; i++) {
        const angle = (i / (spikes * 2)) * Math.PI * 2;
        const radius = i % 2 === 0 ? outerRadius : innerRadius;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        if (i === 0) starShape.moveTo(x, y);
        else starShape.lineTo(x, y);
      }
      starShape.closePath();

      for (let i = 0; i < count; i++) {
        let geometry;
        const shapeType = Math.floor(Math.random() * 4);
        switch (shapeType) {
          case 0: // circle
            geometry = new THREE.SphereGeometry(0.12, 16, 16);
            break;
          case 1: // square
            geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
            break;
          case 2: // rectangle
            geometry = new THREE.BoxGeometry(0.3, 0.15, 0.15);
            break;
          case 3: // star
            geometry = new THREE.ExtrudeGeometry(starShape, {
              depth: 0.05,
              bevelEnabled: false,
            });
            break;
        }

        const material = new THREE.MeshStandardMaterial({
          map: woodTexture,
          roughness: 0.6,
          metalness: 0.15,
        });

        const particle = new THREE.Mesh(geometry, material);
        particle.position.copy(cube.position);
        scene.add(particle);

        const angle = Math.random() * Math.PI * 2;
        const dist = 1.5 + Math.random();
        const target = {
          x: Math.cos(angle) * dist,
          y: Math.sin(angle) * dist,
          z: (Math.random() - 0.5) * dist,
        };

        // pop-in scale
        gsap.fromTo(
          particle.scale,
          { x: 0, y: 0, z: 0 },
          { x: 1, y: 1, z: 1, duration: 0.3, ease: "back.out(1.7)" },
        );

        // fly out
        gsap.to(particle.position, {
          ...target,
          duration: 1.2,
          ease: "power2.out",
          onComplete: () => {
            scene.remove(particle);
            particle.geometry.dispose();
            particle.material.dispose();
          },
        });
      }

      setLoaded(true);
    };

    // cube exit
    setTimeout(() => {
      gsap.to(cube.scale, {
        x: 0,
        y: 0,
        z: 0,
        duration: 0.4,
        onComplete: triggerBubbleSplash,
      });
    }, 2000);

    // clean up
    return () => {
      cancelAnimationFrame(animationId);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      scene.clear();
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  // codeline animation 
  const codeLines = [
    `// Welcome to my portfolio`,
    `const me = {`,
    `  name: "Stephanie Alor",`,
    `  role: "Frontend Developer",`,
    `  skills: ["React", "Next.js", "JavaScript", "TypeScript", "TailwindCSS"]`,
    `};`,
    ``,
    `function greet() {`,
    `  console.log("Hey there! 👋");`,
    `}`,
    `greet();`,
    ``,
    `// Let's build something amazing! 🚀`,
  ];

  const [typedIndex, setTypedIndex] = useState(0);
  const [displayedCode, setDisplayedCode] = useState("");

  useEffect(() => {
    if (typedIndex < codeLines.join("\n").length) {
      const timeout = setTimeout(() => {
        const allCode = codeLines.join("\n");
        setDisplayedCode(allCode.slice(0, typedIndex + 1));
        setTypedIndex(typedIndex + 1);
      }, 35); // typing speed
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setDisplayedCode("");
        setTypedIndex(0);
      }, 4000);
      return () => clearTimeout(timeout);
    }
  }, [typedIndex]);

  return (
    <div className="relative w-screen min-h-screen bg-[#e4e7ea] text-black overflow-hidden">
      {/* three.js container */}
      <div ref={containerRef} className="absolute inset-0" />

      {/* overlay text */}
      {loaded && (
        <>
          <Navbar />

          {/* intro section */}
          <section
            id="home"
            className="flex flex-col lg:flex-row items-center justify-between mt-20 px-4 lg:px-20 py-16 lg:py-24 bg-[#e4e7ea] scroll-mt-20"
          >
            {/* text content */}
            <div className="w-full lg:w-1/2 space-y-6 lg:space-y-8">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
                Hi, I'm <br />
                Stephanie Alor
              </h1>

              <p className="text-lg md:text-xl text-gray-700">
                I'm a passionate{" "}
                <span className="text-black font-semibold animate-[typing_3s_steps(30)_1] border-r-2 border-gray-800 pr-1">
                  Frontend Developer <br />
                </span>{" "}
                crafting{" "}
                <span className="font-semibold text-black">interactive</span>{" "}
                and <span className="font-semibold text-black">responsive</span>{" "}
                web experiences.
              </p>

              <div className="flex flex-wrap gap-4 mt-4">
                <a
                  href="/Stephanie-Alor-resume.pdf"
                  download
                  className="relative z-10 px-6 py-3 bg-black text-white rounded-lg hover:bg-emerald-600 transition-all duration-300 flex items-center gap-2"
                >
                  <FiDownload className="w-5 h-5" />
                  Download Resume
                </a>
                <a
                  href="#project"
                  className="relative z-10 px-6 py-3 bg-black text-white rounded-lg hover:bg-emerald-600 transition-all duration-300 relative z-10"
                >
                  See My Work
                </a>
              </div>

              <div className="flex items-center gap-[3px] relative z-10">
                {/* github */}
                <a
                  href="https://github.com/stefniey"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black hover:text-gray-700 transition-colors p-2"
                >
                  <FaGithub size={24} />
                </a>

                {/*instagram */}
                <a
                  href="https://www.instagram.com/stephanie_dexx/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black hover:text-gray-700 transition-colors p-2"
                >
                  <FaInstagram size={24} />
                </a>

                {/* linkedIn */}
                <a
                  href="https://www.linkedin.com/in/stephanie-alor-1b913624a/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black hover:text-gray-700 transition-colors p-2"
                >
                  <FaLinkedin size={24} />
                </a>

                {/* twitter */}
                <a
                  href="https://x.com/_stefniey"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black hover:text-gray-700 transition-colors p-2"
                >
                  <FaTwitter size={24} />
                </a>

                {/* email */}
                <a
                  href="mailto:stephaniealor7@email.com"
                  className="text-black hover:text-gray-700 transition-colors p-2"
                >
                  <HiOutlineMail size={24} />
                </a>
              </div>
            </div>

            {/* vs code alike */}
            <div className="mt-10 lg:mt-0 lg:w-1/2 mt-10 w-full rounded-xl shadow-xl overflow-hidden border border-gray-700 bg-gray-900">
              {/* traffic kight */}
              <div className="flex items-center px-4 h-10 bg-gray-800 border-b border-gray-700">
                <div className="flex space-x-2">
                  <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                  <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
                  <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                </div>
                <div className="ml-4 text-gray-300 font-mono text-sm">
                  Stefniey.js
                </div>
              </div>

              {/* editor area */}
              <div className="p-4 overflow-auto" style={{ minHeight: "350px" }}>
                <Editor
                  value={displayedCode + "|"}
                  onValueChange={() => {}}
                  highlight={(code) =>
                    Prism.highlight(
                      code,
                      Prism.languages.javascript,
                      "javascript",
                    )
                  }
                  padding={10}
                  style={{
                    fontFamily: '"Fira Code", monospace',
                    fontSize: 15,
                    color: "#00FF99",
                    whiteSpace: "pre-wrap",
                    minHeight: "100%",
                  }}
                  readOnly
                />
              </div>
            </div>

            {/* typing animation keyframes */}
            <style jsx>{`
              @keyframes typing {
                from {
                  width: 0;
                }
                to {
                  width: 18ch;
                }
              }
              .animate-[typing_3s_steps(30)_1] {
                overflow: hidden;
                white-space: nowrap;
              }
            `}</style>
          </section>

          {/* about section */}
          <section
            id="about"
            className="flex flex-col items-center justify-center text-center px-6 md:px-10 py-1 md:py-14  scroll-mt-24 lg:scroll-mt-20"
          >
            {/*title*/}
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-2 relative inline-block">
              About Me
              <span className="absolute left-0 -bottom-2 w-full h-1 bg-gradient-to-r from-black to-black-300 rounded-full"></span>
            </h2>

            {/* subheading */}
            <h3 className="text-2xl md:text-3xl text-black-300 font-semibold mb-6">
              Building Responsive & Interactive Web Experiences
              <span className="block w-20 h-1 bg-black mt-2 mx-auto rounded-full"></span>
            </h3>

            {/* paragraph  */}
            <div className="bg-white/60 backdrop-blur-md border border-white/40 rounded-2xl p-8 shadow-lg max-w-3xl">
              <p className="text-gray-700 text-lg md:text-xl leading-relaxed">
                I’m a frontend developer who loves turning ideas into smooth,
                interactive web experiences. I focus on writing clean,
                maintainable code that performs beautifully and feels intuitive
                for users. Every project is a chance to solve challenges
                creatively and deliver something people enjoy using. Whether
                it’s building responsive layouts, optimizing performance, or
                integrating modern tools, I aim to make every website both
                functional and delightful.
              </p>
            </div>
          </section>

          <section className="flex flex-col lg:flex-row items-start justify-between px-6 lg:px-20 py-10 ">
            {/* image */}
            <div className="mt-10 md:mt-0 flex justify-center lg:justify-start mb-10 lg:mb-0 mx-auto">
              <Image
                src="/xef.png"
                alt="Stefniey Profile"
                width={400}
                height={400}
                className="rounded-lg shadow-x "
              />
            </div>

            {/* skills */}
            <div className="lg:w-[60%] space-y-6">
              {/* skills */}
              <div className="pt-4">
                <h3 className="text-3xl font-semibold text-gray-800 mb-4">
                  Skills
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {/* design / UI / UX */}
                  <div className="flex items-start gap-4 bg-white/60 backdrop-blur-md border border-white/40 rounded-xl p-4 shadow-sm">
                    <FaPaintBrush className="text-indigo-600 mt-1" size={20} />
                    <div>
                      <p className="font-semibold text-gray-800">Design & UX</p>
                      <p className="text-gray-700 text-sm">
                        Translating ideas into thoughtful designs, providing
                        creative input, and ensuring interfaces are intuitive
                        and user-friendly.
                      </p>
                    </div>
                  </div>

                  {/* frontend D */}
                  <div className="flex items-start gap-4 bg-white/60 backdrop-blur-md border border-white/40 rounded-xl p-4 shadow-sm">
                    <FaCode className="text-blue-600 mt-1" size={20} />
                    <div>
                      <p className="font-semibold text-gray-800">
                        Frontend Development
                      </p>
                      <p className="text-gray-700 text-sm">
                        Writing clean, interactive code and integrating designs
                        into functional web applications.
                      </p>
                    </div>
                  </div>

                  {/*tools /workflow */}
                  <div className="flex items-start gap-4 bg-white/60 backdrop-blur-md border border-white/40 rounded-xl p-4 shadow-sm">
                    <FaTools className="text-gray-900 mt-1" size={20} />
                    <div>
                      <p className="font-semibold text-gray-800">
                        Tools & Workflow
                      </p>
                      <p className="text-gray-700 text-sm">
                        Using modern development and collaboration tools to
                        streamline workflow and ensure projects run smoothly.
                      </p>
                    </div>
                  </div>

                  {/*performance / Optimization */}
                  <div className="flex items-start gap-4 bg-white/60 backdrop-blur-md border border-white/40 rounded-xl p-4 shadow-sm">
                    <FaBolt className="text-yellow-500 mt-1" size={20} />
                    <div>
                      <p className="font-semibold text-gray-800">
                        Performance & Optimization
                      </p>
                      <p className="text-gray-700 text-sm">
                        Making applications fast, responsive, and efficient to
                        deliver seamless experiences for users.
                      </p>
                    </div>
                  </div>

                  {/* problem solving */}
                  <div className="flex items-start gap-4 bg-white/60 backdrop-blur-md border border-white/40 rounded-xl p-4 shadow-sm">
                    <FaLightbulb className="text-indigo-600 mt-1" size={20} />
                    <div>
                      <p className="font-semibold text-gray-800">
                        Problem Solving
                      </p>
                      <p className="text-gray-700 text-sm">
                        Tackling challenges creatively, debugging issues
                        effectively, and finding innovative solutions.
                      </p>
                    </div>
                  </div>

                  {/* communication &collaboration */}
                  <div className="flex items-start gap-4 bg-white/60 backdrop-blur-md border border-white/40 rounded-xl p-4 shadow-sm">
                    <FaUsers className="text-indigo-600 mt-1" size={20} />
                    <div>
                      <p className="font-semibold text-gray-800">
                        Collaboration
                      </p>
                      <p className="text-gray-700 text-sm">
                        Communicating clearly with team members and clients,
                        contributing to discussions, and ensuring smooth project
                        progress.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Technologies section */}
          <section id="services" className="py-5 lg:scroll-mt-20 scroll-mt-10">
            {/* Heading */}
            <div className="text-center mb-14">
              <h2 className="text-3xl font-bold text-black">
                Technologies & Tools
              </h2>
              <p className="px-4 lg:px-0 text-gray-600 mt-2 lg:w-[60%] mx-auto text-[18px] lg:text-[24px]">
                I work with a range of modern technologies and tools to build
                scalable, efficient, and visually appealing web applications.
                These are the tools I use day-to-day in my projects.
              </p>
            </div>

            {/* Cards Grid */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
              {techCards.map((card, i) => (
                <div
                  key={i}
                  className="group bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 flex flex-col gap-4"
                >
                  {/* Main content */}
                  <div className="flex items-center gap-3">
                    {card.icon}
                    <h3 className="text-xl font-semibold text-black">
                      {card.title}
                    </h3>
                  </div>

                  <p className="text-gray-700 text-sm leading-relaxed">
                    {card.text}
                  </p>

                  {/* Technologies */}
                  <div
                    className="
    flex flex-wrap gap-3 mt-4
    lg:opacity-0 lg:translate-y-2
    lg:group-hover:opacity-100 lg:group-hover:translate-y-0
    transition-all duration-300
  "
                  >
                    {card.technologies.map((tech, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 bg-black/5 px-3 py-1 rounded-full text-sm text-gray-800"
                      >
                        <span className="text-base">{tech.icon}</span>
                        <span>{tech.name}</span>
                      </div>
                    ))}
                  </div>
                  {/* Desktop hover hint */}
                  <span className="hidden lg:block text-xs text-gray-400 mt-2">
                    Hover to view technologies
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* projects section */}
          <section
            id="project"
            className="py-10 lg:py-20 lg:scroll-mt-20 scroll-mt-10"
          >
            {/* Heading */}
            <div className="text-center mb-14">
              <h2 className="text-3xl font-bold text-black">My Projects</h2>
              <p className="text-gray-600 mt-2 lg:w-[50%] mx-auto text-[18px] lg:text-[24px]">
                A collection of projects that demonstrate my skills, creativity,
                and how I turn ideas into tangible web experiences.
              </p>
            </div>

            {/* Cards Grid */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
              {projects.map(({ image, title, description, url }, i) => (
                <div
                  key={i}
                  className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 flex flex-col gap-4"
                >
                  <div className="relative w-full h-56 rounded-xl overflow-hidden">
                    <Image
                      src={image || "/placeholder.png"}
                      alt={title || "Project preview"}
                      fill
                      className="object-cover w-full h-full"
                    />
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-black mb-2">
                      {title || "Project Title"}
                    </h3>

                    <div className="flex items-start justify-between gap-4">
                      <p className="text-gray-700 text-sm leading-relaxed flex-1">
                        {description || "Brief project description goes here."}
                      </p>

                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-700 hover:text-black transition shrink-0"
                        aria-label="View project"
                      >
                        <ExternalLink size={18} />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* contact me  section */}
          <div id="contact" className="text-center scroll-mt-30 py-10 lg:py-0">
            <h2 className="text-3xl font-bold text-black">Contact Me</h2>
            <p className="px-10 lg:px-2 text-gray-600 mt-2 lg:w-[50%] mx-auto text-[18px] lg:text-[24px]">
              I’m open to new opportunities, collaborations, and conversations.
              Feel free to reach out and let’s see how we can work together.
            </p>
          </div>

          <section className="w-full flex items-center justify-center py-10 px-4 relative z-10">
            <div className="max-w-6xl w-full grid md:grid-cols-2 gap-6">
              {/* leftcard*/}
              <div className="bg-[#10141b] rounded-xl p-6 flex flex-col gap-5 shadow-lg border border-white/5">
                <h2 className="text-2xl font-semibold text-white">
                  Get In Touch
                </h2>
                <p className="text-gray-300">
                  I'm available for freelance projects, full-time opportunities,
                  and exciting collaborations. Whether you have a project in
                  mind or just want to chat about technology, I'd love to hear
                  from you!
                </p>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 bg-white/5 p-3 rounded-lg">
                    <Mail className="w-5 h-5 text-green-400" />
                    <span className="text-gray-300">
                      stephaniealor7@gmail.com
                    </span>
                  </div>
                  <div className="flex items-center gap-3 bg-white/5 p-3 rounded-lg">
                    <Phone className="w-5 h-5 text-yellow-400" />
                    <span className="text-gray-300">+234 816 519 5889</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white/5 p-3 rounded-lg">
                    <MapPin className="w-5 h-5 text-purple-400" />
                    <span className="text-gray-300">Lagos, Nigeria</span>
                  </div>
                </div>

                <div className="flex gap-3 pt-3">
                  <div className="flex gap-4 mt-6 relative z-10">
                    {[
                      {
                        icon: <FaGithub />,
                        link: "https://github.com/stefniey",
                      },
                      {
                        icon: <FaLinkedinIn />,
                        link: "https://www.linkedin.com/in/stephanie-alor-1b913624a/",
                      },
                      { icon: <FaTwitter />, link: "https://x.com/_stefniey" },
                    ].map((item, i) => (
                      <a
                        key={i}
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 flex items-center justify-center rounded-full
                                border border-white/10 text-gray-400
                                hover:border-emerald-400 hover:text-emerald-400
                                transition"
                      >
                        {item.icon}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* RIGHT CARD */}
              <div className="bg-[#10141b] rounded-xl p-6 shadow-lg border border-white/5">
                <h2 className="text-2xl font-semibold text-white">
                  Send Me a Message
                </h2>
                <p className="text-gray-400 text-sm mb-4">
                  I'll respond within 24 hours
                </p>

                <form
                  action="https://formspree.io/f/xpwawkqn"
                  method="POST"
                  className="space-y-4"
                >
                  <div className="flex gap-4">
                    <input
                      type="text"
                      name="name"
                      placeholder="Your name"
                      className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white outline-none"
                      required
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="your.email@example.com"
                      className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white outline-none"
                      required
                    />
                  </div>

                  <input
                    type="text"
                    name="subject"
                    placeholder="What's this about?"
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white outline-none"
                    required
                  />

                  <textarea
                    name="message"
                    placeholder="Tell me about your project or just say hello!"
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white h-32 resize-none outline-none"
                    required
                  />

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 bg-green-400/80 hover:bg-green-400 text-black font-medium py-3 rounded-lg transition"
                  >
                    <Send className="w-4 h-4" />
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </section>

          <Footer />
        </>
      )}
    </div>
  );
}

