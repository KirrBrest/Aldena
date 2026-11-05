generateMaps();
function generateMaps() {
    jQuery('.map_block').each(function () {
        idMapBlock = jQuery(this).attr('id');
        getMap(jQuery(this));
    });
}
function getMap(block) {
    //block = jQuery('#'+idMapBlock);
    block.find('#mainMap').html('');

    var points = [];
    block.find('.markerItem').each(function () {
        mapX = jQuery(this).find('.mapX').val();
        mapY = jQuery(this).find('.mapY').val();
        mapDescription = jQuery(this).find('.mapDescription').val();
        points.push([mapX, mapY, mapDescription]);
    });

    ymaps.ready(init);
    var myMap, myPlacemark;
    function init() {
        center = [55.76, 37.64];

        if (points.length == 1) {
            center = [points[0][0], points[0][1]];
        }

        if (points.length) {
            zoom = 12;
        } else {
            zoom = 3;
        }

        myMap = new ymaps.Map(block.find('#mainMap').get(0), {
            center: center,
            zoom: zoom
        });

        if (points.length) {
            for (i = 0; i < points.length; i++) {
                myPlacemark = new ymaps.Placemark(
                    [points[i][0], points[i][1]],
                    {
                        balloonContent: points[i][2],
                    }
                );
                myMap.geoObjects.add(myPlacemark);
            }

            if (points.length != 1) {
                myMap.controls.add(new ymaps.control.ZoomControl());
                myMap.controls.add('typeSelector');


                myMap.setBounds(myMap.geoObjects.getBounds(), { checkZoomRange: true }).then(function () { if (myMap.getZoom() > 17) myMap.setZoom(17); });
            }
        }
    }
}
jQuery(document).ready(function () {
    jQuery('.oprosBtn').click(function () {
        jQuery('.oprosBtn').removeClass('active');
        jQuery(this).addClass('active');
        data = jQuery(this).attr('data');
        jQuery('.oprosItem').removeClass('active');
        jQuery('.oprosRight_' + data).addClass('active');
    })

    if (jQuery('.left_sidebar').length && jQuery(window).width() <= 992) {
        jQuery('.showBar').addClass('active');
        jQuery('.left_sidebar').prepend('<div class="barHead">Параметры <a href="javascript:void(0)" class="barClose"></a></div>');

        jQuery('.showBar').click(function () {
            jQuery('body').toggleClass('activeBar');
        })
        jQuery('.barClose').click(function () {
            jQuery('body').toggleClass('activeBar');
        })
    }
    jQuery('body').on('click', '.form_sub', function (event) {
        if (event.target.classList.contains('btn_submit')) {
            jQuery(this).submit();
            return false;
        }
    });

    jQuery('body').on('click', '.btn_submit', function (event) {
        jQuery(this).submit();
        return false;
    });

    jQuery('.module .form_sub').submit(function (e) {
        e.preventDefault();
        form = jQuery(this);
        error = 0;

        jQuery(this).find('.input-group').each(function () {
            element = jQuery(this).find('input, textarea, select');
            required = element.attr('required');
            value = element.val();

            if (element.hasClass('g-recaptcha-response')) {
                if (!value) {
                    jQuery(this).find('.input-error').html('Это поле обязательно для заполнения');
                    error = 1;
                } else {
                    jQuery(this).find('.input-error').html('');
                }
            } else {
                if (required != undefined) {
                    if (!value || (element.attr('type') == 'checkbox' && !element.prop('checked'))) {
                        jQuery(this).find('.input-error').html('Это поле обязательно для заполнения');
                        error = 1;
                    } else {
                        jQuery(this).find('.input-error').html('');
                    }
                }
            }
        });

        var formData = new FormData();
        jQuery(this).find('input[type="file"]').each(function (e) {
            for (var i = 0; i < jQuery(this)[0].files.length; i++) {
                formData.append('files[]', jQuery(this).get(0).files[i]);
            }
        });

        if (!error) {
            jQuery(this).find('input:not([type="submit"]):not([type="hidden"]):not([type="radio"]):not([type="checkbox"]):not([type="file"]), select, textarea:not([name="g-recaptcha-response"])').each(function () {
                formData.append('content[' + $(this).attr('placeholder') + ']', $(this).val());
            });

            jQuery(this).find('input[type="radio"]').each(function () {
                if ($(this).is(":checked")) {
                    formData.append('content[' + $(this).attr('placeholder') + ']', $(this).val());
                }
            });

            email = form.find('.send_to_email').val();

            formData.append('email', email);

            if (form.find('.send_to_subject').length) {
                subject = form.find('.send_to_subject').val();
                formData.append('send_to_subject', subject);
            }

            formData.append('content[Ссылка на страницу]', window.location.href);

            jQuery.ajax({
                url: '/mail/contact.php',
                type: "POST",
                data: formData,
                contentType: false,
                processData: false,
                success: function (data) {
                    form.parent().find('.form_wrap__successbox').show().html('Ваше сообщение успешно отправлено');
                }
            });
            jQuery('.input-error').hide().html('');
        }
    });
});
function showArticleImage(key) {
    jQuery('.articleImage').hide();
    jQuery('.artImg_' + key).show();
    return false;
}
jQuery(document).ready(function () {

    /*jQuery(window).scroll(function () {
        fixHeader();
    });
    fixHeader();

    function fixHeader() {
        h = jQuery('.header').height();

        if (jQuery(window).width() > 992) {
            var scrolled = jQuery(this).scrollTop();
            //jQuery('.pageWrap').css('padding-top', h + 'px');
            if (scrolled >= 50) {
                jQuery('body').addClass('fixBody');
            } else {
                //jQuery('.pageWrap').removeAttr('style');
                jQuery('body').removeClass('fixBody');
            }
        }
    }*/



    setTimeout(function () {
        setBgHeader();
    }, 100);

    jQuery(window).resize(function () {
        setBgHeader();
    });
    function setBgHeader() {
        if (jQuery(window).width() > 992) {
            hW = jQuery('.headerLogo').width();
            logoLeft = jQuery('.headerLogo').offset().left;
            wRight = jQuery(window).width() - hW - logoLeft;


            jQuery('.headerBgLeft').css('width', logoLeft + 'px');
            jQuery('.headerBgRight').css('width', wRight + 'px');
        }
    }





    hHeader = jQuery('.header').outerHeight();
    //jQuery('header').css('height', hHeader + 'px');
    if (jQuery('.videoBlock').length) {
        //jQuery('.videoBlock').css('height', 'calc(100vh - ' + hHeader + 'px)');
    }


    jQuery(window).scroll(function () {
        fixHeader();
    });
    fixHeader();

    function fixHeader() {
        h = jQuery('.headerTop').outerHeight();

        if (jQuery(window).width() > 992) {
            var scrolled = jQuery(this).scrollTop();
            //jQuery('.pageWrap').css('padding-top', h + 'px');
            if (scrolled >= hHeader + 100) {
                jQuery('body').addClass('fixBody1');
            } else {
                //jQuery('.pageWrap').removeAttr('style');
                jQuery('body').removeClass('fixBody1');
            }
        }
    }

    jQuery('body').on('click', '.module .btn', function () {
        href = jQuery(this).attr('href');
        if (href) {
            if (href.substr(0, 1) == '#') {
                block = jQuery(href);
                if (block.length) {
                    if (block.hasClass('popupBlock')) {
                        block.show();
                        jQuery('body').addClass('modal-open');
                        jQuery('body').css('padding-right', '17px');
                    } else {
                        jQuery("body,html").animate({
                            scrollTop: block.offset().top
                        }, 700);
                    }
                }
            }
        }
    });

    jQuery('.popupBlock .close, .popupBlock .modal-close').click(function () {
        jQuery('body').removeClass('modal-open');
        jQuery(this).closest('.popupBlock').hide();
        jQuery('body').css('padding-right', '0px');
    });

    jQuery(document).mouseup(function (e) {
        var container = jQuery(".popupBlock .modal-content");
        if (container.has(e.target).length === 0) {
            jQuery('body').removeClass('modal-open');
            jQuery('.popupBlock').hide();
            jQuery('body').css('padding-right', '0px');
        }
    });
    if (jQuery('.productSlider').length) {
        var splider = [];
        document.querySelectorAll('.productSlider').forEach(function (slider) {
            sp = new Splide(slider, {
                type: 'loop',
                autoplay: true,
                pauseOnHover: true,
                interval: 4000,
                speed: 1000,
                perPage: 4,
                perMove: 1,
                padding: '0px',
                pagination: false,
                arrows: true,
                breakpoints: {
                    1500: {
                        perPage: 4
                    },
                    1300: {
                        perPage: 3
                    },
                    768: {
                        arrows: false,
                        pagination: true,
                        perPage: 2,
                    },
                },
            }).mount();
            splider[sp.root.id] = sp;
        });
        jQuery('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
            var target = jQuery(e.target).attr("href") // activated tab
            id = jQuery(target).find('.productSlider').attr('id');
            splider[id].refresh();
        });
    }
});
document.querySelectorAll('.splide:not(.productSlider)').forEach(function (slider) {
    //spSl = new Splide(slider).mount();
});


jQuery(document).ready(function () { jQuery('.module:not(.block__positionfixed) .mobile_burger').click(function () { jQuery(this).closest('.module').find('.hidden_menu').toggle().toggleClass('fix_menu'); }); jQuery('.mobile_burger').click(function () { jQuery(this).closest('.module').toggleClass('fix_block'); jQuery('body').toggleClass('bodyFix'); }); });

$(document).ready(function () {
    $('.blockCounterNumber').each(function () {
        const $counter = $(this);
        const targetText = $counter.text().trim();
        const targetValue = parseInt(targetText.replace(/[^\d]/g, ''));

        if (isNaN(targetValue)) return;

        const suffix = targetText.replace(/[\d]/g, '');
        $counter.text('0' + suffix);

        $({ count: 0 }).animate({ count: targetValue }, {
            duration: 1000,
            easing: 'swing',
            step: function () {
                $counter.text(Math.floor(this.count) + suffix);
            },
            complete: function () {
                $counter.text(targetValue + suffix);
            }
        });
    });
});


document.addEventListener('DOMContentLoaded', function () {
    const blocks = document.querySelectorAll('.blockTitle');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const block = entry.target;

                if (block.dataset.animated === 'true') return;
                block.dataset.animated = 'true';

                // Сначала левая полоса
                block.classList.add('animated-left');

                // Через 300ms правая полоса
                setTimeout(() => {
                    block.classList.add('animated-right');
                }, 500);

                observer.unobserve(block);
            }
        });
    }, { threshold: 0.3 });

    blocks.forEach(block => observer.observe(block));
});