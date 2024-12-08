// start: Log in
const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');


signUpButton.addEventListener('click', () => {
    container.classList.add("right-panel-active");
});


signInButton.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
});

document.addEventListener('DOMContentLoaded', () => {
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');

    if (signUpButton) {
        signUpButton.addEventListener('click', () => {
            container.classList.add("right-panel-active");
        });
    }

    if (signInButton) {
        signInButton.addEventListener('click', () => {
            container.classList.remove("right-panel-active");
        });
    }

    // Другие функции и обработчики событий
});

//Google API
function initGoogleSignIn() {
    gapi.load('auth2', function() {
        gapi.auth2.init({
            client_id: 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com'
        }).then(function(auth2) {
            document.getElementById('googleSignIn').onclick = function() {
                auth2.signIn().then(function(googleUser ) {
                    const profile = googleUser .getBasicProfile();
                    console.log('Google ID:', profile.getId());
                    console.log('Name:', profile.getName());
                    console.log('Email:', profile.getEmail());
                    
                });
            };
        });
    });
}

// Загрузка Google API
(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "https://apis.google.com/js/platform.js?onload=initGoogleSignIn";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'google-jssdk'));

// Вход через ВКонтакте
document.getElementById('vkSignIn').onclick = function() {
    const appId = 'YOUR_VK_APP_ID';
    const redirectUri = 'YOUR_REDIRECT_URI';
    const scope = 'email';
    const url = `https://oauth.vk.com/authorize?client_id=${appId}&display=popup&redirect_uri=${redirectUri}&scope=${scope}&response_type=token&v=5.131`;

    window.open(url, '_self');
};

// Обработка ответа от ВКонтакте
window.addEventListener('load', function() {
    const hash = window.location.hash;
    if (hash) {
        const params = new URLSearchParams(hash.substring(1));
        const accessToken = params.get('access_token');
        const userId = params.get('user_id');
        console.log('VK Access Token:', accessToken);
        console.log('VK User ID:', userId);
       
    }
});

// Вход через Apple
document.getElementById('appleSignIn').onclick = function() {
    const appleId = 'YOUR_APPLE_CLIENT_ID';
    const redirectUri = 'YOUR_REDIRECT_URI';
    const scope = 'email';
    const url = `https://appleid.apple.com/auth/authorize?client_id=${appleId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}`;

    window.open(url, '_self');
};

// Обработка ответа от Apple
window.addEventListener('load', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    if (code) {
        console.log('Apple Authorization Code:', code);
       
    }
});

// end: Log in

// start: Sidebar

document.querySelector('.chat-sidebar-profile-toggle').addEventListener('click', function(e) {
    e.preventDefault();
    this.parentElement.classList.toggle('active');
});

document.addEventListener('click', function(e) {
    if (!e.target.matches('.chat-sidebar-profile, .chat-sidebar-profile *')) {
        document.querySelector('.chat-sidebar-profile').classList.remove('active');
    }
});

// end: Sidebar

// start: Обработка"Change"

document.querySelectorAll('.conversation-item-dropdown-edit').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();

        const messageBox = this.closest('.conversation-item-box');
        const messageTextElement = messageBox.querySelector('.conversation-item-text p');
        const currentText = messageTextElement.innerText;

        const textarea = document.querySelector('.conversation-form-input');

        textarea.value = currentText;

        const originalMessageBox = messageBox;

        const submitButton = document.querySelector('.conversation-form-btn.conversation-form-sumbit');

        const saveText = function() {
            const newText = textarea.value;
            messageTextElement.innerHTML = `<p>${newText}</p>`;
            
            textarea.value = '';

            submitButton.onclick = null;
            textarea.removeEventListener('keydown', handleKeyDown);
        };

        submitButton.onclick = saveText;

        // Обработка клавиш
        const handleKeyDown = function(event) {
            if (event.key === 'Enter') {
                event.preventDefault(); 
                saveText();
            }
        };

        textarea.addEventListener('keydown', handleKeyDown);
    });
});

// end: Обработка"Change"

// start: Обработка"Copy"
document.querySelectorAll('.conversation-item-dropdown-copy').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();

        const messageText = this.closest('.conversation-item-box').querySelector('.conversation-item-text p').innerText;

       
        const tempInput = document.createElement('textarea');
        tempInput.value = messageText;
        document.body.appendChild(tempInput); 
        tempInput.select();
        document.execCommand('copy');
    });
});

// end: Обработка"Copy"

// start: Conversation

document.querySelectorAll('.conversation-item-dropdown-toggle').forEach( function(item) {
    item.addEventListener('click', function(e) { 
        e.preventDefault()
        if(this.parentElement.classList.contains('active')) {
            this.parentElement.classList.remove('active')
        } else {
            document.querySelectorAll('.conversation-item-dropdown').forEach(function(i) {
                i.classList.remove('active')
            })
            this.parentElement.classList.add('active')
        }
    })
})

document.addEventListener('click', function(e) {
    if(!e.target.matches('.conversation-item-dropdown, .conversation-item-dropdown *')) {
        document.querySelectorAll('.conversation-item-dropdown').forEach(function(i) {
            i.classList.remove('active')
        }) 
    }
})

// end: Conversation

// start:  Conversation-input-form

document.querySelector('.conversation-form-input').addEventListener('input', function(e) {
    this.rows = this.value.split('\n')
})

document.querySelector('.conversation-form-file-list').addEventListener('click', function(e) {
    e.preventDefault();
    this.parentElement.classList.toggle('active');
});

document.addEventListener('click', function(e) {
    if (!e.target.matches('.conversation-form-file, .conversation-form-file *')) {
        document.querySelector('.conversation-form-file').classList.remove('active');
    }
});

// start:  Conversation-input-form-galeria

document.querySelectorAll('.conversation-form-file-list-dropdown-galeria').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault(); 

        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*,video/*'; 
        input.multiple = true;

        input.onchange = function(event) {
            const files = event.target.files;
            
            console.log(files);
        };

        input.click();
    });
});

// end:  Conversation-input-form-galeria

// start:  Conversation-input-form-file
document.querySelectorAll('.conversation-form-file-list-dropdown-file').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();

        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*,video/*'; 
        input.multiple = true;

        input.onchange = function(event) {
            const files = event.target.files;
            const notification = document.getElementById('file-upload-notification');
            const fileList = document.getElementById('file-list');
            fileList.innerHTML = '';
            notification.style.display = 'none'; 

           
            const invalidFiles = Array.from(files).filter(file => 
                file.name.endsWith('.txt') || file.name.endsWith('.csv') || file.name.endsWith('.bat')
            );

            if (invalidFiles.length > 0) {
                notification.textContent = "Рекомендуется загружать файлы в архиве. Файлы в формате .txt и .csv не допускаются.";
                notification.style.display = 'block';
               
                setTimeout(() => {
                    notification.style.display = 'none';
                }, 3000); 
            } else {
               
                Array.from(files).forEach(file => {
                    const listItem = document.createElement('li');
                    listItem.textContent = file.name;
                    fileList.appendChild(listItem);
                });
            }
        };

        input.click();
    });
});

// end:  Conversation-input-form-file

// end:  Conversation-input-form

// start:  Conversation-from-stiker

// Обработка для кнопка стикеров
document.querySelector('.conversation-from-sticker').addEventListener('click', function(e) {
    e.preventDefault();
    const stickerPanel = document.querySelector('.sticker-panel');

    if (stickerPanel.classList.contains('active')) {
        stickerPanel.classList.remove('active');
        
            setTimeout(() => {
            stickerPanel.style.display = 'none';
        }, 300);
    } else {
        stickerPanel.style.display = 'block';
        setTimeout(() => {
            stickerPanel.classList.add('active');
        }, 10);
    }
});

// Обработка выбора стикера
document.querySelectorAll('.sticker').forEach(sticker => {
    sticker.addEventListener('click', function() {
        const textarea = document.querySelector('.conversation-form-input');
        textarea.value += this.dataset.sticker;
        document.querySelector('.sticker-panel').classList.remove('active');
        setTimeout(() => {
            document.querySelector('.sticker-panel').style.display = 'none';
        }, 300);
    });
});

document.addEventListener('click', function(e) {
    if (!e.target.closest('.conversation-form') && !e.target.matches('.conversation-from-sticker')) {
        const stickerPanel = document.querySelector('.sticker-panel');
        if (stickerPanel.classList.contains('active')) {
            stickerPanel.classList.remove('active');
            setTimeout(() => {
                stickerPanel.style.display = 'none';
            }, 300);
        }
    }
});

// end:  Conversation-from-stiker