/* =========================================================
   PARTY CONFIGURATION
========================================================= */

const hostName = "Aniruddh";
const guestName = "Divya";



/* =========================================================
   MAIN PARTY ELEMENTS
========================================================= */

const introScreen =
    document.getElementById("introScreen");

const enterBtn =
    document.getElementById("enterBtn");

const party =
    document.getElementById("party");

const danceBtn =
    document.getElementById("danceBtn");

const surpriseBtn =
    document.getElementById("surpriseBtn");

const gameBtn =
    document.getElementById("gameBtn");

const musicBtn =
    document.getElementById("musicBtn");

const lightsBtn =
    document.getElementById("lightsBtn");

const confettiContainer =
    document.getElementById("confettiContainer");

const peopleCount =
    document.getElementById("peopleCount");

const danceCount =
    document.getElementById("danceCount");

const partyScore =
    document.getElementById("partyScore");

const chatInput =
    document.getElementById("chatInput");

const sendMessage =
    document.getElementById("sendMessage");

const chatMessages =
    document.getElementById("chatMessages");



/* =========================================================
   AWARD ELEMENTS
========================================================= */

const surpriseModal =
    document.getElementById("surpriseModal");

const closeSurprise =
    document.getElementById("closeSurprise");

const claimPrize =
    document.getElementById("claimPrize");

const prizeAccepted =
    document.getElementById("prizeAccepted");



/* =========================================================
   DANCE ELEMENTS
========================================================= */

const danceModal =
    document.getElementById("danceModal");

const closeDance =
    document.getElementById("closeDance");

const danceLobby =
    document.getElementById("danceLobby");

const activeDance =
    document.getElementById("activeDance");

const joinDance =
    document.getElementById("joinDance");

const dancePraise =
    document.getElementById("dancePraise");

const dancePraiseDetail =
    document.getElementById("dancePraiseDetail");

const praiseDots =
    document.querySelectorAll(
        ".praise-dot"
    );



/* =========================================================
   GAME ELEMENTS
========================================================= */

const gameModal =
    document.getElementById("gameModal");

const closeGame =
    document.getElementById("closeGame");

const target =
    document.getElementById("target");

const gameArea =
    document.getElementById("gameArea");

const gameScore =
    document.getElementById("gameScore");

const gameTime =
    document.getElementById("gameTime");

const gameMessage =
    document.getElementById("gameMessage");

const retryGame =
    document.getElementById("retryGame");



/* =========================================================
   FIREWORK ELEMENTS
========================================================= */

const canvas =
    document.getElementById("fireworks");

const ctx =
    canvas.getContext("2d");



/* =========================================================
   PARTY STATE
========================================================= */

let dances = 0;

let score = 0;

let people = 1;

let musicPlaying = false;

let audioContext = null;

let lightsEnabled = true;



/* =========================================================
   DANCE PRAISE STATE
========================================================= */

let praiseIndex = 0;

let praiseTimer = null;


/*
 * Multiple independent compliments
 * so the same message does not repeat immediately.
 */

const dancePraises = [

    {
        title:
            "Divya, you look absolutely radiant tonight.",

        detail:
            "There is something effortlessly graceful about the way you move."
    },

    {
        title:
            "The whole room seems to have noticed you.",

        detail:
            "You have that rare presence that makes people look twice without even trying."
    },

    {
        title:
            "You make the dance floor look like it was designed for you.",

        detail:
            "Every movement feels poised, natural, and beautifully composed."
    },

    {
        title:
            "Elegance seems to come naturally to you.",

        detail:
            "There is confidence in your movement, but never anything forced."
    },

    {
        title:
            "Honestly, Divya, you are stealing the evening.",

        detail:
            "Aniruddh may have organised the party, but you have definitely become its highlight."
    },

    {
        title:
            "You have completely changed the atmosphere in here.",

        detail:
            "The dance floor somehow feels warmer, brighter, and more alive with you on it."
    },

    {
        title:
            "That is what effortless charm looks like.",

        detail:
            "You are carrying yourself with a quiet confidence that is impossible to miss."
    },

    {
        title:
            "You are making every step look beautiful.",

        detail:
            "There is a lovely balance between confidence, grace, and sheer joy in the way you dance."
    },

    {
        title:
            "If elegance had a signature move, this would be it.",

        detail:
            "You somehow manage to look completely relaxed while making every movement memorable."
    },

    {
        title:
            "You were clearly meant to be on this floor.",

        detail:
            "There is something wonderfully natural about watching you dance."
    },

    {
        title:
            "The VIP title is starting to make sense.",

        detail:
            "You are not simply part of the party anymore — you are one of its best moments."
    },

    {
        title:
            "Aniruddh might need to rename this his party.",

        detail:
            "Because right now, it looks suspiciously like Divya's evening."
    },

    {
        title:
            "You have that rare kind of presence people remember.",

        detail:
            "Beautiful, composed, confident, and completely yourself."
    },

    {
        title:
            "Even the music seems better with you dancing to it.",

        detail:
            "You are adding your own rhythm to the room, and somehow it fits perfectly."
    },

    {
        title:
            "There is something genuinely captivating about you tonight.",

        detail:
            "You make elegance look easy and happiness look beautiful."
    }

];



/* =========================================================
   GAME STATE
========================================================= */

let currentGameScore = 0;

let gameRunning = false;

let remainingTime = 20;

let gameTimer = null;

let targetMover = null;



/* =========================================================
   FIREWORK STATE
========================================================= */

let particles = [];



/* =========================================================
   INITIALIZATION
========================================================= */

resizeCanvas();

window.addEventListener(
    "resize",
    resizeCanvas
);



/* =========================================================
   ENTER PARTY
========================================================= */

enterBtn.addEventListener(
    "click",
    async () => {

        introScreen.classList.add(
            "hide"
        );


        party.classList.remove(
            "hidden"
        );


        createConfetti(220);


        launchFirework(
            window.innerWidth / 2,
            window.innerHeight / 2
        );


        try {

            await startAmbientMusic();

        } catch (error) {

            console.log(
                "Audio could not start:",
                error
            );

        }


        setTimeout(
            () => {

                addChatMessage(
                    hostName,
                    `Welcome to the party, ${guestName}! 🎉`
                );

            },
            800
        );


        setTimeout(
            () => {

                addChatMessage(
                    hostName,
                    "I told you this party was going to be good 😎"
                );

            },
            1800
        );


        setTimeout(
            () => {

                addChatMessage(
                    "DJ",
                    `${guestName} has officially entered the party! 🔥`
                );

            },
            2800
        );

    }
);



/* =========================================================
   CONFETTI
========================================================= */

function createConfetti(
    amount = 50
) {

    for (
        let i = 0;
        i < amount;
        i++
    ) {

        const confetti =
            document.createElement("div");


        confetti.style.position =
            "fixed";


        confetti.style.width =
            Math.random() * 8 +
            4 +
            "px";


        confetti.style.height =
            Math.random() * 15 +
            5 +
            "px";


        confetti.style.left =
            Math.random() * 100 +
            "vw";


        confetti.style.top =
            Math.random() * -100 +
            "px";


        confetti.style.background =
            getRandomColor();


        confetti.style.transform =
            `rotate(${Math.random() * 360}deg)`;


        confetti.style.zIndex =
            "40";


        confetti.style.pointerEvents =
            "none";


        confettiContainer.appendChild(
            confetti
        );


        const duration =
            Math.random() * 4 +
            3;


        confetti.animate(

            [
                {
                    transform:
                        "translate(0, 0) rotate(0deg)"
                },

                {
                    transform:
                        `translate(
                            ${Math.random() * 200 - 100}px,
                            110vh
                        )
                        rotate(720deg)`
                }
            ],

            {
                duration:
                    duration * 1000,

                iterations:
                    Infinity
            }

        );

    }

}



/* =========================================================
   RANDOM COLOR
========================================================= */

function getRandomColor() {

    const colors = [

        "#ff00cc",
        "#00eaff",
        "#ffd500",
        "#7a00ff",
        "#00ff88",
        "#ffffff",
        "#ff4d00"

    ];


    return colors[
        Math.floor(
            Math.random() *
            colors.length
        )
    ];

}



/* =========================================================
   DANCE BUTTON
========================================================= */

danceBtn.addEventListener(
    "click",
    () => {

        danceModal.classList.remove(
            "hidden"
        );


        showDanceLobby();


        addChatMessage(
            "DJ",
            "The dance floor is ready for Divya. ✨"
        );

    }
);



/* =========================================================
   SHOW DANCE LOBBY
========================================================= */

function showDanceLobby() {

    danceLobby.classList.remove(
        "hidden"
    );


    activeDance.classList.add(
        "hidden"
    );


    stopPraiseRotation();

}



/* =========================================================
   JOIN DANCE
========================================================= */

joinDance.addEventListener(
    "click",
    () => {

        danceLobby.classList.add(
            "hidden"
        );


        activeDance.classList.remove(
            "hidden"
        );


        dances++;


        danceCount.textContent =
            dances;


        score += 10;


        partyScore.textContent =
            score;


        createConfetti(35);


        launchFirework(
            window.innerWidth * 0.5,
            window.innerHeight * 0.35
        );


        playBeat();


        startPraiseRotation();


        addChatMessage(
            hostName,
            "Come on Divya, the floor is yours. 💃"
        );


        addChatMessage(
            "DJ",
            "And somehow, the entire room just got more elegant. ✨"
        );

    }
);



/* =========================================================
   START PRAISE ROTATION
========================================================= */

function startPraiseRotation() {

    stopPraiseRotation();


    praiseIndex = 0;


    showPraise(
        praiseIndex
    );


    praiseTimer =
        setInterval(
            () => {

                praiseIndex =
                    (praiseIndex + 1) %
                    dancePraises.length;


                showPraise(
                    praiseIndex
                );

            },
            4200
        );

}



/* =========================================================
   SHOW PRAISE
========================================================= */

function showPraise(
    index
) {

    const praise =
        dancePraises[index];


    /*
     * Restart CSS animation.
     */

    dancePraise.style.animation =
        "none";

    dancePraiseDetail.style.animation =
        "none";


    void dancePraise.offsetWidth;
    void dancePraiseDetail.offsetWidth;


    dancePraise.textContent =
        praise.title;


    dancePraiseDetail.textContent =
        praise.detail;


    dancePraise.style.animation =
        "praiseFade 1s ease";


    dancePraiseDetail.style.animation =
        "praiseFade 1s ease";


    praiseDots.forEach(
        (dot, dotIndex) => {

            dot.classList.toggle(
                "active",
                dotIndex ===
                index %
                praiseDots.length
            );

        }
    );

}



/* =========================================================
   STOP PRAISE ROTATION
========================================================= */

function stopPraiseRotation() {

    if (
        praiseTimer
    ) {

        clearInterval(
            praiseTimer
        );

        praiseTimer =
            null;

    }

}



/* =========================================================
   CLOSE DANCE
========================================================= */

closeDance.addEventListener(
    "click",
    () => {

        stopPraiseRotation();


        danceModal.classList.add(
            "hidden"
        );


        showDanceLobby();

    }
);



/* =========================================================
   SURPRISE / AWARD
========================================================= */

surpriseBtn.addEventListener(
    "click",
    () => {

        surpriseModal.classList.remove(
            "hidden"
        );


        prizeAccepted.classList.add(
            "hidden"
        );


        claimPrize.classList.remove(
            "hidden"
        );


        createConfetti(45);


        launchFirework(
            window.innerWidth * 0.3,
            window.innerHeight * 0.25
        );


        launchFirework(
            window.innerWidth * 0.7,
            window.innerHeight * 0.25
        );


        addChatMessage(
            hostName,
            "Divya, I think you deserve a very special award... 🏆"
        );

    }
);



/* =========================================================
   CLAIM AWARD
========================================================= */

claimPrize.addEventListener(
    "click",
    () => {

        claimPrize.classList.add(
            "hidden"
        );


        prizeAccepted.classList.remove(
            "hidden"
        );


        createConfetti(120);


        launchFirework(
            window.innerWidth * 0.5,
            window.innerHeight * 0.3
        );


        addChatMessage(
            hostName,
            "Congratulations, Master Chef Divya! 🏆"
        );


        addChatMessage(
            "DJ",
            "The dry fruit laddu award has officially been accepted! 👑"
        );

    }
);



/* =========================================================
   CLOSE AWARD
========================================================= */

closeSurprise.addEventListener(
    "click",
    () => {

        surpriseModal.classList.add(
            "hidden"
        );

    }
);



/* =========================================================
   SIMULATED PARTY GUESTS
========================================================= */

setInterval(
    () => {

        if (
            document.visibilityState !==
            "visible"
        ) {

            return;

        }


        people++;


        peopleCount.textContent =
            people;


        const names = [

            "Rahul",
            "Priya",
            "Sam",
            "Aman",
            "Riya",
            "DJ",
            "Someone"

        ];


        const name =
            names[
                Math.floor(
                    Math.random() *
                    names.length
                )
            ];


        const messages = [

            "Just joined! 🎉",
            "WHERE IS THE MUSIC?",
            "LET'S GOOOO!",
            "🔥🔥🔥",
            "Who's dancing?",
            "This party is insane!",
            "I brought snacks 🍕",
            "TURN IT UP!",
            `Where's ${guestName}? 👀`,
            "The party is getting crazy!"

        ];


        const message =
            messages[
                Math.floor(
                    Math.random() *
                    messages.length
                )
            ];


        addChatMessage(
            name,
            message
        );

    },
    7000
);



/* =========================================================
   CHAT
========================================================= */

sendMessage.addEventListener(
    "click",
    sendChat
);


chatInput.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Enter"
        ) {

            sendChat();

        }

    }
);



function sendChat() {

    const text =
        chatInput.value.trim();


    if (!text) {

        return;

    }


    addChatMessage(
        guestName,
        text
    );


    chatInput.value =
        "";


    setTimeout(
        () => {

            const responses = [

                "🔥 FACTS!",
                "😂 EXACTLY!",
                "LET'S GOOOO!",
                "🪩 AGREED!",
                "💃 Dance instead!",
                "🎉 PARTY TIME!",
                `${guestName} gets it! 😎`,
                "Aniruddh approves! ✅"

            ];


            addChatMessage(
                hostName,
                responses[
                    Math.floor(
                        Math.random() *
                        responses.length
                    )
                ]
            );

        },
        700
    );

}



/* =========================================================
   ADD CHAT MESSAGE
========================================================= */

function addChatMessage(
    username,
    text
) {

    const message =
        document.createElement("div");


    message.className =
        "message";


    message.innerHTML = `
        <span>
            ${escapeHTML(username)}:
        </span>
        ${escapeHTML(text)}
    `;


    chatMessages.appendChild(
        message
    );


    chatMessages.scrollTop =
        chatMessages.scrollHeight;

}



/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeHTML(
    text
) {

    const div =
        document.createElement("div");


    div.textContent =
        text;


    return div.innerHTML;

}



/* =========================================================
   AUDIO
========================================================= */

async function startAmbientMusic() {

    if (!audioContext) {

        const AudioContext =
            window.AudioContext ||
            window.webkitAudioContext;


        if (!AudioContext) {

            throw new Error(
                "Web Audio API is not supported."
            );

        }


        audioContext =
            new AudioContext();

    }


    if (
        audioContext.state ===
        "suspended"
    ) {

        await audioContext.resume();

    }


    musicPlaying =
        true;


    musicBtn.textContent =
        "🔊 Music ON";


    playLoop();

}



/* =========================================================
   PLAY BEAT
========================================================= */

function playBeat() {

    if (
        !audioContext ||
        !musicPlaying
    ) {

        return;

    }


    const oscillator =
        audioContext.createOscillator();


    const gain =
        audioContext.createGain();


    oscillator.type =
        "sine";


    oscillator.frequency.value =
        90;


    gain.gain.setValueAtTime(
        0.15,
        audioContext.currentTime
    );


    gain.gain.exponentialRampToValueAtTime(
        0.001,
        audioContext.currentTime + 0.25
    );


    oscillator.connect(
        gain
    );


    gain.connect(
        audioContext.destination
    );


    oscillator.start();


    oscillator.stop(
        audioContext.currentTime +
        0.25
    );

}



/* =========================================================
   MUSIC LOOP
========================================================= */

function playLoop() {

    if (
        !musicPlaying
    ) {

        return;

    }


    const notes = [

        261.63,
        329.63,
        392.00,
        329.63,

        293.66,
        349.23,
        440.00,
        349.23

    ];


    let index = 0;


    const interval =
        setInterval(
            () => {

                if (
                    !musicPlaying
                ) {

                    clearInterval(
                        interval
                    );

                    return;

                }


                playNote(
                    notes[index]
                );


                index =
                    (index + 1) %
                    notes.length;

            },
            350
        );

}



/* =========================================================
   PLAY NOTE
========================================================= */

function playNote(
    frequency
) {

    if (
        !audioContext
    ) {

        return;

    }


    const oscillator =
        audioContext.createOscillator();


    const gain =
        audioContext.createGain();


    oscillator.type =
        "triangle";


    oscillator.frequency.value =
        frequency;


    gain.gain.setValueAtTime(
        0.0001,
        audioContext.currentTime
    );


    gain.gain.exponentialRampToValueAtTime(
        0.08,
        audioContext.currentTime + 0.02
    );


    gain.gain.exponentialRampToValueAtTime(
        0.0001,
        audioContext.currentTime + 0.3
    );


    oscillator.connect(
        gain
    );


    gain.connect(
        audioContext.destination
    );


    oscillator.start();


    oscillator.stop(
        audioContext.currentTime +
        0.3
    );

}



/* =========================================================
   MUSIC BUTTON
========================================================= */

musicBtn.addEventListener(
    "click",
    async () => {

        if (
            !audioContext
        ) {

            try {

                await startAmbientMusic();

            } catch (error) {

                console.log(
                    "Audio unavailable:",
                    error
                );

            }

            return;

        }


        if (
            audioContext.state ===
            "suspended"
        ) {

            await audioContext.resume();

        }


        musicPlaying =
            !musicPlaying;


        if (
            musicPlaying
        ) {

            musicBtn.textContent =
                "🔊 Music ON";


            playLoop();

        } else {

            musicBtn.textContent =
                "🔇 Music OFF";

        }

    }
);



/* =========================================================
   LIGHTS
========================================================= */

lightsBtn.addEventListener(
    "click",
    () => {

        lightsEnabled =
            !lightsEnabled;


        document
            .querySelectorAll(
                ".spotlight"
            )
            .forEach(
                light => {

                    light.style.opacity =
                        lightsEnabled
                            ? "0.25"
                            : "0";

                }
            );


        lightsBtn.textContent =
            lightsEnabled
                ? "💡 Lights"
                : "🌑 Lights";

    }
);



/* =========================================================
   FIREWORKS
========================================================= */

function resizeCanvas() {

    canvas.width =
        window.innerWidth;

    canvas.height =
        window.innerHeight;

}



function launchFirework(
    x,
    y
) {

    for (
        let i = 0;
        i < 60;
        i++
    ) {

        const angle =
            Math.random() *
            Math.PI *
            2;


        const velocity =
            Math.random() *
            6 +
            2;


        particles.push({

            x:
                x,

            y:
                y,

            vx:
                Math.cos(angle) *
                velocity,

            vy:
                Math.sin(angle) *
                velocity,

            life:
                1,

            decay:
                Math.random() *
                    0.02 +
                0.015,

            size:
                Math.random() *
                    3 +
                1

        });

    }

}



function animateFireworks() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    particles =
        particles.filter(
            particle =>
                particle.life > 0
        );


    particles.forEach(
        particle => {

            particle.x +=
                particle.vx;


            particle.y +=
                particle.vy;


            particle.vy +=
                0.05;


            particle.life -=
                particle.decay;


            ctx.globalAlpha =
                particle.life;


            ctx.fillStyle =
                getRandomColor();


            ctx.beginPath();


            ctx.arc(
                particle.x,
                particle.y,
                particle.size,
                0,
                Math.PI * 2
            );


            ctx.fill();

        }
    );


    ctx.globalAlpha =
        1;


    requestAnimationFrame(
        animateFireworks
    );

}


animateFireworks();



/* =========================================================
   RANDOM FIREWORKS
========================================================= */

setInterval(
    () => {

        if (
            document.visibilityState !==
            "visible"
        ) {

            return;

        }


        launchFirework(

            Math.random() *
                window.innerWidth,

            Math.random() *
                window.innerHeight *
                0.5

        );

    },
    5000
);



/* =========================================================
   MINI GAME
========================================================= */

gameBtn.addEventListener(
    "click",
    startGame
);



/* =========================================================
   START GAME
========================================================= */

function startGame() {

    gameModal.classList.remove(
        "hidden"
    );


    currentGameScore =
        0;


    remainingTime =
        20;


    gameRunning =
        true;


    gameScore.textContent =
        "0";


    gameTime.textContent =
        "20";


    gameMessage.textContent =
        "Catch it! 🔥";


    retryGame.classList.add(
        "hidden"
    );


    target.style.display =
        "block";


    target.style.width =
        "38px";


    target.style.height =
        "38px";


    moveTarget();


    clearInterval(
        targetMover
    );


    clearInterval(
        gameTimer
    );


    targetMover =
        setInterval(
            () => {

                if (
                    !gameRunning
                ) {

                    return;

                }


                moveTarget();

            },
            600
        );


    gameTimer =
        setInterval(
            () => {

                if (
                    !gameRunning
                ) {

                    return;

                }


                remainingTime--;


                gameTime.textContent =
                    remainingTime;


                if (
                    remainingTime <= 0
                ) {

                    endGame();

                }

            },
            1000
        );

}



/* =========================================================
   TARGET CLICK
========================================================= */

target.addEventListener(
    "click",
    event => {

        event.stopPropagation();


        if (
            !gameRunning
        ) {

            return;

        }


        currentGameScore++;


        score += 5;


        partyScore.textContent =
            score;


        gameScore.textContent =
            currentGameScore;


        createConfetti(8);


        playBeat();


        if (
            currentGameScore >= 5
        ) {

            target.style.width =
                "34px";

            target.style.height =
                "34px";

        }


        if (
            currentGameScore >= 10
        ) {

            target.style.width =
                "30px";

            target.style.height =
                "30px";

        }


        if (
            currentGameScore >= 15
        ) {

            target.style.width =
                "26px";

            target.style.height =
                "26px";

        }


        if (
            currentGameScore === 8
        ) {

            changeTargetSpeed(
                450
            );

        }


        if (
            currentGameScore === 15
        ) {

            changeTargetSpeed(
                350
            );

        }


        if (
            currentGameScore === 5
        ) {

            gameMessage.textContent =
                "Okay Divya, you're getting good! 🔥";

        }


        if (
            currentGameScore === 10
        ) {

            gameMessage.textContent =
                "Aniruddh is impressed 😎";


            addChatMessage(
                hostName,
                "Okay Divya... you're actually good at this 😂"
            );

        }


        if (
            currentGameScore === 15
        ) {

            gameMessage.textContent =
                "THIS IS GETTING SERIOUS! 🚨";


            createConfetti(30);

        }


        if (
            currentGameScore === 20
        ) {

            gameMessage.textContent =
                "DIVYA HAS BECOME UNSTOPPABLE! 👑";


            launchFirework(
                window.innerWidth * 0.3,
                window.innerHeight * 0.3
            );


            launchFirework(
                window.innerWidth * 0.7,
                window.innerHeight * 0.3
            );

        }


        moveTarget();

    }
);



/* =========================================================
   CHANGE TARGET SPEED
========================================================= */

function changeTargetSpeed(
    speed
) {

    clearInterval(
        targetMover
    );


    targetMover =
        setInterval(
            () => {

                if (
                    !gameRunning
                ) {

                    return;

                }


                moveTarget();

            },
            speed
        );

}



/* =========================================================
   MOVE TARGET
========================================================= */

function moveTarget() {

    if (
        !gameRunning
    ) {

        return;

    }


    const areaWidth =
        gameArea.clientWidth;


    const areaHeight =
        gameArea.clientHeight;


    const targetWidth =
        target.offsetWidth;


    const targetHeight =
        target.offsetHeight;


    const padding =
        15;


    const minX =
        targetWidth / 2 +
        padding;


    const maxX =
        areaWidth -
        targetWidth / 2 -
        padding;


    const minY =
        targetHeight / 2 +
        padding;


    const maxY =
        areaHeight -
        targetHeight / 2 -
        padding;


    const randomX =
        Math.random() *
            (maxX - minX) +
        minX;


    const randomY =
        Math.random() *
            (maxY - minY) +
        minY;


    target.style.left =
        randomX +
        "px";


    target.style.top =
        randomY +
        "px";

}



/* =========================================================
   END GAME
========================================================= */

function endGame() {

    gameRunning =
        false;


    clearInterval(
        gameTimer
    );


    clearInterval(
        targetMover
    );


    target.style.display =
        "none";


    gameMessage.innerHTML = `
        🎉 Time's up, Divya!
        <br>
        You scored
        <strong>${currentGameScore}</strong>
        points.
    `;


    retryGame.classList.remove(
        "hidden"
    );


    createConfetti(60);


    launchFirework(
        window.innerWidth * 0.5,
        window.innerHeight * 0.3
    );


    addChatMessage(
        "DJ",
        `Time's up! Divya scored ${currentGameScore}! 🎮`
    );

}



/* =========================================================
   RETRY
========================================================= */

retryGame.addEventListener(
    "click",
    () => {

        startGame();

    }
);



/* =========================================================
   CLOSE GAME
========================================================= */

closeGame.addEventListener(
    "click",
    () => {

        gameRunning =
            false;


        clearInterval(
            gameTimer
        );


        clearInterval(
            targetMover
        );


        target.style.display =
            "block";


        target.style.width =
            "38px";


        target.style.height =
            "38px";


        retryGame.classList.add(
            "hidden"
        );


        gameModal.classList.add(
            "hidden"
        );

    }
);



/* =========================================================
   BACKGROUND CLICK = FIREWORK
========================================================= */

document.addEventListener(
    "click",
    event => {

        if (
            event.target.closest(
                "button"
            )
        ) {

            return;

        }


        if (
            event.target.closest(
                ".chat-box"
            )
        ) {

            return;

        }


        if (
            event.target.closest(
                ".modal"
            )
        ) {

            return;

        }


        launchFirework(
            event.clientX,
            event.clientY
        );

    }
);