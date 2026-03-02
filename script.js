document.addEventListener('DOMContentLoaded', function() {
    // Check if this is a celebration page (has URL parameters)
    const urlParams = new URLSearchParams(window.location.search);
    const sender = urlParams.get('sender');
    const recipient = urlParams.get('recipient');
    const occasion = urlParams.get('occasion');
    const message = urlParams.get('message');
    const link = urlParams.get('link');
    const date = urlParams.get('date');
    const photo = urlParams.get('photo');
    const like1 = urlParams.get('like1');
    const like2 = urlParams.get('like2');
    const like3 = urlParams.get('like3');

    if (occasion && message) {
        // Show celebration display
        document.getElementById('form-container').style.display = 'none';
        document.getElementById('celebration-display').style.display = 'block';

        document.getElementById('occasion-title').textContent = occasion;

        if (recipient) {
            document.getElementById('recipient-text').textContent = `Para: ${recipient}`;
        }

        if (sender) {
            document.getElementById('sender-text').textContent = `De: ${sender}`;
        }

        document.getElementById('message-text').textContent = message;

        if (date) {
            document.getElementById('date-text').textContent = `Data: ${new Date(date).toLocaleDateString('pt-BR')}`;
        }

        if (link) {
            document.getElementById('link-text').innerHTML =
                `Link especial: <a href="${link}" target="_blank">${link}</a>`;
        }

        // Display likes
        if (like1 || like2 || like3) {
            let likesHtml = '<h3>Coisas que eu gosto em você:</h3><ul>';
            if (like1) likesHtml += `<li>${like1}</li>`;
            if (like2) likesHtml += `<li>${like2}</li>`;
            if (like3) likesHtml += `<li>${like3}</li>`;
            likesHtml += '</ul>';
            document.getElementById('likes-text').innerHTML = likesHtml;
        }

        if (photo) {
            const photoDisplay = document.getElementById('photo-display');
            photoDisplay.src = photo;
            photoDisplay.style.display = 'block';
        }

        // Add confetti effect
        createConfetti();
    } else {
        // Show form
        const form = document.getElementById('celebration-form');
        
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const senderInput = document.getElementById('sender').value;
            const recipientInput = document.getElementById('recipient').value;
            const occasionInput = document.getElementById('occasion').value;
            const messageInput = document.getElementById('message').value;
            const linkInput = document.getElementById('link').value;
            const dateInput = document.getElementById('date').value;
            const photoInput = document.getElementById('photo').files[0];
            const like1Input = document.getElementById('like1').value;
            const like2Input = document.getElementById('like2').value;
            const like3Input = document.getElementById('like3').value;

            // Create URL with parameters
            const baseUrl = window.location.href.split('?')[0];
            const params = new URLSearchParams();
            if (senderInput) {
                params.set('sender', senderInput);
            }
            if (recipientInput) {
                params.set('recipient', recipientInput);
            }
            params.set('occasion', occasionInput);
            params.set('message', messageInput);
            if (linkInput) {
                params.set('link', linkInput);
            }
            if (dateInput) {
                params.set('date', dateInput);
            }
            if (like1Input) {
                params.set('like1', like1Input);
            }
            if (like2Input) {
                params.set('like2', like2Input);
            }
            if (like3Input) {
                params.set('like3', like3Input);
            }

            // Handle photo upload - convert to Base64
            if (photoInput) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const base64Photo = e.target.result;
                    params.set('photo', base64Photo);

                    const fullUrl = `${baseUrl}?${params.toString()}`;

                    // Show generated link
                    document.getElementById('link-output').value = fullUrl;
                    document.getElementById('generated-link').style.display = 'block';
                };
                reader.readAsDataURL(photoInput);
            } else {
                const fullUrl = `${baseUrl}?${params.toString()}`;

                // Show generated link
                document.getElementById('link-output').value = fullUrl;
                document.getElementById('generated-link').style.display = 'block';
            }
        });
    }
});

function copyLink() {
    const linkInput = document.getElementById('link-output');
    linkInput.select();
    document.execCommand('copy');
    alert('Link copiado com sucesso!');
}

function createConfetti() {
    const colors = ['#ff6b6b', '#ffa502', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7'];

    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 3 + 's';
        confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
        document.body.appendChild(confetti);
    }
}
