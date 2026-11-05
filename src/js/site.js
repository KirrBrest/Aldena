(function(){
    'use strict';

    /* ---------- звук видео ---------- */
    var video = document.getElementById('promoVideo');
    var muteBtn = document.getElementById('muteBtn');
    var iconMuted = '<path d="M11 5L6 9H2v6h4l5 4V5z"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/>';
    var iconSound = '<path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M15.5 8.5a5 5 0 010 7"/><path d="M18.5 5.5a9.5 9.5 0 010 13"/>';
    if (video && muteBtn){
        muteBtn.addEventListener('click', function(){
            video.muted = !video.muted;
            document.getElementById('muteIcon').innerHTML = video.muted ? iconMuted : iconSound;
            muteBtn.setAttribute('aria-label', video.muted ? 'Включить звук' : 'Выключить звук');
        });
    }

    /* ---------- модальная форма ---------- */
    var modal = document.getElementById('formModal');
    function formOpen(e){ if (e) e.preventDefault(); modal.classList.add('open'); document.body.style.overflow = 'hidden'; }
    function formClose(){ modal.classList.remove('open'); document.body.style.overflow = ''; }
    Array.prototype.forEach.call(document.querySelectorAll('[data-open-form]'), function(el){ el.addEventListener('click', formOpen); });
    var closeBtn = document.querySelector('[data-close-form]');
    if (closeBtn) closeBtn.addEventListener('click', formClose);
    if (modal) modal.addEventListener('click', function(e){ if (e.target === modal) formClose(); });
    var leadForm = document.getElementById('leadForm');
    if (leadForm) leadForm.addEventListener('submit', function(e){
        e.preventDefault();
        document.getElementById('formBody').style.display = 'none';
        document.getElementById('formDone').style.display = 'block';
    });
    document.addEventListener('keydown', function(e){ if (e.key === 'Escape') formClose(); });

    /* ---------- мобильное меню ---------- */
    var burger = document.getElementById('burger');
    var header = document.getElementById('siteHeader');
    if (burger && header) burger.addEventListener('click', function(){
        burger.classList.toggle('open');
        header.classList.toggle('menu-open');
    });

    /* ---------- подменю (раскрытие на мобильном) ---------- */
    Array.prototype.forEach.call(document.querySelectorAll('.drop-toggle'), function(btn){
        btn.addEventListener('click', function(){
            var item = btn.closest('.nav-item');
            if (item) item.classList.toggle('open');
        });
    });

    /* ---------- появление при скролле ---------- */
    var items = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window){
        var io = new IntersectionObserver(function(entries){
            entries.forEach(function(en){
                if (en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); }
            });
        }, {threshold:.12, rootMargin:'0px 0px -40px 0px'});
        items.forEach(function(el){ io.observe(el); });
    } else {
        items.forEach(function(el){ el.classList.add('in'); });
    }
})();