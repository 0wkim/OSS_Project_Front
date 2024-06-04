'use strict';

// 메뉴 show
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)

    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            nav.classList.toggle('show')
        })
    }
}
showMenu('nav-toggle','nav-menu')


// 모바일 메뉴
const navLink = document.querySelectorAll('.nav_link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction))


// 메뉴 active 설정
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('.nav_link');
    
    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();

            // active 삭제
            links.forEach(link => link.classList.remove('active'));

            // active 추가
            this.classList.add('active');

            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});


// 화면 스크롤 애니메이션
const sr = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 2000,
    reset: true
})

// HOME
sr.reveal('.home_title', {})
sr.reveal('.home_scroll', {delay: 200})
sr.reveal('.home_img', {origin:'right', delay: 400})

// ABOUT
sr.reveal('.about_img', {delay: 500})
sr.reveal('.about_subtitle', {delay: 300})
sr.reveal('.about_job', {delay: 400})
sr.reveal('.about_text', {delay: 500})
sr.reveal('.about_social_icon', {delay: 600, interval: 200})

// SKILLS
sr.reveal('.skills_subtitle', {})
sr.reveal('.skills_name', {distance: '20px', delay: 50, interval: 100})
sr.reveal('.skills_img', {delay: 400})

// HOBBY
sr.reveal('.hobby_img', {interval: 200})

// CONTACT
sr.reveal('.contact_subtitle', {})
sr.reveal('.contact_text', {interval: 200})


// 방명록 
document.addEventListener('DOMContentLoaded', function() {
    // 호스트 설정
    const host = 'http://127.0.0.1:80'; 

    const timestamp = new Date();

    // 서버에서 방명록 엔트리 가져오기
    function loadGuestbookEntries() {
        axios.get(`${host}/guestbook`)
            .then(response => {
                const entries = response.data;
                const entriesDiv = document.getElementById('entries');
                entriesDiv.innerHTML = '';
                entries.forEach((entry, index) => {
                    const entryDiv = document.createElement('div');
                    entryDiv.classList.add('entry');
                    entryDiv.innerHTML = `
                        <p class="entry_name"><strong>${entry.name}</strong></p>
                        <p class="entry_text">${entry.message}</p>
                        <p class="timestamp">Posted on: ${timestamp.getHours()}:${timestamp.getMinutes()}:${timestamp.getSeconds()}</p>
                        <button class="delete_btn" data-index="${index}">Delete</button>
                    `;
                    entryDiv.querySelector('.delete_btn').addEventListener('click', function() {
                        deleteGuestbookEntry(index);
                    });
                    entriesDiv.appendChild(entryDiv);
                });
            })
            .catch(error => console.error('Error:', error));
    }

    // 새로운 방명록 엔트리 추가
    function addGuestbookEntry(name, message) {
        axios.post(`${host}/guestbook`, {
            name: name,
            message: message,
            timestamp: ''
        })
        .then(response => {
            loadGuestbookEntries();
        })
        .catch(error => console.error('Error:', error));
    }

    // 방명록 엔트리 삭제
    function deleteGuestbookEntry(index) {
        axios.delete(`${host}/guestbook/${index}`)
            .then(response => {
                loadGuestbookEntries();
            })
            .catch(error => console.error('Error:', error));
    }

    document.getElementById('submit_btn').addEventListener('click', function(event) {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const message = document.getElementById('message').value;

        if (name.trim() === '' || message.trim() === '') {
            alert('Please fill in both the name and message fields.');
            return;
        }

        addGuestbookEntry(name, message);

        // input 입력값 초기화
        document.getElementById('name').value = '';
        document.getElementById('message').value = '';
    });

    // 페이지 로드 시 방명록 불러오기
    loadGuestbookEntries();
});