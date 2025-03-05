function toggleSidebar() {
    const sidebar = document.getElementById("mughader_mobile_sidebar");
    const overlay = document.getElementById("mughader_sidebar_overlay");

    if (sidebar.style.right === "0px") {
        closeSidebar();
    } else {
        sidebar.style.right = "0px"; // Show sidebar
        overlay.classList.add("active"); // Show overlay
    }
}

function closeSidebar() {
    const sidebar = document.getElementById("mughader_mobile_sidebar");
    const overlay = document.getElementById("mughader_sidebar_overlay");

    sidebar.style.right = "-250px"; // Hide sidebar
    overlay.classList.remove("active"); // Hide overlay
}









/* First Section Background Design */
const canvas = document.getElementById("neon_canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const stars = [];
const lanterns = [];
const starCount = 80;
const lanternCount = 4; // Set to 4 lanterns

// Function to create glowing stars
function createStars() {
    for (let i = 0; i < starCount; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2 + 1,
            opacity: Math.random() * 0.5 + 0.5,
            speed: Math.random() * 0.2 + 0.1
        });
    }
}

// Function to create 4 evenly spaced lanterns at the bottom
function createLanterns() {
    for (let i = 0; i < lanternCount; i++) {
        lanterns.push({
            x: (canvas.width / (lanternCount + 1)) * (i + 1), // Even spacing
            y: canvas.height * 0.85, // Positioned at bottom quarter
            swing: Math.random() * 10 + 10, // Swing range
            angle: Math.random() * Math.PI
        });
    }
}

// Function to draw a crescent moon at the top
function drawCrescentMoon() {
    const moonX = canvas.width - 150;
    const moonY = 60; // Keep it at the top
    const radius = 50;

    ctx.beginPath();
    ctx.arc(moonX, moonY, radius, Math.PI * 0.2, Math.PI * 1.8, false);
    ctx.arc(moonX + 20, moonY - 5, radius * 0.8, Math.PI * 1.2, Math.PI * 2.6, true);
    ctx.fillStyle = "#FFD700"; // Golden moon color
    ctx.shadowBlur = 20;
    ctx.shadowColor = "#FFD700";
    ctx.fill();
}

// Function to draw glowing stars
function drawStars() {
    stars.forEach((star) => {
        ctx.globalAlpha = star.opacity;
        ctx.fillStyle = "#FFD700"; // Gold color
        ctx.shadowBlur = 10;
        ctx.shadowColor = "#FFD700";
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
        star.opacity += star.speed * (Math.random() > 0.5 ? 1 : -1);
        if (star.opacity < 0.3) star.opacity = 0.3;
        if (star.opacity > 1) star.opacity = 1;
    });
}

// Function to draw 4 lanterns at the bottom with smooth swinging
function drawLanterns() {
    lanterns.forEach((lantern) => {
        ctx.globalAlpha = 1; // No flickering
        ctx.fillStyle = "#FFA500"; // Warm orange glow
        ctx.shadowBlur = 15;
        ctx.shadowColor = "#FFA500";

        // Swinging movement
        let swingX = lantern.x + Math.sin(lantern.angle) * lantern.swing;

        ctx.beginPath();
        ctx.rect(swingX - 10, lantern.y, 20, 40);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(swingX, lantern.y + 40, 10, 0, Math.PI * 2);
        ctx.fill();

        // Update lantern position
        lantern.angle += 0.02; // Same speed, smooth swing
    });
}

// Main animation loop
function animateCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawCrescentMoon();
    drawStars();
    drawLanterns();

    requestAnimationFrame(animateCanvas);
}

// Initialize elements and start animation
createStars();
createLanterns();
animateCanvas();



























let chatbotIcon = document.getElementById("mughader_chatbot_icon");
let chatSidebar = document.getElementById("mughader_chat_sidebar");
let closeChat = document.getElementById("mughader_close_chat");
let sendBtn = document.getElementById("mughader_send_btn");
let messageBar = document.getElementById("mughader_message_bar");
let messageBox = document.querySelector(".mughader_message_box");
let chatOverlay = document.getElementById("mughader_chat_overlay");

let API_URL = "https://api.openai.com/v1/chat/completions";
let API_KEY = "sk-***76cA";

/* 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 */

// Check if the user is on a mobile device
const isMobileDevice = /Mobi|Android/i.test(navigator.userAgent);

// Open Slider if ai bot icon is clicked
chatbotIcon.addEventListener("click", () => {
    chatSidebar.classList.add("active");
    chatOverlay.classList.add("active");
});

// Close Sidebar if close slider button is clicked
closeChat.addEventListener("click", () => {
    chatSidebar.classList.remove("active");
    chatOverlay.classList.remove("active");
});

// Close Sidebar if Overlay is Clicked
chatOverlay.addEventListener("click", () => {
    chatSidebar.classList.remove("active");
    chatOverlay.classList.remove("active");
});

// Send Message Function
sendBtn.onclick = function () {
    if (messageBar.value.trim() !== "") {
        let UserTypedMessage = messageBar.value.trim();
        messageBar.value = "";

        let userMessage = `
                <div class="chat message">
                    <span>${UserTypedMessage}</span>
                </div>
            `;

        let botResponse = `
                <div class="chat response">
                    <img src="مكتب-سياحي/مكتب-سياحي-بحريني.webp">
                    <span class="new">...</span>
                </div>
            `;

        messageBox.insertAdjacentHTML("beforeend", userMessage);

        setTimeout(() => {
            messageBox.insertAdjacentHTML("beforeend", botResponse);

            let requestOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${API_KEY}`
                },
                body: JSON.stringify({
                    model: "gpt-3.5-turbo",
                    messages: [{ role: "user", content: UserTypedMessage }]
                })
            };

            fetch(API_URL, requestOptions)
                .then((res) => res.json())
                .then((data) => {
                    let ChatBotResponse = document.querySelector(".response .new");
                    ChatBotResponse.innerHTML = data.choices[0].message.content;
                    ChatBotResponse.classList.remove("new");
                })
                .catch(() => {
                    let ChatBotResponse = document.querySelector(".response .new");
                    ChatBotResponse.innerHTML = "الموقع مازال في وضع التجربة";
                });
        }, 100);



        document.getElementById("mughader_message_bar").style.height = "40px"; // Reset to default height;
    }
};

// Attach Send Message Function to Enter Key (for Desktop)
if (!isMobileDevice) {
    messageBar.addEventListener("keydown", (event) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault(); // Prevent default behavior
            sendBtn.click();
        } else if (event.key === "Enter" && event.shiftKey) {
            event.preventDefault(); // Allow Shift+Enter to insert a new line
            const cursorPosition = messageBar.selectionStart;
            messageBar.value =
                messageBar.value.substring(0, cursorPosition) + "\n" + messageBar.value.substring(cursorPosition);
            messageBar.selectionStart = messageBar.selectionEnd = cursorPosition + 1; // Move cursor to the new line
            messageBar.style.height = "auto"; // Reset height to auto
            messageBar.style.height = `${messageBar.scrollHeight}px`; // Adjust height based on content
        }
    });
}

// Enable Enter for New Line Only (for Mobile)
if (isMobileDevice) {
    messageBar.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            event.preventDefault(); // Prevent sending the message
            const cursorPosition = messageBar.selectionStart;
            messageBar.value =
                messageBar.value.substring(0, cursorPosition) + "\n" + messageBar.value.substring(cursorPosition);
            messageBar.selectionStart = messageBar.selectionEnd = cursorPosition + 1; // Move cursor to the new line
            messageBar.style.height = "auto"; // Reset height to auto
            messageBar.style.height = `${messageBar.scrollHeight}px`; // Adjust height based on content
        }
    });
}

// Adjust Textarea Height Dynamically
messageBar.addEventListener("input", function () {
    this.style.height = "auto"; // Reset height to auto
    this.style.height = `${this.scrollHeight}px`; // Set height based on scroll height
});

// Handle Dynamic Text Direction
document.querySelectorAll('.mughader_dynamic_direction_input_class').forEach(input => {
    input.addEventListener('input', function () {
        let firstChar = this.value.trim().charAt(0);

        if (firstChar) {
            // Check if the first character is Arabic
            if (firstChar.match(/[\u0600-\u06FF]/)) {
                this.style.direction = 'rtl';
            } else {
                this.style.direction = 'ltr';
            }
        }
    });
});











messageBar.addEventListener("input", function () {
    this.style.height = "auto"; // Reset height to auto
    this.style.height = `${this.scrollHeight}px`; // Set height based on scroll height
});

















scrollToWhoAreWe = function (elementIdName) {
    const targetDiv = document.getElementById(elementIdName);
    if (targetDiv) {
        const targetPosition = targetDiv.getBoundingClientRect().top + window.scrollY;
        const windowHeight = window.innerHeight;
        const scrollToPosition = targetPosition - (windowHeight / 2) + (targetDiv.clientHeight / 2);

        window.scrollTo({
            top: scrollToPosition,
            behavior: "smooth"
        });
    }

}

function scrollToMiddleOfElement(className) {
    const element = document.querySelector(`.${className}`);
    if (element) {
        const elementRect = element.getBoundingClientRect();
        const absoluteElementTop = elementRect.top + window.scrollY;
        const middlePosition = absoluteElementTop - (window.innerHeight / 2) + (elementRect.height / 2);

        window.scrollTo({
            top: middlePosition,
            behavior: 'smooth'
        });
    }
}






/* Header show or hide based on scrolling */
const header = document.getElementById('mughader_header');
let lastScrollPosition = 0;

window.addEventListener('scroll', () => {
    const currentScrollPosition = window.scrollY;

    if (currentScrollPosition > lastScrollPosition) {
        // Scrolling down
        header.classList.add('hidden');
    } else {
        // Scrolling up
        header.classList.remove('hidden');
    }

    lastScrollPosition = currentScrollPosition;
});












































// create all offers content functionality
const sectionData = [
    {
        title: 'أحدث العروض',
        image_1: ['عروض-شركة-ويجز/احدث-العروض/1.jpg', 'عرض سنغافورة | 5 أيام'],
        image_3: ['عروض-شركة-ويجز/احدث-العروض/3.jpg', 'عرض تايلاند - بانكوك & بوكيت'],
        image_2: ['عروض-شركة-ويجز/احدث-العروض/2.jpg', 'عرض كروز | 4 أيام'],
    },

    {
        title: 'عروض ايطاليا',
        image_1: ['عروض-شركة-ويجز/عروض-ايطاليا/1.jpg', 'عرض ايطاليا - 7 أيام'],
    },

    {
        title: 'عروض المالديف',
        image_1: ['عروض-شركة-ويجز/عروض-المالديف/1.jpg', 'عرض المالديف -  5 أيام'],
        image_2: ['عروض-شركة-ويجز/عروض-المالديف/2.jpg', 'عرض المالديف -  5 أيام'],
    },

    {
        title: 'عروض اندونيسيا',
        image_1: ['عروض-شركة-ويجز/عروض-اندونيسيا/1.jpg', 'عرض اندونيسيا - 10 أيام'],
    },

    {
        title: 'عروض ماليزيا',
        image_1: ['عروض-شركة-ويجز/عروض-ماليزيا/1.jpg', 'كوالا & لنكاوي & سيلانجور'],
        image_2: ['عروض-شركة-ويجز/عروض-ماليزيا/2.jpg', 'كوالا & لنكاوي & سيلانجور'],
    },

    {
        title: 'عروض اسبانيا',
        image_1: ['عروض-شركة-ويجز/عروض-اسبانيا/1.jpg', 'عرض اسبانيا - 8 أيام'],
    },

    {
        title: 'عروض كروز',
        image_1: ['عروض-شركة-ويجز/عروض-كروز/1.jpg', 'عرض كروز -  5 أيام'],
        image_2: ['عروض-شركة-ويجز/عروض-كروز/2.jpg', 'عرض كروز -  5 أيام'],
        image_3: ['عروض-شركة-ويجز/عروض-كروز/3.jpg', 'عرض كروز -  5 أيام'],
        image_4: ['عروض-شركة-ويجز/عروض-كروز/4.jpg', 'عرض كروز -  4 أيام'],
    },

    {
        title: 'عروض سنغافورة',
        image_1: ['عروض-شركة-ويجز/عروض-سنغافورة/1.jpg', 'عرض سنغافورة -  5 أيام'],
    },
];


// Function to dynamically create the section
function createScrollableCardsSection(dataArray) {
    const section = document.getElementById("scrollable_cards_section_id");

    dataArray.forEach((data) => {
        const container = document.createElement('div');
        container.className = 'scrollable_cards_container';

        // Create the title
        const title = document.createElement('h2');
        title.className = 'scrollable_section_title';
        title.innerText = data.title;
        container.appendChild(title);

        // Create the scrollable row
        const scrollableRow = document.createElement('div');
        scrollableRow.className = 'scrollable_cards_row';

        // Loop through the images and create cards
        Object.keys(data).forEach((key) => {
            if (key.startsWith('image_')) {
                const [src, text] = data[key];

                const card = document.createElement('div');
                card.className = 'scrollable_card';

                const img = document.createElement('img');
                img.src = src;
                img.alt = text;
                img.addEventListener('click', () => openFullScreenImage(src, text)); // Pass text to full-screen function
                card.appendChild(img);

                scrollableRow.appendChild(card);
            }
        });

        container.appendChild(scrollableRow);
        section.appendChild(container);
    });
}

function openFullScreenImage(src, text) {

    // Disable document scrolling
    document.body.style.overflow = 'hidden';


    /* Create the sull screen container div */
    const fullScreenDiv = document.createElement('div');
    fullScreenDiv.className = 'full_screen_container';

    // Add animation class for fade-in effect
    setTimeout(() => fullScreenDiv.classList.add('visible'), 10);

    const exitButton = document.createElement('button');
    exitButton.innerText = 'عودة';
    exitButton.className = 'exit_button';
    exitButton.addEventListener('click', closeFullScreenImage);
    fullScreenDiv.appendChild(exitButton);

    const title = document.createElement('h2');
    title.innerText = text;
    title.className = 'full_screen_title';
    fullScreenDiv.appendChild(title);

    // Full-screen image
    const fullScreenImage = document.createElement('img');
    fullScreenImage.src = src;
    fullScreenImage.className = 'full_screen_image';
    fullScreenDiv.appendChild(fullScreenImage);

    // WhatsApp button
    const whatsappButton = document.createElement('a');
    whatsappButton.className = 'whatsapp_button';
    whatsappButton.innerText = 'إرسال هذا العرض';
    whatsappButton.href = `https://wa.me/+966112323080?text=طلب%20حجز%20هذا%20العرض:%0A%0Ahttps://mohammed-website.github.io/wegzztravel/${encodeURIComponent(src)}`;
    fullScreenDiv.appendChild(whatsappButton);

    // Close on background click
    fullScreenDiv.addEventListener('click', (e) => {
        if (e.target === fullScreenDiv) closeFullScreenImage();
    });

    document.body.appendChild(fullScreenDiv);

    // Smooth close function
    function closeFullScreenImage() {
        const fullScreenDiv = document.querySelector('.full_screen_container');
        if (!fullScreenDiv) return;


        fullScreenDiv.style.opacity = '0';


        setTimeout(() => {
            fullScreenDiv.remove();
            document.body.style.overflow = '';
        }, 500);
    }
}

// Call the function with the sample data
createScrollableCardsSection(sectionData);



































/* Function for import all comments from google sheet */
document.getElementById("indoforall_comment_form").addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent page refresh

    let name = document.getElementById("indoforall_comment_username").value.trim();
    let comment = document.getElementById("indoforall_comment_text").value.trim();
    let stars = document.getElementById("indoforall_comment_stars").value;


    let formData = new URLSearchParams();
    formData.append("name", name); // Match Google Apps Script keys
    formData.append("comment", comment);
    formData.append("stars", stars);

    try {
        let response = await fetch("https://script.google.com/macros/s/AKfycbyBAJQhhVA5Uhxe2rrEZ4rjB0Ttn4SrYBptwjx47VZlxtgi3dENPfmNyAmrfL-QZpdEnQ/exec", {
            method: "POST",
            body: formData,
        });

        let data = await response.text();

        if (data === "Success") {
            document.getElementById("indoforall_comment_form").reset();

            await fetchReviews(); // Wait until fetchReviews() is fully executed

            showSuccessNotification(); // Now run the notification function
        }
    } catch (error) {
    }
});

// Function to Fetch and Display Reviews
function fetchReviews() {
    fetch("https://script.google.com/macros/s/AKfycbyBAJQhhVA5Uhxe2rrEZ4rjB0Ttn4SrYBptwjx47VZlxtgi3dENPfmNyAmrfL-QZpdEnQ/exec")
        .then(response => response.json())
        .then(data => {
            let indoforall_clint_rate_area = document.getElementById("indoforall_clint_rate_area");
            indoforall_clint_rate_area.innerHTML = ""; // Clear old reviews

            data.reverse().forEach(item => { // Reverse to show newest first
                let { date, name, comment, starAmount } = item;

                // Skip any row where the comment is empty
                if (!comment.trim()) return;

                let clintRateDiv = document.createElement("div");
                clintRateDiv.classList.add("indoforall_rate_div");

                clintRateDiv.innerHTML = `
                <div class="indoforall_clint_rate_date_div indoforall_animate_on_scroll">
                    <h3 class="indoforall_animate_on_scroll">${date}</h3>
                </div>

                <div class="indoforall_clint_rate_info_div indoforall_animate_on_scroll">
                    <img src="مكتب-سياحي/مكتب-سياحي-بحريني.webp" alt="ويجز للسفر والسياحة - مكتب سياحي" title="ويجز للسفر والسياحة - مكتب سياحي">
                    <h4>${name}</h4>
                </div>

                <div class="indoforall_clint_rate_comment_div">
                    <h5>${comment}</h5>
                </div>

                <div class="indoforall_clint_rate_star_div">
                    ${"★".repeat(starAmount)}
                </div>
            `;

                indoforall_clint_rate_area.appendChild(clintRateDiv);
            });

            // Smooth appearance with delay
            setTimeout(() => {
                indoforall_clint_rate_area.classList.add("show");
            }, 100);
        })
        .catch(error => console.error("Error fetching reviews:", error));
}

// Function to Show Floating Success Notification
function showSuccessNotification() {
    let notification = document.getElementById("indoforall_success_notification");
    notification.style.display = "block";

    setTimeout(() => {
        notification.style.opacity = "1";
        notification.style.transform = "translateX(-50%) translateY(0px)"; // Move slightly up
    }, 10);

    setTimeout(() => {
        notification.style.opacity = "0";
        notification.style.transform = "translateX(-50%) translateY(10px)"; // Move down slightly while fading out
        setTimeout(() => {
            notification.style.display = "none";
        }, 400);
    }, 3000);
}

// Fetch Reviews on Page Load
fetchReviews();


















/* Function to trach the first inserted letter in the inputs with the class name of "mughader_dynamic_direction_input_class" to set their direction value */
document.querySelectorAll('.mughader_dynamic_direction_input_class').forEach(input => {
    input.addEventListener('input', function () {
        let firstChar = this.value.trim().charAt(0);

        if (firstChar) {
            // Check if the first character is Arabic
            if (firstChar.match(/[\u0600-\u06FF]/)) {
                this.style.direction = 'rtl';
            } else {
                this.style.direction = 'ltr';
            }
        }
    });
});



/* Insert new click data in the google sheet */
function insertNewClick(columnName) {
    const scriptURL = "https://script.google.com/macros/s/AKfycbyU-p7z3tHF0I1K0GCmjcRG3CaG0NPkGyMPTvhlGPISxwIYrt6ueD7O2iHSza9SPOP3/exec";

    // Trim the column name before passing it
    fetch(`${scriptURL}?columnName=${encodeURIComponent(columnName.trim())}`)
        .then(response => response.text())
        .then(data => console.log("Response:", data))
        .catch(error => console.error("Error:", error));
}

/* Open WhatsApp */
openWhatsAppNumber = function () {

    insertNewClick('alseef.com');

    const whatsappNumber = "+966112323080";
    const message = encodeURIComponent('سلام عليكم ورحمة الله وبركاته'); // Optional pre-filled message
    const url = `https://wa.me/${whatsappNumber}?text=${message}`;
    window.open(url, "_blank"); // Opens in a new tab
}



