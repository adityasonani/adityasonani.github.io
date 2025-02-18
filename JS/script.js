const RESUME_LINK = "https://drive.google.com/file/d/1Rp_EM1DioCPwIwJ-rlzz3D96_K1Nivxg/view?usp=sharing";
const COMMANDS = {
  commands:
    'Supported commands: <span class="code">about</span>, <span class="code">skills</span>, <span class="code">education</span>, <span class="code">resume</span>, <span class="code">contact</span>, <span class="code">coding_profiles</span>.',
  about:
    "Hello World! <br>I'm Aditya Sonani. I'm a Software Engineer, competitive programmer and a problem solving enthusiast who writes code in Java, C++ and Python. I'm currently working as a Software Engineer at <a target='_blank' href='https://townhall.co/' class='success link '>Townhall (BookMyShow).</a>",
  skills:
    '<span class="code">Languages:</span> Java, C/C++, Python, Go<br><span class="code">Frameworks:</span> Spring Boot, Hibernate, Spring Data JPA, JUnit, Angular, Selenium <br><span class="code">Databases:</span> MySQL, PostgreSQL, MongoDB<br><span class="code">Tools:</span> Git, Github, BitBucket, GitLab, Postman',
  education:
    "Sinhgad College of Engineering, Pune University <br> Bachelor of Engineering — Information Technology <br> CGPA: 9.1/10",
  contact:
    "Number: <a href='tel:+919340542018' class='success link'>+919340542018</a><br> Email: <a href='mailto:adityasonani19@gmail.com' class='success link'>adityasonani19@gmail.com</a>",
  resume:
    `<a href='${RESUME_LINK}' target = '_blank' class='success link'>Click Here to View Resume</a>`,
  coding_profiles:
    "LeetCode: Top 9% (Rating: 1761) - <a target='_blank' href='https://leetcode.com/adityasonani/' class='success link '>adityasonani</a> <br>Codechef: 4 star rated (Rating: 1876) - <a target='_blank' href='https://codechef.com/users/adityasonani' class='success link'>adityasonani</a> <br>Codeforces: Specialist (Rating: 1404) - <a target='_blank' href='https://codeforces.com/profile/adityasonani' class='success link '>adityasonani</a> <br> GitHub:  <a target='_blank' href='https://github.com/adityasonani' class='success link '>adityasonani</a>",
};
var userInput, terminalOutput;

const app = () => {
  userInput = document.getElementById("userInput");
  terminalOutput = document.getElementById("terminalOutput");
  document.getElementById("dummyKeyboard").focus();
  const resumeElements = document.querySelectorAll(".resume a");
  resumeElements.forEach(el => {
      el.href = RESUME_LINK;
  });
};

const execute = (input) => {
  let output;
  input = input.toLowerCase();
  if (input.length === 0) {
    return;
  }
  output = `<div class="terminal-line"><span class="success">guest@terminal: </span> <span class="directory">~$</span> ${input}</div>`;
  if (!COMMANDS.hasOwnProperty(input)) {
    output += `<div class="terminal-line">no such command: ${input}</div>`;
    console.log("Oops! no such command");
  } else {
    output += COMMANDS[input];
  }

  terminalOutput.innerHTML = `${terminalOutput.innerHTML}<div class="terminal-line">${output}</div>`;
  terminalOutput.scrollTop = terminalOutput.scrollHeight;
};

const BLACKLISTED_KEYS = [
    "Alt", "Tab", "CapsLock", "Shift", "Control", "Meta",
    "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12"
];

const BLACKLISTED_KEY_CODES = [
    9, 20, 16, 17, 18, 91, 
    112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123
];
  
const key = (e) => {
    const input = userInput.innerHTML;

    if (isBlacklisted(e)) {
        console.log(`Ignored key: ${e.key}`);
        return;
    }

    console.log(e.key);

    if (isEnterKey(e)) {
        execute(input);
        userInput.innerHTML = "";
        return;
    }

    if (!isBackspaceOrDelete(e)) {
        userInput.innerHTML = input + e.key;
    }

    console.log(`${e.key} ${e.keyCode} ${userInput.innerHTML}`);
};

const isBlacklisted = (e) => {
    return BLACKLISTED_KEYS.includes(e.key) || BLACKLISTED_KEY_CODES.includes(e.keyCode);
};

const isEnterKey = (e) => {
    return e.key === "Enter" || e.key === "Return";
};

const isBackspaceOrDelete = (e) => {
    return e.key === "Backspace" || e.key === "Delete";
};

const backspace = (e) => {
  if (e.keyCode !== 8 && e.keyCode !== 46) {
    return;
  }
  userInput.innerHTML = userInput.innerHTML.slice(
    0,
    userInput.innerHTML.length - 1
  );
};

document.addEventListener("keydown", backspace);
// The keypress event is fired when a key that produces a character value is pressed down.
document.addEventListener("keydown", key);
// The DOMContentLoaded event fires when the initial HTML document has been completely loaded and parsed, without waiting
// for stylesheets, images, and subframes to finish loading.
document.addEventListener("DOMContentLoaded", app);
