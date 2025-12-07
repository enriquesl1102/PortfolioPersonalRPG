import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
// --- ICONOS SEGUROS (SOLO FA y SI COMUNES) ---
import { FaGithub, FaLinkedin, FaEnvelope, FaWatchmanMonitoring ,FaInstagram, FaFileDownload, FaGamepad, FaMicrochip, FaNetworkWired, FaDatabase, FaServer, FaIndustry, FaCode, FaTerminal, FaLaptopCode } from 'react-icons/fa'
import { SiCplusplus, SiC, SiPython, SiArduino ,SiLinux, SiGit, SiDocker, SiRaspberrypi, SiJavascript, SiReact, SiPlatformio } from "react-icons/si";

// --- TUS IMÁGENES ---
import imgSorpresa from './assets/images/avatar-sorpresa.png'
import imgNormal from './assets/images/avatar-normal.png'
import imgHablando from './assets/images/avatar-hablando.png'
import imgCantando from './assets/images/avatar-cantando.png'
import imgPosando from './assets/images/avatar-posando.png'
import imgJoven from './assets/images/avatar-joven.png'
import cvFile from './assets/CV_Enrique_Sanz.pdf'

// --- CONSTANTES JUEGO SNAKE ---
const GRID_SIZE = 20; 
const CELL_SIZE = 15; 
const GAME_SPEED = 100;

const getRandomFood = () => {
  const min = 1;
  const max = GRID_SIZE - 1;
  const x = Math.floor((Math.random() * (max - min + 1) + min) / 1) * CELL_SIZE;
  const y = Math.floor((Math.random() * (max - min + 1) + min) / 1) * CELL_SIZE;
  return { x, y };
}

const SnakeGame = ({ onClose }) => {
  const [snake, setSnake] = useState([{ x: CELL_SIZE * 5, y: CELL_SIZE * 5 }]);
  const [food, setFood] = useState(getRandomFood());
  const [direction, setDirection] = useState('RIGHT');
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(e.key)) e.preventDefault();
      switch (e.key) {
        case 'ArrowUp': if (direction !== 'DOWN') setDirection('UP'); break;
        case 'ArrowDown': if (direction !== 'UP') setDirection('DOWN'); break;
        case 'ArrowLeft': if (direction !== 'RIGHT') setDirection('LEFT'); break;
        case 'ArrowRight': if (direction !== 'LEFT') setDirection('RIGHT'); break;
        default: break;
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [direction]);

  useEffect(() => {
    if (gameOver) return;
    const moveSnake = () => {
      const newSnake = [...snake];
      const head = { ...newSnake[0] };

      switch (direction) {
        case 'UP': head.y -= CELL_SIZE; break;
        case 'DOWN': head.y += CELL_SIZE; break;
        case 'LEFT': head.x -= CELL_SIZE; break;
        case 'RIGHT': head.x += CELL_SIZE; break;
        default: break;
      }

      if (head.x < 0 || head.x >= GRID_SIZE * CELL_SIZE || head.y < 0 || head.y >= GRID_SIZE * CELL_SIZE || newSnake.some(s => s.x === head.x && s.y === head.y)) {
        setGameOver(true); return;
      }

      newSnake.unshift(head);
      if (head.x === food.x && head.y === food.y) {
        setFood(getRandomFood());
        setScore(score + 1);
      } else {
        newSnake.pop();
      }
      setSnake(newSnake);
    };
    const gameInterval = setInterval(moveSnake, GAME_SPEED);
    return () => clearInterval(gameInterval);
  }, [snake, direction, food, gameOver, score]);

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#ff4d4d' }}>
      <h2 style={{ margin: '0 0 10px 0', fontSize: '1.5rem' }}>SNAKE - Score: {score}</h2>
      <div style={{ position: 'relative', width: GRID_SIZE * CELL_SIZE, height: GRID_SIZE * CELL_SIZE, border: '2px solid #ff4d4d', backgroundColor: '#000' }}>
        {snake.map((s, i) => <div key={i} style={{ position: 'absolute', left: s.x, top: s.y, width: CELL_SIZE, height: CELL_SIZE, backgroundColor: '#ff4d4d', border: '1px solid #000' }} />)}
        <div style={{ position: 'absolute', left: food.x, top: food.y, width: CELL_SIZE, height: CELL_SIZE, backgroundColor: '#fff', borderRadius: '50%' }} />
        {gameOver && (
           <div style={{ position: 'absolute', top:0, left:0, width:'100%', height:'100%', background:'rgba(0,0,0,0.8)', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center' }}>
              <h3 style={{fontSize:'2rem', margin:'0'}}>GAME OVER</h3>
              <button onClick={onClose} style={{ border:'2px solid #ff4d4d', background:'transparent', color:'#ff4d4d', padding:'5px 10px', cursor:'pointer', fontFamily:'inherit', marginTop:'10px'}}>EXIT</button>
           </div>
        )}
      </div>
      <p style={{ fontSize: '0.8rem', marginTop: '10px', opacity: 0.7 }}>Use Arrow Keys</p>
      {!gameOver && <button onClick={onClose} style={{ marginTop:'15px', border:'1px solid #ff4d4d', background:'transparent', color:'#ff4d4d', padding:'5px 10px', cursor:'pointer', fontFamily:'inherit', fontSize:'0.8rem'}}>EXIT</button>}
    </div>
  );
};

// --- TRADUCCIONES ---
const translations = {
  en: {
    intro: "Wow! Didn't expect anyone around here!",
    presentation: "Let me introduce myself. I'm Quique Sanz, an electronic engineer focused on embedded software development!",
    menuTitle: "So, welcome to my portfolio! What do you want to know about me?",
    menu: { about: "> More about me", projects: "> My projects", skills: "> Tech Stack & Skills", contact: "> Contact me" },
    about: { 
        title: "The Story Behind the Code",
      p1: "Ever since I was little, my father always taught me that when something wasn't working, I couldn't just settle for replacing the broken gadget; he would make me find the root of the problem...",
      p2: "And that's how I started. By high school, I was already showing ease with electronics because of this, but it was then that I discovered programming, and a new world opened up to me. I started by learning C++ and Arduino, creating small projects, and, little by little... I even won an Arduino fair with my friend Daniel in the City of Arts and Sciences!",
      p3: "I've always loved learning new things, especially those that allow me to express my ideas. I also started getting interested in music and music production, where I formed my first serious project (GALOPE VISIÓN) with a team of up to 12 people. It was there that I learned what it means to have good organization, meet deadlines, and work as a coordinated team.",
      p4: "Nowadays, recently graduated with a degree in Industrial Electronics and Automatic Engineering from the Universitat Politècnica de València, my goal is to continue growing as an engineer, learning new technologies, and facing new challenges. My mind thinks big, and my dream is to create projects that transcend and leave their mark on time.",
      p5: "So, if you also love meeting new people and sharing ideas, don't hesitate to contact me if you want to chat about technology, projects, or anything else interesting!",
        back: "< Back to menu" 
    },
    skills: { title: "Technical Proficiency", tools: "Equipment & Tools", stats: "Skill Stats", back: "< Back to menu" },
    projects: { title: "Here are some of my recent works:", back: "< Back to menu" },
    contact: { title: "Let's build something together!", download: "DOWNLOAD CV", back: "< Back to menu" },
    skip: "[ SKIP INTRO ]"
  },
  es: {
    intro: "¡Vaya! ¡No esperaba a nadie por aquí!",
    presentation: "Déjame presentarme. ¡Soy Quique Sanz, un ingeniero electrónico enfocado en el desarrollo de software embebido!",
    menuTitle: "Bienvenido a mi portfolio. ¿Qué quieres saber sobre mí?",
    menu: { about: "> Más sobre mí", projects: "> Mis proyectos", skills: "> Skills y Tecnología", contact: "> Contáctame" },
    about: { 
        title: "Mi historia",
      p1: "Desde pequeño, mi padre siempre me enseñó a que cuando algo no funcionaba, no podía conformarme y reemplazar el cacharro roto, me hacía encontrar la raíz del problema...",
      p2: "Y así empecé. En el instituto ya demostraba soltura con la electrónica gracias a esto, pero fué entonces cuando descubrí la programación y se me abrió un mundo nuevo. Empecé aprendiendo C++ y Arduino, creando proyectos puequeños, y, pasito a pasito... hasta gané una feria de arduino junto mi amigo Daniel en la Ciudad de las Artes y las Ciencias!",
      p3: "Siempre me ha gustado aprender cosas nuevas, sobre todo cosas que permitan expresar mis ideas. También empecé a interesarme por la múisica y la producción musical, donde formé mi primer proyecto serio (GALOPE VISIÓN) con un equipo de hasta 12 personas. Fué ahí donde aprendí lo que es tener una buena organización, cumplir deadlines y trabajar en equipo de manera coordinada.",
      p4: "Hoy en día, recién graduado en Ingeniería Electrónica Industrial y Automática en la Universitat Politécnica de València, mi objetivo es seguir creciendo como ingeniero, aprendiendo nuevas tecnologías y enfrentándome a nuevos retos. Mi mente piensa en grande, y mi sueño es crear proyectos que trasciendan y dejen huella en el tiempo. ",
      p5: "Así que, si a tí también te encanta conocer a gente nueva y compartir ideas, no dudes en contactarme si quieres charlar sobre tecnología, proyectos o cualquier otra cosa interesante!",
        back: "< Volver al menú" 
    },
    skills: { title: "Competencia Técnica", tools: "Equipo y Herramientas", stats: "Estadísticas", back: "< Volver al menú" },
    projects: { title: "Aquí tienes algunos trabajos recientes:", back: "< Volver al menú" },
    contact: { title: "¡Construyamos algo juntos!", download: "DESCARGAR CV", back: "< Volver al menú" },
    skip: "[ SALTAR INTRO ]"
  }
};

const getProjects = (lang) => [
  { title: "DomusAI", tech: "ESP32 / MQTT / Python", desc: lang === 'en' ? "Smart home AI." : "IA domótica.", link: "https://github.com/enriquesl1102/DomusAI_Hardware" },
  { title: "Smart Home Hub", tech: "Raspberry Pi", desc: lang === 'en' ? "Work in progress..." : "En desarrollo...", link: "https://github.com" },
  { title: "Portfolio Adventure", tech: "React / Motion", desc: lang === 'en' ? "This website." : "Esta web.", link: "https://github.com" },
  { title: "PDI Drone", tech: "C++ / Arduino", desc: lang === 'en' ? "Work in progress..." : "En desarrollo...", link: "https://github.com" }
];

const getSkills = (lang) => [
  { name: "Teamwork", level: 8 }, { name: "Creativity", level: 9 }, { name: "Criteria", level: 8 }, { name: "Markdown", level: 7 }, { name: "LaTeX", level: 6 }, { name: "English", level: 8 }
];

// --- TECH STACK (SOLO ICONOS SEGUROS) ---
const techStack = {
  firmware: {
    title: "Firmware & Hardware",
    skills: [
      { name: "C", icon: <SiC /> }, { name: "C++", icon: <SiCplusplus /> },
      { name: "ESP32", icon: <FaMicrochip /> }, // FaMicrochip es seguro
      { name: "Arduino", icon: <SiArduino /> }, { name: "RPi", icon: <SiRaspberrypi /> },
      { name: "ModBus", icon: <FaNetworkWired /> }, { name: "I2C/SPI", icon: <FaMicrochip /> },
      { name: "UART", icon: <FaMicrochip /> }, { name: "Sensors", icon: <FaIndustry /> }, { name: "RTOS", icon: <FaWatchmanMonitoring/>}
    ]
  },
  software: {
    title: "Software & Cloud",
    skills: [
      { name: "Python", icon: <SiPython /> }, { name: "JS", icon: <SiJavascript /> },
      { name: "Ada", icon: <FaTerminal /> },
      { name: "React", icon: <SiReact /> }, { name: "SQL", icon: <FaDatabase /> },
      { name: "MQTT", icon: <FaNetworkWired /> }, { name: "JSON", icon: <FaCode /> },
      { name: "Git", icon: <SiGit /> }
    ]
  },
  devops: {
    title: "DevOps & Tools",
    skills: [
      { name: "Linux", icon: <SiLinux /> }, { name: "Docker", icon: <SiDocker /> },
      { name: "VS Code", icon: <FaTerminal /> }, {name: "Platformio", icon: <SiPlatformio/>} // FaTerminal es seguro
    ]
  }
};

// --- TYPEWRITER (REVISADO PARA SALTAR) ---
const Typewriter = ({ text, speed = 30 }) => {
  const [displayText, setDisplayText] = useState('');
  
  // Cuando cambia el texto, reseteamos
  useEffect(() => {
    setDisplayText('');
  }, [text]);

  useEffect(() => {
    // Si ya terminamos, no hacemos nada
    if (displayText.length >= text.length) return;

    const timer = setInterval(() => {
        setDisplayText((prev) => text.slice(0, prev.length + 1));
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed, displayText]);

  // Función para saltar al final
  const finish = (e) => {
    e.stopPropagation();
    setDisplayText(text);
  };

  return (
    <span onClick={finish} style={{ whiteSpace: 'pre-wrap', cursor: 'pointer' }} title="Clic para saltar">
      {displayText}
      {displayText.length < text.length && (
        <motion.span initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }} style={{ display: 'inline-block', color: '#ff4d4d', marginLeft: '2px', verticalAlign: 'baseline' }}>_</motion.span>
      )}
    </span>
  );
};

const SkillBar = ({ name, level }) => (
  <div style={{ marginBottom: '15px' }}>
    <div style={{ marginBottom: '5px', fontSize: '1.1rem' }}>{name}</div>
    <div style={{ display: 'flex', gap: '4px', justifyContent: 'center' }}> 
      {[...Array(10)].map((_, i) => (
        <motion.div key={i} initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: i * 0.05 }} style={{ width: '20px', height: '20px', border: '1px solid #ff4d4d', backgroundColor: i < level ? '#ff4d4d' : 'transparent', boxShadow: i < level ? '0 0 5px #ff4d4d' : 'none' }} />
      ))}
    </div>
  </div>
);

const NextButton = ({ onClick }) => (
  <motion.div onClick={onClick} initial={{ opacity: 0 }} animate={{ opacity: 1 }} whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 77, 77, 0.2)' }} whileTap={{ scale: 0.95 }} style={{ marginTop: '20px', cursor: 'pointer', color: '#ff4d4d', fontSize: '1.2rem', display: 'inline-flex', alignItems: 'center', border: '2px solid #ff4d4d', padding: '5px 15px', backgroundColor: 'rgba(255, 77, 77, 0.05)', fontFamily: 'inherit' }}>
    ▼ NEXT
  </motion.div>
);

const SocialLink = ({ icon, link }) => (
  <motion.a href={link} target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.2, color: '#ffffff', borderColor: '#ffffff' }} style={{ color: '#ff4d4d', fontSize: '2.5rem', border: '3px solid #ff4d4d', borderRadius: '10px', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', textDecoration: 'none', transition: 'color 0.3s' }}>
    {icon}
  </motion.a>
);

function App() {
  const [fase, setFase] = useState('intro');
  const [lang, setLang] = useState('en'); 
  const [easterEggCount, setEasterEggCount] = useState(0);
  const [showGame, setShowGame] = useState(false);
  const [isAvatarClicked, setIsAvatarClicked] = useState(false);

  const t = translations[lang]; 
  const currentProjects = getProjects(lang);
  const currentSkills = getSkills(lang);

  const handleNext = () => {
    if (fase === 'intro') setFase('presentation');
    else if (fase === 'presentation') setFase('menu');
  };

  const handleAvatarClick = () => {
    setIsAvatarClicked(true);
    setTimeout(() => setIsAvatarClicked(false), 300);
    if (fase === 'menu') {
      const newCount = easterEggCount + 1;
      setEasterEggCount(newCount);
      if (newCount >= 5) {
        setShowGame(true);
        setEasterEggCount(0);
      }
    }
  };

  useEffect(() => {
    let timer;
    if (!showGame) {
      if (fase === 'intro') timer = setTimeout(() => setFase('presentation'), 6000);
      else if (fase === 'presentation') timer = setTimeout(() => setFase('menu'), 9000);
    }
    return () => clearTimeout(timer);
  }, [fase, showGame]);

  const getAvatar = () => {
    if (isAvatarClicked) return imgSorpresa;
    if (fase === 'intro') return imgSorpresa;
    if (fase === 'presentation' || fase === 'projects' || fase === 'contact') return imgHablando; 
    return imgNormal; 
  };

  return (
    <>
      <div className="scanlines"></div>
      <div className="main-container">
        <div className="gameboy-console">
          <div className="gameboy-screen-bezel">
            <div className="gameboy-screen-lit" style={{ justifyContent: showGame ? 'center' : 'flex-start' }}>

              {showGame ? (
                <SnakeGame onClose={() => setShowGame(false)} />
              ) : (
                <>
                  <div style={{ position: 'absolute', top: '15px', left: '15px', zIndex: 100, display: 'flex', gap: '8px' }}>
                    <button onClick={() => setLang('en')} style={{ background: lang === 'en' ? 'rgba(255, 77, 77, 0.2)' : 'rgba(0,0,0,0.6)', color: lang === 'en' ? '#fff' : '#ff4d4d', border: '1px solid #ff4d4d', fontFamily: 'inherit', cursor: 'pointer', padding: '4px 8px', fontWeight: 'bold', fontSize: '0.8rem', borderRadius: '4px' }}>EN</button>
                    <button onClick={() => setLang('es')} style={{ background: lang === 'es' ? 'rgba(255, 77, 77, 0.2)' : 'rgba(0,0,0,0.6)', color: lang === 'es' ? '#fff' : '#ff4d4d', border: '1px solid #ff4d4d', fontFamily: 'inherit', cursor: 'pointer', padding: '4px 8px', fontWeight: 'bold', fontSize: '0.8rem', borderRadius: '4px' }}>ES</button>
                  </div>

                  {(fase === 'intro' || fase === 'presentation') && (
                    <motion.button initial={{ opacity: 0 }} animate={{ opacity: 0.7 }} whileHover={{ opacity: 1 }} onClick={() => setFase('menu')} style={{ position: 'absolute', top: '15px', right: '15px', zIndex: 100, background: 'rgba(0,0,0,0.6)', border: '1px solid #ff4d4d', color: '#ff4d4d', fontFamily: 'inherit', padding: '4px 8px', cursor: 'pointer', fontSize: '0.8rem', borderRadius: '4px' }}>
                      {t.skip}
                    </motion.button>
                  )}

                  {fase !== 'about' && fase !== 'skills' && (
                    <motion.div key={fase} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="avatar-container" onClick={handleAvatarClick} whileTap={{ scale: 0.98 }} style={{ cursor: 'pointer' }}>
                      <img src={getAvatar()} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                    </motion.div>
                  )}

                  <div className="content-wrapper" style={{ maxWidth: (fase === 'about' || fase === 'skills') ? '100%' : '600px', height: (fase === 'about' || fase === 'skills') ? '80vh' : 'auto' }}>
                    
                    {(fase === 'intro' || fase === 'presentation' || fase === 'menu') && (
                      <>
                        {fase === 'intro' && (
                          <div>
                            <h1 style={{ fontSize: '2.5rem', lineHeight: '1.2', margin: 0 }}><Typewriter text={t.intro} speed={30} /></h1>
                            <div style={{ textAlign: 'right', marginTop: '10px' }}><NextButton onClick={handleNext} /></div>
                          </div>
                        )}
                        {fase === 'presentation' && (
                          <div>
                            <h1 style={{ fontSize: '2rem', lineHeight: '1.3', margin: 0 }}><Typewriter speed={20} text={t.presentation} /></h1>
                            <div style={{ textAlign: 'right', marginTop: '10px' }}><NextButton onClick={handleNext} /></div>
                          </div>
                        )}
                        {fase === 'menu' && (
                          <div style={{ width: '100%' }}>
                            <h1 style={{ fontSize: '2rem', marginBottom: '30px', margin: 0 }}><Typewriter speed={30} text={t.menuTitle} /></h1>
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 0.5 }} className="menu-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '60px' }}>
                              <div className="menu-item" onClick={() => setFase('about')} style={{ cursor: 'pointer', fontSize: '1.5rem' }}>{t.menu.about}</div>
                              <div className="menu-item" onClick={() => setFase('projects')} style={{ cursor: 'pointer', fontSize: '1.5rem' }}>{t.menu.projects}</div>
                              <div className="menu-item" onClick={() => setFase('skills')} style={{ cursor: 'pointer', fontSize: '1.5rem' }}>{t.menu.skills}</div>
                              <div className="menu-item" onClick={() => setFase('contact')} style={{ cursor: 'pointer', fontSize: '1.5rem' }}>{t.menu.contact}</div>
                            </motion.div>
                          </div>
                        )}
                      </>
                    )}

                    {fase === 'skills' && (
                      <motion.div className="custom-scroll" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ height: '100%', overflowY: 'auto' }}>
                        <h1 style={{ fontSize: '2.5rem', marginBottom: '30px', borderBottom: '4px solid #ff4d4d' }}>{t.skills.title}</h1>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '60px', alignItems: 'start' }}>
                            <div style={{ flex: 1, minWidth: '300px' }}>
                              <h2 style={{ fontSize: '1.8rem', marginBottom: '20px' }}><Typewriter text={t.skills.tools} /></h2>
                              {Object.entries(techStack).map(([key, category], index) => (
                                <div key={key} style={{ marginBottom: '30px' }}>
                                  <h3 style={{ fontSize: '1.2rem', color: '#ff8888', marginBottom: '10px', textTransform: 'uppercase' }}>{category.title}</h3>
                                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(60px, 1fr))', gap: '15px' }}>
                                      {category.skills.map((tech, i) => (
                                        <motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: (index * 0.2) + (i * 0.05) }} whileHover={{ scale: 1.2, color: '#fff', borderColor: '#fff' }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '10px', border: '1px solid #ff4d4d', backgroundColor: 'rgba(255, 77, 77, 0.05)', borderRadius: '5px', cursor: 'help' }} title={tech.name}>
                                            <div style={{ fontSize: '1.8rem' }}>{tech.icon}</div>
                                            <span style={{ fontSize: '0.7rem', marginTop: '5px', textAlign: 'center' }}>{tech.name}</span>
                                        </motion.div>
                                      ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                            <div style={{ flex: 1, minWidth: '300px' }}>
                              <h2 style={{ fontSize: '1.8rem', marginBottom: '20px' }}><Typewriter text={t.skills.stats} speed={30} /></h2>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                  {currentSkills.map((skill, index) => (<SkillBar key={index} name={skill.name} level={skill.level} />))}
                              </div>
                            </div>
                        </div>
                        <div className="menu-item" onClick={() => setFase('menu')} style={{ cursor: 'pointer', fontSize: '1.5rem', marginTop: '40px', display: 'inline-block' }}>{t.skills.back}</div>
                      </motion.div>
                    )}

                    {fase === 'about' && (
                      <motion.div className="custom-scroll" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ height: '100%', overflowY: 'auto', paddingRight: '10px' }}>
                        <h1 style={{ fontSize: '3rem', marginBottom: '20px', borderBottom: '4px solid #ff4d4d' }}>{t.about.title}</h1>
                        <p style={{ fontSize: '1.2rem', lineHeight: '1.6', marginBottom: '40px' }}><Typewriter speed={20} text={t.about.p1} /></p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', alignItems: 'center', marginBottom: '50px' }}>
                          <motion.img src={imgJoven} initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} style={{ width: '300px', borderRadius: '10px', border: '4px solid #ff4d4d' }} />
                          <p style={{ fontSize: '1.2rem', flex: 1, minWidth: '200px' }}>{t.about.p2}</p>
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap-reverse', gap: '20px', alignItems: 'center', flexDirection: 'row-reverse', marginBottom: '50px' }}>
                          <motion.img src={imgCantando} initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} style={{ width: '300px', borderRadius: '10px', border: '4px solid #ff4d4d' }} />
                          <p style={{ fontSize: '1.2rem', flex: 1, minWidth: '200px' }}>{t.about.p3}</p>
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', alignItems: 'center', marginBottom: '50px' }}>
                          <motion.img src={imgPosando} initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} style={{ width: '300px', borderRadius: '10px', border: '4px solid #ff4d4d' }} />
                          <p style={{ fontSize: '1.2rem', flex: 1, minWidth: '200px' }}>{t.about.p4}</p>
                        </div>
                        <p style={{ fontSize: '1.2rem', lineHeight: '1.6', marginBottom: '40px' }}><Typewriter speed={20} text={t.about.p5} /></p>
                        <div className="menu-item" onClick={() => setFase('menu')} style={{ cursor: 'pointer', fontSize: '1.5rem', marginBottom: '50px' }}>{t.about.back}</div>
                      </motion.div>
                    )}

                    {fase === 'projects' && (
                      <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <h2 style={{ fontSize: '1.8rem', margin: '0 0 15px 0' }}><Typewriter text={t.projects.title} speed={20} /></h2>
                        <div className="custom-scroll" style={{ flex: 1, overflowY: 'auto', paddingRight: '10px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px', alignContent: 'start' }}>
                          {currentProjects.map((project, index) => (
                            <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + (index * 0.1) }} whileHover={{ scale: 1.03, backgroundColor: '#222', borderColor: '#fff' }} onClick={() => window.open(project.link, '_blank')} className="project-card" style={{ border: '2px solid #ff4d4d', padding: '15px', backgroundColor: 'rgba(255, 77, 77, 0.05)', position: 'relative' }}>
                              <div style={{ position: 'absolute', top: '10px', right: '10px', fontSize: '0.8rem', opacity: 0.7 }}>↗</div>
                              <h3 style={{ margin: '0 0 5px 0', fontSize: '1.2rem' }}>{project.title}</h3>
                              <span style={{ fontSize: '0.9rem', color: '#ff8888' }}>[{project.tech}]</span>
                              <p style={{ fontSize: '0.9rem', margin: '5px 0 0 0', opacity: 0.8 }}>{project.desc}</p>
                            </motion.div>
                          ))}
                        </div>
                        <div className="menu-item" onClick={() => setFase('menu')} style={{ cursor: 'pointer', fontSize: '1.5rem', marginTop: '15px' }}>{t.projects.back}</div>
                      </div>
                    )}

                    {fase === 'contact' && (
                      <div style={{ textAlign: 'center' }}>
                        <h1 style={{ fontSize: '2.5rem', marginBottom: '40px' }}><Typewriter text={t.contact.title} /></h1>
                        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap', marginBottom: '40px' }}>
                          <SocialLink link="https://github.com/enriquesl1102" icon={<FaGithub />} />
                          <SocialLink link="https://www.linkedin.com/in/enrique-sanz-l%C3%B3pez-2423a8346/" icon={<FaLinkedin />} />
                          <SocialLink link="mailto:enriquesl1102@gmail.com" icon={<FaEnvelope />} />
                        </motion.div>
                        <motion.a href={cvFile} download="CV_Enrique_Sanz.pdf" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} whileHover={{ scale: 1.05, backgroundColor: '#ff4d4d', color: '#000' }} style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '10px 20px', border: '2px solid #ff4d4d', color: '#ff4d4d', textDecoration: 'none', fontSize: '1.2rem', cursor: 'pointer', fontWeight: 'bold', borderRadius: '5px' }}>
                          <FaFileDownload /> {t.contact.download}
                        </motion.a>
                        <div style={{ marginTop: '50px' }}>
                          <div className="menu-item" onClick={() => setFase('menu')} style={{ cursor: 'pointer', fontSize: '1.5rem', display: 'inline-block' }}>{t.contact.back}</div>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div> 
          </div> 
        </div> 
      </div> 
    </>
  )
}

export default App